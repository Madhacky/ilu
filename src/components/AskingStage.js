import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const romanticMessages = [
  "Hey Sadiya… don't break my heart 💔🥺",
  "That button is broken on purpose 😌",
  "Come on Sadiya… you know the answer ❤️",
  "My heart skips every time you try NO 💓",
  "Destiny says YES only 😉",
  "Stop running from love Sadiya 😭💘",
  "You're making this harder than it needs to be 💕",
  "The universe already knows your answer 🌟",
  "Nice try Sadiya, but love always wins 💖"
];

export const AskingStage = ({ onYesClick }) => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const noButtonRef = useRef(null);
  const containerRef = useRef(null);

  const moveNoButton = () => {
    if (!noButtonRef.current) return;

    const button = noButtonRef.current.getBoundingClientRect();
    const buttonWidth = button.width;
    const buttonHeight = button.height;

    // Calculate the button's original layout position (without any transform applied)
    const originalLeft = button.left - noPosition.x;
    const originalTop = button.top - noPosition.y;

    const padding = 20;

    // Calculate the allowed x/y range so the button stays within the viewport
    const minX = padding - originalLeft;
    const maxX = window.innerWidth - buttonWidth - padding - originalLeft;
    const minY = padding - originalTop;
    const maxY = window.innerHeight - buttonHeight - padding - originalTop;

    const newX = minX + Math.random() * Math.max(maxX - minX, 0);
    const newY = minY + Math.random() * Math.max(maxY - minY, 0);

    setNoPosition({ x: newX, y: newY });
    
    const randomMessage = romanticMessages[Math.floor(Math.random() * romanticMessages.length)];
    setCurrentMessage(randomMessage);
    setShowMessage(true);
    setAttempts(prev => prev + 1);
    
    setTimeout(() => setShowMessage(false), 3000);
  };

  const handleYesClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E11D48', '#F43F5E', '#FB7185', '#FDA4AF']
    });
    
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#A78BFA', '#E11D48', '#FCD34D']
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#A78BFA', '#E11D48', '#FCD34D']
      });
    }, 250);

    setTimeout(onYesClick, 500);
  };

  const handleNoHover = () => {
    moveNoButton();
  };

  const handleNoClick = () => {
    moveNoButton();
    setCurrentMessage("Nice try Sadiya! But I know you love me. 💝");
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center px-4 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center relative z-10"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, -2, 2, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-8"
        >
          <Heart size={80} fill="#E11D48" color="#BE123C" className="mx-auto mb-6" />
        </motion.div>

        <motion.h1
          className="handwritten text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 px-4"
          style={{ color: '#881337' }}
          animate={{ 
            y: [0, -10, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Sadiya, do you love me?
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2 mb-12"
        >
          <Sparkles size={20} className="text-rose-600" />
          <p className="text-lg text-rose-700 font-medium">Choose wisely... 💕</p>
          <Sparkles size={20} className="text-rose-600" />
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center relative">
          <motion.button
            data-testid="yes-btn"
            onClick={handleYesClick}
            className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 px-12 rounded-full text-xl uppercase tracking-widest shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                '0 10px 30px rgba(225, 29, 72, 0.3)',
                '0 10px 50px rgba(225, 29, 72, 0.6)',
                '0 10px 30px rgba(225, 29, 72, 0.3)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            YES 💖
          </motion.button>

          <motion.button
            ref={noButtonRef}
            data-testid="no-btn"
            onMouseEnter={handleNoHover}
            onClick={handleNoClick}
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-4 px-12 rounded-full text-xl uppercase tracking-widest shadow-lg"
            animate={{
              x: noPosition.x,
              y: noPosition.y
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20
            }}
            whileHover={{ scale: 1.05 }}
          >
            NO 💔
          </motion.button>
        </div>

        {attempts > 5 && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-rose-600 text-lg font-medium"
          >
            You've tried {attempts} times Sadiya... maybe it's a sign? 😏
          </motion.p>
        )}
      </motion.div>

      {showMessage && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-md px-8 py-4 rounded-2xl shadow-2xl z-50 max-w-md mx-4"
          style={{ border: '3px solid #E11D48' }}
        >
          <p className="text-rose-700 text-lg font-semibold text-center">{currentMessage}</p>
        </motion.div>
      )}
    </div>
  );
};