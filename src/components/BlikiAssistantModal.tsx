import { useEffect, useRef, useState } from "react";
import { Bot, X, Send, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import type { ChatCompletionChunk, MLCEngine } from "@mlc-ai/web-llm";

import {
  BLIKI_SYSTEM_PROMPT,
  BLIKI_WEBGPU_MODEL_ID,
  VERIFIED_PHONE,
  describeLoadProgress,
  firstSiteLink,
  limitedOfflineAnswer,
  scrubAssistantText,
} from "@/lib/blikiAi";
import { loadBlikiEngine, resetBlikiEngine } from "@/lib/blikiWebGpu";

/**
 * Ask Bliki AI runs a real WebLLM model in the browser when WebGPU is available.
 *
 * Change the model by editing `BLIKI_WEBGPU_MODEL_ID` in `src/lib/blikiAi.ts`.
 * Any `model_id` from `@mlc-ai/web-llm` `prebuiltAppConfig.model_list` works.
 * The current id is Qwen2.5-0.5B-Instruct-q4f16_1-MLC. The npm package is
 * imported only after this modal opens, and WebLLM caches weights in
 * Cache Storage (see `cacheBackend` in `src/lib/blikiWebGpu.ts`).
 */

type Message = {
  id: string;
  sender: "user" | "ai";
  text: string;
  link?: string;
  linkText?: string;
  pending?: boolean;
};

type Runtime =
  | { kind: "idle" }
  | { kind: "checking" }
  | { kind: "loading"; label: string; detail: string; progress: number }
  | { kind: "ready" }
  | { kind: "limited"; reason: string; canRetry: boolean };

const SUGGESTED_PROMPTS = [
  "Who builds websites in 757?",
  "What do the current packages cost?",
  "What is Zoth Studio?",
  "How does authorized phishing simulation work?",
];

function nextId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `m-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function hasWebGPU(): boolean {
  return typeof navigator !== "undefined" && "gpu" in navigator && navigator.gpu != null;
}

function chunkText(chunk: ChatCompletionChunk): string {
  const content = chunk.choices?.[0]?.delta?.content;
  return typeof content === "string" ? content : "";
}

const greeting: Message = {
  id: "greeting",
  sender: "ai",
  text: `Hello. I am Neal Frazier's Bliki assistant for 757 Hampton Roads web and AI work. Ask about packages, Zoth Studio, ZOTHOS, NullAI, Netlify, or call ${VERIFIED_PHONE}.`,
};

