import React, { useState } from 'react';
import { EmailIncident } from '../types';
import { HeaderForensicsTab } from './HeaderForensicsTab';
import { RelayHopTrace } from './RelayHopTrace';
import { GeoIntelTab } from './GeoIntelTab';
import { AttributionGraph } from './AttributionGraph';
import { NlpAnalysisTab } from './NlpAnalysisTab';
import { BlockchainForensicsTab } from './BlockchainForensicsTab';
import { MailOriginGeoPicture } from './MailOriginGeoPicture';
import {
  ShieldAlert,
  ShieldCheck,
  Radio,
  FileCode,
  Globe,
  Brain,
  Network,
  Download,
  AlertTriangle,
  Lock,
  CheckCircle2,
  FileText,
  Ban,
  UserX,
  Blocks,
  Coins,
  MapPin,
} from 'lucide-react';

interface EmailAnalyzerProps {
  incident: EmailIncident;
  onQuarantine?: (id: string) => void;
  onBlockIp?: (ip: string) => void;
  onGenerateReport?: (incident: EmailIncident) => void;
  maskPii?: boolean;
  theme?: 'light' | 'dark' | 'cyber';
}

export const EmailAnalyzer: React.FC<EmailAnalyzerProps> = ({
  incident,
  onQuarantine,
  onBlockIp,
  onGenerateReport,
  maskPii = false,
  theme = 'light',
}) => {
  const isLight = theme === 'light';
  const isCyber = theme === 'cyber';

  const [activeTab, setActiveTab] = useState<
    'protocols' | 'hops' | 'geo' | 'nlp' | 'attribution' | 'blockchain' | 'raw'
  >('protocols');
  const [showGeoPicture, setShowGeoPicture] = useState(true);

  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<any>(null);

  const maskEmail = (email: string) => {
    if (!maskPii) return email;
    const parts = email.split('@');
    if (parts.length < 2) return email;
    const user = parts[0];
    const maskedUser = user.length > 2 ? user[0] + '***' + user[user.length - 1] : '***';
    return `${maskedUser}@${parts[1]}`;
  };

  const maskText = (text: string) => {
    if (!maskPii) return text;
    return text
      .replace(/\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/g, '[REDACTED_PHONE]')
      .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, (match) => maskEmail(match))
      .replace(/\$\d+(?:,\d{3})*(?:\.\d{2})?/g, '[REDACTED_AMOUNT]');
  };

  const handleRunAi = async () => {
    setAiLoading(true);
    try {
      const res = await fetch('/api/analyze-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: incident.subject,
          bodyText: incident.bodyText,
          sender: incident.senderAddress,
          recipient: incident.recipientAddress,
          headers: incident.rawHeaders,
        }),
      });
      const data = await res.json();
      setAiResponse(data);
    } catch (e) {
      console.error(e);
    } finally {
      setAiLoading(false);
    }
  };

  const isCritical = incident.threatSeverity === 'critical';
  const isHigh = incident.threatSeverity === 'high';
  const scoreColor = isCritical
    ? 'text-[#FF3D00]'
    : isHigh
    ? 'text-[#EAB308]'
    : 'text-[#00FF41]';

  return (
    <div className="space-y-6">
      {/* Incident Case Banner */}
      <div
        className={`rounded-2xl border p-4 shadow-xs transition-colors ${
          isLight
            ? 'bg-white border-gray-200 text-gray-900 shadow-sm'
            : isCyber
            ? 'bg-[#0A0A0F] border-[#00E0FF]/30 text-white'
            : 'bg-[#000000] border-[#1F2937] text-[#E5E7EB]'
        }`}
      >
        <div className={`flex flex-wrap items-start justify-between gap-4 border-b pb-4 mb-4 ${
          isLight ? 'border-gray-100' : 'border-[#1F2937]'
        }`}>
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
                isLight
                  ? 'bg-gray-100 border-gray-200 text-gray-800'
                  : 'bg-[#1F2937] border-[#1F2937] text-[#E5E7EB]'
              }`}>
                CASE: {incident.caseNumber}
              </span>
              <span className={isLight ? 'text-gray-300' : 'text-[#E5E7EB]/30'}>•</span>
              <span className="text-xs text-emerald-600 dark:text-[#00FF41] font-mono font-semibold">
                ORIGIN: {incident.originatingGeo.city}, {incident.originatingGeo.country}
              </span>
              <span className={isLight ? 'text-gray-300' : 'text-[#E5E7EB]/30'}>•</span>
              <span className={`text-[10px] font-mono ${isLight ? 'text-gray-500' : 'text-[#E5E7EB]/70'}`}>
                LAT: {incident.originatingGeo.lat} / LONG: {incident.originatingGeo.lng}
              </span>
              <span className={isLight ? 'text-gray-300' : 'text-[#E5E7EB]/30'}>•</span>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-bold uppercase font-mono ${
                  incident.status === 'quarantined'
                    ? 'bg-red-100 text-red-800 border border-red-300 dark:bg-[#FF3D00]/10 dark:text-[#FF3D00] dark:border-[#FF3D00]/30'
                    : incident.status === 'blocked'
                    ? 'bg-red-200 text-red-900 border border-red-400 dark:bg-[#FF3D00]/20 dark:text-[#FF3D00] dark:border-[#FF3D00]/40'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-[#00FF41]/10 dark:text-[#00FF41] dark:border-[#00FF41]/30'
                }`}
              >
                STATUS: {incident.status}
              </span>
            </div>

            <h2 className={`text-base sm:text-lg font-bold font-mono tracking-wide leading-snug ${
              isLight ? 'text-gray-900' : 'text-[#E5E7EB]'
            }`}>
              {incident.subject}
            </h2>

            <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono pt-0.5 ${
              isLight ? 'text-gray-600' : 'text-[#E5E7EB]/70'
            }`}>
              <div>
                From: <span className={`font-semibold ${isLight ? 'text-gray-900' : 'text-[#E5E7EB]'}`}>{maskEmail(incident.senderAddress)}</span>
                <span className={`ml-1 ${isLight ? 'text-gray-500' : 'text-[#E5E7EB]/50'}`}>({maskText(incident.senderDisplay)})</span>
              </div>
              <div className="text-emerald-600 dark:text-[#00FF41]">→</div>
              <div>
                To: <span className="text-emerald-600 dark:text-[#00FF41] font-semibold">{maskEmail(incident.recipientAddress)}</span>
              </div>
            </div>
          </div>

          {/* Threat Score Gauge & Primary Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="text-right font-mono">
              <div className={`text-[10px] uppercase font-bold tracking-wider ${
                isLight ? 'text-gray-500' : 'text-[#E5E7EB]/50'
              }`}>
                Fraud Risk Score
              </div>
              <div className={`text-2xl font-black ${
                isCritical
                  ? isLight ? 'text-red-600' : 'text-[#FF3D00]'
                  : isHigh
                  ? isLight ? 'text-amber-600' : 'text-[#EAB308]'
                  : isLight ? 'text-emerald-600' : 'text-[#00FF41]'
              }`}>
                {incident.fraudScore}
                <span className={`text-xs font-normal ${isLight ? 'text-gray-500' : 'text-[#E5E7EB]/50'}`}>/100</span>
              </div>
              <span
                className={`inline-block text-[9px] font-bold uppercase rounded-md px-1.5 py-0.5 ${
                  isCritical
                    ? 'bg-red-100 text-red-800 border border-red-200 dark:bg-[#FF3D00]/10 dark:text-[#FF3D00] dark:border-[#FF3D00]/30'
                    : isHigh
                    ? 'bg-amber-100 text-amber-800 border border-amber-200 dark:bg-[#EAB308]/10 dark:text-[#EAB308] dark:border-[#EAB308]/30'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-[#00FF41]/10 dark:text-[#00FF41] dark:border-[#00FF41]/30'
                }`}
              >
                {incident.classification}
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-1.5 font-mono">
              <button
                onClick={() => onGenerateReport && onGenerateReport(incident)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-[#00FF41] dark:text-black px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-colors shadow-xs flex items-center justify-center gap-1.5 tracking-wider"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Forensic Brief</span>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShowGeoPicture(!showGeoPicture)}
                  title="Toggle GeoLocation Origin Picture showing where mail was raised to recipient"
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase transition-colors flex items-center justify-center gap-1.5 tracking-wider border flex-1 ${
                    showGeoPicture
                      ? isLight
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-xs'
                        : 'bg-[#00FF41]/15 text-[#00FF41] border-[#00FF41]/40 shadow-[0_0_10px_rgba(0,255,65,0.2)]'
                      : isLight
                      ? 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                      : 'bg-[#1F2937] text-[#E5E7EB]/70 border-[#1F2937] hover:text-[#E5E7EB]'
                  }`}
                >
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{showGeoPicture ? 'Geo Picture: ON' : 'Geo Picture: OFF'}</span>
                </button>

                <button
                  onClick={() => onBlockIp && onBlockIp(incident.originatingGeo.ip)}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase transition-colors flex items-center justify-center gap-1.5 tracking-wider border ${
                    isLight
                      ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                      : 'bg-[#1F2937] text-[#FF3D00] border-[#FF3D00]/30 hover:bg-[#FF3D00]/10'
                  }`}
                  title="Block this Origin IP on firewall"
                >
                  <Ban className="h-3.5 w-3.5" />
                  <span>Block IP</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cryptographic Hash Verification Strip */}
        <div className={`flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono p-2.5 rounded-xl border ${
          isLight
            ? 'bg-gray-50 border-gray-200 text-gray-600'
            : 'bg-[#1F2937]/50 border-[#1F2937] text-[#E5E7EB]/70'
        }`}>
          <div className="flex items-center gap-2">
            <Lock className="h-3.5 w-3.5 text-emerald-600 dark:text-[#00FF41]" />
            <span className={isLight ? 'text-gray-500' : 'text-[#E5E7EB]/60'}>SHA-512 Evidence Seal:</span>
            <span className={`font-semibold truncate max-w-md ${isLight ? 'text-gray-900 font-mono' : 'text-[#00FF41]'}`} title={incident.sha512 || incident.sha256}>
              {incident.sha512 || incident.sha256}
            </span>
          </div>
          <div className={`uppercase tracking-wider text-[9px] ${isLight ? 'text-gray-500 font-medium' : 'text-[#E5E7EB]/50'}`}>
            Chain-of-Custody Sealed • 512-Bit Cryptographic Ledger • ISO/IEC 27037 Standard
          </div>
        </div>
      </div>

      {/* Primary GeoLocation Picture */}
      {showGeoPicture && (
        <MailOriginGeoPicture incident={incident} />
      )}

      {/* Forensic Navigation Tabs */}
      <div className={`flex flex-wrap gap-1 p-1.5 rounded-2xl border ${
        isLight ? 'bg-gray-100 border-gray-200' : 'bg-[#1F2937]/60 border-[#1F2937]'
      }`}>
        <button
          onClick={() => setActiveTab('protocols')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all uppercase tracking-wider ${
            activeTab === 'protocols'
              ? isLight
                ? 'bg-white text-gray-900 border border-gray-300 shadow-sm'
                : 'bg-[#1F2937] text-[#00FF41] border border-[#00FF41]/40 shadow-[0_0_12px_rgba(0,255,65,0.25)]'
              : isLight
              ? 'text-gray-600 hover:text-gray-900 border border-transparent'
              : 'text-[#E5E7EB]/60 hover:text-[#E5E7EB] border border-transparent'
          }`}
        >
          <ShieldAlert className="h-3.5 w-3.5" />
          <span>Protocol & Header Forensics</span>
        </button>

        <button
          onClick={() => setActiveTab('hops')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all uppercase tracking-wider ${
            activeTab === 'hops'
              ? isLight
                ? 'bg-white text-gray-900 border border-gray-300 shadow-sm'
                : 'bg-[#1F2937] text-[#00FF41] border border-[#00FF41]/40 shadow-[0_0_12px_rgba(0,255,65,0.25)]'
              : isLight
              ? 'text-gray-600 hover:text-gray-900 border border-transparent'
              : 'text-[#E5E7EB]/60 hover:text-[#E5E7EB] border border-transparent'
          }`}
        >
          <Radio className="h-3.5 w-3.5" />
          <span>SMTP Relay Hop Trace ({incident.relayHops.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('geo')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all uppercase tracking-wider ${
            activeTab === 'geo'
              ? isLight
                ? 'bg-white text-gray-900 border border-gray-300 shadow-sm'
                : 'bg-[#1F2937] text-[#00FF41] border border-[#00FF41]/40 shadow-[0_0_12px_rgba(0,255,65,0.25)]'
              : isLight
              ? 'text-gray-600 hover:text-gray-900 border border-transparent'
              : 'text-[#E5E7EB]/60 hover:text-[#E5E7EB] border border-transparent'
          }`}
        >
          <Globe className="h-3.5 w-3.5" />
          <span>GeoLocation & Domain Intel</span>
        </button>

        <button
          onClick={() => setActiveTab('nlp')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all uppercase tracking-wider ${
            activeTab === 'nlp'
              ? isLight
                ? 'bg-white text-gray-900 border border-gray-300 shadow-sm'
                : 'bg-[#1F2937] text-[#00FF41] border border-[#00FF41]/40 shadow-[0_0_12px_rgba(0,255,65,0.25)]'
              : isLight
              ? 'text-gray-600 hover:text-gray-900 border border-transparent'
              : 'text-[#E5E7EB]/60 hover:text-[#E5E7EB] border border-transparent'
          }`}
        >
          <Brain className="h-3.5 w-3.5" />
          <span>Cognitive NLP & Threat Indicators</span>
        </button>

        <button
          onClick={() => setActiveTab('attribution')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all uppercase tracking-wider ${
            activeTab === 'attribution'
              ? isLight
                ? 'bg-white text-gray-900 border border-gray-300 shadow-sm'
                : 'bg-[#1F2937] text-[#00FF41] border border-[#00FF41]/40 shadow-[0_0_12px_rgba(0,255,65,0.25)]'
              : isLight
              ? 'text-gray-600 hover:text-gray-900 border border-transparent'
              : 'text-[#E5E7EB]/60 hover:text-[#E5E7EB] border border-transparent'
          }`}
        >
          <Network className="h-3.5 w-3.5" />
          <span>Attribution Graph & MITRE</span>
        </button>

        <button
          onClick={() => setActiveTab('blockchain')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all uppercase tracking-wider ${
            activeTab === 'blockchain'
              ? isLight
                ? 'bg-white text-gray-900 border border-gray-300 shadow-sm'
                : 'bg-[#1F2937] text-[#00FF41] border border-[#00FF41]/40 shadow-[0_0_12px_rgba(0,255,65,0.25)]'
              : isLight
              ? 'text-gray-600 hover:text-gray-900 border border-transparent'
              : 'text-[#E5E7EB]/60 hover:text-[#E5E7EB] border border-transparent'
          }`}
        >
          <Blocks className="h-3.5 w-3.5" />
          <span>Blockchain Proof & Wallets ({incident.detectedCryptoWallets?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('raw')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all uppercase tracking-wider ${
            activeTab === 'raw'
              ? isLight
                ? 'bg-white text-gray-900 border border-gray-300 shadow-sm'
                : 'bg-[#1F2937] text-[#00FF41] border border-[#00FF41]/40 shadow-[0_0_12px_rgba(0,255,65,0.25)]'
              : isLight
              ? 'text-gray-600 hover:text-gray-900 border border-transparent'
              : 'text-[#E5E7EB]/60 hover:text-[#E5E7EB] border border-transparent'
          }`}
        >
          <FileCode className="h-3.5 w-3.5" />
          <span>Decoded Body & Payload</span>
        </button>
      </div>

      {/* Active Tab Content */}
      <div className="pt-2">
        {activeTab === 'protocols' && (
          <HeaderForensicsTab
            protocols={incident.protocols}
            rawHeaders={incident.rawHeaders}
            theme={theme}
          />
        )}

        {activeTab === 'hops' && <RelayHopTrace hops={incident.relayHops} theme={theme} />}

        {activeTab === 'geo' && (
          <GeoIntelTab
            originGeo={incident.originatingGeo}
            domainIntel={incident.domainIntel}
            incident={incident}
            theme={theme}
          />
        )}

        {activeTab === 'nlp' && (
          <NlpAnalysisTab
            nlp={incident.nlpAnalysis}
            urls={incident.urls}
            attachments={incident.attachments}
            incident={incident}
            onRunAiAnalysis={handleRunAi}
            aiLoading={aiLoading}
            aiResponse={aiResponse}
            theme={theme}
          />
        )}

        {activeTab === 'attribution' && (
          <AttributionGraph
            attribution={incident.attribution}
            incident={incident}
            theme={theme}
          />
        )}

        {activeTab === 'blockchain' && (
          <BlockchainForensicsTab
            incident={incident}
            theme={theme}
          />
        )}

        {activeTab === 'raw' && (
          <div className={`rounded-2xl border p-4 space-y-4 font-mono text-xs shadow-xs transition-colors ${
            isLight ? 'bg-white border-gray-200 shadow-sm' : 'border-[#1F2937] bg-[#000000]'
          }`}>
            <div className={`flex items-center justify-between border-b pb-3 ${
              isLight ? 'border-gray-200' : 'border-[#1F2937]'
            }`}>
              <span className={`font-bold uppercase tracking-widest text-[10px] ${
                isLight ? 'text-gray-900' : 'text-[#E5E7EB]'
              }`}>
                Sanitized Email Plaintext Payload Content
              </span>
              <span className={`text-[10px] uppercase font-mono ${
                isLight ? 'text-gray-500' : 'text-[#E5E7EB]/50'
              }`}>
                {maskPii ? 'PII Compliance Active (Redacted)' : 'Raw Unmasked Mode'}
              </span>
            </div>

            <div className={`p-4 rounded-xl border whitespace-pre-wrap leading-relaxed ${
              isLight
                ? 'bg-gray-50 border-gray-200 text-gray-800'
                : 'bg-[#1F2937]/40 border-[#1F2937] text-[#E5E7EB]'
            }`}>
              {maskText(incident.bodyText)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
