import { useState, useEffect, useCallback } from 'react';
import { shuffle } from './utils';
import './css/OptionFilter.css';

export default function OptionFilter({ options, onComplete }) {
  const [shuffledOptions, setShuffledOptions] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [swipeX, setSwipeX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [startX, setStartX] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Preload the next image
  useEffect(() => {
    if (shuffledOptions && currentIndex + 1 < shuffledOptions.length) {
      const nextImage = new Image();
      nextImage.src = shuffledOptions[currentIndex + 1].image;
    }
  }, [currentIndex, shuffledOptions]);

  // Make shuffled options
  useEffect(() => {
    if (options.length > 0) {
      setShuffledOptions(shuffle([...options]));
      setCurrentIndex(0);
      setSelectedOptions([]);
      setCompleted(false);
    } else {
      setCompleted(true);
    }
  }, [options]);

  // Finish when all options are swiped
  useEffect(() => {
    if (shuffledOptions && currentIndex >= shuffledOptions.length && !completed) {
      setCompleted(true);
      onComplete(selectedOptions);
    }
  }, [currentIndex, shuffledOptions, selectedOptions, completed, onComplete]);

  // Handle empty options
  useEffect(() => {
    if (completed && options.length === 0) {
      onComplete([]);
    }
  }, [completed, options.length, onComplete]);

  const handleStart = useCallback((clientX) => {
    setStartX(clientX);
    setIsSwiping(true);
  }, []);

  const handleMove = useCallback((clientX) => {
    if (!isSwiping) return;
    setSwipeX(clientX - startX);
  }, [isSwiping, startX]);

  const handleEnd = useCallback(() => {
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
  }, [isSwiping, swipeX, shuffledOptions, currentIndex]);

  if (options.length === 0) {
    return (
      <div className="error-screen">
        <h2>No options available for selection!</h2>
        <p>Please go back and select different categories.</p>
      </div>
    );
  }

  if (shuffledOptions === null) return <div className="loading-state">Initializing options...</div>;
  if (completed) return null;

  const currentOption = shuffledOptions[currentIndex];
  if (!currentOption) return null;

  const rotate = Math.min(swipeX * 0.1, 20);
  const opacity = 1 - Math.min(Math.abs(swipeX) / 400, 0.4);

  return (
    <>
      <div className="background-container"></div>
      <div className="filter-stage">
        <h2 className="swipe-instruction">Swipe left to remove — Swipe right to keep</h2>
        <div
          className={`swipe-container ${fadeOut ? 'fade-out' : ''}`}
          style={{
            transform: `translateX(${swipeX}px) rotate(${rotate}deg) scale(${1 - Math.abs(swipeX) / 1000})`,
            opacity: opacity,
          }}
          onTouchStart={(e) => handleStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          onTouchEnd={handleEnd}
          onMouseDown={(e) => handleStart(e.clientX)}
          onMouseMove={(e) => handleMove(e.clientX)}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
        >
          <div className="option-card">
            <img
              src={currentOption.image}
              alt={currentOption.title}
              decoding="async"
              fetchPriority="high"
            />
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
    </>
  );
}