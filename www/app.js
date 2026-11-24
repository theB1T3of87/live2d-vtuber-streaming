import JSZip from "jszip";

import { CubismFramework } from "./libs/cubism-framework/live2dcubismframework.js";
import { CubismMoc } from "./libs/cubism-framework/model/cubismmoc.js";
import { CubismRenderer_WebGL } from "./libs/cubism-framework/rendering/cubismrenderer_webgl.js";
import { CubismModelMatrix } from "./libs/cubism-framework/math/cubismmodelmatrix.js";

const $ = (id) => document.getElementById(id);

const importScreen = $("importScreen");
const renderScreen = $("renderScreen");
const modelInput = $("modelInput");
const importBtn = $("importBtn");
const readyBtn = $("readyBtn");
const backBtn = $("backBtn");
const reloadBtn = $("reloadBtn");
const status = $("status");
const details = $("details");
const canvas = $("live2dCanvas");
const zoomRange = $("zoomRange");

let modelPackage = null;
let modelConfig = null;
let modelConfigPath = "";
let modelName = "";
let frameworkReady = false;
let renderer = null;
let moc = null;
let model = null;
let modelMatrix = null;
let gl = null;
let animationFrame = null;
let textures = [];
let zoom = 1;

function normalizePath(path) {
  const parts = [];

  for (const part of path.replace(/\\/g, "/").split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") parts.pop();
    else parts.push(part);
  }

  return parts.join("/");
}

function joinPath(base, file) {
  return normalizePath(base + file);
}

function findZipFile(zip, path) {
  return zip.file(path) ||
    zip.file(path.replace(/\\/g, "/"));
}

async function loadPreview(zip, paths) {
  const preferred = paths.find(path =>
    /(^|\/)(icon|preview|thumbnail)(_[0-9]+)?\.png$/i.test(path)
  );

  const candidate = preferred ||
    paths.find(path => /\.png$/i.test(path));

  if (!candidate) return;

  const blob = await zip.file(candidate).async("blob");
  const url = URL.createObjectURL(blob);

  const image = $("modelPreview");

  if (image.dataset.url) {
    URL.revokeObjectURL(image.dataset.url);
  }

  image.dataset.url = url;
  image.src = url;
  image.hidden = false;
  $("placeholder").hidden = true;
}

function showError(error) {
  console.error(error);
  status.textContent = "Erro: " + error.message;
  readyBtn.disabled = true;
}

importBtn.addEventListener("click", () => modelInput.click());

modelInput.addEventListener("change", async () => {
  const file = modelInput.files?.[0];
  if (!file) return;

  importBtn.disabled = true;
  readyBtn.disabled = true;
  details.textContent = "";
  status.textContent = "Lendo pacote ZIP...";

  try {
    const zip = await JSZip.loadAsync(file);
    const paths = Object.keys(zip.files).filter(
      path => !zip.files[path].dir
    );

    const configPath = paths.find(path =>
      path.toLowerCase().endsWith(".model3.json")
    );

    if (!configPath) {
      throw new Error("Arquivo .model3.json não encontrado.");
    }

    const config = JSON.parse(
      await zip.file(configPath).async("string")
    );

    const base = configPath.slice(
      0,
      configPath.lastIndexOf("/") + 1
    );

    const references = config.FileReferences || {};

    if (!references.Moc) {
      throw new Error("Referência ao MOC3 não encontrada.");
    }

    const mocPath = joinPath(base, references.Moc);

    if (!findZipFile(zip, mocPath)) {
      throw new Error("Arquivo MOC3 ausente: " + mocPath);
    }

    const texturePaths = (references.Textures || []).map(
      path => joinPath(base, path)
    );

    if (!texturePaths.length) {
      throw new Error("O modelo não possui texturas configuradas.");
    }

    for (const path of texturePaths) {
      if (!findZipFile(zip, path)) {
        throw new Error("Textura ausente: " + path);
      }
    }

    modelPackage = zip;
    modelConfig = config;
    modelConfigPath = configPath;
    modelName = configPath.split("/").pop()
      .replace(/\.model3\.json$/i, "");

    $("modelName").textContent = modelName;

    await loadPreview(zip, paths);

    const physics = references.Physics
      ? !!findZipFile(zip, joinPath(base, references.Physics))
      : false;

    details.innerHTML = `
      <p>✓ Configuração do modelo</p>
      <p>✓ Arquivo MOC3</p>
      <p>✓ ${texturePaths.length} textura(s)</p>
      <p>${physics ? "✓ Física encontrada" : "— Sem física configurada"}</p>
      <p>${paths.length} arquivos no pacote</p>
    `;

    status.textContent = "Modelo validado com sucesso!";
    readyBtn.disabled = false;

  } catch (error) {
    showError(error);
    modelPackage = null;
    modelConfig = null;
  } finally {
    importBtn.disabled = false;
    modelInput.value = "";
  }
});

function initializeFramework() {
  if (frameworkReady) return;

  if (!window.Live2DCubismCore) {
    throw new Error("Live2D Cubism Core não foi carregado.");
  }

  CubismFramework.startUp();
  CubismFramework.initialize();

  frameworkReady = true;
}

