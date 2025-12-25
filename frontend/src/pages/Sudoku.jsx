import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { motion } from 'framer-motion';

// Simple Easy Sudoku Puzzle (0 = empty)
const INITIAL_BOARD = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

// Solution for validation
const SOLUTION = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

const Sudoku = () => {
    const { completeSudoku } = useGame();
    const [board, setBoard] = useState(INITIAL_BOARD);
    const [error, setError] = useState('');

    const handleChange = (row, col, value) => {
        // Only allow single digits
        if (value.length > 1) return;
        if (value !== '' && !/^[1-9]$/.test(value)) return;

        const newBoard = board.map(r => [...r]);
        newBoard[row][col] = value === '' ? 0 : parseInt(value);
        setBoard(newBoard);
        setError('');
    };

    const handleSubmit = async () => {
        // Validate
        let isCorrect = true;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] !== SOLUTION[i][j]) {
                    isCorrect = false;
                    break;
                }
            }
        }

        if (isCorrect) {
            await completeSudoku();
        } else {
            setError('INCORRECT. LOGIC SUBSYSTEM UNSTABLE.');
        }
    };

    // Auto-solve for demo convenience (Hidden cheat feature)
    const autoSolve = () => setBoard(SOLUTION);

    return (
        <div className="container flex flex-col items-center">
            <motion.div
                className="card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ background: '#0f172a', border: '1px solid var(--accent-neon)' }}
            >
                <h2 className="neon-text" onClick={autoSolve} style={{ marginBottom: '1rem', cursor: 'pointer' }}>
                    LOGIC PROTOCOL : SUDOKU
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                    Repair the logic core to proceed.
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(9, 1fr)',
                    gap: '2px',
                    background: '#334155',
                    padding: '2px',
                    border: '2px solid var(--accent-neon)',
                    marginBottom: '2rem'
                }}>
                    {board.map((row, i) => (
                        row.map((cell, j) => {
                            const styles = {
                                width: '40px',
                                height: '40px',
                                textAlign: 'center',
                                fontSize: '1.2rem',
                                border: 'none',
                                background: (i < 3 || i > 5) ? ((j < 3 || j > 5) ? '#1e293b' : '#334155') :
                                    ((j < 3 || j > 5) ? '#334155' : '#1e293b'),
                                color: INITIAL_BOARD[i][j] !== 0 ? 'var(--text-secondary)' : 'var(--text-primary)',
                                fontWeight: INITIAL_BOARD[i][j] !== 0 ? 'bold' : 'normal',
                                outline: 'none'
                            };

                            return (
                                <input
                                    key={`${i}-${j}`}
                                    value={cell === 0 ? '' : cell}
                                    onChange={(e) => handleChange(i, j, e.target.value)}
                                    readOnly={INITIAL_BOARD[i][j] !== 0}
                                    style={styles}
                                />
                            )
                        })
                    ))}
                </div>

                {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', fontWeight: 'bold' }}>{error}</div>}

                <button
                    className="btn-primary"
                    onClick={handleSubmit}
                    style={{ width: '100%' }}
                >
                    STABILIZE LOGIC CORE
                </button>

                <div className="mt-4 flex justify-center">
                    <button
                        onClick={async () => {
                            await completeSudoku();
                        }}
                        className="text-xs text-slate-700 hover:text-red-500 transition-colors uppercase tracking-widest opacity-50 hover:opacity-100"
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', marginTop: '1rem' }}
                    >
                        [ TRESPASS WITH KEY ]
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Sudoku;
