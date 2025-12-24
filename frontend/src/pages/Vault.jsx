import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { motion } from 'framer-motion';
import { Lock, Coins } from 'lucide-react';

const Vault = () => {
    const { session, unlockVault } = useGame();
    const [unlocking, setUnlocking] = useState(false);
    const [error, setError] = useState('');

    const handleUnlock = async () => {
        try {
            setUnlocking(true);
            await unlockVault();
        } catch (err) {
            setError("INSUFFICIENT FUNDS. RESTART LOGIC CORE.");
            setUnlocking(false);
        }
    };

    return (
        <div className="container flex flex-col items-center justify-center min-h-screen">
            <motion.div
                className="card"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                style={{
                    textAlign: 'center',
                    padding: '3rem',
                    border: '2px solid var(--gold)',
                    boxShadow: '0 0 30px rgba(251, 191, 36, 0.2)'
                }}
            >
                <Lock size={64} color="var(--gold)" style={{ margin: '0 auto 1.5rem auto' }} />

                <h2 style={{ color: 'var(--gold)', marginBottom: '1rem', fontSize: '2rem' }}>
                    FINAL VAULT LOCKED
                </h2>

                <div style={{ margin: '2rem 0', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <span>REQUIRED:</span>
                    <Coins color="var(--accent-neon)" />
                    <span className="neon-text">500 LOGIC COINS</span>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    Your Balance: <span style={{ color: 'var(--accent-neon)', fontWeight: 'bold' }}>{session.current_cp} CP</span>
                </div>

                {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{error}</div>}

                <button
                    className="btn-primary"
                    onClick={handleUnlock}
                    disabled={unlocking}
                    style={{
                        background: 'var(--gold)',
                        color: 'var(--bg-dark)',
                        fontSize: '1.2rem',
                        padding: '1rem 3rem'
                    }}
                >
                    {unlocking ? 'DECRYPTING...' : 'UNLOCK SYSTEM'}
                </button>
            </motion.div>
        </div>
    );
};

export default Vault;
