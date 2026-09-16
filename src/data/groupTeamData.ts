// ============================================================
// UNZA GROUP 6 — OFFICIAL TEAM DATA
// Contract: MoA-UNZA-E-SAPP-2026
// Group: UNZA Group 6 — 8 Students + Academic Supervisor
// ============================================================

export const ACADEMIC_SUPERVISOR = {
  name: 'Mr. Martin Phiri',
  role: 'Course Lecturer & Academic Supervisor',
  department: 'UNZA Department of Computer Science',
  email: 'martin.phiri@cs.unza.zm',
  phone: '+260 977 000111',
};

export const GOLDEN_RULE_TEXT =
  'Any verbal decision or instruction must be confirmed by email or recorded in formal meeting minutes within 24 hours to have contractual validity.';

// ============================================================
// GROUP MEMBERS — 8 STUDENTS (GROUP 6)
// ============================================================
export interface GroupMember {
  studentId: string;
  studentName: string;
  cluster: string;
  primaryPortfolio: string;
  authority: 'Operational' | 'Technical' | 'Approver' | 'Steering';
  portfolioPercentage: number;
  portfolioValueZMW: number;
  contractRoles: string[];
  replacesOriginals: string[];
  ownedDeliverables: string[];
  supportedDeliverables: string[];
  responsibilities: { area: string; responsibility: string }[];
  email: string;
  phone: string;
  keyInterfacePartners: { moa: string };
}

