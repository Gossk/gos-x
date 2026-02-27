// src/server.ts
import express from "express";
import cors from "cors";
import { runGOSX } from "./agent.js"; // Asegúrate de usar .js en imports para ESM

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Manejo global de errores para evitar que Render marque ELIFECYCLE
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

// Endpoint principal
app.post("/chat", async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    if (!message || !sessionId) {
      return res.status(400).json({ error: "Faltan 'message' o 'sessionId'" });
    }

    const reply = await runGOSX(message, sessionId);
    res.json({ reply });
  } catch (err) {
    console.error("Error en /chat:", err);
    res.status(500).json({ error: "Error interno del servidor 🤖" });
  }
});

app.get("/", (req, res) => {
  res.send("🚀 GOS-X corriendo, envía mensajes a /chat con POST");
});

app.listen(PORT, () => {
  console.log(`🚀 GOS-X corriendo en puerto ${PORT}`);
});