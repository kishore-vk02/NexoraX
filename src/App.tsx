import React, { useState, useMemo } from 'react';
import { SAMPLE_INCIDENTS } from './data/sampleIncidents';
import { ADDITIONAL_INBOX_EMAILS } from './data/additionalInboxEmails';
import {
  STARRED_EMAILS,
  SENT_EMAILS,
  DRAFT_EMAILS,
  TRASH_EMAILS,
} from './data/emailFolderData';
import {
  EmailIncident,
  GeoLocation,
  CyberBlock,
  ConsortiumNode,
  BlockchainTransaction,
} from './types';
import { GmailHeader } from './components/GmailHeader';
import { GmailSidebar, GmailNavigationTab } from './components/GmailSidebar';
import { GmailInboxView, MailFolderCategory } from './components/GmailInboxView';
import { SpamForensicsView } from './components/SpamForensicsView';
import { DashboardOverview } from './components/DashboardOverview';
import { EmailAnalyzer } from './components/EmailAnalyzer';
import { MitigationCenter } from './components/MitigationCenter';
import { BlockchainLedgerView } from './components/BlockchainLedgerView';
import { SmartContractsView } from './components/SmartContractsView';
import { ModelTrainingStudio } from './components/ModelTrainingStudio';
import { ModelProcessVisualizer } from './components/ModelProcessVisualizer';
import { AboutForensicEngine } from './components/AboutForensicEngine';
import { ForensicReportModal } from './components/ForensicReportModal';
import { LiveIngestModal } from './components/LiveIngestModal';
import { AppStarterAnimation } from './components/AppStarterAnimation';
import { ByteCodeRainBackground } from './components/ByteCodeRainBackground';
import {
  INITIAL_CYBER_BLOCKS,
  INITIAL_CONSORTIUM_NODES,
  mineNewPoABlock,
  createBlockchainTransaction,
} from './utils/blockchainEngine';