export const GROUP_MEMBERS: GroupMember[] = [
  {
    studentId: '2022067576',
    studentName: 'Chimwemwe Sinyinza',
    cluster: 'Governance & Lead',
    primaryPortfolio: 'Group Leader / Project Lead & Overall Integration',
    authority: 'Steering',
    portfolioPercentage: 20,
    portfolioValueZMW: 100000,
    contractRoles: [
      'Group Leader (GL)',
      'Project Manager',
      'Contractual Interface Lead',
      'JCCC Consultant Representative',
      'Final Deliverable Approver',
    ],
    replacesOriginals: ['Team Leader', 'Project Manager'],
    ownedDeliverables: ['D-1', 'D-5', 'D-8'],
    supportedDeliverables: ['D-2', 'D-3', 'D-4', 'D-6', 'D-7'],
    responsibilities: [
      { area: 'Overall Delivery', responsibility: 'Owns 50-day critical path and D-1 through D-8 sign-off coordination' },
      { area: 'Contractual Interface', responsibility: 'Sole formal dispatch conduit to MoA Project Coordinator' },
      { area: 'JCCC Representation', responsibility: 'Consultant representative on the Joint Coordination & Control Committee' },
      { area: 'Escalation Authority', responsibility: 'Level 1 counterpart for all operational escalations' },
      { area: 'Resource Management', responsibility: 'Team allocation, scheduling, and workload balancing across 8 members' },
    ],
    email: 'chimwemwe.sinyinza@cs.unza.zm',
    phone: '+260 977 100201',
    keyInterfacePartners: { moa: 'Eng. John Banda (MoA PM)' },
  },
  {
    studentId: '2022019814',
    studentName: 'Ruth Kamwendo',
    cluster: 'Governance & Lead',
    primaryPortfolio: 'Governance, Communications & Meeting Secretary',
    authority: 'Approver',
    portfolioPercentage: 12,
    portfolioValueZMW: 60000,
    contractRoles: [
      'Communications Coordinator',
      'JCCC Secretary',
      'Minutes Custodian',
      'Stakeholder Consultation Lead',
    ],
    replacesOriginals: ['Communications Officer', 'JCCC Secretary'],
    ownedDeliverables: ['D-2'],
    supportedDeliverables: ['D-1', 'D-3', 'D-7'],
    responsibilities: [
      { area: 'Meeting Minutes', responsibility: 'Publishes signed minutes within 24 hours of every formal meeting' },
      { area: 'Stakeholder Consultation', responsibility: 'Coordinates D-2 consultation workshops with MoA units' },
      { area: 'Communication Matrix', responsibility: 'Maintains the named contact registry and channel discipline' },
      { area: 'Action Log', responsibility: 'Tracks action items and reports status at every JCCC sitting' },
    ],
    email: 'ruth.kamwendo@cs.unza.zm',
    phone: '+260 977 100202',
    keyInterfacePartners: { moa: 'MoA Stakeholder Committee' },
  },
  {
    studentId: '2021412423',
    studentName: 'Bwalya Mumba',
    cluster: 'Technical & Architecture',
    primaryPortfolio: 'Technical Lead — Architecture & Database Design',
    authority: 'Technical',
    portfolioPercentage: 16,
    portfolioValueZMW: 80000,
    contractRoles: [
      'System Architect',
      'Lead Database Administrator',
      'PASTEL Integration Engineer',
      'Security Officer',
    ],
    replacesOriginals: ['System Architect', 'Senior Developer'],
    ownedDeliverables: ['D-4'],
    supportedDeliverables: ['D-3', 'D-5', 'D-6', 'D-8'],
    responsibilities: [
      { area: 'System Architecture', responsibility: 'Owns REST API design, 3NF schema, and RBAC security model' },
      { area: 'PASTEL Bridge', responsibility: 'Designs and validates the ODBC/AES-256 integration engine' },
      { area: 'D-4 SDD', responsibility: 'Produces the System Design Document with clickable prototypes' },
      { area: 'Security', responsibility: 'Ensures OWASP Top 10 compliance across all endpoints' },
    ],
    email: 'bwalya.mumba@cs.unza.zm',
    phone: '+260 977 100203',
    keyInterfacePartners: { moa: 'Mr. Kelvin Tembo (MoA IT Lead)' },
  },
  {
    studentId: '2022064526',
    studentName: 'Bornface Kangombe',
    cluster: 'Data & GIS',
    primaryPortfolio: 'Data Engineering & GIS Spatial Analytics',
    authority: 'Technical',
    portfolioPercentage: 14,
    portfolioValueZMW: 70000,
    contractRoles: [
      'GIS Specialist',
      'Data Migration Lead',
      'Spatial Analytics Engineer',
    ],
    replacesOriginals: ['Data Analyst', 'GIS Officer'],
    ownedDeliverables: ['D-5'],
    supportedDeliverables: ['D-3', 'D-6', 'D-7'],
    responsibilities: [
      { area: 'GIS Layers', responsibility: 'Integrates 10-province boundaries and district camp GeoJSON layers' },
      { area: 'Data Migration', responsibility: 'Owns legacy registry extraction, cleaning, and 100% reconciliation' },
      { area: 'Spatial Analytics', responsibility: 'Builds thematic heat maps and farmer cluster visualizations' },
      { area: 'Surveyor General Liaison', responsibility: 'Coordinates weekly GIS delta sign-offs with Dr. Pamela Musonda' },
    ],
    email: 'bornface.kangombe@cs.unza.zm',
    phone: '+260 977 100204',
    keyInterfacePartners: { moa: 'Dr. Pamela Musonda (Surveyor General)' },
  },
  {
    studentId: '2021410587',
    studentName: 'Namakau Himululi',
    cluster: 'Quality & Compliance',
    primaryPortfolio: 'QA, Testing & Compliance Lead',
    authority: 'Approver',
    portfolioPercentage: 12,
    portfolioValueZMW: 60000,
    contractRoles: [
      'QA Lead',
      'SIT/UAT Coordinator',
      'Defect Triage Manager',
    ],
    replacesOriginals: ['QA Engineer', 'Test Coordinator'],
    ownedDeliverables: ['D-6'],
    supportedDeliverables: ['D-4', 'D-5', 'D-8'],
    responsibilities: [
      { area: 'SIT Test Scripts', responsibility: 'Authors and runs 120 automated integration test scripts' },
      { area: 'UAT Coordination', responsibility: 'Schedules 12 MoA district officers across 60 UAT scenarios' },
      { area: 'Defect Triage', responsibility: 'Runs daily defect triage; enforces zero P1/P2 at gate' },
      { area: 'Compliance', responsibility: 'Verifies all mandatory acceptance criteria before certificate issue' },
    ],
    email: 'namakau.himululi@cs.unza.zm',
    phone: '+260 977 100205',
    keyInterfacePartners: { moa: 'MoA UAT Sign-Off Committee' },
  },
  {
    studentId: '2021381072',
    studentName: 'Chikondi Banda',
    cluster: 'Business Analysis',
    primaryPortfolio: 'Business Analysis & Requirements Engineering',
    authority: 'Operational',
    portfolioPercentage: 10,
    portfolioValueZMW: 50000,
    contractRoles: [
      'Business Analyst',
      'SRS Author',
      'Requirements Traceability Officer',
    ],
    replacesOriginals: ['Business Analyst'],
    ownedDeliverables: ['D-3'],
    supportedDeliverables: ['D-2', 'D-4', 'D-6', 'D-7'],
    responsibilities: [
      { area: 'SRS Authoring', responsibility: 'Produces the 32-use-case Software Requirements Specification' },
      { area: 'Data Dictionary', responsibility: 'Maintains the 3NF data dictionary for all MIS entities' },
      { area: 'Stakeholder Elicitation', responsibility: 'Runs requirement workshops across MoA M&E, Finance, Registry' },
      { area: 'Traceability', responsibility: 'Maps every requirement to a test case and deliverable' },
    ],
    email: 'chikondi.banda@cs.unza.zm',
    phone: '+260 977 100206',
    keyInterfacePartners: { moa: 'MoA M&E Officers' },
  },
  {
    studentId: '2022009983',
    studentName: 'Idah Mumbi',
    cluster: 'UI/UX & Training',
    primaryPortfolio: 'UI/UX Design & Training Documentation',
    authority: 'Operational',
    portfolioPercentage: 8,
    portfolioValueZMW: 40000,
    contractRoles: [
      'UI/UX Designer',
      'Training Lead',
      'User Manual Author',
    ],
    replacesOriginals: ['UI Designer', 'Training Officer'],
    ownedDeliverables: ['D-7'],
    supportedDeliverables: ['D-2', 'D-4', 'D-6'],
    responsibilities: [
      { area: 'Wireframes', responsibility: 'Delivers clickable prototypes for all 11 dashboard modules' },
      { area: 'Training Programme', responsibility: 'Runs the 3-day residential training for 35 MoA officers' },
      { area: 'Documentation', responsibility: 'Produces User Manual, Admin Runbook, and video walkthroughs' },
      { area: 'Accessibility', responsibility: 'Ensures WCAG AA contrast and keyboard navigation on all screens' },
    ],
    email: 'idah.mumbi@cs.unza.zm',
    phone: '+260 977 100207',
    keyInterfacePartners: { moa: 'MoA HR & Training Reps' },
  },
  {
    studentId: '2017011498',
    studentName: 'Chali Gerald Chibwana',
    cluster: 'Integration & Support',
    primaryPortfolio: 'System Integration & Post-Deployment Support',
    authority: 'Technical',
    portfolioPercentage: 8,
    portfolioValueZMW: 40000,
    contractRoles: [
      'Integration Engineer',
      'Deployment Officer',
      'Support Lead',
    ],
    replacesOriginals: ['Integration Engineer', 'Support Engineer'],
    ownedDeliverables: [],
    supportedDeliverables: ['D-5', 'D-6', 'D-8'],
    responsibilities: [
      { area: 'SAPP Integration', responsibility: 'Validates two-way SAPP Contracts Register REST pipeline' },
      { area: 'Production Cutover', responsibility: 'Executes DNS switch and data migration at MoA Data Centre' },
      { area: 'Post-Deployment Support', responsibility: 'Owns 6-month warranty Tier 1/2/3 response workflow' },
      { area: 'Runbook Authoring', responsibility: 'Publishes cutover and rollback runbook to cloud drive folder 07' },
    ],
    email: 'chali.chibwana@cs.unza.zm',
    phone: '+260 977 100208',
    keyInterfacePartners: { moa: 'Mr. Leonard Lungu (SAPP Procurement)' },
  },
];

