import React from 'react';
import { motion } from 'framer-motion';
import { Key, Box, Cpu, Shield, Zap } from 'lucide-react';

// Item Definitions - Mapping IDs to Visuals
const ITEM_DB = {
    'sql_pass': {
        name: 'SQL OVERRIDE KEY',
        desc: 'Decrypts Level 1 Security Gates.',
        icon: Key,
        color: 'text-yellow-400',
        glow: 'shadow-[0_0_15px_rgba(250,204,21,0.5)]'
    },
    'logic_core_fix': {
        name: 'LOGIC STABILIZER',
        desc: 'Repairs fractured algorithmic pathways.',
        icon: Cpu,
        color: 'text-blue-400',
        glow: 'shadow-[0_0_15px_rgba(96,165,250,0.5)]'
    },
    'vault_key': {
        name: 'VAULT ACCESS TOKEN',
        desc: 'Unlocks the final reward chamber.',
        icon: Shield,
        color: 'text-purple-400',
        glow: 'shadow-[0_0_15px_rgba(192,132,252,0.5)]'
    },
    'mystery_box': {
        name: 'UNKNOWN ARTIFACT',
        desc: 'Origin unknown. Emits faint radiation.',
        icon: Box,
        color: 'text-red-400',
        glow: 'shadow-[0_0_15px_rgba(248,113,113,0.5)]'
    }
};

const InventorySlot = ({ item, index }) => {
    const itemData = item ? ITEM_DB[item] || { name: 'UNKNOWN', desc: '???', icon: Zap, color: 'text-gray-400', glow: '' } : null;

    return (
        <motion.div
            className={`relative w-full aspect-square bg-slate-800/50 rounded-xl border-2 ${itemData ? 'border-slate-600' : 'border-slate-800'} backdrop-blur-sm overflow-hidden group`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={itemData ? { scale: 1.05, zIndex: 10 } : {}}
        >
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:10px_10px]" />

            {itemData ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                    {/* Icon */}
                    <motion.div
                        className={`mb-2 ${itemData.color} ${itemData.glow} rounded-full p-2 bg-slate-900/50`}
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    >
                        <itemData.icon size={32} strokeWidth={1.5} />
                    </motion.div>

                    {/* Text */}
                    <h4 className={`text-[0.65rem] font-bold tracking-wider uppercase ${itemData.color} truncate w-full`}>
                        {itemData.name}
                    </h4>

                    {/* Hover Description Tooltipish */}
                    <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <p className={`text-[0.6rem] font-mono ${itemData.color} mb-1`}>{itemData.name}</p>
                        <p className="text-[0.5rem] text-gray-400 font-sans leading-tight">{itemData.desc}</p>
                    </div>
                </div>
            ) : (
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <div className="w-8 h-8 border border-white/20 rotate-45" />
                </div>
            )}
        </motion.div>
    );
};

const Inventory = ({ items = [] }) => {
    // Ensure we always show at least 8 slots for that "grid" feel
    const slots = [...items];
    while (slots.length < 8) {
        slots.push(null);
    }

    return (
        <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden">
            {/* Decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />

            {/* <h3 className="text-sm font-mono text-cyan-400 mb-4 flex items-center gap-2">
                <Box size={16} /> STORAGE MATRIX
            </h3> */}
            <div className="mb-4" />

            <div className="grid grid-cols-4 gap-3">
                {slots.map((item, idx) => (
                    <InventorySlot key={idx} item={item} index={idx} />
                ))}
            </div>
        </div>
    );
};

export default Inventory;
