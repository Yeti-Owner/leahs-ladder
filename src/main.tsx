import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import TournamentBracket from './TournamentBracket';
import OptionFilter from './OptionFilter';
import './App.css';

function App() {
  const [filteredOptions, setFilteredOptions] = useState<Array<any> | null>(null);

  return (
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
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);