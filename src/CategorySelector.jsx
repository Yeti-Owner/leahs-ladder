import { useState } from 'react';
import { getUniqueTags } from './optionsData';
import './CategorySelector.css'; // Import the CSS file

export default function CategorySelector({ onComplete }) {
  const uniqueTags = getUniqueTags();
  const [selectedCategories, setSelectedCategories] = useState(
    Object.fromEntries(uniqueTags.map(tag => [tag, true]))
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
      <h2>Select Categories to Include</h2>
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
        Continue to Options Selection
      </button>
    </div>
  );
}