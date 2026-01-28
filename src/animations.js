// Animation variants for Framer Motion
export const softFadeIn = {
  hidden: { opacity: 0, y: -40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }
  }
};

export const bannerReveal = {
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

export const buttonVariants = {
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

export const glowPulse = {
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

export const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

export const decorationPop = {
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

export const breathingGlow = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(255, 77, 166, 0.2)",
      "0 0 40px rgba(255, 77, 166, 0.4)",
      "0 0 20px rgba(255, 77, 166, 0.2)"
    ],
    scale: [1, 1.01, 1],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity
    }
  }
};
