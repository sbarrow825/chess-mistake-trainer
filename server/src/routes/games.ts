import { Router } from 'express';
import { createGame, getGames } from '../controllers/gamesController';

const router = Router();

// POST /api/games
router.post('/', createGame);

// GET /api/games
router.get('/', getGames);

export default router;