export default function App() {
  // Primary Mail User ID
  const userEmail = 'dharaneeshsk2007@gmail.com';

  // Combined Initial Dataset: Threats + Diverse Legitimate Inbox Stream
  const [incidents, setIncidents] = useState<EmailIncident[]>(() => [
    ...SAMPLE_INCIDENTS,
    ...ADDITIONAL_INBOX_EMAILS,
  ]);

  // Folder Data States
  const [sentEmails, setSentEmails] = useState<EmailIncident[]>(() => [...SENT_EMAILS]);
  const [draftEmails, setDraftEmails] = useState<EmailIncident[]>(() => [...DRAFT_EMAILS]);
  const [trashEmails, setTrashEmails] = useState<EmailIncident[]>(() => [...TRASH_EMAILS]);

  // Starred Email ID tracking (pre-populated with starred emails plus key high priority incident)
  const [starredIds, setStarredIds] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    STARRED_EMAILS.forEach((e) => initial.add(e.id));
    // Also star the key MITRE advisory and Lincoln lab incidents by default
    initial.add('inc-starred-1');
    initial.add('inc-starred-2');
    initial.add('inc-starred-3');
    initial.add('inbox-linear-02');
    return initial;
  });

  // Additional standalone starred incidents pool (combined with any newly starred emails)
  const [starredIncidentsPool, setStarredIncidentsPool] = useState<EmailIncident[]>(() => [
    ...STARRED_EMAILS,
  ]);

  const [activeTab, setActiveTab] = useState<GmailNavigationTab>('inbox');
  const [sidebarOpen, setSidebarOpen] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 768);
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Email for Reading / Forensic Inspection
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);
  const [selectedSpamId, setSelectedSpamId] = useState<string>(
    SAMPLE_INCIDENTS.find((i) => i.threatSeverity !== 'benign')?.id || SAMPLE_INCIDENTS[0].id
  );

  // Blockchain Ledger State
  const [blocks, setBlocks] = useState<CyberBlock[]>(INITIAL_CYBER_BLOCKS);
  const [nodes, setNodes] = useState<ConsortiumNode[]>(INITIAL_CONSORTIUM_NODES);

  // Theme & Preferences: default to Gmail clean light
  const [theme, setTheme] = useState<'light' | 'dark' | 'cyber'>('light');
  const [maskPii, setMaskPii] = useState(false);

  // App Starter Animation State on opening
  const [isStarterActive, setIsStarterActive] = useState(true);

  // Modals
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [ingestModalOpen, setIngestModalOpen] = useState(false);
  const [reportIncident, setReportIncident] = useState<EmailIncident>(SAMPLE_INCIDENTS[0]);

  // Notifications banner (e.g. when an IP is blocked or email moved to Spam)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'warn' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'warn' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Helper to record on-chain transaction
  const recordOnChainAction = (
    type: 'SOAR_ACTION_TRIGGERED' | 'IOC_REGISTERED' | 'THREAT_BLACKLISTED',
    incidentCaseNumber: string,
    payload: Record<string, any>
  ) => {
    const tx = createBlockchainTransaction(
      type,
      incidentCaseNumber,
      '0x3E11889a718290ccB382109848A1099238A792f4',
      `SOAR_AUTOMATION_${Date.now()}`,
      payload,
      'AutomatedSOARTrigger.sol',
      'AutomatedSOARTrigger.DefenseExecuted()'
    );

    const latestBlock = blocks[blocks.length - 1];
    const newBlock = mineNewPoABlock([tx], latestBlock.blockHash, nodes[0].publicKey);
    setBlocks((prev) => [...prev, newBlock]);
    return tx.txHash;
  };

  // Quarantine Action
  const handleQuarantine = (id: string) => {
    const targetInc = incidents.find((i) => i.id === id);
    const txHash = recordOnChainAction('SOAR_ACTION_TRIGGERED', targetInc?.caseNumber || 'CASE-UNK', {
      action: 'GATEWAY_QUARANTINE',
      target: targetInc?.recipientAddress,
    });

    setIncidents((prev) =>
      prev.map((i) =>
        i.id === id
          ? {
              ...i,
              status: 'quarantined',
              mitigationHistory: [
                {
                  id: 'mit-' + Date.now(),
                  type: 'quarantine',
                  target: i.recipientAddress,
                  executedAt: new Date().toISOString(),
                  user: 'Analyst (Auto/SOAR)',
                  status: 'active',
                  txHash,
                  smartContractEvent: 'AutomatedSOARTrigger.GlobalQuarantineEnforced()',
                },
                ...i.mitigationHistory,
              ],
            }
          : i
      )
    );
    showNotification(`Case ${targetInc?.caseNumber}: Enforced on-chain quarantine & sealed evidence on Block #${blocks.length}`);
  };

  // Block IP Action
  const handleBlockIp = (ip: string) => {
    const targetInc = incidents.find((i) => i.originatingGeo.ip === ip);
    const txHash = recordOnChainAction('THREAT_BLACKLISTED', targetInc?.caseNumber || 'CASE-UNK', {
      action: 'BORDER_FIREWALL_NULL_ROUTE',
      ip,
    });

    setIncidents((prev) =>
      prev.map((i) =>
        i.originatingGeo.ip === ip
          ? {
              ...i,
              status: 'blocked',
              mitigationHistory: [
                {
                  id: 'mit-' + Date.now(),
                  type: 'block_ip',
                  target: ip,
                  executedAt: new Date().toISOString(),
                  user: 'SOC Lead',
                  status: 'active',
                  txHash,
                  smartContractEvent: 'AutomatedSOARTrigger.FirewallNullRouteDispatched()',
                },
                ...i.mitigationHistory,
              ],
            }
          : i
      )
    );
    showNotification(`Origin IP ${ip} Null-Routed across firewalls. Dispatched to consortium ledger.`);
  };

  // Manual SOAR action
  const handleExecuteMitigationAction = (
    incidentId: string,
    actionType: any,
    target: string
  ) => {
    const targetInc = incidents.find((i) => i.id === incidentId);
    const txHash = recordOnChainAction('SOAR_ACTION_TRIGGERED', targetInc?.caseNumber || 'CASE-UNK', {
      action: actionType,
      target,
    });

    setIncidents((prev) =>
      prev.map((i) =>
        i.id === incidentId
          ? {
              ...i,
              status: 'quarantined',
              mitigationHistory: [
                {
                  id: 'mit-' + Date.now(),
                  type: actionType,
                  target,
                  executedAt: new Date().toISOString(),
                  user: 'SOC Lead (Manual)',
                  status: 'active',
                  txHash,
                  smartContractEvent: 'AutomatedSOARTrigger.DefenseExecuted()',
                },
                ...i.mitigationHistory,
              ],
            }
          : i
      )
    );
    showNotification(`Action ${actionType} triggered for ${target}`);
  };

  const handleBroadcastIOC = (iocValue: string, iocType: string) => {
    recordOnChainAction('IOC_REGISTERED', incidents[0]?.caseNumber || 'CASE-IOC', {
      iocValue,
      iocType,
      registrar: 'CISA-AIS-NODE-01',
      consensusApproved: true,
    });
    showNotification(`IOC ${iocValue} broadcasted to all 5 consortium nodes.`);
  };

  const handleMineBlock = (transactions: BlockchainTransaction[]) => {
    const latestBlock = blocks[blocks.length - 1];
    const newBlock = mineNewPoABlock(transactions, latestBlock.blockHash, nodes[0].publicKey);
    setBlocks((prev) => [...prev, newBlock]);
    showNotification(`Block #${newBlock.index} successfully mined by ${nodes[0].name}.`);
  };

  // Move an email from Inbox to Spam
  const handleMoveToSpam = (id: string) => {
    setIncidents((prev) =>
      prev.map((i) =>
        i.id === id
          ? {
              ...i,
              threatSeverity: i.threatSeverity === 'benign' ? 'high' : i.threatSeverity,
              fraudScore: Math.max(i.fraudScore, 75),
              classification: i.classification === 'Legitimate' ? 'Phishing' : i.classification,
              status: 'quarantined',
            }
          : i
      )
    );
    setSelectedIncidentId(null);
    setSelectedSpamId(id);
    setActiveTab('spam');
    showNotification('Email marked as suspicious and moved to Spam Quarantine with forensic tracing.');
  };

  // Open deep forensic workbench
  const handleInspectForensics = (inc: EmailIncident) => {
    setSelectedIncidentId(inc.id);
    if (inc.threatSeverity !== 'benign') {
      setSelectedSpamId(inc.id);
      setActiveTab('spam');
    } else {
      setActiveTab('analyzer');
    }
  };

  // Ingest modal success handler
  const handleIngestSuccess = (newIncident: EmailIncident) => {
    const tx = createBlockchainTransaction(
      'EVIDENCE_SEALED',
      newIncident.caseNumber,
      '0x3E11889a718290ccB382109848A1099238A792f4',
      newIncident.sha256,
      {
        subject: newIncident.subject,
        sender: newIncident.senderAddress,
        fraudScore: newIncident.fraudScore,
        classification: newIncident.classification,
      },
      'EvidenceChainOfCustody.sol',
      'EvidenceChainOfCustody.EvidenceSealed()'
    );

    const latestBlock = blocks[blocks.length - 1];
    const newBlock = mineNewPoABlock([tx], latestBlock.blockHash, nodes[0].publicKey);
    setBlocks((prev) => [...prev, newBlock]);

    newIncident.blockchainProof = {
      blockNumber: newBlock.index,
      blockHash: newBlock.blockHash,
      txHash: tx.txHash,
      timestamp: newBlock.timestamp,
      merkleRoot: newBlock.merkleRoot,
      smartContractAddress: '0x3E11889a718290ccB382109848A1099238A792f4',
      smartContractAction: 'EvidenceChainOfCustody.sealEmailEvidence()',
      consensusSignatures: 5,
      validatorNode: nodes[0].name,
      isImmutable: true,
    };

    setIncidents((prev) => [newIncident, ...prev]);

    if (newIncident.threatSeverity !== 'benign') {
      setSelectedSpamId(newIncident.id);
      setActiveTab('spam');
      showNotification(`Threat intercepted from ${newIncident.originatingGeo.city}, ${newIncident.originatingGeo.country}. Transferred to Spam.`);
    } else {
      setSelectedIncidentId(newIncident.id);
      setActiveTab('inbox');
      showNotification('Clean email ingested and verified with SPF/DKIM.');
    }
  };

  const handleOpenReport = (incident: EmailIncident) => {
    setReportIncident(incident);
    setReportModalOpen(true);
  };

  // Segregation of Clean/Inbox vs Spam Mails
  const cleanEmails = useMemo(() => {
    return incidents.filter(
      (i) => i.threatSeverity === 'benign' || i.classification === 'Legitimate'
    );
  }, [incidents]);

  const spamEmails = useMemo(() => {
    return incidents.filter(
      (i) => i.threatSeverity !== 'benign' && i.classification !== 'Legitimate'
    );
  }, [incidents]);

  // Starred emails collection (merges pre-seeded starred pool with any incident that user stars)
  const starredEmails = useMemo(() => {
    const map = new Map<string, EmailIncident>();
    starredIncidentsPool.forEach((item) => map.set(item.id, item));
    incidents.forEach((item) => {
      if (starredIds.has(item.id)) {
        map.set(item.id, item);
      }
    });
    sentEmails.forEach((item) => {
      if (starredIds.has(item.id)) {
        map.set(item.id, item);
      }
    });
    return Array.from(map.values()).filter((item) => starredIds.has(item.id));
  }, [incidents, starredIncidentsPool, sentEmails, starredIds]);

  // Filtered lists according to global search
  const filteredCleanEmails = useMemo(() => {
    if (!searchQuery.trim()) return cleanEmails;
    const q = searchQuery.toLowerCase();
    return cleanEmails.filter(
      (i) =>
        i.subject.toLowerCase().includes(q) ||
        i.senderDisplay.toLowerCase().includes(q) ||
        i.senderAddress.toLowerCase().includes(q) ||
        i.bodyText.toLowerCase().includes(q)
    );
  }, [cleanEmails, searchQuery]);

  const filteredStarredEmails = useMemo(() => {
    if (!searchQuery.trim()) return starredEmails;
    const q = searchQuery.toLowerCase();
    return starredEmails.filter(
      (i) =>
        i.subject.toLowerCase().includes(q) ||
        i.senderDisplay.toLowerCase().includes(q) ||
        i.senderAddress.toLowerCase().includes(q) ||
        i.bodyText.toLowerCase().includes(q)
    );
  }, [starredEmails, searchQuery]);

  const filteredSentEmails = useMemo(() => {
    if (!searchQuery.trim()) return sentEmails;
    const q = searchQuery.toLowerCase();
    return sentEmails.filter(
      (i) =>
        i.subject.toLowerCase().includes(q) ||
        i.recipientAddress.toLowerCase().includes(q) ||
        i.bodyText.toLowerCase().includes(q)
    );
  }, [sentEmails, searchQuery]);

  const filteredDraftEmails = useMemo(() => {
    if (!searchQuery.trim()) return draftEmails;
    const q = searchQuery.toLowerCase();
    return draftEmails.filter(
      (i) =>
        i.subject.toLowerCase().includes(q) ||
        i.recipientAddress.toLowerCase().includes(q) ||
        i.bodyText.toLowerCase().includes(q)
    );
  }, [draftEmails, searchQuery]);

  const filteredTrashEmails = useMemo(() => {
    if (!searchQuery.trim()) return trashEmails;
    const q = searchQuery.toLowerCase();
    return trashEmails.filter(
      (i) =>
        i.subject.toLowerCase().includes(q) ||
        i.senderDisplay.toLowerCase().includes(q) ||
        i.bodyText.toLowerCase().includes(q)
    );
  }, [trashEmails, searchQuery]);

  const filteredSpamEmails = useMemo(() => {
    if (!searchQuery.trim()) return spamEmails;
    const q = searchQuery.toLowerCase();
    return spamEmails.filter(
      (i) =>
        i.subject.toLowerCase().includes(q) ||
        i.senderDisplay.toLowerCase().includes(q) ||
        i.senderAddress.toLowerCase().includes(q) ||
        i.originatingGeo.country.toLowerCase().includes(q) ||
        i.originatingGeo.city.toLowerCase().includes(q) ||
        i.originatingGeo.ip.includes(q) ||
        i.classification.toLowerCase().includes(q)
    );
  }, [spamEmails, searchQuery]);

  // Master lookup for selected incident across all folders
  const allFolderPool = useMemo(() => {
    return [
      ...incidents,
      ...starredIncidentsPool,
      ...sentEmails,
      ...draftEmails,
      ...trashEmails,
    ];
  }, [incidents, starredIncidentsPool, sentEmails, draftEmails, trashEmails]);

  // Selected Active Incidents
  const activeInboxIncident = selectedIncidentId
    ? allFolderPool.find((i) => i.id === selectedIncidentId) || null
    : null;

  const activeSpamIncident =
    spamEmails.find((i) => i.id === selectedSpamId) || spamEmails[0] || incidents[0];

  const currentIncidentForWorkbench =
    selectedIncidentId && allFolderPool.find((i) => i.id === selectedIncidentId)
      ? allFolderPool.find((i) => i.id === selectedIncidentId)!
      : activeSpamIncident;

  // Star toggle handler
  const handleToggleStar = (id: string) => {
    setStarredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showNotification('Removed from Starred');
      } else {
        next.add(id);
        showNotification('Marked as Starred');
      }
      return next;
    });
  };

  // Delete email handler (moves from active folder to Trash)
  const handleDeleteEmail = (id: string) => {
    const target = allFolderPool.find((e) => e.id === id);
    if (!target) return;

    // Remove from current folders
    setIncidents((prev) => prev.filter((e) => e.id !== id));
    setSentEmails((prev) => prev.filter((e) => e.id !== id));
    setDraftEmails((prev) => prev.filter((e) => e.id !== id));

    // Add to trash if not already in trash
    setTrashEmails((prev) => {
      if (prev.some((e) => e.id === id)) return prev;
      return [target, ...prev];
    });

    showNotification(`Moved "${target.subject.slice(0, 30)}..." to Trash`);
  };

  const isLight = theme === 'light';
  const isCyber = theme === 'cyber';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isLight
          ? 'bg-[#f6f8fc] text-[#1f1f1f]'
          : isCyber
          ? 'bg-[#000000] text-[#E5E7EB]'
          : 'bg-[#000000] text-[#FFFFFF]'
      }`}
    >
      {/* App Opening Starter Animation */}
      {isStarterActive && (
        <AppStarterAnimation
          onComplete={() => setIsStarterActive(false)}
          userEmail={userEmail}
        />
      )}

      {/* Optional Hacker Bytecode Rain (activated in Cyber mode) */}
      {isCyber && (
        <ByteCodeRainBackground
          opacity={0.18}
          speed={1.0}
          theme="matrix"
        />
      )}

      {/* Gmail Top Search & Profile Header */}
      <GmailHeader
        userEmail={userEmail}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onOpenIngest={() => setIngestModalOpen(true)}
        maskPii={maskPii}
        onToggleMaskPii={() => setMaskPii(!maskPii)}
        blockCount={blocks.length - 1}
        theme={theme}
        onThemeChange={setTheme}
        cleanEmailCount={cleanEmails.length}
        spamEmailCount={spamEmails.length}
      />

      {/* Notification Toast Alert */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-gray-900 text-white shadow-2xl border border-gray-700 text-xs font-medium">
            <span className="h-2 w-2 rounded-full bg-green-400"></span>
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Main Layout: Sidebar + Working View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Gmail Navigation Sidebar */}
        <GmailSidebar
          isOpen={sidebarOpen}
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            setSelectedIncidentId(null);
            if (typeof window !== 'undefined' && window.innerWidth < 768) {
              setSidebarOpen(false);
            }
          }}
          inboxCount={cleanEmails.length}
          spamCount={spamEmails.length}
          starredCount={starredEmails.length}
          sentCount={sentEmails.length}
          draftsCount={draftEmails.length}
          trashCount={trashEmails.length}
          theme={theme}
          onOpenIngest={() => setIngestModalOpen(true)}
          userEmail={userEmail}
        />

        {/* Content Canvas */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 min-w-0">
          <div className="max-w-7xl mx-auto space-y-4">
            {/* 1. EMAIL FOLDER VIEWS (Inbox, Starred, Sent, Drafts, Trash) */}
            {(activeTab === 'inbox' || activeTab === 'starred' || activeTab === 'sent' || activeTab === 'drafts' || activeTab === 'trash') && (
              <GmailInboxView
                folderType={activeTab as MailFolderCategory}
                incidents={
                  activeTab === 'inbox'
                    ? filteredCleanEmails
                    : activeTab === 'starred'
                    ? filteredStarredEmails
                    : activeTab === 'sent'
                    ? filteredSentEmails
                    : activeTab === 'drafts'
                    ? filteredDraftEmails
                    : filteredTrashEmails
                }
                selectedIncident={activeInboxIncident}
                onSelectIncident={(inc) => setSelectedIncidentId(inc ? inc.id : null)}
                onMoveToSpam={handleMoveToSpam}
                onInspectForensics={handleInspectForensics}
                theme={theme}
                userEmail={userEmail}
                starredIds={starredIds}
                onToggleStar={handleToggleStar}
                onDeleteEmail={handleDeleteEmail}
              />
            )}

            {/* 2. SPAM VIEW (Requested menu bar option to display spam mail forensic details collected & location) */}
            {activeTab === 'spam' && (
              <SpamForensicsView
                spamIncidents={filteredSpamEmails}
                selectedIncident={activeSpamIncident}
                onSelectIncident={(inc) => setSelectedSpamId(inc.id)}
                onQuarantine={handleQuarantine}
                onBlockIp={handleBlockIp}
                onGenerateReport={handleOpenReport}
                theme={theme}
                userEmail={userEmail}
                maskPii={maskPii}
              />
            )}

            {/* 3. ABOUT OPTION - Houses all details and modules under Forensic Engine */}
            {activeTab === 'about' && (
              <AboutForensicEngine
                theme={theme}
                userEmail={userEmail}
                incidents={incidents}
                currentIncident={currentIncidentForWorkbench}
                blocks={blocks}
                nodes={nodes}
                maskPii={maskPii}
                onQuarantine={handleQuarantine}
                onBlockIp={handleBlockIp}
                onGenerateReport={handleOpenReport}
                onExecuteMitigationAction={handleExecuteMitigationAction}
                onBroadcastIOC={handleBroadcastIOC}
                onMineBlock={handleMineBlock}
                onSelectIncidentForSpam={(id) => {
                  setSelectedSpamId(id);
                  setActiveTab('spam');
                }}
                onSelectIncidentForInbox={(id) => {
                  setSelectedIncidentId(id);
                  setActiveTab('inbox');
                }}
                onNotification={showNotification}
                onOpenReportModal={(inc) => {
                  setReportIncident(inc);
                  setReportModalOpen(true);
                }}
              />
            )}

            {/* 4. THREAT DASHBOARD (Preserving full original architecture & world map) */}
            {activeTab === 'dashboard' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2 text-xs font-semibold text-gray-500">
                  <span>ENTERPRISE THREAT INTELLIGENCE DASHBOARD</span>
                  <button
                    onClick={() => setActiveTab('spam')}
                    className="text-red-600 hover:underline flex items-center gap-1"
                  >
                    View Spam Quarantine &rarr;
                  </button>
                </div>
                <DashboardOverview
                  incidents={incidents}
                  onSelectIncident={(inc) => {
                    if (inc.threatSeverity !== 'benign') {
                      setSelectedSpamId(inc.id);
                      setActiveTab('spam');
                    } else {
                      setSelectedIncidentId(inc.id);
                      setActiveTab('inbox');
                    }
                  }}
                  selectedIncident={currentIncidentForWorkbench}
                  onSelectGeo={(geo) => {
                    const matched = incidents.find((i) => i.originatingGeo.ip === geo.ip);
                    if (matched) {
                      setSelectedSpamId(matched.id);
                      setActiveTab('spam');
                    }
                  }}
                  blockchainHeight={blocks.length}
                />
              </div>
            )}

            {/* 4. FORENSIC WORKBENCH (Deep protocol & header inspector) */}
            {activeTab === 'analyzer' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2 text-xs font-semibold text-gray-500">
                  <span>DEEP FORENSIC WORKBENCH</span>
                  <button
                    onClick={() => setActiveTab('inbox')}
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    &larr; Back to Inbox
                  </button>
                </div>
                <EmailAnalyzer
                  incident={currentIncidentForWorkbench}
                  onQuarantine={handleQuarantine}
                  onBlockIp={handleBlockIp}
                  onGenerateReport={handleOpenReport}
                  maskPii={maskPii}
                  theme={theme}
                />
              </div>
            )}

            {/* 5. SOAR MITIGATION CENTER */}
            {activeTab === 'mitigation' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2 text-xs font-semibold text-gray-500">
                  <span>SOAR AUTOMATED DEFENSE & FIREWALL CENTER</span>
                  <span className="font-mono text-xs text-green-600">Smart Contract: Active</span>
                </div>
                <MitigationCenter
                  incidents={incidents}
                  onExecuteAction={handleExecuteMitigationAction}
                  onBroadcastIOC={handleBroadcastIOC}
                  theme={theme}
                />
              </div>
            )}

            {/* 6. THREAT BLOCKCHAIN LEDGER */}
            {activeTab === 'blockchain' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2 text-xs font-semibold text-gray-500">
                  <span>POA CONSORTIUM BLOCKCHAIN EVIDENCE REPOSITORY</span>
                  <span className="font-mono text-xs text-green-600">Height: #{blocks.length - 1}</span>
                </div>
                <BlockchainLedgerView
                  blocks={blocks}
                  nodes={nodes}
                  onNavigateToIncident={(caseNum) => {
                    const matched = incidents.find((i) => i.caseNumber === caseNum);
                    if (matched) {
                      if (matched.threatSeverity !== 'benign') {
                        setSelectedSpamId(matched.id);
                        setActiveTab('spam');
                      } else {
                        setSelectedIncidentId(matched.id);
                        setActiveTab('inbox');
                      }
                    }
                  }}
                  onMineBlock={handleMineBlock}
                  theme={theme}
                />
              </div>
            )}

            {/* 7. SMART CONTRACTS VIEW */}
            {activeTab === 'smart_contracts' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2 text-xs font-semibold text-gray-500">
                  <span>AUDITED DEPLOYED DEFENSE SMART CONTRACTS</span>
                  <span className="font-mono text-xs text-blue-600">Solidity v0.8.20</span>
                </div>
                <SmartContractsView incidents={incidents} theme={theme} />
              </div>
            )}

            {/* 8. COGNITIVE THREAT MODEL TRAINING STUDIO */}
            {activeTab === 'training' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2 text-xs font-semibold text-gray-500">
                  <span>COGNITIVE THREAT MODEL TRAINING & DATASET STUDIO</span>
                  <span className="font-mono text-xs text-blue-600">Gemini 3.6 Flash Calibration</span>
                </div>
                <ModelTrainingStudio
                  theme={theme}
                  onNotification={showNotification}
                />
              </div>
            )}

            {/* 9. ALGORITHM & MODEL PROCESS VISUALIZER */}
            {activeTab === 'process_flow' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2 text-xs font-semibold text-gray-500">
                  <span>END-TO-END COGNITIVE ALGORITHM & DATA PIPELINE FLOW</span>
                  <span className="font-mono text-xs text-emerald-600">Active RFC/NLP/PoA Pipeline</span>
                </div>
                <ModelProcessVisualizer
                  theme={theme}
                  incidents={incidents}
                  onInspectIncident={(inc) => {
                    setReportIncident(inc);
                    setReportModalOpen(true);
                  }}
                />
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Forensic Report Modal */}
      {reportModalOpen && (
        <ForensicReportModal
          incident={reportIncident}
          onClose={() => setReportModalOpen(false)}
        />
      )}

      {/* Live Ingest Modal */}
      {ingestModalOpen && (
        <LiveIngestModal
          onClose={() => setIngestModalOpen(false)}
          onIngestSuccess={handleIngestSuccess}
        />
      )}
    </div>
  );
}
