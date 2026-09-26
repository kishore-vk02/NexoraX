import React, { useState } from 'react';
import { CyberBlock, BlockchainTransaction, ConsortiumNode, EmailIncident } from '../types';
import {
  verifyBlockchainIntegrity,
  mintCyberBlock,
  computeMerkleRoot,
  sha512Sync,
} from '../utils/blockchainEngine';
import {
  ShieldAlert,
  ShieldCheck,
  Blocks,
  Link as LinkIcon,
  CheckCircle2,
  AlertOctagon,
  Hash,
  Cpu,
  Server,
  Activity,
  Copy,
  Check,
  Search,
  Lock,
  Unlock,
  Radio,
  ExternalLink,
  Terminal,
  Zap,
  RefreshCw,
  PlusCircle,
  Clock,
  Key,
} from 'lucide-react';

interface BlockchainLedgerViewProps {
  blockchain?: CyberBlock[];
  blocks?: CyberBlock[];
  onUpdateBlockchain?: (updatedBlocks: CyberBlock[]) => void;
  onMineBlock?: (transactions: BlockchainTransaction[]) => void;
  consortiumNodes?: ConsortiumNode[];
  nodes?: ConsortiumNode[];
  incidents?: EmailIncident[];
  onNavigateToIncident?: (caseNumber: string) => void;
  theme?: 'light' | 'dark' | 'cyber';
}

