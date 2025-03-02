import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LeahImage from './assets/Leah.png';
import './HomePage.css';

export default function HomePage() {
  const [showTitle, setShowTitle] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer1 = setTimeout(() => setShowTitle(true), 1000);
    const timer2 = setTimeout(() => setShowImage(true), 2000);
    const timer3 = setTimeout(() => setShowText(true), 3000);
    const timer4 = setTimeout(() => setShowButton(true), 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className="home-page">
      <div className={`fade-in ${showTitle ? 'visible' : ''}`}>
        <h1 className="title">Leah's Ladder</h1>
      </div>
      
      <div className={`fade-in ${showImage ? 'visible' : ''}`}>
        <img 
          src={LeahImage} 
          alt="Leah's Ladder" 
          className="main-image"
        />
      </div>

      <div className={`fade-in ${showText ? 'visible' : ''}`}>
        <p className="subtext">Unsure what to do? Try Leah's Ladder</p>
      </div>

      <div className={`fade-in ${showButton ? 'visible' : ''}`}>
        <button 
          className="start-button"
          onClick={() => navigate('/app')}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}