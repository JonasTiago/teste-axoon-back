import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import camerasRoutes from "./routes/camerasRouter.js";
import serversRoutes from "./routes/serversRouter.js";
import archiveEventsRoutes from "./routes/archiveEventsRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/cameras", camerasRoutes);
app.use("/servers", serversRoutes);
app.use("/events", archiveEventsRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
