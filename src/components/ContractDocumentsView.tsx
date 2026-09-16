import React, { useState } from 'react';
import {
  FileText, Copy, Check, Printer, CheckSquare, Download, BookOpen,
  Bookmark, Layers, AlertTriangle, ShieldCheck, DollarSign, ClipboardList,
  Building2, Users, Target, Network
} from 'lucide-react';

type DocTab = 'pip' | 'wbs' | 'risk' | 'sla' | 'checklist' | 'tech4';

export const ContractDocumentsView: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeDoc, setActiveDoc] = useState<DocTab>('pip');
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({
    1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true,
    9: true, 10: true, 11: true, 12: true, 13: true, 14: false, 15: false, 16: false,
  });

  const toggleCheck = (id: number) => setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));

  const checklistItems = [
    { id: 1, label: 'Form Joint Coordination and Control Committee (JCCC) with designated MoA & UNZA members.' },
    { id: 2, label: 'Appoint Client and Consultant Communication Coordinators as sole formal dispatch conduits.' },
    { id: 3, label: 'Establish verified Contact Matrix with roles, emails, phone numbers, and authority levels.' },
    { id: 4, label: 'Define and enforce official communication channels only (no informal scope overrides).' },
    { id: 5, label: 'Establish Communication Frequency calendar: Daily reports, 3-day updates, weekly client meetings.' },
    { id: 6, label: 'Map all technical interface channels (MoA IT, M&E, Accounts/PASTEL, Registry, SAPP Contracts).' },
    { id: 7, label: 'Ratify 4-Level Escalation Path with strict 24-hour acknowledgment commitment.' },
    { id: 8, label: 'Establish shared cloud drive repository with mandatory 10-folder structure (01 to 10).' },
    { id: 9, label: 'Institute formal Change Control Procedure (CCB) with 4-vector impact analysis.' },
    { id: 10, label: 'Draft formal Customer Communication and Interface Plan (CCIP) as Appendix to D-2.' },
    { id: 11, label: 'Approve full 50-day Project Implementation Plan (PIP) and WBS at Inception Workshop.' },
    { id: 12, label: 'Conduct official Project Kick-Off meeting with all interface stakeholders at Mulungushi House.' },
    { id: 13, label: 'Execute Daily stand-ups, 3-day team leader updates, and weekly client reporting routines.' },
    { id: 14, label: 'Execute Phase-Gate reviews and signed Acceptance Certificates for Deliverables D-1 through D-8.' },
    { id: 15, label: 'Conduct quarterly review of communication KPIs (100% on-time reports, 100% minutes in 24h).' },
    { id: 16, label: 'Transition operational communications into 6-Month Post-Deployment Support and SLA Protocol.' },
  ];

  const fullPipMarkdown = `# E-SAPP WEB-ENABLED MIS: PROJECT IMPLEMENTATION PLAN (PIP)
## Contract Review Subject: Comprehensive Implementation Plan & Customer Interface System
**Parties:**
- **The Consultant:** University of Zambia (UNZA), Department of Computer Science
- **The Client:** Ministry of Agriculture (MoA), Republic of Zambia
**Project Window:** 50 Working Days (Strict Critical Path) + 6 Months Post-Deployment Support

### 1. PURPOSE AND OBJECTIVES
### 2. WORK BREAKDOWN STRUCTURE (WBS) & PHASES
### 3. DELIVERABLE PHASE-GATE ACCEPTANCE & PAYMENT SCHEDULE
### 4. GOVERNANCE & CUSTOMER COMMUNICATION INTEGRATION
### 5. TECH-4 SUBSECTION INSERTION TEXT
(see full document tab for complete 18 sections)`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullPipMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* ============ TOP BANNER ============ */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
            <BookOpen className="w-4 h-4" /> Formal Contract Documents & Verification
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Contract-Ready Implementation Plan & TECH-4 Deliverable Text
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Exportable, complete contractual text ready to insert into Deliverable D-1, D-2 Inception Report, and TECH-4 technical proposal annexes. 18 formal sections + WBS detail + Risk Register + SLA tiers + Checklist.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={copyToClipboard}
            className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-lg transition-colors cursor-pointer shadow-2xs"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied Markdown' : 'Copy Full Markdown'}
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-2 rounded-lg transition-colors cursor-pointer shadow-2xs"
          >
            <Printer className="w-4 h-4" /> Print
          </button>
        </div>
      </div>

      {/* ============ 6 SUB-TABS ============ */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'pip', label: 'Full PIP (18 Sections)', icon: FileText },
          { id: 'wbs', label: 'WBS Detail', icon: Layers },
          { id: 'risk', label: 'Risk Register', icon: AlertTriangle },
          { id: 'sla', label: 'SLA & Warranty', icon: ShieldCheck },
          { id: 'checklist', label: `Checklist (${Object.values(checkedItems).filter(Boolean).length}/16)`, icon: CheckSquare },
          { id: 'tech4', label: 'TECH-4 Clause', icon: Bookmark },
        ].map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveDoc(t.id as DocTab)}
              className={`whitespace-nowrap inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                activeDoc === t.id ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* ============ FULL PIP (18 SECTIONS) ============ */}
      {activeDoc === 'pip' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-2xs space-y-6 font-sans text-slate-800 leading-relaxed max-w-4xl mx-auto">
          {/* Cover */}
          <div className="border-b-2 border-slate-900 pb-6 space-y-2">
            <div className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
              E-SAPP WEB-ENABLED MANAGEMENT INFORMATION SYSTEM (MIS)
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Project Implementation Plan (PIP) & Customer Interface System
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500 pt-2">
              <div><strong>Client:</strong> Ministry of Agriculture (MoA), Republic of Zambia</div>
              <div><strong>Consultant:</strong> UNZA Department of Computer Science</div>
              <div><strong>Duration:</strong> 50 Working Days + 6-Month Support</div>
              <div><strong>Status:</strong> Baseline Approved (JCCC Ref: D-001)</div>
              <div><strong>Contract Ref:</strong> MoA-UNZA-E-SAPP-2026</div>
              <div><strong>Group:</strong> UNZA Group 6 — 8 members + Academic Supervisor</div>
            </div>
          </div>

          <Section n={1} title="Purpose & Contractual Objective">
            <p>To establish clear, formal, and documented communication between the Consultant (UNZA Department of Computer Science), the Client (Ministry of Agriculture – MoA), and other institutional stakeholders including M&amp;E, accounts, registry, project staff, IT, and external system custodians (PASTEL and the SAPP Contracts register).</p>
            <p>The overarching objective is ensuring that the right people talk to the right people, decisions are recorded with contractual authority, problems are escalated within guaranteed SLA windows, and the 50-day project schedule is rigorously protected.</p>
          </Section>

          <Section n={2} title="Governance: Joint Coordination and Control Committee (JCCC)">
            <p>The project is governed by a constituted Joint Coordination and Control Committee (JCCC) comprising designated leads from both the Ministry of Agriculture and the University of Zambia.</p>
            <Callout title="Permanent JCCC Mandate">
              Reviews weekly progress, evaluates proposed change requests, audits risk registers, and formally executes Acceptance Certificates for Deliverables D-1 through D-8. Meets monthly and at every deliverable gate.
            </Callout>
          </Section>

          <Section n={3} title="Scope of Work & Functional Modules">
            <Bullets items={[
              'Farmer & Cooperative Registry — smallholder profiles, NRC verification, geocoded camps',
              'M&E Indicator Tracking — 5 strategic agricultural indicators, quarterly disbursement reporting',
              'Grant Disbursement Certification — workflow gating, 3-tier approval chain, budget codes',
              'PASTEL Financial Bridge — voucher verification, GL reconciliation, grant payment sync',
              'SAPP Contracts Register — two-way milestone pipeline, contractor performance scoring',
              'GIS Spatial Analytics — 10-province boundaries, district camps, thematic heat maps',
              'Quarterly Progress Report Generator — auto-compiled narrative + financial annexes',
              'Approval Workflows & RBAC — 5 role types, digital sign-off with audit trail',
              'Public Notice-and-Comment Portal — BRRA-aligned 14-day statutory consultation',
              'JCCC Communication Dashboard — matrix, minutes, actions, escalation engine',
              'Training Content & User Manuals — 35 MoA officers, 3-day residential programme',
            ]} />
          </Section>

          <Section n={4} title="50-Day Work Breakdown Structure (WBS) & Deliverables Matrix">
            <Table
              headers={['Code', 'Deliverable Title', 'Due Day', 'Tranche', 'Sign-Off Authority']}
              rows={[
                ['D-1', 'Inception Report & Implementation Plan', 'Day 5', '15%', 'MoA Project Coordinator'],
                ['D-2', 'Stakeholder Consultations & CCIP Sign-Off', 'Day 10', '10%', 'MoA Project Coordinator'],
                ['D-3', 'Software Requirements Specification (SRS)', 'Day 18', '15%', 'MoA IT Lead & M&E Officer'],
                ['D-4', 'System Design Document (SDD) & Prototypes', 'Day 26', '15%', 'MoA Technical Review Panel'],
                ['D-5', 'Fully Coded Web-Enabled MIS & PASTEL Engine', 'Day 38', '20%', 'MoA IT Lead & PASTEL Lead'],
                ['D-6', 'SIT & User Acceptance Testing (UAT) Report', 'Day 44', '10%', 'MoA UAT Sign-Off Committee'],
                ['D-7', 'User Manuals & Staff Training Delivery', 'Day 48', '5%', 'MoA HR & Training Reps'],
                ['D-8', 'Final Handover, Deployment & Warranty', 'Day 50', '10%', 'MoA Permanent Secretary'],
              ]}
            />
          </Section>

          <Section n={5} title="External Systems Data Integration Architecture">
            <p><strong>PASTEL Financial System:</strong> Connects via secure ODBC / JSON REST bridge to automatically import financial commitment lines, voucher clearances, and smallholder farmer grant disbursements. Eliminates duplicate data entry.</p>
            <p><strong>SAPP Contracts Register:</strong> Two-way synchronisation pipeline tracks contract milestone deliverables, contractor performance, and agronomist inspection records.</p>
            <p><strong>GIS Spatial Boundaries:</strong> GeoJSON/Shapefile layers for all 10 provinces, district blocks, and geocoded farmer camps for thematic visual reporting.</p>
          </Section>

          <Section n={6} title="Testing Strategy (SIT & UAT)">
            <Bullets items={[
              'System Integration Testing (SIT) — 120 automated test scripts, 80% coverage threshold',
              'Security Audit — OWASP Top 10 scan, SQL injection, XSS, CSRF remediation',
              'Performance Testing — 500 concurrent user load, 3-second page load SLA',
              'Regression Testing — run on every pull request, CI-gated merges',
              'User Acceptance Testing (UAT) — 60 scenarios executed by 12 MoA district officers',
              'Zero P1/P2 defects policy at UAT sign-off gate',
              'Defect triage log with 48-hour fix window for Critical, 5-day for Major',
            ]} />
          </Section>

          <Section n={7} title="Data Migration & Cutover Plan">
            <p><strong>Pre-Cutover (Days 44–48):</strong> Extract legacy farmer, cooperative, and contract records from MoA registry. Clean, deduplicate, and validate against SRS data dictionary.</p>
            <p><strong>Dry-Run Migrations:</strong> Two full rehearsals against staging. Reconcile 100% of records before Go-Live.</p>
            <p><strong>Production Cutover (Days 48–50):</strong> Freeze legacy MIS read-only, migrate final delta, DNS switch at MoA Government Data Centre, smoke test with roll-back plan.</p>
          </Section>

          <Section n={8} title="Training & Capacity Building">
            <p>Delivery of a 3-day residential training programme for <strong>35 MoA officers</strong> across 10 provinces.</p>
            <Bullets items={[
              'Day 1 — E-SAPP MIS navigation, farmer registry, M&E indicators',
              'Day 2 — Grant disbursement workflows, PASTEL bridge, approval chains',
              'Day 3 — SAPP Contracts, GIS analytics, quarterly reporting, admin runbook',
              'Pre/post competency assessment — 90% pass threshold required',
              'Training manual (PDF) + video walkthroughs left as durable reference assets',
            ]} />
          </Section>

          <Section n={9} title="Change Control Procedure (CCB)">
            <p>Any scope modification requires a formal <strong>Change Request (CR)</strong> reviewed by the Change Control Board. Each CR is evaluated on 4 vectors:</p>
            <Bullets items={[
              'Scope — which sub-modules/interfaces are affected',
              'Schedule — impact in working days, threat to 50-day critical path',
              'Cost — additional ZMW exposure against contract value',
              'Risk — likelihood × impact, mitigation strategy',
            ]} />
            <Callout title="Deferral Policy">
              Any CR that threatens the 50-day Go-Live may be deferred to the 6-month Post-Deployment Support phase at the JCCC’s sole discretion.
            </Callout>
          </Section>

          <Section n={10} title="Quality Assurance & Acceptance Criteria">
            <p>Each deliverable (D-1 to D-8) has a mandatory acceptance checklist. No certificate is issued until <strong>100% of mandatory criteria are verified</strong> by the designated approver panel within the 3-working-day SLA.</p>
          </Section>

          <Section n={11} title="Risk Management & Mitigation Register">
            <p>See the <strong>Risk Register</strong> sub-tab for the complete 12-row risk matrix with RAG status, probability, impact, owner, and mitigation.</p>
          </Section>

          <Section n={12} title="Operate, Monitor & Improve (KPIs)">
            <Bullets items={[
              'Weekly progress reports on time — Target 100%',
              'Meeting minutes issued within 24 hours — Target 100%',
              'Deliverable approval within 3 working days — Target ≥95%',
              'Escalations acknowledged within 24 hours — Target 100%',
              'Change requests processed within 5 working days — Target ≥90%',
              'Stakeholder satisfaction score — Target ≥4.0/5.0',
            ]} />
          </Section>

          <Section n={13} title="Organisational Structure (UNZA Group 6)">
            <p>The Consultant team is a 9-member unit: 8 UNZA Computer Science students under the academic supervision of <strong>Mr. Martin Phiri</strong>. Consolidated into three functional clusters — Governance &amp; Lead, Technical &amp; Architecture, and Data &amp; GIS — each with a named MoA counterpart interface.</p>
          </Section>

          <Section n={14} title="Contractual Contact & Interface Matrix">
            <p>Complete named counterpart interfaces are managed in the <strong>Communication Matrix</strong> tab, covering Contractual, Technical, Functional, Data Integration, Testing, Training, and Support interface types across 14+ verified contacts.</p>
          </Section>

          <Section n={15} title="Payment Milestones & Tranche Register">
            <p>ZMW 500,000 contract value disbursed across 8 tranches tied strictly to signed Acceptance Certificates. See the <strong>Payment Milestones</strong> tab for full breakdown. No advance payments permitted without verified phase-gate sign-off.</p>
          </Section>

          <Section n={16} title="Assumptions, Dependencies & Constraints">
            <Bullets items={[
              'MoA provides timely access to PASTEL DBA and shared schema documentation',
              'Government Data Centre staging environment provisioned by Day 19',
              'UAT officers released from district duties for the 3-day window',
              'No more than 2 major change requests during the 50-day execution',
              'Internet connectivity available at Mulungushi House for hybrid meetings',
            ]} />
          </Section>

          <Section n={17} title="Post-Deployment Warranty & Support (6 Months)">
            <p>Following Go-Live, the Consultant provides a 6-month warranty covering bug fixes, minor enhancements, quarterly performance reviews, and database maintenance. See the <strong>SLA &amp; Warranty</strong> sub-tab for tier breakdown.</p>
          </Section>

          <Section n={18} title="Glossary & Acronyms">
            <Bullets items={[
              'E-SAPP — Enhanced Smallholder Agribusiness Promotion Programme',
              'MIS — Management Information System',
              'JCCC — Joint Coordination and Control Committee',
              'CCIP — Customer Communication and Interface Plan',
              'SRS — Software Requirements Specification',
              'SDD — System Design Document',
              'SIT — System Integration Testing',
              'UAT — User Acceptance Testing',
              'RIA — Regulatory Impact Assessment',
              'CCB — Change Control Board',
              'PASTEL — MoA legacy accounting system',
              'SAPP — Smallholder Agribusiness Promotion Programme',
            ]} />
          </Section>
        </div>
      )}

      {/* ============ WBS DETAIL ============ */}
      {activeDoc === 'wbs' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-2xs space-y-5 max-w-4xl mx-auto">
          <div className="border-b-2 border-emerald-700 pb-3">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-700" /> Detailed Work Breakdown Structure
            </h3>
            <p className="text-xs text-slate-500 mt-1">4 Phases • 10 Work Packages • 50 Working Days</p>
          </div>

          <div className="space-y-4">
            <PhaseBlock
              phase="Phase 1: Inception, Governance & Requirements Engineering"
              days="Days 1 – 18"
              color="emerald"
              workPackages={[
                { code: 'WP 1.1', title: 'Mobilization & Governance', days: 'Days 1–5', lead: 'Ruth Kamwendo', moa: 'Eng. John Banda', activities: ['Kick-off at Mulungushi House', 'JCCC constitution', 'D-1 Inception Plan submission'] },
                { code: 'WP 1.2', title: 'Stakeholder Consultation & Protocol', days: 'Days 6–10', lead: 'Ruth Kamwendo', moa: 'Stakeholder Committee', activities: ['Validation with M&E, Accounts, Registry, IT', 'CCIP drafting', 'D-2 sign-off'] },
                { code: 'WP 1.3', title: 'Software Requirements Specification (SRS)', days: 'Days 11–18', lead: 'Bwalya Mumba', moa: 'MoA IT Lead', activities: ['Field survey data models', 'PASTEL integration spec', 'GIS spatial layer inventory', 'D-3 sign-off'] },
              ]}
            />

            <PhaseBlock
              phase="Phase 2: System Architecture, Database & UI/UX Design"
              days="Days 19 – 26"
              color="blue"
              workPackages={[
                { code: 'WP 2.1', title: 'System Architecture & Staging Setup', days: 'Days 19–23', lead: 'Bwalya Mumba', moa: 'MoA IT Infrastructure', activities: ['Server architecture', 'REST API design', 'RBAC security spec', 'MoA GDC staging setup'] },
                { code: 'WP 2.2', title: 'UI/UX Design & System Design Document', days: 'Days 21–26', lead: 'Bornface Kangombe', moa: 'MoA Technical Review Panel', activities: ['Clickable prototypes', '3NF ER diagrams', 'Design review workshop', 'D-4 sign-off'] },
              ]}
            />

            <PhaseBlock
              phase="Phase 3: Core MIS Development & System Integration"
              days="Days 27 – 38"
              color="amber"
              workPackages={[
                { code: 'WP 3.1', title: 'Core Agricultural MIS Modules', days: 'Days 27–34', lead: 'Chimwemwe Sinyinza', moa: 'MoA M&E Officers', activities: ['Farmer registry', 'M&E indicator tracking', 'Quarterly progress reports', 'Approval workflows'] },
                { code: 'WP 3.2', title: 'PASTEL & SAPP Contracts Integration', days: 'Days 31–36', lead: 'Bwalya Mumba', moa: 'PASTEL DBA / Procurement', activities: ['ODBC/API bridge', 'Voucher verification', 'Grant disbursement sync', 'Two-way contract pipeline'] },
                { code: 'WP 3.3', title: 'GIS Spatial Analytics Module', days: 'Days 33–38', lead: 'Bornface Kangombe', moa: 'Surveyor General', activities: ['10-province boundary mapping', 'Block camp geocoding', 'Thematic heat maps', 'D-5 package completion'] },
              ]}
            />

            <PhaseBlock
              phase="Phase 4: Testing, Training, Deployment & Handover"
              days="Days 39 – 50"
              color="purple"
              workPackages={[
                { code: 'WP 4.1', title: 'SIT & Security Audit', days: 'Days 39–42', lead: 'Bwalya Mumba', moa: 'MoA IT Security', activities: ['Automated test scripts', 'OWASP Top 10 audit', '500-user concurrency test'] },
                { code: 'WP 4.2', title: 'User Acceptance Testing (UAT)', days: 'Days 42–44', lead: 'Ruth Kamwendo', moa: 'MoA UAT Committee', activities: ['60 test scenarios', 'Zero P1/P2 defects', 'D-6 signed certificate'] },
                { code: 'WP 4.3', title: 'Documentation & Hands-on Training', days: 'Days 44–48', lead: 'Bornface Kangombe', moa: 'MoA HR & Training', activities: ['User manuals', 'Admin runbooks', '3-day training for 35 officers', 'D-7 sign-off'] },
                { code: 'WP 4.4', title: 'Production Cutover & Handover', days: 'Days 48–50', lead: 'Chimwemwe Sinyinza', moa: 'MoA Permanent Secretary', activities: ['Data migration', 'DNS switch at MoA GDC', 'Source escrow transfer', 'D-8 Acceptance Certificate'] },
              ]}
            />
          </div>
        </div>
      )}

      {/* ============ RISK REGISTER ============ */}
      {activeDoc === 'risk' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-2xs space-y-5 max-w-5xl mx-auto">
          <div className="border-b-2 border-emerald-700 pb-3">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" /> Contractual Risk Register
            </h3>
            <p className="text-xs text-slate-500 mt-1">12 identified risks across scope, schedule, cost, and quality vectors.</p>
          </div>

          <Table
            headers={['ID', 'Risk Description', 'Prob.', 'Impact', 'RAG', 'Owner', 'Mitigation Strategy']}
            rows={[
              ['R-01', 'PASTEL schema credentials delayed by MoA Accounts', 'High', 'Critical', 'RED', 'MoA Finance Lead', 'Escalate to JCCC Level 2; interim CSV bridge'],
              ['R-02', 'Government Data Centre staging delayed', 'Medium', 'High', 'AMBER', 'MoA IT Lead', 'Parallel Docker-based local staging environment'],
              ['R-03', 'UAT officer availability during harvest season', 'High', 'Medium', 'AMBER', 'MoA HR', 'Schedule UAT outside peak field days; hybrid sessions'],
              ['R-04', 'Scope creep via informal MoA directives', 'Medium', 'High', 'AMBER', 'Ruth Kamwendo', 'Enforce Golden Rule: all changes via formal CCB'],
              ['R-05', 'Internet instability during hybrid meetings', 'Medium', 'Low', 'GREEN', 'UNZA Lead', 'Record sessions; distribute notes within 24h'],
              ['R-06', 'GIS boundary data inconsistent across provinces', 'Low', 'Medium', 'GREEN', 'Surveyor General', 'Signed SHA-256 GeoPackage verification'],
              ['R-07', 'SAPP Contracts API breaking changes', 'Low', 'High', 'AMBER', 'SAPP Custodian', 'Version-locked endpoints; contract change notice'],
              ['R-08', 'Team member unavailable (illness/exams)', 'Medium', 'Medium', 'AMBER', 'Academic Supervisor', 'Cross-training across clusters; documented runbooks'],
              ['R-09', 'Certificate signing delayed past Day 5 gate', 'Low', 'High', 'GREEN', 'MoA Coordinator', 'Pre-scheduled JCCC sitting at every gate'],
              ['R-10', 'Data migration record mismatch', 'Medium', 'High', 'AMBER', 'Bornface Kangombe', 'Two dry-run rehearsals; 100% reconciliation required'],
              ['R-11', 'Security vulnerability discovered post-Go-Live', 'Low', 'Critical', 'AMBER', 'Bwalya Mumba', '6-month warranty SLA with 48h critical fix window'],
              ['R-12', 'Hostile public consultation representation surge', 'Low', 'Medium', 'GREEN', 'MoA Communications', 'Auto-triage + 14-day statutory comment window'],
            ]}
          />
        </div>
      )}

      {/* ============ SLA & WARRANTY ============ */}
      {activeDoc === 'sla' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-2xs space-y-5 max-w-4xl mx-auto">
          <div className="border-b-2 border-emerald-700 pb-3">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700" /> 6-Month Post-Deployment SLA Tiers
            </h3>
            <p className="text-xs text-slate-500 mt-1">Warranty commences Day 51, runs through Day 230.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SlaCard
              tier="Tier 1 — Critical"
              color="red"
              examples={['Production system down', 'Data corruption', 'Security breach']}
              response="4 working hours"
              resolution="48 hours"
            />
            <SlaCard
              tier="Tier 2 — Major"
              color="amber"
              examples={['Module unavailable', 'PASTEL sync failure', 'Report generator error']}
              response="1 working day"
              resolution="5 working days"
            />
            <SlaCard
              tier="Tier 3 — Minor"
              color="emerald"
              examples={['UI defect', 'Cosmetic issue', 'Wording correction']}
              response="3 working days"
              resolution="Next scheduled release"
            />
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-700 space-y-2">
            <div className="font-bold text-slate-900 text-sm">Warranty Coverage</div>
            <ul className="space-y-1">
              <li>• Bug fixes for defects traceable to design or development</li>
              <li>• Minor enhancements ≤8 development hours each, cumulative cap 40h</li>
              <li>• Quarterly performance review &amp; database maintenance</li>
              <li>• Named support contact with 24-hour acknowledgement commitment</li>
              <li>• Excludes: new modules, third-party system changes, hardware issues</li>
            </ul>
          </div>
        </div>
      )}

      {/* ============ CHECKLIST ============ */}
      {activeDoc === 'checklist' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-2xs space-y-4 max-w-3xl mx-auto">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-lg font-bold text-slate-900">16-Point Implementation &amp; Audit Checklist</h3>
            <p className="text-xs text-slate-500 mt-1">Used during inception workshops and quarterly reviews to audit contractual compliance.</p>
          </div>

          <div className="space-y-2 pt-2">
            {checklistItems.map((item) => {
              const isChecked = !!checkedItems[item.id];
              return (
                <label
                  key={item.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border text-xs cursor-pointer transition-colors ${
                    isChecked
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950 font-medium'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleCheck(item.id)}
                    className="mt-0.5 rounded text-emerald-700 focus:ring-emerald-600 h-4 w-4"
                  />
                  <span className="leading-relaxed">{item.label}</span>
                </label>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span>Progress: {Object.values(checkedItems).filter(Boolean).length} of 16 actions complete</span>
            <span className="font-bold text-emerald-700">Ready for Inception Sign-Off</span>
          </div>
        </div>
      )}

      {/* ============ TECH-4 EXPANDED ============ */}
      {activeDoc === 'tech4' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-2xs space-y-6 max-w-4xl mx-auto">
          <div className="border-b-2 border-emerald-700 pb-3">
            <h3 className="text-lg font-bold text-slate-900">Integration Clause for TECH-4</h3>
            <p className="text-xs text-slate-500 mt-1">
              Add this exact subsection under &ldquo;Project Management&rdquo; in TECH-4.
            </p>
          </div>

          {/* Main clause */}
          <div className="bg-slate-50 border-l-4 border-emerald-700 p-5 rounded-r-lg text-sm text-slate-800 space-y-3 italic leading-relaxed">
            <div className="font-bold not-italic text-slate-900 uppercase tracking-wider text-xs">
              Customer Communication and Interface Channels
            </div>
            <p>
              &ldquo;The consultant will establish a formal communication and interface plan. A Joint
              Coordination and Control Committee (JCCC) will be formed with representatives from MoA
              and the consultant. Named contact points will be appointed for contractual, technical,
              functional, testing, training, and support interfaces. Official channels will include
              email, Trello, shared drive, video conferencing, and formal letters. Communication
              frequency will include daily team reports, 3-day team leader updates, weekly client
              progress meetings, monthly JCCC meetings, and milestone phase-gate reviews. All
              decisions will be recorded in meeting minutes, decision logs, and action logs. An
              escalation path with response times will be agreed. Change requests will follow a
              formal Change Control Procedure. The full plan will be documented in the Inception
              Report and approved by MoA.&rdquo;
            </p>
          </div>

          {/* Breakdown */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-3">Contractual Commitments Breakdown</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <CommitBlock
                icon={Users}
                title="Governance Structure"
                items={[
                  'JCCC formed with MoA + UNZA representation',
                  'Named contact points for all 7 interface types',
                  'Formal decision authority defined',
                ]}
              />
              <CommitBlock
                icon={Network}
                title="Communication Channels"
                items={[
                  'Email (primary formal dispatch)',
                  'Trello / Project Portal',
                  'Shared cloud drive (10-folder structure)',
                  'Video conferencing (Teams)',
                  'Formal letters and in-person meetings',
                ]}
              />
              <CommitBlock
                icon={ClipboardList}
                title="Communication Frequency"
                items={[
                  'Daily team reports',
                  '3-day team leader updates',
                  'Weekly client progress meetings',
                  'Monthly JCCC meetings',
                  'Milestone phase-gate reviews',
                ]}
              />
              <CommitBlock
                icon={Target}
                title="Escalation & Change Control"
                items={[
                  '4-level escalation with defined SLA',
                  '24-hour acknowledgment for escalations',
                  'Formal Change Request process via CCB',
                  'Deferral policy preserving 50-day critical path',
                ]}
              />
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs">
            <strong className="text-amber-900">Reference:</strong>
            <span className="text-amber-800"> Approved at Inception Review • Ministry of Agriculture • E-SAPP Contract Review</span>
          </div>
        </div>
      )}
    </div>
  );
};

/* ============ HELPER COMPONENTS ============ */

const Section: React.FC<{ n: number; title: string; children: React.ReactNode }> = ({ n, title, children }) => (
  <section className="space-y-3">
    <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-1">
      {n}. {title}
    </h2>
    <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">{children}</div>
  </section>
);

const Callout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-xs">
    <strong className="text-slate-800">{title}:</strong> <span className="text-slate-700">{children}</span>
  </div>
);

const Bullets: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="space-y-1.5">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2">
        <span className="text-emerald-600 font-bold shrink-0">•</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const Table: React.FC<{ headers: string[]; rows: string[][] }> = ({ headers, rows }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left text-xs border border-slate-200">
      <thead>
        <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
          {headers.map((h, i) => (
            <th key={i} className="p-2.5">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 text-slate-700">
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j} className={`p-2.5 ${j === 0 ? 'font-bold text-slate-900' : ''}`}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const PhaseBlock: React.FC<{ phase: string; days: string; color: string; workPackages: any[] }> = ({ phase, days, color, workPackages }) => {
  const colorMap: Record<string, string> = {
    emerald: 'border-emerald-200 bg-emerald-50/40',
    blue: 'border-blue-200 bg-blue-50/40',
    amber: 'border-amber-200 bg-amber-50/40',
    purple: 'border-purple-200 bg-purple-50/40',
  };
  return (
    <div className={`border rounded-xl p-4 space-y-3 ${colorMap[color] || 'border-slate-200'}`}>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-slate-900">{phase}</h4>
        <span className="text-[11px] font-mono font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">{days}</span>
      </div>
      <div className="space-y-2">
        {workPackages.map((wp) => (
          <div key={wp.code} className="bg-white border border-slate-200 rounded-lg p-3 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">{wp.code}</span>
                <span className="font-bold text-slate-900">{wp.title}</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">{wp.days}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-100">
              <div><span className="font-semibold text-slate-600">Lead:</span> <span className="text-emerald-800 font-medium">{wp.lead}</span></div>
              <div><span className="font-semibold text-slate-600">MoA:</span> <span className="text-slate-700">{wp.moa}</span></div>
            </div>
            <ul className="space-y-0.5 text-[11px] text-slate-600 pt-1">
              {wp.activities.map((a: string, i: number) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-emerald-600">•</span> {a}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

const SlaCard: React.FC<{ tier: string; color: string; examples: string[]; response: string; resolution: string }> = ({ tier, color, examples, response, resolution }) => {
  const colorMap: Record<string, string> = {
    red: 'border-red-300 bg-red-50/40',
    amber: 'border-amber-300 bg-amber-50/40',
    emerald: 'border-emerald-300 bg-emerald-50/40',
  };
  return (
    <div className={`border-2 rounded-xl p-4 space-y-2 ${colorMap[color]}`}>
      <h4 className="text-sm font-bold text-slate-900">{tier}</h4>
      <div className="text-[11px] text-slate-600 space-y-0.5">
        <div className="font-semibold text-slate-700">Examples:</div>
        {examples.map((e, i) => <div key={i}>• {e}</div>)}
      </div>
      <div className="pt-2 border-t border-slate-200 text-xs space-y-1">
        <div className="flex justify-between"><span className="text-slate-600">Response:</span><strong className="text-slate-900">{response}</strong></div>
        <div className="flex justify-between"><span className="text-slate-600">Resolution:</span><strong className="text-slate-900">{resolution}</strong></div>
      </div>
    </div>
  );
};

const CommitBlock: React.FC<{ icon: any; title: string; items: string[] }> = ({ icon: Icon, title, items }) => (
  <div className="border border-slate-200 rounded-lg p-4 bg-white">
    <div className="font-bold text-emerald-800 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
      <Icon className="w-3.5 h-3.5" /> {title}
    </div>
    <ul className="space-y-1 text-xs text-slate-700">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-1.5">
          <span className="text-emerald-600 font-bold">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);