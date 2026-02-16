import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './HomePage';
import CategorySelector from './CategorySelector';
import OptionFilter from './OptionFilter';
import TournamentBracket from './TournamentBracket';
import { OptionsProvider, useOptionsData } from './optionsData';
import { Option } from './utils';
import './css/App.css';

function App() {
  const [filteredOptions, setFilteredOptions] = useState<Option[] | null>(null);
  const navigate = useNavigate();
  const { filterByCategories } = useOptionsData();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/categories" element={
        <CategorySelector onComplete={(categories: string[]) => {
          const filtered = filterByCategories(categories);
          setFilteredOptions(filtered);
          navigate('/options');
        }} />
      } />
      <Route path="/options" element={
        <div className="app-container">
          {filteredOptions && filteredOptions.length > 0 ? (
            <OptionFilter
              options={filteredOptions}
              onComplete={(selected: Option[]) => {
                setFilteredOptions(selected);
                navigate('/tournament');
              }}
            />
          ) : (
            <div className="error-screen">
              <h2>No options available for selected categories!</h2>
              <button onClick={() => navigate('/categories')}>
                Go back to category selection
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
                Go back to selection
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
      <OptionsProvider>
        <App />
      </OptionsProvider>
    </Router>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);