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
  const [swipeX, setSwipeX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [startX, setStartX] = useState(0);

  useEffect(() => {
    if (options.length > 0) {
      setShuffledOptions(shuffle([...options]));
    } else {
      onComplete([]);
    }
  }, [options]);

  const handleStart = (clientX) => {
    setStartX(clientX);
    setIsSwiping(true);
  };

  const handleMove = (clientX) => {
    if (!isSwiping) return;
    const deltaX = clientX - startX;
    setSwipeX(deltaX);
  };

  const handleEnd = () => {
    if (!isSwiping) return;
    setIsSwiping(false);
    
    const threshold = 120;
    if (Math.abs(swipeX) > threshold) {
      setFadeOut(true);
      setTimeout(() => {
        if (swipeX > 0) {
          setSelectedOptions(prev => [...prev, shuffledOptions[currentIndex]]);
        }
        setCurrentIndex(prev => prev + 1);
        setSwipeX(0);
        setFadeOut(false);
      }, 200);
    } else {
      setSwipeX(0);
    }
  };

  // Event handlers
  const handleTouchStart = (e) => handleStart(e.touches[0].clientX);
  const handleTouchMove = (e) => handleMove(e.touches[0].clientX);
  const handleMouseDown = (e) => handleStart(e.clientX);
  const handleMouseMove = (e) => handleMove(e.clientX);

  if (options.length === 0) {
    return (
      <div className="error-screen">
        <h2>No options available for selection!</h2>
        <p>Please go back and select different categories.</p>
      </div>
    );
  }

  if (shuffledOptions === null) return <div className="loading-state">Initializing options...</div>;
  if (currentIndex >= shuffledOptions.length) {
    onComplete(selectedOptions);
    return null;
  }

  const currentOption = shuffledOptions[currentIndex];
  const rotate = Math.min(swipeX * 0.1, 20);
  const opacity = 1 - Math.min(Math.abs(swipeX) / 400, 0.4);

  return (
    <div className="filter-stage">
      <h2 className="swipe-instruction">← Swipe left to remove -Swipe right to keep →</h2>
      <div 
        className={`swipe-container ${fadeOut ? 'fade-out' : ''}`}
        style={{
          transform: `translateX(${swipeX}px) rotate(${rotate}deg) scale(${1 - Math.abs(swipeX)/1000})`,
          opacity: opacity,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
      >
        <div className="option-card">
          <img src={currentOption.image} alt={currentOption.title} />
          <div className="option-info">
            <h3>{currentOption.title}</h3>
            <p>{currentOption.description}</p>
          </div>
        </div>
        <div className="swipe-feedback">
          <div className={`swipe-indicator yes ${swipeX > 50 ? 'active' : ''}`}>KEEP</div>
          <div className={`swipe-indicator no ${swipeX < -50 ? 'active' : ''}`}>REMOVE</div>
        </div>
      </div>
      <div className="progress">
        {currentIndex + 1} / {shuffledOptions.length}
      </div>
    </div>
  );
}