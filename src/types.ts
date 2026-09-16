export type AuthorityLevel = 'Operational' | 'Technical' | 'Approver' | 'Steering';
export type InterfaceType = 
  | 'Contractual' 
  | 'Technical' 
  | 'Functional' 
  | 'DataIntegration' 
  | 'Testing' 
  | 'Training' 
  | 'Support';

export type OrganisationType = 'MoA' | 'Consultant' | 'External';

export interface Contact {
  id: number;
  fullName: string;
  organisation: OrganisationType;
  roleTitle: string;
  interfaceType: InterfaceType;
  email: string;
  phone: string;
  authorityLevel: AuthorityLevel;
  responsibilities: string;
  isActive: boolean;
  studentId?: string;
  cluster?: string;
  contractRoles?: string[];
}

export type CommType = 
  | 'DailyReport' 
  | 'TeamLeaderUpdate' 
  | 'WeeklyProgress' 
  | 'JCCC' 
  | 'DesignReview' 
  | 'TestReview' 
  | 'PhaseGate' 
  | 'ChangeRequest' 
  | 'Escalation' 
  | 'Steering' 
  | 'AdHoc';

export type CommChannel = 
  | 'Email' 
  | 'Trello' 
  | 'SharedDrive' 
  | 'VideoCall' 
  | 'FaceToFace' 
  | 'FormalLetter' 
  | 'Phone';

export type CommStatus = 'Scheduled' | 'Sent' | 'Acknowledged' | 'Responded' | 'Overdue' | 'Closed';

export interface CommunicationLog {
  id: number;
  commType: CommType;
  subject: string;
  body: string;
  fromContactId: number;
  fromContactName?: string;
  recipients: number[];
  recipientNames?: string[];
  channel: CommChannel;
  scheduledAt: string;
  sentAt?: string;
  responseDueAt: string;
  respondedAt?: string;
  status: CommStatus;
  outputDocument?: string;
}

export interface CommunicationMatrixItem {
  id: number;
  eventName: string;
  fromRole: string;
  toRole: string;
  channel: string;
  frequency: string;
  responseHours: number;
  outputDocument: string;
  tech4Reference: string;
}

export interface ActionItem {
  id: number;
  actionCode?: string;
  meetingId?: number;
  description: string;
  ownerContactId: number;
  ownerName: string;
  dueDate: string;
  status: 'Open' | 'InProgress' | 'Completed' | 'Overdue' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  completedAt?: string;
  createdAt: string;
}

export interface Meeting {
  id: number;
  commType: CommType;
  title: string;
  meetingDate: string;
  venue: string;
  chairContactId: number;
  chairName: string;
  attendees: string[];
  agenda: string;
  minutesText: string;
  nextMeetingAt?: string;
  approvedBy?: string;
  approvedAt?: string;
  actionItemIds: number[];
}

export interface DecisionItem {
  id: number;
  decisionCode: string;
  description: string;
  madeByContactId: number;
  madeByName: string;
  meetingId?: number;
  meetingTitle?: string;
  impact: string;
  status: 'Active' | 'Superseded' | 'Revoked';
  decidedAt: string;
}

export interface IssueItem {
  id: number;
  issueCode: string;
  description: string;
  raisedByContactId: number;
  raisedByName: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  ownerContactId: number;
  ownerName: string;
  status: 'Open' | 'InProgress' | 'Escalated' | 'Resolved' | 'Closed';
  escalationLevel: 1 | 2 | 3 | 4;
  responseDeadline: string;
  resolution?: string;
  resolvedAt?: string;
  createdAt: string;
}

export interface ChangeRequest {
  id: number;
  crCode: string;
  title: string;
  description: string;
  requestedByContactId: number;
  requestedByName: string;
  impactScope: string;
  impactSchedule: string;
  impactCost: number;
  impactRisk: 'Low' | 'Medium' | 'High';
  recommendation: string;
  decision: 'Pending' | 'Approved' | 'Rejected' | 'Deferred';
  decidedByContactId?: number;
  decidedByName?: string;
  decidedAt?: string;
  decisionNotes?: string;
  createdAt: string;
}

export interface DeliverableChecklistItem {
  id: string;
  label: string;
  isMandatory?: boolean;
  isCompleted: boolean;
  verifiedBy?: string;
  verifiedAt?: string;
  evidenceNote?: string;
  comments?: string;
}

export interface DeliverableItem {
  id: string; // e.g. 'D-1'
  code: string;
  title: string;
  targetDay: number;
  phase: string;
  phaseNo?: number;
  leadOwner: string;
  supportingOwners?: string;
  cluster?: string;
  clientApprover: string;
  status: 'Pending' | 'In Progress' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected' | 'Overdue';
  submissionDate?: string;
  approvedDate?: string;
  description: string;
  paymentPercentage: number;
  checklist: DeliverableChecklistItem[];
  acceptanceSignedBy?: string;
  rejectionReason?: string;
  certificateNo?: string;
  approverPanel?: string;
  responseSlaDays?: number;
  escalationContact?: string;
}

