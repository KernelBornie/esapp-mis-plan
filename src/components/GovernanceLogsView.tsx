import React, { useState } from 'react';
import { 
  AlertCircle, 
  GitPullRequest, 
  FileCheck2, 
  Flame, 
  ShieldAlert, 
  Plus, 
  Check, 
  X, 
  ArrowUpRight, 
  User, 
  AlertTriangle,
  Clock
} from 'lucide-react';
import { ChangeRequest, Contact, DecisionItem, IssueItem } from '../types';

interface GovernanceLogsViewProps {
  decisions: DecisionItem[];
  issues: IssueItem[];
  changeRequests: ChangeRequest[];
  contacts: Contact[];
  onAddDecision: (decision: Omit<DecisionItem, 'id' | 'decisionCode'>) => void;
  onAddIssue: (issue: Omit<IssueItem, 'id' | 'issueCode' | 'createdAt'>) => void;
  onEscalateIssue: (issueId: number, targetLevel?: 1 | 2 | 3 | 4) => void;
  onResolveIssue: (issueId: number, resolution: string) => void;
  onAddChangeRequest: (cr: Omit<ChangeRequest, 'id' | 'crCode' | 'createdAt'>) => void;
  onDecideChangeRequest: (crId: number, decision: 'Approved' | 'Rejected' | 'Deferred', notes: string) => void;
}

