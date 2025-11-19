import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { GameModel } from '../models/Game';
import { parsePgnHeaders } from '../utils/pgn';

// POST /api/games
export async function createGame(req: Request, res: Response) {
  try {
    const { pgn } = req.body;

    if (!pgn || typeof pgn !== 'string') {
      return res.status(400).json({ error: 'No pgn (string) in request body' });
    }

    const DEV_USER_ID = process.env.DEV_USER_ID;
    if (!DEV_USER_ID) {
      return res.status(500).json({ error: 'No DEV_USER_ID in request body' });
    }

    const userId = new Types.ObjectId(DEV_USER_ID);

    const headers = parsePgnHeaders(pgn);

    // Map PGN headers to Game fields
    const event = headers['Event'];
    const site = headers['Site'];
    const dateStr = headers['Date'];
    const white = headers['White'];
    const black = headers['Black'];
    const result = headers['Result'];
    const whiteElo = headers['WhiteElo'] ? Number(headers['WhiteElo']) : undefined;
    const blackElo = headers['BlackElo'] ? Number(headers['BlackElo']) : undefined;
    const eco = headers['ECO'];
    const timeControl = headers['TimeControl'];
    const termination = headers['Termination'];
    const gameUrl = headers['Link'];

    // Parse date if present
    let date: Date | undefined = undefined;
    if (dateStr && dateStr !== '????.??.??') {
      const [year, month, day] = dateStr.split('.').map(Number);
      if (year && month && day) {
        date = new Date(Date.UTC(year, month - 1, day));
      }
    }

    const game = await GameModel.create({
      userId,
      source: 'chess.com', // TODO: add support for other sources later
      event,
      site,
      date,
      white,
      black,
      whiteElo,
      blackElo,
      result,
      eco,
      timeControl,
      termination,
      gameUrl,
      pgn,
    });

    return res.status(201).json(game);
  } catch (err) {
    console.error('Error creating game:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// GET /api/games
export async function getGames(req: Request, res: Response) {
  try {
    const DEV_USER_ID = process.env.DEV_USER_ID;
    if (!DEV_USER_ID) {
      return res.status(500).json({ error: 'No DEV_USER_ID in request body' });
    }

    const userId = new Types.ObjectId(DEV_USER_ID);

    // TODO: add query params for filtering (e.g ELO range, date range, result, tags, etc.)
    const games = await GameModel.find({ userId })
      .sort({ date: -1, createdAt: -1 }) // newest games first
      .limit(50);

    return res.json(games);
  } catch (err) {
    console.error('Error fetching games:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
