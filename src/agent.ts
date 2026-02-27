import { MockProvider } from "./mockProvider";
import fs from "fs-extra"

const provider = MockProvider;

const MEMORY_FILE = "./memory.json"

// Cargar memoria desde archivo
let sessions: Map<string, any[]> = new Map()

async function loadMemory() {
  if (await fs.pathExists(MEMORY_FILE)) {
    const data = await fs.readJson(MEMORY_FILE)
    sessions = new Map(Object.entries(data))
  }
}

// Guardar memoria en archivo
async function saveMemory() {
  const obj = Object.fromEntries(sessions)
  await fs.writeJson(MEMORY_FILE, obj, { spaces: 2 })
}

await loadMemory()

export async function runGOSX(message: string, sessionId: string) {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, [
      { role: "system", content: "You are GOS-X, an intelligent assistant created by Gossk." }
    ])
  }

  const history = sessions.get(sessionId)!
  history.push({ role: "user", content: message })

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: history
  })

  const reply = completion.choices[0].message.content || ""

  history.push({ role: "assistant", content: reply })

  await saveMemory()

  return reply
}