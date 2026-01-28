import { useState, useEffect } from "react";
import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Button from "./Button";

const SecretVideoModal = ({ isOpen, onClose, onWatch }) => {
  const [clickCount, setClickCount] = React.useState(0);
  
  if (!isOpen) return null;
  
  const handleMaybeLaterClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
  };
  
  const yesButtonScale = 1 + (clickCount * 0.5);
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={clickCount >= 3 ? null : onClose} />
      <motion.div
        className="glass-card-large rounded-2xl p-8 max-w-md relative z-10 text-center"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 20 }}
      >
        <h3 className="text-2xl font-bold text-white mb-4">🎥 Secret Surprise</h3>
        <p className="text-violet-200 mb-6">Would you like to watch a special video?</p>
        <div className="flex gap-3 justify-center relative">
          <motion.button
            onClick={onWatch}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl text-white font-semibold hover:shadow-lg transition-all relative z-20"
            animate={{ scale: yesButtonScale }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            whileHover={{ scale: yesButtonScale * 1.05 }}
          >
            Yes, play it! 🎬
          </motion.button>
          <button
            onClick={clickCount >= 3 ? null : handleMaybeLaterClick}
            className="px-6 py-3 bg-white/10 rounded-xl text-white font-semibold hover:bg-white/20 transition-all relative z-10"
            disabled={clickCount >= 3}
            style={{ opacity: clickCount >= 3 ? 0.3 : 1, cursor: clickCount >= 3 ? 'not-allowed' : 'pointer' }}
          >
            Maybe later
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const TARGET_MONTH_INDEX = 0;
const TARGET_DAY = 28;
const TARGET_HOUR = 23;
const TARGET_MINUTE = 59;

const getTargetDate = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const targetThisYear = new Date(currentYear, TARGET_MONTH_INDEX, TARGET_DAY, TARGET_HOUR, TARGET_MINUTE, 0, 0);
  if (targetThisYear <= now) {
    return new Date(currentYear + 1, TARGET_MONTH_INDEX, TARGET_DAY, TARGET_HOUR, TARGET_MINUTE, 0, 0);
  }
  return targetThisYear;
};

const calculateTimeLeft = (targetDate) => {
  const now = new Date();
  const difference = targetDate - now;
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
  }
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    ended: false,
  };
};

// Animation variants
const softFadeIn = {
  hidden: { opacity: 0, y: -40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }
  }
};

const bannerReveal = {
  hidden: { opacity: 0, y: -40, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 1.4, 
      ease: [0.34, 1.56, 0.64, 1],
      scale: {
        duration: 1.4,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  }
};

const buttonVariants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  },
  tap: { 
    scale: 0.96,
    transition: { duration: 0.1 }
  }
};

const glowPulse = {
  animate: {
    boxShadow: [
      "0 0 30px rgba(255, 77, 166, 0.3)",
      "0 0 50px rgba(255, 77, 166, 0.6)",
      "0 0 30px rgba(255, 77, 166, 0.3)"
    ],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity
    }
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const decorationPop = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.34, 1.56, 0.64, 1] 
    }
  }
};

// Floating particles component with mood support
const FloatingParticles = ({ speedMultiplier = 1 }) => {
  const shouldReduceMotion = useReducedMotion();
  
  if (shouldReduceMotion) return null;
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: (8 + Math.random() * 12) / speedMultiplier,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3
          }}
        />
      ))}
    </div>
  );
};

// Ambient gradient animation
const AnimatedGradient = ({ stage }) => {
  const shouldReduceMotion = useReducedMotion();
  
  const getColors = () => {
    if (stage <= 1) return { from: '#120018', via: '#1a0a2e', to: '#2a0b3d' };
    if (stage <= 3) return { from: '#180012', via: '#1e0a2e', to: '#2d0b3d' };
    if (stage <= 5) return { from: '#1a0015', via: '#220a30', to: '#300b40' };
    return { from: '#150018', via: '#1c0a2e', to: '#280b3d' };
  };

  const colors = getColors();

  return (
    <motion.div
      className="absolute inset-0 -z-10"
      animate={shouldReduceMotion ? {} : {
        background: [
          `linear-gradient(135deg, ${colors.from} 0%, ${colors.via} 50%, ${colors.to} 100%)`,
          `linear-gradient(145deg, ${colors.from} 0%, ${colors.via} 50%, ${colors.to} 100%)`,
          `linear-gradient(135deg, ${colors.from} 0%, ${colors.via} 50%, ${colors.to} 100%)`
        ]
      }}
      transition={{
        duration: 30,
        ease: "easeInOut",
        repeat: Infinity
      }}
    />
  );
};

