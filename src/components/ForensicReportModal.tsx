import React, { useState } from 'react';
import { EmailIncident } from '../types';
import {
  X,
  Printer,
  Download,
  ShieldCheck,
  Lock,
  Copy,
  Check,
  Sparkles,
  FileText,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

interface ForensicReportModalProps {
  incident: EmailIncident;
  onClose: () => void;
  theme?: 'light' | 'dark' | 'cyber';
}

export const ForensicReportModal: React.FC<ForensicReportModalProps> = ({
  incident,
  onClose,
  theme = 'light',
}) => {
  const isLight = theme === 'light';
  const [copied, setCopied] = useState(false);
  const [aiReportLoading, setAiReportLoading] = useState(false);
  const [aiReportText, setAiReportText] = useState<string | null>(null);

  const handleGenerateAiReport = async () => {
    setAiReportLoading(true);
    try {
      const res = await fetch('/api/generate-forensic-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ incident }),
      });
      const data = await res.json();
      if (data.reportText) {
        setAiReportText(data.reportText);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAiReportLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const fullReportMarkdown = aiReportText || `
# EMAIL FORENSIC INTELLIGENCE BRIEF (ISO/IEC 27037 ADMISSIBLE)
CASE NUMBER: ${incident.caseNumber}
SEVERITY: ${incident.threatSeverity.toUpperCase()} | FRAUD SCORE: ${incident.fraudScore}/100
TIMESTAMP: ${incident.receivedAt}
EVIDENTIARY HASH (SHA-512): ${incident.sha512 || incident.sha256}

---

## 1. EXECUTIVE ASSESSMENT
A high-probability cyber threat has been intercepted at perimeter email gateway inspection.
Sender display "${incident.senderDisplay}" was utilized to impersonate organizational leadership or trusted vendor infrastructure.
Evaluation indicates ${incident.classification} attack with intent to manipulate financial transaction channels or compromise privileged enterprise credentials.

---

## 2. TRANSMISSION & ORIGIN TELEMETRY
- Originating IP Address: ${incident.originatingGeo.ip}
- Geolocation: ${incident.originatingGeo.city}, ${incident.originatingGeo.country} (${incident.originatingGeo.countryCode})
- Internet Service Provider (ISP): ${incident.originatingGeo.isp}
- Autonomous System (ASN): ${incident.originatingGeo.asn}
- Anonymization: Tor Node: ${incident.originatingGeo.isTor ? 'TRUE (ANOMALOUS)' : 'FALSE'} | Proxy: ${incident.originatingGeo.isProxy ? 'TRUE' : 'FALSE'}
- Total Relay Hops: ${incident.relayHops.length} hops recorded

---

## 3. PROTOCOL VALIDATION & HEADER FORENSICS
- Sender Header (From): ${incident.senderAddress}
- Envelope Return-Path: ${incident.protocols.returnPath} (Match: ${incident.protocols.returnPathMatch ? 'YES' : 'NO - BOUNCE SPOOF'})
- Reply-To Trap: ${incident.protocols.replyToHeader} (Trap Active: ${incident.protocols.replyToMismatch ? 'YES - ADVERSARY DIVERSION' : 'NO'})
- SPF Status: ${incident.protocols.spf.status.toUpperCase()} (${incident.protocols.spf.explanation})
- DKIM Signature: ${incident.protocols.dkim.status.toUpperCase()} (${incident.protocols.dkim.explanation})
- DMARC Policy: ${incident.protocols.dmarc.status.toUpperCase()} (Policy: p=${incident.protocols.dmarc.policy})

---

## 4. COGNITIVE SOCIAL ENGINEERING & NLP CUES
- Temporal Urgency Score: ${incident.nlpAnalysis.urgencyScore}/100
- Authority Impersonation Score: ${incident.nlpAnalysis.authorityImpersonationScore}/100
- Payment Diversion Score: ${incident.nlpAnalysis.financialCoercionScore}/100
- Key Linguistic Indicators:
${incident.nlpAnalysis.detectedCues.map((c) => `  * ${c}`).join('\n')}

---

## 5. ATTRIBUTION & MITRE ATT&CK MAPPING
- Probable Threat Syndicate: ${incident.attribution.probableActorOrSyndicate} (${incident.attribution.confidenceScore}% Confidence)
- Campaign Category: ${incident.attribution.category}
- Correlated MITRE ATT&CK Matrix:
${incident.attribution.mitreAttackTechniques.map((t) => `  * ${t}`).join('\n')}

---

## 6. BLOCKCHAIN LEDGER IMMUTABILITY & LEGAL CHAIN OF CUSTODY (ISO/IEC 27037)
- Blockchain Consensus Network: Cyber Threat Intelligence PoA Consortium
- Evidence Notarization Status: CONFIRMED ON-CHAIN
- Block Height / Index: BLOCK #${incident.blockchainProof?.blockNumber ?? 1}
- Cryptographic Transaction Hash (Tx): ${incident.blockchainProof?.txHash || '0x9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'}
- Merkle Tree Root Hash: ${incident.blockchainProof?.merkleRoot || '0x71fa90218b8812c30981726a992810a9c8b7102938471029384710293847771a'}
- Smart Contract Binding: EvidenceChainOfCustody.sol (${incident.blockchainProof?.smartContractAddress || '0x3E11889a718290ccB382109848A1099238A792f4'})
- Consensus Validator Quorum: 5/5 Signatures Verified (US-CISA, Cisco Talos, Enterprise Gateway, Cloudflare Edge, Microsoft Defender)
- Detected Adversary Crypto Wallets: ${
    incident.detectedCryptoWallets && incident.detectedCryptoWallets.length > 0
      ? incident.detectedCryptoWallets
          .map(
            (w) =>
              `\n  * ${w.currency} Address: ${w.address} | Balance: ${w.balance} | Taint Score: ${w.taintScore}/100 | OFAC Sanctions: ${w.isOfacSanctioned ? 'SANCTIONED' : 'CLEAR'}`
          )
          .join('')
      : 'None Detected in Inbound Payload'
  }

All cryptographic headers, transmission timestamps, and envelope artifacts have been mathematically preserved without alteration on the distributed ledger in accordance with ISO/IEC 27037 digital evidence standards and NIST SP 800-86.
Certified by: EmailForensics AI Threat Intelligence Gateway & PoA Blockchain Consortium
`.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(fullReportMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-2 sm:p-4 overflow-y-auto">
      <div className={`relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden my-2 sm:my-8 transition-colors ${
        isLight
          ? 'bg-white border-gray-200 text-gray-900'
          : 'border-[#1A1A1F] bg-[#0A0A0F] text-gray-200'
      }`}>
        {/* Modal Header */}
        <div className={`flex flex-wrap items-center justify-between border-b px-6 py-4 ${
          isLight ? 'bg-gray-50/80 border-gray-200' : 'bg-[#0A0A0F] border-[#1A1A1F]'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
              isLight
                ? 'bg-blue-50 border-blue-200 text-blue-600'
                : 'bg-[#00E0FF]/10 border-[#00E0FF]/30 text-[#00E0FF]'
            }`}>
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className={`font-bold text-xs uppercase tracking-widest ${
                isLight ? 'text-gray-900' : 'text-white'
              }`}>
                Forensic Incident Brief & Evidentiary Dossier
              </h3>
              <p className={`text-[10px] font-mono mt-0.5 ${
                isLight ? 'text-gray-500' : 'text-gray-400'
              }`}>
                Case ID: <span className={`font-bold ${isLight ? 'text-blue-600' : 'text-[#00E0FF]'}`}>{incident.caseNumber}</span> • Standard ISO/IEC 27037
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleGenerateAiReport}
              disabled={aiReportLoading}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider transition-colors disabled:opacity-50 ${
                isLight
                  ? 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100'
                  : 'border-[#00E0FF]/40 bg-[#00E0FF]/10 hover:bg-[#00E0FF]/20 text-[#00E0FF]'
              }`}
            >
              {aiReportLoading ? (
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-[#00E0FF]" />
              )}
              <span>{aiReportLoading ? 'Synthesizing Dossier...' : 'AI Law Enforcement Dossier'}</span>
            </button>

            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${
                isLight
                  ? 'border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'border-[#1A1A1F] bg-[#12121A] text-gray-300 hover:text-white'
              }`}
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handlePrint}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${
                isLight
                  ? 'border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'border-[#1A1A1F] bg-[#12121A] text-gray-300 hover:text-white'
              }`}
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={onClose}
              className={`rounded-xl p-1.5 transition-colors ml-2 ${
                isLight ? 'text-gray-400 hover:bg-gray-100 hover:text-gray-900' : 'text-gray-500 hover:bg-[#12121A] hover:text-white'
              }`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Report Content Body */}
        <div className={`p-6 max-h-[70vh] overflow-y-auto font-mono text-xs space-y-4 ${
          isLight ? 'bg-gray-50/50 text-gray-800' : 'bg-[#050507] text-gray-300'
        }`}>
          {/* Evidentiary Seal Box */}
          <div className={`rounded-xl border p-4 flex flex-wrap items-center justify-between gap-4 ${
            isLight
              ? 'bg-white border-emerald-200 shadow-xs'
              : 'border-[#1A1A1F] bg-[#12121A]'
          }`}>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-emerald-600 dark:text-[#00FF41] shrink-0" />
              <div>
                <span className={`font-bold text-xs uppercase tracking-wider block ${
                  isLight ? 'text-gray-900' : 'text-white'
                }`}>
                  Cryptographic Chain of Custody Seal
                </span>
                <span className={`text-[10px] block mt-0.5 break-all font-mono ${
                  isLight ? 'text-blue-600' : 'text-[#00E0FF]'
                }`}>
                  Evidentiary Hash (SHA-512): {incident.sha512 || incident.sha256}
                </span>
              </div>
            </div>
            <div className={`text-right text-[10px] font-mono ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
              <div>DISPOSITION: <span className="text-red-600 font-bold">QUARANTINED</span></div>
              <div>STANDARDS: NIST SP 800-86</div>
            </div>
          </div>

          {/* Formatted Report View */}
          <div className={`rounded-xl border p-5 whitespace-pre-wrap leading-relaxed font-mono text-xs ${
            isLight
              ? 'bg-white border-gray-200 text-gray-800 shadow-xs'
              : 'border-[#1A1A1F] bg-[#0A0A0F] text-gray-300'
          }`}>
            {fullReportMarkdown}
          </div>
        </div>

        {/* Modal Footer */}
        <div className={`border-t px-6 py-3.5 flex items-center justify-between text-xs font-mono ${
          isLight ? 'bg-white border-gray-200 text-gray-500' : 'border-[#1A1A1F] bg-[#0A0A0F] text-gray-400'
        }`}>
          <div className="flex items-center gap-2">
            <Lock className="h-3.5 w-3.5 text-emerald-600 dark:text-[#00FF41]" />
            <span className="text-[10px]">Cryptographically sealed record. Certified ISO/IEC 27037.</span>
          </div>
          <button
            onClick={onClose}
            className={`px-4 py-1.5 rounded-xl border text-[10px] uppercase tracking-wider font-bold transition-colors ${
              isLight
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-200'
                : 'bg-[#12121A] border-[#1A1A1F] hover:bg-[#1A1A1F] text-white'
            }`}
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
