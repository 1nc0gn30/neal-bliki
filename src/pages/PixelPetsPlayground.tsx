import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Gamepad2, Sparkles, ShieldCheck, Zap, Bot, Terminal, Copy, Check, Play, RefreshCw, Trophy, ArrowRight, Star } from "lucide-react";

type Pet = {
  id: string;
  name: string;
  creator: string;
  role: string;
  image: string;
  level: number;
  xp: number;
  stats: { speed: number; reasoning: number; tools: number; edge: number };
  abilities: string[];
  hermesPrompt: string;
};

const INITIAL_PETS: Pet[] = [
  {
    id: "hermes-fox",
    name: "Hermes Cyber Fox",
    creator: "Nous Research",
    role: "Autonomous Mobile & Terminal Reasoning Companion",
    image: "/images/pets/hermes-fox.jpg",
    level: 42,
    xp: 890,
    stats: { speed: 94, reasoning: 99, tools: 98, edge: 90 },
    abilities: ["Termux Autonomous Code Edit", "Hermes Function Calling", "Open-Weights Reasoning", "Offline Tool Execution"],
    hermesPrompt: "hermes_agent.register_companion(name='Hermes Cyber Fox', skills=['termux_cli', 'code_refactor', 'function_calling'], provider='Nous Research')",
  },
  {
    id: "agy-golem",
    name: "AGY Cyber Golem",
    creator: "Google Antigravity SDK",
    role: "Multi-Agent Coordinator & Code Refactoring Golem",
    image: "/images/pets/agy-golem.jpg",
    level: 50,
    xp: 1200,
    stats: { speed: 92, reasoning: 98, tools: 96, edge: 95 },
    abilities: ["Subagent Delegation", "Safety Policy Enforcement", "Structured JSON Outputs", "Multi-Agent Orchestration"],
    hermesPrompt: "google_antigravity.spawn_agent(role='AGY Cyber Golem', config={'model': 'gemini-3.6-flash', 'thinking_tokens': 2048})",
  },
  {
    id: "gemini-dragon",
    name: "Gemini Cosmic Dragon",
    creator: "Google AI Studio",
    role: "Multimodal Visual & Audio Reasoning Companion",
    image: "/images/pets/gemini-dragon.jpg",
    level: 48,
    xp: 1100,
    stats: { speed: 96, reasoning: 99, tools: 94, edge: 92 },
    abilities: ["Multimodal Image Processing", "PDF Document Ingestion", "Structured Schema Output", "1M+ Context Window"],
    hermesPrompt: "google_ai_studio.connect_multimodal(model='gemini-3.6-pro', capabilities=['vision', 'audio', 'json_schema'])",
  },
  {
    id: "netlify-cheetah",
    name: "Netlify Edge Cheetah",
    creator: "Netlify AI",
    role: "Sub-Second Global Edge & Blobs Routing Companion",
    image: "/images/pets/netlify-cheetah.jpg",
    level: 45,
    xp: 950,
    stats: { speed: 100, reasoning: 90, tools: 92, edge: 100 },
    abilities: ["Global Edge CDN Routing", "Netlify Blobs State Persistence", "Agent Runners Execution", "0.2s TTFB Sprint"],
    hermesPrompt: "netlify_edge.deploy_agent_runner(region='global_edge', blobs_state=True, max_latency_ms=200)",
  },
  {
    id: "horizon-falcon",
    name: "Horizon Cyber Falcon",
    creator: "Hostinger Horizon AI",
    role: "Cloud VPS & Server Automation Companion",
    image: "/images/pets/horizon-falcon.jpg",
    level: 40,
    xp: 820,
    stats: { speed: 95, reasoning: 92, tools: 94, edge: 96 },
    abilities: ["Automated VPS Scaling", "Horizon AI Builder Sync", "Server Health Monitoring", "Cloud Storage Tunnel"],
    hermesPrompt: "hostinger_horizon.provision_vps(specs={'cpu': 8, 'ram': '32GB', 'nvme': '400GB'}, ai_scaling=True)",
  },
  {
    id: "astro-octopus",
    name: "Astro Nebula Octopus",
    creator: "Astro Core",
    role: "Zero-JS Islands & High-Velocity HTML Companion",
    image: "/images/pets/astro-octopus.jpg",
    level: 44,
    xp: 910,
    stats: { speed: 98, reasoning: 91, tools: 93, edge: 99 },
    abilities: ["Zero-JS Hydration", "Server-Side Content Islands", "Markdown Bliki Compiler", "Lighthouse 100/100 Boost"],
    hermesPrompt: "astro_framework.build_zero_js_island(route='/static-bliki', prerender=True, hydration='on_visible')",
  },
  {
    id: "vite-lynx",
    name: "Vite Speed Lynx",
    creator: "Vite 6 Ecosystem",
    role: "Sub-Millisecond HMR & Module Bundling Lynx",
    image: "/images/pets/vite-lynx.jpg",
    level: 47,
    xp: 1040,
    stats: { speed: 100, reasoning: 92, tools: 97, edge: 94 },
    abilities: ["Instant HMR Hot Reload", "Esbuild Native Pre-bundling", "Vite SSR Plugin Pipeline", "Code-Splitting Optimization"],
    hermesPrompt: "vite_bundler.optimize_chunks(target='esnext', minify='terser', split_vendor_chunks=True)",
  },
  {
    id: "alphagenome-phoenix",
    name: "AlphaGenome Phoenix",
    creator: "Google DeepMind",
    role: "Genomic Structure & Variant Analysis Phoenix",
    image: "/images/pets/alphagenome-phoenix.jpg",
    level: 52,
    xp: 1350,
    stats: { speed: 91, reasoning: 100, tools: 95, edge: 90 },
    abilities: ["Variant Effect Prediction", "UniProt Structure Analysis", "Epigenomic Track Parsing", "Chromatin Accessibility"],
    hermesPrompt: "alphagenome_api.analyze_variant(variant='chr17:43044295:G>A', tissues=['CL:0000057'], tracks=['RNA_SEQ'])",
  },
  {
    id: "claude-owl",
    name: "Claude Pythia Owl",
    creator: "Anthropic AI",
    role: "Deep Reasoning & Systematic Code Auditor Owl",
    image: "/images/pets/claude-owl.jpg",
    level: 49,
    xp: 1150,
    stats: { speed: 93, reasoning: 100, tools: 96, edge: 92 },
    abilities: ["Systematic Code Refactoring", "Extended Thinking Reasoning", "Artifact Verification", "Zero-Hallucination Audit"],
    hermesPrompt: "anthropic_claude.reason_deeply(prompt='Refactor 757 web architecture', budget_tokens=4096)",
  },
  {
    id: "deepseek-bear",
    name: "DeepSeek Reasoner Bear",
    creator: "DeepSeek Open AI",
    role: "Open-Weights High-Efficiency Logic & Math Bear",
    image: "/images/pets/deepseek-bear.jpg",
    level: 46,
    xp: 980,
    stats: { speed: 97, reasoning: 99, tools: 94, edge: 91 },
    abilities: ["Open-Weights Math Solver", "Code Logic Inference", "Low-Cost API Routing", "Deep Reasoning Chain"],
    hermesPrompt: "deepseek_ai.reason_code(task='Benchmark 757 Local SEO speed', model='deepseek-r1')",
  },
];

