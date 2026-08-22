import express from 'express';
import { chatController } from './controllers/chat.controller';

const router = express.Router();

router.get('/', (req, res) => {
   res.send('Hello World!');
});
router.get('/api/hello', (req, res) => {
   res.json({ message: 'hello to all the person out there ,are you good' });
});

router.post('/api/chat', chatController.sendMessage);

export default router;
