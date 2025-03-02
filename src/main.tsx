import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import OptionFilter from './OptionFilter';
import TournamentBracket from './TournamentBracket';
import './App.css';
import './HomePage.css';

function App() {
  const [filteredOptions, setFilteredOptions] = useState<Array<any> | null>(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/app" element={
          <div className="app-container">
            {filteredOptions !== null ? (
              filteredOptions.length > 0 ? (
                <TournamentBracket filteredOptions={filteredOptions} />
              ) : (
                <div className="error-screen">
                  <h2>No options selected!</h2>
                  <button onClick={() => setFilteredOptions(null)}>
                    ← Go back to selection
                  </button>
                </div>
              )
            ) : (
              <OptionFilter onComplete={(options) => setFilteredOptions(options)} />
            )}
          </div>
        } />
      </Routes>
    </Router>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);