import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Calendar, 
  ShieldAlert, 
  FileCheck, 
  ArrowRight,
  Database,
  MapPin,
  FileSpreadsheet,
  AlertTriangle,
  Network,
  DollarSign,
  AlertOctagon,
  RefreshCw,
  Layers
} from 'lucide-react';
import { DeliverableItem, ProjectKPIs, ExternalInterface, PaymentMilestone } from '../types';

interface ProjectOverviewProps {
  kpis: ProjectKPIs;
  deliverables: DeliverableItem[];
  interfaces?: ExternalInterface[];
  milestones?: PaymentMilestone[];
  setActiveTab: (tab: string) => void;
  onOpenDeliverable: (d: DeliverableItem) => void;
}

export const ProjectOverview: React.FC<ProjectOverviewProps> = ({
  kpis,
  deliverables,
  interfaces = [],
  milestones = [],
  setActiveTab,
  onOpenDeliverable,
}) => {
  const nextDeliverable = deliverables.find(d => d.status === 'Under Review' || d.status === 'In Progress') || deliverables[3];

  const certifiedMilestones = milestones.filter(m => m.status === 'Certified');
  const certifiedAmount = certifiedMilestones.reduce((acc, m) => acc + m.amountZMW, 0);
  const totalAmount = 500000;
  const certifiedPct = (certifiedAmount / totalAmount) * 100;

  return (
    <div className="space-y-8">
      {/* Top Banner: Project Context & Contractual Basis */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-2.5 py-1 rounded border border-emerald-500/30 uppercase tracking-wider">
                E-SAPP Web-Enabled MIS Proposal
              </span>
              <span className="text-slate-400 text-xs">|</span>
              <span className="text-slate-300 text-xs">Contract Subject: Project Implementation & Communication Plan</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              50-Day Master Schedule & Implementation Control Hub
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Formal, auditable operational framework agreed between the <span className="text-emerald-400 font-semibold">Consultant (UNZA Department of Computer Science)</span> and the <span className="text-emerald-400 font-semibold">Client (Ministry of Agriculture – MoA)</span>. Enforces strict WBS milestones, JCCC governance, PASTEL/Contracts register data integration, and 6-month post-deployment warranty support.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs border border-white/15 p-4 rounded-xl flex items-center gap-6 min-w-[280px]">
            <div>
              <div className="text-xs text-slate-300 uppercase tracking-wider font-medium">Timeline Status</div>
              <div className="text-2xl font-bold text-white mt-0.5">Day {kpis.currentDay} <span className="text-sm font-normal text-slate-300">/ 50 Days</span></div>
              <div className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> On Critical Path Baseline
              </div>
            </div>
            <div className="border-l border-white/20 pl-4">
              <div className="text-xs text-slate-300 uppercase tracking-wider font-medium">Phase</div>
              <div className="text-sm font-bold text-white mt-0.5">Phase 2 & 3</div>
              <div className="text-xs text-slate-300 mt-1">Design & Integration</div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-2xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Schedule Elapsed</span>
            <Calendar className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2">
            {kpis.scheduleProgressPct}%
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-emerald-600 h-full rounded-full" 
              style={{ width: `${kpis.scheduleProgressPct}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-2">24 working days remaining to Go-Live</p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-2xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Deliverable Gates</span>
            <FileCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2">
            {kpis.deliverablesApproved} / {kpis.totalDeliverables}
          </div>
          <div className="text-xs text-emerald-700 font-semibold mt-1">
            D-1, D-2, D-3 100% Signed & Paid
          </div>
          <p className="text-xs text-slate-500 mt-2">D-4 currently under MoA review</p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-2xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Reports & Minutes SLA</span>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-700 mt-2">
            100%
          </div>
          <div className="text-xs text-slate-600 font-medium mt-1">
            Minutes delivered &lt; 24h
          </div>
          <p className="text-xs text-slate-500 mt-2">All 3 weekly meetings documented</p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-2xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Critical Path Risks</span>
            <ShieldAlert className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2 flex items-center gap-2">
            {kpis.openCriticalIssues} <span className="text-xs font-normal text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Active</span>
          </div>
          <div className="text-xs text-slate-600 font-medium mt-1">
            PASTEL encrypted schema delay
          </div>
          <p className="text-xs text-slate-500 mt-2">Level 2 Escalation active</p>
        </div>
      </div>

      {/* 50-Day Visual Schedule & Phase Breakdown */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">50-Day Contractual Timeline & Deliverable Gate Map</h3>
            <p className="text-sm text-slate-500">
              Contract review requirement: protecting the 50-day project schedule through 4 sequential phases and milestone sign-offs.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('wbs')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            Explore Detailed WBS <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Timeline Bar with Markers */}
        <div className="relative pt-8 pb-4">
          {/* Phase Track */}
          <div className="grid grid-cols-50 h-3 rounded-full overflow-hidden bg-slate-100 border border-slate-200">
            {/* Phase 1: Days 1-18 */}
            <div 
              className="bg-emerald-600 h-full col-span-18 relative group" 
              title="Phase 1: Inception & Requirements (Days 1-18)" 
            />
            {/* Phase 2: Days 19-26 */}
            <div 
              className="bg-blue-600 h-full col-span-8 relative group" 
              title="Phase 2: System Architecture & Design (Days 19-26)" 
            />
            {/* Phase 3: Days 27-38 */}
            <div 
              className="bg-amber-500 h-full col-span-12 relative group" 
              title="Phase 3: Core MIS Development & PASTEL Integration (Days 27-38)" 
            />
            {/* Phase 4: Days 39-50 */}
            <div 
              className="bg-purple-600 h-full col-span-12 relative group" 
              title="Phase 4: Testing, Training, Deployment & Handover (Days 39-50)" 
            />
          </div>

          {/* Current Day Pointer */}
          <div 
            className="absolute top-0 flex flex-col items-center -translate-x-1/2 pointer-events-none"
            style={{ left: `${(kpis.currentDay / kpis.totalDays) * 100}%` }}
          >
            <span className="bg-slate-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">
              Today: Day {kpis.currentDay}
            </span>
            <div className="w-0.5 h-7 bg-slate-900 mt-0.5" />
          </div>

          {/* Phase Labels Legend */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-6 pt-4 border-t border-slate-100">
            <div className="flex items-start gap-2.5">
              <div className="w-3 h-3 rounded-full bg-emerald-600 shrink-0 mt-1" />
              <div>
                <div className="text-xs font-bold text-slate-800">Phase 1: Inception & SRS</div>
                <div className="text-[11px] text-slate-500">Days 1 - 18 • D-1, D-2, D-3 (Approved)</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-3 h-3 rounded-full bg-blue-600 shrink-0 mt-1" />
              <div>
                <div className="text-xs font-bold text-slate-800">Phase 2: Architecture & Design</div>
                <div className="text-[11px] text-slate-500">Days 19 - 26 • D-4 Review</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-3 h-3 rounded-full bg-amber-500 shrink-0 mt-1" />
              <div>
                <div className="text-xs font-bold text-slate-800">Phase 3: Core Dev & PASTEL Sync</div>
                <div className="text-[11px] text-slate-500">Days 27 - 38 • D-5 Coded MIS</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-3 h-3 rounded-full bg-purple-600 shrink-0 mt-1" />
              <div>
                <div className="text-xs font-bold text-slate-800">Phase 4: SIT, Training & Handover</div>
                <div className="text-[11px] text-slate-500">Days 39 - 50 • D-6, D-7, D-8</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Section: Immediate Focus & Key Interfaces */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Deliverables Status Strip */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Contract Deliverables (D-1 to D-8)</h3>
              <p className="text-xs text-slate-500">Click any deliverable to view its acceptance checklist & sign-off status.</p>
            </div>
            <button 
              onClick={() => setActiveTab('deliverables')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 cursor-pointer"
            >
              View All Checklists &rarr;
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {deliverables.map((item) => (
              <div 
                key={item.id}
                onClick={() => onOpenDeliverable(item)}
                className="py-3 flex items-center justify-between gap-4 hover:bg-slate-50 px-2 rounded-lg transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-md font-mono text-xs font-bold flex items-center justify-center ${
                    item.status === 'Approved' 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                      : item.status === 'Under Review'
                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                      : item.status === 'In Progress'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {item.code}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 hover:text-emerald-700">
                      {item.title}
                    </h4>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                      <span>Due: Day {item.targetDay}</span>
                      <span>•</span>
                      <span>Payment: {item.paymentPercentage}%</span>
                      <span>•</span>
                      <span className="text-slate-700 font-medium">Lead: {item.leadOwner}</span>
                      {item.supportingOwners && (
                        <>
                          <span>•</span>
                          <span className="text-slate-500">Support: {item.supportingOwners}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                    item.status === 'Approved' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : item.status === 'Under Review'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : item.status === 'In Progress'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-slate-50 text-slate-600 border border-slate-200'
                  }`}>
                    {item.status}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Critical Technical Interfaces & Rules */}
        <div className="space-y-4">
          {/* Active Focus Card */}
          <div className="bg-emerald-900 text-white rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" /> Immediate Deliverable Focus
            </div>
            <h4 className="text-base font-bold text-white leading-snug">
              {nextDeliverable.code}: {nextDeliverable.title}
            </h4>
            <p className="text-xs text-emerald-100 leading-relaxed">
              {nextDeliverable.description}
            </p>
            <div className="pt-2 border-t border-emerald-800 flex items-center justify-between text-xs text-emerald-200">
              <span>Target: Day {nextDeliverable.targetDay}</span>
              <button 
                onClick={() => onOpenDeliverable(nextDeliverable)}
                className="bg-white text-emerald-950 font-bold px-2.5 py-1 rounded hover:bg-emerald-50 text-xs transition-colors cursor-pointer"
              >
                Inspect Checklist
              </button>
            </div>
          </div>

          {/* External Systems Interface Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Network className="w-4 h-4 text-emerald-700" /> External Systems Interfaces
              </h4>
              <button
                onClick={() => setActiveTab('interfaces')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 cursor-pointer"
              >
                Inspect All &rarr;
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600">
              {interfaces.length > 0 ? (
                interfaces.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => setActiveTab('interfaces')}
                    className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100/70 transition-colors cursor-pointer"
                  >
                    <div className="font-bold text-slate-800 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Database className="w-3.5 h-3.5 text-slate-500" />
                        {item.name}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-mono font-semibold">
                          {item.protocol}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                          item.status === 'Blocked' 
                            ? 'bg-red-100 text-red-800' 
                            : item.status === 'Testing' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                    <p className="mt-1 text-slate-500 leading-tight line-clamp-2">{item.purpose}</p>
                  </div>
                ))
              ) : (
                <>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="font-bold text-slate-800 flex items-center justify-between">
                      <span>PASTEL Financial System</span>
                      <span className="text-[10px] bg-red-100 text-red-800 px-1.5 py-0.5 rounded font-semibold">Blocked (ODBC)</span>
                    </div>
                    <p className="mt-1 text-slate-500">Automated synchronization of financial commitments, vouchers and agronomist grant disbursements.</p>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="font-bold text-slate-800 flex items-center justify-between">
                      <span>SAPP Contracts Register</span>
                      <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-semibold">Testing (API Bridge)</span>
                    </div>
                    <p className="mt-1 text-slate-500">Bidirectional exchange of agricultural contract status, vendor performance, and milestone sign-offs.</p>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="font-bold text-slate-800 flex items-center justify-between">
                      <span>GIS Spatial Data Layers</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-semibold">Connected (GeoJSON)</span>
                    </div>
                    <p className="mt-1 text-slate-500">Geocoded coordinates for 10 Zambian provinces, district camps, and smallholder farmer groups.</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Core Contract Rule Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <FileSpreadsheet className="w-4 h-4 text-emerald-700" /> Contract Review Golden Rule
            </div>
            <p className="text-slate-600 italic leading-relaxed">
              &ldquo;Any verbal decision or instruction must be confirmed by email or recorded in formal meeting minutes within 24 hours to have contractual validity.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
