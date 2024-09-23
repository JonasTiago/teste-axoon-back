import { Router } from "express";
import { inforServer, listservers } from "../controllers/serverController.js";

const serversRoutes = new Router();

serversRoutes.get("/", listservers);
serversRoutes.get("/:host", inforServer);
// serversRoutes.get("/video-origins", listCamerasVideoOrigens);

export default serversRoutes;