export function BlikiAssistantModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [runtime, setRuntime] = useState<Runtime>({ kind: "idle" });
  const [busy, setBusy] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<MLCEngine | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bootStarted = useRef(false);
  const [bootId, setBootId] = useState(0);

  useEffect(() => {
    const node = scrollerRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [messages, open, runtime]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open || bootStarted.current) return;
    bootStarted.current = true;

    if (engineRef.current) {
      setRuntime({ kind: "ready" });
      return;
    }

    setRuntime({ kind: "checking" });

    void (async () => {
      if (!hasWebGPU()) {
        setRuntime({
          kind: "limited",
          canRetry: false,
          reason:
            "This browser does not expose WebGPU (navigator.gpu). Use a recent Chrome or Edge build with WebGPU enabled to run the on-device model. Answers below are limited offline answers.",
        });
        return;
      }

      setRuntime({
        kind: "loading",
        label: "Downloading model…",
        detail: "Starting the WebGPU runtime",
        progress: 0.02,
      });

      try {
        const engine = await loadBlikiEngine((report) => {
          const next = describeLoadProgress(report);
          setRuntime({ kind: "loading", ...next });
        });
        engineRef.current = engine;
        setRuntime({ kind: "ready" });
      } catch (error) {
        engineRef.current = null;
        resetBlikiEngine();
        bootStarted.current = false;
        const message = error instanceof Error ? error.message : "The model failed to load.";
        const detail = message.replace(/\s+/g, " ").slice(0, 180);
        setRuntime({
          kind: "limited",
          canRetry: true,
          reason: `The WebGPU model did not finish loading (${detail}). Answers below are limited offline answers.`,
        });
      }
    })();
  }, [open, bootId]);

  useEffect(() => {
    if (open && (runtime.kind === "ready" || runtime.kind === "limited")) {
      inputRef.current?.focus();
    }
  }, [open, runtime.kind]);

  const retryLoad = () => {
    engineRef.current = null;
    resetBlikiEngine();
    bootStarted.current = false;
    setRuntime({ kind: "idle" });
    setBootId((value) => value + 1);
  };

  const handleSend = async (textToSend?: string) => {
    const promptText = (textToSend ?? query).trim();
    if (!promptText || busy) return;
    if (runtime.kind !== "ready" && runtime.kind !== "limited") return;

    const history = messages.filter((message) => !message.pending);
    const userMessage: Message = { id: nextId(), sender: "user", text: promptText };
    setMessages([...history, userMessage]);
    if (!textToSend) setQuery("");

    if (runtime.kind === "limited") {
      const offline = limitedOfflineAnswer(promptText);
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          sender: "ai",
          text: offline.text,
          link: offline.link,
          linkText: offline.linkText,
        },
      ]);
      return;
    }

    const assistantId = nextId();
    setMessages((prev) => [
      ...prev,
      { id: assistantId, sender: "ai", text: "", pending: true },
    ]);
    setBusy(true);

    try {
      const engine = engineRef.current;
      if (!engine) throw new Error("WebGPU model is not ready");

      const prior = [...history, userMessage]
        .filter((message) => message.id !== "greeting")
        .slice(-8)
        .map((message) => ({
          role: message.sender === "user" ? ("user" as const) : ("assistant" as const),
          content: message.text,
        }));

      const stream = await engine.chat.completions.create({
        stream: true,
        temperature: 0.4,
        max_tokens: 280,
        messages: [{ role: "system", content: BLIKI_SYSTEM_PROMPT }, ...prior],
      });

      let accumulated = "";
      for await (const chunk of stream) {
        const delta = chunkText(chunk);
        if (!delta) continue;
        accumulated += delta;
        const snapshot = accumulated;
        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantId ? { ...message, text: snapshot, pending: true } : message,
          ),
        );
      }

      const cleaned = scrubAssistantText(accumulated).trim();
      const text =
        cleaned ||
        `I don't have a confident answer for that. Call ${VERIFIED_PHONE} or visit /contact.`;
      const route = firstSiteLink(text);
      setMessages((prev) =>
        prev.map((message) =>
          message.id === assistantId
            ? {
                ...message,
                text,
                pending: false,
                link: route?.link,
                linkText: route?.linkText,
              }
            : message,
        ),
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Generation failed.";
      const offline = limitedOfflineAnswer(promptText);
      setMessages((prev) =>
        prev.map((item) =>
          item.id === assistantId
            ? {
                ...item,
                pending: false,
                text: `The WebGPU model stopped (${message}). ${offline.text}`,
                link: offline.link,
                linkText: offline.linkText,
              }
            : item,
        ),
      );
    } finally {
      setBusy(false);
    }
  };

  const inputLocked = busy || (runtime.kind !== "ready" && runtime.kind !== "limited");
  const status =
    runtime.kind === "ready"
      ? { label: "Running locally via WebGPU", tone: "bg-emerald-400" }
      : runtime.kind === "limited"
        ? { label: "Limited offline answers", tone: "bg-amber-400" }
        : runtime.kind === "loading"
          ? { label: runtime.label, tone: "bg-sky-400" }
          : { label: "Checking WebGPU…", tone: "bg-sky-400" };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open AI Assistant"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-white/20 bg-[#111111] px-4 py-3 text-xs font-bold text-white shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-[#4285F4] focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
      >
        <Bot className="h-4 w-4 text-[#60a5fa]" />
        <span>Ask Bliki AI</span>
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="bliki-ai-title"
            className="flex h-[600px] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="border-b border-black/10 bg-slate-900 px-6 py-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4285F4]">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div id="bliki-ai-title" className="text-sm font-bold">
                      Neal&apos;s Bliki AI Assistant
                    </div>
                    <div className="text-[11px] text-slate-300">757 web, AI, and AEO — on this device</div>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full p-1 text-slate-400 hover:bg-white/10 hover:text-white"
                  aria-label="Close assistant"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-bold tracking-wide text-white">
                  <span className={`h-1.5 w-1.5 rounded-full ${status.tone} ${runtime.kind === "ready" ? "" : "animate-pulse"}`} />
                  {status.label}
                </span>
                {runtime.kind === "ready" && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-slate-400">
                    <Cpu className="h-3 w-3" />
                    {BLIKI_WEBGPU_MODEL_ID}
                  </span>
                )}
              </div>
            </div>

            {runtime.kind === "loading" && (
              <div className="border-b border-black/5 bg-slate-50 px-6 py-3">
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#111111]">
                  <span>{runtime.label}</span>
                  <span>{Math.round(runtime.progress * 100)}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/10">
                  <div
                    className="h-full rounded-full bg-[#4285F4] transition-all"
                    style={{ width: `${Math.max(4, Math.round(runtime.progress * 100))}%` }}
                  />
                </div>
                <p className="mt-1 truncate text-[10px] text-[#6b7280]">{runtime.detail}</p>
              </div>
            )}

            <div ref={scrollerRef} className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-6" aria-live="polite">
              {runtime.kind === "limited" && (
                <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-xs leading-relaxed text-amber-950">
                  <p className="font-bold">WebGPU model unavailable</p>
                  <p className="mt-1">{runtime.reason}</p>
                  {runtime.canRetry && (
                    <button
                      type="button"
                      onClick={retryLoad}
                      className="mt-3 rounded-full bg-amber-950 px-3 py-1.5 text-[11px] font-bold text-white"
                    >
                      Try the WebGPU model again
                    </button>
                  )}
                </div>
              )}

              {runtime.kind === "checking" && (
                <p className="text-xs text-[#6b7280]">Checking navigator.gpu…</p>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                      message.sender === "user"
                        ? "bg-[#111111] text-white"
                        : "border border-black/10 bg-white text-[#374151] shadow-sm"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">
                      {message.text || (message.pending ? "Generating…" : "")}
                      {message.pending && message.text ? (
                        <span className="ml-0.5 inline-block h-3 w-1 animate-pulse bg-[#4285F4] align-middle" />
                      ) : null}
                    </p>
                    {message.link && (
                      <div className="mt-3 border-t border-black/5 pt-2">
                        <Link
                          to={message.link}
                          onClick={() => setOpen(false)}
                          className="inline-flex items-center gap-1 font-bold text-[#4285F4] hover:underline"
                        >
                          {message.linkText} →
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 border-t border-black/5 bg-white px-4 py-2">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  disabled={inputLocked}
                  onClick={() => void handleSend(prompt)}
                  className="rounded-full border border-black/10 bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-[#4b5563] hover:bg-[#4285F4]/10 hover:text-[#4285F4] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                void handleSend();
              }}
              className="flex items-center gap-2 border-t border-black/10 bg-white p-4"
            >
              <input
                ref={inputRef}
                type="text"
                placeholder={
                  inputLocked
                    ? "Loading the on-device model…"
                    : "Ask about 757 web development or pricing..."
                }
                value={query}
                disabled={inputLocked}
                onChange={(event) => setQuery(event.target.value)}
                className="flex-1 rounded-xl border border-black/15 bg-slate-50 px-4 py-2.5 text-xs text-[#111111] focus:border-[#4285F4] focus:outline-none disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={inputLocked || !query.trim()}
                aria-label="Send message"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#4285F4] text-white hover:bg-[#2563eb] disabled:cursor-not-allowed disabled:opacity-50"
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
