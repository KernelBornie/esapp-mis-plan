import { GroupMember, GroupMeetingProtocol } from '../types';

export interface AcademicSupervisor {
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  authority: string;
}

export const ACADEMIC_SUPERVISOR: AcademicSupervisor = {
  name: 'Mr. Martin Phiri',
  role: 'Course Lecturer (Academic Supervisor)',
  department: 'UNZA Dept. of Computer Science',
  email: 'm.phiri@cs.unza.zm',
  phone: '+260 971 884321',
  authority: 'Approver'
};

export const GROUP_MEMBERS: GroupMember[] = [
  {
    studentName: 'Chimwemwe Sinyinza (Group Leader)',
    studentId: '2022067576',
    cluster: 'Governance & Contract',
    primaryPortfolio: 'Project Lead / Team Leader',
    email: 'c.sinyinza@cs.unza.zm',
    phone: '+260 971 000001',
    authority: 'Approver',
    contractRoles: [
      'Project Lead / Team Leader (UNZA)',
      'Head of Consultant Team',
      'Level 4 Escalation Authority',
      'D-1 & D-8 Lead Owner'
    ],
    replacesOriginals: ['Dr. Jackson Phiri'],
    ownedDeliverables: ['D-1 (Inception Report & PIP)', 'D-8 (Final Deployment & Handover)'],
    supportedDeliverables: ['D-2', 'D-3', 'D-4', 'D-5', 'D-6', 'D-7'],
    paymentMilestones: ['M-1 (D-1: 15%)', 'M-8 (D-8: 10%)'],
    portfolioValueZMW: 125000,
    portfolioPercentage: 25,
    responsibilities: [
      { area: 'Project Leadership', responsibility: 'Overall direction, high-level client relationship with MoA Permanent Secretary, chairs steering sat-downs' },
      { area: 'Deliverable D-1', responsibility: 'Inception Report & Detailed Project Implementation Plan (Due Day 5, Lead)' },
      { area: 'Deliverable D-8', responsibility: 'Final Deployment, Project Handover & Acceptance Certificate (Due Day 50, Lead)' },
      { area: 'Work Package WP 1.1', responsibility: 'Project Mobilization, Governance & Inception Plan (Days 1–5)' },
      { area: 'Work Package WP 4.4', responsibility: 'Production Cutover, Handover & Final Acceptance (Days 48–50)' },
      { area: 'Escalation Level 4', responsibility: 'Contractual disputes, major risks, MoA Executive Board alignment with Mr. Martin Phiri' }
    ],
    keyInterfacePartners: {
      moa: 'Eng. John Banda (Project Coordinator) & Permanent Secretary',
      internal: 'Ruth Kamwendo, Bwalya Mumba, Mr. Martin Phiri',
      external: 'MoA Executive Steering Committee'
    }
  },
  {
    studentName: 'Bwalya Mumba',
    studentId: '2021412423',
    cluster: 'Technical & Architecture',
    primaryPortfolio: 'Lead System Analyst & Architect',
    email: 'b.mumba@cs.unza.zm',
    phone: '+260 971 000003',
    authority: 'Technical',
    contractRoles: [
      'Lead System Analyst & Architect',
      'Senior Integration Developer',
      'UNZA Dev Team Lead'
    ],
    replacesOriginals: ['Mr. Patrick Zulu', 'Mr. Chimuka Haanyama'],
    ownedDeliverables: ['D-3 (SRS & Data Dictionary)', 'D-4 (Co-Lead SDD)', 'D-5 (Co-Lead Coded MIS)'],
    supportedDeliverables: ['D-1 (PIP Tech)', 'D-6 (SIT/UAT Support)', 'D-8 (Cutover Tech)'],
    paymentMilestones: ['M-3 (D-3: 15%)', 'M-4 (D-4: 15% Co-Lead)', 'M-5 (D-5: 20% Co-Lead)'],
    portfolioValueZMW: 150000,
    portfolioPercentage: 30,
    responsibilities: [
      { area: 'Architecture & Analysis', responsibility: 'High-Level & Low-Level Design, REST API blueprints, 3NF schema, SRS & Data Dictionary' },
      { area: 'Deliverable D-3', responsibility: 'Software Requirements Specification & Data Dictionary (Due Day 18, Lead)' },
      { area: 'Deliverable D-4 (Co-Lead)', responsibility: 'System Design Document (SDD) & Interactive Prototypes (Due Day 26)' },
      { area: 'Deliverable D-5 (Co-Lead)', responsibility: 'Fully Coded Web-Enabled MIS & Data Integration Engine (Due Day 38)' },
      { area: 'Work Package WP 1.3', responsibility: 'SRS & Data Modeling (Days 11–18)' },
      { area: 'Work Package WP 2.1', responsibility: 'System Architecture, Security & Staging Server Setup (Days 19–23, with Chali)' },
      { area: 'Work Package WP 3.1', responsibility: 'Core E-SAPP MIS Modules Development (Days 27–34, with Chikondi)' },
      { area: 'Escalation Level 2', responsibility: 'Technical architectural blocks, schema bottlenecks, API protocols' }
    ],
    keyInterfacePartners: {
      moa: 'Mr. Kelvin Tembo (MoA IT Lead), Ms. Brenda Sichone (M&E)',
      internal: 'Chali Gerald Chibwana, Bornface Kangombe, Chikondi Banda',
      external: 'Mr. Leonard Lungu (PASTEL/SAPP Lead)'
    }
  },
  {
    studentName: 'Ruth Kamwendo',
    studentId: '2022019814',
    cluster: 'Governance & Contract',
    primaryPortfolio: 'Consultant Project Manager / JCCC Secretariat',
    email: 'r.kamwendo@cs.unza.zm',
    phone: '+260 971 000002',
    authority: 'Operational',
    contractRoles: [
      'Consultant Project Manager',
      'JCCC Secretariat',
      '24h Golden Rule Custodian',
      'Training Co-Lead'
    ],
    replacesOriginals: ['Mrs. Chileshe Mwape', 'Ms. Ngoza Chanda'],
    ownedDeliverables: ['D-2 (Stakeholder Consultations & CCIP)', 'D-7 (Co-Lead Training)'],
    supportedDeliverables: ['D-1 (PIP Support)', 'D-8 (Handover Support)'],
    paymentMilestones: ['M-2 (D-2: 10%)', 'M-7 (D-7: 5% Co-Lead)'],
    portfolioValueZMW: 65000,
    portfolioPercentage: 13,
    responsibilities: [
      { area: 'Project Management', responsibility: '50-day schedule guardian, JCCC agenda, minutes, 24-hour golden rule enforcement' },
      { area: 'Deliverable D-2', responsibility: 'Stakeholder Consultation & Communication Protocol Sign-Off (Due Day 10, Lead)' },
      { area: 'Deliverable D-7 (Co-Lead)', responsibility: 'User Manuals & Training Delivery (Due Day 48, Co-Lead with Idah Mumbi)' },
      { area: 'Work Package WP 1.2', responsibility: 'Stakeholder Consultations & Communication Protocol (Days 6–10)' },
      { area: 'Escalation Level 3', responsibility: 'Schedule slippages, cross-functional dependencies, client relations' }
    ],
    keyInterfacePartners: {
      moa: 'Eng. John Banda (MoA PM), MoA Stakeholder Committee',
      internal: 'Chimwemwe Sinyinza, Namakau Himululi, Bwalya Mumba',
      external: 'JCCC Secretariat & MoA Coordination Office'
    }
  },
  {
    studentName: 'Namakau Himululi',
    studentId: '2021410587',
    cluster: 'Governance & Contract',
    primaryPortfolio: 'Deputy Project Manager / Communication Liaison',
    email: 'n.himululi@cs.unza.zm',
    phone: '+260 971 000004',
    authority: 'Operational',
    contractRoles: [
      'Deputy Project Manager',
      'Communication Liaison',
      'Stakeholder Engagement Officer'
    ],
    replacesOriginals: ['Ms. Ngoza Chanda (Deputy PM & Communication Liaison)'],
    ownedDeliverables: [],
    supportedDeliverables: ['D-1 (PIP Support)', 'D-2 (CCIP Support)', 'D-7 (Training Support)', 'D-8 (Handover Support)'],
    paymentMilestones: ['D-1 Support', 'D-2 Support', 'D-7 Support', 'D-8 Support'],
    portfolioValueZMW: 30000,
    portfolioPercentage: 6,
    responsibilities: [
      { area: 'Communication Liaison', responsibility: 'Dispatches weekly progress briefs, manages official correspondence, coordinates feedback' },
      { area: 'Deputy PM', responsibility: 'Assists Project Manager in maintaining daily stand-up logs, action registers, and audit trails' },
      { area: 'Work Package WP 4.3 (Co-Lead)', responsibility: 'User manuals, training administration and logistics coordination (Days 44–48)' },
      { area: 'Deliverable Support', responsibility: 'Supports Ruth Kamwendo on D-1, D-2, and D-7 deliverables' }
    ],
    keyInterfacePartners: {
      moa: 'MoA User Representatives, HR & Training Unit focal persons',
      internal: 'Ruth Kamwendo, Chimwemwe Sinyinza, Idah Mumbi'
    }
  },
  {
    studentName: 'Chikondi Banda',
    studentId: '2021381072',
    cluster: 'Technical & Architecture',
    primaryPortfolio: 'Business Analyst / Requirements Engineer',
    email: 'c.banda@cs.unza.zm',
    phone: '+260 971 000005',
    authority: 'Technical',
    contractRoles: [
      'Business Analyst',
      'Requirements Engineer',
      'Functional Workflow Modeler'
    ],
    replacesOriginals: ['Functional Business Analyst Consultant Panel'],
    ownedDeliverables: [],
    supportedDeliverables: ['D-2 (Consultations)', 'D-3 (SRS & Dictionary)', 'D-4 (Interactive Prototypes)', 'D-5 (Core Modules)'],
    paymentMilestones: ['D-3 Support', 'D-4 Support', 'WP 3.1 Delivery'],
    portfolioValueZMW: 35000,
    portfolioPercentage: 7,
    responsibilities: [
      { area: 'Requirements Engineering', responsibility: 'Elicits functional specifications, user story catalogs, data dictionary definitions' },
      { area: 'Work Package WP 3.1 (Co-Lead)', responsibility: 'Core E-SAPP MIS modules business logic and validation rules with Bwalya Mumba' },
      { area: 'SRS & M&E Alignment', responsibility: 'Maps 32 functional use cases directly to MoA M&E indicator requirements' },
      { area: 'Deliverable Support', responsibility: 'Supports D-2 consultations, D-3 SRS data dictionary, and D-4 design prototyping' }
    ],
    keyInterfacePartners: {
      moa: 'Ms. Brenda Sichone (M&E Principal Officer)',
      internal: 'Bwalya Mumba, Bornface Kangombe, Ruth Kamwendo'
    }
  },
  {
    studentName: 'Idah Mumbi',
    studentId: '2022009983',
    cluster: 'Quality & Training',
    primaryPortfolio: 'QA & Test Lead / Training Lead',
    email: 'i.mumbi@cs.unza.zm',
    phone: '+260 971 000006',
    authority: 'Technical / Operational',
    contractRoles: [
      'QA & Test Lead',
      'Training Lead & Documentation Specialist',
      'External Interface Custodian'
    ],
    replacesOriginals: ['Senior QA & Training Consultant Panel'],
    ownedDeliverables: ['D-6 (SIT & UAT Report)', 'D-7 (Co-Lead Training & Manuals)'],
    supportedDeliverables: ['D-4 (Test Scenarios)', 'D-5 (Integration Testing)', 'D-8 (Acceptance Auditing)'],
    paymentMilestones: ['M-6 (D-6: 10%)', 'M-7 (D-7: 5% Co-Lead)'],
    portfolioValueZMW: 45000,
    portfolioPercentage: 9,
    responsibilities: [
      { area: 'Quality Assurance', responsibility: 'Test strategy, SIT execution, defect triage, OWASP vulnerability scans, load testing (500 users)' },
      { area: 'Deliverable D-6', responsibility: 'System Integration Testing (SIT) & UAT Acceptance Report (Due Day 44, Lead)' },
      { area: 'Deliverable D-7 (Co-Lead)', responsibility: 'User Manuals, Admin Documentation & Training Delivery (Due Day 48, with Ruth)' },
      { area: 'Work Package WP 4.1', responsibility: 'SIT & Security Auditing (Days 39–42, with Chali Gerald Chibwana)' },
      { area: 'Work Package WP 4.2', responsibility: 'UAT & Sign-Off (Days 42–44, Lead)' },
      { area: 'Work Package WP 4.3', responsibility: 'User Manuals & Training Delivery (Days 44–48, with Namakau Himululi)' },
      { area: 'Escalation Level 2', responsibility: 'Interface discrepancies and QA defects' }
    ],
    keyInterfacePartners: {
      moa: 'Mr. Kelvin Tembo, MoA UAT Committee, HR & Training Unit',
      internal: 'Chali Gerald Chibwana, Ruth Kamwendo, Bwalya Mumba'
    }
  },
  {
    studentName: 'Chali Gerald Chibwana',
    studentId: '2017011498',
    cluster: 'Technical & Architecture',
    primaryPortfolio: 'Integration Developer / Database Administrator',
    email: 'c.chibwana@cs.unza.zm',
    phone: '+260 971 000007',
    authority: 'Technical',
    contractRoles: [
      'Integration Developer',
      'Database Administrator',
      'Backend Security & Infrastructure Specialist'
    ],
    replacesOriginals: ['Senior Database Administrator & Integration Specialist Panel'],
    ownedDeliverables: ['D-5 (Co-Lead Coded MIS & Integration Engine)'],
    supportedDeliverables: ['D-4 (Database ERD)', 'D-6 (SIT Integration Testing)', 'D-8 (Production Cutover)'],
    paymentMilestones: ['M-5 (D-5: 20% Co-Lead)', 'WP 3.2 Integration Delivery'],
    portfolioValueZMW: 45000,
    portfolioPercentage: 9,
    responsibilities: [
      { area: 'Database Administration', responsibility: 'Physical 3NF schema implementation, indexing, replication, database security' },
      { area: 'Deliverable D-5 (Co-Lead)', responsibility: 'Fully Coded Web-Enabled MIS & Data Integration Engine (Due Day 38, with Bwalya)' },
      { area: 'Work Package WP 2.1 (Co-Lead)', responsibility: 'System Architecture, Security & Staging Server Setup (Days 19–23, with Bwalya)' },
      { area: 'Work Package WP 3.2 (Lead)', responsibility: 'PASTEL & SAPP Contracts Integration Engine (Days 31–36, Lead)' },
      { area: 'Work Package WP 4.1 (Co-Lead)', responsibility: 'SIT & Security Auditing (Days 39–42, with Idah Mumbi)' }
    ],
    keyInterfacePartners: {
      moa: 'Mr. Kelvin Tembo (MoA IT), Mr. Mwila Kangwa (Finance), Mr. Leonard Lungu (PASTEL/SAPP)',
      internal: 'Bwalya Mumba, Idah Mumbi, Bornface Kangombe'
    }
  },
  {
    studentName: 'Bornface Kangombe',
    studentId: '2022064526',
    cluster: 'Data, GIS & UX',
    primaryPortfolio: 'GIS & Spatial Data Specialist / UI-UX Lead',
    email: 'b.kangombe@cs.unza.zm',
    phone: '+260 971 000008',
    authority: 'Technical / Operational',
    contractRoles: [
      'GIS & Spatial Data Specialist',
      'UI/UX Lead',
      'Data Integration Analyst'
    ],
    replacesOriginals: ['Dr. Joseph Musonda'],
    ownedDeliverables: ['D-4 (Co-Lead SDD & Interactive Prototypes)'],
    supportedDeliverables: ['D-3 (Spatial Specs)', 'D-5 (GIS Mapping Module)', 'D-7 (Visual Guides)', 'D-8 (Data Handover)'],
    paymentMilestones: ['M-4 (D-4: 15% Co-Lead)', 'WP 3.3 GIS Delivery'],
    portfolioValueZMW: 40000,
    portfolioPercentage: 8,
    responsibilities: [
      { area: 'UI/UX & Prototypes', responsibility: 'Interactive Figma/HTML prototypes, responsive agricultural dashboards, usability evaluations' },
      { area: 'Deliverable D-4 (Co-Lead)', responsibility: 'System Design Document (SDD) & Interactive Prototypes (Due Day 26, with Bwalya)' },
      { area: 'Work Package WP 2.2 (Lead)', responsibility: 'UI/UX Design, Prototypes & SDD (Days 21–26, Lead)' },
      { area: 'Work Package WP 3.3 (Lead)', responsibility: 'GIS Spatial Data Integration & Interactive Mapping (Days 33–38, Lead)' },
      { area: 'Spatial Data Layers', responsibility: '10 Zambian provinces, district camps geocoding, boundary shapefiles & GeoJSON layers' },
      { area: 'Escalation Level 2', responsibility: 'Data schema and GIS spatial coordinate mismatch resolution' }
    ],
    keyInterfacePartners: {
      moa: 'Dr. Pamela Musonda (Surveyor General), MoA GIS Unit, MoA User Representatives',
      internal: 'Bwalya Mumba, Chikondi Banda, Chali Gerald Chibwana'
    }
  }
];

