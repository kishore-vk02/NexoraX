import React, { useState } from 'react';
import { AttributionInsight, EmailIncident } from '../types';
import {
  Network,
  Shield,
  Layers,
  Fingerprint,
  Target,
  ExternalLink,
  ChevronRight,
  Info,
} from 'lucide-react';

interface AttributionGraphProps {
  attribution: AttributionInsight;
  incident: EmailIncident;
  theme?: 'light' | 'dark' | 'cyber';
}

export const AttributionGraph: React.FC<AttributionGraphProps> = ({
  attribution,
  incident,
  theme = 'light',
}) => {
  const [activeNode, setActiveNode] = useState<string | null>('actor');
  const isLight = theme === 'light';

  // Define nodes in visual layout
  const nodes = [
    {
      id: 'actor',
      label: attribution.probableActorOrSyndicate,
      sub: 'Attributed Threat Group',
      x: 350,
      y: 180,
      type: 'actor',
      color: '#FF3D00',
    },
    {
      id: 'origin_ip',
      label: incident.originatingGeo.ip,
      sub: `${incident.originatingGeo.city}, ${incident.originatingGeo.country}`,
      x: 160,
      y: 90,
      type: 'ip',
      color: isLight ? '#2563EB' : '#00E0FF',
    },
    {
      id: 'domain',
      label: incident.domainIntel.domain,
      sub: incident.domainIntel.isLookalike ? 'Lookalike Domain' : 'Compromised Domain',
      x: 540,
      y: 90,
      type: 'domain',
      color: isLight ? '#0D9488' : '#00E0FF',
    },
    {
      id: 'relay',
      label: incident.relayHops[1]?.fromIP || 'Transit Relay',
      sub: incident.relayHops[1]?.geo?.org || 'Intermediary Hop',
      x: 170,
      y: 280,
      type: 'relay',
      color: '#D97706',
    },
    {
      id: 'target',
      label: incident.recipientAddress,
      sub: 'Target Enterprise Mailbox',
      x: 530,
      y: 280,
      type: 'target',
      color: '#16A34A',
    },
  ];

  const links = [
    { from: 'actor', to: 'origin_ip', label: 'Operates Infrastructure' },
    { from: 'actor', to: 'domain', label: 'Registered / Hijacked' },
    { from: 'origin_ip', to: 'relay', label: 'Bounces Traffic' },
    { from: 'domain', to: 'target', label: 'Transmits Phishing Payload' },
    { from: 'actor', to: 'target', label: 'Social Engineering Coercion' },
  ];

  return (
    <div className="space-y-6 font-mono">
      {/* Top Attribution Summary Banner */}
      <div className={`rounded-2xl border p-4 shadow-xs transition-colors ${
        isLight ? 'bg-white border-gray-200 shadow-sm' : 'border-[#1A1A1F] bg-[#0A0A0F]'
      }`}>
        <div className={`flex flex-wrap items-center justify-between gap-4 border-b pb-4 mb-4 ${
          isLight ? 'border-gray-100' : 'border-[#1A1A1F]'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
              isLight
                ? 'bg-red-50 border-red-200 text-red-600'
                : 'bg-[#FF3D00]/10 border-[#FF3D00]/30 text-[#FF3D00]'
            }`}>
              <Fingerprint className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`font-bold text-sm uppercase tracking-wider ${
                  isLight ? 'text-gray-900' : 'text-white'
                }`}>
                  {attribution.probableActorOrSyndicate}
                </h3>
                <span className="rounded-md bg-red-100 text-red-800 border border-red-200 dark:bg-[#FF3D00]/10 dark:text-[#FF3D00] dark:border-[#FF3D00]/30 px-2 py-0.5 text-[10px] font-bold uppercase">
                  {attribution.category}
                </span>
              </div>
              <p className={`text-[10px] font-sans mt-0.5 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                Campaign Cluster: <span className={`font-mono font-semibold ${isLight ? 'text-blue-600' : 'text-[#00E0FF]'}`}>{attribution.campaignCluster}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className={`text-[9px] uppercase tracking-wider font-bold ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Attribution Confidence</div>
              <div className="text-xl font-extrabold text-red-600 dark:text-[#FF3D00]">
                {attribution.confidenceScore}%
              </div>
            </div>
            <div className={`h-9 w-2 rounded-full overflow-hidden flex flex-col justify-end ${
              isLight ? 'bg-gray-100' : 'bg-[#1A1A1F]'
            }`}>
              <div
                className="bg-red-600 dark:bg-[#FF3D00] w-full"
                style={{ height: `${attribution.confidenceScore}%` }}
              ></div>
            </div>
          </div>
        </div>

        <p className={`text-xs leading-relaxed font-sans ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
          <strong className={`font-mono text-xs ${isLight ? 'text-gray-900' : 'text-white'}`}>INVESTIGATIVE RATIONALE:</strong> {attribution.reasoning}
        </p>

        <div className={`mt-3 text-[10px] ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
          ESTIMATED OPERATING GEOGRAPHY: <span className={`font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>{attribution.actorOriginEstimate}</span>
        </div>
      </div>

      {/* Interactive Network Graph */}
      <div className={`rounded-2xl border p-4 shadow-xs relative overflow-hidden transition-colors ${
        isLight ? 'bg-white border-gray-200 shadow-sm' : 'border-[#1A1A1F] bg-[#0A0A0F]'
      }`}>
        <div className={`flex items-center justify-between border-b pb-2.5 mb-3 ${
          isLight ? 'border-gray-100' : 'border-[#1A1A1F]'
        }`}>
          <span className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${
            isLight ? 'text-gray-900' : 'text-white'
          }`}>
            <Network className={`h-4 w-4 ${isLight ? 'text-blue-600' : 'text-[#00E0FF]'}`} />
            Graph-Based Infrastructure & Campaign Correlation Matrix
          </span>
          <span className={`text-[9px] uppercase ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>
            Click any node to inspect relationship links
          </span>
        </div>

        <div className={`relative w-full h-[360px] rounded-xl overflow-hidden border ${
          isLight ? 'bg-gray-50/80 border-gray-200' : 'bg-[#050507] border-[#1A1A1F]'
        }`}>
          <svg viewBox="0 0 700 360" className="w-full h-full select-none">
            <defs>
              <linearGradient id="linkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF3D00" stopOpacity="0.8" />
                <stop offset="100%" stopColor={isLight ? '#2563EB' : '#00E0FF'} stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Connecting Links */}
            {links.map((link, idx) => {
              const fromNode = nodes.find((n) => n.id === link.from)!;
              const toNode = nodes.find((n) => n.id === link.to)!;
              const midX = (fromNode.x + toNode.x) / 2;
              const midY = (fromNode.y + toNode.y) / 2;

              return (
                <g key={`link-${idx}`}>
                  <line
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke={isLight ? '#CBD5E1' : '#1A1A1F'}
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                  <text
                    x={midX}
                    y={midY - 4}
                    textAnchor="middle"
                    fill={isLight ? '#64748B' : '#6B7280'}
                    fontSize="8.5"
                    fontFamily="monospace"
                  >
                    {link.label}
                  </text>
                </g>
              );
            })}

            {/* Visual Nodes */}
            {nodes.map((node) => {
              const isSelected = activeNode === node.id;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  className="cursor-pointer group"
                  onClick={() => setActiveNode(node.id)}
                >
                  {isSelected && (
                    <circle r="36" fill="none" stroke={node.color} strokeWidth="1.5" strokeDasharray="3 3" className="animate-spin" />
                  )}

                  {/* Main Node Shape */}
                  <rect
                    x="-90"
                    y="-20"
                    width="180"
                    height="40"
                    rx="8"
                    fill={isLight ? '#FFFFFF' : '#0A0A0F'}
                    stroke={node.color}
                    strokeWidth={isSelected ? '2' : '1.5'}
                    className={`transition-all duration-200 ${
                      isLight ? 'group-hover:fill-blue-50/50 shadow-xs' : 'group-hover:fill-[#12121A]'
                    }`}
                  />

                  {/* Node Label */}
                  <text
                    y="-3"
                    textAnchor="middle"
                    fill={isLight ? '#0F172A' : '#FFFFFF'}
                    fontSize="9.5"
                    fontFamily="monospace"
                    fontWeight="bold"
                    className="pointer-events-none"
                  >
                    {node.label.length > 22 ? node.label.substring(0, 22) + '...' : node.label}
                  </text>

                  {/* Node Subtitle */}
                  <text
                    y="11"
                    textAnchor="middle"
                    fill={isLight ? '#64748B' : '#9CA3AF'}
                    fontSize="8"
                    fontFamily="monospace"
                    className="pointer-events-none"
                  >
                    {node.sub}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* MITRE ATT&CK Techniques Matrix */}
      <div className={`rounded-2xl border p-4 shadow-xs transition-colors ${
        isLight ? 'bg-white border-gray-200 shadow-sm' : 'border-[#1A1A1F] bg-[#0A0A0F]'
      }`}>
        <h4 className={`text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2 ${
          isLight ? 'text-gray-900' : 'text-white'
        }`}>
          <Layers className={`h-4 w-4 ${isLight ? 'text-blue-600' : 'text-[#00E0FF]'}`} />
          Correlated MITRE ATT&CK Enterprise Matrix Techniques
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {attribution.mitreAttackTechniques.map((tech, idx) => (
            <div
              key={`tech-${idx}`}
              className={`flex items-center justify-between p-3 rounded-xl border text-xs ${
                isLight ? 'border-gray-200 bg-gray-50' : 'border-[#1A1A1F] bg-[#12121A]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF3D00] shadow-[0_0_4px_#FF3D00]"></span>
                <span className={`font-semibold ${isLight ? 'text-gray-800' : 'text-gray-200'}`}>{tech}</span>
              </div>
              <span className="text-[9px] text-blue-600 dark:text-[#00E0FF] uppercase tracking-wider border border-blue-200 dark:border-[#00E0FF]/30 bg-blue-50 dark:bg-[#00E0FF]/5 rounded-md px-2 py-0.5 font-bold">
                Active IOC
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
