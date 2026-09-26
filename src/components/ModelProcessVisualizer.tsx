import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Cpu,
  ShieldAlert,
  ShieldCheck,
  Globe,
  Binary,
  Lock,
  Layers,
  Sparkles,
  Zap,
  Activity,
  CheckCircle2,
  AlertTriangle,
  FileSearch,
  Eye,
  Crosshair,
  Hash,
  Database,
  Terminal,
  ChevronRight,
  Info,
  ExternalLink,
} from 'lucide-react';
import { EmailIncident } from '../types';

interface ModelProcessVisualizerProps {
  theme: 'light' | 'dark' | 'cyber';
  incidents: EmailIncident[];
  onInspectIncident?: (incident: EmailIncident) => void;
}

interface PipelineStage {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  icon: any;
  category: 'Ingress' | 'RFC Parsing' | 'Cognitive AI' | 'Intelligence' | 'Ledger';
  color: string;
  description: string;
  algorithmDetail: string;
  mathFormula?: string;
  outputArtifact: string;
}

const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 'ingress',
    number: 1,
    title: 'MTA Ingress & Envelope Extraction',
    subtitle: 'RFC 821 SMTP Protocol Interception',
    icon: Binary,
    category: 'Ingress',
    color: '#3b82f6',
    description: 'The Mail Transfer Agent (MTA) captures the incoming byte stream before message delivery. It extracts envelope headers, HELO/EHLO hostnames, and IP sockets.',
    algorithmDetail: 'Extracts SMTP handshake metadata: `MAIL FROM`, `RCPT TO`, TLS cipher suite, and client TCP socket address.',
    mathFormula: 'Socket = (IP_{src}:Port_{src}) \\rightarrow TLS_{1.3}[AES\\_256\\_GCM]',
    outputArtifact: 'Normalized Raw MIME & Socket Handshake Vector',
  },
  {
    id: 'headers',
    number: 2,
    title: 'Cryptographic Protocol Verification',
    subtitle: 'SPF, DKIM & DMARC Alignment Matrix',
    icon: Lock,
    category: 'RFC Parsing',
    color: '#8b5cf6',
    description: 'Calculates RSA/Ed25519 public key signatures against DNS TXT records. Verifies SPF sender authorization and evaluates strict DMARC alignment.',
    algorithmDetail: 'Performs DNS TXT lookup on `_dmarc.<domain>`. Validates RSA-SHA256 signature in `DKIM-Signature:` header. Evaluates Header-From vs Envelope-From alignment.',
    mathFormula: 'DMARC_{align} = (Domain_{SPF} \\equiv Domain_{From}) \\lor (Domain_{DKIM} \\equiv Domain_{From})',
    outputArtifact: 'Protocol Alignment Vector: [SPF: Fail, DKIM: Fail, DMARC: Reject]',
  },
  {
    id: 'geo_mta',
    number: 3,
    title: 'Origin Geolocation & MTA Relay Hops',
    subtitle: 'BGP Autonomous System & Tor Hop Analysis',
    icon: Globe,
    category: 'Intelligence',
    color: '#06b6d4',
    description: 'Parses the chronological `Received:` header chain from earliest hop to destination. Correlates origin IP against MaxMind GeoIP2, BGP ASN routing tables, and active Tor exit nodes.',
    algorithmDetail: 'Calculates latency timestamps (Δt) across relay hops. Identifies private RFC 1918 hops, spoofed internal MTAs, and proxy cloaking.',
    mathFormula: 'Hop\\_Latency_i = Timestamp_{MTA_{i+1}} - Timestamp_{MTA_i}',
    outputArtifact: 'Geo-Origin: Frankfurt, Tor Exit Node: TRUE, ASN: AS24940',
  },
  {
    id: 'nlp_nlp',
    number: 4,
    title: 'Cognitive NLP & Social Engineering Vectorization',
    subtitle: 'Gemini 3.6 Flash Neural Semantic Attention',
    icon: Cpu,
    category: 'Cognitive AI',
    color: '#f59e0b',
    description: 'Passes normalized subject, body, and sender typography into Gemini 3.6 Flash. Computes multi-head attention over urgency tokens, executive impersonation cues, and unverified payment alteration requests.',
    algorithmDetail: 'Extracts semantic pressure vectors: Temporal Urgency (weight: 0.25), Executive Impersonation (weight: 0.35), Financial Wire Routing Redirection (weight: 0.40).',
    mathFormula: 'Attention(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V',
    outputArtifact: 'Extracted Threat: BEC Wire Fraud, Impersonation Target: CEO, Pressure: High',
  },
  {
    id: 'mitre',
    number: 5,
    title: 'Adversary Attribution & MITRE Matrix Mapping',
    subtitle: 'Threat Actor Heuristics & TTP Correlation',
    icon: Crosshair,
    category: 'Intelligence',
    color: '#ef4444',
    description: 'Correlates behavioral anomalies, domain age (WHOIS < 14 days), and wire coordinates against the MITRE ATT&CK Enterprise Matrix and known cyber threat syndicates.',
    algorithmDetail: 'Maps IOCs to MITRE Techniques: T1566.002 (Spearphishing Link), T1656 (Impersonation), T1585 (Establish Accounts). Matches clustering signature to SilverTerrier.',
    mathFormula: 'Confidence = \\sum_{i=1}^n w_i \\cdot Sim(IOC_i, Syndicate\\_Profile)',
    outputArtifact: 'Actor: SilverTerrier (Confidence: 92%), MITRE: [T1566.002, T1656]',
  },
  {
    id: 'scoring',
    number: 6,
    title: 'Ensemble Fraud Score & SOAR Decision Boundary',
    subtitle: 'Bayesian Calibrated Risk Classification',
    icon: Activity,
    category: 'Cognitive AI',
    color: '#ec4899',
    description: 'Synthesizes protocol alignment, geographic anomaly, cognitive NLP attention, and actor attribution into a calibrated Fraud Risk Score from 0 to 100.',
    algorithmDetail: 'Applies calibrated non-linear sigmoid decision boundary. Score >= 85 triggers immediate automated border quarantine; score < 20 allows inbox delivery.',
    mathFormula: 'FraudScore = \\sigma\\left(w_1 P_{proto} + w_2 P_{geo} + w_3 P_{nlp} + w_4 P_{mitre}\\right) \\times 100',
    outputArtifact: 'Risk Score: 96/100 (Severity: Critical, Action: Immediate Quarantine)',
  },
  {
    id: 'blockchain',
    number: 7,
    title: 'Cryptographic SHA-512 Seal & Proof-of-Custody',
    subtitle: 'Consortium PoA Blockchain Ledger Mine',
    icon: Layers,
    category: 'Ledger',
    color: '#10b981',
    description: 'Computes a 512-bit SHA-512 cryptographic evidence seal of the raw RFC 822 payload. Commits the transaction to an immutable Proof-of-Authority consortium blockchain.',
    algorithmDetail: 'Generates Merkle tree root hash. Signs block header with consortium authority node private key. Guarantees ISO/IEC 27037 legal admissibility in court.',
    mathFormula: 'Hash_{seal} = \\text{SHA-512}\\left(Header \\parallel Body \\parallel Nonce\\right)',
    outputArtifact: 'Block #89,421 Mined (Merkle Root: 0x441b8219ad58ef..., Status: Sealed)',
  },
];