export const GROUP_DELIVERABLE_ALIGNMENT = [
  { deliverable: 'D-1 Inception Report & PIP', dueDay: 5, payment: '15%', primaryOwner: 'Chimwemwe Sinyinza (GL)', supportingOwners: 'Ruth Kamwendo, Namakau Himululi', valueZMW: 75000 },
  { deliverable: 'D-2 Stakeholder Consultations & CCIP', dueDay: 10, payment: '10%', primaryOwner: 'Ruth Kamwendo', supportingOwners: 'Namakau Himululi, Chikondi Banda', valueZMW: 50000 },
  { deliverable: 'D-3 SRS & Data Dictionary', dueDay: 18, payment: '15%', primaryOwner: 'Bwalya Mumba', supportingOwners: 'Chikondi Banda, Bornface Kangombe', valueZMW: 75000 },
  { deliverable: 'D-4 SDD & Interactive Prototypes', dueDay: 26, payment: '15%', primaryOwner: 'Bwalya Mumba & Bornface Kangombe', supportingOwners: 'Chikondi Banda, Idah Mumbi', valueZMW: 75000 },
  { deliverable: 'D-5 Fully Coded MIS & Integration Engine', dueDay: 38, payment: '20%', primaryOwner: 'Bwalya Mumba & Chali Gerald Chibwana', supportingOwners: 'Bornface Kangombe, Idah Mumbi', valueZMW: 100000 },
  { deliverable: 'D-6 SIT & UAT Acceptance Report', dueDay: 44, payment: '10%', primaryOwner: 'Idah Mumbi', supportingOwners: 'Chali Gerald Chibwana, Bwalya Mumba', valueZMW: 50000 },
  { deliverable: 'D-7 User Manuals & Training Delivery', dueDay: 48, payment: '5%', primaryOwner: 'Idah Mumbi & Ruth Kamwendo', supportingOwners: 'Namakau Himululi, Bornface Kangombe', valueZMW: 25000 },
  { deliverable: 'D-8 Final Deployment, Handover & Warranty', dueDay: 50, payment: '10%', primaryOwner: 'Chimwemwe Sinyinza (GL)', supportingOwners: 'All group members', valueZMW: 50000 },
];

