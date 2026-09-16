import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ProjectOverview } from './components/ProjectOverview';
import { WbsScheduleView } from './components/WbsScheduleView';
import { DeliverablesView } from './components/DeliverablesView';
import { CommunicationHub } from './components/CommunicationHub';
import { MeetingsActionsView } from './components/MeetingsActionsView';
import { GovernanceLogsView } from './components/GovernanceLogsView';
import { KpiHealthView } from './components/KpiHealthView';
import { ContractDocumentsView } from './components/ContractDocumentsView';
import { ExternalInterfacesView } from './components/ExternalInterfacesView';
import { PaymentMilestonesView } from './components/PaymentMilestonesView';
import { PublicConsultationView } from './components/PublicConsultationView';

import {
  INITIAL_CONTACTS,
  COMMUNICATION_MATRIX_ITEMS,
  ESCALATION_RULES,
  INITIAL_MEETINGS,
  INITIAL_ACTIONS,
  INITIAL_DECISIONS,
  INITIAL_ISSUES,
  INITIAL_CHANGE_REQUESTS,
  INITIAL_KPIS,
  INITIAL_DELIVERABLES,
  INITIAL_EXTERNAL_INTERFACES,
  INITIAL_PAYMENT_MILESTONES,
  INITIAL_CONSULTATIONS,
  WBS_PHASES,
  CONTRACT_INFO,
} from './data/mockData';

