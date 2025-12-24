import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const TaskCard = ({ task, onComplete }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card"
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <h3 style={{ color: 'var(--text-primary)' }}>{task.name}</h3>
                <span style={{
                    background: 'rgba(56, 189, 248, 0.1)',
                    color: 'var(--accent-neon)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem'
                }}>
                    +{task.reward_cp} CP
                </span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                {task.description}
            </p>

            <button
                className="btn-primary"
                style={{
                    padding: '0.5rem',
                    fontSize: '0.9rem',
                    width: '100%',
                    opacity: 0.9
                }}
                onClick={() => onComplete(task.task_id)}
            >
                Complete
            </button>
        </motion.div>
    );
};

export default TaskCard;
