import { useState, useEffect } from 'react';
import './OptionFilter.css';

function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function OptionFilter({ options, onComplete }) {
  const [shuffledOptions, setShuffledOptions] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Initialize shuffled options when the component mounts or options change
  useEffect(() => {
    if (options.length > 0) {
      setShuffledOptions(shuffle([...options]));
    } else {
      onComplete([]); // Immediately complete if no options are available
    }
  }, [options]);

  // Handle empty options case
  if (options.length === 0) {
    return (
      <div className="error-screen">
        <h2>No options available for selection!</h2>
        <p>Please go back and select different categories.</p>
      </div>
    );
  }

  // Loading state while initializing
  if (shuffledOptions === null) {
    return <div className="loading-state">Initializing options...</div>;
  }

  // Completion state when all options are processed
  if (currentIndex >= shuffledOptions.length) {
    onComplete(selectedOptions);
    return null;
  }

  const currentOption = shuffledOptions[currentIndex];

  return (
    <div className="filter-stage">
      <h2>Include this?</h2>
      <div className="option-card">
        <img src={currentOption.image} alt={currentOption.title} />
        <div className="option-info">
          <h3>{currentOption.title}</h3>
          <p>{currentOption.description}</p>
        </div>
        <div className="filter-buttons">
          <button
            onClick={() => {
              setSelectedOptions(prev => [...prev, currentOption]);
              setCurrentIndex(prev => prev + 1);
            }}
            className="yes-button"
          >
            Yes
          </button>
          <button
            onClick={() => setCurrentIndex(prev => prev + 1)}
            className="no-button"
          >
            No
          </button>
        </div>
        <div className="progress">
          {currentIndex + 1} / {shuffledOptions.length}
        </div>
      </div>
    </div>
  );
}