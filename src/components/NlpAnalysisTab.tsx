import React, { useState } from 'react';
import { SocialEngineeringAnalysis, ExtractedUrl, ExtractedAttachment, EmailIncident } from '../types';
import {
  Brain,
  Zap,
  AlertOctagon,
  DollarSign,
  UserCheck,
  Link,
  Paperclip,
  ShieldAlert,
  Sparkles,
  RefreshCw,
  Clock,
} from 'lucide-react';

interface NlpAnalysisTabProps {
  nlp: SocialEngineeringAnalysis;
  urls: ExtractedUrl[];
  attachments: ExtractedAttachment[];
  incident: EmailIncident;
  onRunAiAnalysis?: () => void;
  aiLoading?: boolean;
  aiResponse?: any;
  theme?: 'light' | 'dark' | 'cyber';
}

export const NlpAnalysisTab: React.FC<NlpAnalysisTabProps> = ({
  nlp,
  urls,
  attachments,
  incident,
  onRunAiAnalysis,
  aiLoading = false,
  aiResponse,
  theme = 'light',
}) => {
  const isLight = theme === 'light';
  const isCyber = theme === 'cyber';

  return (
    <div className="space-y-6 font-mono">
      {/* AI Cognitive Assistant Trigger Banner */}
      <div className={`rounded-2xl border p-4 shadow-xs transition-colors ${
        isLight ? 'bg-white border-gray-200 shadow-sm' : 'border-[#1A1A1F] bg-[#0A0A0F]'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
              isLight
                ? 'bg-blue-50 border-blue-200 text-blue-600'
                : 'bg-[#00E0FF]/10 border-[#00E0FF]/30 text-[#00E0FF]'
            }`}>
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className={`font-bold text-xs uppercase tracking-widest ${
                  isLight ? 'text-gray-900' : 'text-white'
                }`}>
                  Gemini Flash Cognitive Threat Hunter
                </h4>
                <span className="rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-[#00FF41]/10 dark:text-[#00FF41] dark:border-[#00FF41]/30 px-2 py-0.5 text-[9px] font-bold uppercase">
                  Active
                </span>
              </div>
              <p className={`text-[10px] font-sans mt-0.5 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                Evaluates behavioral NLP coercion, semantic impersonation, and payment diversion
              </p>
            </div>
          </div>

          <button
            onClick={onRunAiAnalysis}
            disabled={aiLoading}
            className={`flex items-center gap-2 rounded-xl font-bold px-4 py-2 text-xs transition-colors disabled:opacity-50 uppercase tracking-wider ${
              isLight
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                : 'bg-[#00E0FF] hover:bg-cyan-300 text-black shadow-[0_0_15px_rgba(0,224,255,0.3)]'
            }`}
          >
            {aiLoading ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span>Running AI Hunter...</span>
              </>
            ) : (
              <>
                <Brain className="h-3.5 w-3.5" />
                <span>Run Cognitive Assessment</span>
              </>
            )}
          </button>
        </div>

        {/* AI Output Response Card if available */}
        {aiResponse && (
          <div className={`mt-4 rounded-xl border p-3.5 text-xs space-y-2 ${
            isLight ? 'bg-gray-50 border-gray-200' : 'border-[#1A1A1F] bg-[#050507]'
          }`}>
            <div className={`flex items-center justify-between border-b pb-2 ${
              isLight ? 'border-gray-200' : 'border-[#1A1A1F]'
            }`}>
              <span className={`font-bold text-xs uppercase tracking-wider ${
                isLight ? 'text-blue-700' : 'text-[#00E0FF]'
              }`}>
                Gemini Forensic Synthesis:
              </span>
              <span className={`text-[10px] ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Model: gemini-flash</span>
            </div>
            <p className={`leading-relaxed font-sans text-xs ${isLight ? 'text-gray-800' : 'text-gray-200'}`}>
              {aiResponse.executiveSummary || aiResponse.summary}
            </p>
            {aiResponse.financialOrCredentialRisks && (
              <div className="text-red-600 dark:text-[#FF3D00] text-[11px]">
                <strong>Identified Exploits:</strong> {aiResponse.financialOrCredentialRisks}
              </div>
            )}
            {aiResponse.analystRecommendations && (
              <div className={`pt-2 border-t text-[11px] ${
                isLight ? 'border-gray-200 text-gray-700' : 'border-[#1A1A1F] text-gray-300'
              }`}>
                <span className={`font-semibold block mb-1 uppercase tracking-wider text-[10px] ${
                  isLight ? 'text-blue-700' : 'text-[#00E0FF]'
                }`}>
                  Analyst Playbook Actions:
                </span>
                <ul className="list-disc pl-4 space-y-1">
                  {aiResponse.analystRecommendations.map((rec: string, i: number) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4 Psychological Coercion Meters - Matches Design HTML Anomaly Detection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Urgency */}
        <div className={`h-36 border p-3.5 rounded-2xl shadow-xs flex flex-col justify-between transition-colors ${
          isLight ? 'bg-white border-gray-200 shadow-sm' : 'bg-[#0A0A0F] border-[#1A1A1F]'
        }`}>
          <div>
            <div className="flex justify-between text-[10px] mb-1.5 font-bold uppercase tracking-wider">
              <span className={isLight ? 'text-gray-600' : 'text-gray-400'}>Temporal Urgency</span>
              <span className="text-[#FF3D00] font-bold">{nlp.urgencyScore > 75 ? 'EXTREME' : 'MODERATE'}</span>
            </div>
            <div className={`w-full h-1.5 rounded-full overflow-hidden ${isLight ? 'bg-gray-100' : 'bg-[#1A1A1F]'}`}>
              <div
                className={`h-full rounded-full ${nlp.urgencyScore > 75 ? 'bg-[#FF3D00]' : 'bg-[#EAB308]'}`}
                style={{ width: `${nlp.urgencyScore}%` }}
              ></div>
            </div>
          </div>
          <p className={`text-[9px] font-sans leading-tight ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
            Strict deadlines and artificial countdown pressure to bypass authorization
          </p>
        </div>

        {/* Authority */}
        <div className={`h-36 border p-3.5 rounded-2xl shadow-xs flex flex-col justify-between transition-colors ${
          isLight ? 'bg-white border-gray-200 shadow-sm' : 'bg-[#0A0A0F] border-[#1A1A1F]'
        }`}>
          <div>
            <div className="flex justify-between text-[10px] mb-1.5 font-bold uppercase tracking-wider">
              <span className={isLight ? 'text-gray-600' : 'text-gray-400'}>Authority Impersonation</span>
              <span className="text-[#FF3D00] font-bold">{nlp.authorityImpersonationScore > 75 ? 'HIGH' : 'ELEVATED'}</span>
            </div>
            <div className={`w-full h-1.5 rounded-full overflow-hidden ${isLight ? 'bg-gray-100' : 'bg-[#1A1A1F]'}`}>
              <div
                className={`h-full rounded-full ${nlp.authorityImpersonationScore > 75 ? 'bg-[#FF3D00]' : 'bg-[#EAB308]'}`}
                style={{ width: `${nlp.authorityImpersonationScore}%` }}
              ></div>
            </div>
          </div>
          <p className={`text-[9px] font-sans leading-tight ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
            Executive or legal authority hierarchy impersonation to compel obedience
          </p>
        </div>

        {/* Payment Diversion */}
        <div className={`h-36 border p-3.5 rounded-2xl shadow-xs flex flex-col justify-between transition-colors ${
          isLight ? 'bg-white border-gray-200 shadow-sm' : 'bg-[#0A0A0F] border-[#1A1A1F]'
        }`}>
          <div>
            <div className="flex justify-between text-[10px] mb-1.5 font-bold uppercase tracking-wider">
              <span className={isLight ? 'text-gray-600' : 'text-gray-400'}>Payment Diversion</span>
              <span className={`font-bold ${isLight ? 'text-blue-600' : 'text-blue-400'}`}>{nlp.financialCoercionScore > 75 ? 'HOSTILE' : 'NORMAL'}</span>
            </div>
            <div className={`w-full h-1.5 rounded-full overflow-hidden ${isLight ? 'bg-gray-100' : 'bg-[#1A1A1F]'}`}>
              <div
                className={`h-full rounded-full ${nlp.financialCoercionScore > 75 ? 'bg-blue-500' : 'bg-gray-400'}`}
                style={{ width: `${nlp.financialCoercionScore}%` }}
              ></div>
            </div>
          </div>
          <p className={`text-[9px] font-sans leading-tight ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
            Direct wire transfer or altered payee banking routing diversion
          </p>
        </div>

        {/* Fear / Consequence */}
        <div className={`h-36 border p-3.5 rounded-2xl shadow-xs flex flex-col justify-between transition-colors ${
          isLight ? 'bg-white border-gray-200 shadow-sm' : 'bg-[#0A0A0F] border-[#1A1A1F]'
        }`}>
          <div>
            <div className="flex justify-between text-[10px] mb-1.5 font-bold uppercase tracking-wider">
              <span className={isLight ? 'text-gray-600' : 'text-gray-400'}>Social Engineering</span>
              <span className="text-[#FF3D00] font-bold">{nlp.fearPressureScore > 75 ? 'CRITICAL' : 'MILD'}</span>
            </div>
            <div className={`w-full h-1.5 rounded-full overflow-hidden ${isLight ? 'bg-gray-100' : 'bg-[#1A1A1F]'}`}>
              <div
                className={`h-full rounded-full ${nlp.fearPressureScore > 75 ? 'bg-[#FF3D00]' : 'bg-[#EAB308]'}`}
                style={{ width: `${nlp.fearPressureScore}%` }}
              ></div>
            </div>
          </div>
          <p className={`text-[9px] font-sans leading-tight ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
            Threats of termination, credential revocation, or legal exposure
          </p>
        </div>
      </div>

      {/* Detected Linguistic & Social Engineering Cues */}
      <div className={`rounded-2xl border p-4 shadow-xs transition-colors ${
        isLight ? 'bg-white border-gray-200 shadow-sm' : 'border-[#1A1A1F] bg-[#0A0A0F]'
      }`}>
        <h4 className={`text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2 ${
          isLight ? 'text-gray-900' : 'text-white'
        }`}>
          <Zap className="h-4 w-4 text-[#EAB308]" />
          NLP Social Engineering & Manipulation Patterns Extracted
        </h4>

        <div className="space-y-2">
          {nlp.detectedCues.map((cue, idx) => (
            <div
              key={`cue-${idx}`}
              className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs ${
                isLight ? 'border-gray-200 bg-gray-50 text-gray-800' : 'border-[#1A1A1F] bg-[#12121A] text-gray-200'
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF3D00] shrink-0 mt-1.5 shadow-[0_0_4px_#FF3D00]"></span>
              <span>{cue}</span>
            </div>
          ))}
        </div>

        {/* Payment Diversion Callout */}
        {nlp.paymentDiversionDetails && (
          <div className={`mt-4 rounded-xl border p-3.5 text-xs ${
            isLight
              ? 'border-red-200 bg-red-50/50'
              : 'border-[#FF3D00]/30 bg-[#FF3D00]/5'
          }`}>
            <div className="flex items-center gap-2 text-red-600 dark:text-[#FF3D00] font-bold mb-2 uppercase tracking-wider text-[10px]">
              <DollarSign className="h-4 w-4" />
              <span>Extracted Wire Fraud / Diversion Parameters</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <span className={`block text-[9px] uppercase tracking-wider ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Requested Amount:</span>
                <span className={`font-bold text-xs ${isLight ? 'text-gray-900' : 'text-white'}`}>{nlp.paymentDiversionDetails.requestedAmount}</span>
              </div>
              <div>
                <span className={`block text-[9px] uppercase tracking-wider ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Target Financial Institution:</span>
                <span className="font-semibold text-red-600 dark:text-[#FF3D00] text-xs">{nlp.paymentDiversionDetails.bankName}</span>
              </div>
              <div>
                <span className={`block text-[9px] uppercase tracking-wider ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Beneficiary / Account Reference:</span>
                <span className={`break-all text-xs ${isLight ? 'text-gray-800 font-mono' : 'text-gray-200'}`}>{nlp.paymentDiversionDetails.accountReference}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Extracted URLs & Attachment Forensics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* URLs */}
        <div className={`rounded-2xl border p-4 space-y-3 shadow-xs transition-colors ${
          isLight ? 'bg-white border-gray-200 shadow-sm' : 'border-[#1A1A1F] bg-[#0A0A0F]'
        }`}>
          <div className={`flex items-center justify-between border-b pb-2 ${
            isLight ? 'border-gray-100' : 'border-[#1A1A1F]'
          }`}>
            <h4 className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${
              isLight ? 'text-gray-900' : 'text-white'
            }`}>
              <Link className={`h-4 w-4 ${isLight ? 'text-blue-600' : 'text-[#00E0FF]'}`} />
              Extracted Hyperlinks & Redirects ({urls.length})
            </h4>
          </div>

          {urls.length === 0 ? (
            <p className={`text-xs py-4 text-center ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>
              No outbound URLs detected in message body.
            </p>
          ) : (
            <div className="space-y-2">
              {urls.map((u, i) => (
                <div key={i} className={`rounded-xl border p-3 text-xs space-y-1.5 ${
                  isLight ? 'border-gray-200 bg-gray-50' : 'border-[#1A1A1F] bg-[#12121A]'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-red-600 dark:text-[#FF3D00] font-semibold truncate max-w-[220px]">
                      {u.domain}
                    </span>
                    <span className="rounded-md bg-red-100 text-red-800 border border-red-200 dark:bg-[#FF3D00]/10 dark:text-[#FF3D00] dark:border-[#FF3D00]/30 px-2 py-0.5 text-[9px] font-bold uppercase">
                      SAFETY: {u.safetyScore}/100
                    </span>
                  </div>
                  <div className={`break-all text-[10px] ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                    {u.originalUrl}
                  </div>
                  {u.threatCategory && (
                    <div className="text-amber-600 dark:text-[#EAB308] text-[9px] pt-0.5 font-medium">
                      Threat Tag: {u.threatCategory}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Attachments */}
        <div className={`rounded-2xl border p-4 space-y-3 shadow-xs transition-colors ${
          isLight ? 'bg-white border-gray-200 shadow-sm' : 'border-[#1A1A1F] bg-[#0A0A0F]'
        }`}>
          <div className={`flex items-center justify-between border-b pb-2 ${
            isLight ? 'border-gray-100' : 'border-[#1A1A1F]'
          }`}>
            <h4 className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${
              isLight ? 'text-gray-900' : 'text-white'
            }`}>
              <Paperclip className={`h-4 w-4 ${isLight ? 'text-blue-600' : 'text-[#00E0FF]'}`} />
              Extracted Attachments & Payloads ({attachments.length})
            </h4>
          </div>

          {attachments.length === 0 ? (
            <p className={`text-xs py-4 text-center ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>
              No binary attachments enclosed in this email.
            </p>
          ) : (
            <div className="space-y-2">
              {attachments.map((att, i) => (
                <div key={i} className={`rounded-xl border p-3 text-xs space-y-1.5 ${
                  isLight ? 'border-gray-200 bg-gray-50' : 'border-[#1A1A1F] bg-[#12121A]'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`font-bold truncate max-w-[220px] ${isLight ? 'text-gray-900' : 'text-white'}`}>
                      {att.filename}
                    </span>
                    <span
                      className={`rounded-md px-2 py-0.5 text-[9px] font-bold uppercase ${
                        att.verdict === 'malicious'
                          ? 'bg-red-100 text-red-800 border border-red-200 dark:bg-[#FF3D00]/10 dark:text-[#FF3D00] dark:border-[#FF3D00]/30'
                          : 'bg-amber-100 text-amber-800 border border-amber-200 dark:bg-[#EAB308]/10 dark:text-[#EAB308] dark:border-[#EAB308]/30'
                      }`}
                    >
                      {att.verdict}
                    </span>
                  </div>
                  <div className={`flex items-center justify-between text-[10px] ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                    <span>Size: {att.filesize}</span>
                    <span>Type: {att.filetype}</span>
                  </div>
                  {att.isMacroEnabled && (
                    <div className="rounded-md bg-red-100 border border-red-200 text-red-800 dark:bg-[#FF3D00]/10 dark:border-[#FF3D00]/30 dark:text-[#FF3D00] p-2 text-[10px] font-bold">
                      WARNING: Contains active VBA Macro Execution Payload!
                    </div>
                  )}
                  <div className={`text-[9px] truncate ${isLight ? 'text-gray-500' : 'text-gray-400'}`} title={att.sha512 || att.sha256}>
                    SHA-512: {att.sha512 || att.sha256}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
