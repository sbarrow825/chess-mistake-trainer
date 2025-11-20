import { useParams, Link } from 'react-router-dom';

export function GameViewerPage() {
    const { id } = useParams<{ id: string }>();

    return (
        <div style={{ padding: '1rem' }}>
            <h1>Game Viewer</h1>
            <p>
                Viewing game with id: <code>{id}</code>
            </p>

            <p style={{ marginTop: '1rem' }}>
                <Link to="/">← Back to games list</Link>
            </p>

            {
                // TODO: Fetch game by id from /api/games/:id
            }
        </div>
    );
}
