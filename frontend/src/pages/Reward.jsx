import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

import cakeImg from '../assets/birthday/cake.jpeg';
import phoneImg from '../assets/birthday/phone.jpeg';
import phone2Img from '../assets/birthday/phone2.jpeg';
import collegeImg from '../assets/birthday/college.png';

const Reward = () => {
    const { width, height } = useWindowSize();

    // --- STATE 1: Intro Reveal ---
    const [introState, setIntroState] = useState('dumb'); // 'dumb' | 'newyear'
    const [showConfetti, setShowConfetti] = useState(false);

    // Handle hover logic for the first section
    const handleIntroHover = () => {
        if (introState === 'dumb') {
            setTimeout(() => {
                setIntroState('newyear');
                setShowConfetti(true);
            }, 1000); // 1 second delay
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-pink-500 selection:text-white">
            {/* Global Confetti - only active after reveal */}
            {showConfetti && <Confetti width={width} height={height} numberOfPieces={500} recycle={true} />}

            {/* ---------------------------------------------------------------------------
         SECTION 1: THE REVEAL
         "You really are dumb" -> Hover 1s -> "Belated Happy New Year"
         --------------------------------------------------------------------------- */}
            <section className="h-screen flex flex-col items-center justify-center text-center px-4 relative">
                <AnimatePresence mode="wait">
                    {introState === 'dumb' ? (
                        <motion.h1
                            key="dumb"
                            className="text-5xl md:text-7xl font-bold text-gray-400 cursor-help"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, y: -50 }}
                            onMouseEnter={handleIntroHover}
                            onClick={handleIntroHover} // Mobile fallback
                        >
                            You really are dumb... 🙄
                            <span className="block text-sm font-normal mt-4 opacity-50">(Hover me for 1 sec)</span>
                        </motion.h1>
                    ) : (
                        <motion.div
                            key="newyear"
                            initial={{ opacity: 0, scale: 0.5, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ type: "spring", bounce: 0.5 }}
                            className="z-10"
                        >
                            <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 drop-shadow-lg">
                                BELATED HAPPY NEW YEAR! 🎆
                            </h1>
                            <p className="text-2xl mt-4 text-yellow-200">Better late than never, right?</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Scroll Indicator */}
                {introState === 'newyear' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        delay={2}
                        className="absolute bottom-10 animate-bounce"
                    >
                        <p className="text-sm opacity-60">Scroll for History Lesson 👇</p>
                    </motion.div>
                )}
            </section>

            {/* ---------------------------------------------------------------------------
         SECTION 2: THE UPGRADE
         Phone 1 -> Phone 2 Transition
         --------------------------------------------------------------------------- */}
            <section className="min-h-screen flex flex-col items-center justify-center p-10 bg-gradient-to-b from-black to-gray-900">
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-4xl font-bold mb-2">The Evolution</h2>
                    <p className="text-gray-400">Time flies, and so does tech.</p>
                </motion.div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
                    {/* OLD PHONE */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center"
                    >
                        <div className="relative group">
                            <img
                                src={phoneImg}
                                alt="Old Phone"
                                className="w-48 md:w-64 rounded-2xl shadow-2xl border-4 border-gray-700 filter grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                                <span className="text-white font-bold">The OG</span>
                            </div>
                        </div>
                        <p className="mt-4 text-xl font-mono text-gray-500">Ancient Relic 🦕</p>
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1, rotate: 360 }}
                        viewport={{ once: true }}
                        className="text-4xl text-yellow-500"
                    >
                        ➡️
                    </motion.div>

                    {/* NEW PHONE */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center"
                    >
                        <div className="relative">
                            <motion.img
                                src={phone2Img}
                                alt="New Phone"
                                className="w-56 md:w-72 rounded-3xl shadow-[0_0_50px_rgba(59,130,246,0.5)] border-4 border-blue-500/50"
                                whileHover={{ scale: 1.05, rotate: -2 }}
                            />
                            <motion.div
                                className="absolute -top-6 -right-6 bg-blue-600 text-white px-4 py-2 rounded-full font-bold shadow-lg"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                delay={0.5}
                            >
                                UPGRADE!
                            </motion.div>
                        </div>
                        <p className="mt-4 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                            The Beast 📱
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ---------------------------------------------------------------------------
         SECTION 3: COLLEGE FREEDOM
         Trash Can -> College Image
         --------------------------------------------------------------------------- */}
            <section className="min-h-screen flex flex-col items-center justify-center bg-gray-900 overflow-hidden">
                <motion.h2
                    className="text-4xl mb-12 font-bold"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                >
                    The Great Escape
                </motion.h2>

                <div className="relative w-full max-w-2xl h-96 flex items-center justify-center">
                    {/* TRASH CAN LAYER */}
                    <motion.div
                        className="absolute text-9xl cursor-pointer z-20 flex flex-col items-center"
                        initial={{ opacity: 1, scale: 1 }}
                        whileInView={{
                            rotate: [0, -10, 10, -10, 10, 0],
                            transition: { duration: 0.5, repeat: 2, repeatDelay: 2 }
                        }}
                        whileHover={{ scale: 1.1 }}
                        viewport={{ amount: 0.8 }}
                    >
                        <motion.div
                            initial={{ opacity: 1 }}
                            whileInView={{ opacity: 0, scale: 0, rotate: 180 }}
                            transition={{ delay: 2.5, duration: 1 }} // Wait for shake then disappear
                        >
                            🗑️
                            <p className="text-lg text-gray-500 mt-4 font-mono">Throwing out the trash...</p>
                        </motion.div>
                    </motion.div>

                    {/* COLLEGE REVEAL LAYER */}
                    <motion.div
                        className="absolute z-10 flex flex-col items-center"
                        initial={{ opacity: 0, scale: 0.1 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 3, duration: 0.8, type: "spring" }} // Appear after trash gone
                    >
                        <img
                            src={collegeImg}
                            alt="College"
                            className="w-full max-w-lg rounded-xl shadow-2xl border-8 border-white transform rotate-3"
                        />
                        <motion.h3
                            className="text-5xl font-black text-white mt-8 bg-black/50 px-6 py-2 rounded-lg backdrop-blur-sm"
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 3.5 }}
                        >
                            FINALLY FREE! 🎓
                        </motion.h3>
                    </motion.div>
                </div>
            </section>

            {/* ---------------------------------------------------------------------------
         SECTION 4: GRAND FINALE
         Cake & Birthday Wish
         --------------------------------------------------------------------------- */}
            <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-t from-pink-900 to-black text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>

                <motion.div
                    initial={{ y: 200, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="z-10"
                >
                    <motion.img
                        src={cakeImg}
                        alt="Birthday Cake"
                        className="w-64 md:w-96 rounded-full shadow-[0_0_100px_rgba(236,72,153,0.6)] border-8 border-pink-500 mx-auto"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />

                    <motion.h1
                        className="text-6xl md:text-9xl font-bold mt-10 text-pink-500 drop-shadow-[0_5px_5px_rgba(255,255,255,0.5)]"
                        initial={{ scale: 0.5 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.6 }}
                    >
                        HAPPY BIRTHDAY!
                    </motion.h1>

                    <p className="text-2xl md:text-3xl text-pink-200 mt-6 max-w-2xl mx-auto px-4">
                        To another year of surviving, thriving, and leveling up.
                        <br />
                        <span className="font-bold">You made it! 🥂</span>
                    </p>
                </motion.div>
            </section>
        </div>
    );
};

export default Reward;
