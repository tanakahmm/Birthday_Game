import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import Confetti from 'react-confetti';

const Reward = () => {
    const { resetGame } = useGame();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4" style={{ overflow: 'hidden' }}>
            <Confetti />

            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                <h1 className="text-6xl mb-4 neon-text" style={{ fontSize: '5rem', marginBottom: '1rem', color: 'var(--gold)' }}>
                    HAPPY BIRTHDAY!
                </h1>
                <p className="text-xl text-secondary mb-12" style={{ fontSize: '1.5rem', marginBottom: '3rem' }}>
                    Mission Accomplished. System Unlocked.
                    <br />
                    Enjoy the cake 🎂
                </p>

                <button
                    className="btn-primary"
                    onClick={resetGame}
                    style={{ background: 'var(--text-primary)', color: 'var(--bg-dark)' }}
                >
                    NEW GAME +
                </button>
            </motion.div>
        </div>
    );
};

export default Reward;
