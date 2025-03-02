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
  const [rankings, setRankings] = useState([]);
  const [tournamentWinner, setTournamentWinner] = useState(null);

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
      if (winners.length === 1) {
        setTournamentWinner(winners[0]);
      } else {
        setOptions(winners);
      }
    }
  }, [currentPairIndex, currentRoundPairs.length, winners]);

  useEffect(() => {
    if (currentRoundPairs.length === 0 || currentPairIndex >= currentRoundPairs.length) return;
    const currentPair = currentRoundPairs[currentPairIndex];
    if (currentPair.length === 1) {
      setWinners(prev => [...prev, currentPair[0]]);
      setCurrentPairIndex(prev => prev + 1);
    }
  }, [currentPairIndex, currentRoundPairs]);

  const handleChoice = (selectedOption) => {
    const currentPair = currentRoundPairs[currentPairIndex];
    const winner = selectedOption;
    const loser = currentPair.find(opt => opt !== winner);
    setWinners(prev => [...prev, winner]);
    setRankings(prev => [...prev, loser]);
    setCurrentPairIndex(prev => prev + 1);
  };

  if (tournamentWinner) {
    const finalRankings = [tournamentWinner, ...rankings.reverse()];
    return (
      <div className="results">
        <h1>🏆 Winner: {tournamentWinner.title}</h1>
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
            onClick={() => handleChoice(option)}
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