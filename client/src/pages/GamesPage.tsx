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

      <table
        style={{
          borderCollapse: 'collapse',
          width: '100%',
          marginTop: '1rem',
          fontSize: '0.9rem',
        }}
      >
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '0.5rem' }}>Date</th>
            <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '0.5rem' }}>White</th>
            <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '0.5rem' }}>Black</th>
            <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '0.5rem' }}>Result</th>
            <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '0.5rem' }}>Time Control</th>
            <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '0.5rem' }}>ECO</th>
            <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '0.5rem' }}>Link</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => {
            const date = game.date
              ? new Date(game.date)
              : game.createdAt
                ? new Date(game.createdAt)
                : null;

            const formattedDate = date
              ? date.toLocaleDateString()
              : '—';

            return (
              <tr key={game._id}>
                <td style={{ borderBottom: '1px solid #eee', padding: '0.5rem' }}>
                  {formattedDate}
                </td>
                <td style={{ borderBottom: '1px solid #eee', padding: '0.5rem' }}>
                  {game.white ?? '—'}
                </td>
                <td style={{ borderBottom: '1px solid #eee', padding: '0.5rem' }}>
                  {game.black ?? '—'}
                </td>
                <td style={{ borderBottom: '1px solid #eee', padding: '0.5rem' }}>
                  {game.result ?? '—'}
                </td>
                <td style={{ borderBottom: '1px solid #eee', padding: '0.5rem' }}>
                  {game.timeControl ?? '—'}
                </td>
                <td style={{ borderBottom: '1px solid #eee', padding: '0.5rem' }}>
                  {game.eco ?? '—'}
                </td>
                <td style={{ borderBottom: '1px solid #eee', padding: '0.5rem' }}>
                  {game.gameUrl ? (
                    <a
                      href={game.gameUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open
                    </a>
                  ) : (
                    '—'
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

}
