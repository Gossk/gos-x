// src/mockProvider.ts
export const MockProvider = {
  complete: async ({ messages }: { messages: any[] }) => {
    // Generamos una respuesta animada/futurista simulada
    const lastUser = messages[messages.length - 1].content;
    const reply = `🤖✨ GOS-X dice: "${lastUser.split("").reverse().join("")}" 🔮`;
    return reply;
  }
};