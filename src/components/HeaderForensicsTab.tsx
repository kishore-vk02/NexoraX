import React, { useState } from 'react';
import { ProtocolForensics } from '../types';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lock,
  Mail,
  FileCode,
  Copy,
  Check,
  Search,
  KeyRound,
  ShieldCheck,
  ShieldAlert,
} from 'lucide-react';

interface HeaderForensicsTabProps {
  protocols: ProtocolForensics;
  rawHeaders: string;
  theme?: 'light' | 'dark' | 'cyber';
}

export const HeaderForensicsTab: React.FC<HeaderForensicsTabProps> = ({
  protocols,
  rawHeaders,
  theme = 'light',
}) => {
  const isLight = theme === 'light';
  const isCyber = theme === 'cyber';
  const [copied, setCopied] = useState(false);
  const [headerSearch, setHeaderSearch] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(rawHeaders);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredLines = rawHeaders.split(/\r?\n/).filter((l) =>
    headerSearch ? l.toLowerCase().includes(headerSearch.toLowerCase()) : true
  );

  return (
    <div className="space-y-6">
      {/* 3 Core Authentication Protocols Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* SPF Card */}
        <div className={`rounded-2xl border p-4 shadow-xs space-y-3 transition-colors ${
          isLight ? 'bg-white border-gray-200 shadow-sm' : 'border-[#1F2937] bg-[#1F2937]/30'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <KeyRound
                className={`h-4 w-4 ${
                  protocols.spf.status === 'pass'
                    ? 'text-emerald-600 dark:text-[#00FF41]'
                    : 'text-red-600 dark:text-[#FF3D00]'
                }`}
              />
              <span className={`font-mono font-bold text-xs uppercase tracking-wider ${
                isLight ? 'text-gray-900' : 'text-[#E5E7EB]'
              }`}>SPF Check</span>
            </div>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase ${
                protocols.spf.status === 'pass'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-[#00FF41]/10 dark:text-[#00FF41] dark:border-[#00FF41]/30'
                  : 'bg-red-100 text-red-800 border border-red-300 dark:bg-[#FF3D00]/10 dark:text-[#FF3D00] dark:border-[#FF3D00]/30'
              }`}
            >
              {protocols.spf.status}
            </span>
          </div>

          <p className={`text-xs leading-relaxed font-sans ${
            isLight ? 'text-gray-600' : 'text-[#E5E7EB]/80'
          }`}>
            {protocols.spf.explanation}
          </p>

          <div className={`space-y-1.5 text-[10px] font-mono border-t pt-2.5 ${
            isLight ? 'border-gray-100' : 'border-[#1F2937]'
          }`}>
            <div className="flex justify-between">
              <span className={isLight ? 'text-gray-500' : 'text-[#E5E7EB]/60'}>Sender IP:</span>
              <span className={`font-semibold ${isLight ? 'text-emerald-700' : 'text-[#00FF41]'}`}>{protocols.spf.clientIp}</span>
            </div>
            <div className="flex justify-between">
              <span className={isLight ? 'text-gray-500' : 'text-[#E5E7EB]/60'}>Domain:</span>
              <span className={`truncate max-w-[140px] font-semibold ${isLight ? 'text-gray-800' : 'text-[#E5E7EB]/80'}`}>{protocols.spf.domain}</span>
            </div>
            <div className="flex justify-between">
              <span className={isLight ? 'text-gray-500' : 'text-[#E5E7EB]/60'}>Record:</span>
              <span className={`truncate max-w-[140px] ${isLight ? 'text-gray-500' : 'text-[#E5E7EB]/60'}`}>{protocols.spf.record}</span>
            </div>
          </div>
        </div>

        {/* DKIM Card */}
        <div className={`rounded-2xl border p-4 shadow-xs space-y-3 transition-colors ${
          isLight ? 'bg-white border-gray-200 shadow-sm' : 'border-[#1F2937] bg-[#1F2937]/30'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck
                className={`h-4 w-4 ${
                  protocols.dkim.status === 'pass'
                    ? 'text-emerald-600 dark:text-[#00FF41]'
                    : 'text-red-600 dark:text-[#FF3D00]'
                }`}
              />
              <span className={`font-mono font-bold text-xs uppercase tracking-wider ${
                isLight ? 'text-gray-900' : 'text-[#E5E7EB]'
              }`}>DKIM Signature</span>
            </div>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase ${
                protocols.dkim.status === 'pass'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-[#00FF41]/10 dark:text-[#00FF41] dark:border-[#00FF41]/30'
                  : 'bg-red-100 text-red-800 border border-red-300 dark:bg-[#FF3D00]/10 dark:text-[#FF3D00] dark:border-[#FF3D00]/30'
              }`}
            >
              {protocols.dkim.status}
            </span>
          </div>

          <p className={`text-xs leading-relaxed font-sans ${
            isLight ? 'text-gray-600' : 'text-[#E5E7EB]/80'
          }`}>
            {protocols.dkim.explanation}
          </p>

          <div className={`space-y-1.5 text-[10px] font-mono border-t pt-2.5 ${
            isLight ? 'border-gray-100' : 'border-[#1F2937]'
          }`}>
            <div className="flex justify-between">
              <span className={isLight ? 'text-gray-500' : 'text-[#E5E7EB]/60'}>Selector:</span>
              <span className={`font-semibold ${isLight ? 'text-gray-800' : 'text-[#E5E7EB]/80'}`}>{protocols.dkim.selector}</span>
            </div>
            <div className="flex justify-between">
              <span className={isLight ? 'text-gray-500' : 'text-[#E5E7EB]/60'}>Header Signature:</span>
              <span className={`font-semibold ${
                protocols.dkim.signatureHeaderValid
                  ? 'text-emerald-600 dark:text-[#00FF41]'
                  : 'text-red-600 dark:text-[#FF3D00]'
              }`}>
                {protocols.dkim.signatureHeaderValid ? 'Valid Cryptographic' : 'Corrupt / Forged'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={isLight ? 'text-gray-500' : 'text-[#E5E7EB]/60'}>Domain Alignment:</span>
              <span className={`font-semibold ${
                protocols.dkim.aligned
                  ? 'text-emerald-600 dark:text-[#00FF41]'
                  : 'text-red-600 dark:text-[#FF3D00]'
              }`}>
                {protocols.dkim.aligned ? 'Aligned' : 'Unaligned'}
              </span>
            </div>
          </div>
        </div>

        {/* DMARC Card */}
        <div className={`rounded-2xl border p-4 shadow-xs space-y-3 transition-colors ${
          isLight ? 'bg-white border-gray-200 shadow-sm' : 'border-[#1F2937] bg-[#1F2937]/30'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert
                className={`h-4 w-4 ${
                  protocols.dmarc.status === 'pass'
                    ? 'text-emerald-600 dark:text-[#00FF41]'
                    : 'text-red-600 dark:text-[#FF3D00]'
                }`}
              />
              <span className={`font-mono font-bold text-xs uppercase tracking-wider ${
                isLight ? 'text-gray-900' : 'text-[#E5E7EB]'
              }`}>DMARC Policy</span>
            </div>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase ${
                protocols.dmarc.status === 'pass'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-[#00FF41]/10 dark:text-[#00FF41] dark:border-[#00FF41]/30'
                  : 'bg-red-100 text-red-800 border border-red-300 dark:bg-[#FF3D00]/10 dark:text-[#FF3D00] dark:border-[#FF3D00]/30'
              }`}
            >
              {protocols.dmarc.status}
            </span>
          </div>

          <p className={`text-xs leading-relaxed font-sans ${
            isLight ? 'text-gray-600' : 'text-[#E5E7EB]/80'
          }`}>
            {protocols.dmarc.explanation}
          </p>

          <div className={`space-y-1.5 text-[10px] font-mono border-t pt-2.5 ${
            isLight ? 'border-gray-100' : 'border-[#1F2937]'
          }`}>
            <div className="flex justify-between">
              <span className={isLight ? 'text-gray-500' : 'text-[#E5E7EB]/60'}>Configured Policy:</span>
              <span className="text-emerald-600 dark:text-[#00FF41] font-bold uppercase">p={protocols.dmarc.policy}</span>
            </div>
            <div className="flex justify-between">
              <span className={isLight ? 'text-gray-500' : 'text-[#E5E7EB]/60'}>Disposition:</span>
              <span className={`uppercase font-semibold ${isLight ? 'text-gray-800' : 'text-[#E5E7EB]/80'}`}>{protocols.dmarc.disposition}</span>
            </div>
            <div className="flex justify-between">
              <span className={isLight ? 'text-gray-500' : 'text-[#E5E7EB]/60'}>Identifier Alignment:</span>
              <span className={`font-semibold ${
                protocols.dmarc.alignment === 'aligned'
                  ? 'text-emerald-600 dark:text-[#00FF41]'
                  : 'text-red-600 dark:text-[#FF3D00]'
              }`}>
                {protocols.dmarc.alignment}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Header Fields & Anomalies Inspection Matrix */}
      <div className={`rounded-2xl border p-4 shadow-xs transition-colors ${
        isLight ? 'bg-white border-gray-200 shadow-sm' : 'border-[#1F2937] bg-[#000000]'
      }`}>
        <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 font-mono ${
          isLight ? 'text-gray-900' : 'text-[#E5E7EB]'
        }`}>
          <Mail className="h-4 w-4 text-emerald-600 dark:text-[#00FF41]" />
          Transmission Envelope & Field Anomaly Audit
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Field 1: Return-Path vs From */}
          <div className={`rounded-xl border p-3.5 space-y-2 transition-colors ${
            isLight ? 'bg-gray-50 border-gray-200' : 'border-[#1F2937] bg-[#1F2937]/40'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-mono font-semibold ${isLight ? 'text-gray-900' : 'text-[#E5E7EB]'}`}>Return-Path vs From Alignment</span>
              {protocols.returnPathMatch ? (
                <span className="flex items-center text-[10px] font-mono text-emerald-600 dark:text-[#00FF41] font-bold">
                  <Check className="h-3 w-3 mr-1" /> Aligned
                </span>
              ) : (
                <span className="flex items-center text-[10px] font-mono text-red-600 dark:text-[#FF3D00] font-bold">
                  <AlertTriangle className="h-3 w-3 mr-1" /> Mismatch / Bounce Diverted
                </span>
              )}
            </div>
            <div className={`text-[10px] font-mono space-y-1 ${isLight ? 'text-gray-600' : 'text-[#E5E7EB]/60'}`}>
              <div>From: <span className={`font-medium ${isLight ? 'text-gray-900' : 'text-[#E5E7EB]'}`}>{protocols.fromHeader}</span></div>
              <div>Return-Path: <span className={protocols.returnPathMatch ? isLight ? 'text-gray-900' : 'text-[#E5E7EB]' : 'text-red-600 dark:text-[#FF3D00] font-semibold'}>{protocols.returnPath}</span></div>
            </div>
          </div>

          {/* Field 2: Reply-To Trap Check */}
          <div className={`rounded-xl border p-3.5 space-y-2 transition-colors ${
            isLight ? 'bg-gray-50 border-gray-200' : 'border-[#1F2937] bg-[#1F2937]/40'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-mono font-semibold ${isLight ? 'text-gray-900' : 'text-[#E5E7EB]'}`}>Reply-To Routing Trap</span>
              {protocols.replyToMismatch ? (
                <span className="flex items-center text-[10px] font-mono text-red-600 dark:text-[#FF3D00] font-bold animate-pulse">
                  <AlertTriangle className="h-3 w-3 mr-1" /> Exfiltration Trap Detected
                </span>
              ) : (
                <span className="flex items-center text-[10px] font-mono text-emerald-600 dark:text-[#00FF41] font-bold">
                  <Check className="h-3 w-3 mr-1" /> Identical
                </span>
              )}
            </div>
            <div className={`text-[10px] font-mono space-y-1 ${isLight ? 'text-gray-600' : 'text-[#E5E7EB]/60'}`}>
              <div>Reply-To: <span className={protocols.replyToMismatch ? 'text-red-600 dark:text-[#FF3D00] font-bold' : isLight ? 'text-gray-900' : 'text-[#E5E7EB]'}>{protocols.replyToHeader}</span></div>
              <p className={`text-[9px] leading-tight ${isLight ? 'text-gray-500' : 'text-[#E5E7EB]/40'}`}>
                {protocols.replyToMismatch
                  ? 'User responses are redirected to an external adversary mailbox instead of the apparent sender.'
                  : 'Replies route back to the verified originating sender.'}
              </p>
            </div>
          </div>

          {/* Field 3: Message-ID Integrity */}
          <div className={`rounded-xl border p-3.5 space-y-2 transition-colors ${
            isLight ? 'bg-gray-50 border-gray-200' : 'border-[#1F2937] bg-[#1F2937]/40'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-mono font-semibold ${isLight ? 'text-gray-900' : 'text-[#E5E7EB]'}`}>Message-ID Structural Integrity</span>
              {protocols.messageIdAnomaly ? (
                <span className="flex items-center text-[10px] font-mono text-red-600 dark:text-[#FF3D00] font-bold">
                  <AlertTriangle className="h-3 w-3 mr-1" /> Forged / Synthetic Client
                </span>
              ) : (
                <span className="flex items-center text-[10px] font-mono text-emerald-600 dark:text-[#00FF41] font-bold">
                  <Check className="h-3 w-3 mr-1" /> Standard FQDN Structure
                </span>
              )}
            </div>
            <div className={`text-[10px] font-mono break-all ${isLight ? 'text-gray-700' : 'text-[#E5E7EB]/60'}`}>
              <span className={isLight ? 'text-gray-900 font-medium' : 'text-[#E5E7EB]'}>{protocols.messageId}</span>
            </div>
          </div>

          {/* Field 4: TLS Cipher & Encryption */}
          <div className={`rounded-xl border p-3.5 space-y-2 transition-colors ${
            isLight ? 'bg-gray-50 border-gray-200' : 'border-[#1F2937] bg-[#1F2937]/40'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-mono font-semibold ${isLight ? 'text-gray-900' : 'text-[#E5E7EB]'}`}>Transport Security (TLS)</span>
              <span className="flex items-center text-[10px] font-mono text-emerald-600 dark:text-[#00FF41] font-bold">
                <Lock className="h-3 w-3 mr-1" /> {protocols.tlsVersion}
              </span>
            </div>
            <div className={`text-[10px] font-mono space-y-1 ${isLight ? 'text-gray-600' : 'text-[#E5E7EB]/60'}`}>
              <div>Cipher: <span className={isLight ? 'text-gray-900 font-medium' : 'text-[#E5E7EB]'}>{protocols.cipherSuite}</span></div>
              <div className={`text-[9px] ${isLight ? 'text-gray-500' : 'text-[#E5E7EB]/40'}`}>
                {protocols.tlsVersion.includes('Outdated')
                  ? 'Warning: Outdated TLS negotiation allows adversary MITM eavesdropping.'
                  : 'Standard transport layer encryption active.'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Raw Headers Viewer */}
      <div className={`rounded-2xl border overflow-hidden shadow-xs transition-colors ${
        isLight ? 'bg-white border-gray-200 shadow-sm' : 'border-[#1F2937] bg-[#000000]'
      }`}>
        <div className={`flex flex-wrap items-center justify-between border-b px-4 py-3 ${
          isLight ? 'bg-gray-50 border-gray-200' : 'border-[#1F2937] bg-[#1F2937]/40'
        }`}>
          <div className="flex items-center gap-2">
            <FileCode className="h-4 w-4 text-emerald-600 dark:text-[#00FF41]" />
            <span className={`text-xs font-bold uppercase tracking-widest font-mono ${
              isLight ? 'text-gray-900' : 'text-[#E5E7EB]'
            }`}>
              Raw RFC 822 Email Headers Stream
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className={`absolute left-2.5 top-2 h-3.5 w-3.5 ${isLight ? 'text-gray-400' : 'text-[#E5E7EB]/50'}`} />
              <input
                type="text"
                placeholder="Filter header keys..."
                value={headerSearch}
                onChange={(e) => setHeaderSearch(e.target.value)}
                className={`rounded-xl border pl-8 pr-3 py-1.5 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isLight
                    ? 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'
                    : 'border-[#1F2937] bg-[#000000] text-[#E5E7EB] placeholder-[#E5E7EB]/40'
                }`}
              />
            </div>

            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-mono transition-colors ${
                isLight
                  ? 'border-gray-300 bg-white hover:bg-gray-100 text-gray-700'
                  : 'border-[#1F2937] bg-[#1F2937] text-[#E5E7EB] hover:text-[#00FF41] hover:border-[#00FF41]/40'
              }`}
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-[#00FF41]" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Headers'}</span>
            </button>
          </div>
        </div>

        <div className={`p-4 max-h-[380px] overflow-y-auto font-mono text-xs leading-relaxed divide-y ${
          isLight
            ? 'bg-white divide-gray-100 text-gray-700'
            : 'bg-[#000000] divide-[#1F2937] text-[#E5E7EB]/80'
        }`}>
          {filteredLines.map((line, idx) => {
            const isColon = line.indexOf(':');
            const key = isColon > -1 ? line.substring(0, isColon) : '';
            const val = isColon > -1 ? line.substring(isColon + 1) : line;
            const isCriticalHeader = /received|from|return-path|authentication-results|dkim|spf/i.test(key);

            return (
              <div key={idx} className={`py-1 px-1 rounded-sm transition-colors flex gap-2 ${
                isLight ? 'hover:bg-gray-50' : 'hover:bg-[#1F2937]/30'
              }`}>
                {key ? (
                  <>
                    <span className={`font-semibold shrink-0 select-none ${
                      isCriticalHeader
                        ? isLight ? 'text-blue-700' : 'text-[#00FF41]'
                        : isLight ? 'text-gray-500' : 'text-[#E5E7EB]/50'
                    }`}>
                      {key}:
                    </span>
                    <span className={`break-all ${isLight ? 'text-gray-800' : 'text-[#E5E7EB]/80'}`}>{val}</span>
                  </>
                ) : (
                  <span className={`pl-4 break-all ${isLight ? 'text-gray-500' : 'text-[#E5E7EB]/50'}`}>{line}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