export const ModelProcessVisualizer: React.FC<ModelProcessVisualizerProps> = ({
  theme,
  incidents,
  onInspectIncident,
}) => {
  const isLight = theme === 'light';
  const isCyber = theme === 'cyber';

  // Selected Incident for simulation
  const [selectedIncidentIndex, setSelectedIncidentIndex] = useState<number>(0);
  const activeIncident = incidents[selectedIncidentIndex] || incidents[0];

  // Pipeline Animation State
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(2000); // ms per stage
  const [autoLoop, setAutoLoop] = useState<boolean>(true);

  // Canvas ref for animated particle data flow
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Auto-advance loop
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setActiveStageIndex((prev) => {
        if (prev >= PIPELINE_STAGES.length - 1) {
          if (autoLoop) {
            return 0;
          } else {
            setIsPlaying(false);
            return prev;
          }
        }
        return prev + 1;
      });
    }, playbackSpeed);

    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed, autoLoop]);

  // Particle flow animation in background canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 140);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 140;
    };
    window.addEventListener('resize', handleResize);

    // Particle instances
    interface FlowParticle {
      x: number;
      y: number;
      speed: number;
      size: number;
      color: string;
      targetStage: number;
    }

    const particles: FlowParticle[] = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: 20 + Math.random() * 100,
      speed: 1.2 + Math.random() * 2.2,
      size: 2 + Math.random() * 2.5,
      color: ['#3b82f6', '#8b5cf6', '#06b6d4', '#f59e0b', '#10b981'][Math.floor(Math.random() * 5)],
      targetStage: Math.floor(Math.random() * PIPELINE_STAGES.length),
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connecting circuit bus line
      ctx.beginPath();
      ctx.moveTo(40, height / 2);
      ctx.lineTo(width - 40, height / 2);
      ctx.strokeStyle = isLight ? 'rgba(203, 213, 225, 0.6)' : isCyber ? 'rgba(0, 255, 65, 0.2)' : 'rgba(55, 65, 81, 0.5)';
      ctx.lineWidth = 3;
      ctx.setLineDash([6, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Stage Nodes along the line
      const stageSpacing = (width - 80) / (PIPELINE_STAGES.length - 1);
      PIPELINE_STAGES.forEach((stage, idx) => {
        const nodeX = 40 + idx * stageSpacing;
        const nodeY = height / 2;
        const isCurrent = idx === activeStageIndex;
        const isPassed = idx < activeStageIndex;

        // Outer pulse circle
        if (isCurrent) {
          ctx.beginPath();
          ctx.arc(nodeX, nodeY, 18, 0, Math.PI * 2);
          ctx.fillStyle = `${stage.color}25`;
          ctx.fill();
        }

        // Main node circle
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, isCurrent ? 12 : 8, 0, Math.PI * 2);
        ctx.fillStyle = isCurrent ? stage.color : isPassed ? '#10b981' : isLight ? '#cbd5e1' : '#374151';
        ctx.fill();

        // Node outline
        ctx.strokeStyle = isCurrent ? '#ffffff' : 'transparent';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Stage number
        ctx.fillStyle = isCurrent || isPassed ? '#ffffff' : '#64748b';
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${idx + 1}`, nodeX, nodeY);
      });

      // Update and draw streaming data packets
      particles.forEach((p) => {
        p.x += p.speed;
        if (p.x > width - 30) {
          p.x = 30;
          p.y = 30 + Math.random() * 80;
        }

        // Draw packet
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeStageIndex, isLight, isCyber]);

  const activeStage = PIPELINE_STAGES[activeStageIndex];
  const ActiveIcon = activeStage.icon;

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header & Controller Banner */}
      <div
        className={`rounded-2xl p-6 border transition-all ${
          isLight
            ? 'bg-white border-[#e0e3e7] shadow-sm'
            : isCyber
            ? 'bg-[#0b0f14] border-[#00ff41]/30 shadow-[0_0_25px_rgba(0,255,65,0.06)]'
            : 'bg-[#181920] border-[#2e2e38]'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <div
                className={`p-2.5 rounded-xl ${
                  isLight
                    ? 'bg-blue-50 text-blue-600'
                    : isCyber
                    ? 'bg-[#00ff41]/10 text-[#00ff41]'
                    : 'bg-indigo-950/60 text-indigo-400'
                }`}
              >
                <Cpu className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold tracking-tight">
                    Algorithm & Process Flow Visualizer
                  </h1>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                    7-STAGE PIPELINE
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Interactive real-time execution trace of the cognitive email threat detection, attribution, and blockchain custody engine
                </p>
              </div>
            </div>
          </div>

          {/* Incident Selector + Playback Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Choose sample email to run through pipeline */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500">Input Sample:</span>
              <select
                value={selectedIncidentIndex}
                onChange={(e) => {
                  setSelectedIncidentIndex(Number(e.target.value));
                  setActiveStageIndex(0);
                }}
                className={`text-xs rounded-xl px-3 py-2 border font-medium font-mono ${
                  isLight ? 'bg-gray-50 border-gray-300' : 'bg-gray-900 border-gray-700 text-white'
                }`}
              >
                {incidents.slice(0, 5).map((inc, i) => (
                  <option key={inc.id} value={i}>
                    {inc.caseNumber} - {inc.subject.substring(0, 32)}...
                  </option>
                ))}
              </select>
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all ${
                isPlaying
                  ? 'bg-amber-500 text-white hover:bg-amber-600'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
              {isPlaying ? 'Pause Simulation' : 'Resume Flow'}
            </button>

            {/* Step forward */}
            <button
              onClick={() => {
                setIsPlaying(false);
                setActiveStageIndex((prev) => (prev + 1) % PIPELINE_STAGES.length);
              }}
              className={`p-2 rounded-xl border transition-all ${
                isLight ? 'bg-gray-100 hover:bg-gray-200 border-gray-300' : 'bg-gray-800 hover:bg-gray-700 border-gray-700'
              }`}
              title="Step forward 1 stage"
            >
              <SkipForward className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>

            {/* Reset */}
            <button
              onClick={() => {
                setActiveStageIndex(0);
                setIsPlaying(true);
              }}
              className={`p-2 rounded-xl border transition-all ${
                isLight ? 'bg-gray-100 hover:bg-gray-200 border-gray-300' : 'bg-gray-800 hover:bg-gray-700 border-gray-700'
              }`}
              title="Restart from Stage 1"
            >
              <RotateCcw className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>

            {/* Speed selection */}
            <select
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
              className={`text-xs rounded-xl px-2.5 py-2 border ${
                isLight ? 'bg-gray-50 border-gray-300' : 'bg-gray-900 border-gray-700 text-gray-200'
              }`}
            >
              <option value={3000}>Speed: 0.75x (Slow)</option>
              <option value={2000}>Speed: 1.0x (Normal)</option>
              <option value={1000}>Speed: 2.0x (Fast)</option>
            </select>
          </div>
        </div>

        {/* 2. Interactive Animated Data Pipeline Canvas */}
        <div className="mt-6 pt-6 border-t border-gray-200/60 dark:border-gray-800/60 relative">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500 mb-2">
            <span>DATA PACKET TRANSMISSION BUS & PIPELINE TOPOLOGY</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400">
              ● Active Stage: {activeStageIndex + 1} of {PIPELINE_STAGES.length} ({activeStage.title})
            </span>
          </div>

          {/* Canvas */}
          <div className="relative w-full rounded-xl overflow-hidden bg-gray-50 dark:bg-[#0d1117] border border-gray-200 dark:border-gray-800">
            <canvas ref={canvasRef} className="w-full block" />
          </div>

          {/* Quick Stage Clicker Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mt-4">
            {PIPELINE_STAGES.map((stg, idx) => {
              const isCurrent = idx === activeStageIndex;
              const isPast = idx < activeStageIndex;

              return (
                <button
                  key={stg.id}
                  onClick={() => {
                    setActiveStageIndex(idx);
                    setIsPlaying(false);
                  }}
                  className={`p-2.5 rounded-xl text-left border transition-all text-xs relative ${
                    isCurrent
                      ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20 shadow-sm dark:bg-blue-950/40'
                      : isPast
                      ? 'bg-emerald-50/40 border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-800'
                      : isLight
                      ? 'bg-white border-gray-200 hover:border-gray-300'
                      : 'bg-gray-800/40 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-gray-400">
                      STEP 0{stg.number}
                    </span>
                    {isPast ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    ) : isCurrent ? (
                      <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping" />
                    ) : null}
                  </div>
                  <div className="font-bold text-gray-900 dark:text-gray-100 text-[11px] truncate mt-1">
                    {stg.title}
                  </div>
                  <div className="text-[10px] text-gray-500 truncate">
                    {stg.category}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Deep Dive into the Active Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Stage Algorithm & Mathematical Execution (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div
            className={`p-6 rounded-2xl border space-y-4 ${
              isLight
                ? 'bg-white border-[#e0e3e7] shadow-sm'
                : isCyber
                ? 'bg-[#0b0f14] border-[#00ff41]/20'
                : 'bg-[#181920] border-[#2e2e38]'
            }`}
          >
            {/* Stage Title */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className="p-3 rounded-xl text-white shadow-md flex items-center justify-center"
                  style={{ backgroundColor: activeStage.color }}
                >
                  <ActiveIcon className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-gray-400 uppercase">
                      Stage {activeStage.number} Execution Profile
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white uppercase"
                      style={{ backgroundColor: activeStage.color }}
                    >
                      {activeStage.category}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {activeStage.title}
                  </h2>
                  <p className="text-xs text-gray-500 font-medium">
                    {activeStage.subtitle}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono text-gray-400">Status</span>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-500">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  PROCESSING
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
              {activeStage.description}
            </p>

            {/* Algorithmic Mechanics */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                <Terminal className="h-4 w-4 text-blue-600" />
                <span>Internal Execution Logic & Algorithm Details</span>
              </div>
              <p className="text-xs font-mono text-gray-800 dark:text-gray-200 leading-normal">
                {activeStage.algorithmDetail}
              </p>
            </div>

            {/* Mathematical Equation / Formal Formulation */}
            {activeStage.mathFormula && (
              <div className="p-4 rounded-xl bg-gray-950 text-cyan-400 border border-cyan-500/30 space-y-1.5 font-mono text-xs">
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block">
                  Formal Mathematical / Protocol Specification
                </span>
                <div className="text-sm font-bold text-cyan-300 py-1">
                  {activeStage.mathFormula}
                </div>
              </div>
            )}

            {/* Output Artifact */}
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
              <span className="text-gray-500 font-medium">Generated State Artifact:</span>
              <span className="font-mono font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-2.5 py-1 rounded-lg border border-purple-200 dark:border-purple-800">
                {activeStage.outputArtifact}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Live Incident Transformation Matrix (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div
            className={`p-6 rounded-2xl border space-y-4 ${
              isLight
                ? 'bg-white border-[#e0e3e7] shadow-sm'
                : isCyber
                ? 'bg-[#0b0f14] border-[#00ff41]/20'
                : 'bg-[#181920] border-[#2e2e38]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-emerald-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100">
                  Live Incident Memory Vector
                </h3>
              </div>
              <span className="text-xs font-mono text-gray-400">
                {activeIncident.caseNumber}
              </span>
            </div>

            {/* Simulated Live Data Inspection tailored to the active stage */}
            <div className="space-y-3 text-xs">
              {/* Stage 1: Ingress */}
              {activeStageIndex === 0 && (
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border font-mono">
                    <span className="text-gray-400 text-[10px] block">MIME SENDER ADDRESS</span>
                    <span className="text-blue-600 font-bold">{activeIncident.senderAddress}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border font-mono">
                    <span className="text-gray-400 text-[10px] block">DISPLAY NAME</span>
                    <span className="text-gray-800 dark:text-gray-200">{activeIncident.senderDisplay}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border font-mono">
                    <span className="text-gray-400 text-[10px] block">SUBJECT LINE</span>
                    <span className="text-gray-900 dark:text-gray-100 font-bold">{activeIncident.subject}</span>
                  </div>
                </div>
              )}

              {/* Stage 2: RFC Protocols */}
              {activeStageIndex === 1 && (
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border flex items-center justify-between">
                    <span className="font-bold">SPF (Sender Policy Framework):</span>
                    <span className="font-mono font-bold text-red-600 uppercase">
                      {activeIncident.protocols.spf.status}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border flex items-center justify-between">
                    <span className="font-bold">DKIM (Cryptographic Signature):</span>
                    <span className="font-mono font-bold text-red-600 uppercase">
                      {activeIncident.protocols.dkim.status}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border flex items-center justify-between">
                    <span className="font-bold">DMARC Policy Enforcement:</span>
                    <span className="font-mono font-bold text-red-600 uppercase">
                      {activeIncident.protocols.dmarc.status}
                    </span>
                  </div>
                </div>
              )}

              {/* Stage 3: Geo & MTA */}
              {activeStageIndex === 2 && (
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border font-mono">
                    <span className="text-gray-400 text-[10px] block">ORIGINATING SOCKET IP</span>
                    <span className="text-cyan-500 font-bold">{activeIncident.originatingGeo.ip}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border font-mono">
                    <span className="text-gray-400 text-[10px] block">GEOLOCATION & ISP</span>
                    <span>{activeIncident.originatingGeo.city}, {activeIncident.originatingGeo.country} ({activeIncident.originatingGeo.isp})</span>
                  </div>
                  <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 flex items-center justify-between font-mono">
                    <span className="text-red-700 dark:text-red-400 font-bold">TOR EXIT NODE:</span>
                    <span className="text-red-600 font-black">{activeIncident.originatingGeo.isTor ? 'TRUE (ANONYMIZED)' : 'FALSE'}</span>
                  </div>
                </div>
              )}

              {/* Stage 4: Cognitive NLP Attention */}
              {activeStageIndex === 3 && (
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900">
                    <span className="text-amber-800 dark:text-amber-400 font-bold block text-[10px] uppercase">
                      SEMANTIC ATTENTION TRIGGER
                    </span>
                    <p className="text-gray-800 dark:text-gray-200 mt-1 italic">
                      "{activeIncident.subject}"
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border">
                    <span className="text-gray-400 text-[10px] block">ATTACK CLASSIFICATION</span>
                    <span className="text-amber-600 font-black font-mono text-sm">{activeIncident.classification}</span>
                  </div>
                </div>
              )}

              {/* Stage 5: MITRE Attribution */}
              {activeStageIndex === 4 && (
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border">
                    <span className="text-gray-400 text-[10px] block">ATTRIBUTED SYNDICATE</span>
                    <span className="text-red-600 font-black font-mono text-sm">
                      {activeIncident.attribution.probableActorOrSyndicate}
                    </span>
                    <span className="text-[10px] text-gray-500 block">
                      Confidence: {activeIncident.attribution.confidenceScore}%
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border space-y-1">
                    <span className="text-gray-400 text-[10px] block">MITRE TECHNIQUES</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {activeIncident.attribution.mitreAttackTechniques.map((tech) => (
                        <span key={tech} className="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-mono text-[10px] font-bold">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Stage 6: Scoring & Decision */}
              {activeStageIndex === 5 && (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-900 text-center">
                    <span className="text-[10px] font-bold text-red-700 dark:text-red-400 uppercase tracking-widest block">
                      CALCULATED FRAUD RISK SCORE
                    </span>
                    <span className="text-4xl font-black text-red-600 font-mono block my-1">
                      {activeIncident.fraudScore}/100
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-red-600 text-white uppercase inline-block">
                      {activeIncident.threatSeverity} Severity
                    </span>
                  </div>
                </div>
              )}

              {/* Stage 7: Blockchain Seal */}
              {activeStageIndex === 6 && (
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800">
                    <span className="text-emerald-800 dark:text-emerald-400 font-bold block text-[10px] uppercase">
                      CRYPTOGRAPHIC EVIDENCE HASH (SHA-512)
                    </span>
                    <span className="font-mono text-[10px] text-emerald-700 dark:text-emerald-300 break-all block mt-1">
                      {activeIncident.sha512 || '441b8219ad58ef9c7e2b1029c9e88102d1847c0b991823abce849920'}...
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border flex items-center justify-between">
                    <span className="font-bold">Proof-of-Custody:</span>
                    <span className="font-mono font-bold text-emerald-600 uppercase">
                      ✓ IMMUTABLE // MINED
                    </span>
                  </div>
                </div>
              )}

              {/* Inspect in Full Forensic view */}
              {onInspectIncident && (
                <button
                  onClick={() => onInspectIncident(activeIncident)}
                  className="w-full mt-2 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <Eye className="h-4 w-4 text-blue-600" />
                  <span>Open Deep Forensic Inspector for {activeIncident.caseNumber}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