// ============================================================
// GROUP MEETING PROTOCOLS
// ============================================================
export const GROUP_MEETING_PROTOCOLS = [
  {
    event: 'Daily Internal Stand-Up',
    frequency: 'Every working day, 08:30 CAT',
    lead: 'Chimwemwe Sinyinza (GL)',
    output: 'Trello task board update + blocker log',
  },
  {
    event: 'Team Leader Horizon Check',
    frequency: 'Every 3 days',
    lead: 'Chimwemwe Sinyinza (GL)',
    output: 'Short written status to Academic Supervisor',
  },
  {
    event: 'Weekly Client Progress Meeting',
    frequency: 'Every Wednesday, 10:00 CAT',
    lead: 'Ruth Kamwendo (Secretary)',
    output: 'Signed minutes within 24 hours + action register update',
  },
  {
    event: 'Monthly JCCC Sitting',
    frequency: 'Monthly + at every deliverable gate',
    lead: 'Eng. John Banda (MoA) / Chimwemwe Sinyinza',
    output: 'Formal resolution log + certificate execution',
  },
  {
    event: 'Design Review Workshop',
    frequency: 'Per deliverable D-4, D-5, D-6',
    lead: 'Bwalya Mumba (Technical Lead)',
    output: 'Technical review memo + approved design baseline',
  },
  {
    event: 'Academic Supervisor Review',
    frequency: 'Weekly, Fridays 15:00 CAT',
    lead: 'Mr. Martin Phiri',
    output: 'Supervisor feedback note + academic milestone sign-off',
  },
];

