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

export default function TournamentBracket() {
  const [options, setOptions] = useState([]);
  const [currentRoundPairs, setCurrentRoundPairs] = useState([]);
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [winners, setWinners] = useState([]);
  const [mainLosers, setMainLosers] = useState([]);
  const [mainWinner, setMainWinner] = useState(null);
  const [secondaryBracket, setSecondaryBracket] = useState({
    options: [],
    pairs: [],
    pairIndex: 0,
    winners: [],
    rankings: [],
    winner: null,
  });

  // Main tournament logic
  useEffect(() => {
    setOptions(shuffle([...optionsData]));
  }, []);

  useEffect(() => {
    if (options.length === 0) return;
    const pairs = [];
    for (let i = 0; i < options.length; i += 2) {
      pairs.push(options.slice(i, i + 2));
    }
    setCurrentRoundPairs(pairs);
    setCurrentPairIndex(0);
    setWinners([]);
  }, [options]);

  useEffect(() => {
    if (currentPairIndex >= currentRoundPairs.length && currentRoundPairs.length > 0) {
      if (winners.length === 1 && !mainWinner) {
        setMainWinner(winners[0]);
        setSecondaryBracket(prev => ({
          ...prev,
          options: shuffle([...mainLosers]),
        }));
      } else {
        setOptions(winners);
      }
    }
  }, [currentPairIndex, currentRoundPairs.length, winners, mainWinner]);

  // Handle single-option pairs in main bracket
  useEffect(() => {
    if (currentRoundPairs.length === 0 || currentPairIndex >= currentRoundPairs.length) return;
    const currentPair = currentRoundPairs[currentPairIndex];
    if (currentPair.length === 1) {
      setWinners(prev => [...prev, currentPair[0]]);
      setCurrentPairIndex(prev => prev + 1);
    }
  }, [currentPairIndex, currentRoundPairs]);

  // Secondary tournament logic
  useEffect(() => {
    if (secondaryBracket.options.length === 0) return;
    const pairs = [];
    for (let i = 0; i < secondaryBracket.options.length; i += 2) {
      pairs.push(secondaryBracket.options.slice(i, i + 2));
    }
    setSecondaryBracket(prev => ({
      ...prev,
      pairs,
      pairIndex: 0,
      winners: [],
    }));
  }, [secondaryBracket.options]);

  useEffect(() => {
    if (secondaryBracket.pairIndex >= secondaryBracket.pairs.length && 
        secondaryBracket.pairs.length > 0) {
      if (secondaryBracket.winners.length === 1) {
        setSecondaryBracket(prev => ({
          ...prev,
          winner: prev.winners[0]
        }));
      } else {
        setSecondaryBracket(prev => ({
          ...prev,
          options: prev.winners
        }));
      }
    }
  }, [secondaryBracket.pairIndex, secondaryBracket.pairs.length, secondaryBracket.winners]);

  // Handle single-option pairs in secondary bracket
  useEffect(() => {
    if (secondaryBracket.pairs.length === 0 || 
        secondaryBracket.pairIndex >= secondaryBracket.pairs.length) return;
    const currentPair = secondaryBracket.pairs[secondaryBracket.pairIndex];
    if (currentPair.length === 1) {
      setSecondaryBracket(prev => ({
        ...prev,
        winners: [...prev.winners, currentPair[0]],
        pairIndex: prev.pairIndex + 1
      }));
    }
  }, [secondaryBracket.pairIndex, secondaryBracket.pairs]);

  const handleChoice = (selectedOption, isSecondary) => {
    if (!isSecondary) {
      const currentPair = currentRoundPairs[currentPairIndex];
      const winner = selectedOption;
      const loser = currentPair.find(opt => opt !== winner);
      setWinners(prev => [...prev, winner]);
      setMainLosers(prev => [...prev, loser]);
      setCurrentPairIndex(prev => prev + 1);
    } else {
      const currentPair = secondaryBracket.pairs[secondaryBracket.pairIndex];
      const winner = selectedOption;
      const loser = currentPair.find(opt => opt !== winner);
      setSecondaryBracket(prev => ({
        ...prev,
        winners: [...prev.winners, winner],
        rankings: [...prev.rankings, loser],
        pairIndex: prev.pairIndex + 1
      }));
    }
  };

  const getFinalRankings = () => {
    if (!mainWinner || !secondaryBracket.winner) return [];
    return [
      mainWinner,
      secondaryBracket.winner,
      ...secondaryBracket.rankings.reverse(),
      ...secondaryBracket.winners.slice(1).reverse()
    ].filter((v, i, a) => a.findIndex(t => t.title === v.title) === i);
  };

  if (mainWinner && secondaryBracket.winner) {
    const finalRankings = getFinalRankings();
    return (
      <div className="results">
        <h1>🏆 Winner: {mainWinner.title}</h1>
        <h2>Final Rankings:</h2>
        <div className="rankings">
          {finalRankings.map((option, index) => (
            <div key={option.title} className="ranking-item">
              <div className="rank">#{index + 1}</div>
              <div className="content">
                <h3>{option.title}</h3>
                <p>{option.description}</p>
              </div>
              <img src={option.image} alt={option.title} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (mainWinner) {
    if (secondaryBracket.pairs.length === 0 || 
        secondaryBracket.pairIndex >= secondaryBracket.pairs.length) {
      return <div>Processing secondary bracket...</div>;
    }

    const currentPair = secondaryBracket.pairs[secondaryBracket.pairIndex];
    
    return (
      <div className="battle-stage">
        <h2>Determine Final Rankings</h2>
        <div className="battle-options">
          {currentPair.map((option) => (
            <button
              key={option.title}
              onClick={() => handleChoice(option, true)}
              className="battle-option"
            >
              <img src={option.image} alt={option.title} />
              <div className="option-info">
                <h3>{option.title}</h3>
                <p>{option.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (currentRoundPairs.length === 0 || currentPairIndex >= currentRoundPairs.length) {
    return <div>Loading...</div>;
  }

  const currentPair = currentRoundPairs[currentPairIndex];

  if (currentPair.length === 1) {
    return <div>Processing next round...</div>;
  }

  return (
    <div className="battle-stage">
      <h2>Choose the Winner</h2>
      <div className="battle-options">
        {currentPair.map((option) => (
          <button
            key={option.title}
            onClick={() => handleChoice(option, false)}
            className="battle-option"
          >
            <img src={option.image} alt={option.title} />
            <div className="option-info">
              <h3>{option.title}</h3>
              <p>{option.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}