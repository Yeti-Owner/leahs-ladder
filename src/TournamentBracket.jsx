import { useState, useEffect, useCallback, useMemo } from 'react';
import { shuffle } from './utils';
import './css/TournamentBracket.css';

export default function TournamentBracket({ filteredOptions }) {
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

  // Start tournament with filtered options
  useEffect(() => {
    if (filteredOptions && filteredOptions.length > 0) {
      const initialOptions = shuffle([...filteredOptions]);
      setOptions(initialOptions);

      if (initialOptions.length === 1) {
        setMainWinner(initialOptions[0]);
        setMainLosers([]);
      }
    }
  }, [filteredOptions]);

  // Main tournament logic
  useEffect(() => {
    if (options.length <= 1) return;

    const pairs = [];
    for (let i = 0; i < options.length; i += 2) {
      pairs.push(options.slice(i, i + 2));
    }

    if (pairs.length === 1 && pairs[0].length === 1) {
      setWinners([pairs[0][0]]);
      return;
    }

    setCurrentRoundPairs(pairs);
    setCurrentPairIndex(0);
    setWinners([]);
  }, [options]);

  // End round when all pairs done
  useEffect(() => {
    if (currentPairIndex >= currentRoundPairs.length && currentRoundPairs.length > 0) {
      if (winners.length === 1 && !mainWinner) {
        setMainWinner(winners[0]);
        if (mainLosers.length > 0) {
          setSecondaryBracket(prev => ({
            ...prev,
            options: shuffle([...mainLosers]),
          }));
        }
      } else {
        setOptions(winners);
      }
    }
  }, [currentPairIndex, winners, mainWinner, mainLosers]);

  // Zombie options go into next round
  useEffect(() => {
    if (currentRoundPairs.length === 0 || currentPairIndex >= currentRoundPairs.length) return;
    const currentPair = currentRoundPairs[currentPairIndex];
    if (currentPair.length === 1) {
      setWinners(prev => [...prev, currentPair[0]]);
      setCurrentPairIndex(prev => prev + 1);
    }
  }, [currentPairIndex, currentRoundPairs]);

  // Secondary bracket
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

  // Secondary bracket advancement
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

  // Zombie pairs go next bracket
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

  const handleChoice = useCallback((selectedOption, isSecondary) => {
    if (!isSecondary) {
      const currentPair = currentRoundPairs[currentPairIndex];
      const loser = currentPair.find(opt => opt !== selectedOption);
      setWinners(prev => [...prev, selectedOption]);
      setMainLosers(prev => [...prev, loser]);
      setCurrentPairIndex(prev => prev + 1);
    } else {
      const currentPair = secondaryBracket.pairs[secondaryBracket.pairIndex];
      const loser = currentPair.find(opt => opt !== selectedOption);
      setSecondaryBracket(prev => ({
        ...prev,
        winners: [...prev.winners, selectedOption],
        rankings: [...prev.rankings, loser],
        pairIndex: prev.pairIndex + 1
      }));
    }
  }, [currentRoundPairs, currentPairIndex, secondaryBracket.pairs, secondaryBracket.pairIndex]);

  const finalRankings = useMemo(() => {
    if (!mainWinner) return [];
    if (mainLosers.length === 0) return [mainWinner];
    if (!secondaryBracket.winner) return [];

    return [
      mainWinner,
      secondaryBracket.winner,
      ...secondaryBracket.rankings.slice().reverse(),
      ...secondaryBracket.winners.slice(1).reverse()
    ].filter((v, i, a) => a.findIndex(t => t.title === v.title) === i);
  }, [mainWinner, mainLosers, secondaryBracket.winner, secondaryBracket.rankings, secondaryBracket.winners]);

  // Single-option result
  if (mainWinner && mainLosers.length === 0) {
    return (
      <div className="results">
        <h1>Winner: {mainWinner.title}</h1>
        <h2>Final Rankings:</h2>
        <div className="rankings-container">
          <div className="ranking-item">
            <div className="rank">#1</div>
            <div className="content">
              <h3>{mainWinner.title}</h3>
              <p>{mainWinner.description}</p>
            </div>
            <img src={mainWinner.image} alt={mainWinner.title} />
          </div>
        </div>
      </div>
    );
  }

  // Final results
  if (mainWinner && secondaryBracket.winner) {
    return (
      <div className="results">
        <h1>Winner: {mainWinner.title}</h1>
        <h2>Final Rankings:</h2>
        <div className="rankings-container">
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

  // Secondary bracket
  if (mainWinner) {
    if (secondaryBracket.pairs.length === 0 ||
      secondaryBracket.pairIndex >= secondaryBracket.pairs.length) {
      return <div>Processing final rankings...</div>;
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

  if (options.length === 0) {
    return <div className="loading-state">Initializing tournament...</div>;
  }

  if (currentRoundPairs.length === 0 || currentPairIndex >= currentRoundPairs.length) {
    return <div className="loading-state">Processing next round...</div>;
  }

  const currentPair = currentRoundPairs[currentPairIndex];

  if (currentPair.length === 1) {
    return <div className="loading-state">Processing next round...</div>;
  }

  return (
    <div className="battle-stage">
      <h2>What Would You Prefer?</h2>
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