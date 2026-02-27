// src/mockProvider.ts
import type { ModelProvider } from "@agentlib/core";

export const MockProvider: ModelProvider = {
  name: "mock",
  complete: async ({ messages }: any) => {
    const lastMessage = messages[messages.length - 1]?.content || "";
    return {
      message: {
        content: `🤖 GOS-X dice : "${lastMessage}"`,
      },
    };
  },
};