// ============================================================
// OFFICIAL CERTIFICATE SIGNATORIES
// 8 Students + Academic Supervisor (9 total)
// ============================================================
export interface CertificateSignatory {
  name: string;
  role: string;
  studentId?: string;
  org: string;
  isAcademic: boolean;
}

export const OFFICIAL_CERTIFICATE_SIGNATORIES: CertificateSignatory[] = [
  {
    name: 'Chimwemwe Sinyinza',
    role: 'Group Leader / Project Lead',
    studentId: '2022067576',
    org: 'UNZA Dept. of Computer Science',
    isAcademic: false,
  },
  {
    name: 'Ruth Kamwendo',
    role: 'Governance & Communications Lead',
    studentId: '2022019814',
    org: 'UNZA Dept. of Computer Science',
    isAcademic: false,
  },
  {
    name: 'Bwalya Mumba',
    role: 'Technical Lead / System Architect',
    studentId: '2021412423',
    org: 'UNZA Dept. of Computer Science',
    isAcademic: false,
  },
  {
    name: 'Bornface Kangombe',
    role: 'Data Engineering & GIS Lead',
    studentId: '2022064526',
    org: 'UNZA Dept. of Computer Science',
    isAcademic: false,
  },
  {
    name: 'Namakau Himululi',
    role: 'QA, Testing & Compliance Lead',
    studentId: '2021410587',
    org: 'UNZA Dept. of Computer Science',
    isAcademic: false,
  },
  {
    name: 'Chikondi Banda',
    role: 'Business Analysis & Requirements Lead',
    studentId: '2021381072',
    org: 'UNZA Dept. of Computer Science',
    isAcademic: false,
  },
  {
    name: 'Idah Mumbi',
    role: 'UI/UX Design & Training Lead',
    studentId: '2022009983',
    org: 'UNZA Dept. of Computer Science',
    isAcademic: false,
  },
  {
    name: 'Chali Gerald Chibwana',
    role: 'System Integration & Support Lead',
    studentId: '2017011498',
    org: 'UNZA Dept. of Computer Science',
    isAcademic: false,
  },
  {
    name: 'Mr. Martin Phiri',
    role: 'Course Lecturer & Academic Supervisor',
    org: 'UNZA Dept. of Computer Science',
    isAcademic: true,
  },
];

