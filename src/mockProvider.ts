export const MockProvider = {
  async complete({ messages }: { messages: any[] }) {
    // Respuesta simple: eco + estilo futurista
    const lastUserMessage = messages[messages.length - 1].content;
    return {
      message: {
        content: `🤖 GOS-X responde: "${lastUserMessage}"`
      }
    };
  }
};