import React from 'react';
import { EmailIncident, GeoLocation } from '../types';
import { WorldThreatMap } from './WorldThreatMap';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Radio,
  Globe,
  TrendingUp,
  Inbox,
  ArrowRight,
  Filter,
  CheckCircle,
  Blocks,
  Link as LinkIcon,
  Coins,
  Cpu,
} from 'lucide-react';

interface DashboardOverviewProps {
  incidents: EmailIncident[];
  onSelectIncident: (incident: EmailIncident) => void;
  selectedIncident: EmailIncident;
  onSelectGeo?: (geo: GeoLocation) => void;
  onNavigateToBlockchain?: () => void;
  blockchainHeight?: number;
  theme?: 'light' | 'dark' | 'cyber';
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  incidents,
  onSelectIncident,
  selectedIncident,
  onSelectGeo,
  onNavigateToBlockchain,
  blockchainHeight = 2,
  theme = 'light',
}) => {
  const isLight = theme === 'light';
  const isCyber = theme === 'cyber';

  const criticalCount = incidents.filter((i) => i.threatSeverity === 'critical').length;
  const highCount = incidents.filter((i) => i.threatSeverity === 'high').length;
  const becCount = incidents.filter((i) => i.classification === 'BEC_Fraud').length;

  const allOriginGeos = incidents.map((inc) => ({
    geo: inc.originatingGeo,
    caseNumber: inc.caseNumber,
    threat: inc.classification,
    score: inc.fraudScore,
  }));

  return (
    <div className="space-y-6">
      {/* Blockchain Threat Intelligence Bar */}
      <div className={`rounded-2xl border p-3.5 flex flex-wrap items-center justify-between gap-3 font-mono text-xs transition-colors shadow-xs ${
        isLight
          ? 'bg-white border-gray-200 text-gray-800 shadow-sm'
          : isCyber
          ? 'border-[#00FF41]/40 bg-[#0A0A0F] text-white shadow-[0_0_20px_rgba(0,255,65,0.1)]'
          : 'border-[#686B6C] bg-[#000000] text-[#FFFFFF]'
      }`}>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg overflow-hidden ring-1 ring-black/10 dark:ring-[#00FF41]/40 shrink-0 bg-[#070b19]">
            <img
              src="/app-logo.jpg"
              alt="Evi-Mail Blockchain Core"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className={`flex flex-wrap items-center gap-2 ${isLight ? 'text-gray-700' : 'text-[#E5E7EB]'}`}>
            <span className={`font-bold uppercase tracking-wider ${isLight ? 'text-emerald-700' : 'text-[#00FF41]'}`}>
              Threat Blockchain Ledger:
            </span>
            <span className={isLight ? 'text-gray-900 font-semibold' : 'text-[#E5E7EB]/80'}>
              Height: Block #{blockchainHeight}
            </span>
            <span className={isLight ? 'text-gray-300' : 'text-[#1F2937]'}>|</span>
            <span className={`flex items-center gap-1 ${isLight ? 'text-emerald-700 font-medium' : 'text-[#00FF41]'}`}>
              <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${isLight ? 'bg-emerald-600' : 'bg-[#00FF41]'}`}></span>
              Consensus Quorum: 5/5 Nodes Synchronized
            </span>
            <span className={isLight ? 'text-gray-300' : 'text-[#1F2937]'}>|</span>
            <span className={isLight ? 'text-gray-500' : 'text-[#E5E7EB]/60'}>
              PoA ISO/IEC 27037 Integrity Verified
            </span>
          </div>
        </div>

        {onNavigateToBlockchain && (
          <button
            onClick={onNavigateToBlockchain}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isLight
                ? 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                : 'bg-[#00FF41]/10 text-[#00FF41] hover:bg-[#00FF41]/20 border border-[#00FF41]/30'
            }`}
          >
            <Blocks className="h-3.5 w-3.5" />
            <span>Open Threat Ledger</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className={`rounded-2xl border p-4 space-y-1.5 shadow-xs transition-colors ${
          isLight
            ? 'bg-white border-gray-200 text-gray-900 shadow-sm'
            : 'border-[#1F2937] bg-[#1F2937]/30 text-white'
        }`}>
          <div className={`flex items-center justify-between text-[11px] font-mono uppercase tracking-wider font-bold ${
            isLight ? 'text-gray-500' : 'text-[#E5E7EB]/60'
          }`}>
            <span>Total Emails Monitored</span>
            <Inbox className="h-4 w-4 text-blue-600 dark:text-[#00FF41]" />
          </div>
          <div className={`text-2xl font-mono font-bold tracking-tight ${isLight ? 'text-gray-900' : 'text-[#E5E7EB]'}`}>
            1,402,291
          </div>
          <div className={`flex items-center gap-1.5 text-[10px] font-mono ${isLight ? 'text-emerald-700 font-semibold' : 'text-[#00FF41]'}`}>
            <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${isLight ? 'bg-emerald-600' : 'bg-[#00FF41]'}`}></span>
            <span className="uppercase tracking-wider">Perimeter Gateway Active</span>
          </div>
        </div>

        {/* Stat 2 */}
        <div className={`rounded-2xl border p-4 space-y-1.5 shadow-xs transition-colors ${
          isLight
            ? 'bg-white border-red-200/80 text-gray-900 shadow-sm'
            : 'border-[#1F2937] bg-[#1F2937]/30 text-white'
        }`}>
          <div className={`flex items-center justify-between text-[11px] font-mono uppercase tracking-wider font-bold ${
            isLight ? 'text-red-700' : 'text-[#E5E7EB]/60'
          }`}>
            <span>Critical Interceptions</span>
            <ShieldAlert className="h-4 w-4 text-red-600 dark:text-[#FF3D00]" />
          </div>
          <div className="text-2xl font-mono font-bold text-red-600 dark:text-[#FF3D00] tracking-tight">
            {criticalCount} BLOCKED
          </div>
          <div className={`text-[10px] font-mono uppercase tracking-wider ${isLight ? 'text-gray-500' : 'text-[#E5E7EB]/60'}`}>
            100% Inbound Containment Rate
          </div>
        </div>

        {/* Stat 3 */}
        <div className={`rounded-2xl border p-4 space-y-1.5 shadow-xs transition-colors ${
          isLight
            ? 'bg-white border-amber-200/80 text-gray-900 shadow-sm'
            : 'border-[#1F2937] bg-[#1F2937]/30 text-white'
        }`}>
          <div className={`flex items-center justify-between text-[11px] font-mono uppercase tracking-wider font-bold ${
            isLight ? 'text-amber-700' : 'text-[#E5E7EB]/60'
          }`}>
            <span>BEC & Wire Diversions</span>
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-[#00FF41]" />
          </div>
          <div className={`text-2xl font-mono font-bold tracking-tight ${isLight ? 'text-amber-700' : 'text-[#00FF41]'}`}>
            {becCount} Incidents
          </div>
          <div className={`text-[10px] font-mono uppercase tracking-wider ${isLight ? 'text-gray-500' : 'text-[#E5E7EB]/60'}`}>
            $597,390 USD Exposure Prevented
          </div>
        </div>

        {/* Stat 4 */}
        <div className={`rounded-2xl border p-4 space-y-1.5 shadow-xs transition-colors ${
          isLight
            ? 'bg-white border-emerald-200/80 text-gray-900 shadow-sm'
            : 'border-[#1F2937] bg-[#1F2937]/30 text-white'
        }`}>
          <div className={`flex items-center justify-between text-[11px] font-mono uppercase tracking-wider font-bold ${
            isLight ? 'text-emerald-700' : 'text-[#E5E7EB]/60'
          }`}>
            <span>Origin Trace Resolution</span>
            <Globe className="h-4 w-4 text-emerald-600 dark:text-[#00FF41]" />
          </div>
          <div className={`text-2xl font-mono font-bold tracking-tight ${isLight ? 'text-emerald-700' : 'text-[#00FF41]'}`}>
            99.4%
          </div>
          <div className={`text-[10px] font-mono uppercase tracking-wider ${isLight ? 'text-gray-500' : 'text-[#E5E7EB]/60'}`}>
            Earliest Node Extracted & Geo-mapped
          </div>
        </div>
      </div>

      {/* Global World Threat Map */}
      <WorldThreatMap
        originGeo={selectedIncident.originatingGeo}
        relayHops={selectedIncident.relayHops}
        allOriginGeos={allOriginGeos}
        onSelectGeo={onSelectGeo}
      />

      {/* Real-time Threat Triage & Ingestion Feed */}
      <div className={`rounded-2xl border overflow-hidden shadow-xs transition-colors ${
        isLight
          ? 'bg-white border-gray-200 shadow-sm'
          : 'border-[#1F2937] bg-[#000000] shadow-[0_0_40px_rgba(0,0,0,0.8)]'
      }`}>
        <div className={`flex flex-wrap items-center justify-between border-b px-4 py-3 ${
          isLight ? 'border-gray-200 bg-gray-50 text-gray-800' : 'border-[#1F2937] bg-[#1F2937]/40 text-[#E5E7EB]'
        }`}>
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <h3 className={`font-mono font-bold text-xs uppercase tracking-widest ${isLight ? 'text-gray-900' : 'text-[#E5E7EB]'}`}>
              Live Ingestion Stream & Threat Case Queue
            </h3>
          </div>
          <span className={`text-[10px] font-mono uppercase tracking-wider ${isLight ? 'text-gray-500' : 'text-[#E5E7EB]/60'}`}>
            Telemetry Rate: 4.8 EPS // Click incident for forensic workbench
          </span>
        </div>

        <div className={`divide-y ${isLight ? 'divide-gray-100' : 'divide-[#1F2937]'}`}>
          {incidents.map((inc) => {
            const isSelected = selectedIncident.id === inc.id;
            const isCritical = inc.threatSeverity === 'critical';
            const isHigh = inc.threatSeverity === 'high';

            const borderColor = isCritical
              ? 'border-red-500'
              : isHigh
              ? 'border-amber-500'
              : 'border-emerald-500';

            const scoreColor = isCritical
              ? 'text-red-600 dark:text-[#FF3D00]'
              : isHigh
              ? 'text-amber-600 dark:text-[#00FF41]'
              : 'text-emerald-600 dark:text-[#00FF41]';

            return (
              <div
                key={inc.id}
                onClick={() => onSelectIncident(inc)}
                className={`p-3.5 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4 ${borderColor} ${
                  isSelected
                    ? isLight
                      ? 'bg-blue-50/70'
                      : 'bg-[#1F2937]/60'
                    : isLight
                    ? 'bg-white hover:bg-gray-50'
                    : 'bg-[#000000] hover:bg-[#1F2937]/40'
                }`}
              >
                {/* Left details */}
                <div className="space-y-1 max-w-2xl font-mono">
                  <div className="flex flex-wrap items-center gap-2 text-[10px]">
                    <span className={isLight ? 'text-gray-500' : 'text-[#E5E7EB]/50'}>
                      {new Date(inc.receivedAt).toLocaleTimeString()}
                    </span>
                    <span className={isLight ? 'text-gray-300' : 'text-[#1F2937]'}>|</span>
                    <span className={`font-bold ${isLight ? 'text-blue-700' : 'text-[#00FF41]'}`}>
                      {inc.caseNumber}
                    </span>
                    <span className={isLight ? 'text-gray-300' : 'text-[#1F2937]'}>|</span>
                    <span className={`font-bold ${scoreColor}`}>
                      {inc.fraudScore}% SCORE
                    </span>
                    <span className={isLight ? 'text-gray-300' : 'text-[#1F2937]'}>|</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-bold ${
                        isCritical
                          ? 'bg-red-100 text-red-800 dark:bg-[#FF3D00]/10 dark:text-[#FF3D00] border border-red-200 dark:border-[#FF3D00]/30'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-[#00FF41]/10 dark:text-[#00FF41] border border-emerald-200 dark:border-[#00FF41]/30'
                      }`}
                    >
                      {inc.classification}
                    </span>
                  </div>

                  <h4 className={`font-bold text-xs tracking-wide ${isLight ? 'text-gray-900' : 'text-[#E5E7EB]'}`}>
                    {inc.subject}
                  </h4>

                  <div className={`flex flex-wrap items-center gap-3 text-[10px] ${isLight ? 'text-gray-600' : 'text-[#E5E7EB]/70'}`}>
                    <div>
                      From: <span className={`font-medium ${isLight ? 'text-gray-900' : 'text-[#E5E7EB]'}`}>{inc.senderAddress}</span>
                    </div>
                    <div className={isLight ? 'text-gray-300' : 'text-[#1F2937]'}>•</div>
                    <div>
                      Origin:{' '}
                      <span className={isLight ? 'text-emerald-700 font-semibold' : 'text-[#00FF41]'}>
                        {inc.originatingGeo.city}, {inc.originatingGeo.country}
                      </span>
                    </div>
                    <div className={isLight ? 'text-gray-300' : 'text-[#1F2937]'}>•</div>
                    <div>Hops: <span className={isLight ? 'text-gray-800' : 'text-[#E5E7EB]'}>{inc.relayHops.length}</span></div>
                    {inc.blockchainProof && (
                      <>
                        <div className={isLight ? 'text-gray-300' : 'text-[#1F2937]'}>•</div>
                        <div className={`flex items-center gap-1 ${isLight ? 'text-emerald-700 font-medium' : 'text-[#00FF41]'}`}>
                          <Blocks className="h-3 w-3" />
                          <span>Block #{inc.blockchainProof.blockNumber} Sealed</span>
                        </div>
                      </>
                    )}
                    {inc.detectedCryptoWallets && inc.detectedCryptoWallets.length > 0 && (
                      <>
                        <div className={isLight ? 'text-gray-300' : 'text-[#1F2937]'}>•</div>
                        <div className={`flex items-center gap-1 ${isLight ? 'text-amber-700 font-medium' : 'text-[#00FF41]'}`}>
                          <Coins className="h-3 w-3" />
                          <span>{inc.detectedCryptoWallets[0].currency} Wallet Flagged</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Right score & inspect trigger */}
                <div className="flex items-center gap-4 shrink-0 font-mono">
                  <div className="text-right">
                    <div className={`text-[9px] uppercase tracking-wider ${isLight ? 'text-gray-500' : 'text-[#E5E7EB]/60'}`}>
                      FRAUD RISK
                    </div>
                    <div className={`text-lg font-bold ${scoreColor}`}>
                      {inc.fraudScore}%
                    </div>
                  </div>

                  <button
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                      isSelected
                        ? isLight
                          ? 'bg-blue-600 text-white'
                          : 'bg-[#00FF41] text-[#000000] shadow-[0_0_10px_rgba(0,255,65,0.4)]'
                        : isLight
                        ? 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        : 'bg-[#1F2937] text-[#E5E7EB] border border-[#1F2937] hover:border-[#00FF41]/40'
                    }`}
                  >
                    <span>Inspect</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
