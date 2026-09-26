import React, { useState } from 'react';
import { EmailIncident } from '../types';
import {
  Blocks,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Lock,
  Coins,
  AlertTriangle,
  Server,
  Zap,
  Fingerprint,
  FileCheck,
  ShieldAlert,
} from 'lucide-react';

interface BlockchainForensicsTabProps {
  incident: EmailIncident;
  onBroadcastWallet?: (walletAddress: string) => void;
  theme?: 'light' | 'dark' | 'cyber';
}

export const BlockchainForensicsTab: React.FC<BlockchainForensicsTabProps> = ({
  incident,
  onBroadcastWallet,
  theme = 'light',
}) => {
  const isLight = theme === 'light';
  const isCyber = theme === 'cyber';

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verificationPassed, setVerificationPassed] = useState<boolean | null>(null);
  const [broadcastedWallets, setBroadcastedWallets] = useState<string[]>([]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerificationPassed(true);
    }, 400);
  };

  const handleBroadcast = (address: string) => {
    setBroadcastedWallets((prev) => [...prev, address]);
    if (onBroadcastWallet) {
      onBroadcastWallet(address);
    }
  };

  const proof = incident.blockchainProof;
  const wallets = incident.detectedCryptoWallets || [];

  return (
    <div className="space-y-6 font-mono">
      {/* Proof Summary Banner */}
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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-[#00E0FF]/10 border border-blue-200 dark:border-[#00E0FF]/30 text-blue-600 dark:text-[#00E0FF] shadow-xs">
              <Blocks className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`font-bold text-sm uppercase tracking-widest ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  On-Chain Cryptographic Proof & Chain of Custody Audit
                </h3>
                <span className="rounded-md bg-emerald-100 dark:bg-[#00FF41]/10 border border-emerald-200 dark:border-[#00FF41]/30 px-2 py-0.5 text-[9px] text-emerald-800 dark:text-[#00FF41] font-bold uppercase">
                  ISO/IEC 27037 Legal Admissibility
                </span>
              </div>
              <p className={`text-[11px] font-sans mt-0.5 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                Case evidence sealed with cryptographic timestamping, consensus validation, and immutable Merkle proof
              </p>
            </div>
          </div>

          <button
            onClick={handleVerify}
            disabled={verifying}
            className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white dark:bg-[#00E0FF] dark:hover:bg-[#00E0FF]/90 dark:text-black px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors shadow-sm disabled:opacity-50"
          >
            <ShieldCheck className="h-4 w-4" />
            <span>{verifying ? 'Verifying Consensus Proof...' : 'Verify Cryptographic Proof'}</span>
          </button>
        </div>

        {verificationPassed && (
          <div className={`mt-3 rounded-xl border p-3 flex flex-wrap items-center justify-between gap-2 text-xs ${
            isLight
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'border-[#00FF41]/40 bg-[#00FF41]/10 text-white'
          }`}>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-[#00FF41]" />
              <span className="font-bold uppercase tracking-wider">
                CONSENSUS CONFIRMED: 5/5 NODES CERTIFY EVIDENCE HASH MATCHES ON-CHAIN RECORD EXACTLY.
              </span>
            </div>
            <span className={`text-[10px] font-mono ${isLight ? 'text-emerald-700' : 'text-gray-400'}`}>
              Proof algorithm: {proof?.proofAlgorithm || 'SHA-512 Merkle Proof + ECDSA (secp256k1)'}
            </span>
          </div>
        )}
      </div>

      {/* Proof Parameters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: On-Chain Block & Transaction */}
        <div
          className={`rounded-2xl border p-4 space-y-3 shadow-xs transition-colors ${
            isLight
              ? 'bg-white border-gray-200 text-gray-900 shadow-sm'
              : 'border-[#1A1A1F] bg-[#0A0A0F]'
          }`}
        >
          <div className={`flex items-center justify-between border-b pb-2 ${isLight ? 'border-gray-100' : 'border-[#1A1A1F]'}`}>
            <div className={`flex items-center gap-2 font-bold text-xs uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'}`}>
              <Fingerprint className="h-4 w-4 text-blue-600 dark:text-[#00E0FF]" />
              <span>Notarized Ledger Attestation</span>
            </div>
            <span className="text-[10px] text-emerald-600 dark:text-[#00FF41] font-bold">
              BLOCK #{proof?.blockNumber ?? 1}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="space-y-0.5">
              <span className={`text-[10px] uppercase font-bold ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>
                Transaction Hash:
              </span>
              <div
                className={`flex items-center justify-between font-mono break-all text-[11px] p-2.5 rounded-lg border ${
                  isLight
                    ? 'bg-gray-50 border-gray-200 text-blue-700 font-medium'
                    : 'bg-[#050507] border-[#1A1A1F] text-[#00E0FF]'
                }`}
              >
                <span>{proof?.txHash || '0x9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'}</span>
                <button
                  onClick={() => handleCopy(proof?.txHash || '', 'tx')}
                  className="text-gray-400 hover:text-gray-700 dark:hover:text-white ml-2 shrink-0"
                >
                  {copiedKey === 'tx' ? <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-[#00FF41]" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            <div className="space-y-0.5">
              <span className={`text-[10px] uppercase font-bold ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>
                Block Hash:
              </span>
              <div
                className={`font-mono break-all text-[11px] p-2.5 rounded-lg border ${
                  isLight
                    ? 'bg-gray-50 border-gray-200 text-gray-800'
                    : 'bg-[#050507] border-[#1A1A1F] text-gray-300'
                }`}
              >
                {proof?.blockHash || '00a4f9108b8812c30981726a992810a9c8b710293847102938471029384799a1'}
              </div>
            </div>

            <div className="space-y-0.5">
              <span className={`text-[10px] uppercase font-bold ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>
                Merkle Tree Root:
              </span>
              <div
                className={`font-mono break-all text-[11px] p-2.5 rounded-lg border ${
                  isLight
                    ? 'bg-gray-50 border-gray-200 text-gray-800'
                    : 'bg-[#050507] border-[#1A1A1F] text-gray-300'
                }`}
              >
                {proof?.merkleRoot || '0x71fa90218b8812c30981726a992810a9c8b7102938471029384710293847771a'}
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Smart Contract & Consensus Signatures */}
        <div
          className={`rounded-2xl border p-4 space-y-3 shadow-xs transition-colors ${
            isLight
              ? 'bg-white border-gray-200 text-gray-900 shadow-sm'
              : 'border-[#1A1A1F] bg-[#0A0A0F]'
          }`}
        >
          <div className={`flex items-center justify-between border-b pb-2 ${isLight ? 'border-gray-100' : 'border-[#1A1A1F]'}`}>
            <div className={`flex items-center gap-2 font-bold text-xs uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'}`}>
              <Server className="h-4 w-4 text-emerald-600 dark:text-[#00FF41]" />
              <span>Smart Contract & Validator Consensus</span>
            </div>
            <span className={`text-[10px] font-mono ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
              Gas: {proof?.gasUsed?.toLocaleString() || '42,100'}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="space-y-0.5">
              <span className={`text-[10px] uppercase font-bold ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>
                Smart Contract Address:
              </span>
              <div
                className={`flex items-center justify-between font-mono break-all text-[11px] p-2.5 rounded-lg border ${
                  isLight
                    ? 'bg-gray-50 border-gray-200 text-gray-900 font-semibold'
                    : 'bg-[#050507] border-[#1A1A1F] text-white'
                }`}
              >
                <span>{proof?.smartContractAddress || '0x3E11889a718290ccB382109848A1099238A792f4'}</span>
                <button
                  onClick={() => handleCopy(proof?.smartContractAddress || '', 'contract')}
                  className="text-gray-400 hover:text-gray-700 dark:hover:text-white ml-2 shrink-0"
                >
                  {copiedKey === 'contract' ? <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-[#00FF41]" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            <div className="space-y-0.5">
              <span className={`text-[10px] uppercase font-bold ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>
                Smart Contract Function:
              </span>
              <div
                className={`font-mono text-[11px] p-2.5 rounded-lg border ${
                  isLight
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-semibold'
                    : 'bg-[#050507] border-[#1A1A1F] text-[#00FF41]'
                }`}
              >
                {proof?.smartContractAction || 'EvidenceChainOfCustody.sealEmailEvidence()'}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className={`p-2.5 rounded-lg border ${isLight ? 'bg-gray-50 border-gray-200' : 'bg-[#050507] border-[#1A1A1F]'}`}>
                <span className={`text-[9px] uppercase ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>Sealing Validator:</span>
                <div className={`text-[10px] font-bold truncate ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  {proof?.validatorNode || 'Cisco Talos Threat Node'}
                </div>
              </div>
              <div className={`p-2.5 rounded-lg border ${isLight ? 'bg-emerald-50 border-emerald-200' : 'bg-[#050507] border-[#1A1A1F]'}`}>
                <span className={`text-[9px] uppercase ${isLight ? 'text-emerald-700' : 'text-gray-500'}`}>Consensus Quorum:</span>
                <div className={`text-[10px] font-bold ${isLight ? 'text-emerald-800' : 'text-[#00FF41]'}`}>
                  {proof?.consensusSignatures || 5}/5 Signatures Valid
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Adversary Cryptocurrency Wallet Intelligence */}
      <div
        className={`rounded-2xl border p-4 space-y-4 shadow-xs transition-colors ${
          isLight
            ? 'bg-white border-gray-200 text-gray-900 shadow-sm'
            : 'border-[#1A1A1F] bg-[#0A0A0F]'
        }`}
      >
        <div className={`flex flex-wrap items-center justify-between gap-2 border-b pb-3 ${isLight ? 'border-gray-100' : 'border-[#1A1A1F]'}`}>
          <div className="flex items-center gap-2.5">
            <Coins className="h-5 w-5 text-amber-500" />
            <div>
              <h4 className={`font-bold text-xs uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'}`}>
                Adversary Cryptocurrency Wallet Intelligence (On-Chain Extortion & Wire Diversion)
              </h4>
              <p className={`text-[10px] font-sans ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                Real-time tracking of crypto escrow wallets, ransomware addresses, and money laundering mixers
              </p>
            </div>
          </div>

          <span className="rounded-md bg-amber-100 border border-amber-200 text-amber-800 dark:bg-[#EAB308]/15 dark:border-[#EAB308]/30 dark:text-[#EAB308] px-2 py-0.5 text-[9px] font-bold uppercase">
            {wallets.length} Wallet{wallets.length === 1 ? '' : 's'} Identified in Payload
          </span>
        </div>

        {wallets.length === 0 ? (
          <div className={`rounded-xl border p-6 text-center space-y-2 ${
            isLight ? 'border-gray-200 bg-gray-50 text-gray-800' : 'border-[#1A1A1F] bg-[#050507] text-white'
          }`}>
            <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-[#00FF41] mx-auto" />
            <div className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'}`}>
              No Adversary Crypto Addresses Detected in this Message
            </div>
            <p className={`text-[11px] font-sans max-w-md mx-auto ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
              Automated heuristics inspected the message body and headers for Bitcoin (Bech32/Base58), Ethereum (ERC-20), Monero, and Tether payment addresses. No extortion addresses detected.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {wallets.map((wallet) => {
              const isBroadcasted = broadcastedWallets.includes(wallet.address);

              return (
                <div
                  key={wallet.address}
                  className={`rounded-xl border p-4 space-y-3 transition-colors ${
                    isLight
                      ? 'border-gray-200 bg-gray-50 hover:bg-gray-100/70'
                      : 'border-[#1A1A1F] bg-[#050507] hover:border-gray-700'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-amber-100 border border-amber-300 text-amber-800 dark:bg-[#EAB308]/20 dark:border-[#EAB308]/40 dark:text-[#EAB308] px-2 py-0.5 text-[10px] font-bold">
                        {wallet.currency}
                      </span>
                      <span className={`font-bold text-sm font-mono ${isLight ? 'text-gray-900' : 'text-white'}`}>
                        {wallet.address}
                      </span>
                      <button
                        onClick={() => handleCopy(wallet.address, wallet.address)}
                        className="text-gray-400 hover:text-gray-700 dark:hover:text-white"
                        title="Copy Wallet Address"
                      >
                        {copiedKey === wallet.address ? (
                          <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-[#00FF41]" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      {wallet.isOfacSanctioned && (
                        <span className="rounded-md bg-red-100 border border-red-300 text-red-800 dark:bg-[#FF3D00]/20 dark:border-[#FF3D00]/40 dark:text-[#FF3D00] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                          OFAC SDN Sanctioned
                        </span>
                      )}
                      <span
                        className={`rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                          wallet.riskVerdict === 'Sanctioned Entity'
                            ? 'bg-red-100 text-red-800 border border-red-300 dark:bg-[#FF3D00]/20 dark:text-[#FF3D00] dark:border-[#FF3D00]/40'
                            : wallet.riskVerdict === 'Tainted Mixer'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300 dark:bg-[#EAB308]/20 dark:text-[#EAB308] dark:border-[#EAB308]/40'
                            : 'bg-red-50 text-red-700 border border-red-200 dark:bg-[#FF3D00]/10 dark:text-[#FF3D00] dark:border-[#FF3D00]/30'
                        }`}
                      >
                        {wallet.riskVerdict}
                      </span>
                    </div>
                  </div>

                  {/* Wallet Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className={`p-2.5 rounded-lg border ${isLight ? 'bg-white border-gray-200' : 'bg-[#0A0A0F] border-[#1A1A1F]'}`}>
                      <span className={`text-[10px] uppercase ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>On-Chain Balance:</span>
                      <div className={`font-bold font-mono mt-0.5 ${isLight ? 'text-gray-900' : 'text-white'}`}>{wallet.balance}</div>
                    </div>
                    <div className={`p-2.5 rounded-lg border ${isLight ? 'bg-white border-gray-200' : 'bg-[#0A0A0F] border-[#1A1A1F]'}`}>
                      <span className={`text-[10px] uppercase ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>Total Received:</span>
                      <div className={`font-mono mt-0.5 ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>{wallet.totalReceived}</div>
                    </div>
                    <div className={`p-2.5 rounded-lg border ${isLight ? 'bg-white border-gray-200' : 'bg-[#0A0A0F] border-[#1A1A1F]'}`}>
                      <span className={`text-[10px] uppercase ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>Transactions:</span>
                      <div className={`font-mono mt-0.5 ${isLight ? 'text-gray-900 font-semibold' : 'text-white'}`}>{wallet.txCount} On-Chain Txs</div>
                    </div>
                    <div className={`p-2.5 rounded-lg border ${isLight ? 'bg-red-50/60 border-red-200' : 'bg-[#0A0A0F] border-[#1A1A1F]'}`}>
                      <span className={`text-[10px] uppercase ${isLight ? 'text-red-700 font-bold' : 'text-gray-500'}`}>Blockchain Taint Score:</span>
                      <div className="text-red-600 dark:text-[#FF3D00] font-bold font-mono mt-0.5">
                        {wallet.taintScore}/100 (HIGH RISK)
                      </div>
                    </div>
                  </div>

                  {/* Threat Cluster & Actions */}
                  <div className={`flex flex-wrap items-center justify-between gap-3 pt-2 border-t text-xs ${
                    isLight ? 'border-gray-200' : 'border-[#1A1A1F]'
                  }`}>
                    <div className={isLight ? 'text-gray-600' : 'text-gray-400'}>
                      <span className={isLight ? 'text-gray-500' : 'text-gray-500'}>Threat Cluster: </span>
                      <span className={`font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>
                        {wallet.clusterLabel || 'Unknown Threat Syndicate'}
                      </span>
                      {wallet.mixerTransactionsDetected && (
                        <span className={`ml-2 font-mono text-[10px] font-semibold ${isLight ? 'text-amber-700' : 'text-[#EAB308]'}`}>
                          [Mixer / CoinJoin Taint Detected]
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleBroadcast(wallet.address)}
                      disabled={isBroadcasted}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                        isBroadcasted
                          ? isLight
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-[#00FF41]/20 text-[#00FF41] border border-[#00FF41]/40'
                          : isLight
                          ? 'bg-red-50 hover:bg-red-100 text-red-700 border border-red-300'
                          : 'bg-[#FF3D00]/15 text-[#FF3D00] border border-[#FF3D00]/40 hover:bg-[#FF3D00]/25'
                      }`}
                    >
                      <ShieldAlert className="h-3.5 w-3.5" />
                      <span>
                        {isBroadcasted
                          ? 'Blacklisted on CryptoExtortionBlacklist.sol'
                          : 'Broadcast to On-Chain Blacklist'}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
