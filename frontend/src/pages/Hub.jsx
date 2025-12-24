import React, { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import TaskCard from '../components/TaskCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ShoppingCart, Key, Terminal } from 'lucide-react';
import { api } from '../api/client'; // Direct access for specialized calls if needed, or stick to context

// Mock Data for Tasks/Store if backend is empty initially, 
// but we should try to fetch from backend if possible.
// For now, let's assume we render what we know or static lists for the MVP structure
// until we hook up full data fetching. 
// Actually, the spec says "Frontend reflects backend state".
// But we don't have a "getTasks" endpoint in the spec context provided?
// Wait, the user provided backend files show `GameSession` but I didn't check for a `get_tasks` endpoint.
// Let's check `gameplay.py` again in my head... 
// It had `complete_task` and `buy_item`. It didn't seem to have "list available tasks".
// The backend might be missing that, or I missed it.
// I'll assume for this "Frontend Spec" implementation, I might need to hardcode the available tasks/items 
// on the frontend or create an endpoint. 
// Given the prompt "make the changes", I should probably hardcode the definitions 
// that match the backend's *expected* IDs, effectively acting as the client-side config.

const AVAILABLE_TASKS = [
    { task_id: 'click_1', name: 'Click if you think you are dumb', description: 'Just a simple click to get started.', reward_cp: 10 },
    { task_id: 'click_5', name: 'Click if you think you are dumb * 5', description: 'Click 5 times quickly.', reward_cp: 50 },
];

const STORE_ITEMS = [
    { item_id: 'sql_pass', name: 'SQL Gate Key', cost: 1000, description: 'Access key for the restricted sector.', icon: Key }
];

const GameHub = () => {
    const { session, completeTask, buyItem, resetGame } = useGame();

    if (!session) return <div>Loading...</div>;

    const { points, phase, inventory, current_cp } = session;

    return (
        <div className="container">
            {/* Header / Stats */}
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                paddingBottom: '1rem'
            }}>
                <div>
                    <h2 className="neon-text">PHASE: {phase}</h2>
                </div>
                <div style={{ display: 'flex', gap: '2rem', fontSize: '1.2rem', alignItems: 'center' }}>
                    <div>
                        <span style={{ color: 'var(--text-secondary)' }}>CP: </span>
                        <span style={{ color: 'var(--gold)', fontWeight: 'bold' }}>{current_cp}</span>
                    </div>
                    <button
                        onClick={() => {
                            if (confirm("Reset Simulation? Progress will be lost.")) {
                                resetGame();
                            }
                        }}
                        style={{
                            background: 'transparent',
                            border: '1px solid var(--danger)',
                            color: 'var(--danger)',
                            fontSize: '0.8rem',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px'
                        }}
                    >
                        RESET
                    </button>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                {/* TASKS PANEL */}
                <section>
                    <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Terminal size={20} /> TASKS
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {AVAILABLE_TASKS.map(task => (
                            <TaskCard key={task.task_id} task={task} onComplete={completeTask} />
                        ))}
                    </div>
                </section>

                {/* STORE PANEL */}
                <section>
                    <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ShoppingCart size={20} /> STORE
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {STORE_ITEMS.map(item => {
                            const DeviceIcon = item.icon || ShoppingCart;
                            const isOwned = inventory.includes(item.item_id);
                            const canAfford = current_cp >= item.cost;

                            return (
                                <div key={item.item_id} className="card" style={{ opacity: isOwned ? 0.5 : 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <span style={{ fontWeight: 'bold' }}>{item.name}</span>
                                        <span style={{ color: 'var(--gold)' }}>{item.cost} CP</span>
                                    </div>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                        {item.description}
                                    </p>
                                    <button
                                        className="btn-primary"
                                        disabled={isOwned || !canAfford}
                                        onClick={() => buyItem(item.item_id)}
                                        style={{
                                            width: '100%',
                                            filter: !canAfford && !isOwned ? 'grayscale(1)' : 'none',
                                            cursor: !canAfford && !isOwned ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        {isOwned ? 'OWNED' : canAfford ? 'BUY' : 'LOCKED'}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default GameHub;
