import { useEffect, useState } from 'react';
import './App.css';

type Game = Record<string, unknown>;

function App() {
  const [games, setGames] = useState<Game[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/games');

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        setGames(data);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return <div style={{ padding: '1rem' }}>Loading games…</div>;
  }

  if (error) {
    return (
      <div style={{ padding: '1rem', color: 'red' }}>
        Error fetching games: {error}
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Games for DEV_USER</h1>
      {(!games || games.length === 0) ? (
        <p>No games found. Try inserting one via POST /api/games.</p>
      ) : (
        <pre
          style={{
            marginTop: '1rem',
            padding: '1rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            background: '#111',
            color: '#0f0',
            fontSize: '0.8rem',
            maxHeight: '70vh',
            overflow: 'auto',
          }}
        >
          {JSON.stringify(games, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;
