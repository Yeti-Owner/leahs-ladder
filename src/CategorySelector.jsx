import { useState } from 'react';
import { getUniqueTags } from './optionsData';
import './css/CategorySelector.css';

export default function CategorySelector({ onComplete }) {
  const uniqueTags = getUniqueTags();
  
  // Initialize all categories as false (not selected)
  const [selectedCategories, setSelectedCategories] = useState(
    Object.fromEntries(uniqueTags.map(tag => [tag, false]))
  );

  const toggleCategory = (category) => {
    setSelectedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleProceed = () => {
    const activeCategories = Object.keys(selectedCategories).filter(cat => selectedCategories[cat]);
    onComplete(activeCategories);
  };

  return (
    <div className="category-stage">
      <h2>What are you in the mood for?</h2>
      <div className="category-grid">
        {uniqueTags.map(category => (
          <button
            key={category}
            onClick={() => toggleCategory(category)}
            className={`category-card ${selectedCategories[category] ? 'selected' : ''}`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      <button 
        onClick={handleProceed}
        className="proceed-button"
        disabled={!Object.values(selectedCategories).some(v => v)}
      >
        Continue
      </button>
    </div>
  );
}