export const BlockchainLedgerView: React.FC<BlockchainLedgerViewProps> = ({
  blockchain,
  blocks,
  onUpdateBlockchain,
  onMineBlock,
  consortiumNodes,
  nodes,
  incidents = [],
  onNavigateToIncident,
  theme = 'light',
}) => {
  const isLight = theme === 'light';
  const isCyber = theme === 'cyber';

  const activeChain = blockchain || blocks || [];
  const activeNodes = consortiumNodes || nodes || [];
  const activeIncidents = incidents;

  const [selectedBlockIndex, setSelectedBlockIndex] = useState<number>(
    activeChain.length > 0 ? activeChain[activeChain.length - 1].index : 0
  );
  const [auditResult, setAuditResult] = useState<{
    isValid: boolean;
    brokenBlockIndex?: number;
    reason?: string;
    auditedAt?: string;
  } | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [tamperModeActive, setTamperModeActive] = useState(false);
  const [tamperTargetIndex, setTamperTargetIndex] = useState(1);
  const [miningNewBlock, setMiningNewBlock] = useState(false);
  const [selectedIncidentToMine, setSelectedIncidentToMine] = useState<string>(
    activeIncidents[0]?.id || ''
  );

  const selectedBlock =
    activeChain.find((b) => b.index === selectedBlockIndex) || activeChain[0];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  // Run Real SHA-512 Chain Integrity Audit
  const handleRunAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      const result = verifyBlockchainIntegrity(activeChain);
      setAuditResult({
        ...result,
        auditedAt: new Date().toISOString(),
      });
      setIsAuditing(false);
    }, 450);
  };

  // Simulate Tampering Attack on a Block to demonstrate tamper-evidence
  const handleSimulateTamper = () => {
    if (activeChain.length < 2) return;
    const targetIdx = Math.min(tamperTargetIndex, activeChain.length - 1);
    const updated = activeChain.map((b) => {
      if (b.index === targetIdx) {
        // Alter a transaction payload details without recomputing proof
        const tamperedTxs = (b.transactions || []).map((tx, idx) =>
          idx === 0
            ? {
                ...tx,
                payload: {
                  ...tx.payload,
                  details: 'TAMPERED: Wire beneficiary modified by unauthorized rogue actor to offshore account.',
                },
              }
            : tx
        );
        return {
          ...b,
          status: 'tampered' as const,
          tamperNote: 'CRITICAL: Payload content modified! Merkle root and block hash validation will fail.',
          transactions: tamperedTxs,
        };
      }
      return b;
    });

    if (onUpdateBlockchain) onUpdateBlockchain(updated);
    setTamperModeActive(true);

    // Run verification immediately
    const audit = verifyBlockchainIntegrity(updated);
    setAuditResult({
      ...audit,
      auditedAt: new Date().toISOString(),
    });
  };

  // Restore Chain to Authenticated Genesis State
  const handleRestoreChain = () => {
    // Recalculate and restore proper hashes
    const repaired = activeChain.map((b) => {
      const txHashes = (b.transactions || []).map((t) => t.txHash);
      const trueMerkle = computeMerkleRoot(txHashes);
      return {
        ...b,
        merkleRoot: trueMerkle,
        status: 'valid' as const,
        tamperNote: undefined,
      };
    });
    if (onUpdateBlockchain) onUpdateBlockchain(repaired);
    setTamperModeActive(false);
    setAuditResult(null);
  };

  // Mine and Notarize a New Threat Block
  const handleMineBlock = () => {
    if (activeChain.length === 0) return;
    setMiningNewBlock(true);
    const targetIncident =
      activeIncidents.find((i) => i.id === selectedIncidentToMine) || activeIncidents[0];
    const prevBlock = activeChain[activeChain.length - 1];

    setTimeout(() => {
      const targetHash = targetIncident?.sha512 || targetIncident?.sha256 || 'hash';
      const newTxHash =
        '0x' + sha512Sync((targetIncident?.id || 'inc') + targetHash + Date.now());
      const newTx: BlockchainTransaction = {
        txHash: newTxHash,
        type: 'EVIDENCE_SEAL',
        timestamp: new Date().toISOString(),
        originNode: 'Enterprise Primary Gateway Node',
        incidentId: targetIncident?.id,
        caseNumber: targetIncident?.caseNumber,
        gasUsed: 44500,
        status: 'CONFIRMED',
        signature: '0xConsensusSignature' + sha512Sync(targetIncident?.caseNumber || 'case').slice(0, 24),
        payload: {
          evidenceHash: targetHash,
          contractAddress: '0x3E11889a718290ccB382109848A1099238A792f4',
          methodCalled: 'sealEmailEvidence',
          details: `Sealed case ${targetIncident?.caseNumber || 'CASE'} (${(targetIncident?.subject || 'Alert').slice(0, 45)}...) into immutable consortium chain using SHA-512.`,
          confidenceScore: targetIncident?.fraudScore || 90,
        },
      };

      const iocTxHash = '0x' + sha512Sync((targetIncident?.senderAddress || 'sender') + Date.now());
      const iocTx: BlockchainTransaction = {
        txHash: iocTxHash,
        type: 'IOC_BROADCAST',
        timestamp: new Date().toISOString(),
        originNode: 'Cisco Talos Threat Intelligence Node',
        incidentId: targetIncident?.id,
        caseNumber: targetIncident?.caseNumber,
        gasUsed: 31200,
        status: 'CONFIRMED',
        signature: '0xTalosSignature' + sha512Sync(targetIncident?.senderAddress || 'sender').slice(0, 24),
        payload: {
          iocType: 'EMAIL_HASH',
          iocValue: targetIncident?.senderAddress || 'unknown@phish.net',
          details: `Broadcast high-confidence malicious sender identity to all member gateways.`,
          confidenceScore: targetIncident?.fraudScore || 90,
        },
      };

      if (onMineBlock) {
        onMineBlock([newTx, iocTx]);
      } else if (onUpdateBlockchain) {
        const newBlock = mintCyberBlock(prevBlock, [newTx, iocTx], 'Enterprise Primary Gateway Node');
        onUpdateBlockchain([...activeChain, newBlock]);
        setSelectedBlockIndex(newBlock.index);
      }
      setMiningNewBlock(false);
      setAuditResult(null);
    }, 600);
  };

  const totalTransactions = activeChain.reduce((acc, b) => acc + (b.transactions?.length || 0), 0);

  return (
    <div className="space-y-6 font-mono">
      {/* Header Banner */}
      <div
        className={`rounded-2xl border p-4 shadow-xs transition-colors ${
          isLight
            ? 'bg-white border-gray-200 text-gray-900 shadow-sm'
            : isCyber
            ? 'bg-[#0A0A0F] border-[#00E0FF]/30 text-white'
            : 'bg-[#000000] border-[#686B6C] text-[#FFFFFF]'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl overflow-hidden border border-blue-200 dark:border-[#00E0FF]/40 shadow-xs shrink-0 bg-blue-50 dark:bg-[#070b19]">
              <img
                src="/app-logo.jpg"
                alt="Consortium Blockchain Ledger"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`font-bold text-sm uppercase tracking-widest ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  Cybersecurity Threat Intelligence Blockchain & Immutable Ledger
                </h3>
                <span className="rounded-md bg-emerald-100 border border-emerald-200 text-emerald-800 dark:bg-[#00FF41]/10 dark:border-[#00FF41]/30 dark:text-[#00FF41] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                  PoA Consortium Consensus
                </span>
              </div>
              <p className={`text-[11px] font-sans mt-0.5 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                Decentralized ISO/IEC 27037 forensic chain of custody, tamper-evident evidence notarization & peer-verified threat IOC sharing
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleRunAudit}
              disabled={isAuditing}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs uppercase tracking-wider font-bold transition-colors disabled:opacity-50 border ${
                isLight
                  ? 'border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700'
                  : 'border-[#00E0FF]/40 bg-[#00E0FF]/10 text-[#00E0FF] hover:bg-[#00E0FF]/20'
              }`}
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
              <span>Audit Chain Integrity</span>
            </button>

            {!tamperModeActive ? (
              <button
                onClick={handleSimulateTamper}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs uppercase tracking-wider font-bold transition-colors border ${
                  isLight
                    ? 'border-red-200 bg-red-50 hover:bg-red-100 text-red-700'
                    : 'border-[#FF3D00]/40 bg-[#FF3D00]/10 text-[#FF3D00] hover:bg-[#FF3D00]/20'
                }`}
              >
                <Unlock className="h-3.5 w-3.5" />
                <span>Simulate Malicious Tamper</span>
              </button>
            ) : (
              <button
                onClick={handleRestoreChain}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs uppercase tracking-wider font-bold transition-colors border ${
                  isLight
                    ? 'border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800'
                    : 'border-[#00FF41]/40 bg-[#00FF41]/10 text-[#00FF41] hover:bg-[#00FF41]/20'
                }`}
              >
                <Lock className="h-3.5 w-3.5" />
                <span>Restore Chain State</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Audit Result Alert if active */}
      {auditResult && (
        <div
          className={`rounded-2xl border p-4 shadow-sm transition-colors ${
            auditResult.isValid
              ? isLight
                ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
                : 'border-[#00FF41]/40 bg-[#00FF41]/5 text-white'
              : isLight
              ? 'border-red-200 bg-red-50 text-red-950'
              : 'border-[#FF3D00]/60 bg-[#FF3D00]/10 text-white'
          }`}
        >
          <div className="flex items-start gap-3">
            {auditResult.isValid ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-[#00FF41] shrink-0 mt-0.5" />
            ) : (
              <AlertOctagon className="h-5 w-5 text-red-600 dark:text-[#FF3D00] shrink-0 mt-0.5 animate-pulse" />
            )}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs uppercase tracking-widest">
                  {auditResult.isValid
                    ? 'Cryptographic Chain Audit: 100% VALID & IMMUTABLE'
                    : 'CRYPTOGRAPHIC AUDIT DETECTED EVIDENCE TAMPERING!'}
                </span>
                <span className={`text-[10px] font-mono ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                  {auditResult.auditedAt && new Date(auditResult.auditedAt).toLocaleTimeString()}
                </span>
              </div>
              <p className={`text-xs font-sans leading-relaxed ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
                {auditResult.isValid
                  ? `All ${activeChain.length} blocks verified. SHA-512 block hashes, Merkle root trees, and previous block pointers match mathematically without any data alteration.`
                  : auditResult.reason}
              </p>
              {!auditResult.isValid && (
                <div className="text-[11px] text-red-600 dark:text-[#FF3D00] font-mono font-bold mt-1">
                  Tampered Block Index: #{auditResult.brokenBlockIndex} // Immediate Consortium Alert Broadcasted to CERT
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Top 4 Blockchain Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`rounded-2xl border p-4 space-y-1 shadow-xs transition-colors ${
          isLight ? 'bg-white border-gray-200 shadow-sm' : 'border-[#1A1A1F] bg-[#0A0A0F]'
        }`}>
          <div className={`flex items-center justify-between text-[10px] uppercase tracking-wider font-bold ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>
            <span>Blockchain Height</span>
            <Blocks className="h-4 w-4 text-blue-600 dark:text-[#00E0FF]" />
          </div>
          <div className={`text-2xl font-bold tracking-tight ${isLight ? 'text-gray-900' : 'text-white'}`}>
            Block #{activeChain.length > 0 ? activeChain.length - 1 : 0}
          </div>
          <div className={`text-[10px] uppercase tracking-wider ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
            {activeChain.length} Confirmed Blocks
          </div>
        </div>

        <div className={`rounded-2xl border p-4 space-y-1 shadow-xs transition-colors ${
          isLight ? 'bg-white border-gray-200 shadow-sm' : 'border-[#1A1A1F] bg-[#0A0A0F]'
        }`}>
          <div className={`flex items-center justify-between text-[10px] uppercase tracking-wider font-bold ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>
            <span>Notarized Transactions</span>
            <Terminal className="h-4 w-4 text-emerald-600 dark:text-[#00FF41]" />
          </div>
          <div className="text-2xl font-bold text-emerald-600 dark:text-[#00FF41] tracking-tight">{totalTransactions} Txs</div>
          <div className={`text-[10px] uppercase tracking-wider ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
            Evidence Seals & IOC Broadcasts
          </div>
        </div>

        <div className={`rounded-2xl border p-4 space-y-1 shadow-xs transition-colors ${
          isLight ? 'bg-white border-gray-200 shadow-sm' : 'border-[#1A1A1F] bg-[#0A0A0F]'
        }`}>
          <div className={`flex items-center justify-between text-[10px] uppercase tracking-wider font-bold ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>
            <span>Consortium Nodes</span>
            <Server className="h-4 w-4 text-amber-500 dark:text-[#EAB308]" />
          </div>
          <div className="text-2xl font-bold text-amber-600 dark:text-[#EAB308] tracking-tight">{activeNodes.length} Online</div>
          <div className={`text-[10px] uppercase tracking-wider ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
            100% Peer BFT Quorum
          </div>
        </div>

        <div className={`rounded-2xl border p-4 space-y-1 shadow-xs transition-colors ${
          isLight ? 'bg-white border-gray-200 shadow-sm' : 'border-[#1A1A1F] bg-[#0A0A0F]'
        }`}>
          <div className={`flex items-center justify-between text-[10px] uppercase tracking-wider font-bold ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>
            <span>Consensus Protocol</span>
            <Cpu className="h-4 w-4 text-blue-600 dark:text-[#00E0FF]" />
          </div>
          <div className={`text-lg font-bold tracking-tight truncate ${isLight ? 'text-gray-900' : 'text-white'}`}>PoA (BFT-PBFT)</div>
          <div className="text-[10px] text-emerald-600 dark:text-[#00FF41] uppercase tracking-wider flex items-center gap-1 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-[#00FF41] animate-pulse"></span>
            Zero-Trust Verifiable
          </div>
        </div>
      </div>

      {/* Visual Block Chain Sequence */}
      <div className={`rounded-2xl border p-4 space-y-3 shadow-xs transition-colors ${
        isLight ? 'bg-white border-gray-200 shadow-sm' : 'border-[#1A1A1F] bg-[#0A0A0F]'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LinkIcon className="h-4 w-4 text-blue-600 dark:text-[#00E0FF]" />
            <h4 className={`font-bold text-xs uppercase tracking-widest ${isLight ? 'text-gray-900' : 'text-white'}`}>
              Live Threat Blockchain Graph (Block Chain Linkage)
            </h4>
          </div>
          <span className={`text-[10px] uppercase tracking-wider ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>
            Click any block to inspect cryptographic payload
          </span>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1">
          {activeChain.map((block, idx) => {
            const isSelected = selectedBlockIndex === block.index;
            const isTampered = block.status === 'tampered';

            return (
              <React.Fragment key={block.index}>
                <div
                  onClick={() => setSelectedBlockIndex(block.index)}
                  className={`min-w-[240px] max-w-[240px] rounded-xl border p-3 cursor-pointer transition-all duration-200 shrink-0 ${
                    isSelected
                      ? isLight
                        ? 'border-blue-500 bg-blue-50/70 shadow-sm ring-1 ring-blue-500'
                        : 'border-[#00E0FF] bg-[#00E0FF]/10 shadow-[0_0_20px_rgba(0,224,255,0.2)]'
                      : isTampered
                      ? isLight
                        ? 'border-red-400 bg-red-50 text-red-900'
                        : 'border-[#FF3D00] bg-[#FF3D00]/10 shadow-[0_0_20px_rgba(255,61,0,0.25)]'
                      : isLight
                      ? 'border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300'
                      : 'border-[#1A1A1F] bg-[#050507] hover:border-gray-700'
                  }`}
                >
                  <div className={`flex items-center justify-between pb-2 border-b mb-2 ${
                    isLight ? 'border-gray-200' : 'border-[#1A1A1F]'
                  }`}>
                    <div className="flex items-center gap-1.5">
                      <span className={`font-bold text-xs ${isLight ? 'text-gray-900' : 'text-white'}`}>
                        {block.index === 0 ? 'GENESIS' : `BLOCK #${block.index}`}
                      </span>
                      {isTampered && (
                        <span className="rounded-md bg-red-600 px-1 py-0.2 text-[8px] text-white font-bold uppercase">
                          CORRUPT
                        </span>
                      )}
                    </div>
                    <span className={`text-[9px] ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                      {new Date(block.timestamp).toLocaleTimeString()}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-[10px]">
                    <div>
                      <span className={`uppercase ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>Block Hash:</span>
                      <div className={`font-mono truncate ${isLight ? 'text-gray-700 font-medium' : 'text-gray-300'}`}>
                        {block.blockHash.slice(0, 18)}...
                      </div>
                    </div>
                    <div>
                      <span className={`uppercase ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>Transactions:</span>
                      <div className="text-emerald-600 dark:text-[#00FF41] font-bold">
                        {block.transactions?.length || 0} Notarized
                      </div>
                    </div>
                    <div>
                      <span className={`uppercase ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>Validator:</span>
                      <div className={`truncate ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>{block.validator}</div>
                    </div>
                  </div>
                </div>

                {/* Chain Link Connector Arrow */}
                {idx < activeChain.length - 1 && (
                  <div className="flex flex-col items-center justify-center shrink-0 px-1">
                    <div className={`h-[2px] w-6 ${isLight ? 'bg-blue-300' : 'bg-gradient-to-r from-[#00E0FF]/60 to-[#00E0FF]/20'}`}></div>
                    <span className={`text-[8px] font-mono -mt-1 font-semibold ${isLight ? 'text-blue-600' : 'text-[#00E0FF]/70'}`}>LINK</span>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Block Detailed Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Block Header & Transactions */}
        <div className="lg:col-span-2 space-y-4">
          <div className={`rounded-2xl border p-4 space-y-4 shadow-xs transition-colors ${
            isLight ? 'bg-white border-gray-200 shadow-sm' : 'border-[#1A1A1F] bg-[#0A0A0F]'
          }`}>
            <div className={`flex flex-wrap items-center justify-between gap-2 border-b pb-3 ${
              isLight ? 'border-gray-100' : 'border-[#1A1A1F]'
            }`}>
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-blue-600 dark:text-[#00E0FF]" />
                <h4 className={`font-bold text-sm uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  Block #{selectedBlock.index} Forensic Header Inspection
                </h4>
              </div>
              <span
                className={`rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                  selectedBlock.status === 'tampered'
                    ? 'bg-red-100 text-red-800 border border-red-300 dark:bg-[#FF3D00]/20 dark:text-[#FF3D00] dark:border-[#FF3D00]/40'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-[#00FF41]/10 dark:text-[#00FF41] dark:border-[#00FF41]/30'
                }`}
              >
                {selectedBlock.status === 'tampered' ? 'TAMPERED / BROKEN PROOF' : 'CONFIRMED BY CONSENSUS'}
              </span>
            </div>

            {/* Block Header Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className={`rounded-xl border p-2.5 space-y-1 ${
                isLight ? 'bg-gray-50 border-gray-200' : 'border-[#1A1A1F] bg-[#050507]'
              }`}>
                <span className={`text-[10px] uppercase tracking-wider font-bold ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>Block Hash:</span>
                <div className={`flex items-center justify-between font-mono break-all text-[11px] ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  <span>{selectedBlock.blockHash}</span>
                  <button
                    onClick={() => handleCopy(selectedBlock.blockHash)}
                    className="text-gray-400 hover:text-blue-600 dark:hover:text-[#00E0FF] ml-2 shrink-0"
                    title="Copy Hash"
                  >
                    {copiedHash === selectedBlock.blockHash ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-[#00FF41]" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div className={`rounded-xl border p-2.5 space-y-1 ${
                isLight ? 'bg-gray-50 border-gray-200' : 'border-[#1A1A1F] bg-[#050507]'
              }`}>
                <span className={`text-[10px] uppercase tracking-wider font-bold ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>Previous Block Hash:</span>
                <div className={`flex items-center justify-between font-mono break-all text-[11px] ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  <span>{selectedBlock.previousHash}</span>
                  <button
                    onClick={() => handleCopy(selectedBlock.previousHash)}
                    className="text-gray-400 hover:text-blue-600 dark:hover:text-[#00E0FF] ml-2 shrink-0"
                    title="Copy Previous Hash"
                  >
                    {copiedHash === selectedBlock.previousHash ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-[#00FF41]" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div className={`rounded-xl border p-2.5 space-y-1 ${
                isLight ? 'bg-gray-50 border-gray-200' : 'border-[#1A1A1F] bg-[#050507]'
              }`}>
                <span className={`text-[10px] uppercase tracking-wider font-bold ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>Merkle Tree Root:</span>
                <div className="flex items-center justify-between text-blue-600 dark:text-[#00E0FF] font-mono break-all text-[11px]">
                  <span>{selectedBlock.merkleRoot}</span>
                  <button
                    onClick={() => handleCopy(selectedBlock.merkleRoot)}
                    className="text-gray-400 hover:text-blue-600 dark:hover:text-[#00E0FF] ml-2 shrink-0"
                    title="Copy Merkle Root"
                  >
                    {copiedHash === selectedBlock.merkleRoot ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-[#00FF41]" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div className={`rounded-xl border p-2.5 space-y-1 ${
                isLight ? 'bg-gray-50 border-gray-200' : 'border-[#1A1A1F] bg-[#050507]'
              }`}>
                <span className={`text-[10px] uppercase tracking-wider font-bold ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>Validator & Consensus:</span>
                <div className={`text-[11px] font-bold truncate ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  {selectedBlock.validator}
                </div>
                <div className="text-[9px] text-emerald-600 dark:text-[#00FF41] font-semibold">{selectedBlock.consensusAlgorithm}</div>
              </div>
            </div>

            {/* Nonce, Timestamp, Difficulty */}
            <div className={`flex flex-wrap items-center gap-4 text-[10px] border-t pt-2 ${
              isLight ? 'border-gray-100 text-gray-600' : 'border-[#1A1A1F] text-gray-400'
            }`}>
              <div>
                <span className={isLight ? 'text-gray-500' : 'text-gray-500'}>Timestamp: </span>
                <span className={`font-semibold ${isLight ? 'text-gray-900' : 'text-white'}`}>{selectedBlock.timestamp}</span>
              </div>
              <div>
                <span className={isLight ? 'text-gray-500' : 'text-gray-500'}>Nonce: </span>
                <span className="text-blue-600 dark:text-[#00E0FF] font-semibold">{selectedBlock.nonce}</span>
              </div>
              <div>
                <span className={isLight ? 'text-gray-500' : 'text-gray-500'}>PoA Factor: </span>
                <span className={`font-semibold ${isLight ? 'text-gray-900' : 'text-white'}`}>Difficulty {selectedBlock.difficulty}</span>
              </div>
            </div>
          </div>

          {/* Mined Transactions List */}
          <div className={`rounded-2xl border p-4 space-y-3 shadow-xs transition-colors ${
            isLight ? 'bg-white border-gray-200 shadow-sm' : 'border-[#1A1A1F] bg-[#0A0A0F]'
          }`}>
            <div className="flex items-center justify-between">
              <h4 className={`font-bold text-xs uppercase tracking-wider flex items-center gap-2 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                <Terminal className="h-4 w-4 text-emerald-600 dark:text-[#00FF41]" />
                <span>Mined Transactions ({selectedBlock?.transactions?.length || 0})</span>
              </h4>
              <span className={`text-[10px] uppercase ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>Cryptographically Sealed</span>
            </div>

            <div className="space-y-2">
              {(selectedBlock?.transactions || []).map((tx, idx) => (
                <div
                  key={tx.txHash + idx}
                  className={`rounded-xl border p-3.5 space-y-2 transition-colors ${
                    isLight
                      ? 'border-gray-200 bg-gray-50 hover:bg-gray-100/70'
                      : 'border-[#1A1A1F] bg-[#050507] hover:border-gray-700'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                          tx.type === 'EVIDENCE_SEAL'
                            ? 'bg-blue-100 text-blue-800 border border-blue-200 dark:bg-[#00E0FF]/15 dark:text-[#00E0FF] dark:border-[#00E0FF]/30'
                            : tx.type === 'IOC_BROADCAST'
                            ? 'bg-red-100 text-red-800 border border-red-200 dark:bg-[#FF3D00]/15 dark:text-[#FF3D00] dark:border-[#FF3D00]/30'
                            : tx.type === 'SMART_CONTRACT_DEFENSE'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200 dark:bg-[#EAB308]/15 dark:text-[#EAB308] dark:border-[#EAB308]/30'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {tx.type.replace('_', ' ')}
                      </span>
                      {tx.caseNumber && (
                        <button
                          type="button"
                          onClick={() => onNavigateToIncident && onNavigateToIncident(tx.caseNumber!)}
                          className={`text-xs font-bold transition-colors underline decoration-dotted ${
                            isLight ? 'text-blue-700 hover:text-blue-900' : 'text-white hover:text-[#00E0FF]'
                          }`}
                          title="Inspect in Forensic Workbench"
                        >
                          {tx.caseNumber}
                        </button>
                      )}
                    </div>
                    <span className={`text-[10px] font-mono ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                      Gas: {tx.gasUsed.toLocaleString()} units
                    </span>
                  </div>

                  <div className={`text-xs font-sans leading-relaxed ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
                    {tx.payload.details}
                  </div>

                  {tx.payload.contractAddress && (
                    <div className={`text-[10px] font-mono flex items-center gap-1 ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                      <span className={isLight ? 'text-gray-500' : 'text-gray-500'}>Contract:</span>
                      <span className={`truncate font-semibold ${isLight ? 'text-blue-700' : 'text-[#00E0FF]'}`}>{tx.payload.contractAddress}</span>
                      {tx.payload.methodCalled && (
                        <span className="text-emerald-600 dark:text-[#00FF41]">({tx.payload.methodCalled})</span>
                      )}
                    </div>
                  )}

                  <div className={`flex items-center justify-between text-[10px] pt-1 border-t ${
                    isLight ? 'border-gray-200 text-gray-500' : 'border-[#1A1A1F] text-gray-500'
                  }`}>
                    <span className="truncate max-w-[280px]">Tx: {tx.txHash}</span>
                    <span className="text-emerald-600 dark:text-[#00FF41] font-bold">STATUS: {tx.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Mine New Threat Block & Consortium Nodes */}
        <div className="space-y-4">
          {/* Mine New Block Panel */}
          <div className={`rounded-2xl border p-4 space-y-3 shadow-xs transition-colors ${
            isLight ? 'bg-white border-gray-200 shadow-sm' : 'border-[#1A1A1F] bg-[#0A0A0F]'
          }`}>
            <div className={`flex items-center gap-2 font-bold text-xs uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'}`}>
              <Zap className="h-4 w-4 text-blue-600 dark:text-[#00E0FF]" />
              <span>Notarize Threat Case On-Chain</span>
            </div>
            <p className={`text-xs font-sans ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
              Mint an immutable ISO/IEC 27037 evidence seal and broadcast IOC indicators across the consortium network.
            </p>

            <div className="space-y-2">
              <label className={`text-[10px] uppercase font-bold ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Select Active Case:</label>
              <select
                value={selectedIncidentToMine}
                onChange={(e) => setSelectedIncidentToMine(e.target.value)}
                className={`w-full rounded-xl border p-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isLight
                    ? 'border-gray-300 bg-white text-gray-900'
                    : 'border-[#1A1A1F] bg-[#050507] text-white focus:ring-[#00E0FF]'
                }`}
              >
                {activeIncidents.map((inc) => (
                  <option key={inc.id} value={inc.id}>
                    {inc.caseNumber} - {inc.subject.slice(0, 30)}...
                  </option>
                ))}
              </select>

              <button
                onClick={handleMineBlock}
                disabled={miningNewBlock || activeIncidents.length === 0}
                className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white dark:bg-[#00E0FF] dark:hover:bg-[#00E0FF]/90 dark:text-black py-2.5 text-xs font-bold uppercase tracking-wider transition-colors shadow-sm disabled:opacity-50"
              >
                <PlusCircle className={`h-4 w-4 ${miningNewBlock ? 'animate-spin' : ''}`} />
                <span>{miningNewBlock ? 'Mining Proof-of-Authority Block...' : 'Seal & Mine Block'}</span>
              </button>
            </div>
          </div>

          {/* Consortium Nodes Status */}
          <div className={`rounded-2xl border p-4 space-y-3 shadow-xs transition-colors ${
            isLight ? 'bg-white border-gray-200 shadow-sm' : 'border-[#1A1A1F] bg-[#0A0A0F]'
          }`}>
            <div className="flex items-center justify-between">
              <div className={`flex items-center gap-2 font-bold text-xs uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'}`}>
                <Server className="h-4 w-4 text-emerald-600 dark:text-[#00FF41]" />
                <span>Consortium Validators</span>
              </div>
              <span className="text-[9px] text-emerald-600 dark:text-[#00FF41] font-bold uppercase">
                {activeNodes.filter((n) => n.status === 'active').length} / {activeNodes.length} Active
              </span>
            </div>

            <div className="space-y-2">
              {activeNodes.map((node) => (
                <div
                  key={node.id}
                  className={`rounded-xl border p-3 space-y-1 transition-colors ${
                    isLight
                      ? 'border-gray-200 bg-gray-50'
                      : 'border-[#1A1A1F] bg-[#050507]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold truncate max-w-[180px] ${isLight ? 'text-gray-900' : 'text-white'}`}>
                      {node.name}
                    </span>
                    <span className="flex items-center gap-1 text-[9px] text-emerald-600 dark:text-[#00FF41] font-semibold">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-[#00FF41] animate-pulse"></span>
                      {node.latencyMs}ms
                    </span>
                  </div>
                  <div className={`text-[10px] truncate ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{node.organization}</div>
                  <div className={`flex items-center justify-between text-[9px] pt-1 border-t ${
                    isLight ? 'border-gray-200 text-gray-500' : 'border-[#1A1A1F] text-gray-500'
                  }`}>
                    <span>Blocks: {node.blocksValidated.toLocaleString()}</span>
                    <span className="text-blue-600 dark:text-[#00E0FF] font-semibold">Rep: {node.reputationScore}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
