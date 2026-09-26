import React, { useEffect, useState } from 'react';

interface AppStarterAnimationProps {
  onComplete: () => void;
  userEmail?: string;
}

export const AppStarterAnimation: React.FC<AppStarterAnimationProps> = ({
  onComplete,
}) => {
  const [glowPhase, setGlowPhase] = useState<'enter' | 'glow' | 'reveal' | 'exit'>('enter');

  useEffect(() => {
    // 1. Initial fade-in scale up
    const t1 = setTimeout(() => {
      setGlowPhase('glow');
    }, 250);

    // 2. High-intensity logo glow burst
    const t2 = setTimeout(() => {
      setGlowPhase('reveal');
    }, 950);

    // 3. Smooth exit fade into the app
    const t3 = setTimeout(() => {
      setGlowPhase('exit');
    }, 1500);

    // 4. Complete and remove starter overlay
    const t4 = setTimeout(() => {
      onComplete();
    }, 1850);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div
      onClick={onComplete}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#000000] select-none cursor-pointer transition-opacity duration-500 ease-out ${
        glowPhase === 'exit' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Dynamic ambient radial backdrop glow */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
          glowPhase === 'glow' || glowPhase === 'reveal'
            ? 'opacity-80'
            : 'opacity-20'
        }`}
        style={{
          background:
            'radial-gradient(circle at center, rgba(59, 130, 246, 0.25) 0%, rgba(0, 0, 0, 0.95) 70%, #000000 100%)',
        }}
      />

      {/* Centerpiece Logo Container */}
      <div className="relative flex flex-col items-center">
        {/* Multilayer Pulsing Glow Rings */}
        <div
          className={`absolute rounded-full transition-all duration-700 pointer-events-none ${
            glowPhase === 'glow' || glowPhase === 'reveal'
              ? 'w-72 h-72 -inset-16 bg-blue-500/25 blur-3xl scale-125'
              : 'w-44 h-44 -inset-8 bg-blue-600/10 blur-xl scale-95'
          }`}
        />

        <div
          className={`absolute rounded-3xl transition-all duration-500 pointer-events-none ${
            glowPhase === 'reveal'
              ? 'inset-[-12px] bg-white/30 blur-lg scale-110'
              : glowPhase === 'glow'
              ? 'inset-[-8px] bg-blue-400/40 blur-md scale-105'
              : 'inset-0 bg-transparent blur-none scale-100'
          }`}
        />

        {/* The App Logo */}
        <div
          className={`relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border border-[#686B6C] bg-black shadow-[0_0_50px_rgba(0,0,0,0.9)] transition-all duration-700 ease-out ${
            glowPhase === 'enter'
              ? 'scale-90 opacity-40'
              : glowPhase === 'glow'
              ? 'scale-105 opacity-100 shadow-[0_0_40px_rgba(59,130,246,0.6)] border-[#FFFFFF]/80'
              : glowPhase === 'reveal'
              ? 'scale-110 opacity-100 shadow-[0_0_60px_rgba(255,255,255,0.7)] border-[#FFFFFF]'
              : 'scale-115 opacity-0'
          }`}
        >
          <img
            src="/app-logo.jpg"
            alt="Evi-Mail"
            className="w-full h-full object-cover transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Subtle Brand Wordmark below Logo with glow */}
        <div
          className={`mt-6 transition-all duration-500 text-center ${
            glowPhase === 'enter'
              ? 'opacity-0 translate-y-2'
              : glowPhase === 'exit'
              ? 'opacity-0 -translate-y-1'
              : 'opacity-100 translate-y-0'
          }`}
        >
          <h1 className="text-xl sm:text-2xl font-bold tracking-wider text-[#FFFFFF] drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]">
            EVI-MAIL
          </h1>
          <p className="text-[11px] font-mono tracking-widest text-[#686B6C] uppercase mt-1">
            Autonomous Forensic Protection
          </p>
        </div>
      </div>
    </div>
  );
};