// ============================================================
// SQL TEAM ASSIGNMENT SEED
// ============================================================
export const SQL_TEAM_ASSIGNMENT_SEED = `-- =====================================================================
-- E-SAPP MIS — Team Role Assignment Schema & Seed (UNZA Group 6)
-- Contract: MoA-UNZA-E-SAPP-2026
-- =====================================================================

CREATE TABLE team_members (
    student_id           VARCHAR(10) PRIMARY KEY,
    full_name            VARCHAR(120) NOT NULL,
    cluster              VARCHAR(60)  NOT NULL,
    primary_portfolio    VARCHAR(160) NOT NULL,
    authority_level      VARCHAR(20)  NOT NULL CHECK (authority_level IN ('Operational','Technical','Approver','Steering')),
    portfolio_pct        NUMERIC(5,2) NOT NULL,
    portfolio_value_zmw  NUMERIC(12,2) NOT NULL,
    email                VARCHAR(120) NOT NULL UNIQUE,
    phone                VARCHAR(20),
    moa_counterpart      VARCHAR(160),
    is_academic          BOOLEAN DEFAULT FALSE
);

CREATE TABLE member_deliverables (
    id              SERIAL PRIMARY KEY,
    student_id      VARCHAR(10) REFERENCES team_members(student_id),
    deliverable_code VARCHAR(5) NOT NULL,
    relationship    VARCHAR(20) NOT NULL CHECK (relationship IN ('OWNED','SUPPORTED'))
);

-- =====================================================================
-- SEED: 8 STUDENTS (UNZA GROUP 6)
-- =====================================================================

INSERT INTO team_members VALUES
('2022067576','Chimwemwe Sinyinza','Governance & Lead','Group Leader / Project Lead & Overall Integration','Steering',20.00,100000.00,'chimwemwe.sinyinza@cs.unza.zm','+260 977 100201','Eng. John Banda (MoA PM)',FALSE),
('2022019814','Ruth Kamwendo','Governance & Lead','Governance, Communications & Meeting Secretary','Approver',12.00,60000.00,'ruth.kamwendo@cs.unza.zm','+260 977 100202','MoA Stakeholder Committee',FALSE),
('2021412423','Bwalya Mumba','Technical & Architecture','Technical Lead — Architecture & Database Design','Technical',16.00,80000.00,'bwalya.mumba@cs.unza.zm','+260 977 100203','Mr. Kelvin Tembo (MoA IT Lead)',FALSE),
('2022064526','Bornface Kangombe','Data & GIS','Data Engineering & GIS Spatial Analytics','Technical',14.00,70000.00,'bornface.kangombe@cs.unza.zm','+260 977 100204','Dr. Pamela Musonda (Surveyor General)',FALSE),
('2021410587','Namakau Himululi','Quality & Compliance','QA, Testing & Compliance Lead','Approver',12.00,60000.00,'namakau.himululi@cs.unza.zm','+260 977 100205','MoA UAT Sign-Off Committee',FALSE),
('2021381072','Chikondi Banda','Business Analysis','Business Analysis & Requirements Engineering','Operational',10.00,50000.00,'chikondi.banda@cs.unza.zm','+260 977 100206','MoA M&E Officers',FALSE),
('2022009983','Idah Mumbi','UI/UX & Training','UI/UX Design & Training Documentation','Operational',8.00,40000.00,'idah.mumbi@cs.unza.zm','+260 977 100207','MoA HR & Training Reps',FALSE),
('2017011498','Chali Gerald Chibwana','Integration & Support','System Integration & Post-Deployment Support','Technical',8.00,40000.00,'chali.chibwana@cs.unza.zm','+260 977 100208','Mr. Leonard Lungu (SAPP Procurement)',FALSE);

-- =====================================================================
-- SEED: ACADEMIC SUPERVISOR
-- =====================================================================

INSERT INTO team_members VALUES
('SUP-001','Mr. Martin Phiri','Academic Supervision','Course Lecturer & Academic Supervisor','Approver',0.00,0.00,'martin.phiri@cs.unza.zm','+260 977 000111','UNZA Dept. of Computer Science',TRUE);

-- =====================================================================
-- SEED: DELIVERABLE OWNERSHIP MATRIX
-- =====================================================================

INSERT INTO member_deliverables (student_id, deliverable_code, relationship) VALUES
('2022067576','D-1','OWNED'),
('2022019814','D-1','SUPPORTED'),
('2021381072','D-1','SUPPORTED'),
('2022019814','D-2','OWNED'),
('2022067576','D-2','SUPPORTED'),
('2022009983','D-2','SUPPORTED'),
('2021381072','D-3','OWNED'),
('2022064526','D-3','SUPPORTED'),
('2021412423','D-3','SUPPORTED'),
('2021412423','D-4','OWNED'),
('2022009983','D-4','SUPPORTED'),
('2021410587','D-4','SUPPORTED'),
('2022067576','D-5','OWNED'),
('2021412423','D-5','SUPPORTED'),
('2022064526','D-5','SUPPORTED'),
('2017011498','D-5','SUPPORTED'),
('2021410587','D-6','OWNED'),
('2021412423','D-6','SUPPORTED'),
('2022064526','D-6','SUPPORTED'),
('2017011498','D-6','SUPPORTED'),
('2022009983','D-7','OWNED'),
('2022019814','D-7','SUPPORTED'),
('2021381072','D-7','SUPPORTED'),
('2022067576','D-8','OWNED'),
('2017011498','D-8','SUPPORTED'),
('2021410587','D-8','SUPPORTED');

-- =====================================================================
-- VERIFICATION QUERIES
-- =====================================================================
-- SELECT COUNT(*) FROM team_members;                                          -- Should be 9
-- SELECT SUM(portfolio_pct) FROM team_members WHERE is_academic = FALSE;      -- Should be 100.00
-- SELECT SUM(portfolio_value_zmw) FROM team_members WHERE is_academic = FALSE;-- Should be 500000.00
-- =====================================================================
`;