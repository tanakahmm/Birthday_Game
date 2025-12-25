import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import Inventory from '../components/Inventory';
import GameModal from '../components/GameModal';
import { PatternPulse, MathChecksum, CodeFix } from '../components/MiniGames';
import { Terminal, ShoppingCart, Key, Play, Activity, Brain } from 'lucide-react';

import TrespassModal from '../components/TrespassModal';

const AVAILABLE_GAMES = [
    {
        id: 'pattern_1',
        name: 'PATTERN',
        cp: 50,
        component: PatternPulse,
        icon: Activity,
        color: 'text-blue-400',
        bg: 'from-blue-500/20 to-blue-900/20',
    },
    {
        id: 'math_1',
        name: 'CHECKSUM',
        cp: 30,
        component: MathChecksum,
        icon: Brain,
        color: 'text-purple-400',
        bg: 'from-purple-500/20 to-purple-900/20',
    },
    {
        id: 'code_1',
        name: 'DEBUG',
        cp: 40,
        component: CodeFix,
        icon: Terminal,
        color: 'text-green-400',
        bg: 'from-green-500/20 to-green-900/20',
    },
];

const STORE_ITEMS = [
    { item_id: 'sql_pass', name: 'SQL KEY', cost: 500, description: 'Access Lvl 2', icon: Key },
];

const GameHub = () => {
    const { session, completeTask, buyItem, resetGame } = useGame();
    const [activeGame, setActiveGame] = useState(null);
    const [msg, setMsg] = useState(null);
    const [showTrespass, setShowTrespass] = useState(false);

    if (!session) return null;

    const { phase, inventory = [], current_cp = 0 } = session;

    const notify = (text) => {
        setMsg(text);
        setTimeout(() => setMsg(null), 2000);
    };

    const handleGameComplete = async (points) => {
        const game = AVAILABLE_GAMES.find((g) => g.id === activeGame);
        if (!game) return;

        await completeTask(game.id);
        setActiveGame(null);
        notify(`+${points} CP`);
    };

    const ActiveComponent = activeGame
        ? AVAILABLE_GAMES.find((g) => g.id === activeGame)?.component
        : null;

    return (
        <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[#020617]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.08),transparent_70%)]" />

            <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* LEFT PANEL */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-between items-end border-b border-white/10 pb-4"
                    >
                        <div>
                            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                SYSTEM HUB
                            </h1>
                            <p className="text-xs font-mono text-slate-500 tracking-[0.2em] uppercase">
                                Phase: {phase}
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-4xl font-black text-yellow-400 leading-none">{current_cp}</div>
                            <div className="text-[10px] text-yellow-500/50 font-bold uppercase tracking-widest">
                                Available CP
                            </div>
                        </div>
                    </motion.div>

                    {/* Games */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {AVAILABLE_GAMES.map((game) => (
                            <motion.div
                                key={game.id}
                                whileHover={{ scale: activeGame ? 1 : 1.04 }}
                                whileTap={activeGame ? {} : { scale: 0.98 }}
                                onClick={() => !activeGame && setActiveGame(game.id)}
                                className={`relative overflow-hidden rounded-2xl p-5 cursor-pointer group bg-gradient-to-br ${game.bg} border border-white/5 hover:border-white/20 transition-all ${activeGame ? 'opacity-40 pointer-events-none' : ''
                                    }`}
                            >
                                <div className="absolute top-3 right-3 opacity-20 group-hover:opacity-40 transition-opacity">
                                    <game.icon size={42} />
                                </div>

                                <div className="relative z-10">
                                    <div className={`p-2 w-fit rounded-lg bg-black/30 mb-3 ${game.color}`}>
                                        <game.icon size={20} />
                                    </div>
                                    <h3 className="font-bold text-lg mb-1 tracking-wide">{game.name}</h3>
                                    <p className="text-xs text-white/50 font-mono mb-4">+{game.cp} CP</p>
                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-white/70 group-hover:text-white">
                                        Initialize <Play size={10} fill="currentColor" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Reset */}
                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => completeTask('dumb_click')}
                            className="game-btn game-btn-danger text-xs px-4 py-2"
                        >
                            Click me if you think you are dumb (+20 CP)
                        </button>

                        <button
                            onClick={() => setShowTrespass(true)}
                            className="bg-red-900/20 hover:bg-red-900/40 text-red-500 text-[10px] font-mono px-3 py-1 rounded border border-red-900/50 uppercase tracking-widest transition-colors"
                        >
                            Trespass Protocol
                        </button>

                        <button
                            onClick={() => window.confirm('Reset progress?') && resetGame()}
                            className="text-[10px] text-red-900 hover:text-red-500 transition-colors uppercase font-bold tracking-widest"
                        >
                            Reset System
                        </button>
                    </div>
                </div>



                {/* Shop */}
                <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-5 flex-1 backdrop-blur-sm">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <ShoppingCart size={14} /> Upgrades
                    </h3>

                    <div className="space-y-3">
                        {STORE_ITEMS.map((item) => {
                            const isOwned = inventory.includes(item.item_id);
                            const canAfford = current_cp >= item.cost;

                            return (
                                <div
                                    key={item.item_id}
                                    className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 hover:border-purple-500/30 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`p-2 rounded-lg bg-slate-800 ${isOwned ? 'text-green-400' : 'text-purple-400'
                                                }`}
                                        >
                                            <item.icon size={16} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm">{item.name}</div>
                                            <div className="text-[10px] text-slate-500">{item.cost} CP</div>
                                        </div>
                                    </div>

                                    {isOwned ? (
                                        <div className="text-[10px] bg-green-500/10 text-green-500 px-2 py-1 rounded font-bold uppercase">
                                            Owned
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => buyItem(item.item_id)}
                                            disabled={!canAfford}
                                            className={`text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-wider transition-all ${canAfford
                                                ? 'bg-yellow-500 text-black hover:bg-yellow-400'
                                                : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                                                }`}
                                        >
                                            Buy
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>

            {/* Modal */}
            <GameModal
                isOpen={!!activeGame}
                onClose={() => setActiveGame(null)}
                title={AVAILABLE_GAMES.find((g) => g.id === activeGame)?.name || ''}
            >
                {ActiveComponent && <ActiveComponent onComplete={handleGameComplete} />}
            </GameModal>

            {/* Trespass Modal */}
            <TrespassModal isOpen={showTrespass} onClose={() => setShowTrespass(false)} />

            {/* Toast */}
            <AnimatePresence>
                {msg && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="fixed top-8 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-2 rounded-full font-bold shadow-2xl z-50"
                    >
                        {msg}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GameHub;
