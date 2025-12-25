import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameModal from './GameModal';
import { useGame } from '../context/GameContext';

const TrespassModal = ({ isOpen, onClose }) => {
    const { trespass } = useGame();
    const [trespassKey, setTrespassKey] = useState('');
    const [pinError, setPinError] = useState(false);
    const [msg, setMsg] = useState(null);

    // Trespass Configuration
    const TRESPASS_PIN = "0102";
    const isValidPinFormat = (pin) => /^\d{4}$/.test(pin);

    const notify = (text) => {
        setMsg(text);
        setTimeout(() => setMsg(null), 2000);
    };

    const handleTrespassSubmit = async (e) => {
        e.preventDefault();

        if (!isValidPinFormat(trespassKey)) {
            notify("INVALID FORMAT (4 DIGITS)");
            setPinError(true);
            setTimeout(() => setPinError(false), 500);
            return;
        }

        if (trespassKey === TRESPASS_PIN) {
            notify("ACCESS GRANTED");
            // Sync with backend
            const success = await trespass(trespassKey);
            if (success) {
                setTrespassKey('');
                onClose();
            } else {
                notify("BACKEND SYNC FAILED");
            }
        } else {
            notify("ACCESS DENIED");
            setPinError(true);
            setTimeout(() => setPinError(false), 500);
            setTrespassKey('');
        }
    };

    return (
        <>
            <GameModal
                isOpen={isOpen}
                onClose={onClose}
                title="SECURITY OVERRIDE"
            >
                <form onSubmit={handleTrespassSubmit} className="flex flex-col items-center gap-6 w-full max-w-sm">
                    <div className="text-red-500/80 text-center font-mono text-sm mb-2">
                        Authorization Required — 4 Digit PIN
                    </div>

                    <motion.input
                        type="password"
                        value={trespassKey}
                        onChange={(e) => setTrespassKey(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        placeholder="ENTER 4-DIGIT PIN"
                        className="w-full bg-black/50 border border-red-900/50 rounded-lg px-4 py-3 text-center text-red-500 font-mono tracking-widest focus:outline-none focus:border-red-500 placeholder-red-900/50"
                        animate={pinError ? { x: [-6, 6, -4, 4, 0] } : {}}
                        transition={{ duration: 0.3 }}
                        autoFocus
                    />

                    <button
                        type="submit"
                        className="w-full bg-red-900/20 hover:bg-red-900/40 text-red-500 border border-red-900/50 rounded-lg px-4 py-3 font-bold tracking-widest uppercase transition-colors"
                    >
                        AUTHORIZE
                    </button>
                </form>
            </GameModal>

            {/* Local Toast for Modal Context */}
            <AnimatePresence>
                {msg && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="fixed top-8 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-2 rounded-full font-bold shadow-2xl z-[60]"
                    >
                        {msg}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default TrespassModal;
