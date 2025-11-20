export interface Game {
  _id: string;              
  userId: string;           
  source: string; // e.g 'chess.com'
  event?: string;
  site?: string;
  date?: string;
  white?: string;
  black?: string;
  whiteElo?: number;
  blackElo?: number;
  result?: '1-0' | '0-1' | '1/2-1/2' | string;
  eco?: string;
  timeControl?: string;
  termination?: string;
  gameUrl?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}
