import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import StartScreen from './pages/StartScreen';
import GameHub from './pages/Hub';
import SQLGate from './pages/SQLGate';
import Sudoku from './pages/Sudoku';
import Vault from './pages/Vault';
import Reward from './pages/Reward';
import './index.css';

const GameContainer = () => {
  const { session } = useGame();

  if (!session) {
    return <StartScreen />;
  }

  // Phase Routing
  // Assuming phases: WARMUP, LEVEL_1, LEVEL_2, SQL_GATE, BIRTHDAY
  // The Backend constants might be slightly different strings, need to verify.
  // Based on `GamePhase` in backend models (implied):
  // "warmup", "phase_1", "phase_2", "sql_gate", "birthday"

  // Note: Backend might use uppercase or lowercase. Let's handle generic checking or just pass through.
  // The specs were: "phase"

  const phase = session.phase;

  if (phase === 'CELEBRATION') {
    return <Reward />;
  }

  if (phase === 'SQL_GATE') {
    return <SQLGate />;
  }

  if (phase === 'SUDOKU') {
    return <Sudoku />;
  }

  if (phase === 'VAULT') {
    return <Vault />;
  }

  // Everyone else is in the Hub
  // The Hub itself handles showing/hiding panels based on state if needed,
  // but for "WARMUP", "PHASE_1", "PHASE_2", it's all the Dashboard.
  return <GameHub />;
};

function App() {
  return (
    <GameProvider>
      <GameContainer />
    </GameProvider>
  );
}

export default App;