async function imageFromZip(zip, path) {
  const file = findZipFile(zip, path);

  if (!file) {
    throw new Error("Textura não encontrada: " + path);
  }

  const blob = await file.async("blob");

  if ("createImageBitmap" in window) {
    return await createImageBitmap(blob);
  }

  return await new Promise((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(blob);

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Não foi possível abrir uma textura."));
    };

    image.src = url;
  });
}

function resizeCanvas() {
  if (!gl || !renderer) return;

  const rect = canvas.getBoundingClientRect();
  const ratio = Math.min(window.devicePixelRatio || 1, 2);

  const width = Math.max(1, Math.round(rect.width * ratio));
  const height = Math.max(1, Math.round(rect.height * ratio));

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }

  gl.viewport(0, 0, width, height);
}

async function createTexture(image, index) {
  const texture = gl.createTexture();

  if (!texture) {
    throw new Error("Não foi possível criar uma textura WebGL.");
  }

  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_MIN_FILTER,
    gl.LINEAR
  );

  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_MAG_FILTER,
    gl.LINEAR
  );

  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_WRAP_S,
    gl.CLAMP_TO_EDGE
  );

  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_WRAP_T,
    gl.CLAMP_TO_EDGE
  );

  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    image
  );

  renderer.bindTexture(index, texture);
  textures.push(texture);
}

async function destroyRenderer() {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }

  if (gl) {
    textures.forEach(texture => gl.deleteTexture(texture));
  }

  textures = [];
  renderer = null;
  model = null;
  moc = null;
  modelMatrix = null;
  gl = null;
}

async function createLive2D() {
  await destroyRenderer();

  $("renderStatus").textContent = "Inicializando Live2D...";
  $("renderPlaceholder").hidden = false;

  gl = canvas.getContext("webgl", {
    alpha: true,
    antialias: true,
    premultipliedAlpha: true,
    preserveDrawingBuffer: false
  });

  if (!gl) {
    throw new Error("WebGL não está disponível neste dispositivo.");
  }

  initializeFramework();

  const base = modelConfigPath.slice(
    0,
    modelConfigPath.lastIndexOf("/") + 1
  );

  const references = modelConfig.FileReferences;

  $("renderStatus").textContent = "Carregando modelo...";

  const mocPath = joinPath(base, references.Moc);
  const mocBuffer = await findZipFile(
    modelPackage,
    mocPath
  ).async("arraybuffer");

  moc = CubismMoc.create(mocBuffer, false);

  if (!moc) {
    throw new Error("O Cubism não conseguiu abrir o MOC3.");
  }

  model = moc.createModel();

  if (!model) {
    throw new Error("Não foi possível criar o modelo Live2D.");
  }

  modelMatrix = new CubismModelMatrix(
    model.getCanvasWidth(),
    model.getCanvasHeight()
  );

  modelMatrix.setWidth(2.0);
  modelMatrix.setCenterPosition(0, 0);

  renderer = new CubismRenderer_WebGL();
  renderer.initialize(model);
  renderer.startUp(gl);
  renderer.setIsPremultipliedAlpha(true);

  $("renderStatus").textContent = "Carregando texturas...";

  for (let i = 0; i < references.Textures.length; i++) {
    const path = joinPath(base, references.Textures[i]);
    const image = await imageFromZip(modelPackage, path);

    await createTexture(image, i);

    if (image.close) image.close();
  }

  resizeCanvas();

  $("renderPlaceholder").hidden = true;
  $("renderStatus").textContent = "Live2D ativo";

  renderLoop();
}

function renderLoop() {
  if (!gl || !renderer || !model) return;

  resizeCanvas();

  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  model.update();

  modelMatrix.setWidth(2.0 / zoom);
  modelMatrix.setCenterPosition(0, 0);

  renderer.setMvpMatrix(modelMatrix);
  renderer.setRenderState(null, [
    0,
    0,
    canvas.width,
    canvas.height
  ]);

  renderer.drawModel();

  animationFrame = requestAnimationFrame(renderLoop);
}

readyBtn.addEventListener("click", async () => {
  if (!modelPackage || !modelConfig) return;

  importScreen.hidden = true;
  renderScreen.hidden = false;

  $("studioModelName").textContent = modelName;

  try {
    await createLive2D();
  } catch (error) {
    console.error(error);

    $("renderStatus").textContent = "Falha ao renderizar";
    $("renderPlaceholder").hidden = false;

    alert("Erro ao carregar Live2D: " + error.message);
  }
});

backBtn.addEventListener("click", async () => {
  await destroyRenderer();

  renderScreen.hidden = true;
  importScreen.hidden = false;
});

reloadBtn.addEventListener("click", async () => {
  if (!modelPackage) return;

  try {
    await createLive2D();
  } catch (error) {
    $("renderStatus").textContent = "Falha ao recarregar";
    console.error(error);
    alert(error.message);
  }
});

zoomRange.addEventListener("input", () => {
  zoom = Number(zoomRange.value) / 100;
});

window.addEventListener("resize", resizeCanvas);

canvas.addEventListener("webglcontextlost", event => {
  event.preventDefault();

  $("renderStatus").textContent = "Contexto WebGL perdido";
  if (animationFrame) cancelAnimationFrame(animationFrame);
});

$("renderStatus").textContent = "Aguardando modelo...";
