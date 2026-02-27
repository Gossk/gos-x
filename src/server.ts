import express from "express";
import cors from "cors";
import { runGOSX } from "./agent.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message, sessionId } = req.body;
  try {
    const reply = await runGOSX(message, sessionId);
    res.json({ reply });
  } catch (err) {
    console.error("Error en GOS-X:", err);
    res.status(500).json({ reply: "🤖 Oops! Algo falló en GOS-X..." });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 GOS-X corriendo en puerto ${PORT}`);
});