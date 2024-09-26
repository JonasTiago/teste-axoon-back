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

export { listEvents };