export const GROUP_WORK_PACKAGES = [
  { wp: 'WP 1.1', title: 'Project Mobilization, Governance & Inception Plan', days: '1–5', unzaLead: 'Chimwemwe Sinyinza (GL)', moaCounterpart: 'Eng. John Banda' },
  { wp: 'WP 1.2', title: 'Stakeholder Consultations & Communication Protocol', days: '6–10', unzaLead: 'Ruth Kamwendo', moaCounterpart: 'Eng. John Banda & IT Lead' },
  { wp: 'WP 1.3', title: 'SRS & Data Modeling', days: '11–18', unzaLead: 'Bwalya Mumba', moaCounterpart: 'Mr. Kelvin Tembo & Ms. Brenda Sichone' },
  { wp: 'WP 2.1', title: 'System Architecture, Security & Staging Server', days: '19–23', unzaLead: 'Bwalya Mumba & Chali Gerald Chibwana', moaCounterpart: 'Mr. Kelvin Tembo' },
  { wp: 'WP 2.2', title: 'UI/UX Design, Prototypes & SDD (D-4)', days: '21–26', unzaLead: 'Bornface Kangombe', moaCounterpart: 'MoA User Representatives' },
  { wp: 'WP 3.1', title: 'Core E-SAPP MIS Modules Development', days: '27–34', unzaLead: 'Bwalya Mumba & Chikondi Banda', moaCounterpart: 'Ms. Brenda Sichone' },
  { wp: 'WP 3.2', title: 'PASTEL & SAPP Contracts Integration Engine', days: '31–36', unzaLead: 'Chali Gerald Chibwana', moaCounterpart: 'Mr. Mwila Kangwa & Mr. Leonard Lungu' },
  { wp: 'WP 3.3', title: 'GIS Spatial Data Integration & Interactive Mapping', days: '33–38', unzaLead: 'Bornface Kangombe', moaCounterpart: 'MoA GIS Unit' },
  { wp: 'WP 4.1', title: 'SIT & Security Auditing', days: '39–42', unzaLead: 'Idah Mumbi & Chali Gerald Chibwana', moaCounterpart: 'Mr. Kelvin Tembo' },
  { wp: 'WP 4.2', title: 'UAT & Sign-Off (D-6)', days: '42–44', unzaLead: 'Idah Mumbi', moaCounterpart: 'Eng. John Banda & UAT Team' },
  { wp: 'WP 4.3', title: 'User Manuals, Admin Guides & Training (D-7)', days: '44–48', unzaLead: 'Idah Mumbi & Namakau Himululi', moaCounterpart: 'MoA HR & Training Unit' },
  { wp: 'WP 4.4', title: 'Production Cutover, Handover & Final Acceptance (D-8)', days: '48–50', unzaLead: 'Chimwemwe Sinyinza (GL)', moaCounterpart: 'Eng. John Banda & Permanent Secretary' },
];

