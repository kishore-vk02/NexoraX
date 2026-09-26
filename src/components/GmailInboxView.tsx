import React, { useState } from 'react';
import { EmailIncident } from '../types';
import {
  ArrowLeft,
  Star,
  Trash2,
  AlertOctagon,
  Mail,
  MailOpen,
  RotateCw,
  MoreVertical,
  Reply,
  Forward,
  Paperclip,
  Download,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Layers,
  Search,
  Tag,
  Inbox,
  Clock,
  ExternalLink,
  Send,
  FileText,
  Sparkles,
} from 'lucide-react';

export type MailFolderCategory = 'inbox' | 'starred' | 'sent' | 'drafts' | 'trash';

interface GmailInboxViewProps {
  folderType?: MailFolderCategory;
  incidents: EmailIncident[];
  selectedIncident: EmailIncident | null;
  onSelectIncident: (inc: EmailIncident | null) => void;
  onMoveToSpam: (id: string) => void;
  onInspectForensics: (inc: EmailIncident) => void;
  theme: 'light' | 'dark' | 'cyber';
  userEmail: string;
  starredIds: Set<string>;
  onToggleStar: (id: string) => void;
  onDeleteEmail?: (id: string) => void;
}

export const GmailInboxView: React.FC<GmailInboxViewProps> = ({
  folderType = 'inbox',
  incidents,
  selectedIncident,
  onSelectIncident,
  onMoveToSpam,
  onInspectForensics,
  theme,
  userEmail,
  starredIds,
  onToggleStar,
  onDeleteEmail,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'primary' | 'social' | 'updates'>('primary');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const isLight = theme === 'light';
  const isCyber = theme === 'cyber';

  const toggleSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === incidents.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(incidents.map((i) => i.id)));
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return isoString;
    }
  };

  const formatFullDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  // Folder meta definitions
  const folderTitles: Record<MailFolderCategory, { title: string; subtitle: string; icon: any; color: string }> = {
    inbox: {
      title: 'Inbox',
      subtitle: `Primary incoming stream for ${userEmail}`,
      icon: Inbox,
      color: 'text-blue-600 dark:text-blue-400',
    },
    starred: {
      title: 'Starred',
      subtitle: 'Key flagged communications and security alerts',
      icon: Star,
      color: 'text-amber-500',
    },
    sent: {
      title: 'Sent',
      subtitle: `Outbound dispatches from ${userEmail}`,
      icon: Send,
      color: 'text-emerald-600 dark:text-emerald-400',
    },
    drafts: {
      title: 'Drafts',
      subtitle: 'Unsent communications and security petitions',
      icon: FileText,
      color: 'text-purple-600 dark:text-purple-400',
    },
    trash: {
      title: 'Trash & Quarantined',
      subtitle: 'Discarded messages and expired OTP verification codes',
      icon: Trash2,
      color: 'text-rose-600 dark:text-rose-400',
    },
  };

  const currentFolder = folderTitles[folderType] || folderTitles.inbox;
  const FolderIcon = currentFolder.icon;

  // Filter incidents for updates sub-tab if in inbox
  const displayedIncidents = React.useMemo(() => {
    if (folderType !== 'inbox') return incidents;
    if (activeSubTab === 'updates') {
      return incidents.filter((inc) =>
        inc.subject.toLowerCase().includes('update') ||
        inc.subject.toLowerCase().includes('statement') ||
        inc.subject.toLowerCase().includes('linear') ||
        inc.subject.toLowerCase().includes('cloudflare') ||
        inc.subject.toLowerCase().includes('docker')
      );
    }
    return incidents;
  }, [folderType, incidents, activeSubTab]);

  // If an email is selected, display Gmail reading view
  if (selectedIncident) {
    const isThisStarred = starredIds.has(selectedIncident.id);
    const isDraft = folderType === 'drafts' || selectedIncident.id.startsWith('inc-draft');
    const isSent = folderType === 'sent' || selectedIncident.id.startsWith('inc-sent');

    return (
      <div
        id="gmail-reading-pane"
        className={`rounded-2xl border shadow-xs overflow-hidden flex flex-col min-h-[600px] ${
          isLight
            ? 'bg-white border-[#e5e7eb] text-[#1f1f1f]'
            : isCyber
            ? 'bg-[#0A0A0F] border-[#00FF41]/30 text-[#E5E7EB]'
            : 'bg-[#000000] border-[#686B6C] text-[#FFFFFF]'
        }`}
      >
        {/* Top Reading Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectIncident(null)}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 transition-colors"
              title={`Back to ${currentFolder.title}`}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-700 mx-1"></div>
            
            <button
              onClick={() => onToggleStar(selectedIncident.id)}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-500 hover:text-amber-500 transition-colors"
              title={isThisStarred ? 'Unstar' : 'Star message'}
            >
              <Star
                className={`h-4.5 w-4.5 ${
                  isThisStarred ? 'fill-amber-400 text-amber-400' : ''
                }`}
              />
            </button>

            {!isDraft && !isSent && (
              <button
                onClick={() => onMoveToSpam(selectedIncident.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors"
                title="Report suspicious and move to Spam"
              >
                <AlertOctagon className="h-3.5 w-3.5" />
                <span>Report as Spam</span>
              </button>
            )}

            {onDeleteEmail && (
              <button
                onClick={() => {
                  onDeleteEmail(selectedIncident.id);
                  onSelectIncident(null);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
                title="Delete message"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete</span>
              </button>
            )}

            <button
              onClick={() => onInspectForensics(selectedIncident)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
              title="Open Technical Forensic Workbench"
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Inspect Technical Forensics</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="font-medium capitalize px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
              {currentFolder.title}
            </span>
            <span className="font-mono">Case: {selectedIncident.caseNumber}</span>
          </div>
        </div>

        {/* Email Header */}
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className={`text-xl font-bold tracking-tight ${isLight ? 'text-gray-900' : 'text-white'}`}>
              {selectedIncident.subject}
            </h1>
            <div className="flex items-center gap-2">
              {isDraft ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-950/40 dark:border-purple-800 dark:text-purple-300">
                  <FileText className="h-3.5 w-3.5 text-purple-600" />
                  <span>Draft in Local Buffer</span>
                </span>
              ) : isSent ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300">
                  <Send className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Signed & Dispatched</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/40 dark:border-green-800 dark:text-green-300">
                  <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
                  <span>Verified Delivery</span>
                </span>
              )}
            </div>
          </div>

          {/* Sender & Recipient Information */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full font-bold flex items-center justify-center text-sm shadow-xs ${
                isSent
                  ? 'bg-gradient-to-tr from-emerald-600 to-teal-600 text-white'
                  : isDraft
                  ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 text-white'
                  : 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white'
              }`}>
                {selectedIncident.senderDisplay.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`font-semibold text-sm ${isLight ? 'text-gray-900' : 'text-white'}`}>
                    {selectedIncident.senderDisplay}
                  </span>
                  <span className={`text-xs font-mono ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                    &lt;{selectedIncident.senderAddress}&gt;
                  </span>
                </div>
                <div className={`text-xs flex items-center gap-1 ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                  <span>to:</span>
                  <span className="font-medium text-blue-600 font-mono">
                    {selectedIncident.recipientAddress}
                  </span>
                </div>
              </div>
            </div>

            <div className={`text-right text-xs ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
              <div>{formatFullDate(selectedIncident.receivedAt)}</div>
              <div className="text-[11px] text-green-600 flex items-center justify-end gap-1 mt-0.5">
                <Lock className="h-3 w-3" /> Standard TLS 1.3 Encryption
              </div>
            </div>
          </div>
        </div>

        {/* Email Body Content */}
        <div className="px-6 py-6 flex-1 space-y-6">
          <div className={`max-w-none text-sm leading-relaxed whitespace-pre-wrap font-sans ${
            isLight ? 'text-gray-800 font-normal' : 'text-gray-200'
          }`}>
            {selectedIncident.bodyText}
          </div>

          {/* Attachments (if any) */}
          {selectedIncident.attachments && selectedIncident.attachments.length > 0 && (
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
              <div className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                <Paperclip className="h-3.5 w-3.5" />
                <span>Attachments ({selectedIncident.attachments.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedIncident.attachments.map((att, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-medium truncate">{att.filename}</div>
                      <div className="text-[10px] text-gray-500 font-mono">
                        {att.filesize} • {att.filetype}
                      </div>
                    </div>
                    <button
                      className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600"
                      title="Download attachment"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Email Footer Quick Actions */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/40 border-t border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {isDraft ? (
              <button className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-full text-xs font-medium transition-colors shadow-xs">
                <Send className="h-3.5 w-3.5" />
                <span>Continue Editing & Dispatch</span>
              </button>
            ) : (
              <>
                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-xs font-medium transition-colors shadow-xs">
                  <Reply className="h-3.5 w-3.5" />
                  <span>Reply</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-xs font-medium transition-colors shadow-xs">
                  <Forward className="h-3.5 w-3.5" />
                  <span>Forward</span>
                </button>
              </>
            )}
          </div>

          <div className="text-xs text-gray-500">
            Authenticated as <span className="font-mono font-medium">{userEmail}</span>
          </div>
        </div>
      </div>
    );
  }

  // Regular List View (Inbox, Starred, Sent, Drafts, Trash)
  return (
    <div
      id={`gmail-${folderType}-view`}
      className={`rounded-2xl border shadow-xs overflow-hidden flex flex-col min-h-[540px] ${
        isLight
          ? 'bg-white border-[#e5e7eb] text-[#1f1f1f]'
          : isCyber
          ? 'bg-[#0A0A0F] border-[#00FF41]/30 text-[#E5E7EB]'
          : 'bg-[#000000] border-[#686B6C] text-[#FFFFFF]'
      }`}
    >
      {/* Folder Header Bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-[#686B6C] bg-gray-50/50 dark:bg-[#000000]">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl bg-gray-100 dark:bg-[#000000] dark:border dark:border-[#686B6C] ${currentFolder.color}`}>
            <FolderIcon className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold tracking-tight capitalize">{currentFolder.title}</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-[#686B6C]/40 text-blue-800 dark:text-[#FFFFFF] font-semibold">
                {displayedIncidents.length}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-[#686B6C]">{currentFolder.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-[#686B6C]/30 text-gray-500 dark:text-[#686B6C] transition-colors"
            title="Refresh"
          >
            <RotateCw className="h-4 w-4" />
          </button>
          <div className="text-xs text-gray-500 dark:text-[#686B6C] font-medium hidden sm:block">
            Mailbox: <span className="font-mono text-blue-600 dark:text-[#FFFFFF]">{userEmail}</span>
          </div>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={selectedIds.size > 0 && selectedIds.size === displayedIncidents.length}
            onChange={toggleSelectAll}
            className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4 cursor-pointer"
            title="Select all"
          />
          <span className="text-xs text-gray-500">
            {selectedIds.size > 0 ? `${selectedIds.size} selected` : 'Select'}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>{displayedIncidents.length} {folderType === 'drafts' ? 'drafts' : 'conversations'}</span>
        </div>
      </div>

      {/* Inbox sub-tabs: Primary / Updates */}
      {folderType === 'inbox' && (
        <div className="flex items-center border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setActiveSubTab('primary')}
            className={`flex items-center gap-3 px-6 py-3 text-sm font-semibold border-b-2 transition-colors ${
              activeSubTab === 'primary'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-black/5'
            }`}
          >
            <Inbox className="h-4 w-4" />
            <span>Primary</span>
            <span className="text-xs px-1.5 py-0.2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
              {incidents.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('updates')}
            className={`flex items-center gap-3 px-6 py-3 text-sm font-semibold border-b-2 transition-colors ${
              activeSubTab === 'updates'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-black/5'
            }`}
          >
            <Tag className="h-4 w-4" />
            <span>Updates & Dev Alerts</span>
          </button>
        </div>
      )}

      {/* Email List Rows */}
      <div className="divide-y divide-gray-100 dark:divide-gray-800 flex-1">
        {displayedIncidents.length === 0 ? (
          <div className="p-16 text-center text-gray-500 space-y-3">
            <FolderIcon className="h-10 w-10 mx-auto text-gray-400 stroke-1" />
            <div className="text-base font-semibold">No {currentFolder.title.toLowerCase()} found</div>
            <div className="text-xs max-w-md mx-auto">
              {folderType === 'starred'
                ? 'You can star important communications in your Inbox to keep them organized here.'
                : folderType === 'drafts'
                ? 'Work-in-progress emails will automatically be saved to your drafts.'
                : folderType === 'sent'
                ? 'Messages sent from this account will be recorded here.'
                : 'Your messages in this folder are clean and up to date.'}
            </div>
          </div>
        ) : (
          displayedIncidents.map((inc) => {
            const isStarred = starredIds.has(inc.id);
            const isChecked = selectedIds.has(inc.id);
            const isDraft = folderType === 'drafts' || inc.id.startsWith('inc-draft');
            const isSent = folderType === 'sent' || inc.id.startsWith('inc-sent');

            return (
              <div
                key={inc.id}
                onClick={() => onSelectIncident(inc)}
                className={`group flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors text-sm ${
                  isChecked
                    ? 'bg-blue-50/70 dark:bg-[#686B6C]/30'
                    : isLight
                    ? 'hover:bg-[#f2f6fc]'
                    : isCyber
                    ? 'hover:bg-[#00FF41]/10 font-mono'
                    : 'hover:bg-[#686B6C]/20 text-[#FFFFFF]'
                }`}
              >
                {/* Row Checkbox & Star */}
                <div className="flex items-center gap-2.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => toggleSelect(inc.id, e as any)}
                    className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4 cursor-pointer"
                  />
                  <button
                    onClick={() => onToggleStar(inc.id)}
                    className="text-gray-400 hover:text-amber-500 transition-colors p-0.5"
                    title={isStarred ? 'Unstar' : 'Star message'}
                  >
                    <Star
                      className={`h-4.5 w-4.5 ${
                        isStarred ? 'fill-amber-400 text-amber-400' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Sender Display or Recipient (for Sent/Drafts) */}
                <div
                  className={`w-44 sm:w-52 shrink-0 truncate font-semibold ${
                    isLight ? 'text-gray-900' : isCyber ? 'text-[#00FF41]' : 'text-white'
                  }`}
                >
                  {isSent ? (
                    <span className={isLight ? 'text-gray-700' : 'text-gray-300'}>To: {inc.recipientAddress}</span>
                  ) : isDraft ? (
                    <span className="text-purple-600 dark:text-purple-400 font-bold">Draft</span>
                  ) : (
                    inc.senderDisplay
                  )}
                </div>

                {/* Subject & Preview Snippet */}
                <div className="flex-1 min-w-0 flex items-center gap-2 truncate">
                  <span
                    className={`font-semibold truncate ${
                      isLight ? 'text-gray-900' : 'text-white'
                    }`}
                  >
                    {inc.subject}
                  </span>
                  <span className={`${isLight ? 'text-gray-400' : 'text-gray-500'} select-none font-medium`}>-</span>
                  <span
                    className={`truncate text-xs ${
                      isLight ? 'text-gray-600 font-normal' : isCyber ? 'text-gray-300' : 'text-gray-400'
                    }`}
                  >
                    {inc.bodyText.replace(/\n/g, ' ')}
                  </span>
                </div>

                {/* Status Badges */}
                <div className="hidden md:flex items-center gap-1.5 shrink-0">
                  {isDraft ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-950/40 dark:border-purple-800 dark:text-purple-300">
                      <FileText className="h-3 w-3 text-purple-600" />
                      <span>Draft</span>
                    </span>
                  ) : isSent ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300">
                      <Send className="h-3 w-3 text-emerald-600" />
                      <span>Sent</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/40 dark:border-green-800 dark:text-green-300">
                      <ShieldCheck className="h-3 w-3 text-green-600" />
                      <span>SPF & DKIM</span>
                    </span>
                  )}
                </div>

                {/* Date */}
                <div
                  className={`w-20 shrink-0 text-right text-xs group-hover:hidden ${
                    isLight ? 'text-gray-600 font-medium' : 'text-gray-400'
                  }`}
                >
                  {formatDate(inc.receivedAt)}
                </div>

                {/* Hover Actions */}
                <div
                  className="hidden group-hover:flex items-center gap-1 shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  {onDeleteEmail && (
                    <button
                      onClick={() => onDeleteEmail(inc.id)}
                      title="Delete"
                      className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 hover:text-rose-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                  {!isDraft && !isSent && (
                    <button
                      onClick={() => onMoveToSpam(inc.id)}
                      title="Mark as Spam"
                      className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 hover:text-red-600"
                    >
                      <AlertOctagon className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => onInspectForensics(inc)}
                    title="View Technical Forensics"
                    className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 hover:text-blue-600"
                  >
                    <Layers className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
