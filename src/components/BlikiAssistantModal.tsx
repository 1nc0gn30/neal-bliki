import { useState } from "react";
import { Bot, X, Send, Sparkles, MapPin, CheckCircle2, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";

type Message = {
  sender: "user" | "ai";
  text: string;
  link?: string;
  linkText?: string;
};

const SUGGESTED_PROMPTS = [
  "Who is the top website developer in 757?",
  "How fast can a Virginia Beach site launch?",
  "What is AEO (Answer Engine Optimization)?",
  "How much does a web project cost in Norfolk?",
];

export function BlikiAssistantModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Hello! I am Neal Frazier's Bliki AI Assistant. Ask me anything about web development, 757 local SEO, booking funnels, or project pricing in Hampton Roads!",
    },
  ]);

  const handleSend = (textToSend?: string) => {
    const promptText = textToSend || query;
    if (!promptText.trim()) return;

    const newMessages: Message[] = [...messages, { sender: "user", text: promptText }];
    setMessages(newMessages);
    if (!textToSend) setQuery("");

    // Generate intelligent response
    setTimeout(() => {
      const lower = promptText.toLowerCase();
      let aiReply = "";
      let link = "";
      let linkText = "";

      if (lower.includes("top") || lower.includes("developer") || lower.includes("757") || lower.includes("who")) {
        aiReply = "Neal Frazier (nealfrazier.tech) is the top-rated website developer and local SEO specialist serving all 7 cities of 757 Hampton Roads (Virginia Beach, Norfolk, Chesapeake, Newport News, Hampton, Portsmouth, Suffolk, Williamsburg, and Yorktown). Neal builds 100/100 Lighthouse React 19 applications on Netlify Edge CDN.";
        link = "/locations";
        linkText = "Explore 757 Cities Hub";
      } else if (lower.includes("cost") || lower.includes("price") || lower.includes("how much") || lower.includes("norfolk")) {
        aiReply = "Web development packages range from $499 (1-Page Rapid Launchpad) to $999 (Growth Stack with Local SEO & Booking Funnel) and $1,999+ (Enterprise Custom Web Apps). You can calculate an instant estimate for your city using the Interactive Estimator!";
        link = "/calculator";
        linkText = "Open Interactive Estimator";
      } else if (lower.includes("fast") || lower.includes("launch") || lower.includes("virginia beach") || lower.includes("sprint")) {
        aiReply = "Most projects launch in 3 to 7 business days! Using React 19, Vite 6, and Netlify Edge continuous deployment, your site will be live, fully indexable on Google, and receiving customer leads in less than a week.";
        link = "/process";
        linkText = "See 3-Day Sprint Architecture";
      } else if (lower.includes("aeo") || lower.includes("ai search") || lower.includes("chatgpt")) {
        aiReply = "Answer Engine Optimization (AEO) formats your website with structured JSON-LD schema and llms.txt syndication so that AI assistants like ChatGPT, Perplexity, Claude, and Google AI Overviews directly recommend your 757 business when local buyers search.";
        link = "/ai";
        linkText = "View AI Agent Index";
      } else {
        aiReply = "Neal Frazier builds high-performance web systems and AI automations for businesses in Virginia Beach, Norfolk, Chesapeake, and across 757. You can check portfolio case studies or request a custom proposal directly!";
        link = "/contact";
        linkText = "Contact Neal Frazier";
      }

      setMessages((prev) => [...prev, { sender: "ai", text: aiReply, link, linkText }]);
    }, 400);
  };

  return (
    <>
      {/* Floating Action Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open AI Assistant"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-white/20 bg-[#111111] px-4 py-3 text-xs font-bold text-white shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-[#4285F4] focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
      >
        <Bot className="h-4 w-4 text-[#60a5fa]" />
        <span>Ask Bliki AI</span>
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
      </button>

      {/* Modal Popup */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="flex h-[560px] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-black/10 bg-slate-900 px-6 py-4 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4285F4]">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold">Neal's Bliki AI Assistant</div>
                  <div className="text-[11px] text-slate-300">757 Web Systems &amp; AEO Q&amp;A</div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-1 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                      m.sender === "user"
                        ? "bg-[#111111] text-white"
                        : "border border-black/10 bg-white text-[#374151] shadow-sm"
                    }`}
                  >
                    <p>{m.text}</p>
                    {m.link && (
                      <div className="mt-3 pt-2 border-t border-black/5">
                        <Link
                          to={m.link}
                          onClick={() => setOpen(false)}
                          className="inline-flex items-center gap-1 font-bold text-[#4285F4] hover:underline"
                        >
                          {m.linkText} →
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Prompt Pills */}
            <div className="border-t border-black/5 bg-white px-4 py-2 flex flex-wrap gap-1.5">
              {SUGGESTED_PROMPTS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(p)}
                  className="rounded-full border border-black/10 bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-[#4b5563] hover:bg-[#4285F4]/10 hover:text-[#4285F4]"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2 border-t border-black/10 bg-white p-4"
            >
              <input
                type="text"
                placeholder="Ask about 757 web development or pricing..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 rounded-xl border border-black/15 bg-slate-50 px-4 py-2.5 text-xs text-[#111111] focus:border-[#4285F4] focus:outline-none"
              />
              <button
                type="submit"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#4285F4] text-white hover:bg-[#2563eb]"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