export const GROUP_ESCALATION_PATH = [
  {
    level: 'Level 1',
    member: 'Task owner (any of the 8 members)',
    issueType: 'Operational',
    responseTime: '1 working day (24 hours)',
    description: 'Day-to-day task clarifications, minor data schema discrepancies, staging environment logins.'
  },
  {
    level: 'Level 2',
    member: 'Bwalya Mumba (Technical) / Bornface Kangombe (Data/GIS) / Idah Mumbi (QA/Interfaces)',
    issueType: 'Technical / Data / QA',
    responseTime: '2 working days (48 hours)',
    description: 'ODBC connection timeouts, encrypted schema blocks, REST API contract mismatch, UI workflow approval stalls.'
  },
  {
    level: 'Level 3',
    member: 'Ruth Kamwendo (Project Manager)',
    issueType: 'Schedule / Resources / Client relations',
    responseTime: '3 working days (72 hours)',
    description: 'Schedule slippage >2 days, cross-functional dependencies, milestone approval stalls, resource bottlenecks.'
  },
  {
    level: 'Level 4',
    member: 'Chimwemwe Sinyinza (GL) + Mr. Martin Phiri + JCCC + MoA Senior Management',
    issueType: 'Contractual / Major risk / Dispute',
    responseTime: '5 working days (120 hours)',
    description: 'Contractual dispute, critical path breach, scope renegotiation, formal arbitration per Laws of Zambia.'
  }
];

