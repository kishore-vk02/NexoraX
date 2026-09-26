import React from 'react';
import {
  Inbox,
  Star,
  Send,
  FileText,
  AlertOctagon,
  Trash2,
  Activity,
  Layers,
  ShieldCheck,
  Blocks,
  Code,
  Plus,
  ShieldAlert,
  HardDrive,
  Globe,
  Lock,
  Brain,
  Workflow,
  Info,
} from 'lucide-react';

export type GmailNavigationTab =
  | 'inbox'
  | 'starred'
  | 'sent'
  | 'drafts'
  | 'spam'
  | 'trash'
  | 'about'
  | 'dashboard'
  | 'analyzer'
  | 'mitigation'
  | 'blockchain'
  | 'smart_contracts'
  | 'training'
  | 'process_flow';

interface GmailSidebarProps {
  isOpen: boolean;
  activeTab: GmailNavigationTab;
  onSelectTab: (tab: GmailNavigationTab) => void;
  inboxCount: number;
  spamCount: number;
  starredCount: number;
  sentCount?: number;
  draftsCount?: number;
  trashCount?: number;
  theme: 'light' | 'dark' | 'cyber';
  onOpenIngest: () => void;
  userEmail: string;
}

export const GmailSidebar: React.FC<GmailSidebarProps> = ({
  isOpen,
  activeTab,
  onSelectTab,
  inboxCount,
  spamCount,
  starredCount,
  sentCount,
  draftsCount,
  trashCount,
  theme,
  onOpenIngest,
  userEmail,
}) => {
  const isLight = theme === 'light';
  const isCyber = theme === 'cyber';

  const mainMailItems = [
    {
      id: 'inbox' as const,
      label: 'Inbox',
      icon: Inbox,
      count: inboxCount,
      badgeColor: 'bg-[#0b57d0] text-white',
    },
    {
      id: 'starred' as const,
      label: 'Starred',
      icon: Star,
      count: starredCount > 0 ? starredCount : undefined,
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200',
    },
    {
      id: 'sent' as const,
      label: 'Sent',
      icon: Send,
      count: sentCount !== undefined && sentCount > 0 ? sentCount : undefined,
      badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200',
    },
    {
      id: 'drafts' as const,
      label: 'Drafts',
      icon: FileText,
      count: draftsCount !== undefined && draftsCount > 0 ? draftsCount : undefined,
      badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200',
    },
    {
      id: 'spam' as const,
      label: 'Spam',
      icon: AlertOctagon,
      count: spamCount,
      badgeColor: 'bg-[#d93025] text-white font-bold',
      isSpamAlert: true,
      description: 'Threat details & location',
    },
    {
      id: 'trash' as const,
      label: 'Trash & Quarantined',
      icon: Trash2,
      count: trashCount !== undefined && trashCount > 0 ? trashCount : undefined,
      badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200',
    },
    {
      id: 'about' as const,
      label: 'About',
      icon: Info,
      badgeColor: 'bg-blue-100 text-blue-800 dark:bg-[#686B6C]/40 dark:text-[#FFFFFF]',
      description: 'About & Forensic Engine',
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay when sidebar drawer is open */}
      {isOpen && (
        <div
          onClick={() => onSelectTab(activeTab)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
          aria-hidden="true"
        />
      )}

      <aside
        id="gmail-sidebar"
        className={`fixed md:relative inset-y-0 left-0 z-50 md:z-auto transition-all duration-300 ease-in-out shrink-0 flex flex-col justify-between select-none ${
          isOpen
            ? 'w-64 sm:w-68 translate-x-0'
            : '-translate-x-full md:translate-x-0 md:w-16 sm:md:w-18'
        } ${
          isLight
            ? 'bg-[#f6f8fc] border-r border-[#e5e7eb] text-[#444746]'
            : isCyber
            ? 'bg-[#0A0A0F] border-r border-[#00FF41]/20 text-[#E5E7EB]'
            : 'bg-[#000000] border-r border-[#686B6C] text-[#FFFFFF]'
        }`}
      >
      <div className="p-3 space-y-4 overflow-y-auto">
        {/* Gmail Compose / Ingest Button */}
        <div className="pt-1">
          <button
            id="sidebar-compose-button"
            onClick={onOpenIngest}
            title="Ingest new raw EML or simulate cyber threat"
            className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 shadow-md hover:shadow-lg transition-all duration-200 font-medium ${
              isOpen ? 'w-full' : 'w-12 h-12 p-0 justify-center mx-auto'
            } ${
              isLight
                ? 'bg-[#c2e7ff] text-[#001d35] hover:bg-[#b3dcf7]'
                : isCyber
                ? 'bg-[#00FF41] text-black hover:bg-[#00e63a] font-mono'
                : 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'
            }`}
          >
            <Plus className="h-5 w-5 shrink-0" />
            {isOpen && <span className="text-sm font-semibold">Ingest Email</span>}
          </button>
        </div>

        {/* Primary Folders List */}
        <nav className="space-y-0.5">
          {mainMailItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isSpam = item.id === 'spam';

            return (
              <button
                key={item.id}
                id={`sidebar-tab-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                title={item.label}
                className={`w-full flex items-center justify-between rounded-r-full py-2.5 px-3 transition-colors ${
                  isActive
                    ? isLight
                      ? isSpam
                        ? 'bg-[#fce8e6] text-[#c5221f] font-semibold'
                        : 'bg-[#d3e3fd] text-[#041e49] font-semibold'
                      : isCyber
                      ? 'bg-[#00FF41]/20 text-[#00FF41] font-mono font-bold'
                      : 'bg-[#686B6C]/40 text-[#FFFFFF] font-semibold border-l-2 border-[#FFFFFF]'
                    : isLight
                    ? 'hover:bg-[#eaedf2] text-[#444746]'
                    : isCyber
                    ? 'hover:bg-[#1A1A24] text-gray-300'
                    : 'hover:bg-[#686B6C]/20 text-[#686B6C] hover:text-[#FFFFFF]'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <Icon
                    className={`h-4.5 w-4.5 shrink-0 ${
                      isSpam
                        ? 'text-[#d93025]'
                        : item.id === 'about'
                        ? 'text-blue-500 dark:text-[#FFFFFF]'
                        : isActive
                        ? isLight
                          ? 'text-[#041e49]'
                          : 'text-[#00FF41]'
                        : 'text-current'
                    }`}
                  />
                  {isOpen && (
                    <div className="flex flex-col text-left">
                      <span className="text-sm truncate">{item.label}</span>
                      {isSpam && (
                        <span className="text-[10px] text-[#d93025] font-normal leading-tight">
                          Threats & Location
                        </span>
                      )}
                      {item.id === 'about' && (
                        <span className="text-[10px] text-gray-500 dark:text-[#686B6C] font-normal leading-tight">
                          About & Forensic Engine
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {isOpen && item.count !== undefined && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      item.badgeColor || (isLight ? 'bg-gray-200 text-gray-800' : 'bg-gray-700 text-gray-200')
                    }`}
                  >
                    {item.count}
                  </span>
                )}
                {isOpen && item.id === 'about' && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold bg-blue-100 text-blue-800 dark:bg-[#686B6C]/40 dark:text-[#FFFFFF]">
                    Engine Specs
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Mailbox Footnote */}
      {isOpen && (
        <div className={`p-3 border-t text-[11px] flex items-center gap-2.5 transition-colors ${
          isLight
            ? 'border-[#e5e7eb] bg-white text-gray-700'
            : isCyber
            ? 'border-[#00FF41]/20 bg-[#0A0A0F] text-gray-300'
            : 'border-[#686B6C] bg-[#000000] text-[#FFFFFF]'
        }`}>
          <img
            src="/app-logo.jpg"
            alt="Evi-Mail Logo"
            className="w-7 h-7 rounded-lg object-cover ring-1 ring-black/10 dark:ring-[#686B6C] shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col min-w-0">
            <div className={`flex items-center gap-1 font-medium truncate ${
              isLight ? 'text-gray-900' : 'text-white'
            }`}>
              <Lock className="h-3 w-3 text-green-500 shrink-0" />
              <span className="truncate">{userEmail}</span>
            </div>
            <div className={`text-[10px] truncate ${
              isLight ? 'text-gray-500' : 'text-[#686B6C]'
            }`}>
              PoA Blockchain & AI Forensics
            </div>
          </div>
        </div>
      )}
    </aside>
  </>
);
};
