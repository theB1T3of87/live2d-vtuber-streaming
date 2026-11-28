import { FilesetResolver, FaceLandmarker } from "@mediapipe/tasks-vision";

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export class FaceTracking {
  constructor() {
    this.landmarker = null;
    this.stream = null;
    this.lastVideoTime = -1;
    this.neutral = null;
    this.neutralSamples = [];
    this.filtered = { x: 0, y: 0, z: 0 };
    this.running = false;
    this.parameterIndices = new Map();
    this.lastStatus = "";
  }

  status(callback, message) {
    if (message !== this.lastStatus) {
      this.lastStatus = message;
      callback?.(message);
    }
  }

  async start(video, onStatus) {
    if (this.running) return this.stream;
    this.status(onStatus, "Preparando rastreamento facial...");

    try {
      const vision = await FilesetResolver.forVisionTasks(
        new URL("./mediapipe/", window.location.href).href
      );

      this.landmarker = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: new URL(
            "./mediapipe/face_landmarker.task",
            window.location.href
          ).href,
          delegate: "CPU"
        },
        runningMode: "VIDEO",
        numFaces: 1,
        outputFaceBlendshapes: true,
        outputFacialTransformationMatrixes: false,
        minFaceDetectionConfidence: 0.55,
        minFacePresenceConfidence: 0.55,
        minTrackingConfidence: 0.55
      });

      this.status(onStatus, "Solicitando acesso à câmera...");
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: { ideal: "user" },
          width: { ideal: 640 },
          height: { ideal: 480 },
          frameRate: { ideal: 30, max: 30 }
        }
      });

      video.srcObject = this.stream;
      await video.play();

      this.lastVideoTime = -1;
      this.neutral = null;
      this.neutralSamples = [];
      this.filtered = { x: 0, y: 0, z: 0 };
      this.running = true;
      this.status(onStatus, "Câmera ativa — procurando rosto...");
      return this.stream;
    } catch (error) {
      await this.stop(video);
      throw error;
    }
  }

  readBlendshapes(result) {
    const values = Object.create(null);
    const categories = result.faceBlendshapes?.[0]?.categories || [];
    for (const item of categories) values[item.categoryName] = item.score;
    return values;
  }

  update(model, result, onStatus) {
    if (!this.running || !this.landmarker || !model) return;
    const video = document.getElementById("cameraVideo");
    if (!video || video.readyState < 2 || video.currentTime === this.lastVideoTime) return;

    this.lastVideoTime = video.currentTime;
    let resultFrame;
    try {
      resultFrame = this.landmarker.detectForVideo(video, performance.now());
    } catch (error) {
      this.status(onStatus, "Falha ao processar o rosto");
      console.warn("Face tracking frame failed:", error);
      return;
    }

    const points = resultFrame.faceLandmarks?.[0];
    if (!points || points.length < 264) {
      this.status(onStatus, "Câmera ativa — procurando rosto...");
      return;
    }

    const leftEye = points[33];
    const rightEye = points[263];
    const nose = points[1];
    const forehead = points[10];
    const chin = points[152];

    const eyeCenterX = (leftEye.x + rightEye.x) * 0.5;
    const eyeCenterY = (leftEye.y + rightEye.y) * 0.5;
    const eyeDistance = Math.max(
      Math.hypot(rightEye.x - leftEye.x, rightEye.y - leftEye.y),
      0.0001
    );
    const faceHeight = Math.max(Math.abs(chin.y - forehead.y), 0.0001);

    const raw = {
      x: (nose.x - eyeCenterX) / eyeDistance,
      y: (nose.y - eyeCenterY) / faceHeight,
      z: Math.atan2(rightEye.y - leftEye.y, rightEye.x - leftEye.x) * 180 / Math.PI
    };

    // Neutral calibration averages several frames instead of trusting one noisy frame.
    if (!this.neutral) {
      this.neutralSamples.push(raw);
      if (this.neutralSamples.length >= 18) {
        this.neutral = {
          x: this.neutralSamples.reduce((sum, p) => sum + p.x, 0) / this.neutralSamples.length,
          y: this.neutralSamples.reduce((sum, p) => sum + p.y, 0) / this.neutralSamples.length,
          z: this.neutralSamples.reduce((sum, p) => sum + p.z, 0) / this.neutralSamples.length
        };
        this.status(onStatus, "Rosto detectado — rastreamento ativo");
      } else {
        this.status(onStatus, "Calibrando posição neutra...");
      }
      return;
    }

    const target = {
      x: clamp((raw.x - this.neutral.x) * 115, -30, 30),
      y: clamp((raw.y - this.neutral.y) * 190, -25, 25),
      z: clamp(raw.z - this.neutral.z, -30, 30)
    };

    // Exponential smoothing removes landmark jitter without making tracking sluggish.
    const smoothing = 0.34;
    this.filtered.x += (target.x - this.filtered.x) * smoothing;
    this.filtered.y += (target.y - this.filtered.y) * smoothing;
    this.filtered.z += (target.z - this.filtered.z) * smoothing;

    this.setParameter(model, ["ParamAngleX", "ParamHeadX"], this.filtered.x);
    this.setParameter(model, ["ParamAngleY", "ParamHeadY"], this.filtered.y);
    this.setParameter(model, ["ParamAngleZ", "ParamHeadZ"], this.filtered.z);

    const blend = this.readBlendshapes(resultFrame);
    if (blend.eyeBlinkLeft !== undefined) {
      this.setParameter(model, ["ParamEyeLOpen", "ParamEyeOpenL"], 1 - blend.eyeBlinkLeft);
    }
    if (blend.eyeBlinkRight !== undefined) {
      this.setParameter(model, ["ParamEyeROpen", "ParamEyeOpenR"], 1 - blend.eyeBlinkRight);
    }
    if (blend.jawOpen !== undefined) {
      this.setParameter(model, ["ParamMouthOpenY", "ParamMouthOpen"], blend.jawOpen);
    }
    if (blend.mouthSmileLeft !== undefined && blend.mouthSmileRight !== undefined) {
      this.setParameter(model, ["ParamMouthForm"], (blend.mouthSmileLeft + blend.mouthSmileRight) * 0.5);
    }

    this.status(onStatus, "Câmera ativa — rosto detectado");
  }

  setParameter(model, aliases, normalizedValue) {
    let index = -1;
    for (const id of aliases) {
      index = model.getParameterIndex(id);
      if (index >= 0) break;
    }
    if (index < 0) return;

    const min = model.getParameterMinimumValue(index);
    const max = model.getParameterMaximumValue(index);
    const value = min + clamp(normalizedValue, 0, 1) * (max - min);
    const isAngle = aliases.some(id => id.includes("Angle") || id.includes("Head"));
    const mapped = isAngle
      ? clamp(normalizedValue, min, max)
      : value;

    model.setParameterValueByIndex(index, mapped, 1);
  }

  async stop(video) {
    this.running = false;
    if (this.stream) {
      for (const track of this.stream.getTracks()) track.stop();
      this.stream = null;
    }
    if (video) {
      video.pause();
      video.srcObject = null;
    }
    if (this.landmarker) {
      this.landmarker.close();
      this.landmarker = null;
    }
    this.lastVideoTime = -1;
    this.neutral = null;
    this.neutralSamples = [];
    this.filtered = { x: 0, y: 0, z: 0 };
    this.lastStatus = "";
  }
}
