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

    res.set("Content-Type", "image/jpeg");
    res.set("Content-Disposition", 'inline; filename="moment.jpg"');

    res.send(moment);

    res.status(200).send();
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

export {
  listEvents,
  archiveStream,
  stopStream,
  listFramesByVideo,
  getFrame,
  listContents,
};