export const GovernanceLogsView: React.FC<GovernanceLogsViewProps> = ({
  decisions,
  issues,
  changeRequests,
  contacts,
  onAddDecision,
  onAddIssue,
  onEscalateIssue,
  onResolveIssue,
  onAddChangeRequest,
  onDecideChangeRequest,
}) => {
  const [activeTab, setActiveTab] = useState<'decisions' | 'issues' | 'changes'>('issues');
  const [isNewDecisionOpen, setIsNewDecisionOpen] = useState(false);
  const [isNewIssueOpen, setIsNewIssueOpen] = useState(false);
  const [isNewCROpen, setIsNewCROpen] = useState(false);
  const [resolvingIssueId, setResolvingIssueId] = useState<number | null>(null);
  const [resolutionText, setResolutionText] = useState('');
  const [decidingCRId, setDecidingCRId] = useState<number | null>(null);
  const [crDecisionNotes, setCRDecisionNotes] = useState('');

  // Form states: Decision
  const [descDecision, setDescDecision] = useState('');
  const [makerId, setMakerId] = useState<number>(contacts[0]?.id || 1);
  const [impactDecision, setImpactDecision] = useState('');

  // Form states: Issue
  const [descIssue, setDescIssue] = useState('');
  const [raisedById, setRaisedById] = useState<number>(contacts[0]?.id || 1);
  const [ownerIssueId, setOwnerIssueId] = useState<number>(contacts[0]?.id || 1);
  const [sevIssue, setSevIssue] = useState<IssueItem['severity']>('High');

  // Form states: Change Request
  const [crTitle, setCrTitle] = useState('');
  const [crDesc, setCrDesc] = useState('');
  const [crReqById, setCrReqById] = useState<number>(contacts[0]?.id || 1);
  const [crScope, setCrScope] = useState('');
  const [crSchedule, setCrSchedule] = useState('0 days');
  const [crCost, setCrCost] = useState<number>(0);
  const [crRisk, setCrRisk] = useState<'Low' | 'Medium' | 'High'>('Low');
  const [crRec, setCrRec] = useState('');

  const handleCreateDecision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!descDecision) return;
    const maker = contacts.find(c => c.id === makerId);
    onAddDecision({
      description: descDecision,
      madeByContactId: makerId,
      madeByName: maker ? maker.fullName : 'Authorized Representative',
      impact: impactDecision,
      status: 'Active',
      decidedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    });
    setIsNewDecisionOpen(false);
    setDescDecision('');
    setImpactDecision('');
  };

  const handleCreateIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!descIssue) return;
    const raised = contacts.find(c => c.id === raisedById);
    const owner = contacts.find(c => c.id === ownerIssueId);

    onAddIssue({
      description: descIssue,
      raisedByContactId: raisedById,
      raisedByName: raised ? raised.fullName : 'Team Member',
      severity: sevIssue,
      ownerContactId: ownerIssueId,
      ownerName: owner ? owner.fullName : 'Responsible Lead',
      status: 'Open',
      escalationLevel: 1,
      responseDeadline: '2026-09-27 17:00',
    });
    setIsNewIssueOpen(false);
    setDescIssue('');
  };

  const handleCreateCR = (e: React.FormEvent) => {
    e.preventDefault();
    if (!crTitle || !crDesc) return;
    const req = contacts.find(c => c.id === crReqById);

    onAddChangeRequest({
      title: crTitle,
      description: crDesc,
      requestedByContactId: crReqById,
      requestedByName: req ? req.fullName : 'Requester',
      impactScope: crScope,
      impactSchedule: crSchedule,
      impactCost: crCost,
      impactRisk: crRisk,
      recommendation: crRec,
      decision: 'Pending',
    });
    setIsNewCROpen(false);
    setCrTitle('');
    setCrDesc('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4" /> Contract Control & Governance Logs
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              Decision Log, 4-Level Escalation & Change Control Board (CCB)
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Strictly enforces contract step 5, 6, and 7: Every decision leaves a permanent trace, problems trigger immediate countdown escalation, and scope alterations require formal Change Requests.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg self-start md:self-center shrink-0">
            <button
              onClick={() => setActiveTab('issues')}
              className={`text-xs font-bold px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeTab === 'issues' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Issue Log & Escalation ({issues.filter(i => i.status !== 'Closed').length})
            </button>
            <button
              onClick={() => setActiveTab('decisions')}
              className={`text-xs font-bold px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeTab === 'decisions' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Decision Log ({decisions.length})
            </button>
            <button
              onClick={() => setActiveTab('changes')}
              className={`text-xs font-bold px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeTab === 'changes' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Change Control ({changeRequests.length})
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: ISSUES & ESCALATION ENGINE */}
      {activeTab === 'issues' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Active Issues & Blocker Triage</h3>
              <p className="text-xs text-slate-500">Unresolved operational blockers trigger level progression (Level 1 to 4).</p>
            </div>
            <button
              onClick={() => setIsNewIssueOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white px-3.5 py-2 rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" /> Raise New Issue
            </button>
          </div>

          <div className="space-y-3">
            {issues.map((issue) => (
              <div 
                key={issue.id}
                className={`p-5 rounded-xl border bg-white shadow-2xs space-y-3 ${
                  issue.severity === 'Critical' 
                    ? 'border-red-300' 
                    : issue.severity === 'High' 
                    ? 'border-amber-300' 
                    : 'border-slate-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {issue.issueCode}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      issue.severity === 'Critical' 
                        ? 'bg-red-100 text-red-800' 
                        : issue.severity === 'High' 
                        ? 'bg-amber-100 text-amber-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {issue.severity} Severity
                    </span>
                    <span className="text-[11px] font-bold text-purple-800 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">
                      Level {issue.escalationLevel} Escalation
                    </span>
                  </div>

                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full self-start sm:self-auto ${
                    issue.status === 'Resolved' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : issue.status === 'Escalated' 
                      ? 'bg-amber-100 text-amber-800' 
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {issue.status}
                  </span>
                </div>

                <p className="text-xs font-semibold text-slate-900 leading-relaxed">
                  {issue.description}
                </p>

                {issue.resolution && (
                  <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg text-xs text-emerald-900">
                    <strong>Resolution:</strong> {issue.resolution}
                  </div>
                )}

                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                  <div className="flex items-center gap-4">
                    <span>Raised By: <strong className="text-slate-700">{issue.raisedByName}</strong></span>
                    <span>Owner: <strong className="text-slate-700">{issue.ownerName}</strong></span>
                    <span className="flex items-center gap-1 text-slate-600">
                      <Clock className="w-3.5 h-3.5" /> Deadline: {issue.responseDeadline}
                    </span>
                  </div>

                  {issue.status !== 'Resolved' && (
                    <div className="flex items-center gap-2">
                      {issue.escalationLevel < 4 && (
                        <button
                          onClick={() => onEscalateIssue(issue.id)}
                          className="bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 font-bold text-xs px-2.5 py-1 rounded flex items-center gap-1 cursor-pointer"
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" />
                          Escalate to Level {issue.escalationLevel + 1}
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setResolvingIssueId(issue.id);
                          setResolutionText('');
                        }}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-2.5 py-1 rounded cursor-pointer"
                      >
                        Resolve Issue
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: DECISIONS LOG */}
      {activeTab === 'decisions' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Contractual Decision Log</h3>
              <p className="text-xs text-slate-500">Permanent record of binding design, technical, and scope decisions.</p>
            </div>
            <button
              onClick={() => setIsNewDecisionOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" /> Record Decision
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold text-[11px]">
                    <th className="p-3.5">Code</th>
                    <th className="p-3.5">Decision Text</th>
                    <th className="p-3.5">Made By</th>
                    <th className="p-3.5">Contractual Impact</th>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {decisions.map((dec) => (
                    <tr key={dec.id} className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-mono font-bold text-slate-900">{dec.decisionCode}</td>
                      <td className="p-3.5 font-semibold text-slate-900 max-w-sm">{dec.description}</td>
                      <td className="p-3.5 font-medium">{dec.madeByName}</td>
                      <td className="p-3.5 text-slate-600 max-w-xs">{dec.impact}</td>
                      <td className="p-3.5 font-mono text-[11px] text-slate-500">{dec.decidedAt}</td>
                      <td className="p-3.5">
                        <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded">
                          {dec.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CHANGE CONTROL BOARD (CCB) */}
      {activeTab === 'changes' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Change Control Board (CCB) Register</h3>
              <p className="text-xs text-slate-500">Rigorous 7-step change management flow protecting the 50-day timeline.</p>
            </div>
            <button
              onClick={() => setIsNewCROpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" /> Submit Change Request
            </button>
          </div>

          <div className="space-y-4">
            {changeRequests.map((cr) => (
              <div key={cr.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                      {cr.crCode}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{cr.title}</h4>
                  </div>

                  <span className={`text-xs font-bold px-3 py-1 rounded-full self-start sm:self-auto ${
                    cr.decision === 'Approved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : cr.decision === 'Rejected'
                      ? 'bg-red-100 text-red-800'
                      : cr.decision === 'Deferred'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {cr.decision}
                  </span>
                </div>

                <div className="text-xs text-slate-600 space-y-1">
                  <strong>Description & Justification:</strong>
                  <p className="bg-slate-50 p-3 rounded-lg border border-slate-100">{cr.description}</p>
                </div>

                {/* 4-Vector Impact Analysis Box */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-[11px] font-semibold text-slate-500 block">Scope Impact</span>
                    <span className="font-medium text-slate-800">{cr.impactScope}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-[11px] font-semibold text-slate-500 block">Schedule Impact</span>
                    <span className="font-bold text-amber-700">{cr.impactSchedule}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-[11px] font-semibold text-slate-500 block">Cost Impact</span>
                    <span className="font-bold text-slate-900">${cr.impactCost.toLocaleString()}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-[11px] font-semibold text-slate-500 block">Risk Assessment</span>
                    <span className={`font-bold ${cr.impactRisk === 'High' ? 'text-red-700' : 'text-slate-800'}`}>
                      {cr.impactRisk} Risk
                    </span>
                  </div>
                </div>

                <div className="bg-emerald-50/40 p-3 rounded-lg border border-emerald-100 text-xs text-slate-700">
                  <strong>Consultant Recommendation:</strong> {cr.recommendation}
                </div>

                {cr.decisionNotes && (
                  <div className="text-xs text-slate-600">
                    <strong>CCB Decision Notes:</strong> {cr.decisionNotes} ({cr.decidedByName} &bull; {cr.decidedAt})
                  </div>
                )}

                {cr.decision === 'Pending' && (
                  <div className="pt-2 border-t border-slate-100 flex justify-end gap-2 text-xs">
                    <button
                      onClick={() => onDecideChangeRequest(cr.id, 'Approved', 'Approved by CCB without altering critical 50-day path.')}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-1.5 rounded cursor-pointer"
                    >
                      Approve CR
                    </button>
                    <button
                      onClick={() => onDecideChangeRequest(cr.id, 'Deferred', 'Deferred to 6-month support phase to safeguard Go-Live.')}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded cursor-pointer"
                    >
                      Defer to Phase 2
                    </button>
                    <button
                      onClick={() => onDecideChangeRequest(cr.id, 'Rejected', 'Rejected due to contract scope divergence.')}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1.5 rounded cursor-pointer"
                    >
                      Reject CR
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Resolve Issue */}
      {resolvingIssueId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setResolvingIssueId(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900">Close Issue with Resolution</h3>
            <p className="text-xs text-slate-500 mt-1">Provide an auditable technical or operational explanation of the fix.</p>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (!resolutionText) return;
                onResolveIssue(resolvingIssueId, resolutionText);
                setResolvingIssueId(null);
              }}
              className="mt-4 space-y-3 text-xs"
            >
              <div>
                <label className="font-bold text-slate-700 block mb-1">Resolution Details</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Root cause identified, corrected schema deployed, confirmed by counterpart..."
                  value={resolutionText}
                  onChange={(e) => setResolutionText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setResolvingIssueId(null)}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold cursor-pointer"
                >
                  Commit Resolution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: New Issue */}
      {isNewIssueOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setIsNewIssueOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900">Raise Operational Issue</h3>
            <p className="text-xs text-slate-500 mt-1">Triggers Level 1 escalation with a 24-hour response clock.</p>

            <form onSubmit={handleCreateIssue} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Issue Description & Impact</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe technical hurdle, unreceived credential, or specification ambiguity..."
                  value={descIssue}
                  onChange={(e) => setDescIssue(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Raised By</label>
                <select
                  value={raisedById}
                  onChange={(e) => setRaisedById(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                >
                  {contacts.map(c => (
                    <option key={c.id} value={c.id}>{c.fullName} ({c.organisation})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Assigned Counterpart Owner</label>
                <select
                  value={ownerIssueId}
                  onChange={(e) => setOwnerIssueId(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                >
                  {contacts.map(c => (
                    <option key={c.id} value={c.id}>{c.fullName} ({c.roleTitle})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Severity Level</label>
                <select
                  value={sevIssue}
                  onChange={(e) => setSevIssue(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                >
                  <option value="Critical">Critical (Blocker for 50-day schedule)</option>
                  <option value="High">High (Sub-module delayed)</option>
                  <option value="Medium">Medium (Non-blocking hurdle)</option>
                  <option value="Low">Low (Clarification required)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewIssueOpen(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold cursor-pointer"
                >
                  Raise Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: New Decision */}
      {isNewDecisionOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setIsNewDecisionOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900">Record Binding Decision</h3>
            <p className="text-xs text-slate-500 mt-1">Entered into the official Decision Log with contractual authority.</p>

            <form onSubmit={handleCreateDecision} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Decision Statement</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Approved RESTful JSON Web Services as the standard interface for PASTEL..."
                  value={descDecision}
                  onChange={(e) => setDescDecision(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Decision Maker</label>
                <select
                  value={makerId}
                  onChange={(e) => setMakerId(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                >
                  {contacts.map(c => (
                    <option key={c.id} value={c.id}>{c.fullName} ({c.organisation} &bull; {c.roleTitle})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Impact Analysis</label>
                <textarea
                  rows={2}
                  placeholder="How this decision influences design, budget, or timeline..."
                  value={impactDecision}
                  onChange={(e) => setImpactDecision(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewDecisionOpen(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold cursor-pointer"
                >
                  Log Decision
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: New Change Request */}
      {isNewCROpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 my-8">
            <button
              onClick={() => setIsNewCROpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900">Submit Formal Change Request (CR)</h3>
            <p className="text-xs text-slate-500 mt-1">Evaluated by Change Control Board for scope, schedule, and cost impacts.</p>

            <form onSubmit={handleCreateCR} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Change Request Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Add provincial agro-ecological map layers"
                  value={crTitle}
                  onChange={(e) => setCrTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Requested By</label>
                <select
                  value={crReqById}
                  onChange={(e) => setCrReqById(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                >
                  {contacts.map(c => (
                    <option key={c.id} value={c.id}>{c.fullName} ({c.organisation})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description of Proposed Change & Justification</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Detailed functional change requested..."
                  value={crDesc}
                  onChange={(e) => setCrDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Schedule Impact</label>
                  <input
                    type="text"
                    placeholder="+2 days"
                    value={crSchedule}
                    onChange={(e) => setCrSchedule(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Cost Impact ($)</label>
                  <input
                    type="number"
                    value={crCost}
                    onChange={(e) => setCrCost(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Risk Level</label>
                  <select
                    value={crRisk}
                    onChange={(e) => setCrRisk(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Scope Impact Assessment</label>
                <input
                  type="text"
                  placeholder="Sub-modules or interfaces affected..."
                  value={crScope}
                  onChange={(e) => setCrScope(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Consultant Technical Recommendation</label>
                <textarea
                  rows={2}
                  placeholder="Recommend approval, rejection, or deferral to post-go-live phase..."
                  value={crRec}
                  onChange={(e) => setCrRec(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewCROpen(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold cursor-pointer"
                >
                  Submit to CCB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
