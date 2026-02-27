import 'dotenv/config'
import { GOSX } from './agent'

async function main() {
  console.log("⚡ Booting GOS-X...\n")

  const result = await GOSX.run("Initialize system")

  console.log("🧠 Response:")
  console.log(result.output)
}

main()