import {
  ActionItem,
  ChangeRequest,
  Contact,
  DecisionItem,
  DeliverableItem,
  IssueItem,
  Meeting,
  ProjectKPIs,
  WBSPhase,
  ExternalInterface,
  PaymentMilestone,
  ConsultationItem,
  ConsultationComment,
} from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Core application state
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [commMatrix] = useState(COMMUNICATION_MATRIX_ITEMS);
  const [escalationRules] = useState(ESCALATION_RULES);
  const [meetings, setMeetings] = useState<Meeting[]>(INITIAL_MEETINGS);
  const [actions, setActions] = useState<ActionItem[]>(INITIAL_ACTIONS);
  const [decisions, setDecisions] = useState<DecisionItem[]>(INITIAL_DECISIONS);
  const [issues, setIssues] = useState<IssueItem[]>(INITIAL_ISSUES);
  const [changeRequests, setChangeRequests] = useState<ChangeRequest[]>(INITIAL_CHANGE_REQUESTS);
  const [kpis, setKpis] = useState<ProjectKPIs>(INITIAL_KPIS);
  const [deliverables, setDeliverables] = useState<DeliverableItem[]>(INITIAL_DELIVERABLES);
  const [interfaces, setInterfaces] = useState<ExternalInterface[]>(INITIAL_EXTERNAL_INTERFACES);
  const [milestones, setMilestones] = useState<PaymentMilestone[]>(INITIAL_PAYMENT_MILESTONES);
  const [consultations, setConsultations] = useState<ConsultationItem[]>(INITIAL_CONSULTATIONS);
  const [wbsPhases] = useState<WBSPhase[]>(WBS_PHASES);

  // Deliverable Certificate Modal
  const [activeModalDeliverable, setActiveModalDeliverable] = useState<DeliverableItem | null>(null);

  // Deliverable Checklist toggle handler
  const handleToggleChecklist = (deliverableId: string, checklistItemId: string) => {
    setDeliverables((prev) =>
      prev.map((d) => {
        if (d.id === deliverableId) {
          const updatedChecklist = d.checklist.map((item) =>
            item.id === checklistItemId ? { ...item, isCompleted: !item.isCompleted } : item
          );
          const allMandatoryDone = updatedChecklist
            .filter((c) => c.isMandatory !== false)
            .every((item) => item.isCompleted);
          return {
            ...d,
            checklist: updatedChecklist,
            status: allMandatoryDone
              ? d.status === 'Approved'
                ? 'Approved'
                : 'Under Review'
              : 'In Progress',
          };
        }
        return d;
      })
    );
  };

  // Deliverable Acceptance Certificate signing handler
  const handleApproveDeliverable = (deliverableId: string, approverName: string, comments?: string) => {
    const today = new Date().toISOString().substring(0, 10);
    const targetDel = deliverables.find((d) => d.id === deliverableId);
    const certNum =
      targetDel?.certificateNo ||
      `CERT-${targetDel?.code || deliverableId}-${today.replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;

    setDeliverables((prev) =>
      prev.map((d) => {
        if (d.id === deliverableId) {
          return {
            ...d,
            status: 'Approved',
            approvedDate: today,
            certificateNo: certNum,
            acceptanceSignedBy: approverName || 'Eng. John Banda (MoA PM)',
            checklist: d.checklist.map((item) => ({ ...item, isCompleted: true })),
          };
        }
        return d;
      })
    );

    // Update matching payment milestone
    setMilestones((prev) =>
      prev.map((m) => {
        if (m.deliverableId === deliverableId || m.deliverableCode === deliverableId) {
          return {
            ...m,
            status: 'Certified',
            certifiedAt: today,
            certificateNo: certNum,
          };
        }
        return m;
      })
    );

    // Update KPIs approved count and health
    setKpis((prev) => ({
      ...prev,
      deliverablesApproved: Math.min(prev.deliverablesApproved + 1, prev.totalDeliverables),
      approvalWithin3DaysPct: 100,
    }));

    // Record this milestone in the decision log
    if (targetDel) {
      const newDecision: DecisionItem = {
        id: decisions.length + 1,
        decisionCode: `D-${String(decisions.length + 1).padStart(3, '0')}`,
        description: `Formal Acceptance Certificate executed for Deliverable ${targetDel.code} (${targetDel.title}). Payment Tranche (${targetDel.paymentPercentage}%) certified and released.`,
        madeByContactId: 1,
        madeByName: approverName || 'Eng. John Banda (MoA PM)',
        impact: 'Contractual Milestone Release & Budget Tranche Activation',
        status: 'Active',
        decidedAt: today,
        meetingId: 3,
      };
      setDecisions((prev) => [newDecision, ...prev]);
    }
  };

  // Deliverable Rejection handler
  const handleRejectDeliverable = (deliverableId: string, reason: string) => {
    setDeliverables((prev) =>
      prev.map((d) =>
        d.id === deliverableId ? { ...d, status: 'Rejected', rejectionReason: reason } : d
      )
    );

    const targetDel = deliverables.find((d) => d.id === deliverableId);

    // Record formal issue
    const newIssue: IssueItem = {
      id: issues.length + 1,
      issueCode: `I-${String(issues.length + 1).padStart(3, '0')}`,
      description: `Deliverable ${targetDel?.code || deliverableId} Formal Rejection: ${reason}`,
      raisedByContactId: 1,
      raisedByName: 'Eng. John Banda (MoA PM)',
      severity: 'High',
      ownerContactId: 4,
      ownerName: targetDel ? `${targetDel.leadOwner} (UNZA Lead)` : 'Chimwemwe Sinyinza (UNZA Project Lead)',
      status: 'Open',
      escalationLevel: 2,
      responseDeadline: new Date(Date.now() + 48 * 3600 * 1000).toISOString().substring(0, 16).replace('T', ' '),
      createdAt: new Date().toISOString().substring(0, 16).replace('T', ' '),
    };
    setIssues((prev) => [newIssue, ...prev]);
  };

  // Submit Deliverable for MoA review handler
  const handleSubmitForReview = (deliverableId: string) => {
    setDeliverables((prev) =>
      prev.map((d) =>
        d.id === deliverableId
          ? {
              ...d,
              status: 'Under Review',
              submissionDate: new Date().toISOString().substring(0, 10),
            }
          : d
      )
    );
  };

  // Contact Creation
  const handleAddContact = (newContact: Omit<Contact, 'id'>) => {
    const created: Contact = {
      ...newContact,
      id: contacts.length + 1,
    };
    setContacts((prev) => [...prev, created]);
  };

  // Meeting Creation
  const handleAddMeeting = (newMeeting: Omit<Meeting, 'id'>) => {
    const created: Meeting = {
      ...newMeeting,
      id: meetings.length + 1,
    };
    setMeetings((prev) => [created, ...prev]);
  };

  // Action status update
  const handleUpdateActionStatus = (actionId: number, newStatus: ActionItem['status']) => {
    setActions((prev) =>
      prev.map((act) => (act.id === actionId ? { ...act, status: newStatus } : act))
    );
  };

  // Action creation
  const handleAddAction = (newAction: Omit<ActionItem, 'id' | 'actionCode'>) => {
    const nextCode = `ACT-${String(actions.length + 1).padStart(3, '0')}`;
    const created: ActionItem = {
      ...newAction,
      id: actions.length + 1,
      actionCode: nextCode,
    };
    setActions((prev) => [created, ...prev]);
  };

  // Decision creation
  const handleAddDecision = (newDecision: Omit<DecisionItem, 'id' | 'decisionCode'>) => {
    const nextCode = `D-${String(decisions.length + 1).padStart(3, '0')}`;
    const created: DecisionItem = {
      ...newDecision,
      id: decisions.length + 1,
      decisionCode: nextCode,
    };
    setDecisions((prev) => [created, ...prev]);
  };

  // Issue creation
  const handleAddIssue = (newIssue: Omit<IssueItem, 'id' | 'issueCode' | 'createdAt'>) => {
    const nextCode = `I-${String(issues.length + 1).padStart(3, '0')}`;
    const now = new Date().toISOString().substring(0, 16).replace('T', ' ');
    const created: IssueItem = {
      ...newIssue,
      id: issues.length + 1,
      issueCode: nextCode,
      createdAt: now,
    };
    setIssues((prev) => [created, ...prev]);
  };

  // Escalate Issue
  const handleEscalateIssue = (issueId: number, targetLevel?: 1 | 2 | 3 | 4) => {
    setIssues((prev) =>
      prev.map((iss) => {
        if (iss.id !== issueId) return iss;
        const nextLevel = targetLevel ?? ((Math.min(iss.escalationLevel + 1, 4)) as 1 | 2 | 3 | 4);
        return { ...iss, escalationLevel: nextLevel };
      })
    );
  };

  // Resolve Issue
  const handleResolveIssue = (issueId: number, resolutionText: string) => {
    const now = new Date().toISOString().substring(0, 16).replace('T', ' ');
    setIssues((prev) =>
      prev.map((iss) =>
        iss.id === issueId
          ? {
              ...iss,
              status: 'Resolved',
              resolution: resolutionText,
              resolvedAt: now,
            }
          : iss
      )
    );
  };

  // Change Request creation
  const handleAddChangeRequest = (
    newCR: Omit<ChangeRequest, 'id' | 'crCode' | 'createdAt' | 'decision'>
  ) => {
    const nextCode = `CR-${String(changeRequests.length + 1).padStart(3, '0')}`;
    const today = new Date().toISOString().substring(0, 10);
    const created: ChangeRequest = {
      ...newCR,
      id: changeRequests.length + 1,
      crCode: nextCode,
      createdAt: today,
      decision: 'Pending',
    };
    setChangeRequests((prev) => [created, ...prev]);
  };

  // Decide on Change Request
  const handleDecideChangeRequest = (
    crId: number,
    decision: 'Approved' | 'Rejected' | 'Deferred',
    notes: string
  ) => {
    setChangeRequests((prev) =>
      prev.map((cr) => {
        if (cr.id === crId) {
          return {
            ...cr,
            decision,
            decisionNotes: notes,
            decidedAt: new Date().toISOString().substring(0, 10),
            decidedByName: 'Joint CCB Committee',
          };
        }
        return cr;
      })
    );
  };

  // Add Consultation Comment
  const handleAddConsultationComment = (
    consultationId: number,
    newComment: Omit<ConsultationComment, 'id' | 'consultationId' | 'status' | 'submittedAt'>
  ) => {
    const now = new Date().toISOString().substring(0, 19).replace('T', ' ');
    setConsultations((prev) =>
      prev.map((c) => {
        if (c.id === consultationId) {
          const commentId = (c.comments?.length || 0) + 1;
          const createdComment: ConsultationComment = {
            ...newComment,
            id: commentId,
            consultationId,
            status: 'Approved',
            submittedAt: now,
          };
          const updatedComments = [...(c.comments || []), createdComment];
          return {
            ...c,
            commentCount: updatedComments.length,
            comments: updatedComments,
          };
        }
        return c;
      })
    );
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      {/* Top Main Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentDay={kpis.currentDay}
        totalDays={kpis.totalDays}
        approvedDeliverables={deliverables.filter((d) => d.status === 'Approved').length}
        totalDeliverables={deliverables.length}
        openActionCount={actions.filter((a) => a.status !== 'Completed').length}
        activeIssueCount={issues.filter((i) => i.status !== 'Resolved').length}
        activeConsultationsCount={consultations.filter((c) => c.status === 'Ongoing' || c.status === 'Due3Days').length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {activeTab === 'overview' && (
          <ProjectOverview
            kpis={kpis}
            deliverables={deliverables}
            interfaces={interfaces}
            milestones={milestones}
            setActiveTab={setActiveTab}
            onOpenDeliverable={(d) => {
              setActiveModalDeliverable(d);
              setActiveTab('deliverables');
            }}
          />
        )}

        {activeTab === 'wbs' && (
          <WbsScheduleView phases={wbsPhases} currentDay={kpis.currentDay} />
        )}

        {activeTab === 'deliverables' && (
          <DeliverablesView
            deliverables={deliverables}
            onToggleChecklist={handleToggleChecklist}
            onApproveDeliverable={handleApproveDeliverable}
            onRejectDeliverable={handleRejectDeliverable}
            onSubmitForReview={handleSubmitForReview}
            activeModalDeliverable={activeModalDeliverable}
            setActiveModalDeliverable={setActiveModalDeliverable}
          />
        )}

        {activeTab === 'milestones' && (
          <PaymentMilestonesView
            milestones={milestones}
            deliverables={deliverables}
            onOpenCertificate={(d) => {
              setActiveModalDeliverable(d);
              setActiveTab('deliverables');
            }}
          />
        )}

        {activeTab === 'interfaces' && (
          <ExternalInterfacesView
            interfaces={interfaces}
            onNavigateToGovernance={() => setActiveTab('governance')}
          />
        )}

        {activeTab === 'consultations' && <PublicConsultationView />}

        {activeTab === 'communication' && (
          <CommunicationHub
            contacts={contacts}
            commMatrix={commMatrix}
            escalationRules={escalationRules}
            onAddContact={handleAddContact}
          />
        )}

        {activeTab === 'meetings' && (
          <MeetingsActionsView
            meetings={meetings}
            actions={actions}
            contacts={contacts}
            onAddMeeting={handleAddMeeting}
            onUpdateActionStatus={handleUpdateActionStatus}
            onAddAction={handleAddAction}
          />
        )}

        {activeTab === 'governance' && (
          <GovernanceLogsView
            decisions={decisions}
            issues={issues}
            changeRequests={changeRequests}
            contacts={contacts}
            onAddDecision={handleAddDecision}
            onAddIssue={handleAddIssue}
            onEscalateIssue={handleEscalateIssue}
            onResolveIssue={handleResolveIssue}
            onAddChangeRequest={handleAddChangeRequest}
            onDecideChangeRequest={handleDecideChangeRequest}
          />
        )}

        {activeTab === 'kpis' && <KpiHealthView kpis={kpis} />}

        {activeTab === 'documents' && <ContractDocumentsView />}
      </main>

      {/* Official Formal Contract Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 px-4 sm:px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-slate-800">
              E-SAPP Web-Enabled Management Information System (MIS)
            </span>{' '}
            &bull; Joint Implementation between UNZA Dept. of Computer Science and Ministry of
            Agriculture (MoA)
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>
              Contract Review Ref: <strong>TECH-4 Customer Communication System</strong>
            </span>
            <span>&bull;</span>
            <span>
              JCCC Secretariat:{' '}
              <a
                href="mailto:jccc.esapp@moa.gov.zm"
                className="text-emerald-700 underline font-mono"
              >
                jccc.esapp@moa.gov.zm
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
