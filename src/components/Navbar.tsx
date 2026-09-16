import React from 'react';
import { 
  Briefcase, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Users, 
  Layers, 
  CheckSquare, 
  FileText, 
  AlertCircle,
  BarChart3,
  Network,
  DollarSign,
  Landmark,
  MessageSquare
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab?: (tab: string) => void;
  onSelectTab?: (tab: string) => void;
  currentDay: number;
  totalDays: number;
  approvedDeliverables: number;
  totalDeliverables: number;
  openActionCount?: number;
  activeIssueCount?: number;
  activeConsultationsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onSelectTab,
  currentDay,
  totalDays,
  approvedDeliverables,
  totalDeliverables,
  openActionCount,
  activeIssueCount,
  activeConsultationsCount,
}) => {
  const handleTabClick = (tabId: string) => {
    if (setActiveTab) setActiveTab(tabId);
    if (onSelectTab) onSelectTab(tabId);
  };

  const navItems = [
    { id: 'overview', label: 'PIP Overview & Schedule', icon: Calendar },
    { id: 'wbs', label: 'Work Breakdown (WBS)', icon: Layers },
    { id: 'deliverables', label: 'Deliverables D1-D8', icon: CheckSquare },
    { id: 'milestones', label: 'Payment Milestones', icon: DollarSign },
    { id: 'interfaces', label: 'External Interfaces', icon: Network },
    { id: 'consultations', label: 'Public Consultation', icon: MessageSquare, badge: activeConsultationsCount || 2 },
    { id: 'communication', label: 'Communication Matrix', icon: Users },
    { id: 'meetings', label: 'Meetings & Actions', icon: Clock, badge: openActionCount },
    { id: 'governance', label: 'Decisions & Escalation', icon: AlertCircle, badge: activeIssueCount },
    { id: 'kpis', label: 'KPIs & Health', icon: BarChart3 },
    { id: 'documents', label: 'Formal PIP Document', icon: FileText },
  ];

  const progressPercent = Math.round((currentDay / totalDays) * 100);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-lg shadow-xs">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200">
                MoA & UNZA 50-Day Contract
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                TECH-4 Auditable
              </span>
            </div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-snug">
              E-SAPP Web-Enabled MIS — Project Implementation Plan
            </h1>
          </div>
        </div>

        {/* Schedule & Deliverable Badges */}
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-lg flex items-center gap-3">
            <div className="text-right">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Schedule Burn-Down</div>
              <div className="text-sm font-bold text-slate-900">
                Day {currentDay} <span className="text-xs font-normal text-slate-500">of {totalDays}</span>
              </div>
            </div>
            <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="bg-emerald-50/80 border border-emerald-200/80 px-3.5 py-1.5 rounded-lg">
            <div className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">Gate Sign-offs</div>
            <div className="text-sm font-bold text-emerald-950">
              {approvedDeliverables} / {totalDeliverables} <span className="text-xs font-normal text-emerald-800">Approved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 overflow-x-auto py-1 scrollbar-none" aria-label="Tabs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                onClick={() => handleTabClick(item.id)}
                className={`whitespace-nowrap flex items-center gap-2 py-2.5 px-3 rounded-md text-xs font-semibold transition-colors duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-white text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
