import { CubismFramework } from "./libs/cubism-framework/live2dcubismframework.js";
import { CubismMoc } from "./libs/cubism-framework/model/cubismmoc.js";
import { CubismRenderer_WebGL } from "./libs/cubism-framework/rendering/cubismrenderer_webgl.js";
import { CubismModelMatrix } from "./libs/cubism-framework/math/cubismmodelmatrix.js";

let frameworkReady = false;

function initializeFramework() {
  if (frameworkReady) return;
  if (!window.Live2DCubismCore) {
    throw new Error("Live2D Cubism Core não foi carregado.");
  }
  CubismFramework.startUp();
  CubismFramework.initialize();
  frameworkReady = true;
}

function normalizePath(path) {
  const parts = [];
  for (const part of path.replace(/\\/g, "/").split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") parts.pop();
    else parts.push(part);
  }
  return parts.join("/");
}

function findZipFile(zip, path) {
  return zip.file(path) || zip.file(path.replace(/\\/g, "/"));
}

async function loadImage(zip, path) {
  const file = findZipFile(zip, path);
  if (!file) throw new Error("Textura não encontrada: " + path);
  const blob = await file.async("blob");
  if ("createImageBitmap" in window) return createImageBitmap(blob);
  return new Promise((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(blob);
    image.onload = () => { URL.revokeObjectURL(url); resolve(image); };
    image.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Falha ao decodificar textura: " + path)); };
    image.src = url;
  });
}

export class Live2DRenderer {
  constructor(canvas, statusElement) {
    this.canvas = canvas;
    this.statusElement = statusElement;
    this.gl = null;
    this.renderer = null;
    this.moc = null;
    this.model = null;
    this.matrix = null;
    this.textures = [];
    this.zoom = 1;
    this.zip = null;
    this.config = null;
    this.configPath = "";
    this.contextLost = false;

    this.onContextLost = event => {
      event.preventDefault();
      this.contextLost = true;
      this.status("Contexto gráfico perdido — recarregue o modelo");
    };
    this.onContextRestored = () => {
      this.contextLost = false;
      if (this.zip && this.config) {
        this.load(this.zip, this.config, this.configPath).catch(error => {
          console.error(error);
          this.status("Falha ao restaurar o modelo");
        });
      }
    };
    canvas.addEventListener("webglcontextlost", this.onContextLost, false);
    canvas.addEventListener("webglcontextrestored", this.onContextRestored, false);
  }

  status(message) {
    if (this.statusElement) this.statusElement.textContent = message;
  }

  resize() {
    if (!this.gl || !this.renderer) return;
    const rect = this.canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(rect.width * ratio));
    const height = Math.max(1, Math.round(rect.height * ratio));
    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
      this.gl.viewport(0, 0, width, height);
      this.rebuildMatrix();
    }
  }

  rebuildMatrix() {
    if (!this.model) return;
    // Build a fresh matrix: CubismModelMatrix.setWidth() is cumulative when
    // repeatedly applied to the same matrix, so it must not run every frame.
    this.matrix = new CubismModelMatrix(
      this.model.getCanvasWidth(),
      this.model.getCanvasHeight()
    );
    this.matrix.setWidth(2.0 / this.zoom);
    this.matrix.setCenterPosition(0, 0);
  }

  setZoom(value) {
    this.zoom = Math.max(0.5, Math.min(1.6, Number(value) || 1));
    this.rebuildMatrix();
  }

  async load(zip, config, configPath) {
    await this.destroy(false);
    this.zip = zip;
    this.config = config;
    this.configPath = configPath;
    this.status("Inicializando renderizador Live2D...");

    const gl = this.canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
      powerPreference: "high-performance"
    });
    if (!gl) throw new Error("WebGL não está disponível neste dispositivo.");
    this.gl = gl;

    initializeFramework();
    const base = configPath.slice(0, configPath.lastIndexOf("/") + 1);
    const references = config.FileReferences || {};
    if (!references.Moc || !Array.isArray(references.Textures) || !references.Textures.length) {
      throw new Error("O model3.json não contém MOC3 e texturas válidos.");
    }

    this.status("Carregando geometria do modelo...");
    const mocFile = findZipFile(zip, normalizePath(base + references.Moc));
    if (!mocFile) throw new Error("Arquivo MOC3 não encontrado.");
    this.moc = CubismMoc.create(await mocFile.async("arraybuffer"), false);
    if (!this.moc) throw new Error("O Cubism não conseguiu abrir o MOC3.");

    this.model = this.moc.createModel();
    if (!this.model) throw new Error("Não foi possível criar o modelo Live2D.");

    this.renderer = new CubismRenderer_WebGL();
    this.renderer.initialize(this.model);
    this.renderer.startUp(gl);
    this.renderer.setIsPremultipliedAlpha(true);

    this.status("Carregando texturas...");
    for (let index = 0; index < references.Textures.length; index++) {
      const path = normalizePath(base + references.Textures[index]);
      const image = await loadImage(zip, path);
      const texture = gl.createTexture();
      if (!texture) throw new Error("Falha ao alocar textura WebGL.");
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      this.renderer.bindTexture(index, texture);
      this.textures.push(texture);
      if (image.close) image.close();
    }

    this.rebuildMatrix();
    this.resize();
    this.status("Live2D ativo");
  }

  render() {
    if (!this.gl || !this.renderer || !this.model || this.contextLost) return;
    const gl = this.gl;
    this.resize();
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    this.model.update();
    this.renderer.setMvpMatrix(this.matrix);
    this.renderer.setRenderState(null, [0, 0, this.canvas.width, this.canvas.height]);
    this.renderer.drawModel();
  }

  async destroy(clearSource = true) {
    if (this.gl) {
      for (const texture of this.textures) this.gl.deleteTexture(texture);
    }
    this.textures = [];
    if (this.renderer) {
      try { this.renderer.release(); } catch (error) { console.warn("Renderer release:", error); }
    }
    if (this.moc && this.model) {
      try { this.moc.deleteModel(this.model); } catch (error) { console.warn("Model release:", error); }
    }
    if (this.moc) {
      try { CubismMoc.delete(this.moc); } catch (error) { console.warn("MOC release:", error); }
    }
    this.renderer = null;
    this.model = null;
    this.moc = null;
    this.matrix = null;
    this.gl = null;
    if (clearSource) {
      this.zip = null;
      this.config = null;
      this.configPath = "";
    }
  }

  dispose() {
    this.canvas.removeEventListener("webglcontextlost", this.onContextLost);
    this.canvas.removeEventListener("webglcontextrestored", this.onContextRestored);
    return this.destroy(true);
  }
}
