import { Router } from "express";

const archiveEventsRoutes = new Router();

// archiveEventsRoutes.get("/", listContents);
archiveEventsRoutes.post("/", exportStream);
// archiveEventsRoutes.get("/detectors", listEvents);
// archiveEventsRoutes.get("/:starttime", archiveStream);
// archiveEventsRoutes.get("/stop/:uuid", stopStream);
// archiveEventsRoutes.get("/frame/snapshot/:starttime", getFrame);
// archiveEventsRoutes.get("/frames/:endtime/:begintime", listFramesByVideo);

export default archiveEventsRoutes;
