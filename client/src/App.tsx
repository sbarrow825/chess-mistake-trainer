import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { GamesPage } from './pages/GamesPage';
import { GameViewerPage } from './pages/GameViewerPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GamesPage />} />
        <Route path="/games/:id" element={<GameViewerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
