import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle, ExternalLink, Sparkles, Terminal, Award, Cpu } from "lucide-react";

export default function Season2Popup() {
  const [isOpen, setIsOpen] = useState(false);
  const popupKey = "bliki_season2_popup_seen_2026";

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
          aria-label="100 Websites in 30 Days Season 2 Challenge Pop-up"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Glass-morphism card */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 40 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-4xl bg-white dark:bg-[#0b0b0f] border border-black/10 dark:border-white/10 rounded-[2rem] shadow-[0_32px_80px_-24px_rgba(0,0,0,0.4)] overflow-hidden grid md:grid-cols-2 z-10"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-50 flex items-center justify-center w-9 h-9 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-500 hover:text-slate-950 dark:hover:text-white transition-all cursor-pointer border border-black/5"
              aria-label="Close popup"
            >
              <X size={16} />
            </button>

            {/* Left Visual Column */}
            <div className="relative min-h-[220px] md:min-h-[480px] bg-slate-950 overflow-hidden flex items-center justify-center">
              <img
                src="/assets/season2_challenge_popup.png"
                alt="100 Websites in 30 Days Season 2 Web Deployment Tracker"
                className="absolute inset-0 w-full h-full object-cover opacity-90"
                loading="eager"
              />
              {/* Glowing gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

              {/* Stat overlays */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between gap-4 z-10">
                <div className="rounded-xl bg-black/60 backdrop-blur-md border border-white/15 px-3 py-2 text-left">
                  <div className="text-[10px] font-mono font-bold tracking-widest text-[#34a853] uppercase">STATUS</div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                    <span className="h-2 w-2 rounded-full bg-[#34a853] animate-pulse" />
                    Day 35 Live
                  </div>
                </div>
                <div className="rounded-xl bg-black/60 backdrop-blur-md border border-white/15 px-3 py-2 text-left">
                  <div className="text-[10px] font-mono font-bold tracking-widest text-[#4285f4] uppercase">SHIPPED</div>
                  <div className="text-sm font-bold text-white mt-0.5">125+ Deployments</div>
                </div>
              </div>
            </div>

            {/* Right Content Column */}
            <div className="p-8 md:p-10 flex flex-col justify-center text-left bg-white dark:bg-[#0b0b0f]">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold font-mono uppercase tracking-widest text-[#34a853] mb-2">
                <Sparkles size={11} className="text-[#34a853] animate-pulse" /> Challenge Season 2
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-[#111111] dark:text-white mb-3 tracking-tight text-uplift">
                100 Websites in 30 Days
              </h3>
              <p className="text-xs md:text-sm text-[#4b5563] dark:text-[#9ca3af] mb-5 leading-relaxed">
                Watch a Hampton Roads tech specialist ship 100 live production websites in public. Experience the speed, composable architecture, and local SEO capabilities of Netlify &amp; Jamstack.
              </p>

              {/* Bullets */}
              <div className="space-y-4 mb-7">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-[#4285f4]/10 text-[#4285f4] shrink-0 mt-0.5">
                    <Award size={15} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#111111] dark:text-white font-mono uppercase tracking-wide">Ultimate Proof of Work</span>
                    <span className="text-xs text-[#4b5563] dark:text-[#9ca3af] mt-0.5">Over 125+ responsive platforms fully built, hosted, and live on the Netlify CDN.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-[#34a853]/10 text-[#34a853] shrink-0 mt-0.5">
                    <Terminal size={15} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#111111] dark:text-white font-mono uppercase tracking-wide">Cloneable IT Blueprints</span>
                    <span className="text-xs text-[#4b5563] dark:text-[#9ca3af] mt-0.5">Real code, modular React components, and optimized layout files ready for local businesses.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-[#ea4335]/10 text-[#ea4335] shrink-0 mt-0.5">
                    <Cpu size={15} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#111111] dark:text-white font-mono uppercase tracking-wide">High-Performance Stack</span>
                    <span className="text-xs text-[#4b5563] dark:text-[#9ca3af] mt-0.5">Astro, Vite, React, Tailwind, and serverless backends delivering 100/100 Lighthouse audits.</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://100websitesin30days.nealfrazier.tech/"
                  onClick={handleClose}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow inline-flex items-center gap-2 justify-center bg-[#111111] hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/90 text-white font-semibold text-xs py-3.5 px-5 rounded-xl transition-all tracking-wider text-center uppercase shadow-md"
                >
                  Explore Season 2 Tracker
                  <ExternalLink size={12} />
                </a>
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-grow inline-flex items-center justify-center border border-black/10 hover:border-[#111111] text-[#111111] dark:text-white dark:border-white/10 dark:hover:border-white font-semibold text-xs py-3.5 px-5 rounded-xl transition-all tracking-wider text-center uppercase bg-transparent"
                >
                  Close &amp; Read Bliki
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
