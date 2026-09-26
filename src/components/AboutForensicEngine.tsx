import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Activity,
  Layers,
  Blocks,
  Code,
  Brain,
  Workflow,
  Cpu,
  Lock,
  Globe,
  Database,
  ArrowRight,
  CheckCircle2,
  Terminal,
  FileCheck2,
  AlertTriangle,
  Zap,
  Info,
} from 'lucide-react';
import { EmailIncident, CyberBlock, ConsortiumNode } from '../types';
import { DashboardOverview } from './DashboardOverview';
import { EmailAnalyzer } from './EmailAnalyzer';
import { MitigationCenter } from './MitigationCenter';
import { BlockchainLedgerView } from './BlockchainLedgerView';
import { SmartContractsView } from './SmartContractsView';
import { ModelTrainingStudio } from './ModelTrainingStudio';
import { ModelProcessVisualizer } from './ModelProcessVisualizer';

export type AboutSubSection =
  | 'overview'
  | 'dashboard'
  | 'analyzer'
  | 'mitigation'
  | 'blockchain'
  | 'smart_contracts'
  | 'training'
  | 'process_flow';

interface AboutForensicEngineProps {
  theme: 'light' | 'dark' | 'cyber';
  userEmail: string;
  incidents: EmailIncident[];
  currentIncident: EmailIncident;
  blocks: CyberBlock[];
  nodes: ConsortiumNode[];
  maskPii: boolean;
  onQuarantine: (id: string) => void;
  onBlockIp: (ip: string) => void;
  onGenerateReport: (incident: EmailIncident) => void;
  onExecuteMitigationAction: (actionId: string) => void;
  onBroadcastIOC: (iocType: string, iocValue: string) => void;
  onMineBlock: (transactions: any[]) => void;
  onSelectIncidentForSpam: (id: string) => void;
  onSelectIncidentForInbox: (id: string) => void;
  onNotification: (msg: string, type: 'info' | 'success' | 'warning') => void;
  onOpenReportModal: (incident: EmailIncident) => void;
}

