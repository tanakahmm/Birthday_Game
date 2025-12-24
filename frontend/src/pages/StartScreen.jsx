import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Play } from 'lucide-react';

const StartScreen = () => {
    const { startGame, loading } = useGame();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-6xl mb-4 neon-text" style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                    SYSTEM OVERRIDE
                </h1>
                <p className="text-xl text-secondary mb-12" style={{ color: 'var(--text-secondary)', fontSize: '1.5rem', marginBottom: '3rem' }}>
                    System Compromised. Manual Reboot Required.
                </p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary"
                    onClick={startGame}
                    disabled={loading}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    {loading ? 'Initializing...' : (
                        <>
                            <Play size={24} />
                            <span>START GAME</span>
                        </>
                    )}
                </motion.button>
            </motion.div>
        </div>
    );
};

export default StartScreen;
