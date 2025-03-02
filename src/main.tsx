import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import TournamentBracket from './TournamentBracket.jsx';
import './App.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TournamentBracket />
  </StrictMode>,
);