export const GROUP_MEETING_PROTOCOLS: GroupMeetingProtocol[] = [
  { event: 'Daily stand-up', frequency: 'Daily (Trello/Virtual)', lead: 'Ruth Kamwendo (PM)', output: 'Daily burn-down report card' },
  { event: 'Technical sync', frequency: 'Every 3 days', lead: 'Bwalya Mumba (Architect)', output: 'Technical action log & API updates' },
  { event: 'Interface & QA review', frequency: 'Weekly', lead: 'Idah Mumbi & Chali Gerald Chibwana', output: 'Interface status & defect logs' },
  { event: 'Client progress update', frequency: 'Weekly (Friday 10:00 CAT)', lead: 'Chimwemwe Sinyinza (GL) & Ruth Kamwendo', output: 'Weekly progress report + signed minutes' },
  { event: 'JCCC meeting', frequency: 'Monthly / at milestones', lead: 'Ruth Kamwendo (Secretariat)', output: 'JCCC minutes + decision log' },
  { event: 'Group internal review', frequency: 'Every Monday 08:00', lead: 'Chimwemwe Sinyinza (GL)', output: 'Weekly delivery plan + risk review' },
];

export const GROUP_SQL_INSERT = `-- ============================================================
-- FINAL GROUP 6 CONSULTANT CONTACT SEED
-- Run after removing any old Jackson Phiri entries
-- ============================================================

DELETE FROM contacts WHERE full_name LIKE '%Jackson Phiri%';

INSERT INTO contacts
(full_name, organisation, role_title, interface_type, email, phone, authority_level)
VALUES
('Mr. Martin Phiri',      'Consultant', 'Course Lecturer (Academic Supervisor)',        'Contractual',     'm.phiri@cs.unza.zm',     '+260 971 884321', 'Approver'),
('Chimwemwe Sinyinza',    'Consultant', 'Project Lead / Team Leader',                   'Contractual',     'c.sinyinza@cs.unza.zm',  '+260 971 000001', 'Approver'),
('Ruth Kamwendo',         'Consultant', 'Consultant Project Manager / JCCC Secretariat','Contractual',     'r.kamwendo@cs.unza.zm',  '+260 971 000002', 'Operational'),
('Bwalya Mumba',          'Consultant', 'Lead System Analyst & Architect',              'Technical',       'b.mumba@cs.unza.zm',     '+260 971 000003', 'Technical'),
('Bwalya Mumba',          'Consultant', 'Senior Integration Developer',                 'Technical',       'b.mumba@cs.unza.zm',     '+260 971 000003', 'Technical'),
('Bwalya Mumba',          'Consultant', 'UNZA Dev Team Lead',                           'Technical',       'b.mumba@cs.unza.zm',     '+260 971 000003', 'Technical'),
('Namakau Himululi',      'Consultant', 'Deputy Project Manager',                       'Contractual',     'n.himululi@cs.unza.zm',  '+260 971 000004', 'Operational'),
('Namakau Himululi',      'Consultant', 'Communication Liaison',                        'Contractual',     'n.himululi@cs.unza.zm',  '+260 971 000004', 'Operational'),
('Chikondi Banda',        'Consultant', 'Business Analyst',                             'Functional',      'c.banda@cs.unza.zm',     '+260 971 000005', 'Technical'),
('Chikondi Banda',        'Consultant', 'Requirements Engineer',                        'Functional',      'c.banda@cs.unza.zm',     '+260 971 000005', 'Technical'),
('Idah Mumbi',            'Consultant', 'QA & Test Lead',                               'Testing',         'i.mumbi@cs.unza.zm',     '+260 971 000006', 'Technical'),
('Idah Mumbi',            'Consultant', 'Training Lead & Documentation Specialist',     'Training',        'i.mumbi@cs.unza.zm',     '+260 971 000006', 'Operational'),
('Idah Mumbi',            'Consultant', 'External Interface Custodian',                 'DataIntegration', 'i.mumbi@cs.unza.zm',     '+260 971 000006', 'Technical'),
('Chali Gerald Chibwana', 'Consultant', 'Integration Developer',                        'DataIntegration', 'c.chibwana@cs.unza.zm',  '+260 971 000007', 'Technical'),
('Chali Gerald Chibwana', 'Consultant', 'Database Administrator',                       'Technical',       'c.chibwana@cs.unza.zm',  '+260 971 000007', 'Technical'),
('Bornface Kangombe',     'Consultant', 'GIS & Spatial Data Specialist',                'Functional',      'b.kangombe@cs.unza.zm',  '+260 971 000008', 'Technical'),
('Bornface Kangombe',     'Consultant', 'UI/UX Lead',                                   'Functional',      'b.kangombe@cs.unza.zm',  '+260 971 000008', 'Operational'),
('Bornface Kangombe',     'Consultant', 'Data Integration Analyst',                     'DataIntegration', 'b.kangombe@cs.unza.zm',  '+260 971 000008', 'Technical');

-- ============================================================
-- CERTIFICATE SIGNATORIES TABLE (FOR ALL DELIVERABLES D1-D8)
-- ============================================================

CREATE TABLE IF NOT EXISTS certificate_signatories (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    full_name       VARCHAR(120) NOT NULL,
    student_id      VARCHAR(20) NULL,
    role_title      VARCHAR(150) NOT NULL,
    org_label       VARCHAR(120) DEFAULT 'Consultant — UNZA Dept. of Computer Science',
    display_order   INT NOT NULL,
    is_academic     TINYINT(1) DEFAULT 0,
    is_active       TINYINT(1) DEFAULT 1
);

INSERT INTO certificate_signatories
(full_name, student_id, role_title, display_order, is_academic) VALUES
('Mr. Martin Phiri',       NULL,         'Course Lecturer (Academic Supervisor)',          1, 1),
('Chimwemwe Sinyinza',     '2022067576', 'Project Lead / Team Leader (Group Leader)',       2, 0),
('Bwalya Mumba',           '2021412423', 'Lead System Analyst & Architect',                 3, 0),
('Ruth Kamwendo',          '2022019814', 'Consultant Project Manager / JCCC Secretariat',   4, 0),
('Namakau Himululi',       '2021410587', 'Deputy Project Manager / Communication Liaison',  5, 0),
('Chikondi Banda',         '2021381072', 'Business Analyst / Requirements Engineer',        6, 0),
('Idah Mumbi',             '2022009983', 'QA & Test Lead / Training Lead',                  7, 0),
('Chali Gerald Chibwana',  '2017011498', 'Integration Developer / Database Administrator',  8, 0),
('Bornface Kangombe',      '2022064526', 'GIS Specialist / UI-UX Lead',                     9, 0);`;

