import "dotenv/config"
import express from "express"
import cors from "cors"
import { runGOSX } from "./agent.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("public"))

app.post("/chat", async (req, res) => {
  try {
    const { message, sessionId } = req.body

    const reply = await runGOSX(
      message,
      sessionId || "default"
    )

    res.json({ reply })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "GOS-X internal error" })
  }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`🚀 GOS-X running on port ${PORT}`)
})