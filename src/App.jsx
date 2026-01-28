import { useState, useEffect } from "react";
import Button from "./Button";

const TARGET_MONTH_INDEX = 0; // January (0-based)
const TARGET_DAY = 28;
const TARGET_HOUR = 23;
const TARGET_MINUTE = 59;

const TOTAL_STAGES = 8;

const getTargetDate = () => {
  const now = new Date();
  const currentYear = now.getFullYear();

  const targetThisYear = new Date(
    currentYear,
    TARGET_MONTH_INDEX,
    TARGET_DAY,
    TARGET_HOUR,
    TARGET_MINUTE,
    0,
    0
  );

  if (targetThisYear <= now) {
    return new Date(
      currentYear + 1,
      TARGET_MONTH_INDEX,
      TARGET_DAY,
      TARGET_HOUR,
      TARGET_MINUTE,
      0,
      0
    );
  }

  return targetThisYear;
};

const calculateTimeLeft = (targetDate) => {
  const now = new Date();
  const difference = targetDate - now;

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      ended: true,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    ended: false,
  };
};

function App() {
  const [targetDate] = useState(() => getTargetDate());
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(getTargetDate()));
  const [previewMode, setPreviewMode] = useState(false);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = calculateTimeLeft(targetDate);
      setTimeLeft(updated);

      if (updated.ended) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const nextStage = () => {
    setStage(stage + 1);
  };

  const restartExperience = () => {
    setStage(0);
    setPreviewMode(false);
  };

  if (timeLeft.ended || previewMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 flex items-center justify-center px-4 overflow-hidden relative animate-bgFade animate-bgPulse">
        
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full animate-twinkle" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-yellow-200 rounded-full animate-twinkle" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-32 left-16 w-1 h-1 bg-pink-200 rounded-full animate-twinkle" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-200 rounded-full animate-twinkle" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute bottom-1/4 right-12 w-1 h-1 bg-purple-200 rounded-full animate-twinkle" style={{ animationDelay: '2s' }}></div>
        </div>

        {step >= 1 && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 animate-nameBannerDrop">
            <div className="animate-nameBannerFloat">
              <div className="relative">
                <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-300 via-yellow-200 to-pink-300 bg-clip-text text-transparent animate-shimmerGlow px-8 py-4 rounded-2xl" style={{ textShadow: '0 4px 20px rgba(255, 182, 193, 0.5), 0 0 40px rgba(255, 215, 0, 0.3)' }}>
                  Happy Birthday Isha 🎉
                </h2>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-300 rounded-full animate-starBurst" style={{ animationDelay: '1s' }}></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-pink-300 rounded-full animate-starBurst" style={{ animationDelay: '1.3s' }}></div>
              </div>
            </div>
          </div>
        )}

        {step >= 1 && (
          <div className="absolute top-0 left-0 right-0 flex justify-around items-start pt-4 animate-bannerDrop">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-80 shadow-2xl animate-bannerSway" style={{ animationDelay: '0.1s' }}></div>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full blur-xl opacity-50 animate-buttonPulse"></div>
            </div>
            <div className="relative mt-8">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-80 shadow-2xl animate-bannerSway" style={{ animationDelay: '0.3s' }}></div>
              <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-red-400 rounded-full blur-xl opacity-50 animate-buttonPulse"></div>
            </div>
            <div className="relative">
              <div className="w-28 h-28 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-80 shadow-2xl animate-bannerSway" style={{ animationDelay: '0.2s' }}></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-purple-400 rounded-full blur-xl opacity-50 animate-buttonPulse"></div>
            </div>
            <div className="relative mt-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-full opacity-80 shadow-2xl animate-bannerSway" style={{ animationDelay: '0.4s' }}></div>
              <div className="absolute inset-0 bg-gradient-to-br from-green-300 to-teal-400 rounded-full blur-xl opacity-50 animate-buttonPulse"></div>
            </div>
            <div className="absolute top-8 left-1/4 w-2 h-2 bg-white rounded-full animate-sparkle" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute top-12 right-1/4 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-sparkle" style={{ animationDelay: '1.8s' }}></div>
            <div className="absolute top-16 left-1/3 w-2 h-2 bg-pink-300 rounded-full animate-sparkle" style={{ animationDelay: '2.1s' }}></div>
            <div className="absolute top-6 right-1/3 w-1.5 h-1.5 bg-blue-200 rounded-full animate-sparkle" style={{ animationDelay: '2.4s' }}></div>
          </div>
        )}

        {step >= 3 && (
          <>
            <div className="absolute bottom-0 left-10 animate-balloonFloat" style={{ animationDelay: '0s' }}>
              <div className="relative">
                <div className="w-16 h-32 bg-gradient-to-t from-red-500 to-pink-500 rounded-full opacity-90 shadow-2xl animate-balloonDrift" style={{ animationDelay: '0s' }}>
                  <div className="animate-balloonBob" style={{ animationDelay: '0.5s' }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-red-400 to-pink-400 rounded-full blur-lg opacity-60"></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-24 bg-gradient-to-b from-red-300 to-transparent animate-balloonString"></div>
              </div>
            </div>
            <div className="absolute bottom-0 left-32 animate-balloonFloat" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <div className="w-20 h-40 bg-gradient-to-t from-blue-500 to-cyan-500 rounded-full opacity-90 shadow-2xl animate-balloonDrift" style={{ animationDelay: '0.4s' }}>
                  <div className="animate-balloonBob" style={{ animationDelay: '1s' }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-400 to-cyan-400 rounded-full blur-lg opacity-60"></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-28 bg-gradient-to-b from-blue-300 to-transparent animate-balloonString"></div>
              </div>
            </div>
            <div className="absolute bottom-0 right-10 animate-balloonFloat" style={{ animationDelay: '0.4s' }}>
              <div className="relative">
                <div className="w-18 h-36 bg-gradient-to-t from-yellow-400 to-orange-500 rounded-full opacity-90 shadow-2xl animate-balloonDrift" style={{ animationDelay: '0.8s' }}>
                  <div className="animate-balloonBob" style={{ animationDelay: '0.2s' }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-yellow-300 to-orange-400 rounded-full blur-lg opacity-60"></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-26 bg-gradient-to-b from-yellow-300 to-transparent animate-balloonString"></div>
              </div>
            </div>
            <div className="absolute bottom-0 right-32 animate-balloonFloat" style={{ animationDelay: '0.6s' }}>
              <div className="relative">
                <div className="w-16 h-32 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full opacity-90 shadow-2xl animate-balloonDrift" style={{ animationDelay: '1.2s' }}>
                  <div className="animate-balloonBob" style={{ animationDelay: '1.5s' }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-400 to-pink-400 rounded-full blur-lg opacity-60"></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-24 bg-gradient-to-b from-purple-300 to-transparent animate-balloonString"></div>
              </div>
            </div>
            <div className="absolute bottom-0 left-1/2 animate-balloonFloat" style={{ animationDelay: '0.3s' }}>
              <div className="relative">
                <div className="w-20 h-40 bg-gradient-to-t from-green-400 to-emerald-500 rounded-full opacity-90 shadow-2xl animate-balloonDrift" style={{ animationDelay: '0.6s' }}>
                  <div className="animate-balloonBob" style={{ animationDelay: '0.8s' }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-green-300 to-emerald-400 rounded-full blur-lg opacity-60"></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-28 bg-gradient-to-b from-green-300 to-transparent animate-balloonString"></div>
              </div>
            </div>
          </>
        )}

        {step >= 4 && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-10 left-10 w-3 h-3 bg-yellow-400 rounded-full opacity-80 animate-confettiBurst" style={{ animationDelay: '0s', '--tx': '-30px' }}></div>
            <div className="absolute top-0 left-1/4 w-2 h-4 bg-pink-500 opacity-70 animate-confettiBurst" style={{ animationDelay: '0.15s', '--tx': '40px' }}></div>
            <div className="absolute top-5 left-1/2 w-3 h-3 bg-blue-400 rounded-full opacity-80 animate-confettiBurst" style={{ animationDelay: '0.05s', '--tx': '-20px' }}></div>
            <div className="absolute top-0 right-1/4 w-2 h-4 bg-purple-500 opacity-70 animate-confettiBurst" style={{ animationDelay: '0.2s', '--tx': '-50px' }}></div>
            <div className="absolute top-10 right-10 w-3 h-3 bg-green-400 rounded-full opacity-80 animate-confettiBurst" style={{ animationDelay: '0.1s', '--tx': '35px' }}></div>
            <div className="absolute top-20 left-20 w-2 h-4 bg-red-500 opacity-70 animate-confettiBurst" style={{ animationDelay: '0.25s', '--tx': '25px' }}></div>
            <div className="absolute top-0 right-20 w-3 h-3 bg-orange-400 rounded-full opacity-80 animate-confettiBurst" style={{ animationDelay: '0.3s', '--tx': '-40px' }}></div>
            <div className="absolute top-32 left-1/3 w-2 h-4 bg-cyan-400 opacity-70 animate-confettiBurst" style={{ animationDelay: '0.35s', '--tx': '45px' }}></div>
            <div className="absolute top-16 right-1/3 w-3 h-3 bg-yellow-300 rounded-full opacity-80 animate-confettiBurst" style={{ animationDelay: '0.4s', '--tx': '-35px' }}></div>
            <div className="absolute top-8 left-2/3 w-2 h-4 bg-pink-400 opacity-70 animate-confettiBurst" style={{ animationDelay: '0.45s', '--tx': '30px' }}></div>
            <div className="absolute top-12 left-12 w-2 h-2 bg-purple-300 rounded-full opacity-70 animate-confettiBurst" style={{ animationDelay: '0.5s', '--tx': '-25px' }}></div>
            <div className="absolute top-4 right-12 w-2 h-2 bg-blue-300 rounded-full opacity-70 animate-confettiBurst" style={{ animationDelay: '0.55s', '--tx': '40px' }}></div>
            
            <div className="absolute top-24 left-16 w-2 h-2 bg-yellow-500 rounded-full opacity-60 animate-confettiSlow" style={{ animationDelay: '1s', '--tx': '-15px' }}></div>
            <div className="absolute top-28 right-24 w-2 h-3 bg-pink-400 opacity-60 animate-confettiSlow" style={{ animationDelay: '1.2s', '--tx': '20px' }}></div>
            <div className="absolute top-16 left-1/3 w-2 h-2 bg-blue-500 rounded-full opacity-60 animate-confettiSlow" style={{ animationDelay: '1.4s', '--tx': '-25px' }}></div>
            <div className="absolute top-20 right-1/3 w-2 h-3 bg-purple-400 opacity-60 animate-confettiSlow" style={{ animationDelay: '1.6s', '--tx': '30px' }}></div>
            <div className="absolute top-12 left-1/2 w-2 h-2 bg-green-500 rounded-full opacity-60 animate-confettiSlow" style={{ animationDelay: '1.8s', '--tx': '-10px' }}></div>
            <div className="absolute top-36 right-16 w-2 h-3 bg-orange-400 opacity-60 animate-confettiSlow" style={{ animationDelay: '2s', '--tx': '35px' }}></div>
          </div>
        )}

        <div className="relative z-10 text-center max-w-2xl mx-auto animate-pageEntrance">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
            Happy Birthday 🎉
          </h1>
          <p className="text-lg md:text-xl text-pink-200 mb-12">
            Let's decorate your party together <span className="inline-block">💖</span>
          </p>

          {step >= 2 && (
            <div className="mb-12 animate-cakeEntrance relative">
              <div className="relative inline-block">
                <div className="text-8xl md:text-9xl animate-cakeBreath">🎂</div>
                <div className="absolute -top-4 -right-4 w-2 h-2 bg-yellow-300 rounded-full animate-cakeParticles" style={{ animationDelay: '0s' }}></div>
                <div className="absolute -top-2 -left-4 w-2 h-2 bg-pink-300 rounded-full animate-cakeParticles" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-4 -right-6 w-1.5 h-1.5 bg-orange-300 rounded-full animate-cakeParticles" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-8 -left-6 w-1.5 h-1.5 bg-purple-300 rounded-full animate-cakeParticles" style={{ animationDelay: '1.5s' }}></div>
              </div>
              <div className="mt-6 w-32 h-2 mx-auto bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 rounded-full animate-cakeGlow"></div>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-yellow-400/20 via-pink-500/20 to-purple-500/20 blur-3xl rounded-full animate-cakeGlow"></div>
            </div>
          )}

          <div className="space-y-4">
            {step === 0 && (
              <div className="animate-fadeIn">
                <Button onClick={handleNext}>
                  Should we add party banners?
                </Button>
              </div>
            )}

            {step === 1 && (
              <div className="animate-fadeIn">
                <Button onClick={handleNext}>
                  Let's bring the cake 🎂
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fadeIn">
                <Button onClick={handleNext}>
                  Add balloons 🎈
                </Button>
              </div>
            )}

            {step === 3 && (
              <div className="animate-fadeIn">
                <Button onClick={handleCelebration}>
                  Turn on the celebration ✨
                </Button>
              </div>
            )}

            {showFinalMessage && (
              <div className="mt-8 animate-finalMessage relative">
                <p className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg animate-glowPulse">
                  The party is complete 🎂<span className="animate-heartBeat">💖</span>
                </p>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-4xl animate-starBurst">✨</div>
                <div className="absolute -bottom-6 left-1/4 text-3xl animate-starBurst" style={{ animationDelay: '0.3s' }}>🎉</div>
                <div className="absolute -bottom-6 right-1/4 text-3xl animate-starBurst" style={{ animationDelay: '0.6s' }}>🎊</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl text-center">
        <h1 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-10 md:mb-12">
          Something Special Is Coming 🎁
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-gray-900/60 border border-gray-800 rounded-2xl py-5 md:py-7 px-4 flex flex-col items-center justify-center">
            <span className="text-3xl md:text-5xl font-bold text-white tabular-nums">
              {String(timeLeft.days).padStart(2, "0")}
            </span>
            <span className="mt-2 text-xs md:text-sm uppercase tracking-[0.2em] text-gray-400">
              Days
            </span>
          </div>

          <div className="bg-gray-900/60 border border-gray-800 rounded-2xl py-5 md:py-7 px-4 flex flex-col items-center justify-center">
            <span className="text-3xl md:text-5xl font-bold text-white tabular-nums">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="mt-2 text-xs md:text-sm uppercase tracking-[0.2em] text-gray-400">
              Hours
            </span>
          </div>

          <div className="bg-gray-900/60 border border-gray-800 rounded-2xl py-5 md:py-7 px-4 flex flex-col items-center justify-center">
            <span className="text-3xl md:text-5xl font-bold text-white tabular-nums">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className="mt-2 text-xs md:text-sm uppercase tracking-[0.2em] text-gray-400">
              Minutes
            </span>
          </div>

          <div className="bg-gray-900/60 border border-gray-800 rounded-2xl py-5 md:py-7 px-4 flex flex-col items-center justify-center">
            <span className="text-3xl md:text-5xl font-bold text-white tabular-nums">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <span className="mt-2 text-xs md:text-sm uppercase tracking-[0.2em] text-gray-400">
              Seconds
            </span>
          </div>
        </div>

        <button
          onClick={() => setPreviewMode(true)}
          className="mt-8 px-6 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-white rounded-full text-sm border border-gray-700 hover:border-gray-600 transition-all"
        >
          Preview Birthday Page 👀
        </button>
      </div>
    </div>
  );
}

export default App;