// Bunting decoration that appears from stage 2 onwards
const Bunting = () => (
  <motion.div 
    className="absolute top-0 left-0 right-0 z-40 flex justify-center items-start h-16 overflow-visible"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
  >
    <svg className="w-full h-24" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
        const colors = ['#fbbf24', '#fcd34d', '#ec4899', '#a855f7', '#06b6d4', '#f472b6', '#fef3c7'];
        const x = (i * 12) + 5;
        return (
          <motion.g 
            key={i}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ 
              delay: i * 0.1,
              duration: 0.8,
              ease: [0.34, 1.56, 0.64, 1]
            }}
          >
            <line x1={`${x}%`} y1="0" x2={`${x + 12}%`} y2="0" stroke="#4a5568" strokeWidth="1" />
            <polygon 
              points={`${x + 2},8 ${x + 10},8 ${x + 6},20`} 
              fill={colors[i % colors.length]} 
            />
          </motion.g>
        );
      })}
    </svg>
  </motion.div>
);

function App() {
  const [targetDate] = useState(() => getTargetDate());
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(getTargetDate()));
  const [stage, setStage] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);
  const [mood, setMood] = useState(null); // 'soft' | 'magical' | 'playful'
  const [buntingPlaced, setBuntingPlaced] = useState(false);
  const [poppedBalloon, setPoppedBalloon] = useState(null);
  const [showRewind, setShowRewind] = useState(false);
  const [candleBlown, setCandleBlown] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [showSecondVideo, setShowSecondVideo] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  
  // Daily teaser variation based on days remaining
  const dailyTeasers = [
    "Something magical is awakening...",
    "The stars are aligning for you...",
    "A celebration is being prepared...",
    "Magic is brewing in the cosmos...",
    "Your special moment approaches...",
    "Dreams are taking shape...",
    "The universe is conspiring..."
  ];
  const dailyTeaser = dailyTeasers[timeLeft.days % dailyTeasers.length] || dailyTeasers[0];
  
  // Mood multipliers
  const moodConfig = {
    soft: { particleSpeed: 0.7, glowIntensity: 0.6, animationSpeed: 1.2 },
    magical: { particleSpeed: 1.0, glowIntensity: 1.0, animationSpeed: 1.0 },
    playful: { particleSpeed: 1.3, glowIntensity: 1.2, animationSpeed: 0.8 }
  };
  const activeMood = mood ? moodConfig[mood] : moodConfig.magical;

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = calculateTimeLeft(targetDate);
      setTimeLeft(updated);
      if (updated.ended) clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const nextStage = () => {
    if (stage === 0 && !mood) return; // Require mood selection
    if (stage === 6) {
      // Trigger rewind before final phase
      setShowRewind(true);
      setTimeout(() => {
        setShowRewind(false);
        setStage(stage + 1);
      }, 1500);
    } else {
      setStage(stage + 1);
    }
  };
  const restartExperience = () => {
    setStage(0);
    setMood(null);
    setBuntingPlaced(false);
    setPoppedBalloon(null);
    setShowRewind(false);
  };
  const togglePreview = () => {
    setPreviewMode(!previewMode);
    if (!previewMode) {
      // When entering preview mode, go to stage 1
      setStage(1);
      setMood('magical');
    } else {
      // When exiting preview mode, reset to stage 0
      setStage(0);
    }
  };

  // When countdown ends, show Morning Glow page directly
  useEffect(() => {
    if (timeLeft.ended && stage === 0) {
      setStage(1);
      setMood('magical'); // Set default mood
    }
  }, [timeLeft.ended, stage]);

  // PHASE 0: COUNTDOWN / LOCKED STATE
  if (!timeLeft.ended && !previewMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#120018] via-[#1a0a2e] to-[#2a0b3d] flex flex-col items-center justify-center px-4 relative overflow-hidden">
        <AnimatedGradient stage={0} />
        <FloatingParticles speedMultiplier={1 + (timeLeft.days % 3) * 0.1} />
        <div className="stars-bg absolute inset-0"></div>
        <div className="vignette absolute inset-0"></div>
        
        {/* Top Left: Logo */}
        <motion.div 
          className="absolute top-6 left-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-sm">🎉</span>
            </div>
            <div>
              <div className="text-white text-sm font-semibold">Isha's Day</div>
            </div>
          </div>
        </motion.div>
        
        {/* Top Right: Secret Access */}
        <motion.button 
          onClick={togglePreview}
          className="absolute top-6 right-6 glass-pill px-4 py-2 text-xs uppercase tracking-wider text-white hover:bg-white/10 transition-all flex items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>🔒</span> Secret Access
        </motion.button>

        {/* Center Content */}
        <motion.div 
          className="relative z-10 text-center max-w-4xl mx-auto space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Daily Teaser */}
          <motion.div
            className="text-violet-400 text-sm italic mb-6"
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {dailyTeaser}
          </motion.div>
          
          {/* Locked Chapter Badge */}
          <motion.div 
            className="flex justify-center mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="glass-pill px-5 py-2 text-[10px] uppercase tracking-[0.2em] text-pink-400 font-semibold">
              ● LOCKED CHAPTER
            </div>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Something Special<br />Is Coming 🎁
          </motion.h1>
          
          <motion.p 
            className="text-base md:text-lg text-violet-300 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            The stars are aligning for a magical celebration.<br/>
            Come back at the right moment 💖
          </motion.p>

          {/* Countdown Grid */}
          <motion.div 
            className="grid grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto mt-12"
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
          >
            {[
              { value: timeLeft.days, label: 'Days' },
              { value: timeLeft.hours, label: 'Hours' },
              { value: timeLeft.minutes, label: 'Minutes' },
              { value: timeLeft.seconds, label: 'Seconds', highlight: true }
            ].map((item, i) => (
              <motion.div 
                key={item.label}
                className={`glass-card rounded-2xl py-6 px-3 ${item.highlight ? 'glow-pink' : ''}`}
                variants={decorationPop}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <motion.div 
                  className={`text-4xl md:text-5xl font-bold ${item.highlight ? 'text-pink-400' : 'text-white'} tabular-nums`}
                  key={item.value}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {String(item.value).padStart(2, "0")}
                </motion.div>
                <div className={`mt-2 text-[10px] uppercase tracking-[0.15em] ${item.highlight ? 'text-pink-300' : 'text-violet-400'}`}>
                  {item.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Status Badge */}
          <motion.div 
            className="inline-flex items-center gap-3 glass-pill px-5 py-3 mt-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.div 
              className="w-4 h-4 rounded bg-pink-500 flex items-center justify-center text-[10px]"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              💖
            </motion.div>
            <div className="text-xs text-violet-200">
              <span className="uppercase tracking-wider text-[11px]">Anticipation Level</span>
              <span className="mx-2">—</span>
              <span className="text-white font-semibold">100% Calibrating...</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // PHASE 2: BANNER REVEAL / MORNING GLOW
  if (stage === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#120018] via-[#1a0a2e] to-[#2a0b3d] flex flex-col relative overflow-hidden">
        <AnimatedGradient stage={1} />
        <FloatingParticles speedMultiplier={activeMood.particleSpeed} />
        <div className="stars-bg absolute inset-0"></div>
        <div className="vignette absolute inset-0"></div>

        {/* Subtle "Isha" name pattern background */}
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.08, 0] }}
          transition={{ duration: 2, times: [0, 0.5, 1], delay: 0.5 }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-6xl font-bold text-white/5"
              style={{
                left: `${10 + (i % 4) * 25}%`,
                top: `${10 + Math.floor(i / 4) * 40}%`,
                transform: 'rotate(-15deg)'
              }}
            >
              ISHA
            </motion.div>
          ))}
        </motion.div>

        {/* Banner with Decoration */}
        <div className="relative z-40 flex justify-center mt-4 md:mt-8 mb-6 md:mb-12 px-4">
          <motion.div 
            className="relative"
            variants={bannerReveal}
            initial="hidden"
            animate="visible"
          >
            {/* Left decoration - Floating stars - Hidden on mobile */}
            <motion.div 
              className="hidden md:flex absolute -left-16 top-0 flex-col gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.span 
                className="text-3xl"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                ✨
              </motion.span>
              <motion.span 
                className="text-2xl"
                animate={{ 
                  rotate: [0, -10, 10, 0],
                  y: [0, -5, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                🌟
              </motion.span>
            </motion.div>

            {/* Enhanced Banner with gradient and shadows */}
            <motion.div 
              className="relative px-6 py-4 md:px-16 md:py-8 rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(168, 85, 247, 0.15) 50%, rgba(59, 130, 246, 0.15) 100%)',
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 20px 60px rgba(236, 72, 153, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.3)'
              }}
              animate={{
                y: [0, -3, 0],
                rotateZ: [0, 0.3, 0, -0.3, 0],
                boxShadow: [
                  '0 20px 60px rgba(236, 72, 153, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
                  '0 25px 70px rgba(168, 85, 247, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
                  '0 20px 60px rgba(236, 72, 153, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.3)'
                ]
              }}
              transition={{
                y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                rotateZ: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              {/* Animated gradient overlay */}
              <motion.div 
                className="absolute inset-0 opacity-30"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)'
                }}
                animate={{
                  x: ['-100%', '200%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 2
                }}
              />

              {/* Decorative corner accents */}
              <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-pink-400/60 rounded-tl-lg" />
              <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-purple-400/60 rounded-tr-lg" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-purple-400/60 rounded-bl-lg" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-pink-400/60 rounded-br-lg" />

              <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold relative z-10 tracking-tight text-center">
                <span className="text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.5)]">Happy Birthday</span>
                {' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 italic drop-shadow-[0_2px_15px_rgba(236,72,153,0.8)]">
                  Isha
                </span>
                {' '}
                <motion.span 
                  className="inline-block"
                  animate={{ 
                    rotate: [0, 10, -10, 10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 1
                  }}
                >
                  🎉
                </motion.span>
              </h2>
            </motion.div>

            {/* Hidden Video Button */}
            <motion.button
              onClick={() => setShowSecondVideo(true)}
              className="absolute -bottom-8 md:-bottom-12 left-1/2 -translate-x-1/2 opacity-20 hover:opacity-100 transition-opacity duration-500 text-base md:text-sm text-violet-400/50 hover:text-pink-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              whileHover={{ scale: 1.2 }}
            >
              🎥
            </motion.button>

            {/* Right decoration - Magic elements - Hidden on mobile */}
            <motion.div 
              className="hidden md:flex absolute -right-16 top-0 flex-col gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <motion.span 
                className="text-3xl" 
                animate={{ 
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.15, 1]
                }}
                transition={{ 
                  duration: 3.5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.8
                }}
              >
                🎊
              </motion.span>
              <motion.span 
                className="text-2xl"
                animate={{ 
                  rotate: [0, -15, 15, 0],
                  y: [0, -6, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.3
                }}
              >
                ✨
              </motion.span>
            </motion.div>

            {/* Floating sparkles around banner */}
            {[
              { top: '-10px', left: '20%', delay: 0, duration: 3 },
              { top: '-10px', right: '20%', delay: 0.5, duration: 3.5 },
              { bottom: '-10px', left: '30%', delay: 1, duration: 4 },
              { bottom: '-10px', right: '30%', delay: 1.5, duration: 3.2 }
            ].map((sparkle, i) => (
              <motion.div
                key={i}
                className="absolute text-xl"
                style={{ top: sparkle.top, bottom: sparkle.bottom, left: sparkle.left, right: sparkle.right }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0.8, 0],
                  rotate: [0, 180]
                }}
                transition={{
                  duration: sparkle.duration,
                  repeat: Infinity,
                  delay: sparkle.delay,
                  ease: "easeInOut"
                }}
              >
                ✨
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex items-center justify-center px-4 md:px-6">
          <motion.div 
            className="relative z-10 text-center max-w-4xl mx-auto space-y-4 md:space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p className="text-base md:text-lg text-violet-300 fade-in">
              The celebration is just beginning...
            </p>

            {/* Secret sparkle button - plays spoof.mov */}
            <motion.button
              onClick={() => setShowVideoPlayer(true)}
              className="opacity-20 hover:opacity-100 transition-opacity duration-500 text-xs text-violet-400/50 hover:text-violet-300"
              whileHover={{ scale: 1.1 }}
            >
              ✨
            </motion.button>

            {/* Large Card with Image */}
            <motion.div 
              className="glass-card-large rounded-2xl md:rounded-3xl overflow-hidden max-w-3xl mx-auto mt-4 md:mt-8"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
            >
              <div className="relative h-60 md:h-80 overflow-hidden">
                <img 
                  src="/main2.jpeg" 
                  alt="Birthday celebration"
                  className="w-full h-full object-cover"
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"
                  animate={{
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              <div className="p-4 md:p-6 text-left">
                <h3 className="text-lg md:text-2xl font-bold text-white mb-2 md:mb-4">A Magical Day for Someone Like You</h3>
              </div>
            </motion.div>

            <div className="mt-8">
              {/* Removed next stage button - this is the final page */}
            </div>
          </motion.div>
        </div>
        
        <AnimatePresence>
          <SecretVideoModal 
            isOpen={showVideoModal}
            onClose={() => setShowVideoModal(false)}
            onWatch={() => {
              setShowVideoModal(false);
              setShowVideoPlayer(true);
            }}
          />
        </AnimatePresence>
        
        <AnimatePresence>
          {showVideoPlayer && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                onClick={() => setShowVideoPlayer(false)}
                className="absolute top-4 right-4 z-50 text-white text-2xl hover:text-pink-400 transition-colors"
              >
                ✕
              </button>
              <video
                src="/gud.mov"
                controls
                autoPlay
                className="max-w-full max-h-full rounded-lg"
              >
                Your browser does not support the video tag.
              </video>
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {showSecondVideo && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                onClick={() => setShowSecondVideo(false)}
                className="absolute top-4 right-4 z-50 text-white text-2xl hover:text-pink-400 transition-colors"
              >
                ✕
              </button>
              <video
                src="/spoof.mov"
                controls
                autoPlay
                className="max-w-full max-h-full rounded-lg"
              >
                Your browser does not support the video tag.
              </video>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Default fallback - show countdown if nothing matches
  return null;
}

export default App;
