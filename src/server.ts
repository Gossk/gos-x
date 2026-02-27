// src/server.ts
import express from "express";
import cors from "cors";
import { runGOSX } from "./agent";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

app.post("/chat", async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message || !sessionId) {
      return res.status(400).json({ error: "Se requiere message y sessionId" });
    }

    const reply = await runGOSX(message, sessionId);
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 GOS-X corriendo en puerto ${PORT}`);
});