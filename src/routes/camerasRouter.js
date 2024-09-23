import { Router } from "express";
import {
  listCameras,
  listCamerasVideoOrigens,
  snapshotCamera,
  liveCamera,
} from "../controllers/cameraController.js";

const camerasRoutes = new Router();

camerasRoutes.get("/", listCameras);
camerasRoutes.get("/video-origins", listCamerasVideoOrigens);
camerasRoutes.get("/snapshot", snapshotCamera);
camerasRoutes.get("/live", liveCamera);

export default camerasRoutes;
