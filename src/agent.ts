import { MockProvider } from "./mockProvider.js";
import fs from "fs-extra";

const provider = MockProvider;

const MEMORY_FILE = "./memory.json";

// Cargar memoria desde archivo
let sessions: Map<string, any[]> = new Map();

async function loadMemory() {
  if (await fs.pathExists(MEMORY_FILE)) {
    const data = await fs.readJson(MEMORY_FILE);
    sessions = new Map(Object.entries(data));
    console.log("🧠 Memoria cargada");
  }
}

// Guardar memoria en archivo
async function saveMemory() {
  const obj = Object.fromEntries(sessions);
  await fs.writeJson(MEMORY_FILE, obj, { spaces: 2 });
}

await loadMemory();

export async function runGOSX(message: string, sessionId: string) {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, [
      { role: "system", content: "You are GOS-X, a futuristic AI assistant 🌌🤖." }
    ]);
  }

  const history = sessions.get(sessionId)!;
  history.push({ role: "user", content: message });

  // Respuesta usando MockProvider (gratis)
  const reply = await provider.complete({ messages: history });

  history.push({ role: "assistant", content: reply });

  await saveMemory();

  return reply;
}