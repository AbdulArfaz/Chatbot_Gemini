import fs from 'fs';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ai = new GoogleGenAI({
   apiKey: process.env.GEMINI_API_KEY,
   httpOptions: {
      timeout: 120000,
   },
});

const template = fs.readFileSync(
   path.join(__dirname, '..', 'prompts', 'chatbot.txt'),
   'utf8'
);
const parkInfo = fs.readFileSync(
   path.join(__dirname, '..', 'prompts', 'WonderWorld.md'),
   'utf8'
);
const instructions = template.replace('{{parkInfo}}', parkInfo);

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
               systemInstruction: instructions,
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
