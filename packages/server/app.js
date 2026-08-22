import express from 'express';

const app = express();

app.get('/', (req, res) => {
   res.send('Hello World!');
});
app.get('/api/hello', (req, res) => {
   res.json({ message: 'hello to all the person out there ,are you good' });
});

export { app };
