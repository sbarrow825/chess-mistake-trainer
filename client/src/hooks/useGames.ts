import { useEffect, useState } from 'react';
import type { Game } from '../types/Game';

export function useGames() {
  const [games, setGames] = useState<Game[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchGames = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/games');

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status} ${res.statusText}`);
        }

        const data = (await res.json()) as Game[];

        if (isMounted) {
          setGames(data);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchGames();

    return () => {
      isMounted = false;
    };
  }, []);

  return { games, loading, error };
}
