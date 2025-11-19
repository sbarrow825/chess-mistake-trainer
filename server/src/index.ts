import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import gamesRouter from './routes/games';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK', time: new Date().toISOString() });
});

// Mount games routes
app.use('/api/games', gamesRouter);

const PORT = process.env.PORT || 4000;

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
