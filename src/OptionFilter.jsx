import { useState, useEffect } from 'react';
import { optionsData } from './optionsData';

function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function OptionFilter({ onComplete }) {
  const [shuffledOptions, setShuffledOptions] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    if (optionsData.length > 0) {
      setShuffledOptions(shuffle([...optionsData]));
    } else {
      onComplete([]);
    }
  }, []);

  if (shuffledOptions === null) {
    return <div className="loading-state">Initializing options...</div>;
  }

  if (currentIndex >= shuffledOptions.length) {
    onComplete(selectedOptions);
    return null;
  }

  const currentOption = shuffledOptions[currentIndex];

  return (
    <div className="filter-stage">
      <h2>Include this option in the tournament?</h2>
      <div className="option-card">
        <img src={currentOption.image} alt={currentOption.title} />
        <div className="option-info">
          <h3>{currentOption.title}</h3>
          <p>{currentOption.description}</p>
        </div>
        <div className="filter-buttons">
          <button onClick={() => {
            setSelectedOptions(prev => [...prev, currentOption]);
            setCurrentIndex(prev => prev + 1);
          }} className="yes-button">
            Yes
          </button>
          <button onClick={() => setCurrentIndex(prev => prev + 1)} className="no-button">
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