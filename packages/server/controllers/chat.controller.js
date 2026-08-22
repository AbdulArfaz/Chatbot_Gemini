import { chatService } from '../services/chat.service';
import z from 'zod';

//implementation details
const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is required')
      .max(1000, 'Prompt is too long Max is 1000 characters'),
   conversationId: z.string().min(1, 'ConversationId is Required'),
});

//public Interface
export const chatController = {
   async sendMessage(req, res) {
      const parseResult = chatSchema.safeParse(req.body);
      if (!parseResult.success) {
         return res.status(400).json({
            error: parseResult.error.issues[0].message,
         });
      }
      try {
         const { prompt, conversationId } = req.body;
         const replyText = await chatService.sendMessage(
            prompt,
            conversationId
         );

         res.json({ message: replyText });
      } catch (error) {
         console.log('Gemini Error:', error);
         res.status(500).json({
            error: error.message || 'Failed to generate AI response',
         });
      }
   },
};
