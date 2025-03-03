import { SetStateAction, StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './HomePage';
import CategorySelector from './CategorySelector';
import OptionFilter from './OptionFilter';
import TournamentBracket from './TournamentBracket';
import { filterByCategories } from './optionsData';
import './css/App.css';

function App() {
  const [, setSelectedCategories] = useState<string[] | null>(null);
  const [filteredOptions, setFilteredOptions] = useState<any[] | null>(null);
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/categories" element={
        <CategorySelector onComplete={(categories: SetStateAction<string[] | null>) => {
          const filtered = filterByCategories(categories);
          setSelectedCategories(categories);
          setFilteredOptions(filtered);
          navigate('/options');
        }} />
      } />
      <Route path="/options" element={
        <div className="app-container">
          {filteredOptions && filteredOptions.length > 0 ? (
            <OptionFilter
              options={filteredOptions}
              onComplete={(selected: SetStateAction<any[] | null>) => {
                setFilteredOptions(selected);
                navigate('/tournament');
              }}
            />
          ) : (
            <div className="error-screen">
              <h2>No options available for selected categories!</h2>
              <button onClick={() => navigate('/categories')}>
                ← Go back to category selection
              </button>
            </div>
          )}
        </div>
      } />
      <Route path="/tournament" element={
        <div className="app-container">
          {filteredOptions && filteredOptions.length > 0 ? (
            <TournamentBracket filteredOptions={filteredOptions} />
          ) : (
            <div className="error-screen">
              <h2>No options selected for tournament!</h2>
              <button onClick={() => navigate('/categories')}>
                ← Go back to selection
              </button>
            </div>
          )}
        </div>
      } />
    </Routes>
  );
}

function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);