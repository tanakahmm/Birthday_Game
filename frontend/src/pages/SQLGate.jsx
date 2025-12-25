import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { motion } from 'framer-motion';

import TrespassModal from '../components/TrespassModal';

const SQLGate = () => {
    const { validateSQL } = useGame();
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');
    const [shaking, setShaking] = useState(false);
    const [showTrespass, setShowTrespass] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await validateSQL(query);
        if (!success) {
            setError("ACCESS DENIED: Invalid Query Logic");
            setShaking(true);
            setTimeout(() => setShaking(false), 500);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '800px', marginTop: '4rem' }}>
            <motion.div
                className="card"
                animate={shaking ? { x: [-10, 10, -10, 10, 0] } : {}}
                style={{
                    background: '#000',
                    border: '1px solid var(--accent-neon)',
                    fontFamily: 'var(--font-mono)'
                }}
            >
                <h2 className="neon-text" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ color: 'var(--danger)' }}>⚠ RESTRICTED AREA</span>
                    <span>SQL GATE</span>
                </h2>

                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    System Locked. Enter Administrative SQL Query to access the restricted sector.
                    <br />
                    Task:Find the 2nd Highest Salary of Employee in Employee Table
                    <br />
                    Hint: You need to use your brain <bold style={{ color: 'var(--danger)' }}>DUMB HEAD</bold>.
                    <br />
                    Use subquery to find the 2nd highest salary.
                </p>

                <form onSubmit={handleSubmit}>
                    <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        spellCheck="false"
                        style={{
                            width: '100%',
                            height: '150px',
                            background: '#111',
                            color: 'var(--accent-neon)',
                            border: '1px solid #333',
                            padding: '1rem',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '1.1rem',
                            marginBottom: '1rem',
                            resize: 'none'
                        }}
                        placeholder="SELECT .."
                    />

                    {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', fontWeight: 'bold' }}>{error}</div>}

                    <button
                        type="submit"
                        className="btn-primary"
                        style={{ width: '100%', borderRadius: 0 }}
                    >
                        EXECUTE QUERY
                    </button>

                    <div className="mt-4 flex justify-center">
                        <button
                            type="button"
                            onClick={() => setShowTrespass(true)}
                            className="text-xs text-slate-700 hover:text-red-500 transition-colors uppercase tracking-widest opacity-50 hover:opacity-100"
                            style={{ background: 'transparent', border: 'none', cursor: 'pointer', marginTop: '1rem' }}
                        >
                            [ TRESPASS WITH KEY ]
                        </button>
                    </div>
                </form>
            </motion.div>

            <TrespassModal isOpen={showTrespass} onClose={() => setShowTrespass(false)} />
        </div>
    );
};

export default SQLGate;
