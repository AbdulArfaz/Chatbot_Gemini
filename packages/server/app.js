import express from 'express';

import z, { string } from 'zod';
import { chatService } from './services/chat.service';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
   res.send('Hello World!');
});
app.get('/api/hello', (req, res) => {
   res.json({ message: 'hello to all the person out there ,are you good' });
});

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
      const replyText = await chatService.sendMessage(prompt, conversationId);

      res.json({ message: replyText });
   } catch (error) {
      console.log('Gemini Error:', error);
      res.status(500).json({
         error: error.message || 'Failed to generate AI response',
      });
   }
});

export { app };
