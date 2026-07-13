import { useEffect, useState } from "react";

/**
 * Reading progress bar — fixed at top of viewport, shows scroll progress.
 * Only renders on pages with enough content to scroll.
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min(100, (scrollTop / docHeight) * 100));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (progress < 1) return null;

  return (
    <div
      className="fixed left-0 top-0 z-[60] h-1 bg-gradient-to-r from-[#4285F4] to-[#34A853] transition-[width] duration-100 ease-out"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    />
  );
}