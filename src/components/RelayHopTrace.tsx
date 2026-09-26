import React from 'react';
import { RelayHop } from '../types';
import {
  Server,
  ArrowDown,
  Clock,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  Globe,
  Radio,
  Zap,
} from 'lucide-react';

interface RelayHopTraceProps {
  hops: RelayHop[];
  theme?: 'light' | 'dark' | 'cyber';
}

export const RelayHopTrace: React.FC<RelayHopTraceProps> = ({ hops, theme = 'light' }) => {
  const isLight = theme === 'light';
  const isCyber = theme === 'cyber';

  return (
    <div className="space-y-6 font-mono">
      <div className={`flex flex-wrap items-center justify-between gap-3 border-b pb-3 ${
        isLight ? 'border-gray-200' : 'border-[#1A1A1F]'
      }`}>
        <div>
          <h3 className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${
            isLight ? 'text-gray-900' : 'text-white'
          }`}>
            <Radio className="h-4 w-4 text-[#00E0FF]" />
            SMTP Relay Transmission Path & Routing Trace
          </h3>
          <p className={`text-[10px] font-sans tracking-tight ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
            Chronological reconstruction from earliest sending host to perimeter enterprise gateway
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className={`inline-flex items-center rounded-xl border px-3 py-1 font-bold ${
            isLight
              ? 'bg-blue-50 border-blue-200 text-blue-700'
              : 'bg-[#00E0FF]/10 border-[#00E0FF]/30 text-[#00E0FF]'
          }`}>
            Total Hops: {hops.length}
          </span>
          <span className={`inline-flex items-center rounded-xl border px-3 py-1 font-bold ${
            isLight
              ? 'bg-red-50 border-red-200 text-red-700'
              : 'bg-[#FF3D00]/10 border-[#FF3D00]/30 text-[#FF3D00]'
          }`}>
            Anomalous Hops: {hops.filter((h) => h.isAnomalous).length}
          </span>
        </div>
      </div>

      {/* Hop Timeline Cards */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-[#FF3D00] before:via-[#00E0FF] before:to-[#00FF41]">
        {hops.map((hop, idx) => {
          const isOrigin = hop.isOriginating;
          const isLast = idx === hops.length - 1;
          const isAnomalous = hop.isAnomalous;

          return (
            <div key={`hop-item-${idx}`} className="relative group">
              {/* Dot Icon Indicator on Timeline */}
              <div
                className={`absolute -left-6 top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                  isLight ? 'bg-white' : 'bg-[#050507]'
                } ${
                  isOrigin
                    ? 'border-[#FF3D00] text-[#FF3D00] shadow-[0_0_10px_rgba(255,61,0,0.3)]'
                    : isAnomalous
                    ? 'border-[#EAB308] text-[#EAB308]'
                    : 'border-[#00FF41] text-[#00FF41]'
                }`}
              >
                <span className="text-[10px] font-mono font-bold">{hop.hopNumber}</span>
              </div>

              {/* Hop Content Card */}
              <div
                className={`rounded-2xl border p-4 transition-all duration-200 shadow-xs ${
                  isLight
                    ? isOrigin
                      ? 'border-red-200 bg-red-50/20 shadow-xs'
                      : isAnomalous
                      ? 'border-amber-200 bg-amber-50/20'
                      : 'border-gray-200 bg-white'
                    : isOrigin
                    ? 'border-[#FF3D00]/50 bg-[#0A0A0F] shadow-[0_0_25px_rgba(255,61,0,0.2)]'
                    : isAnomalous
                    ? 'border-[#EAB308]/40 bg-[#0A0A0F]'
                    : 'border-[#1A1A1F] bg-[#0A0A0F]'
                }`}
              >
                {/* Hop Header */}
                <div className={`flex flex-wrap items-center justify-between gap-2 border-b pb-3 mb-3 ${
                  isLight ? 'border-gray-100' : 'border-[#1A1A1F]'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">
                      {isOrigin ? (
                        <span className="text-[#FF3D00]">HOP #{hop.hopNumber} — EARLIEST RELIABLE SENDING NODE (ORIGIN)</span>
                      ) : isLast ? (
                        <span className="text-emerald-600 dark:text-[#00FF41]">HOP #{hop.hopNumber} — FINAL PERIMETER GATEWAY INGESTION</span>
                      ) : (
                        <span className={isLight ? 'text-gray-800' : 'text-gray-300'}>HOP #{hop.hopNumber} — TRANSIT INTERMEDIARY RELAY</span>
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono">
                    <div className={`flex items-center gap-1 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                      <Clock className="h-3.5 w-3.5" />
                      <span>{new Date(hop.timestamp).toLocaleTimeString()} UTC</span>
                    </div>
                    {hop.delayMs > 0 && (
                      <span className="text-amber-600 dark:text-[#EAB308] font-semibold text-[10px]">
                        +{Math.round(hop.delayMs / 1000)}s Transit Delay
                      </span>
                    )}
                  </div>
                </div>

                {/* Routing Specifications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                  <div className={`space-y-1.5 p-3.5 rounded-xl border ${
                    isLight ? 'bg-gray-50 border-gray-200' : 'bg-[#12121A] border-[#1A1A1F]'
                  }`}>
                    <div className={`text-[10px] uppercase tracking-wider ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Sending Entity (From):</div>
                    <div className={`font-semibold break-all ${isLight ? 'text-gray-900' : 'text-white'}`}>{hop.fromHost}</div>
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className={isLight ? 'text-blue-600 font-bold' : 'text-[#00E0FF]'}>IP: {hop.fromIP}</span>
                      <span className={isLight ? 'text-gray-300' : 'text-gray-600'}>|</span>
                      <span className={isLight ? 'text-gray-600' : 'text-gray-400'}>Proto: {hop.protocol}</span>
                    </div>
                  </div>

                  <div className={`space-y-1.5 p-3.5 rounded-xl border ${
                    isLight ? 'bg-gray-50 border-gray-200' : 'bg-[#12121A] border-[#1A1A1F]'
                  }`}>
                    <div className={`text-[10px] uppercase tracking-wider ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Receiving Relay (By):</div>
                    <div className={`font-semibold break-all ${isLight ? 'text-gray-900' : 'text-white'}`}>{hop.byHost}</div>
                    <div className={`text-[10px] ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                      Authenticating Mail Transfer Agent (MTA)
                    </div>
                  </div>
                </div>

                {/* Geolocation & Network Infrastructure Badge */}
                {hop.geo && (
                  <div className={`mt-3 flex flex-wrap items-center justify-between gap-3 border rounded-xl p-2.5 text-xs font-mono ${
                    isLight ? 'bg-gray-50 border-gray-200' : 'bg-[#12121A] border-[#1A1A1F]'
                  }`}>
                    <div className={`flex items-center gap-2 ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
                      <Globe className={`h-4 w-4 shrink-0 ${isLight ? 'text-blue-600' : 'text-[#00E0FF]'}`} />
                      <span>{hop.geo.city}, {hop.geo.country} ({hop.geo.countryCode})</span>
                      <span className={isLight ? 'text-gray-300' : 'text-gray-600'}>|</span>
                      <span className={isLight ? 'text-gray-500' : 'text-gray-400'}>{hop.geo.isp}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {hop.geo.isTor && (
                        <span className="rounded-md bg-red-100 text-red-800 border border-red-200 dark:bg-[#FF3D00]/10 dark:text-[#FF3D00] dark:border-[#FF3D00]/30 px-2 py-0.5 text-[9px] font-bold uppercase">
                          TOR EXIT NODE
                        </span>
                      )}
                      {hop.geo.isVpn && (
                        <span className="rounded-md bg-amber-100 text-amber-800 border border-amber-200 dark:bg-[#EAB308]/10 dark:text-[#EAB308] dark:border-[#EAB308]/30 px-2 py-0.5 text-[9px] font-bold uppercase">
                          VPN / PROXY
                        </span>
                      )}
                      {hop.geo.isCloudHosting && (
                        <span className="rounded-md bg-blue-100 text-blue-800 border border-blue-200 dark:bg-[#00E0FF]/10 dark:text-[#00E0FF] dark:border-[#00E0FF]/30 px-2 py-0.5 text-[9px] font-bold uppercase">
                          VPS / HOSTING
                        </span>
                      )}
                      <span
                        className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase font-mono ${
                          hop.geo.threatScore > 80
                            ? 'bg-red-100 text-red-800 border border-red-200 dark:bg-[#FF3D00]/10 dark:text-[#FF3D00] dark:border-[#FF3D00]/30'
                            : hop.geo.threatScore > 40
                            ? 'bg-amber-100 text-amber-800 border border-amber-200 dark:bg-[#EAB308]/10 dark:text-[#EAB308] dark:border-[#EAB308]/30'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-[#00FF41]/10 dark:text-[#00FF41] dark:border-[#00FF41]/30'
                        }`}
                      >
                        SCORE: {hop.geo.threatScore}/100
                      </span>
                    </div>
                  </div>
                )}

                {/* Anomaly Callout Box */}
                {hop.anomalyNote && (
                  <div className={`mt-3 flex items-start gap-2.5 rounded-xl border p-2.5 text-xs font-sans ${
                    isLight
                      ? 'border-red-200 bg-red-50 text-red-800'
                      : 'border-[#FF3D00]/30 bg-[#FF3D00]/5 text-[#FF3D00]'
                  }`}>
                    <AlertTriangle className="h-4 w-4 shrink-0 text-[#FF3D00] mt-0.5" />
                    <p className="leading-relaxed">{hop.anomalyNote}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
