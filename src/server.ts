import express from "express";
import { runGOSX, initMemory } from "./agent.js"; // .js si ESM
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

await initMemory(); // cargar memoria al iniciar

app.post("/chat", async (req, res) => {
  const { message, sessionId } = req.body;
  if (!message || !sessionId) return res.status(400).json({ error: "Falta message o sessionId" });

  try {
    const reply = await runGOSX(message, sessionId);
    res.json({ reply });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error ejecutando GOS-X" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 GOS-X corriendo en puerto ${PORT}`);
});