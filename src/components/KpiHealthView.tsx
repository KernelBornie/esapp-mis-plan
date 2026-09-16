import React from 'react';
import { 
  BarChart3, 
  CheckCircle2, 
  TrendingUp, 
  Calendar, 
  ShieldCheck, 
  AlertTriangle, 
  Star,
  Download,
  Clock,
  Target
} from 'lucide-react';
import { ProjectKPIs } from '../types';

interface KpiHealthViewProps {
  kpis: ProjectKPIs;
}

export const KpiHealthView: React.FC<KpiHealthViewProps> = ({ kpis }) => {
  const kpiItems = [
    {
      title: 'Weekly Progress Reports Delivered On Time',
      current: `${kpis.weeklyReportsOnTimePct}%`,
      target: '100%',
      isMet: kpis.weeklyReportsOnTimePct >= 100,
      description: 'Submitted every Friday 10:00 CAT prior to client meeting.',
    },
    {
      title: 'Meeting Minutes Issued Within 24 Hours',
      current: `${kpis.meetingMinutesIn24hPct}%`,
      target: '100%',
      isMet: kpis.meetingMinutesIn24hPct >= 100,
      description: 'Committed to shared portal with action items and owners.',
    },
    {
      title: 'Deliverable Approval SLA (Within 3 Working Days)',
      current: `${kpis.approvalWithin3DaysPct}%`,
      target: '≥ 95%',
      isMet: kpis.approvalWithin3DaysPct >= 95,
      description: 'MoA inspection and formal acceptance certificate execution.',
    },
    {
      title: 'Escalations Acknowledged Within 24 Hours',
      current: `${kpis.escalationsAcknowledgedPct}%`,
      target: '100%',
      isMet: kpis.escalationsAcknowledgedPct >= 100,
      description: 'Immediate acknowledgment and level counterpart mobilization.',
    },
    {
      title: 'Change Requests Processed Within 5 Working Days',
      current: `${kpis.changeRequestsProcessedPct}%`,
      target: '≥ 90%',
      isMet: kpis.changeRequestsProcessedPct >= 90,
      description: '4-vector impact analysis (scope, schedule, cost, risk) completed.',
    },
    {
      title: 'Stakeholder Satisfaction Score (out of 5.0)',
      current: `${kpis.stakeholderSatisfactionScore} / 5.0`,
      target: '≥ 4.0',
      isMet: kpis.stakeholderSatisfactionScore >= 4.0,
      description: 'Quarterly review conducted across MoA M&E, IT, and Finance.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
            <BarChart3 className="w-4 h-4" /> Operational Metrics & Governance KPIs
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Contractual Performance & Schedule Health Scorecard
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Directly maps to Section 12 &ldquo;Operate, monitor, and improve&rdquo; of the contractual guide. Monitors whether reporting, approval turnarounds, and communication discipline meet agreed contractual standards.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl flex items-center gap-3 shrink-0">
          <ShieldCheck className="w-6 h-6 text-emerald-700" />
          <div>
            <div className="text-xs text-emerald-800 font-bold uppercase tracking-wider">Audit Compliance</div>
            <div className="text-sm font-extrabold text-emerald-950">TECH-4 100% Compliant</div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpiItems.map((item, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-xs font-bold text-slate-800 leading-snug">
                {item.title}
              </h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shrink-0 ${
                item.isMet ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {item.isMet ? 'Target Met' : 'Attention'}
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {item.current}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Contract Target: <strong className="text-slate-800">{item.target}</strong>
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-2">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Schedule Burn-Down & Payment Tranche Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: 50-Day Burn-Down Chart */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-700" /> 50-Day Schedule Burn-Down
          </h3>
          <p className="text-xs text-slate-500">
            Tracking working days elapsed against deliverable completion gates.
          </p>

          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                <span>Working Days Elapsed: Day 26 of 50</span>
                <span>52% Elapsed</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: '52%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                <span>Contract Deliverables Complete: 3 of 8 (D-1 to D-3)</span>
                <span>37.5% Completed</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '37.5%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                <span>In-Progress Deliverable Gates: D-4 & D-5</span>
                <span>40% of Project Value Under Active Execution</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '75%' }} />
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="font-bold text-slate-800 flex items-center gap-1 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" /> Schedule Variance: 0 Days (On Target)
            </div>
            <p>
              Deliverables D-1, D-2, and D-3 were completed exactly on schedule. D-4 review is currently within the 3-day approval window. Critical path remains fully protected.
            </p>
          </div>
        </div>

        {/* Right: Milestone Payment Distribution */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-700" /> Payment Milestone Invoicing Schedule
          </h3>
          <p className="text-xs text-slate-500">
            Payment disbursements tied directly to signed Acceptance Certificates (D-1 to D-8).
          </p>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg border border-emerald-200 bg-emerald-50/60 flex items-center justify-between">
              <div>
                <strong className="text-slate-900">D-1: Inception Plan (15%)</strong>
                <div className="text-[11px] text-emerald-800">Certificate signed & invoiced</div>
              </div>
              <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Paid</span>
            </div>

            <div className="p-2.5 rounded-lg border border-emerald-200 bg-emerald-50/60 flex items-center justify-between">
              <div>
                <strong className="text-slate-900">D-2: Stakeholder Consultations (10%)</strong>
                <div className="text-[11px] text-emerald-800">Certificate signed & invoiced</div>
              </div>
              <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Paid</span>
            </div>

            <div className="p-2.5 rounded-lg border border-emerald-200 bg-emerald-50/60 flex items-center justify-between">
              <div>
                <strong className="text-slate-900">D-3: SRS & Data Dictionary (15%)</strong>
                <div className="text-[11px] text-emerald-800">Certificate signed & invoiced</div>
              </div>
              <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Paid</span>
            </div>

            <div className="p-2.5 rounded-lg border border-blue-200 bg-blue-50/60 flex items-center justify-between">
              <div>
                <strong className="text-slate-900">D-4: System Design Document (15%)</strong>
                <div className="text-[11px] text-blue-800">Inspection underway &bull; Day 26</div>
              </div>
              <span className="font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">Under Review</span>
            </div>

            <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <strong className="text-slate-700">D-5 to D-8: Core MIS, SIT/UAT, Training & Handover (45%)</strong>
                <div className="text-[11px] text-slate-500">Scheduled for Days 38, 44, 48, 50</div>
              </div>
              <span className="font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded">Pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
