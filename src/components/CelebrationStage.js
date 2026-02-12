import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Sparkles, Phone } from 'lucide-react';
import { useRef, useState } from 'react';
import { timelineImages } from '../config/images';

const timelineSections = [
  {
    title: "The Day I Met You",
    emoji: "🌹",
    message: "You make my ordinary days magical ✨",
    description: "From the very first moment I saw you Sadiya, I knew there was something special about you. Your smile lit up the room and my heart hasn't stopped racing since.",
    image: timelineImages.dayWeMet
  },
  {
    title: "The Moment I Fell for You",
    emoji: "💞",
    message: "Loving you is the easiest thing I've ever done ❤️",
    description: "It wasn't one big moment, but a thousand little ones. The way you laugh, the way you care, the way you make everything better just by being you, Sadiya.",
    image: timelineImages.fellForYou
  },
  {
    title: "Every Smile You Gave Me",
    emoji: "💓",
    message: "Every heartbeat whispers your name 💓",
    description: "Your smile is my favorite sight in the world. Each one is a gift that brightens my darkest days and makes the good ones even better. Sadiya, you're my happiness.",
    image: timelineImages.everySmile
  },
  {
    title: "The Future I Dream With You",
    emoji: "💍",
    message: "You are my today and all of my tomorrows 🌹",
    description: "When I think about the future, you're in every dream, every plan, every hope. Forever feels short with you, but I want to spend every moment trying to make you happy.",
    image: timelineImages.ourFuture
  }
];

const TimelineSection = ({ section, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className="min-h-screen flex items-center justify-center px-4 py-20"
    >
      <div className="max-w-5xl w-full">
        <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}>
          <motion.div 
            style={{ y }}
            className="w-full lg:w-1/2"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={section.image}
                alt={section.title}
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/40 to-transparent" />
            </div>
          </motion.div>

          <div className="w-full lg:w-1/2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-6xl">{section.emoji}</span>
                <Sparkles size={32} className="text-rose-500" />
              </div>
              
              <h2 className="handwritten text-5xl sm:text-6xl font-bold text-rose-900 mb-4">
                {section.title}
              </h2>
              
              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border-2 border-rose-200 mb-4">
                <p className="text-xl font-semibold text-rose-700 italic">
                  {section.message}
                </p>
              </div>
              
              <p className="text-lg text-rose-800 leading-relaxed">
                {section.description}
              </p>

              <div className="flex gap-2 mt-6">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Heart size={24} fill="#E11D48" color="#BE123C" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FinalCallScreen = () => {
  const [showPulse, setShowPulse] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100" />
      
      <div className="text-center py-20 relative z-10 max-w-3xl">
        <motion.div
          animate={{ 
            scale: showPulse ? [1, 1.2, 1] : 1,
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: showPulse ? Infinity : 0
          }}
          className="mb-8"
        >
          <Phone size={100} className="mx-auto text-rose-600" strokeWidth={2} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="handwritten text-6xl sm:text-7xl lg:text-8xl font-bold text-rose-900 mb-8"
        >
          Call Me, Sadiya! 💖
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="space-y-6"
        >
          <p className="text-3xl text-rose-700 font-semibold">
            I'm waiting for you... 🥺
          </p>
          
          <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border-4 border-rose-400 max-w-2xl mx-auto">
            <p className="text-2xl text-rose-800 font-medium mb-4">
              My heart is racing right now 💓
            </p>
            <p className="text-xl text-rose-700 leading-relaxed">
              I can't wait to hear your voice. Please call me as soon as you see this. I have so much to tell you, and I want to hear everything you're thinking right now.
            </p>
          </div>

          <motion.div
            animate={{ 
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity
            }}
            className="flex justify-center gap-4 mt-8"
          >
            <Heart size={40} fill="#E11D48" color="#BE123C" />
            <Phone size={40} className="text-rose-600" />
            <Heart size={40} fill="#E11D48" color="#BE123C" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="text-2xl text-rose-600 font-medium italic mt-8"
          >
            Forever starts now... 🌹
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const CelebrationStage = () => {
  return (
    <div className="celebrate-bg relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen flex items-center justify-center px-4"
      >
        <div className="text-center py-20">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: 'spring',
              stiffness: 200,
              damping: 15
            }}
          >
            <Heart size={80} fill="#E11D48" color="#BE123C" className="mx-auto mb-6" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="handwritten text-6xl sm:text-7xl lg:text-8xl font-bold text-rose-900 mb-6"
          >
            I knew it! 💖
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-2xl text-rose-700 font-medium mb-8"
          >
            Here's our love story, Sadiya...
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex justify-center gap-3"
          >
            <Heart size={32} fill="#E11D48" color="#BE123C" />
            <Heart size={32} fill="#F43F5E" color="#E11D48" />
            <Heart size={32} fill="#FB7185" color="#F43F5E" />
          </motion.div>
        </div>
      </motion.div>

      {timelineSections.map((section, index) => (
        <TimelineSection key={index} section={section} index={index} />
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="min-h-screen flex items-center justify-center px-4"
      >
        <div className="text-center py-20">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity
            }}
          >
            <Heart size={100} fill="#E11D48" color="#BE123C" className="mx-auto mb-8" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="handwritten text-5xl sm:text-6xl lg:text-7xl font-bold text-rose-900 mb-6 px-4"
          >
            Sadiya, will you spend your whole life with me? 💍
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-2xl text-rose-700 font-medium italic"
          >
            Forever feels short with you 🌹
          </motion.p>
        </div>
      </motion.div>

      <FinalCallScreen />
    </div>
  );
};