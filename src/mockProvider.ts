export const MockProvider = {
  async complete({ messages }: { messages: { role: string; content: string }[] }) {
    const userMessage = messages[messages.length - 1].content;

    // Respuestas simuladas, futuristas y animadas
    const responses = [
      `✨ Procesando tus datos cósmicos... tu mensaje: "${userMessage}"`,
      `🚀 GOS-X responde: "${userMessage.toUpperCase()}" (modo futurista activado)`,
      `🤖 Analizando el flujo de información... tu input: "${userMessage}"`,
      `🌌 Interfaz neuronal lista: "${userMessage}" ha sido comprendido`
    ];

    // Elegir una respuesta aleatoria
    const reply = responses[Math.floor(Math.random() * responses.length)];
    return reply;
  }
};