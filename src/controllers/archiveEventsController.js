import { archiveEventsService } from "../services/archiveEventsService.js";

async function listContents(req, res) {
  const { videoSourceid } = req.query;
  try {
    const servers = await archiveEventsService.listContents(videoSourceid);
    res.status(200).send(servers);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function archiveStream(req, res) {
  const { videoSourceid } = req.query;
  const { starttime } = req.params;

  try {
    const { uuid } = await archiveEventsService.getUuid(
      videoSourceid,
      starttime
    );

    const stream = await archiveEventsService.archiveStream(
      videoSourceid,
      starttime,
      uuid
    );

    res.set("X-Stream-UUID", uuid); // UUID no cabeçalho
    res.set("Access-Control-Expose-Headers", "X-Stream-UUID");

    res.set("Content-Type", "multipart/x-mixed-replace; boundary=ngpboundary");
    res.set("Content-Disposition", "inline");

    stream.pipe(res);

    stream.on("end", () => {
      res.end();
    });

    stream.on("error", (err) => {
      console.log("Stream error:", err);
      res.status(500).send("Error in stream");
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function stopStream(req, res) {
  const { videoSourceid } = req.query;
  const { uuid } = req.params;
  try {
    const moment = await archiveEventsService.archiveStopStream(
      uuid,
      videoSourceid
    );

    // res.set("Content-Type", "image/jpeg");
    // res.set("Content-Disposition", 'inline; filename="moment.jpg"');

    res.status(200).send(moment);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function listFramesByVideo(req, res) {
  const { videoSourceid } = req.query;
  const { endtime, begintime } = req.params;

  console.log("listFremes");

  try {
    const frames = await archiveEventsService.listFramesByVideo(
      videoSourceid,
      endtime,
      begintime
    );

    res.status(200).send(frames);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function getFrame(req, res) {
  const { videoSourceid } = req.query;
  const { starttime } = req.params;

  try {
    const frame = await archiveEventsService.getFrame(videoSourceid, starttime);
    res.set("Content-Type", "image/jpeg");
    res.set("Content-Disposition", 'inline; filename="snapshot.jpg"');
    res.send(frame);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function listEvents(req, res) {
  const { videoSourceid } = req.query;
  try {
    const servers = await archiveEventsService.listEvents(videoSourceid);
    res.status(200).send(servers);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function exportArchive(req, res) {
  const { videoSourceid } = req.query;
  const { endtime, begintime } = req.params;
  const format = req.body;

  try {
    const export_id = await archiveEventsService.exportArchive(
      videoSourceid,
      endtime,
      begintime,
      format
    );

    res.status(200).send({ export_id });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function statusExport(req, res) {
  const { export_id } = req.params;

  try {
    const status = await archiveEventsService.statusExportArchive(export_id);

    res.status(200).send(status);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function deleteExport(req, res) {
  const { export_id } = req.params;

  try {
    const status = await archiveEventsService.deleteExport(export_id);

    res.status(200).send(status);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function downloadExport(req, res) {
  const { export_id } = req.params;
  const { fileName } = req.query;

  try {
    const fileStream = await archiveEventsService.downloadExport(
      export_id,
      fileName
    );

    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Type", "video/mp4");

    fileStream.pipe(res);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export {
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
};
