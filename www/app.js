import JSZip from "jszip";
import { Live2DRenderer } from "./live2d-renderer.js";
import { FaceTracking } from "./face-tracking.js";

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
const cameraBtn = $("cameraBtn");
const cameraStatus = $("cameraStatus");
const cameraVideo = $("cameraVideo");

let modelPackage = null;
let modelConfig = null;
let modelConfigPath = "";
let modelName = "";
let live2dRenderer = null;
let faceTracking = new FaceTracking();
let cameraStream = null;
let animationFrame = null;
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

async function createLive2D() {
  await destroyRenderer();
  $("renderStatus").textContent = "Inicializando Live2D...";
  $("renderPlaceholder").hidden = false;

  live2dRenderer = new Live2DRenderer(canvas, $("renderStatus"));
  live2dRenderer.setZoom(zoom);
  await live2dRenderer.load(modelPackage, modelConfig, modelConfigPath);

  $("renderPlaceholder").hidden = true;
  $("renderStatus").textContent = "Live2D ativo";
  renderLoop();
}

async function destroyRenderer() {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }
  if (live2dRenderer) {
    await live2dRenderer.dispose();
    live2dRenderer = null;
  }
}

function resizeCanvas() {
  live2dRenderer?.resize();
}

async function stopCamera() {
  if (faceTracking) await faceTracking.stop(cameraVideo);
  cameraStream = null;
  cameraBtn.textContent = "Ativar câmera";
  cameraStatus.textContent = "Câmera desligada";
}

async function startCamera() {
  cameraBtn.disabled = true;
  cameraStatus.textContent = "Inicializando rastreamento facial...";
  try {
    if (!faceTracking) faceTracking = new FaceTracking();
    cameraStream = await faceTracking.start(cameraVideo, message => {
      cameraStatus.textContent = message;
    });
    cameraBtn.textContent = "Desativar câmera";
  } catch (error) {
    console.error("Erro no rastreamento facial:", error);
    await stopCamera();
    cameraStatus.textContent = "Erro na câmera: " + error.message;
  } finally {
    cameraBtn.disabled = false;
  }
}

cameraBtn.addEventListener("click", async () => {
  if (cameraStream) await stopCamera();
  else await startCamera();
});

function renderLoop() {
  if (!live2dRenderer) return;
  if (faceTracking?.running && live2dRenderer.model) {
    faceTracking.update(live2dRenderer.model, null, message => {
      cameraStatus.textContent = message;
    });
  }
  live2dRenderer.render();
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
  await stopCamera();
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
  live2dRenderer?.setZoom(zoom);
});

window.addEventListener("resize", resizeCanvas);

$("renderStatus").textContent = "Aguardando modelo...";
