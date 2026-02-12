import { Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const MusicPlayer = () => {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792cb.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.button
      data-testid="music-toggle"
      onClick={toggleMute}
      className="fixed top-6 right-6 z-50 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg hover:shadow-xl"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{ border: '2px solid #E11D48' }}
    >
      {isMuted ? (
        <VolumeX size={24} className="text-rose-600" />
      ) : (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Volume2 size={24} className="text-rose-600" />
        </motion.div>
      )}
    </motion.button>
  );
};