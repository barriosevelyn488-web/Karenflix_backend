import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/v1/version', (req, res) => {
  res.status(200).json({ status: 'success', version: '0.1.0' });
});

export default app;
