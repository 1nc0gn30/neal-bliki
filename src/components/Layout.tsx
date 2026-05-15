import { useEffect, useState } from "react";
import LeadCapturePopup from "@/components/LeadCapturePopup";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Cloud, Globe, Instagram, Linkedin, Menu, Twitter, X } from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Knowledge", path: "/wiki" },
  { name: "Stories", path: "/blog" },
  { name: "Work With Me", path: "/offerings" },
  { name: "Contact", path: "/contact" },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/nealfrazier", icon: Linkedin },
  { label: "Instagram", href: "https://instagram.com/nealfraziertech", icon: Instagram },
  { label: "X", href: "https://x.com/nealfraziertech", icon: Twitter },
  { label: "AI Shippers", href: "https://aishippers.netlify.app/members/neal-frazier", icon: Cloud },
  { label: "Bluesky", href: "https://bsky.app/profile/nealfraziertech.bsky.social", icon: Globe },
] as const;

const SITE_AUTHOR = "Neal Frazier";
const SITE_BASE_URL = "https://www.nealfrazier.tech";

export default function Layout() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-transparent font-sans text-[#111111]">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(17,17,17,0.14) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      >
      </div>

      <nav
        className={cn(
          "fixed left-1/2 z-50 -translate-x-1/2 transition-all duration-300",
          scrolled ? "top-3" : "top-4"
        )}
      >
        <div
          className={cn(
            "flex items-center gap-1 rounded-full border border-black/10 px-2 py-2 transition-all duration-300",
            scrolled
              ? "bg-white/96 shadow-[0_18px_48px_-35px_rgba(66,133,244,0.65)] backdrop-blur-xl"
              : "bg-white/80 backdrop-blur-md"
          )}
        >
          <Link to="/" className="flex items-center gap-2 px-3 py-1.5 text-sm font-bold tracking-tight">
            <img
              src="/logo-neal-avatar-transparent-bg.webp"
              alt="Neal Frazier avatar logo"
              className="h-8 w-8 rounded-full object-cover"
              loading="eager"
            />
          </Link>
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path !== "/" && location.pathname.startsWith(item.path));

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-[#111111] text-white"
                      : "text-[#111111] hover:bg-black/7"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          <button
            className="p-2 text-[#111111] md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {menuOpen && (
          <div className="mt-2 rounded-2xl border border-black/10 bg-white/98 p-2 shadow-[0_18px_48px_-35px_rgba(66,133,244,0.45)] backdrop-blur-xl md:hidden">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path !== "/" && location.pathname.startsWith(item.path));

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                    isActive ? "bg-[#111111] text-white" : "text-[#111111] hover:bg-black/6"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        )}
      </nav>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-black/10 bg-white/80">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <img
                  src="/logo-white-bg.webp"
                  alt="Neal Frazier portrait logo"
                  className="h-10 w-10 rounded-full border border-black/10 object-cover"
                  loading="lazy"
                />
                <div className="text-lg font-bold tracking-tight text-[#111111]">
                  {SITE_AUTHOR}
                </div>
              </div>
              <p className="text-sm text-[#4b5563]">Creative Technologist · Virginia Beach, VA</p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path} className="text-sm text-[#1f2937] transition-colors hover:text-[#4285f4]">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm font-medium text-[#4b5563] transition-colors hover:border-[#4285f4]/40 hover:text-[#4285f4]"
              >
                <social.icon size={15} />
                {social.label}
              </a>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-8 md:flex-row">
            <p className="text-xs text-[#6b7280]">© 2026 {SITE_AUTHOR}. All rights reserved.</p>
            <a
              href={SITE_BASE_URL}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[#6b7280] transition-colors hover:text-[#34a853]"
            >
              {SITE_BASE_URL.replace("https://", "")}
            </a>
          </div>
        </div>
      </footer>
      <a
        href="https://v2-2026.nealfrazier.tech"
        target="_blank"
        rel="noreferrer"
        aria-label="Easter egg link"
        className="absolute right-3 bottom-3 h-2 w-2 rounded-full opacity-0"
      />
      <LeadCapturePopup />
    </div>
  );
}
