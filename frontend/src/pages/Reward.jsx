import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { Trash2 } from 'lucide-react';

import cakeImg from '../assets/birthday/cake.jpeg';
import phoneImg from '../assets/birthday/phone.jpeg';
import phone2Img from '../assets/birthday/phone2.jpeg';
import collegeImg from '../assets/birthday/college.png';

import { useGame } from '../context/GameContext';

const floatAnim = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
  }
};

const Reward = () => {
  const { width, height } = useWindowSize();
  const { resetGame } = useGame();

  const [step, setStep] = useState(0);
  const [wrongChoice, setWrongChoice] = useState(false);

  return (
    <div className="min-h-screen game-bg text-white overflow-hidden flex items-center justify-center relative">
      {step === 4 && <Confetti width={width} height={height} numberOfPieces={400} recycle />}

      <div className="game-frame">
        <AnimatePresence mode="wait">

          {/* STEP 0 — Choice */}
          {step === 0 && !wrongChoice && (
            <motion.div key="choice" className="game-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.h1 className="title-xl neon-text">Are you Dumb?</motion.h1>
              <p className="subtitle">(If none asked you this)</p>

              <motion.div className="game-btn mt-6 cursor-pointer" onClick={() => setStep(0.5)}>Yes, I am dumb</motion.div>
              <motion.div className="mt-3 text-gray-400 cursor-pointer" onClick={() => setWrongChoice(true)}>No I'm not dumb</motion.div>
            </motion.div>
          )}

          {step === 0 && wrongChoice && (
            <motion.div key="wrong" className="game-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="title-lg text-red-400">Wrong answer 😌</h2>
              <p className="subtitle">Go select the right one.</p>
              <div className="game-btn mt-6 cursor-pointer" onClick={() => setWrongChoice(false)}>Go back</div>
            </motion.div>
          )}

          {/* STEP 0.5 */}
          {step === 0.5 && (
            <motion.div key="beforeText" className="game-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="title-lg">What you had before</h2>
              <div className="game-btn mt-8 cursor-pointer" onClick={() => setStep(1)}>Continue →</div>
            </motion.div>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <motion.div key="oldPhone" className="game-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.img src={phoneImg} className="game-image cursor-pointer" onClick={() => setStep(1.5)} {...floatAnim} />
              <p className="opacity-60 mt-4">Papam</p>
            </motion.div>
          )}

          {/* STEP 1.5 */}
          {step === 1.5 && (
            <motion.div key="memory" className="game-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="title-lg italic">In memory of this 🪦</h2>
              <div className="game-btn mt-8 cursor-pointer" onClick={() => setStep(2)}>Continue →</div>
            </motion.div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <motion.div key="newPhone" className="game-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.img src={phone2Img} className="game-image game-image-lg cursor-pointer border-4 border-blue-500 shadow-xl" onClick={() => setStep(2.5)} {...floatAnim} />
              <p className="opacity-60 mt-4">Tap to flex</p>
            </motion.div>
          )}

          {/* STEP 2.5 */}
          {step === 2.5 && (
            <motion.div key="flex" className="game-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="title-lg">What you have now… okay okay enough flex 😎</h2>
              <div className="game-btn mt-8 cursor-pointer" onClick={() => setStep(3)}>Continue →</div>
            </motion.div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <motion.div key="trashIntro" className="game-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="title-lg text-gray-400">Click the trash can to view what's inside</h2>
              <Trash2 size={160} className="cursor-pointer hover:text-red-500 transition" onClick={() => setStep(3.5)} />
            </motion.div>
          )}

          {/* STEP 3.5 */}
          {step === 3.5 && (
            <motion.div key="college" className="game-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.img src={collegeImg} className="game-image game-image-lg border-4 border-yellow-400 shadow-xl" onClick={() => setStep(4)} {...floatAnim} />
              <p className="opacity-60 mt-4">Yep. That was trash.</p>
            </motion.div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <motion.div key="final" className="game-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.img src={cakeImg} className="game-image-round border-8 border-pink-500 shadow-2xl cursor-pointer" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} onClick={resetGame} />
              <h1 className="title-xl bg-gradient-to-b from-yellow-300 via-amber-400 to-orange-500 text-transparent bg-clip-text drop-shadow-[0_4px_20px_rgba(251,191,36,0.6)]">
  Happy Birthday Dumbhead 🎉
</h1>

              <p className="opacity-60">Issokayyyy Thanks chepdhu le mellaga hehe</p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default Reward;
