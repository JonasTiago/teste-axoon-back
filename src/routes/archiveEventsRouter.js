import { Router } from "express";
import {
  listEvents,
  archiveStream,
  stopStream,
  listFramesByVideo,
  getFrame,
  listContents,
  exportArchive,
  statusExport,
  deleteExport,
  downloadExport,
} from "../controllers/archiveEventsController.js";

const archiveEventsRoutes = new Router();

archiveEventsRoutes.get("/", listContents);
archiveEventsRoutes.get("/detectors", listEvents);

archiveEventsRoutes.get("/:starttime", archiveStream);
archiveEventsRoutes.get("/stop/:uuid", stopStream);

archiveEventsRoutes.get("/frame/snapshot/:starttime", getFrame);
archiveEventsRoutes.get("/frames/:endtime/:begintime", listFramesByVideo);

archiveEventsRoutes.post("/export/:begintime/:endtime", exportArchive);
archiveEventsRoutes.get("/status/:export_id", statusExport);
archiveEventsRoutes.get("/download/:export_id", downloadExport);
archiveEventsRoutes.delete("/delete/:export_id", deleteExport);

export default archiveEventsRoutes;
