import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Code, Terminal, Cpu, RefreshCw } from 'lucide-react';

// --- GAME 1: PATTERN PULSE ---
export const PatternPulse = ({ onComplete }) => {
    const [sequence, setSequence] = useState([]);
    const [userSeq, setUserSeq] = useState([]);
    const [playing, setPlaying] = useState(false);
    const [showing, setShowing] = useState(false);
    const [status, setStatus] = useState(null); // 'success', 'fail'

    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'];

    const startGame = () => {
        const newSeq = Array(5).fill(0).map(() => Math.floor(Math.random() * 4));
        setSequence(newSeq);
        setUserSeq([]);
        setPlaying(true);
        setShowing(true);
        setStatus(null);
    };

    useEffect(() => {
        if (showing && sequence.length > 0) {
            let i = 0;
            const interval = setInterval(() => {
                if (i >= sequence.length) {
                    setShowing(false);
                    clearInterval(interval);
                }
                i++;
            }, 800);
            return () => clearInterval(interval);
        }
    }, [showing, sequence]);

    const handleClick = (idx) => {
        if (showing || status) return;
        const newSeq = [...userSeq, idx];
        setUserSeq(newSeq);

        if (newSeq[newSeq.length - 1] !== sequence[newSeq.length - 1]) {
            setStatus('fail');
            setTimeout(() => {
                setPlaying(false);
                setStatus(null);
            }, 1000);
            return;
        }

        if (newSeq.length === sequence.length) {
            setStatus('success');
            setTimeout(() => onComplete(50), 500);
        }
    };

    if (!playing) return (
        <div className="text-center">
            <button className="game-btn" onClick={startGame}>START SEQUENCE</button>
            <p className="mt-4 text-sm text-slate-500">Memorize the pattern. Replicate it.</p>
        </div>
    );

    return (
        <div className="flex flex-col items-center gap-8 w-full">
            <h3 className="text-cyan-400 font-mono tracking-widest text-lg">
                {showing ? 'OBSERVE...' : status === 'fail' ? 'SEQUENCE FAILED' : status === 'success' ? 'SEQUENCE VERIFIED' : 'REPEAT SEQUENCE'}
            </h3>

            {showing && (
                <div className="flex gap-4 mb-4 h-16 items-center">
                    {sequence.map((c, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.5 }}
                            className={`w-4 h-4 rounded-full ${colors[c]} shadow-lg`}
                        />
                    ))}
                </div>
            )}

            <div className={`grid grid-cols-2 gap-6 ${showing ? 'opacity-50 pointer-events-none' : ''}`}>
                {colors.map((c, idx) => (
                    <motion.div
                        key={idx}
                        className={`w-24 h-24 rounded-2xl ${c} cursor-pointer opacity-80 shadow-2xl border-4 border-transparent hover:scale-105 transition-all
                            ${userSeq.includes(idx) ? 'brightness-125' : ''}
                        `}
                        onClick={() => handleClick(idx)}
                        whileTap={{ scale: 0.9 }}
                    />
                ))}
            </div>

            {status === 'fail' && <p className="text-red-500 font-bold animate-pulse">ERROR: PATTERN MISMATCH</p>}
        </div>
    );
};

// --- GAME 2: MATH CHECKSUM ---
export const MathChecksum = ({ onComplete }) => {
    const [num, setNum] = useState(0);
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        setNum(Math.floor(Math.random() * 800) + 100);
    }, []);

    const check = () => {
        const sum = num.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
        if (parseInt(answer) === sum) {
            onComplete(30);
        } else {
            setError(true);
            setAnswer('');
            setTimeout(() => setError(false), 1000);
        }
    };

    return (
        <div className="flex flex-col items-center gap-6 text-center w-full max-w-sm">
            <div className="p-4 bg-purple-900/20 rounded-full border border-purple-500/30">
                <Cpu size={48} className="text-purple-400" />
            </div>

            <div>
                <h3 className="text-xl font-bold text-white mb-1">VERIFY CHECKSUM</h3>
                <p className="text-sm text-slate-400">Sum the digits to verify integrity.</p>
            </div>

            <div className="w-full text-5xl font-mono font-black tracking-widest bg-slate-950 border border-slate-800 py-6 rounded-xl text-slate-200 shadow-inner">
                {num}
            </div>

            <div className="flex gap-2 w-full">
                <input
                    type="number"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="SUM"
                    className={`bg-slate-900 border-2 rounded-xl p-3 text-center text-xl w-full outline-none transition-colors font-bold ${error ? 'border-red-500 text-red-500' : 'border-slate-700 focus:border-purple-500 text-white'}`}
                    onKeyDown={(e) => e.key === 'Enter' && check()}
                />

                <button
                    className="bg-purple-600 hover:bg-purple-500 text-white rounded-xl px-6 font-bold transition-all"
                    onClick={check}
                >
                    <CheckCircle />
                </button>
            </div>
        </div>
    );
};

// --- GAME 3: CODE FIX ---
export const CodeFix = ({ onComplete }) => {
    const snippets = [
        {
            code: `def greet(name)\n    print("Hello " + name)`,
            options: ["Missing colon (:)", "Wrong indentation", "Print needs brackets"],
            correct: 0
        },
        {
            code: `x = 10\nif x = 10:\n    print("Equal")`,
            options: ["x = 10 is wrong", "Change = to ==", "Change x to y"],
            correct: 1
        }
    ];

    const [current, setCurrent] = useState(0);
    const [shake, setShake] = useState(false);

    const handleChoice = (idx) => {
        if (idx === snippets[current].correct) {
            onComplete(40);
        } else {
            setShake(true);
            setTimeout(() => setShake(false), 500);
        }
    };

    return (
        <div className="w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-green-400">
                    <Terminal size={20} />
                    <span className="font-mono text-sm tracking-wide">DEBUG_MODE_ACTIVE</span>
                </div>
                <div className="text-xs text-slate-500 uppercase">Challenge {current + 1}/{snippets.length}</div>
            </div>

            <motion.div
                animate={shake ? { x: [-5, 5, -5, 5, 0] } : {}}
                className="bg-slate-950 p-6 rounded-xl border border-slate-800 font-mono text-sm text-gray-300 mb-6 whitespace-pre shadow-inner overflow-x-auto"
            >
                {snippets[current].code}
            </motion.div>

            <div className="flex flex-col gap-3">
                {snippets[current].options.map((opt, i) => (
                    <button
                        key={i}
                        className="p-4 text-left bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-700 hover:border-green-500/50 transition-all text-sm font-medium text-slate-300 hover:text-white flex items-center group"
                        onClick={() => handleChoice(i)}
                    >
                        <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center text-xs mr-3 border border-slate-700 group-hover:border-green-500 group-hover:text-green-500">
                            {String.fromCharCode(65 + i)}
                        </span>
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
};
