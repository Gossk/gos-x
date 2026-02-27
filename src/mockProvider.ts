import type { ModelProvider } from "@agentlib/core";

export const MockProvider: ModelProvider = {
  name: "mock",
  complete: async ({ messages }: any) => {
    // Aquí puedes hacer que devuelva algo “inteligente” según el mensaje
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    return {
      message: {
        content: `🤖 Respuesta simulada: "${lastUserMessage}"`,
      },
    };
  },
};