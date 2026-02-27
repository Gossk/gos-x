export const MockProvider = {
  async complete({ messages }: { messages: any[] }) {
    const last = messages[messages.length - 1].content;
    return {
      message: {
        content: `✨ GOS-X dice: "${last}"`
      }
    };
  }
};