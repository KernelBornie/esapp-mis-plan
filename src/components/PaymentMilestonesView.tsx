import React, { useState } from 'react';
import { 
  DollarSign, 
  FileCheck, 
  Award, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Download, 
  FileSpreadsheet, 
  ShieldCheck, 
  ArrowUpRight, 
  Check, 
  Building, 
  FileText,
  Search,
  Filter
} from 'lucide-react';
import { PaymentMilestone, DeliverableItem, SignoffRecord } from '../types';

interface PaymentMilestonesViewProps {
  milestones: PaymentMilestone[];
  deliverables: DeliverableItem[];
  onOpenCertificate: (deliverable: DeliverableItem) => void;
}

export const PaymentMilestonesView: React.FC<PaymentMilestonesViewProps> = ({
  milestones: initialMilestones,
  deliverables,
  onOpenCertificate,
}) => {
  const [milestones, setMilestones] = useState<PaymentMilestone[]>(initialMilestones);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const totalContractZMW = 500000;
  const certifiedMilestones = milestones.filter(m => m.status === 'Certified');
  const certifiedAmountZMW = certifiedMilestones.reduce((sum, m) => sum + m.amountZMW, 0);
  const certifiedPercentage = certifiedMilestones.reduce((sum, m) => sum + m.percentage, 0);
  const pendingAmountZMW = totalContractZMW - certifiedAmountZMW;

  const filteredMilestones = milestones.filter(m => {
    if (filterStatus === 'all') return true;
    return m.status.toLowerCase() === filterStatus.toLowerCase();
  });

  // Mock sign-off historical records
  const signoffHistory: SignoffRecord[] = [
    {
      id: 1,
      signoffCode: 'SIG-2026-001',
      deliverableId: 'D-1',
      deliverableCode: 'D-1',
      deliverableTitle: 'Inception Report & Detailed Project Implementation Plan',
      approverPanel: 'MoA Project Coordination Office',
      signedBy: 'Eng. John Banda (MoA PM)',
      signedAt: '2026-09-08 16:45:00',
      decision: 'Approved',
      comments: 'All mandatory inception elements approved.',
      certificateNo: 'CERT-D-1-20260908-0012',
      paymentTriggered: true,
      paymentTranchePct: 15.00,
      paymentAmount: 75000.00,
      notes: 'Inception report and 50-day master WBS ratified at Mulungushi House sitting.',
    },
    {
      id: 2,
      signoffCode: 'SIG-2026-002',
      deliverableId: 'D-2',
      deliverableCode: 'D-2',
      deliverableTitle: 'Stakeholder Consultation & Communication Protocol Sign-Off',
      approverPanel: 'MoA Stakeholder Consultation Committee',
      signedBy: 'Eng. John Banda (MoA PM)',
      signedAt: '2026-09-12 14:00:00',
      decision: 'Approved',
      comments: 'Protocol ratified across all MoA units.',
      certificateNo: 'CERT-D-2-20260912-0021',
      paymentTriggered: true,
      paymentTranchePct: 10.00,
      paymentAmount: 50000.00,
      notes: 'Customer communication protocol, escalation ladder, and shared document repository locked.',
    },
    {
      id: 3,
      signoffCode: 'SIG-2026-003',
      deliverableId: 'D-3',
      deliverableCode: 'D-3',
      deliverableTitle: 'Software Requirements Specification (SRS) & Data Dictionary',
      approverPanel: 'MoA Technical & Functional Review Panel',
      signedBy: 'Chimwemwe Sinyinza (GL), Bwalya Mumba & Eng. John Banda',
      signedAt: '2026-09-18 11:45:00',
      decision: 'Approved',
      comments: 'Detailed SRS approved.',
      certificateNo: 'CERT-D-3-20260918-0035',
      paymentTriggered: true,
      paymentTranchePct: 15.00,
      paymentAmount: 75000.00,
      notes: 'Comprehensive functional requirements catalog (32 use cases) & 3NF database schema verified.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
            <DollarSign className="w-4 h-4" /> Contract Financials & Milestone Disbursements
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Contract Value: ZMW 500,000.00 &bull; Tranche Release Register
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Payment disbursements strictly tied to verified acceptance certificates under TECH-4 guidelines. No advance payments permitted without verified Phase-Gate sign-offs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-xl text-right">
            <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Disbursed / Certified</div>
            <div className="text-lg font-extrabold text-emerald-950">
              ZMW {certifiedAmountZMW.toLocaleString()}.00 <span className="text-xs font-medium text-emerald-700">({certifiedPercentage}%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-2xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Contract Value</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2 font-mono">
            ZMW {totalContractZMW.toLocaleString()}
          </div>
          <p className="text-xs text-slate-500 mt-1">MoA Contract Ref: MoA-UNZA-E-SAPP-2026</p>
        </div>

        <div className="bg-white border border-emerald-200 bg-emerald-50/20 p-5 rounded-xl shadow-2xs">
          <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Certified Milestones</div>
          <div className="text-2xl font-extrabold text-emerald-800 mt-2 font-mono">
            ZMW {certifiedAmountZMW.toLocaleString()}
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-emerald-600 h-full rounded-full" 
              style={{ width: `${certifiedPercentage}%` }}
            />
          </div>
          <p className="text-xs text-emerald-700 mt-2 font-medium">3 of 8 deliverables certified</p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-2xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Certification</div>
          <div className="text-2xl font-extrabold text-slate-700 mt-2 font-mono">
            ZMW {pendingAmountZMW.toLocaleString()}
          </div>
          <p className="text-xs text-slate-500 mt-1">5 deliverables in development/review</p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-2xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Next Payment Gate</div>
          <div className="text-lg font-bold text-blue-700 mt-2">
            D-4 System Design (15%)
          </div>
          <div className="text-xs font-mono font-bold text-slate-700 mt-0.5">
            ZMW 75,000.00
          </div>
          <p className="text-xs text-slate-500 mt-1">MoA Review Panel sitting active</p>
        </div>
      </div>

      {/* Payment Milestones Breakdown Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
              Contractual Payment Milestones Schedule (100% Breakdown)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Each payment tranche is strictly payable upon issuance of a signed Deliverable Acceptance Certificate.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="certified">Certified Only</option>
              <option value="pending">Pending Only</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold text-[11px] tracking-wider">
                <th className="py-3 px-4">Milestone</th>
                <th className="py-3 px-4">Deliverable Title</th>
                <th className="py-3 px-4 text-center">Tranche %</th>
                <th className="py-3 px-4 text-right">Amount (ZMW)</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4">Certificate Ref</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredMilestones.map((m) => {
                const isCertified = m.status === 'Certified';
                const deliverable = deliverables.find(d => d.id === m.deliverableId);

                return (
                  <tr key={m.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      M-{m.id} ({m.deliverableCode})
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{m.deliverableTitle}</div>
                      <div className="text-[11px] text-slate-500">
                        {deliverable ? `${deliverable.phase} • Due Day ${deliverable.targetDay}` : ''}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-slate-700">
                      {m.percentage.toFixed(1)}%
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                      ZMW {m.amountZMW.toLocaleString()}.00
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        isCertified
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {isCertified && <Check className="w-3 h-3 text-emerald-600" />}
                        {m.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600 text-[11px]">
                      {m.certificateNo ? (
                        <span className="text-emerald-800 font-semibold">{m.certificateNo}</span>
                      ) : (
                        <span className="text-slate-400 italic">Pending gate sign-off</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {deliverable && (
                        <button
                          onClick={() => onOpenCertificate(deliverable)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs cursor-pointer"
                        >
                          <Award className="w-3.5 h-3.5 text-emerald-700" />
                          {isCertified ? 'Certificate' : 'Preview'}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50 font-bold border-t border-slate-200 text-slate-900">
                <td className="py-3 px-4" colSpan={2}>Total Contract Value</td>
                <td className="py-3 px-4 text-center">100.0%</td>
                <td className="py-3 px-4 text-right font-mono">ZMW 500,000.00</td>
                <td className="py-3 px-4 text-center" colSpan={3}>
                  <span className="text-emerald-700 font-bold">ZMW 200,000 Certified (40%)</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Formal Sign-off Register Audit Trail */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <h3 className="text-base font-bold text-slate-900">
              Deliverable Sign-Off &amp; Acceptance Register (TECH-4 Audit Log)
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">Official Registry Archive</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold text-[11px] tracking-wider">
                <th className="py-3 px-4">Signoff Code</th>
                <th className="py-3 px-4">Deliverable</th>
                <th className="py-3 px-4">Approver Authority</th>
                <th className="py-3 px-4">Date &amp; Time</th>
                <th className="py-3 px-4">Certificate Number</th>
                <th className="py-3 px-4 text-right">Tranche Released</th>
                <th className="py-3 px-4">Audit Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {signoffHistory.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/60">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{s.signoffCode}</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">{s.deliverableCode}: {s.deliverableTitle}</td>
                  <td className="py-3 px-4 text-slate-700">{s.approverPanel}</td>
                  <td className="py-3 px-4 font-mono text-slate-600">{s.signedAt}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-emerald-800">{s.certificateNo}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-emerald-700">
                    {s.paymentTranchePct}% (ZMW {s.paymentAmount.toLocaleString()})
                  </td>
                  <td className="py-3 px-4 text-slate-600 max-w-xs truncate">{s.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