type Obstacle = {
  id: number;
  x: number;
  type: string;
  label: string;
};

type StarItem = {
  id: number;
  x: number;
  y: number;
  collected: boolean;
};

export default function PixelPetsPlayground() {
  const [pets, setPets] = useState<Pet[]>(INITIAL_PETS);
  const [selectedPet, setSelectedPet] = useState<Pet>(INITIAL_PETS[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // GAME ENGINE STATE
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(100);
  const [starCount, setStarCount] = useState(0);

  // Player physics
  const [playerY, setPlayerY] = useState(135); // ground level
  const [velocity, setVelocity] = useState(0);
  const [isGrounded, setIsGrounded] = useState(true);

  // Dynamic Entities
  const [obstacles, setObstacles] = useState<Obstacle[]>([
    { id: 1, x: 500, type: "bug", label: "Legacy WP Bug" },
    { id: 2, x: 800, type: "plugin", label: "Bloated Plugin" },
  ]);

  const [speedStars, setSpeedStars] = useState<StarItem[]>([
    { id: 1, x: 400, y: 70, collected: false },
    { id: 2, x: 650, y: 50, collected: false },
  ]);

  const requestRef = useRef<number | null>(null);

  // Pet Feeding
  const feedPet = (petId: string) => {
    setPets((prev) =>
      prev.map((p) => {
        if (p.id === petId) {
          const newXp = p.xp + 50;
          const newLevel = newXp >= 1000 ? p.level + 1 : p.level;
          const updated = {
            ...p,
            xp: newXp % 1000,
            level: newLevel,
            stats: {
              speed: Math.min(100, p.stats.speed + 1),
              reasoning: Math.min(100, p.stats.reasoning + 1),
              tools: Math.min(100, p.stats.tools + 1),
              edge: Math.min(100, p.stats.edge + 1),
            },
          };
          if (p.id === selectedPet.id) setSelectedPet(updated);
          return updated;
        }
        return p;
      })
    );
  };

  const copyPrompt = (prompt: string, id: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Jump Action
  const triggerJump = () => {
    if (!gameActive || gameOver) {
      restartGame();
    } else if (isGrounded) {
      setVelocity(-14);
      setIsGrounded(false);
    }
  };

  // CLEAN GAME RESTART
  const restartGame = () => {
    setGameActive(true);
    setGameOver(false);
    setScore(0);
    setStarCount(0);
    setPlayerY(135);
    setVelocity(0);
    setIsGrounded(true);
    setObstacles([
      { id: 1, x: 500, type: "bug", label: "Slow WP Bug" },
      { id: 2, x: 850, type: "plugin", label: "Bloated Plugin" },
    ]);
    setSpeedStars([
      { id: 1, x: 400, y: 70, collected: false },
      { id: 2, x: 700, y: 50, collected: false },
    ]);
  };

  // KEYBOARD LISTENER (Spacebar / ArrowUp)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") {
        e.preventDefault(); // Prevent page scroll!
        triggerJump();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameActive, gameOver, isGrounded]);

  // MAIN GAME TICK ENGINE
  useEffect(() => {
    if (!gameActive || gameOver) return;

    const gameLoop = () => {
      // 1. Update Player Physics
      setPlayerY((prevY) => {
        const nextY = prevY + velocity;
        if (nextY >= 135) {
          setIsGrounded(true);
          setVelocity(0);
          return 135;
        }
        return nextY;
      });

      setVelocity((v) => v + 0.85); // Gravity acceleration

      // Game speed scales with score
      const gameSpeed = 7 + Math.min(8, Math.floor(score / 50));

      // 2. Move Obstacles
      setObstacles((prev) =>
        prev.map((obs) => {
          let nextX = obs.x - gameSpeed;
          if (nextX < -60) {
            nextX = 650 + Math.random() * 250;
            const labels = ["Legacy Bug", "Render-Block", "Bloated Plugin", "4MB Image"];
            obs.label = labels[Math.floor(Math.random() * labels.length)];
            setScore((s) => {
              const newScore = s + 10;
              if (newScore > highScore) setHighScore(newScore);
              return newScore;
            });
          }
          return { ...obs, x: nextX };
        })
      );

      // 3. Move Speed Stars
      setSpeedStars((prev) =>
        prev.map((star) => {
          let nextX = star.x - gameSpeed;
          let collected = star.collected;
          if (nextX < -40) {
            nextX = 750 + Math.random() * 300;
            collected = false;
          }
          return { ...star, x: nextX, collected };
        })
      );

      requestRef.current = requestAnimationFrame(gameLoop);
    };

    requestRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [gameActive, gameOver, velocity, score, highScore]);

  // COLLISION DETECTION LOOP
  useEffect(() => {
    if (!gameActive || gameOver) return;

    // Check Obstacle Collisions
    obstacles.forEach((obs) => {
      const playerX = 50;
      const playerWidth = 40;
      const playerHeight = 40;
      const obstacleWidth = 50;
      const obstacleHeight = 40;
      const obstacleY = 135;

      const isCollidingX = obs.x < playerX + playerWidth && obs.x + obstacleWidth > playerX;
      const isCollidingY = playerY + playerHeight > obstacleY;

      if (isCollidingX && isCollidingY) {
        setGameOver(true);
        // Level up pet as reward for playing
        feedPet(selectedPet.id);
      }
    });

    // Check Speed Star Collections
    speedStars.forEach((star) => {
      if (star.collected) return;
      const playerX = 50;
      const dist = Math.hypot(star.x - playerX, star.y - playerY);
      if (dist < 40) {
        star.collected = true;
        setStarCount((c) => c + 1);
        setScore((s) => {
          const n = s + 25;
          if (n > highScore) setHighScore(n);
          return n;
        });
      }
    });
  }, [playerY, obstacles, speedStars, gameActive, gameOver, selectedPet.id, highScore]);

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-28">
      {/* Header */}
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4285F4]/10 px-3.5 py-1 text-xs font-bold text-[#4285F4]">
          <Gamepad2 className="h-3.5 w-3.5" /> Interactive 16-Bit Arcade &amp; AI Companions
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#111111] md:text-5xl lg:text-6xl">
          Pixel Pets &amp; AI Agent <span className="bg-gradient-to-r from-[#4285F4] via-indigo-600 to-[#174ea6] bg-clip-text text-transparent">Playground</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-[#4b5563]">
          Play the 757 Code Runner game with your favorite companion, collect Lighthouse speed stars, level up your pet, and export machine-readable Hermes Agent &amp; Google Antigravity tool schemas!
        </p>
      </div>

      {/* ARCADE GAME RUNNER SECTION */}
      <section className="mt-12 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-6 text-white shadow-2xl md:p-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3.5 py-1 text-xs font-bold text-amber-400">
              <Trophy className="h-3.5 w-3.5" /> 757 Local Code Runner Arcade
            </span>
            <h2 className="mt-2 text-2xl font-black text-white">Playable 16-Bit Runner Game</h2>
            <p className="text-xs text-slate-400">
              Press <strong>Spacebar</strong> or <strong>Click</strong> to jump! Dodge slow legacy bugs and catch golden speed stars.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Stars</div>
              <div className="flex items-center gap-1 text-2xl font-black text-amber-400">
                <Star className="h-4 w-4 fill-current" /> {starCount}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Score</div>
              <div className="text-2xl font-black text-[#60a5fa]">{score}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">High Score</div>
              <div className="text-2xl font-black text-emerald-400">{highScore}</div>
            </div>
          </div>
        </div>

        {/* Game Canvas Box */}
        <div
          onClick={triggerJump}
          className="relative mt-6 h-56 w-full cursor-pointer overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-black select-none"
        >
          {/* Background Grid & Stars */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-60" />

          {/* Ground Line */}
          <div className="absolute bottom-0 left-0 right-0 h-10 border-t-2 border-slate-700 bg-slate-900/90 flex items-center justify-around px-4">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">757 Netlify Edge CDN</span>
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Lighthouse 100/100</span>
          </div>

          {/* Player Sprite (Selected Pet Avatar) */}
          <div
            className="absolute left-12 h-11 w-11 transition-all duration-75"
            style={{ top: `${playerY}px` }}
          >
            <img
              src={selectedPet.image}
              alt={selectedPet.name}
              className="h-full w-full rounded-xl object-cover ring-2 ring-[#60a5fa] shadow-lg shadow-blue-500/50"
            />
          </div>

          {/* Collectible Stars */}
          {speedStars.map((star) => (
            !star.collected && (
              <div
                key={star.id}
                className="absolute flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-slate-950 shadow-md shadow-amber-400/50 animate-bounce"
                style={{ left: `${star.x}px`, top: `${star.y}px` }}
              >
                <Star className="h-3.5 w-3.5 fill-current" />
              </div>
            )
          ))}

          {/* Obstacles (Slow Bugs) */}
          {obstacles.map((obs) => (
            <div
              key={obs.id}
              className="absolute bottom-10 flex h-10 px-2.5 items-center justify-center rounded-lg bg-red-600 font-mono text-[10px] font-bold text-white shadow-lg shadow-red-500/50"
              style={{ left: `${obs.x}px` }}
            >
              {obs.label}
            </div>
          ))}

          {/* Overlay: Game Start Prompt */}
          {!gameActive && !gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm text-center p-4">
              <Play className="h-10 w-10 text-[#60a5fa] animate-pulse" />
              <div className="mt-2 text-base font-bold text-white">Click or Press Spacebar to Start Game</div>
              <div className="text-xs text-slate-400 mt-1">Playing with companion: <strong>{selectedPet.name}</strong></div>
            </div>
          )}

          {/* Overlay: Game Over Prompt */}
          {gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 backdrop-blur-sm text-center p-4">
              <div className="text-2xl font-black text-red-400">Game Over! Score: {score}</div>
              <p className="mt-1 text-xs text-slate-300">Stars Collected: {starCount} • {selectedPet.name} gained +50 XP!</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  restartGame();
                }}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#4285F4] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#2563eb] shadow-lg shadow-blue-500/40 cursor-pointer"
              >
                <RefreshCw className="h-4 w-4" /> Play Again
              </button>
            </div>
          )}
        </div>
      </section>

      {/* PIXEL PETS SELECTION GALLERY (10 PETS) */}
      <section className="mt-16">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-[#111111]">
              10 AI Agent Companions Gallery
            </h2>
            <p className="mt-1 text-sm text-[#4b5563]">
              Select a pet to play in the runner arcade, level up stats, and copy Hermes Agent &amp; Antigravity tool schemas.
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-700">
            10 Companions Active • 100% Agent Accessible
          </span>
        </div>

        {/* Pets Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {pets.map((pet) => {
            const isSelected = selectedPet.id === pet.id;
            return (
              <div
                key={pet.id}
                onClick={() => setSelectedPet(pet)}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border p-3 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "border-[#4285F4] bg-[#4285F4]/5 ring-2 ring-[#4285F4] shadow-xl"
                    : "border-black/10 bg-white hover:border-black/20 hover:shadow-md"
                }`}
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-900">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-1.5 left-1.5 rounded-full bg-black/80 px-2 py-0.5 text-[9px] font-bold text-white backdrop-blur-md">
                    Lvl {pet.level}
                  </div>
                  <div className="absolute top-1.5 right-1.5 rounded-full bg-emerald-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
                    {pet.xp}/1000
                  </div>
                </div>

                <div className="mt-2.5 flex flex-1 flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#4285F4] block truncate">
                      {pet.creator}
                    </span>
                    <h3 className="text-xs font-bold text-[#111111] group-hover:text-[#4285F4] leading-snug line-clamp-1">
                      {pet.name}
                    </h3>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      feedPet(pet.id);
                    }}
                    className="mt-2.5 inline-flex items-center justify-center gap-1 rounded-lg border border-emerald-300 bg-emerald-50 py-1 text-[10px] font-bold text-emerald-800 transition-colors hover:bg-emerald-100 cursor-pointer"
                  >
                    <Sparkles className="h-3 w-3 text-emerald-600" />
                    Feed (+50 XP)
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SELECTED PET INSPECTOR & HERMES API DIRECTIVE */}
      <section className="mt-12 rounded-3xl border border-black/10 bg-slate-900 p-8 text-white shadow-2xl md:p-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Avatar & Specs */}
          <div className="lg:col-span-5 flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="relative h-48 w-48 overflow-hidden rounded-3xl border-2 border-[#60a5fa] bg-slate-800 shadow-2xl shadow-blue-500/20">
              <img src={selectedPet.image} alt={selectedPet.name} className="h-full w-full object-cover" />
            </div>
            <h3 className="mt-4 text-2xl font-black text-white">{selectedPet.name}</h3>
            <p className="text-xs text-[#60a5fa] font-semibold">{selectedPet.role}</p>
            <p className="mt-2 text-xs text-slate-300">Created by: <strong>{selectedPet.creator}</strong> • Level {selectedPet.level}</p>

            <div className="mt-4 w-full space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Speed / TTFB:</span>
                <span className="font-bold text-emerald-400">{selectedPet.stats.speed}/100</span>
              </div>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Reasoning Score:</span>
                <span className="font-bold text-emerald-400">{selectedPet.stats.reasoning}/100</span>
              </div>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Tool Execution:</span>
                <span className="font-bold text-emerald-400">{selectedPet.stats.tools}/100</span>
              </div>
            </div>
          </div>

          {/* Hermes Agent Schema & Prompt Copy */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#60a5fa]">
                <Terminal className="h-4 w-4" /> Hermes Agent &amp; Nous Research Tool Directive
              </div>
              <h4 className="mt-2 text-xl font-bold text-white">Machine-Readable AI Companion Schema</h4>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Copy this python tool directive to equip <strong>{selectedPet.name}</strong> inside your local Hermes Agent runtime, Termux mobile terminal, or Google Antigravity SDK agent instance.
              </p>

              {/* Code Snippet Box */}
              <div className="relative mt-4 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-blue-300">
                <code>{selectedPet.hermesPrompt}</code>
                <button
                  onClick={() => copyPrompt(selectedPet.hermesPrompt, selectedPet.id)}
                  className="absolute top-3 right-3 rounded-lg bg-slate-800 p-2 text-slate-300 hover:bg-slate-700 hover:text-white cursor-pointer"
                >
                  {copiedId === selectedPet.id ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Abilities Badges */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Equipped Abilities</div>
              <div className="flex flex-wrap gap-2">
                {selectedPet.abilities.map((ability, idx) => (
                  <span key={idx} className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 border border-slate-700">
                    ⚡ {ability}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
