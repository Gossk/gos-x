// src/agent.ts
import { MockProvider } from "./mockProvider";
import fs from "fs-extra";

const provider = MockProvider; // Usamos la IA simulada para no usar OpenAI real

const MEMORY_FILE = "./memory.json";

// Cargar memoria desde archivo
let sessions: Map<string, any[]> = new Map();

async function loadMemory() {
  try {
    if (await fs.pathExists(MEMORY_FILE)) {
      const data = await fs.readJson(MEMORY_FILE);
      sessions = new Map(Object.entries(data));
      console.log("🧠 Memoria cargada con éxito!");
    } else {
      console.log("🧠 No se encontró memoria, creando nueva sesión.");
    }
  } catch (err) {
    console.error("Error cargando memoria:", err);
  }
}

// Guardar memoria en archivo
async function saveMemory() {
  try {
    const obj = Object.fromEntries(sessions);
    await fs.writeJson(MEMORY_FILE, obj, { spaces: 2 });
  } catch (err) {
    console.error("Error guardando memoria:", err);
  }
}

await loadMemory();

export async function runGOSX(message: string, sessionId: string) {
  try {
    if (!sessions.has(sessionId)) {
      sessions.set(sessionId, [
        {
          role: "system",
          content: "🌌🤖 Eres GOS-X, un asistente futurista y animado creado por Gossk."
        }
      ]);
    }

    const history = sessions.get(sessionId)!;
    history.push({ role: "user", content: message });

    // Usamos la IA simulada gratuita
    const reply = await provider.complete({ messages: history });

    history.push({ role: "assistant", content: reply });

    await saveMemory();

    return reply;
  } catch (err) {
    console.error("Error en runGOSX:", err);
    return "🤖 ¡Oops! Hubo un error procesando tu mensaje.";
  }
}