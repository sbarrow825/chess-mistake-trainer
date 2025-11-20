import { useGames } from '../hooks/useGames';

export function GamesPage() {
  const { games, loading, error } = useGames();

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

  if (!games || games.length === 0) {
    return (
      <div style={{ padding: '1rem' }}>
        <h1>Games for DEV_USER</h1>
        <p>No games found. Try inserting one via POST /api/games.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Games for DEV_USER</h1>
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
    </div>
  );
}