export const GROUP_SUMMARY_CARD = `GROUP 6 — E-SAPP MIS CONSULTING TEAM
UNZA Dept. of Computer Science
═══════════════════════════════════════════════════════════════════════════

  ACADEMIC SUPERVISION
  ─────────────────────────────────────────────────────────────────────
  Mr. Martin Phiri       Course Lecturer (Academic Supervisor)

  STUDENT TEAM (8 MEMBERS)
  ─────────────────────────────────────────────────────────────────────
  1. Chimwemwe Sinyinza (GL)  2022067576  Project Lead / Team Leader
  2. Bwalya Mumba             2021412423  Lead Analyst & Architect
  3. Ruth Kamwendo            2022019814  Project Manager / JCCC Secretariat
  4. Namakau Himululi         2021410587  Deputy PM / Communication Liaison
  5. Chikondi Banda           2021381072  Business Analyst
  6. Idah Mumbi               2022009983  QA Lead / Training Lead
  7. Chali Gerald Chibwana    2017011498  Integration Developer / DBA
  8. Bornface Kangombe        2022064526  GIS / UI-UX Lead

  CONTRACT
  ─────────────────────────────────────────────────────────────────────
  Contract Ref: MoA-UNZA-E-SAPP-2026
  Duration: 50 working days + 6-month support
  Total Value: ZMW 500,000.00
  Certified: ZMW 200,000.00 (40%) — D-1, D-2, D-3
  Next Gate: D-4 (15%) — ZMW 75,000.00

  JCCC Secretariat: jccc.esapp@moa.gov.zm
  Group Leader: c.sinyinza@cs.unza.zm
═══════════════════════════════════════════════════════════════════════════`;

