import express from 'express';
import { GoogleGenAI } from '@google/genai';
import z, { string } from 'zod';

const app = express();

app.use(express.json());

const ai = new GoogleGenAI({
   apiKey: process.env.GEMINI_API_KEY,
   httpOptions: {
      timeout: 120000,
   },
});

app.get('/', (req, res) => {
   res.send('Hello World!');
});
app.get('/api/hello', (req, res) => {
   res.json({ message: 'hello to all the person out there ,are you good' });
});

const conversations = new Map();

const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is required')
      .max(1000, 'Prompt is too long Max is 1000 characters'),
   conversationId: z.string().min(1, 'ConversationId is Required'),
});

app.post('/api/chat', async (req, res) => {
   try {
      const parseResult = chatSchema.safeParse(req.body);
      if (!parseResult.success) {
         return res.status(400).json({
            error: parseResult.error.issues[0].message,
         });
      }

      const { prompt, conversationId } = req.body;
      let chat = conversations.get(conversationId);
      if (!chat) {
         chat = ai.chats.create({
            model: 'gemini-3.5-flash-lite',
            contents: prompt,
            config: {
               temperature: 0.5,
               maxOutputTokens: 8192,
               topP: 0.95,
            },
         });
         conversations.set(conversationId, chat);
      }
      const response = await chat.sendMessage({
         message: prompt,
      });
      res.json({ message: response.text });
   } catch (error) {
      console.log('Gemini Error:', error);
      res.status(500).json({
         error: error.message || 'Failed to generate AI response',
      });
   }
});

export { app };
