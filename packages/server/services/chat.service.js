import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
   apiKey: process.env.GEMINI_API_KEY,
   httpOptions: {
      timeout: 120000,
   },
});

const conversations = new Map();

export const chatService = {
   /**
    *
    * @param {string} prompt
    * @param {string} conversationId
    * @returns {Promise<{ message: string}}
    */

   async sendMessage(prompt, conversationId) {
      let chatSession = conversations.get(conversationId);
      if (!chatSession) {
         chatSession = ai.chats.create({
            model: 'gemini-3.5-flash-lite',
            config: {
               temperature: 0.5,
               maxOutputTokens: 8192,
               topP: 0.95,
            },
         });
      }
      conversations.set(conversationId, chatSession);

      const response = await chatSession.sendMessage({ message: prompt });
      console.log('Al response recieved successfully');

      return response.text;
   },
};
