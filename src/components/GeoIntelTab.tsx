import React from 'react';
import { GeoLocation, DomainIntelligence, EmailIncident } from '../types';
import { MailOriginGeoPicture } from './MailOriginGeoPicture';
import {
  Globe,
  MapPin,
  Server,
  ShieldAlert,
  Calendar,
  AlertTriangle,
  Building,
  Radio,
  FileSearch,
  ExternalLink,
} from 'lucide-react';

interface GeoIntelTabProps {
  originGeo: GeoLocation;
  domainIntel: DomainIntelligence;
  incident?: EmailIncident;
  theme?: 'light' | 'dark' | 'cyber';
}

export const GeoIntelTab: React.FC<GeoIntelTabProps> = ({ originGeo, domainIntel, incident, theme = 'light' }) => {
  const isLight = theme === 'light';
  const isCyber = theme === 'cyber';

  return (
    <div className="space-y-6">
      {/* Geolocation Origin Picture */}
      {incident && (
        <MailOriginGeoPicture incident={incident} theme={theme} />
      )}

      {/* Top Grid: IP Geolocation + Domain WHOIS Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Card 1: Originating IP Geolocation & Autonomous System */}
        <div className={`rounded-2xl border p-4 shadow-xs space-y-4 transition-colors ${
          isLight ? 'bg-white border-gray-200 shadow-sm' : 'border-[#1A1A1F] bg-[#0A0A0F]'
        }`}>
          <div className={`flex items-center justify-between border-b pb-3 ${
            isLight ? 'border-gray-100' : 'border-[#1A1A1F]'
          }`}>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#FF3D00]" />
              <h3 className={`font-mono font-bold text-xs uppercase tracking-wider ${
                isLight ? 'text-gray-900' : 'text-white'
              }`}>
                Originating IP Geolocation Intelligence
              </h3>
            </div>
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase ${
                originGeo.threatScore > 80
                  ? 'bg-red-100 text-red-800 border border-red-200 dark:bg-[#FF3D00]/10 dark:text-[#FF3D00] dark:border-[#FF3D00]/30'
                  : originGeo.threatScore > 40
                  ? 'bg-amber-100 text-amber-800 border border-amber-200 dark:bg-[#EAB308]/10 dark:text-[#EAB308] dark:border-[#EAB308]/30'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-[#00FF41]/10 dark:text-[#00FF41] dark:border-[#00FF41]/30'
              }`}
            >
              IP THREAT: {originGeo.threatScore}/100
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className={`p-3 rounded-xl border ${
              isLight ? 'bg-gray-50 border-gray-200' : 'bg-[#12121A] border-[#1A1A1F]'
            }`}>
              <span className={`text-[9px] uppercase tracking-wider block mb-0.5 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Extracted Origin IP</span>
              <span className={`font-bold text-xs ${isLight ? 'text-blue-700' : 'text-[#00E0FF]'}`}>{originGeo.ip}</span>
            </div>
            <div className={`p-3 rounded-xl border ${
              isLight ? 'bg-gray-50 border-gray-200' : 'bg-[#12121A] border-[#1A1A1F]'
            }`}>
              <span className={`text-[9px] uppercase tracking-wider block mb-0.5 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Location & Country</span>
              <span className={`font-semibold text-xs truncate block ${isLight ? 'text-gray-900' : 'text-white'}`}>
                {originGeo.city}, {originGeo.country} ({originGeo.countryCode})
              </span>
            </div>
            <div className={`p-3 rounded-xl border ${
              isLight ? 'bg-gray-50 border-gray-200' : 'bg-[#12121A] border-[#1A1A1F]'
            }`}>
              <span className={`text-[9px] uppercase tracking-wider block mb-0.5 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Coordinates</span>
              <span className={`text-xs ${isLight ? 'text-gray-800' : 'text-gray-300'}`}>
                {originGeo.lat.toFixed(4)}° N, {originGeo.lng.toFixed(4)}° E
              </span>
            </div>
            <div className={`p-3 rounded-xl border ${
              isLight ? 'bg-gray-50 border-gray-200' : 'bg-[#12121A] border-[#1A1A1F]'
            }`}>
              <span className={`text-[9px] uppercase tracking-wider block mb-0.5 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Autonomous System (ASN)</span>
              <span className={`text-xs truncate block ${isLight ? 'text-gray-800' : 'text-gray-300'}`}>{originGeo.asn}</span>
            </div>
          </div>

          <div className={`space-y-2 text-xs font-mono p-3 rounded-xl border ${
            isLight ? 'bg-gray-50 border-gray-200' : 'bg-[#12121A] border-[#1A1A1F]'
          }`}>
            <div className="flex justify-between">
              <span className={isLight ? 'text-gray-500' : 'text-gray-400'}>ISP:</span>
              <span className={`font-medium ${isLight ? 'text-gray-900' : 'text-gray-200'}`}>{originGeo.isp}</span>
            </div>
            <div className="flex justify-between">
              <span className={isLight ? 'text-gray-500' : 'text-gray-400'}>Registered Org:</span>
              <span className={isLight ? 'text-gray-700' : 'text-gray-300'}>{originGeo.org}</span>
            </div>
          </div>

          {/* Anonymizer Flags */}
          <div className={`border-t pt-3 ${isLight ? 'border-gray-100' : 'border-[#1A1A1F]'}`}>
            <span className={`text-[9px] font-mono uppercase tracking-widest block mb-2 font-bold ${
              isLight ? 'text-gray-500' : 'text-gray-400'
            }`}>
              Anonymization & Proxy Fingerprints
            </span>
            <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
              <div
                className={`p-2 rounded-xl border ${
                  originGeo.isTor
                    ? 'border-red-300 bg-red-100 text-red-800 dark:border-[#FF3D00]/50 dark:bg-[#FF3D00]/10 dark:text-[#FF3D00] font-bold'
                    : isLight
                    ? 'border-gray-200 bg-gray-50 text-gray-500'
                    : 'border-[#1A1A1F] bg-[#12121A] text-gray-400'
                }`}
              >
                TOR NODE
                <span className="block text-[8px] mt-0.5">{originGeo.isTor ? 'DETECTED' : 'CLEAR'}</span>
              </div>
              <div
                className={`p-2 rounded-xl border ${
                  originGeo.isVpn
                    ? 'border-amber-300 bg-amber-100 text-amber-800 dark:border-[#EAB308]/50 dark:bg-[#EAB308]/10 dark:text-[#EAB308] font-bold'
                    : isLight
                    ? 'border-gray-200 bg-gray-50 text-gray-500'
                    : 'border-[#1A1A1F] bg-[#12121A] text-gray-400'
                }`}
              >
                VPN TUNNEL
                <span className="block text-[8px] mt-0.5">{originGeo.isVpn ? 'DETECTED' : 'CLEAR'}</span>
              </div>
              <div
                className={`p-2 rounded-xl border ${
                  originGeo.isProxy
                    ? 'border-red-300 bg-red-100 text-red-800 dark:border-[#FF3D00]/50 dark:bg-[#FF3D00]/10 dark:text-[#FF3D00] font-bold'
                    : isLight
                    ? 'border-gray-200 bg-gray-50 text-gray-500'
                    : 'border-[#1A1A1F] bg-[#12121A] text-gray-400'
                }`}
              >
                OPEN PROXY
                <span className="block text-[8px] mt-0.5">{originGeo.isProxy ? 'DETECTED' : 'CLEAR'}</span>
              </div>
              <div
                className={`p-2 rounded-xl border ${
                  originGeo.isCloudHosting
                    ? 'border-blue-300 bg-blue-100 text-blue-800 dark:border-[#00E0FF]/50 dark:bg-[#00E0FF]/10 dark:text-[#00E0FF] font-bold'
                    : isLight
                    ? 'border-gray-200 bg-gray-50 text-gray-500'
                    : 'border-[#1A1A1F] bg-[#12121A] text-gray-400'
                }`}
              >
                VPS / CLOUD
                <span className="block text-[8px] mt-0.5">{originGeo.isCloudHosting ? 'DETECTED' : 'RESIDENTIAL'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Domain Intelligence & WHOIS Analysis */}
        <div className={`rounded-2xl border p-4 shadow-xs space-y-4 transition-colors ${
          isLight ? 'bg-white border-gray-200 shadow-sm' : 'border-[#1A1A1F] bg-[#0A0A0F]'
        }`}>
          <div className={`flex items-center justify-between border-b pb-3 ${
            isLight ? 'border-gray-100' : 'border-[#1A1A1F]'
          }`}>
            <div className="flex items-center gap-2">
              <Globe className={`h-4 w-4 ${isLight ? 'text-blue-600' : 'text-[#00E0FF]'}`} />
              <h3 className={`font-mono font-bold text-xs uppercase tracking-wider ${
                isLight ? 'text-gray-900' : 'text-white'
              }`}>
                Domain WHOIS & Threat Infrastructure
              </h3>
            </div>
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase ${
                domainIntel.threatReputationScore > 80
                  ? 'bg-red-100 text-red-800 border border-red-200 dark:bg-[#FF3D00]/10 dark:text-[#FF3D00] dark:border-[#FF3D00]/30'
                  : domainIntel.threatReputationScore > 40
                  ? 'bg-amber-100 text-amber-800 border border-amber-200 dark:bg-[#EAB308]/10 dark:text-[#EAB308] dark:border-[#EAB308]/30'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-[#00FF41]/10 dark:text-[#00FF41] dark:border-[#00FF41]/30'
              }`}
            >
              DOMAIN RISK: {domainIntel.threatReputationScore}/100
            </span>
          </div>

          {/* Lookalike Warning Banner */}
          {domainIntel.isLookalike && (
            <div className={`flex items-start gap-2.5 rounded-xl border p-3 text-xs ${
              isLight
                ? 'border-red-200 bg-red-50 text-red-800'
                : 'border-[#FF3D00]/40 bg-[#FF3D00]/10 text-[#FF3D00]'
            }`}>
              <AlertTriangle className="h-4 w-4 shrink-0 text-[#FF3D00] mt-0.5" />
              <div>
                <span className="font-bold uppercase tracking-wider text-[10px]">Deceptive Lookalike / Typosquat Domain Identified</span>
                <p className={`text-[10px] mt-0.5 ${isLight ? 'text-red-700' : 'text-gray-300'}`}>
                  Adversary registered this domain to impersonate: <strong className={isLight ? 'text-red-900' : 'text-white'}>{domainIntel.lookalikeTarget}</strong>
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className={`p-3 rounded-xl border ${
              isLight ? 'bg-gray-50 border-gray-200' : 'bg-[#12121A] border-[#1A1A1F]'
            }`}>
              <span className={`text-[9px] uppercase tracking-wider block mb-0.5 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Sender Domain</span>
              <span className={`font-bold text-xs truncate block ${isLight ? 'text-blue-700' : 'text-[#00E0FF]'}`}>{domainIntel.domain}</span>
            </div>
            <div className={`p-3 rounded-xl border ${
              isLight ? 'bg-gray-50 border-gray-200' : 'bg-[#12121A] border-[#1A1A1F]'
            }`}>
              <span className={`text-[9px] uppercase tracking-wider block mb-0.5 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Registration Intel</span>
              <span className={`font-bold text-xs ${
                domainIntel.ageDays < 30
                  ? 'text-red-600 dark:text-[#FF3D00]'
                  : 'text-emerald-600 dark:text-[#00FF41]'
              }`}>
                {domainIntel.ageDays} Days Old
                {domainIntel.ageDays < 14 && ' (FRESH)'}
              </span>
            </div>
            <div className={`p-3 rounded-xl border ${
              isLight ? 'bg-gray-50 border-gray-200' : 'bg-[#12121A] border-[#1A1A1F]'
            }`}>
              <span className={`text-[9px] uppercase tracking-wider block mb-0.5 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>ICANN Registrar</span>
              <span className={`truncate block text-xs ${isLight ? 'text-gray-900 font-semibold' : 'text-white'}`}>{domainIntel.registrar}</span>
            </div>
            <div className={`p-3 rounded-xl border ${
              isLight ? 'bg-gray-50 border-gray-200' : 'bg-[#12121A] border-[#1A1A1F]'
            }`}>
              <span className={`text-[9px] uppercase tracking-wider block mb-0.5 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Registration Date</span>
              <span className={`text-xs ${isLight ? 'text-gray-800' : 'text-gray-300'}`}>
                {new Date(domainIntel.creationDate).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* DNS Records & NameServers */}
          <div className={`space-y-2 text-xs font-mono p-3 rounded-xl border ${
            isLight ? 'bg-gray-50 border-gray-200' : 'bg-[#12121A] border-[#1A1A1F]'
          }`}>
            <div className="flex justify-between items-center">
              <span className={isLight ? 'text-gray-500' : 'text-gray-400'}>Authoritative NameServers:</span>
              <span className={`text-xs ${isLight ? 'text-gray-800' : 'text-gray-200'}`}>{domainIntel.nameServers.join(', ')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={isLight ? 'text-gray-500' : 'text-gray-400'}>Configured Mail Exchangers (MX):</span>
              <span className={`text-xs truncate max-w-[200px] ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>{domainIntel.mxRecords.join(', ')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
