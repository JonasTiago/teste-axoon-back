import { serverService } from "../services/serverService.js";

async function listservers(req, res) {
  try {
    const servers = await serverService.listServer();
    res.status(200).send(servers);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function inforServer(req, res) {
  const { host } = req.params;
  try {
    const servers = await serverService.inforServer(host);
    res.status(200).send(servers);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export { listservers, inforServer };
