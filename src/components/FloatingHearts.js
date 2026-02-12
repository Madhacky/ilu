import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

export const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
      size: 20 + Math.random() * 20,
      opacity: 0.1 + Math.random() * 0.3
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            bottom: -50
          }}
          animate={{
            y: [-50, -window.innerHeight - 100],
            x: [0, (Math.random() - 0.5) * 100],
            rotate: [0, 360]
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <Heart
            size={heart.size}
            fill="#F43F5E"
            color="#E11D48"
            style={{ opacity: heart.opacity }}
          />
        </motion.div>
      ))}
    </div>
  );
};