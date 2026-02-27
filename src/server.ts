import express from "express";
import cors from "cors";
import { runGOSX, loadMemory } from "./agent.js"; // .js si ESM

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

// Inicializar memoria al arrancar
loadMemory().then(() => console.log("🧠 Memoria cargada"));

app.post("/chat", async (req, res) => {
  const { message, sessionId } = req.body;
  if (!message || !sessionId) return res.status(400).json({ error: "Falta message o sessionId" });

  try {
    const reply = await runGOSX(message, sessionId);
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error ejecutando GOS-X" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 GOS-X corriendo en puerto ${PORT}`);
});