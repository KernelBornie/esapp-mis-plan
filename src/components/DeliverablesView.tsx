import React, { useState } from 'react';
import {
  CheckSquare, FileCheck, Award, ChevronDown, ChevronUp, CheckCircle2,
  Printer, X, Send, Ban, ShieldCheck, Check,
} from 'lucide-react';
import { DeliverableItem } from '../types';
import { OFFICIAL_CERTIFICATE_SIGNATORIES, ACADEMIC_SUPERVISOR } from '../data/groupTeamData';

interface DeliverablesViewProps {
  deliverables: DeliverableItem[];
  onToggleChecklist: (deliverableId: string, checklistItemId: string) => void;
  onApproveDeliverable: (deliverableId: string, approverName: string, comments?: string) => void;
  onRejectDeliverable?: (deliverableId: string, reason: string) => void;
  onSubmitForReview?: (deliverableId: string) => void;
  activeModalDeliverable: DeliverableItem | null;
  setActiveModalDeliverable: (d: DeliverableItem | null) => void;
}

export const DeliverablesView: React.FC<DeliverablesViewProps> = ({
  deliverables,
  onToggleChecklist,
  onApproveDeliverable,
  onRejectDeliverable,
  onSubmitForReview,
  activeModalDeliverable,
  setActiveModalDeliverable,
}) => {
  const [expandedDeliverableId, setExpandedDeliverableId] = useState<string>('D-4');
  const [approverInputName] = useState<string>('Eng. John Banda (MoA PM)');
  const [approvalComments] = useState<string>('All technical verification criteria met. Production design approved.');
  const [rejectingDeliverableId, setRejectingDeliverableId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>('');

  const totalContractValue = 500000;
  const totalPaymentPct = deliverables.reduce((acc, d) => acc + d.paymentPercentage, 0);
  const approvedPaymentPct = deliverables
    .filter((d) => d.status === 'Approved')
    .reduce((acc, d) => acc + d.paymentPercentage, 0);
  const approvedAmountZMW = (totalContractValue * approvedPaymentPct) / 100;

  const toggleExpand = (id: string) =>
    setExpandedDeliverableId((prev) => (prev === id ? '' : id));

  const handleExecuteApproval = (deliv: DeliverableItem) => {
    const unverified = deliv.checklist.filter((c) => c.isMandatory !== false && !c.isCompleted);
    if (unverified.length > 0) {
      alert(`Cannot approve deliverable: ${unverified.length} mandatory criteria are not verified.`);
      return;
    }
    onApproveDeliverable(deliv.id, approverInputName, approvalComments);
    const updated: DeliverableItem = {
      ...deliv,
      status: 'Approved',
      approvedDate: new Date().toISOString().substring(0, 10),
      acceptanceSignedBy: approverInputName,
      certificateNo:
        deliv.certificateNo ||
        `CERT-${deliv.code}-${new Date().toISOString().substring(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`,
      checklist: deliv.checklist.map((c) => ({ ...c, isCompleted: true })),
    };
    setActiveModalDeliverable(updated);
  };

  const handleConfirmReject = () => {
    if (!rejectingDeliverableId) return;
    if (!rejectionReason.trim()) {
      alert('Please state a formal contractual rejection reason.');
      return;
    }
    onRejectDeliverable?.(rejectingDeliverableId, rejectionReason);
    setRejectingDeliverableId(null);
    setRejectionReason('');
  };

  // ============================================================
  // PRINT — Opens a dedicated print window with ONLY the certificate
  // ============================================================
  const handlePrintCertificate = () => {
    const certEl = document.getElementById('printable-certificate');
    if (!certEl) {
      alert('Certificate not found. Please reopen the modal.');
      return;
    }

    const printWindow = window.open('', '_blank', 'width=900,height=1200');
    if (!printWindow) {
      alert('Please allow pop-ups to print the certificate.');
      return;
    }

    // Compute the absolute base URL so images resolve in the print window
    const baseHref = window.location.origin;

    // Capture all existing stylesheets so Tailwind utility classes resolve in print
    const documentStyles = Array.from(
      document.querySelectorAll('style, link[rel="stylesheet"]')
    )
      .map((el) => el.outerHTML)
      .join('\n');

    printWindow.document.open();
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <base href="${baseHref}/">
        <title>E-SAPP MIS — Deliverable Acceptance Certificate</title>
        ${documentStyles}
        <style>
          @page { size: A4 portrait; margin: 8mm; }
          * { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          html, body { margin: 0 !important; padding: 0 !important; background: #fff !important; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            font-size: 10px;
            color: #1e293b;
            padding: 4mm;
          }

          /* ============== CERTIFICATE WRAPPER & GOVERNMENT DOUBLE-LINE BORDER ============== */
          .certificate,
          .cert-sheet {
            position: relative;
            width: 100%;
            max-width: 194mm;
            margin: 0 auto;
            border: 4px solid #064e3b !important;
            box-shadow: inset 0 0 0 2px #c59b27, inset 0 0 0 4px #064e3b !important;
            border-radius: 8px;
            padding: 6mm 7mm;
            background: #fdfdfb !important;
            overflow: hidden;
          }

          /* DECORATIVE CORNER ELEMENTS */
          .cert-corner { position: absolute !important; width: 22px !important; height: 22px !important; pointer-events: none !important; z-index: 5 !important; }
          .cert-corner-tl { top: 6px !important; left: 6px !important; border-top: 3px solid #064e3b !important; border-left: 3px solid #064e3b !important; }
          .cert-corner-tl::before { content: ""; position: absolute; top: 2px; left: 2px; width: 12px; height: 12px; border-top: 2px solid #c59b27; border-left: 2px solid #c59b27; }
          .cert-corner-tr { top: 6px !important; right: 6px !important; border-top: 3px solid #064e3b !important; border-right: 3px solid #064e3b !important; }
          .cert-corner-tr::before { content: ""; position: absolute; top: 2px; right: 2px; width: 12px; height: 12px; border-top: 2px solid #c59b27; border-right: 2px solid #c59b27; }
          .cert-corner-bl { bottom: 6px !important; left: 6px !important; border-bottom: 3px solid #064e3b !important; border-left: 3px solid #064e3b !important; }
          .cert-corner-bl::before { content: ""; position: absolute; bottom: 2px; left: 2px; width: 12px; height: 12px; border-bottom: 2px solid #c59b27; border-left: 2px solid #c59b27; }
          .cert-corner-br { bottom: 6px !important; right: 6px !important; border-bottom: 3px solid #064e3b !important; border-right: 3px solid #064e3b !important; }
          .cert-corner-br::before { content: ""; position: absolute; bottom: 2px; right: 2px; width: 12px; height: 12px; border-bottom: 2px solid #c59b27; border-right: 2px solid #c59b27; }

          /* ZAMBIAN FLAG COLOR SEQUENCE RIBBON (Green, Black, Red, Orange) */
          .zambia-flag-ribbon {
            height: 5px !important;
            width: 100% !important;
            display: flex !important;
            overflow: hidden !important;
            border-radius: 4px !important;
            margin: 4px 0 !important;
            border: 0.5px solid rgba(197, 155, 39, 0.4) !important;
          }
          .stripe-green { flex: 4 !important; background-color: #064e3b !important; }
          .stripe-black { flex: 1.2 !important; background-color: #0a0a0a !important; }
          .stripe-red { flex: 1.2 !important; background-color: #dc2626 !important; }
          .stripe-orange { flex: 1.4 !important; background-color: #ea580c !important; }

          /* ZAMBIAN NATIONAL MULTI-ACCENT RIBBON DIVIDER */
          .zambia-accent-ribbon {
            height: 3.5px !important;
            width: 100% !important;
            display: flex !important;
            overflow: hidden !important;
            border-radius: 4px !important;
            margin: 5px 0 !important;
          }

          /* FAINT COAT OF ARMS WATERMARK */
          .cert-watermark {
            position: absolute !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            width: 440px !important;
            height: 440px !important;
            background-image: url('assets/logos/zambia-coat-of-arms.png') !important;
            background-repeat: no-repeat !important;
            background-position: center !important;
            background-size: contain !important;
            opacity: 0.07 !important;
            pointer-events: none !important;
            z-index: 0 !important;
          }

          .cert-content {
            position: relative !important;
            z-index: 2 !important;
          }

          /* Subtle Gradient Table Headers using Zambian Flag Colors (Green, Black, Red, Orange) */
          .cert-table-header-gradient {
            background: linear-gradient(135deg, #064e3b 0%, #064e3b 45%, #0f172a 75%, #18181b 90%, #2b1108 100%) !important;
            color: #ffffff !important;
            border-bottom: 2px solid #c59b27 !important;
          }

          /* Explicit color fallbacks for print fidelity */
          .bg-emerald-800 { background-color: #166534 !important; color: #fff !important; }
          .bg-emerald-900 { background-color: #064e3b !important; color: #fff !important; }
          .bg-emerald-950 { background-color: #022c22 !important; color: #fff !important; }
          .bg-emerald-50 { background-color: #f0fdf4 !important; }
          .bg-emerald-100 { background-color: #dcfce7 !important; }
          .bg-amber-50 { background-color: #fffbeb !important; }
          .bg-amber-100 { background-color: #fef3c7 !important; }
          .bg-amber-400 { background-color: #fbbf24 !important; }
          .bg-amber-800 { background-color: #92400e !important; }
          .bg-orange-500 { background-color: #f97316 !important; }
          .bg-orange-600 { background-color: #ea580c !important; }
          .bg-red-600 { background-color: #dc2626 !important; }
          .bg-blue-50 { background-color: #eff6ff !important; }
          .bg-blue-100 { background-color: #dbeafe !important; }
          .bg-blue-700 { background-color: #1d4ed8 !important; }

          /* HEADER WITH TRIPLE LOGOS */
          .cert-header {
            width: 100%;
            border-collapse: collapse;
            border-bottom: 2px solid #064e3b;
            padding-bottom: 6px;
            margin-bottom: 6px;
          }
          .cert-header td { vertical-align: middle; padding: 2px 4px; }
          .logo-cell { width: 17%; text-align: center; }
          .logo { max-height: 60px; max-width: 100%; display: block; margin: 0 auto; }
          .logo-emblem { max-height: 68px; }
          .title-cell { text-align: center; width: 48%; }

          /* BODY TABLES */
          table.data { width: 100%; border-collapse: collapse; margin-bottom: 6px; }
          table.data th, table.data td {
            border: 1px solid #cbd5e1; padding: 3.5px 5px; font-size: 9.5px; vertical-align: top;
          }
          table.data th { 
            background: linear-gradient(135deg, #064e3b 0%, #0a0a0a 75%, #450a0a 90%, #431407 100%) !important; 
            color: #fff !important; 
            text-align: left; 
            border-bottom: 2px solid #c59b27 !important;
          }

          @media print {
            .no-print { display: none !important; }
            .cert-sheet { 
              box-shadow: inset 0 0 0 2px #c59b27, inset 0 0 0 4px #064e3b !important; 
              border: 4px solid #064e3b !important; 
            }
            tr, .roster-card { page-break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        ${certEl.innerHTML}
      </body>
      </html>
    `);
    printWindow.document.close();

    // Wait for logos and watermark to load before printing
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* ===================== HEADER BANNER ===================== */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
            <CheckSquare className="w-4 h-4" /> Deliverable Phase-Gate Management (D-1 to D-8)
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Acceptance Criteria Verification &amp; Milestone Certification
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Directly implements contract phase gates. Formal approval requires verification of all
            mandatory criteria by the MoA review panel (within 3-day SLA) and unlocks the associated
            payment tranche.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-5 shrink-0">
          <div>
            <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
              Milestone Certification
            </div>
            <div className="text-xl font-extrabold text-emerald-950 mt-0.5">
              {approvedPaymentPct}%{' '}
              <span className="text-xs font-normal text-emerald-800">/ {totalPaymentPct}%</span>
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
              ZMW {approvedAmountZMW.toLocaleString()} Certified
            </div>
          </div>
          <div className="h-10 w-px bg-emerald-200" />
          <div className="text-xs text-emerald-900">
            <span className="font-bold">Next Gate:</span> D-4 (15%)<br />
            <span className="text-emerald-700 font-medium">ZMW 75,000 • MoA Review SLA</span>
          </div>
        </div>
      </div>

      {/* ===================== STATUS PILLS ===================== */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-white border border-slate-200 p-3 rounded-lg flex items-center justify-between">
          <span className="text-slate-500 font-medium">Approved &amp; Certified:</span>
          <span className="font-bold text-emerald-700 font-mono">
            {deliverables.filter((d) => d.status === 'Approved').length} / {deliverables.length}
          </span>
        </div>
        <div className="bg-white border border-slate-200 p-3 rounded-lg flex items-center justify-between">
          <span className="text-slate-500 font-medium">Under MoA Review:</span>
          <span className="font-bold text-blue-700 font-mono">
            {deliverables.filter((d) => d.status === 'Under Review').length}
          </span>
        </div>
        <div className="bg-white border border-slate-200 p-3 rounded-lg flex items-center justify-between">
          <span className="text-slate-500 font-medium">In Development:</span>
          <span className="font-bold text-amber-700 font-mono">
            {deliverables.filter((d) => d.status === 'In Progress').length}
          </span>
        </div>
        <div className="bg-white border border-slate-200 p-3 rounded-lg flex items-center justify-between">
          <span className="text-slate-500 font-medium">Pending Phases:</span>
          <span className="font-bold text-slate-700 font-mono">
            {deliverables.filter((d) => d.status === 'Pending').length}
          </span>
        </div>
      </div>

      {/* ===================== DELIVERABLES LIST ===================== */}
      <div className="space-y-4">
        {deliverables.map((item) => {
          const isExpanded = expandedDeliverableId === item.id;
          const completedCount = item.checklist.filter((c) => c.isCompleted).length;
          const totalCount = item.checklist.length;
          const mandatoryCount = item.checklist.filter((c) => c.isMandatory !== false).length;
          const mandatoryCompleted = item.checklist.filter((c) => c.isMandatory !== false && c.isCompleted).length;
          const percentDone = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;
          const isAllMandatoryChecked = mandatoryCompleted === mandatoryCount && mandatoryCount > 0;
          const trancheValueZMW = (totalContractValue * item.paymentPercentage) / 100;

          return (
            <div
              key={item.id}
              className={`bg-white border rounded-xl overflow-hidden transition-all shadow-2xs ${
                item.status === 'Approved'
                  ? 'border-emerald-200'
                  : item.status === 'Under Review'
                  ? 'border-blue-300 ring-1 ring-blue-200'
                  : item.status === 'Rejected'
                  ? 'border-red-300 ring-1 ring-red-200 bg-red-50/10'
                  : 'border-slate-200'
              }`}
            >
              {/* HEADER ROW */}
              <div
                onClick={() => toggleExpand(item.id)}
                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 select-none"
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-lg font-mono text-sm font-bold flex items-center justify-center shrink-0 ${
                      item.status === 'Approved'
                        ? 'bg-emerald-700 text-white'
                        : item.status === 'Under Review'
                        ? 'bg-blue-600 text-white'
                        : item.status === 'In Progress'
                        ? 'bg-amber-500 text-white'
                        : item.status === 'Rejected'
                        ? 'bg-red-600 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {item.code}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                          item.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.status === 'Under Review'
                            ? 'bg-blue-100 text-blue-800'
                            : item.status === 'In Progress'
                            ? 'bg-amber-100 text-amber-800'
                            : item.status === 'Rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {item.status}
                      </span>
                      {item.certificateNo && (
                        <span className="font-mono text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {item.certificateNo}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mt-1">
                      <span className="font-semibold text-slate-700">{item.phase}</span>
                      <span>•</span>
                      <span>Due: <strong className="text-slate-700">Day {item.targetDay}</strong></span>
                      <span>•</span>
                      <span>
                        Payment: <strong className="text-emerald-700">{item.paymentPercentage}%</strong>{' '}
                        (ZMW {trancheValueZMW.toLocaleString()})
                      </span>
                      <span>•</span>
                      <span>Lead: <strong className="text-slate-700">{item.leadOwner}</strong></span>
                      {item.supportingOwners && (
                        <>
                          <span>•</span>
                          <span>Support: <span className="text-slate-600">{item.supportingOwners}</span></span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end md:self-center shrink-0">
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-800">
                      {completedCount}/{totalCount} Criteria ({percentDone}%)
                    </div>
                    <div className="w-24 bg-slate-100 h-1.5 rounded-full mt-1 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.status === 'Approved' ? 'bg-emerald-600' : 'bg-blue-600'}`}
                        style={{ width: `${percentDone}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModalDeliverable(item);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer"
                  >
                    <Award className="w-3.5 h-3.5 text-emerald-700" />
                    Certificate
                  </button>

                  <div className="text-slate-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* EXPANDED: CHECKLIST + ACTIONS */}
              {isExpanded && (
                <div className="border-t border-slate-100 bg-slate-50/50 p-5 space-y-4">
                  <div className="text-xs text-slate-600">
                    <strong className="text-slate-800">Deliverable Scope:</strong> {item.description}
                  </div>

                  {item.rejectionReason && (
                    <div className="bg-red-50 border border-red-200 p-3 rounded-lg text-xs text-red-800">
                      <strong>Rejection Reason:</strong> {item.rejectionReason}
                    </div>
                  )}

                  <div className="space-y-2.5">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                      <span>Acceptance Criteria Verification Checklist</span>
                      <span className="text-slate-500 font-normal">
                        {mandatoryCompleted}/{mandatoryCount} mandatory criteria verified
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {item.checklist.map((check) => (
                        <div
                          key={check.id}
                          onClick={() => onToggleChecklist(item.id, check.id)}
                          className={`flex flex-col p-3 rounded-lg border text-xs cursor-pointer transition-colors ${
                            check.isCompleted
                              ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950 font-medium'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/60'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <input
                              type="checkbox"
                              checked={check.isCompleted}
                              onChange={() => {}}
                              className="mt-0.5 rounded text-emerald-700 focus:ring-emerald-600 h-4 w-4 shrink-0"
                            />
                            <div className="leading-snug">
                              <span>{check.label}</span>
                              {check.isMandatory !== false && (
                                <span className="ml-1.5 text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.2 rounded border border-red-200">
                                  Mandatory
                                </span>
                              )}
                            </div>
                          </div>

                          {(check.verifiedBy || check.evidenceNote) && (
                            <div className="mt-2 pl-6 text-[11px] text-slate-500 border-t border-slate-200/60 pt-1.5 space-y-0.5">
                              {check.verifiedBy && (
                                <div>
                                  Verified by:{' '}
                                  <strong className="text-slate-700">{check.verifiedBy}</strong>{' '}
                                  ({check.verifiedAt || 'Recorded'})
                                </div>
                              )}
                              {check.evidenceNote && (
                                <div className="italic text-slate-600">
                                  Evidence: {check.evidenceNote}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-xs text-slate-500">
                      {item.status === 'Approved' ? (
                        <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                          <CheckCircle2 className="w-4 h-4" /> Approved by {item.acceptanceSignedBy} on{' '}
                          {item.approvedDate} • Payment Tranche Released
                        </span>
                      ) : (
                        <span>
                          Approver Panel: <strong>{item.approverPanel || item.clientApprover}</strong> • Response SLA:{' '}
                          <strong>{item.responseSlaDays || 3} Working Days</strong>
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {(item.status === 'In Progress' || item.status === 'Pending') && onSubmitForReview && (
                        <button
                          onClick={() => onSubmitForReview(item.id)}
                          className="text-xs font-semibold px-3 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 cursor-pointer flex items-center gap-1.5"
                        >
                          <Send className="w-3.5 h-3.5 text-blue-600" />
                          Submit to MoA for Review
                        </button>
                      )}

                      {item.status === 'Under Review' && (
                        <button
                          onClick={() => setRejectingDeliverableId(item.id)}
                          className="text-xs font-semibold px-3 py-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 cursor-pointer flex items-center gap-1.5"
                        >
                          <Ban className="w-3.5 h-3.5 text-red-600" />
                          Reject with Comments
                        </button>
                      )}

                      {item.status !== 'Approved' && (
                        <button
                          onClick={() => handleExecuteApproval(item)}
                          disabled={!isAllMandatoryChecked}
                          className={`text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                            isAllMandatoryChecked
                              ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          }`}
                          title={
                            isAllMandatoryChecked
                              ? 'Approve deliverable and issue certificate'
                              : 'All mandatory criteria must be verified before approval'
                          }
                        >
                          <FileCheck className="w-4 h-4" />
                          Approve &amp; Issue Certificate
                        </button>
                      )}

                      <button
                        onClick={() => setActiveModalDeliverable(item)}
                        className="text-xs font-semibold px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 cursor-pointer"
                      >
                        <Award className="w-4 h-4 text-emerald-700" />
                        Preview Certificate
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ============================================================
          CERTIFICATE MODAL — Triple-Logo Header (UNZA | Zambia | MoA)
          ============================================================ */}
      {activeModalDeliverable && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-300 rounded-2xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <button
              onClick={() => setActiveModalDeliverable(null)}
              className="no-print absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* ============ PRINTABLE CERTIFICATE WRAPPER ============ */}
            <div id="printable-certificate" className="relative">
              <div
                className="certificate cert-sheet relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#fbfdfa] via-[#ffffff] to-[#f6faf6] p-6 sm:p-8 text-slate-900 shadow-xl cert-double-line-border"
                style={{
                  border: '4px solid #064e3b',
                  boxShadow:
                    'inset 0 0 0 2px #c59b27, inset 0 0 0 4px #064e3b, 0 12px 36px -4px rgba(6, 78, 59, 0.18)',
                }}
              >
                {/* 4 CLASSICAL FORMAL DECORATIVE CORNER ELEMENTS */}
                <div className="cert-corner cert-corner-tl" aria-hidden="true" />
                <div className="cert-corner cert-corner-tr" aria-hidden="true" />
                <div className="cert-corner cert-corner-bl" aria-hidden="true" />
                <div className="cert-corner cert-corner-br" aria-hidden="true" />

                {/* FAINT COAT OF ARMS WATERMARK IN BACKGROUND */}
                <div
                  className="cert-watermark pointer-events-none select-none"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '460px',
                    height: '460px',
                    backgroundImage: "url('/assets/logos/zambia-coat-of-arms.png')",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain',
                    opacity: 0.065,
                    zIndex: 0,
                  }}
                  aria-hidden="true"
                />

                {/* CERTIFICATE CONTENT (LAYERED OVER WATERMARK) */}
                <div className="cert-content relative z-2 space-y-4">
                  {/* Top Decorative Multi-Color Ribbon: Republic of Zambia Flag Sequence (Green, Black, Red, Orange) */}
                  <div
                    className="zambia-flag-ribbon h-2.5 sm:h-3 w-full flex rounded-full overflow-hidden shadow-xs border border-emerald-900/40 my-1"
                    role="img"
                    aria-label="Republic of Zambia Flag Ribbon: Green, Black, Red, Orange"
                  >
                    <div className="stripe-green h-full flex-[4] bg-[#064e3b]" title="Green (Flora & Agriculture)" />
                    <div className="stripe-black h-full flex-[1.2] bg-[#0a0a0a]" title="Black (The People of Zambia)" />
                    <div className="stripe-red h-full flex-[1.2] bg-[#dc2626]" title="Red (Freedom & Struggle)" />
                    <div className="stripe-orange h-full flex-[1.4] bg-[#ea580c]" title="Orange (Mineral Wealth & Copper)" />
                  </div>

                  {/* ================= TRIPLE-LOGO HEADER ================= */}
                  <table
                    className="cert-header"
                    style={{
                      width: '100%',
                      borderCollapse: 'collapse',
                      borderBottom: '2.5px solid #166534',
                      paddingBottom: 6,
                      marginBottom: 6,
                    }}
                  >
                    <tbody>
                      <tr>
                        {/* LEFT LOGO: UNZA (Consultant) */}
                        <td
                          className="logo-cell"
                          style={{ width: '17%', textAlign: 'center', padding: '4px 6px', verticalAlign: 'middle' }}
                        >
                          <img
                            src="/assets/logos/unza-logo.png"
                            alt="University of Zambia"
                            className="logo"
                            style={{ maxHeight: 68, maxWidth: '100%', display: 'block', margin: '0 auto' }}
                          />
                          <div
                            className="logo-caption"
                            style={{
                              fontSize: 8,
                              color: '#166534',
                              fontWeight: 'bold',
                              textTransform: 'uppercase',
                              letterSpacing: '.5px',
                              marginTop: 3,
                            }}
                          >
                            University of Zambia
                          </div>
                          <div
                            style={{
                              fontSize: 7.2,
                              color: '#1d4ed8',
                              textTransform: 'uppercase',
                              letterSpacing: '.4px',
                              fontWeight: 700,
                            }}
                          >
                            Consultant
                          </div>
                        </td>

                        {/* CENTRE-LEFT LOGO: Zambian Coat of Arms (National Emblem) */}
                        <td
                          className="logo-cell"
                          style={{ width: '17%', textAlign: 'center', padding: '4px 6px', verticalAlign: 'middle' }}
                        >
                          <img
                            src="/assets/logos/zambia-coat-of-arms.png"
                            alt="Republic of Zambia Coat of Arms"
                            className="logo logo-emblem"
                            style={{ maxHeight: 76, maxWidth: '100%', display: 'block', margin: '0 auto' }}
                          />
                          <div
                            className="logo-caption"
                            style={{
                              fontSize: 8,
                              color: '#064e3b',
                              fontWeight: 'bold',
                              textTransform: 'uppercase',
                              letterSpacing: '.5px',
                              marginTop: 3,
                            }}
                          >
                            Republic of Zambia
                          </div>
                          <div
                            style={{
                              fontSize: 7.2,
                              color: '#b45309',
                              textTransform: 'uppercase',
                              letterSpacing: '.4px',
                              fontWeight: 600,
                            }}
                          >
                            National Emblem
                          </div>
                        </td>

                        {/* CENTRE TITLE BLOCK */}
                        <td
                          className="title-cell"
                          style={{ textAlign: 'center', width: '48%', verticalAlign: 'middle', padding: '4px 8px' }}
                        >
                          <div
                            style={{
                              color: '#064e3b',
                              fontSize: 14,
                              margin: 0,
                              fontWeight: 900,
                              letterSpacing: '1px',
                              textTransform: 'uppercase',
                            }}
                          >
                            REPUBLIC OF ZAMBIA
                          </div>
                          <div
                            style={{
                              color: '#166534',
                              fontSize: 12,
                              margin: '2px 0',
                              fontWeight: 'bold',
                              letterSpacing: '.3px',
                            }}
                          >
                            MINISTRY OF AGRICULTURE (MoA)
                          </div>
                          <div style={{ fontSize: 9.5, fontWeight: 500, color: '#334155', margin: '2px 0' }}>
                            E-SAPP Web-Enabled Management Information System
                          </div>
                          <div
                            style={{
                              background: 'linear-gradient(135deg, #064e3b, #047857, #064e3b)',
                              color: '#ffffff',
                              fontSize: 11,
                              margin: '5px auto 3px',
                              fontWeight: 800,
                              letterSpacing: '.6px',
                              padding: '4px 14px',
                              borderRadius: 4,
                              border: '1px solid #f59e0b',
                              boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                              display: 'inline-block',
                            }}
                          >
                            DELIVERABLE ACCEPTANCE CERTIFICATE
                          </div>
                          <div style={{ fontSize: 8.5, color: '#78350f', fontWeight: 'bold', margin: '2px 0 0' }}>
                            Contract:{' '}
                            <span style={{ fontFamily: 'monospace', letterSpacing: '.3px' }}>
                              MoA-UNZA-E-SAPP-2026
                            </span>
                          </div>
                        </td>

                        {/* RIGHT LOGO: MoA (Client) */}
                        <td
                          className="logo-cell"
                          style={{ width: '17%', textAlign: 'center', padding: '4px 6px', verticalAlign: 'middle' }}
                        >
                          <img
                            src="/assets/logos/moa-logo.png"
                            alt="Ministry of Agriculture"
                            className="logo"
                            style={{ maxHeight: 68, maxWidth: '100%', display: 'block', margin: '0 auto' }}
                          />
                          <div
                            className="logo-caption"
                            style={{
                              fontSize: 8,
                              color: '#166534',
                              fontWeight: 'bold',
                              textTransform: 'uppercase',
                              letterSpacing: '.5px',
                              marginTop: 3,
                            }}
                          >
                            Ministry of Agriculture
                          </div>
                          <div
                            style={{
                              fontSize: 7.2,
                              color: '#ea580c',
                              textTransform: 'uppercase',
                              letterSpacing: '.4px',
                              fontWeight: 700,
                            }}
                          >
                            Client
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Post-Header Zambian National Multi-Color Accent Divider */}
                  <div className="zambia-accent-ribbon h-1.5 w-full flex rounded-full overflow-hidden shadow-2xs">
                    <div className="h-full bg-emerald-800 flex-1" />
                    <div className="h-full bg-red-600 w-8 sm:w-12" />
                    <div className="h-full bg-white w-2.5 sm:w-3" />
                    <div className="h-full bg-amber-800 w-6 sm:w-8" />
                    <div className="h-full bg-orange-600 w-8 sm:w-12" />
                    <div className="h-full bg-blue-700 w-8 sm:w-10" />
                    <div className="h-full bg-amber-400 w-8 sm:w-12" />
                    <div className="h-full bg-emerald-800 flex-1" />
                  </div>

                  {/* Status Banner & Certificate Number */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-emerald-700/60 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 shadow-2xs">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                        FORMALLY VERIFIED &amp; APPROVED
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium hidden sm:inline">
                        Phase-Gate Statutory Review Passed
                      </span>
                    </div>
                    <div className="text-right text-xs text-slate-600">
                      <span className="font-semibold text-slate-600">Certificate No:</span>{' '}
                      <strong className="font-mono text-emerald-950 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-300">
                        {activeModalDeliverable.certificateNo ||
                          `CERT-${activeModalDeliverable.code}-20260908-0012`}
                      </strong>
                    </div>
                  </div>

                  {/* Deliverable Title & Phase Banner with Double-Line Border & Zambian Flag Strip */}
                  <div
                    className="text-white p-3.5 rounded-xl shadow-xs text-center space-y-1 relative overflow-hidden"
                    style={{
                      border: '2.5px solid #064e3b',
                      boxShadow: 'inset 0 0 0 1.5px #c59b27',
                      background: 'linear-gradient(135deg, #064e3b 0%, #032e22 45%, #0a0a0a 75%, #18181b 92%, #2b1108 100%)',
                    }}
                  >
                    <div className="text-sm sm:text-base font-extrabold text-amber-300 tracking-wide">
                      {activeModalDeliverable.code} — {activeModalDeliverable.title}
                    </div>
                    <div className="flex items-center justify-center gap-2 flex-wrap text-xs text-emerald-100 font-medium">
                      <span className="bg-emerald-800/90 px-2.5 py-0.5 rounded border border-emerald-600/70 font-semibold">
                        {activeModalDeliverable.phase}
                      </span>
                      <span className="text-amber-400 font-bold">•</span>
                      <span>
                        Target <strong className="text-white">Day {activeModalDeliverable.targetDay}</strong> of 50
                      </span>
                      <span className="text-amber-400 font-bold">•</span>
                      <span className="bg-gradient-to-r from-amber-500/30 to-orange-500/30 text-amber-200 px-2.5 py-0.5 rounded border border-amber-400/40 font-bold">
                        Milestone Tranche: {activeModalDeliverable.paymentPercentage.toFixed(2)}%
                      </span>
                    </div>
                    {/* Zambian Flag Color Sequence Stripe (Green, Black, Red, Orange) */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 flex">
                      <div className="h-full bg-[#064e3b] flex-[4]" />
                      <div className="h-full bg-[#0a0a0a] flex-[1.2]" />
                      <div className="h-full bg-[#dc2626] flex-[1.2]" />
                      <div className="h-full bg-[#ea580c] flex-[1.4]" />
                    </div>
                  </div>

                  {/* Meta Table with Government Double-Line Border & Zambian Flag Color Accents */}
                  <div
                    className="overflow-hidden rounded-lg shadow-2xs"
                    style={{
                      border: '3px solid #064e3b',
                      boxShadow: 'inset 0 0 0 1.5px #c59b27',
                    }}
                  >
                    <table className="w-full text-xs border-collapse data meta-table">
                      <tbody>
                        <tr className="border-b border-emerald-100">
                          <td
                            className="py-2 px-3.5 font-bold text-emerald-950 w-1/3 border-r border-emerald-100 border-l-4 border-l-[#064e3b]"
                            style={{ background: 'linear-gradient(to right, #ecfdf5 0%, #ffffff 100%)' }}
                          >
                            Contract Reference
                          </td>
                          <td className="py-2 px-3.5 font-mono font-bold text-slate-900 bg-white">
                            MoA-UNZA-E-SAPP-2026
                          </td>
                        </tr>
                        <tr className="border-b border-emerald-100">
                          <td
                            className="py-2 px-3.5 font-bold text-slate-950 border-r border-emerald-100 border-l-4 border-l-[#0a0a0a]"
                            style={{ background: 'linear-gradient(to right, #f1f5f9 0%, #ffffff 100%)' }}
                          >
                            Consultant
                          </td>
                          <td className="py-2 px-3.5 text-slate-800 bg-white font-medium">
                            UNZA Department of Computer Science
                          </td>
                        </tr>
                        <tr className="border-b border-emerald-100">
                          <td
                            className="py-2 px-3.5 font-bold text-amber-950 border-r border-emerald-100 border-l-4 border-l-[#c59b27]"
                            style={{ background: 'linear-gradient(to right, #fef3c7 0%, #ffffff 100%)' }}
                          >
                            Academic Supervisor
                          </td>
                          <td className="py-2 px-3.5 text-slate-900 bg-white font-semibold">
                            <span className="text-emerald-900 font-bold">Mr. Martin Phiri</span>{' '}
                            <span className="text-slate-500 font-normal text-[11px]">
                              (Course Lecturer, UNZA Dept. of Computer Science)
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b border-emerald-100">
                          <td
                            className="py-2 px-3.5 font-bold text-emerald-950 border-r border-emerald-100 border-l-4 border-l-[#064e3b]"
                            style={{ background: 'linear-gradient(to right, #ecfdf5 0%, #ffffff 100%)' }}
                          >
                            Deliverable Lead
                          </td>
                          <td className="py-2 px-3.5 font-semibold text-slate-900 bg-white">
                            {activeModalDeliverable.leadOwner}{' '}
                            <span className="text-blue-700 font-normal text-[11px]">(GL)</span>
                          </td>
                        </tr>
                        {activeModalDeliverable.supportingOwners && (
                          <tr className="border-b border-emerald-100">
                            <td
                              className="py-2 px-3.5 font-bold text-slate-900 border-r border-emerald-100 border-l-4 border-l-[#1f2937]"
                              style={{ background: 'linear-gradient(to right, #f8fafc 0%, #ffffff 100%)' }}
                            >
                              Support Team
                            </td>
                            <td className="py-2 px-3.5 text-slate-700 bg-white">
                              {activeModalDeliverable.supportingOwners}
                            </td>
                          </tr>
                        )}
                        <tr className="border-b-2 border-emerald-200">
                          <td
                            className="py-2.5 px-3.5 font-extrabold text-orange-950 border-r border-orange-200 border-l-4 border-l-[#ea580c]"
                            style={{ background: 'linear-gradient(to right, #ffedd5 0%, #fee2e2 50%, #fef3c7 100%)' }}
                          >
                            Payment Milestone
                          </td>
                          <td className="py-2.5 px-3.5 font-bold text-emerald-950 bg-amber-50/30">
                            <span className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-2 py-0.5 rounded shadow-2xs mr-2 font-mono text-[11px] font-bold">
                              {activeModalDeliverable.paymentPercentage.toFixed(2)}%
                            </span>
                            of Total Contract Value (
                            <strong className="text-emerald-950 font-extrabold">
                              ZMW {((500000 * activeModalDeliverable.paymentPercentage) / 100).toLocaleString()}.00
                            </strong>
                            )
                          </td>
                        </tr>
                        <tr className="border-b border-emerald-100">
                          <td
                            className="py-2 px-3.5 font-bold text-emerald-950 border-r border-emerald-100 border-l-4 border-l-[#064e3b]"
                            style={{ background: 'linear-gradient(to right, #ecfdf5 0%, #ffffff 100%)' }}
                          >
                            Approver Authority
                          </td>
                          <td className="py-2 px-3.5 text-slate-800 bg-white font-medium">
                            {activeModalDeliverable.acceptanceSignedBy ||
                              activeModalDeliverable.approverPanel ||
                              'Eng. John Banda (MoA Technical & Functional Review Panel)'}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="py-2 px-3.5 font-bold text-red-950 border-r border-emerald-100 border-l-4 border-l-[#dc2626]"
                            style={{ background: 'linear-gradient(to right, #fef2f2 0%, #ffffff 100%)' }}
                          >
                            Sign-Off Date
                          </td>
                          <td className="py-2 px-3.5 text-slate-800 bg-white font-mono">
                            {activeModalDeliverable.approvedDate || '2026-09-08'}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Acceptance Criteria Table with Zambian Flag Sequence Gradients & Double-Line Border */}
                  <div className="space-y-2">
                    <div
                      className="flex items-center justify-between pb-1.5 px-2.5 py-1.5 rounded-t-lg border-l-4 border-l-[#ea580c]"
                      style={{
                        background: 'linear-gradient(to right, rgba(6, 78, 59, 0.12) 0%, rgba(10, 10, 10, 0.05) 50%, rgba(234, 88, 12, 0.10) 100%)',
                        borderBottom: '2px solid #064e3b',
                      }}
                    >
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                        <CheckSquare className="w-3.5 h-3.5 text-emerald-800" />
                        Acceptance Criteria Verification Audit
                      </h4>
                      <span className="text-[10px] font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                        MANDATORY CRITERIA VERIFIED
                      </span>
                    </div>

                    <div
                      className="overflow-hidden rounded-lg shadow-2xs"
                      style={{
                        border: '3px solid #064e3b',
                        boxShadow: 'inset 0 0 0 1.5px #c59b27',
                      }}
                    >
                      <table className="w-full text-xs border-collapse data">
                        <thead>
                          <tr
                            className="text-white font-bold text-[11px] cert-table-header-gradient"
                            style={{
                              background: 'linear-gradient(135deg, #064e3b 0%, #064e3b 42%, #0a0a0a 72%, #450a0a 88%, #431407 100%)',
                              borderBottom: '2px solid #c59b27',
                            }}
                          >
                            <th className="py-2 px-2.5 text-center w-8 border-r border-emerald-800/80 text-amber-300">
                              #
                            </th>
                            <th className="py-2 px-3 text-left border-r border-emerald-800/80">
                              Acceptance Criterion
                            </th>
                            <th className="py-2 px-3 text-center w-24 text-amber-300">Verified</th>
                          </tr>
                          {/* Micro Zambian Flag Sequence Header Stripe (Green, Black, Red, Orange) */}
                          <tr className="h-1 p-0 leading-none">
                            <th colSpan={3} className="p-0 border-0">
                              <div className="h-1 w-full flex">
                                <div className="h-full bg-[#064e3b] flex-[4]" title="Zambian Green" />
                                <div className="h-full bg-[#0a0a0a] flex-[1.2]" title="Zambian Black" />
                                <div className="h-full bg-[#dc2626] flex-[1.2]" title="Zambian Red" />
                                <div className="h-full bg-[#ea580c] flex-[1.4]" title="Zambian Orange" />
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-emerald-100">
                          {activeModalDeliverable.checklist.map((c, i) => (
                            <tr key={c.id} className={i % 2 === 0 ? 'bg-white' : 'bg-emerald-50/30'}>
                              <td className="py-2 px-2.5 text-center text-slate-500 font-bold border-r border-emerald-50">
                                {i + 1}
                              </td>
                              <td className="py-2 px-3 text-slate-800 border-r border-emerald-50">
                                <span className="font-medium">{c.label}</span>{' '}
                                {c.isMandatory !== false && (
                                  <span className="text-red-700 text-[10px] font-bold bg-red-50 border border-red-200 px-1.5 py-0.2 rounded ml-1">
                                    (mandatory)
                                  </span>
                                )}
                              </td>
                              <td className="py-2 px-3 text-center">
                                {c.isCompleted ? (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-900 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full shadow-2xs">
                                    <Check className="w-3 h-3 text-emerald-700 stroke-[3]" /> YES
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-100 border border-red-300 px-2.5 py-0.5 rounded-full">
                                    ✗ NO
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Section Divider with Zambian Flag Color Sequence Ribbon (Green, Black, Red, Orange) */}
                  <div
                    className="zambia-flag-ribbon h-2 w-full flex rounded-full overflow-hidden shadow-2xs my-2 border border-emerald-900/30"
                    role="img"
                    aria-label="Flag Ribbon Divider: Green, Black, Red, Orange"
                  >
                    <div className="stripe-green h-full flex-[4] bg-[#064e3b]" />
                    <div className="stripe-black h-full flex-[1.2] bg-[#0a0a0a]" />
                    <div className="stripe-red h-full flex-[1.2] bg-[#dc2626]" />
                    <div className="stripe-orange h-full flex-[1.4] bg-[#ea580c]" />
                  </div>

                  {/* 3 Primary Signatories */}
                  <div className="pt-2">
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-950 mb-2.5 text-center flex items-center justify-center gap-2">
                      <span className="h-px bg-emerald-300 flex-1" />
                      Executive Sign-Off &amp; Milestone Payment Release Authorization
                      <span className="h-px bg-emerald-300 flex-1" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      {/* MoA Client Signatory */}
                      <div className="bg-gradient-to-b from-white to-emerald-50/50 border-2 border-emerald-600/80 rounded-xl p-3.5 text-center space-y-1 shadow-2xs relative">
                        <div className="inline-block text-[9px] font-extrabold tracking-wider text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300 mb-1">
                          CLIENT APPROVER
                        </div>
                        <div className="font-serif italic font-bold text-slate-900 text-base">
                          {activeModalDeliverable.acceptanceSignedBy || 'Eng. John Banda'}
                        </div>
                        <div className="border-t-2 border-slate-700 w-3/4 mx-auto my-1" />
                        <div className="font-bold text-slate-800 text-[11px]">
                          {activeModalDeliverable.approverPanel || 'MoA Project Coordination Office'}
                        </div>
                        <div className="text-[10px] text-emerald-850 font-semibold">
                          Ministry of Agriculture (MoA)
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          Date: {activeModalDeliverable.approvedDate || '2026-09-08'}
                        </div>
                      </div>

                      {/* Academic Supervisor Signatory */}
                      <div className="bg-gradient-to-b from-white to-amber-50/50 border-2 border-amber-500/80 rounded-xl p-3.5 text-center space-y-1 shadow-2xs relative">
                        <div className="inline-block text-[9px] font-extrabold tracking-wider text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 mb-1">
                          ACADEMIC SUPERVISOR
                        </div>
                        <div className="font-serif italic font-bold text-slate-900 text-base">
                          {ACADEMIC_SUPERVISOR.name}
                        </div>
                        <div className="border-t-2 border-slate-700 w-3/4 mx-auto my-1" />
                        <div className="font-bold text-slate-800 text-[11px]">
                          {ACADEMIC_SUPERVISOR.role}
                        </div>
                        <div className="text-[10px] text-amber-900 font-semibold">
                          {ACADEMIC_SUPERVISOR.department}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          Date: {activeModalDeliverable.approvedDate || '2026-09-08'}
                        </div>
                      </div>

                      {/* Consultant Lead Signatory */}
                      <div className="bg-gradient-to-b from-white to-blue-50/50 border-2 border-blue-600/80 rounded-xl p-3.5 text-center space-y-1 shadow-2xs relative">
                        <div className="inline-block text-[9px] font-extrabold tracking-wider text-blue-900 bg-blue-100 px-2 py-0.5 rounded-full border border-blue-300 mb-1">
                          CONSULTANT LEAD
                        </div>
                        <div className="font-serif italic font-bold text-slate-900 text-base">
                          Chimwemwe Sinyinza
                        </div>
                        <div className="border-t-2 border-slate-700 w-3/4 mx-auto my-1" />
                        <div className="font-bold text-slate-800 text-[11px]">
                          Project Lead / Team Leader (Group Leader)
                        </div>
                        <div className="text-[10px] text-blue-900 font-semibold">
                          UNZA Dept. of Computer Science
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          Date: {activeModalDeliverable.approvedDate || '2026-09-08'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 9-Member Consultant Roster with Zambian Header Branding */}
                  <div className="space-y-3 pt-2">
                    <div
                      className="text-white p-2.5 rounded-lg flex items-center justify-between shadow-2xs relative overflow-hidden cert-table-header-gradient"
                      style={{
                        background: 'linear-gradient(135deg, #064e3b 0%, #064e3b 45%, #0a0a0a 75%, #450a0a 90%, #431407 100%)',
                        borderBottom: '2px solid #c59b27',
                      }}
                    >
                      <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-amber-300" />
                        Consultant Team Roster &amp; Endorsement Signatures (9 Members)
                      </h4>
                      <span className="text-[10px] text-amber-200 font-mono font-medium">
                        UNZA Group 6 • 8 Students + Academic Supervisor
                      </span>
                      {/* Micro Zambian Flag Sequence stripe */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 flex">
                        <div className="h-full bg-[#064e3b] flex-[4]" />
                        <div className="h-full bg-[#0a0a0a] flex-[1.2]" />
                        <div className="h-full bg-[#dc2626] flex-[1.2]" />
                        <div className="h-full bg-[#ea580c] flex-[1.4]" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs">
                      {OFFICIAL_CERTIFICATE_SIGNATORIES.map((sig, idx) => {
                        const isDeliverableLead = activeModalDeliverable.leadOwner
                          .toLowerCase()
                          .includes(sig.name.toLowerCase().split(' ')[0]);
                        return (
                          <div
                            key={idx}
                            className={`border rounded-lg p-3 space-y-1 shadow-2xs transition-all ${
                              sig.isAcademic
                                ? 'border-2 border-amber-500 bg-gradient-to-br from-amber-50/90 via-orange-50/30 to-white'
                                : isDeliverableLead
                                ? 'border-2 border-blue-600 bg-gradient-to-br from-blue-50/90 via-emerald-50/30 to-white'
                                : 'border border-emerald-300/80 bg-white hover:bg-emerald-50/40'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span
                                className={`text-[9.5px] font-mono font-bold px-1.5 py-0.2 rounded border ${
                                  sig.isAcademic
                                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                                    : isDeliverableLead
                                    ? 'bg-blue-100 text-blue-900 border-blue-300'
                                    : 'bg-slate-100 text-slate-700 border-slate-200'
                                }`}
                              >
                                {sig.isAcademic ? 'FACULTY SUPERVISOR' : `ID: ${sig.studentId}`}
                              </span>
                              <span className="inline-flex items-center gap-0.5 text-[10px] font-extrabold text-emerald-900 bg-emerald-100 px-1.5 py-0.2 rounded-full border border-emerald-300">
                                <Check className="w-2.5 h-2.5 stroke-[3]" /> Endorsed
                              </span>
                            </div>
                            <div className="font-serif italic font-bold text-slate-900 text-sm">
                              {sig.name}
                            </div>
                            <div className="text-[11px] font-medium text-slate-700 leading-tight">
                              {sig.role}
                            </div>
                            <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-200/80 flex items-center justify-between">
                              <span className="italic text-emerald-950 font-medium">{sig.org}</span>
                              {isDeliverableLead && (
                                <span className="font-bold text-blue-800 bg-blue-100/80 px-1 rounded text-[9px]">
                                  Deliverable Lead
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Official Zambian Flag Color Sequence Divider before Footer */}
                  <div
                    className="zambia-flag-ribbon h-1.5 w-full flex rounded-full overflow-hidden shadow-2xs my-1 border border-emerald-900/30"
                    role="img"
                    aria-label="Flag Ribbon Divider: Green, Black, Red, Orange"
                  >
                    <div className="stripe-green h-full flex-[4] bg-[#064e3b]" />
                    <div className="stripe-black h-full flex-[1.2] bg-[#0a0a0a]" />
                    <div className="stripe-red h-full flex-[1.2] bg-[#dc2626]" />
                    <div className="stripe-orange h-full flex-[1.4] bg-[#ea580c]" />
                  </div>

                  {/* Statutory Footer with National Motto */}
                  <div className="text-center text-[10px] text-slate-600 pt-2 space-y-1">
                    <div className="font-extrabold text-emerald-950 tracking-wider text-[11px] flex items-center justify-center gap-1.5">
                      <span className="text-amber-500">★</span>
                      REPUBLIC OF ZAMBIA • "ONE ZAMBIA, ONE NATION"
                      <span className="text-amber-500">★</span>
                    </div>
                    <div>
                      E-SAPP Web-Enabled MIS • Joint Implementation between UNZA Dept. of Computer Science and
                      Ministry of Agriculture (MoA)
                    </div>
                    <div className="text-slate-500 font-mono text-[9px]">
                      Contract Review Ref: TECH-4 Customer Communication System • JCCC Secretariat:
                      jccc.esapp@moa.gov.zm
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= MODAL BOTTOM CONTROLS ================= */}
            <div className="no-print mt-4 flex justify-between items-center">
              <button
                onClick={handlePrintCertificate}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-800 cursor-pointer shadow-2xs"
              >
                <Printer className="w-4 h-4 text-slate-600" /> Print Certificate (A4)
              </button>

              <button
                onClick={() => setActiveModalDeliverable(null)}
                className="bg-emerald-700 text-white font-bold text-xs px-5 py-2 rounded-lg hover:bg-emerald-800 cursor-pointer shadow-2xs"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Dialog */}
      {rejectingDeliverableId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-base text-red-700 flex items-center gap-2">
                <Ban className="w-5 h-5" /> Formal Deliverable Rejection
              </h3>
              <button
                onClick={() => setRejectingDeliverableId(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ×
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Enter the formal contractual reasons for rejecting this deliverable. This will be
              recorded in the sign-off register and dispatched to the Consultant project manager:
            </p>

            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g. Mandatory criterion 4 not met: MoA staging server provisioning checklist lacks DMZ IP allocation and firewall rules..."
              rows={4}
              className="w-full text-xs p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setRejectingDeliverableId(null)}
                className="px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 text-xs font-bold bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer shadow-2xs"
              >
                Record Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
