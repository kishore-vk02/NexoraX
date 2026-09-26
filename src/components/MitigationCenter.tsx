import React, { useState } from 'react';
import { EmailIncident } from '../types';
import {
  ShieldAlert,
  Ban,
  Radio,
  Lock,
  RefreshCw,
  CheckCircle2,
  AlertOctagon,
  Trash2,
  FileCheck,
  Send,
  ExternalLink,
  Blocks,
  Zap,
  Code,
} from 'lucide-react';

interface MitigationCenterProps {
  incidents: EmailIncident[];
  onExecuteAction: (incidentId: string, actionType: string, target: string) => void;
  onBroadcastIOC?: (iocValue: string, iocType: string) => void;
  theme?: 'light' | 'dark' | 'cyber';
}

export const MitigationCenter: React.FC<MitigationCenterProps> = ({
  incidents,
  onExecuteAction,
  onBroadcastIOC,
  theme = 'light',
}) => {
  const isLight = theme === 'light';
  const isCyber = theme === 'cyber';

  const [selectedIncidentId, setSelectedIncidentId] = useState<string>(incidents[0]?.id || '');
  const [broadcastingSmartContract, setBroadcastingSmartContract] = useState(false);

  const selectedIncident = incidents.find((i) => i.id === selectedIncidentId) || incidents[0];

  const handleAction = (type: string, target: string) => {
    if (!selectedIncident) return;
    onExecuteAction(selectedIncident.id, type, target);
  };

  const handleBroadcastContract = () => {
    setBroadcastingSmartContract(true);
    setTimeout(() => {
      onExecuteAction(
        selectedIncident.id,
        'smart_contract_ioc_broadcast',
        `${selectedIncident.domainIntel.domain} [IOC Hash Sealed]`
      );
      if (onBroadcastIOC) {
        onBroadcastIOC(selectedIncident.domainIntel.domain, 'DOMAIN');
      }
      setBroadcastingSmartContract(false);
    }, 500);
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Header */}
      <div
        className={`rounded-2xl border p-4 shadow-xs transition-colors ${
          isLight
            ? 'bg-white border-gray-200 text-gray-900 shadow-sm'
            : isCyber
            ? 'bg-[#0A0A0F] border-[#FF3D00]/30 text-white'
            : 'bg-[#000000] border-[#686B6C] text-[#FFFFFF]'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 dark:bg-[#FF3D00]/10 border border-red-200 dark:border-[#FF3D00]/30 text-red-600 dark:text-[#FF3D00] shadow-xs">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`font-bold text-sm uppercase tracking-widest ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  Autonomous SOAR & Smart Contract Defense Trigger
                </h3>
                <span className="rounded-md bg-cyan-100 border border-cyan-200 text-cyan-800 dark:bg-[#00E0FF]/15 dark:border-[#00E0FF]/40 dark:text-[#00E0FF] px-2 py-0.5 text-[9px] font-bold uppercase">
                  AutomatedSOARTrigger.sol Active
                </span>
              </div>
              <p className={`text-[11px] font-sans mt-0.5 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                On-chain authenticated containment, smart contract border gateway null-routes & immutable BGP blackholing
              </p>
            </div>
          </div>

          {/* Incident Selector */}
          <div className="flex items-center gap-2">
            <span className={`text-[10px] uppercase tracking-wider font-bold ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
              Select Case:
            </span>
            <select
              value={selectedIncidentId}
              onChange={(e) => setSelectedIncidentId(e.target.value)}
              className={`rounded-xl border px-3 py-1.5 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isLight
                  ? 'border-gray-300 bg-white text-gray-900'
                  : 'border-[#1A1A1F] bg-[#050507] text-white focus:ring-[#00E0FF]'
              }`}
            >
              {incidents.map((inc) => (
                <option key={inc.id} value={inc.id}>
                  {inc.caseNumber} - {inc.classification} ({inc.subject.substring(0, 28)}...)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Action Control Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Action 1: Gateway Quarantine */}
        <div
          className={`rounded-2xl border p-4 space-y-3 shadow-xs transition-colors ${
            isLight
              ? 'bg-white border-red-200/70 text-gray-900 shadow-sm'
              : 'border-[#1A1A1F] bg-[#0A0A0F]'
          }`}
        >
          <div className="flex items-center gap-2 text-red-600 dark:text-[#FF3D00] font-bold text-xs uppercase tracking-wider">
            <AlertOctagon className="h-4 w-4" />
            <span>Global Gateway Quarantine</span>
          </div>
          <p className={`text-xs font-sans leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
            Instantly recall and purge this message from all enterprise mailboxes and inbound gateway queues via smart contract.
          </p>
          <div className={`text-[10px] p-2.5 rounded-lg border ${
            isLight ? 'bg-gray-50 border-gray-200 text-gray-700' : 'bg-[#12121A] border-[#1A1A1F] text-gray-400'
          }`}>
            Target: <span className={`font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>{selectedIncident.recipientAddress}</span>
          </div>
          <button
            onClick={() => handleAction('quarantine', selectedIncident.recipientAddress)}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 transition-colors shadow-sm uppercase tracking-wider"
          >
            <Ban className="h-3.5 w-3.5" />
            <span>Enforce Global Quarantine</span>
          </button>
        </div>

        {/* Action 2: Firewall IP Block */}
        <div
          className={`rounded-2xl border p-4 space-y-3 shadow-xs transition-colors ${
            isLight
              ? 'bg-white border-gray-200 text-gray-900 shadow-sm'
              : 'border-[#1A1A1F] bg-[#0A0A0F]'
          }`}
        >
          <div className="flex items-center gap-2 text-red-600 dark:text-[#FF3D00] font-bold text-xs uppercase tracking-wider">
            <Ban className="h-4 w-4" />
            <span>Border Firewall IP Null-Route</span>
          </div>
          <p className={`text-xs font-sans leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
            Deploy instantaneous BGP flowspec / null-route across corporate perimeter edge firewalls for originating adversary IP.
          </p>
          <div className={`text-[10px] p-2.5 rounded-lg border ${
            isLight ? 'bg-gray-50 border-gray-200 text-gray-700' : 'bg-[#12121A] border-[#1A1A1F] text-gray-400'
          }`}>
            IP Address: <span className="text-red-600 font-bold">{selectedIncident.originatingGeo.ip}</span>
          </div>
          <button
            onClick={() => handleAction('block_ip', selectedIncident.originatingGeo.ip)}
            className={`w-full flex items-center justify-center gap-2 rounded-xl text-xs font-bold py-2.5 transition-colors uppercase tracking-wider border ${
              isLight
                ? 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100'
                : 'bg-[#12121A] border-[#FF3D00]/40 hover:bg-[#FF3D00]/15 text-[#FF3D00]'
            }`}
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>Null-Route Origin IP</span>
          </button>
        </div>

        {/* Action 3: Smart Contract Threat Intel Broadcast */}
        <div
          className={`rounded-2xl border p-4 space-y-3 shadow-xs transition-colors ${
            isLight
              ? 'bg-blue-50/60 border-blue-200 text-gray-900'
              : 'border-[#00E0FF]/40 bg-[#00E0FF]/5'
          }`}
        >
          <div className="flex items-center gap-2 text-blue-600 dark:text-[#00E0FF] font-bold text-xs uppercase tracking-wider">
            <Blocks className="h-4 w-4" />
            <span>Consortium On-Chain Broadcast</span>
          </div>
          <p className={`text-xs font-sans leading-relaxed ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
            Broadcast domain & sender hashes to ThreatIntelligenceRegistry.sol so all partner consortium gateways auto-block immediately.
          </p>
          <div className={`text-[10px] p-2.5 rounded-lg border ${
            isLight ? 'bg-white border-blue-200 text-gray-700' : 'bg-[#12121A] border-[#1A1A1F] text-gray-400'
          }`}>
            IOC Domain: <span className="text-blue-600 font-bold">{selectedIncident.domainIntel.domain}</span>
          </div>
          <button
            onClick={handleBroadcastContract}
            disabled={broadcastingSmartContract}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white dark:bg-[#00E0FF] dark:hover:bg-[#00E0FF]/90 dark:text-black text-xs font-bold py-2.5 transition-colors shadow-sm uppercase tracking-wider disabled:opacity-50"
          >
            <Zap className={`h-3.5 w-3.5 ${broadcastingSmartContract ? 'animate-spin' : ''}`} />
            <span>{broadcastingSmartContract ? 'Broadcasting to Chain...' : 'Broadcast to ThreatRegistry.sol'}</span>
          </button>
        </div>

        {/* Action 4: Identity & Credential Reset */}
        <div
          className={`rounded-2xl border p-4 space-y-3 shadow-xs transition-colors ${
            isLight
              ? 'bg-white border-gray-200 text-gray-900 shadow-sm'
              : 'border-[#1A1A1F] bg-[#0A0A0F]'
          }`}
        >
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-xs uppercase tracking-wider">
            <Lock className="h-4 w-4" />
            <span>Revoke Tokens & Reset Auth</span>
          </div>
          <p className={`text-xs font-sans leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
            Terminate all active OAuth2 / SAML / Okta refresh tokens for the targeted employee and require mandatory FIDO2 re-auth.
          </p>
          <div className={`text-[10px] p-2.5 rounded-lg border ${
            isLight ? 'bg-gray-50 border-gray-200 text-gray-700' : 'bg-[#12121A] border-[#1A1A1F] text-gray-400'
          }`}>
            Identity: <span className={`font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>{selectedIncident.recipientAddress}</span>
          </div>
          <button
            onClick={() => handleAction('credential_reset', selectedIncident.recipientAddress)}
            className={`w-full flex items-center justify-center gap-2 rounded-xl text-xs font-bold py-2.5 transition-colors uppercase tracking-wider border ${
              isLight
                ? 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100'
                : 'bg-[#12121A] border-purple-500/40 hover:bg-purple-950/20 text-purple-400'
            }`}
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Rotate User Credentials</span>
          </button>
        </div>

        {/* Action 5: Dispatch SOC Alert */}
        <div
          className={`rounded-2xl border p-4 space-y-3 shadow-xs transition-colors ${
            isLight
              ? 'bg-white border-gray-200 text-gray-900 shadow-sm'
              : 'border-[#1A1A1F] bg-[#0A0A0F]'
          }`}
        >
          <div className="flex items-center gap-2 text-emerald-600 dark:text-[#00FF41] font-bold text-xs uppercase tracking-wider">
            <Send className="h-4 w-4" />
            <span>Escalate Incident to SOC Tier 2</span>
          </div>
          <p className={`text-xs font-sans leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
            Send webhook payload with full STIX 2.1 indicators of compromise to SIEM / EDR platform.
          </p>
          <div className={`text-[10px] p-2.5 rounded-lg border ${
            isLight ? 'bg-gray-50 border-gray-200 text-gray-700' : 'bg-[#12121A] border-[#1A1A1F] text-gray-400'
          }`}>
            Channel: <span className={`font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>SIEM Webhook / Splunk SOAR</span>
          </div>
          <button
            onClick={() => handleAction('soc_alert', 'SOC Alert Channel')}
            className={`w-full flex items-center justify-center gap-2 rounded-xl text-xs font-bold py-2.5 transition-colors uppercase tracking-wider border ${
              isLight
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                : 'bg-[#12121A] border-[#00FF41]/40 hover:bg-[#00FF41]/10 text-[#00FF41]'
            }`}
          >
            <FileCheck className="h-3.5 w-3.5" />
            <span>Dispatch SOC Broadcast</span>
          </button>
        </div>

        {/* Action 6: DNS Sinkhole */}
        <div
          className={`rounded-2xl border p-4 space-y-3 shadow-xs transition-colors ${
            isLight
              ? 'bg-white border-gray-200 text-gray-900 shadow-sm'
              : 'border-[#1A1A1F] bg-[#0A0A0F]'
          }`}
        >
          <div className="flex items-center gap-2 text-amber-600 dark:text-[#EAB308] font-bold text-xs uppercase tracking-wider">
            <Radio className="h-4 w-4" />
            <span>Internal DNS RPZ Sinkhole</span>
          </div>
          <p className={`text-xs font-sans leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
            Redirect lookups for the malicious impersonation domain to an isolated forensic honeypot sinkhole.
          </p>
          <div className={`text-[10px] p-2.5 rounded-lg border ${
            isLight ? 'bg-gray-50 border-gray-200 text-gray-700' : 'bg-[#12121A] border-[#1A1A1F] text-gray-400'
          }`}>
            Domain: <span className="text-amber-600 font-bold">{selectedIncident.domainIntel.domain}</span>
          </div>
          <button
            onClick={() => handleAction('dns_sinkhole', selectedIncident.domainIntel.domain)}
            className={`w-full flex items-center justify-center gap-2 rounded-xl text-xs font-bold py-2.5 transition-colors uppercase tracking-wider border ${
              isLight
                ? 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100'
                : 'bg-[#12121A] border-[#EAB308]/40 hover:bg-[#EAB308]/10 text-[#EAB308]'
            }`}
          >
            <Radio className="h-3.5 w-3.5" />
            <span>Deploy DNS Sinkhole</span>
          </button>
        </div>
      </div>

      {/* Mitigation Action Audit History */}
      <div
        className={`rounded-2xl border p-4 space-y-4 shadow-xs transition-colors ${
          isLight
            ? 'bg-white border-gray-200 text-gray-900 shadow-sm'
            : 'border-[#1A1A1F] bg-[#0A0A0F]'
        }`}
      >
        <div className={`flex items-center justify-between border-b pb-3 ${isLight ? 'border-gray-100' : 'border-[#1A1A1F]'}`}>
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-widest ${isLight ? 'text-gray-900' : 'text-white'}`}>
              Immutable Chain of Custody & Smart Contract Defense Log
            </h4>
            <span className={`text-[11px] ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>
              Every action sealed with cryptographic transaction hashes and smart contract events
            </span>
          </div>
          <span className="text-[10px] text-emerald-600 dark:text-[#00FF41] font-bold uppercase">
            PoA Certified
          </span>
        </div>

        <div className="space-y-2">
          {selectedIncident.mitigationHistory.length === 0 ? (
            <p className={`text-xs py-4 text-center ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>
              No manual or automated mitigation actions executed on this case yet.
            </p>
          ) : (
            selectedIncident.mitigationHistory.map((mit, i) => (
              <div
                key={mit.id || i}
                className={`rounded-xl border p-3.5 text-xs space-y-1.5 transition-colors ${
                  isLight
                    ? 'border-gray-200 bg-gray-50'
                    : 'border-[#1A1A1F] bg-[#12121A]'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-[#00FF41]" />
                    <div>
                      <span className={`font-bold uppercase ${isLight ? 'text-gray-900' : 'text-white'}`}>
                        {mit.type.replace(/_/g, ' ')}
                      </span>
                      <span className={`ml-2 ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>Target: {mit.target}</span>
                    </div>
                  </div>
                  <div className={`flex items-center gap-4 text-[10px] ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>
                    <span>Operator: {mit.user}</span>
                    <span>{new Date(mit.executedAt).toLocaleTimeString()}</span>
                    <span className="rounded-md bg-emerald-100 text-emerald-800 dark:bg-[#00FF41]/10 dark:text-[#00FF41] border border-emerald-200 dark:border-[#00FF41]/30 px-2 py-0.5 text-[9px] font-bold uppercase">
                      ACTIVE
                    </span>
                  </div>
                </div>

                <div className={`flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono pt-1 border-t ${
                  isLight ? 'border-gray-200 text-gray-500' : 'border-[#1A1A1F] text-gray-500'
                }`}>
                  <span className="truncate max-w-[320px]">
                    Tx: {mit.txHash || `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`}
                  </span>
                  <span className={isLight ? 'text-blue-600 font-semibold' : 'text-[#00E0FF]'}>
                    {mit.smartContractEvent || 'AutomatedSOARTrigger.DefenseExecuted()'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
