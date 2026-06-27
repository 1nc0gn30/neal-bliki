import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Clock, ShieldCheck, Volume2, VolumeX, Sparkles } from "lucide-react";

export default function AICoffeePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const popupKey = "bliki_ai_coffee_popup_seen_2026";

  useEffect(() => {
    // Check if popup has already been seen in this session or localStorage
    const hasSeen = localStorage.getItem(popupKey);
    if (hasSeen === "true") return;

    const handleScroll = () => {
      // Trigger when scrolling past 400px (standard scroll on blog/wiki nodes)
      if (window.scrollY > 400) {
        window.removeEventListener("scroll", handleScroll);
        
        // Short delay for natural feel
        setTimeout(() => {
          setIsOpen(true);
        }, 2000);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Check if page loaded already scrolled down
    if (window.scrollY > 400) {
      setIsOpen(true);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(popupKey, "true");
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // Sync mute state and play video when open
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.muted = isMuted;
      const playPromise = videoRef.current.play();
      if (playPromise) {
        playPromise.catch(() => {
          // Autoplay blocked fallback
        });
      }
    }
  }, [isOpen, isMuted]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="AI and Coffee workshop video offer"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Glass-morphism card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-4xl bg-white dark:bg-[#1a202c] border border-black/10 dark:border-white/10 rounded-[2rem] shadow-[0_32px_80px_-24px_rgba(0,0,0,0.3)] overflow-hidden grid md:grid-cols-2 z-10"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-50 flex items-center justify-center w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 text-slate-500 hover:text-slate-900 transition-all cursor-pointer border border-black/5"
              aria-label="Close popup"
            >
              <X size={16} />
            </button>

            {/* Left Visual Column */}
            <div className="relative min-h-[220px] md:min-h-[480px] bg-black overflow-hidden flex items-center justify-center">
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover opacity-80"
                src="/aiandcoffee-ad-web.mp4"
                poster="/assets/beach_coffee_ai.png"
                autoplay
                muted
                loop
                playsInline
                preload="auto"
              />

              {/* Mute Toggle */}
              <button
                type="button"
                onClick={toggleMute}
                className="absolute bottom-4 right-4 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white transition-all border border-white/20 cursor-pointer"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>

              {/* Glowing gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

              {/* Floating Benefit Chips */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[8%] left-[6%] bg-white/95 backdrop-blur-sm border border-slate-100 rounded-xl p-2.5 flex items-center gap-2.5 shadow-md z-10 max-w-[180px]"
              >
                <span className="text-lg">☕</span>
                <div className="flex flex-col text-left">
                  <strong className="text-[11px] font-bold text-slate-900 leading-tight">Free Brew</strong>
                  <span className="text-[9px] text-slate-500">Drinks included</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[8%] left-[6%] bg-white/95 backdrop-blur-sm border border-slate-100 rounded-xl p-2.5 flex items-center gap-2.5 shadow-md z-10 max-w-[180px]"
              >
                <span className="text-lg">📱</span>
                <div className="flex flex-col text-left">
                  <strong className="text-[11px] font-bold text-slate-900 leading-tight">Live Setup</strong>
                  <span className="text-[9px] text-slate-500">No-code AI helper</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-[45%] right-[6%] bg-white/95 backdrop-blur-sm border border-slate-100 rounded-xl p-2.5 flex items-center gap-2.5 shadow-md z-10 max-w-[180px]"
              >
                <span className="text-lg">🎓</span>
                <div className="flex flex-col text-left">
                  <strong className="text-[11px] font-bold text-slate-900 leading-tight">1-on-1 Help</strong>
                  <span className="text-[9px] text-slate-500">Neal Frazier guides you</span>
                </div>
              </motion.div>
            </div>

            {/* Right Content Column */}
            <div className="p-8 md:p-10 flex flex-col justify-center text-left bg-white dark:bg-[#1a202c]">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono uppercase tracking-widest text-[#f43f5e] mb-2">
                <Sparkles size={11} className="text-[#f43f5e]" /> Limited to 20 Seats
              </span>
              <h3 className="text-2xl font-bold text-[#111111] dark:text-white mb-3 tracking-tight">
                Secure Your AI Helper
              </h3>
              <p className="text-xs text-[#4b5563] dark:text-[#9ca3af] mb-5 leading-relaxed">
                Join a relaxed, hands-on workshop in Virginia Beach where you'll build and launch your business's first AI assistant—no coding required.
              </p>

              {/* Bullets */}
              <div className="space-y-3.5 mb-6">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-[#4285f4]/10 text-[#4285f4] shrink-0">
                    <Calendar size={14} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#111111] dark:text-white font-mono uppercase tracking-wide">Next Workshop</span>
                    <span className="text-xs text-[#4b5563] dark:text-[#9ca3af] flex items-center gap-1.5 mt-0.5">
                      Lynnhaven Coffee Co.
                      <img src="/assets/lynnhaven-coffee-logo.png" alt="Lynnhaven Coffee" className="h-4.5 w-auto rounded border border-black/5 bg-white p-0.5" />
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-[#f43f5e]/10 text-[#f43f5e] shrink-0">
                    <Clock size={14} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#111111] dark:text-white font-mono uppercase tracking-wide">60-Minute Program</span>
                    <span className="text-xs text-[#4b5563] dark:text-[#9ca3af] mt-0.5">Practical, jargon-free path to automation</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-[#34a853]/10 text-[#34a853] shrink-0">
                    <ShieldCheck size={14} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#111111] dark:text-white font-mono uppercase tracking-wide">Money-Back Guarantee</span>
                    <span className="text-xs text-[#4b5563] dark:text-[#9ca3af] mt-0.5">30 days to test your helper risk-free</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://757tech.pro/ai-and-coffee"
                  onClick={handleClose}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow inline-flex items-center justify-center bg-[#111111] text-white hover:bg-black/80 font-semibold text-xs py-3 px-5 rounded-xl transition-all tracking-wider text-center uppercase shadow-md"
                >
                  Book Your Seat — $99
                </a>
                <a
                  href="https://757tech.pro/ai-and-coffee"
                  onClick={handleClose}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow inline-flex items-center justify-center border border-black/10 hover:border-[#111111] text-[#111111] dark:text-white dark:border-white/10 dark:hover:border-white font-semibold text-xs py-3 px-5 rounded-xl transition-all tracking-wider text-center uppercase bg-transparent"
                >
                  See Details First
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
