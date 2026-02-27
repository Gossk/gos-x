import { MockProvider } from "./mockProvider.js"; // .js si es compilado
import fs from "fs-extra";

const provider = MockProvider;
const MEMORY_FILE = "./memory.json";

let sessions: Map<string, any[]> = new Map();

async function loadMemory() {
  if (await fs.pathExists(MEMORY_FILE)) {
    const data = await fs.readJson(MEMORY_FILE);
    sessions = new Map(Object.entries(data));
  }
}

async function saveMemory() {
  const obj = Object.fromEntries(sessions);
  await fs.writeJson(MEMORY_FILE, obj, { spaces: 2 });
}

export async function runGOSX(message: string, sessionId: string) {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, [
      { role: "system", content: "You are GOS-X, an intelligent assistant created by Gossk." }
    ]);
  }

  const history = sessions.get(sessionId)!;
  history.push({ role: "user", content: message });

  const reply = await provider.complete({ messages: history });

  history.push({ role: "assistant", content: reply.message.content });

  await saveMemory();

  return reply.message.content;
}

// Inicialización al arrancar
export async function initMemory() {
  await loadMemory();
}