export const AboutForensicEngine: React.FC<AboutForensicEngineProps> = ({
  theme,
  userEmail,
  incidents,
  currentIncident,
  blocks,
  nodes,
  maskPii,
  onQuarantine,
  onBlockIp,
  onGenerateReport,
  onExecuteMitigationAction,
  onBroadcastIOC,
  onMineBlock,
  onSelectIncidentForSpam,
  onSelectIncidentForInbox,
  onNotification,
  onOpenReportModal,
}) => {
  const [activeSection, setActiveSection] = useState<AboutSubSection>('overview');

  const isLight = theme === 'light';
  const isCyber = theme === 'cyber';

  const subNavItems = [
    {
      id: 'overview' as const,
      label: 'Engine Architecture & Specs',
      icon: Info,
      badge: 'About Core',
    },
    {
      id: 'dashboard' as const,
      label: 'Threat Dashboard',
      icon: Activity,
      badge: 'Global Map',
    },
    {
      id: 'analyzer' as const,
      label: 'Forensic Workbench',
      icon: Layers,
      badge: 'Protocols',
    },
    {
      id: 'mitigation' as const,
      label: 'SOAR Mitigation',
      icon: ShieldCheck,
      badge: 'Active Defense',
    },
    {
      id: 'blockchain' as const,
      label: 'Threat Blockchain',
      icon: Blocks,
      badge: `PoA Height #${blocks.length}`,
    },
    {
      id: 'smart_contracts' as const,
      label: 'Smart Contracts',
      icon: Code,
      badge: 'Solidity v0.8.20',
    },
    {
      id: 'training' as const,
      label: 'Model Training',
      icon: Brain,
      badge: 'Calibration',
    },
    {
      id: 'process_flow' as const,
      label: 'Process Visualizer',
      icon: Workflow,
      badge: 'Pipeline Flow',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner: About Evi-Mail Forensic Engine */}
      <div
        className={`p-6 rounded-2xl border shadow-sm transition-all ${
          isLight
            ? 'bg-white border-gray-200 text-gray-900'
            : isCyber
            ? 'bg-[#000000] border-[#00FF41]/40 text-[#E5E7EB] shadow-[0_0_25px_rgba(0,255,65,0.15)]'
            : 'bg-[#000000] border-[#686B6C] text-[#FFFFFF]'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl overflow-hidden ring-2 ring-black/10 dark:ring-[#686B6C] shadow-md shrink-0 bg-[#070b19]">
              <img
                src="/app-logo.jpg"
                alt="Evi-Mail Blockchain Security"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight">About Forensic Engine</h1>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-[#686B6C]/40 dark:text-[#FFFFFF] border border-blue-200 dark:border-[#686B6C]">
                  PoA Consortium Active
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-[#686B6C] mt-1 max-w-2xl leading-relaxed">
                Evi-Mail combines RFC-compliant protocol parsing, neural NLP classification, SOAR autonomous containment, and SHA-512 Proof-of-Authority blockchain chain-of-custody notarization under ISO/IEC 27037 standards.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <div className="px-3 py-2 rounded-xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-[#686B6C] flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-gray-500 dark:text-[#686B6C]">Consensus:</span>
              <span className="font-semibold text-green-600 dark:text-green-400">5/5 Nodes</span>
            </div>
            <div className="px-3 py-2 rounded-xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-[#686B6C]">
              <span className="text-gray-500 dark:text-[#686B6C]">Account:</span>{' '}
              <span className="text-blue-600 dark:text-[#FFFFFF] font-semibold">{userEmail}</span>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs inside About */}
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-[#686B6C]/40 flex flex-wrap gap-2">
          {subNavItems.map((item) => {
            const Icon = item.icon;
            const isTabActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isTabActive
                    ? isLight
                      ? 'bg-blue-600 text-white shadow-sm'
                      : isCyber
                      ? 'bg-[#00FF41]/20 text-[#00FF41] border border-[#00FF41]'
                      : 'bg-[#686B6C] text-[#FFFFFF]'
                    : isLight
                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    : isCyber
                    ? 'bg-[#0A0A0F] text-gray-400 hover:text-white border border-gray-800'
                    : 'bg-[#000000] border border-[#686B6C] text-[#686B6C] hover:text-[#FFFFFF]'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
                <span className="text-[10px] opacity-75 font-mono hidden sm:inline">
                  ({item.badge})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Active Forensic Section inside About */}
      {activeSection === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            className={`p-5 rounded-2xl border shadow-xs space-y-3 transition-colors ${
              isLight
                ? 'bg-white border-gray-200 text-gray-900'
                : 'bg-[#000000] border-[#686B6C] text-[#FFFFFF]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-[#686B6C]/30 text-blue-600 dark:text-[#FFFFFF]">
                <Cpu className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-mono text-gray-400">Layer 1 Engine</span>
            </div>
            <h3 className={`font-bold text-sm ${isLight ? 'text-gray-900' : 'text-white'}`}>
              RFC Protocol Parsing & Deep Headers
            </h3>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-gray-600' : 'text-[#686B6C]'}`}>
              Validates cryptographic DKIM ed25519/rsa keys, SPF Return-Path alignment, and strict DMARC enforcement policies. Analyzes Received hops backwards to detect proxy injection.
            </p>
          </div>

          <div
            className={`p-5 rounded-2xl border shadow-xs space-y-3 transition-colors ${
              isLight
                ? 'bg-white border-gray-200 text-gray-900'
                : 'bg-[#000000] border-[#686B6C] text-[#FFFFFF]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-[#686B6C]/30 text-purple-600 dark:text-[#FFFFFF]">
                <Brain className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-mono text-gray-400">Layer 2 NLP</span>
            </div>
            <h3 className={`font-bold text-sm ${isLight ? 'text-gray-900' : 'text-white'}`}>
              Cognitive Threat & BEC Scoring
            </h3>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-gray-600' : 'text-[#686B6C]'}`}>
              Detects psychological urgency triggers, payroll diversion indicators, vendor bank routing changes, and homoglyph typosquatting (Unicode lookalikes).
            </p>
          </div>

          <div
            className={`p-5 rounded-2xl border shadow-xs space-y-3 transition-colors ${
              isLight
                ? 'bg-white border-gray-200 text-gray-900'
                : 'bg-[#000000] border-[#686B6C] text-[#FFFFFF]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-[#686B6C]/30 text-emerald-600 dark:text-[#FFFFFF]">
                <Blocks className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-mono text-gray-400">Layer 3 PoA</span>
            </div>
            <h3 className={`font-bold text-sm ${isLight ? 'text-gray-900' : 'text-white'}`}>
              SHA-512 Immutable Chain-of-Custody
            </h3>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-gray-600' : 'text-[#686B6C]'}`}>
              Provides court-admissible forensic notarization conforming to ISO/IEC 27037. Generates SHA-512 hashes and Merkle root proofs preserved across 5 consortium nodes.
            </p>
          </div>

          <div
            className={`p-5 rounded-2xl border shadow-xs space-y-3 transition-colors ${
              isLight
                ? 'bg-white border-gray-200 text-gray-900'
                : 'bg-[#000000] border-[#686B6C] text-[#FFFFFF]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-[#686B6C]/30 text-amber-600 dark:text-[#FFFFFF]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-mono text-gray-400">Layer 4 SOAR</span>
            </div>
            <h3 className={`font-bold text-sm ${isLight ? 'text-gray-900' : 'text-white'}`}>
              Automated Threat Mitigation
            </h3>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-gray-600' : 'text-[#686B6C]'}`}>
              Triggers instant perimeter firewall border null-routing, Active Directory credential resets, and cross-gateway IOC broadcasting upon smart contract triggers.
            </p>
          </div>

          <div
            className={`p-5 rounded-2xl border shadow-xs space-y-3 transition-colors ${
              isLight
                ? 'bg-white border-gray-200 text-gray-900'
                : 'bg-[#000000] border-[#686B6C] text-[#FFFFFF]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-[#686B6C]/30 text-rose-600 dark:text-[#FFFFFF]">
                <Globe className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-mono text-gray-400">Geo Forensics</span>
            </div>
            <h3 className={`font-bold text-sm ${isLight ? 'text-gray-900' : 'text-white'}`}>
              Origin Extraction & Geolocation
            </h3>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-gray-600' : 'text-[#686B6C]'}`}>
              Extracts earliest non-private IPv4/IPv6 hop and maps autonomous system numbers (ASN), hosting ISP data, and physical geographic coordinates globally.
            </p>
          </div>

          <div
            className={`p-5 rounded-2xl border shadow-xs space-y-3 transition-colors ${
              isLight
                ? 'bg-white border-gray-200 text-gray-900'
                : 'bg-[#000000] border-[#686B6C] text-[#FFFFFF]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-[#686B6C]/30 text-cyan-600 dark:text-[#FFFFFF]">
                <Code className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-mono text-gray-400">EVM Contracts</span>
            </div>
            <h3 className={`font-bold text-sm ${isLight ? 'text-gray-900' : 'text-white'}`}>
              Audited Smart Contracts
            </h3>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-gray-600' : 'text-[#686B6C]'}`}>
              Deploys Solidity v0.8.20 contracts including EvidenceChainOfCustody, AutomatedSOARTrigger, and MaliciousSenderRegistry for autonomous tamper-proof governance.
            </p>
          </div>
        </div>
      )}

      {/* 1. THREAT DASHBOARD */}
      {activeSection === 'dashboard' && (
        <div className="space-y-4">
          <DashboardOverview
            incidents={incidents}
            onSelectIncident={(inc) => {
              if (inc.threatSeverity !== 'benign') {
                onSelectIncidentForSpam(inc.id);
              } else {
                onSelectIncidentForInbox(inc.id);
              }
            }}
            selectedIncident={currentIncident}
            onSelectGeo={(geo) => {
              const matched = incidents.find((i) => i.originatingGeo.ip === geo.ip);
              if (matched) {
                onSelectIncidentForSpam(matched.id);
              }
            }}
            blockchainHeight={blocks.length}
            theme={theme}
          />
        </div>
      )}

      {/* 2. FORENSIC WORKBENCH */}
      {activeSection === 'analyzer' && (
        <div className="space-y-4">
          <EmailAnalyzer
            incident={currentIncident}
            onQuarantine={onQuarantine}
            onBlockIp={onBlockIp}
            onGenerateReport={onGenerateReport}
            maskPii={maskPii}
            theme={theme}
          />
        </div>
      )}

      {/* 3. SOAR MITIGATION */}
      {activeSection === 'mitigation' && (
        <div className="space-y-4">
          <MitigationCenter
            incidents={incidents}
            onExecuteAction={onExecuteMitigationAction}
            onBroadcastIOC={onBroadcastIOC}
            theme={theme}
          />
        </div>
      )}

      {/* 4. THREAT BLOCKCHAIN */}
      {activeSection === 'blockchain' && (
        <div className="space-y-4">
          <BlockchainLedgerView
            blocks={blocks}
            nodes={nodes}
            onNavigateToIncident={(caseNum) => {
              const matched = incidents.find((i) => i.caseNumber === caseNum);
              if (matched) {
                if (matched.threatSeverity !== 'benign') {
                  onSelectIncidentForSpam(matched.id);
                } else {
                  onSelectIncidentForInbox(matched.id);
                }
              }
            }}
            onMineBlock={onMineBlock}
            theme={theme}
          />
        </div>
      )}

      {/* 5. SMART CONTRACTS */}
      {activeSection === 'smart_contracts' && (
        <div className="space-y-4">
          <SmartContractsView incidents={incidents} theme={theme} />
        </div>
      )}

      {/* 6. MODEL TRAINING */}
      {activeSection === 'training' && (
        <div className="space-y-4">
          <ModelTrainingStudio theme={theme} onNotification={onNotification} />
        </div>
      )}

      {/* 7. PROCESS VISUALIZER */}
      {activeSection === 'process_flow' && (
        <div className="space-y-4">
          <ModelProcessVisualizer
            theme={theme}
            incidents={incidents}
            onInspectIncident={(inc) => onOpenReportModal(inc)}
          />
        </div>
      )}
    </div>
  );
};