export interface ExternalInterface {
  id: number;
  name: string;
  protocol: string;
  purpose: string;
  direction: 'Inbound' | 'Outbound' | 'Bidirectional';
  status: 'Planning' | 'Connected' | 'Testing' | 'Live' | 'Blocked';
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  lastSyncAt?: string;
  notes?: string;
}

export interface PaymentMilestone {
  id: number;
  deliverableId: string;
  deliverableCode: string;
  deliverableTitle: string;
  percentage: number;
  amountZMW: number;
  status: 'Pending' | 'Certified' | 'Invoiced' | 'Paid';
  certifiedAt?: string;
  paidAt?: string;
  certificateNo?: string;
}

export interface SignoffRecord {
  id: number;
  signoffCode?: string;
  deliverableId: string;
  deliverableCode: string;
  deliverableTitle?: string;
  signedBy: string;
  signedAt: string;
  decision: 'Approved' | 'ApprovedWithComments' | 'Rejected';
  comments: string;
  certificateNo: string;
  paymentTriggered: boolean;
  paymentAmount: number;
  approverPanel?: string;
  paymentTranchePct?: number;
  notes?: string;
}

export interface SlaCheckResult {
  timestamp: string;
  deliverableReviewBreaches: number;
  minutesDeliveryBreaches: number;
  overdueDeliverables: number;
  interfaceSyncAlerts: number;
  notificationsQueued: number;
  details: string[];
}

export interface WBSPhase {
  id: string;
  name: string;
  dayStart: number;
  dayEnd: number;
  description: string;
  color: string;
  workPackages: WorkPackage[];
}

export interface WorkPackage {
  id: string;
  code: string;
  title: string;
  dayStart: number;
  dayEnd: number;
  deliverableCode?: string;
  responsibleLead: string;
  supportingOwners?: string;
  moaCounterpart: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'At Risk';
  progress: number;
  isCriticalPath: boolean;
  activities: string[];
}

export interface GroupMemberRole {
  roleTitle: string;
  replaces: string;
  interfaceType: InterfaceType;
  authorityLevel: AuthorityLevel;
}

export interface GroupMemberResponsibility {
  area: string;
  responsibility: string;
}

export interface GroupMember {
  studentName: string;
  studentId: string;
  cluster: string;
  primaryPortfolio: string;
  email: string;
  phone: string;
  authority: string;
  contractRoles: string[];
  replacesOriginals?: string[];
  ownedDeliverables: string[];
  supportedDeliverables: string[];
  paymentMilestones: string[];
  portfolioValueZMW: number;
  portfolioPercentage: number;
  responsibilities: GroupMemberResponsibility[];
  keyInterfacePartners: {
    moa: string;
    internal: string;
    external?: string;
  };
}

export interface GroupMeetingProtocol {
  event: string;
  frequency: string;
  lead: string;
  output: string;
}

export interface EscalationLevelRule {
  level: number;
  title: string;
  counterparts: string;
  issueTypes: string;
  responseTime: string;
  responseHours: number;
  protocol: string;
}

export interface ProjectKPIs {
  scheduleProgressPct: number;
  currentDay: number;
  totalDays: number;
  deliverablesApproved: number;
  totalDeliverables: number;
  weeklyReportsOnTimePct: number;
  meetingMinutesIn24hPct: number;
  approvalWithin3DaysPct: number;
  escalationsAcknowledgedPct: number;
  changeRequestsProcessedPct: number;
  stakeholderSatisfactionScore: number; // out of 5
  openCriticalIssues: number;
  overdueActionsCount: number;
  budgetUtilisationPct: number;
}

export type ConsultationStatus = 'Ongoing' | 'Due3Days' | 'Completed' | 'Closed' | 'Trending';

export interface ConsultationDocument {
  id: number;
  consultationId: number;
  title: string;
  docType: 'Notice' | 'RIA' | 'Draft' | 'Annex' | 'Other';
  filePath: string;
  uploadedAt: string;
  fileSize?: string;
}

export interface ConsultationComment {
  id: number;
  consultationId: number;
  submitterName: string;
  submitterEmail: string;
  submitterOrg?: string;
  commentText: string;
  attachmentPath?: string;
  isPublic: boolean;
  status: 'Pending' | 'Approved' | 'Rejected';
  submittedAt: string;
}

export interface ConsultationItem {
  id: number;
  consultationCode: string;
  title: string;
  summary: string;
  agency: string;
  industry: string;
  periodStart: string;
  periodEnd: string;
  status: ConsultationStatus;
  commentCount: number;
  regulatoryImpact?: string;
  draftPolicyUrl?: string;
  createdAt: string;
  documents?: ConsultationDocument[];
  comments?: ConsultationComment[];
}