export const GOLDEN_RULE_TEXT = "Any verbal decision or instruction must be confirmed by email or recorded in formal meeting minutes within 24 hours to have contractual validity.";

export const SQL_TEAM_ASSIGNMENT_SEED = GROUP_SQL_INSERT;

export interface CertificateSignatory {
  name: string;
  role: string;
  studentId?: string;
  org: string;
  isAcademic?: boolean;
}

export const OFFICIAL_CERTIFICATE_SIGNATORIES: CertificateSignatory[] = [
  {
    name: 'Mr. Martin Phiri',
    role: 'Course Lecturer (Academic Supervisor)',
    org: 'Consultant — UNZA Dept. of Computer Science',
    isAcademic: true
  },
  {
    name: 'Chimwemwe Sinyinza',
    role: 'Project Lead / Team Leader (GL)',
    studentId: '2022067576',
    org: 'Consultant — UNZA Dept. of Computer Science'
  },
  {
    name: 'Ruth Kamwendo',
    role: 'Consultant Project Manager / JCCC Secretariat',
    studentId: '2022019814',
    org: 'Consultant — UNZA Dept. of Computer Science'
  },
  {
    name: 'Bwalya Mumba',
    role: 'Lead System Analyst & Architect',
    studentId: '2021412423',
    org: 'Consultant — UNZA Dept. of Computer Science'
  },
  {
    name: 'Namakau Himululi',
    role: 'Deputy Project Manager / Communication Liaison',
    studentId: '2021410587',
    org: 'Consultant — UNZA Dept. of Computer Science'
  },
  {
    name: 'Chikondi Banda',
    role: 'Business Analyst / Requirements Engineer',
    studentId: '2021381072',
    org: 'Consultant — UNZA Dept. of Computer Science'
  },
  {
    name: 'Idah Mumbi',
    role: 'QA & Test Lead / Training Lead',
    studentId: '2022009983',
    org: 'Consultant — UNZA Dept. of Computer Science'
  },
  {
    name: 'Chali Gerald Chibwana',
    role: 'Integration Developer / Database Administrator',
    studentId: '2017011498',
    org: 'Consultant — UNZA Dept. of Computer Science'
  },
  {
    name: 'Bornface Kangombe',
    role: 'GIS Specialist / UI-UX Lead',
    studentId: '2022064526',
    org: 'Consultant — UNZA Dept. of Computer Science'
  }
];
