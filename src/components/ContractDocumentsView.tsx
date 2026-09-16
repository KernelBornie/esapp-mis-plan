import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Printer, 
  CheckSquare, 
  Download, 
  BookOpen,
  Bookmark
} from 'lucide-react';

export const ContractDocumentsView: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeDoc, setActiveDoc] = useState<'pip' | 'ccip' | 'tech4' | 'checklist'>('pip');

  // Interactive implementation checklist state
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
    10: true,
    11: true,
    12: true,
    13: true,
    14: false,
    15: false,
    16: false,
  });

  const toggleCheck = (id: number) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

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

---

### 1. PURPOSE AND OBJECTIVES
The purpose of this Project Implementation Plan (PIP) is to establish a rigorous, auditable, and contract-ready operational roadmap for the delivery of the E-SAPP Web-Enabled Management Information System (MIS). 

The primary objectives are to:
1. Protect the 50-day contractual schedule through clear critical path milestones.
2. Synchronize UNZA technical specialists with Ministry of Agriculture counterparts.
3. Guarantee seamless data integration with the legacy **PASTEL Accounting System** and the **SAPP Contracts Register**.
4. Enforce strict governance via the **Joint Coordination and Control Committee (JCCC)**.
5. Provide auditable phase-gate acceptance criteria for Deliverables D-1 to D-8.

---

### 2. WORK BREAKDOWN STRUCTURE (WBS) & PHASES

#### Phase 1: Inception, Governance & Requirements Engineering (Days 1 – 18)
- **WP 1.1 Mobilization & Governance (Days 1–5):** Kick-off meeting at Mulungushi House; JCCC constitution; Deliverable D-1 Inception Plan submission.
- **WP 1.2 Stakeholder Consultation & Protocol (Days 6–10):** Validation with M&E, Accounts, Registry, IT, and external system owners; Deliverable D-2 sign-off.
- **WP 1.3 Software Requirements Specification (SRS) (Days 11–18):** Field survey data models, PASTEL integration specifications, GIS spatial layers; Deliverable D-3 sign-off.

#### Phase 2: System Architecture, Database & UI/UX Design (Days 19 – 26)
- **WP 2.1 System Architecture & Staging Setup (Days 19–23):** Server architecture, REST API design, RBAC security specifications, MoA Government Data Centre staging environment setup.
- **WP 2.2 UI/UX Design & System Design Document (Days 21–26):** Clickable interactive prototypes, database ER diagrams (3NF), design review workshop; Deliverable D-4 sign-off.

#### Phase 3: Core MIS Development & System Integration (Days 27 – 38)
- **WP 3.1 Core Agricultural MIS Modules (Days 27–34):** Farmer registry, M&E indicator tracking, quarterly progress reports, approval workflows.
- **WP 3.2 PASTEL & SAPP Contracts Integration Engine (Days 31–36):** ODBC/API bridge for PASTEL general ledger, voucher verification, grant disbursement sync, Contracts register two-way pipeline.
- **WP 3.3 GIS Spatial Analytics Module (Days 33–38):** 10-province boundary mapping, agricultural block camp geocoding, thematic heat maps; Deliverable D-5 package completion.

#### Phase 4: Testing, Training, Deployment & Handover (Days 39 – 50)
- **WP 4.1 System Integration Testing (SIT) & Security Audit (Days 39–42):** Automated test scripts, OWASP Top 10 security audit, 500-user concurrency stress testing.
- **WP 4.2 User Acceptance Testing (UAT) (Days 42–44):** 60 test scenarios executed by MoA district staff; zero P1/P2 defects threshold; Deliverable D-6 signed certificate.
- **WP 4.3 Documentation & Hands-on Training (Days 44–48):** User manuals, Admin runbooks, 3-day training for 35 MoA officers; Deliverable D-7 sign-off.
- **WP 4.4 Production Cutover & Handover (Days 48–50):** Data migration, DNS switch at MoA Data Centre, source code escrow transfer, final Acceptance Certificate D-8 execution.

#### Post-Deployment: 6-Month Warranty & Maintenance Support (Days 51 – 230)
- Dedicated SLA support, bug fixes, quarterly performance reviews, and database maintenance.

---

### 3. DELIVERABLE PHASE-GATE ACCEPTANCE & PAYMENT SCHEDULE
| Deliverable | Description | Target Day | Payment % | Approver Authority |
|---|---|---|---|---|
| **D-1** | Inception Report & Implementation Plan | Day 5 | 15% | MoA Project Coordinator |
| **D-2** | Stakeholder Consultation & CCIP Protocol | Day 10 | 10% | MoA Coordinator & JCCC |
| **D-3** | Software Requirements Specification (SRS) | Day 18 | 15% | MoA IT & M&E Leads |
| **D-4** | System Design Document (SDD) & Wireframes | Day 26 | 15% | MoA Technical Review Panel |
| **D-5** | Coded Web-Enabled MIS & PASTEL Engine | Day 38 | 20% | MoA IT & PASTEL Custodian |
| **D-6** | System Integration Testing & UAT Report | Day 44 | 10% | MoA UAT Committee |
| **D-7** | User Manuals & Conducted Training | Day 48 | 5% | MoA HR & User Reps |
| **D-8** | Final Handover & Acceptance Certificate | Day 50 | 10% | MoA Permanent Secretary |

---

### 4. GOVERNANCE & CUSTOMER COMMUNICATION INTEGRATION
As defined in the Customer Communication and Interface Plan:
1. **Joint Coordination and Control Committee (JCCC):** Meets monthly and at deliverable gates.
2. **24-Hour Confirmation Rule:** Any verbal directive or change must be confirmed in writing within 24 hours.
3. **TECH-4 Frequency:** Daily team stand-ups, 3-day team leader updates, weekly client progress meetings with written minutes.
4. **4-Level Escalation Hierarchy:** Level 1 (24h) -> Level 2 (48h) -> Level 3 (5 days) -> Level 4 (Contract arbitration).
5. **Change Control Procedure:** Any scope modification requires Change Request Form review by the CCB.

---

### 5. TECH-4 SUBSECTION INSERTION TEXT
*(To be inserted into TECH-4 under "Project Management")*
> **Customer Communication and Interface Channels**
>
> The consultant will establish a formal communication and interface plan. A Joint Coordination and Control Committee (JCCC) will be formed with representatives from MoA and the consultant. Named contact points will be appointed for contractual, technical, functional, testing, training, and support interfaces. Official channels will include email, Trello, shared drive, video conferencing, and formal letters. Communication frequency will include daily team reports, 3-day team leader updates, weekly client progress meetings, monthly JCCC meetings, and milestone phase-gate reviews. All decisions will be recorded in meeting minutes, decision logs, and action logs. An escalation path with response times will be agreed. Change requests will follow a formal Change Control Procedure. The full plan will be documented in the Inception Report and approved by MoA.`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullPipMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
            <BookOpen className="w-4 h-4" /> Formal Contract Documents & Verification
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Contract-Ready Implementation Plan & TECH-4 Deliverable Text
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Exportable, complete contractual text ready to insert into Deliverable D-1, Deliverable D-2 Inception Report, and TECH-4 technical proposal annexes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyToClipboard}
            className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-lg transition-colors cursor-pointer shadow-2xs"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied Markdown' : 'Copy Full Contract Markdown'}
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-2 rounded-lg transition-colors cursor-pointer shadow-2xs"
          >
            <Printer className="w-4 h-4" /> Print Document
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveDoc('pip')}
          className={`text-xs font-bold px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
            activeDoc === 'pip' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Full Project Implementation Plan (PIP)
        </button>
        <button
          onClick={() => setActiveDoc('checklist')}
          className={`text-xs font-bold px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
            activeDoc === 'checklist' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          16-Point Implementation Checklist ({Object.values(checkedItems).filter(Boolean).length}/16)
        </button>
        <button
          onClick={() => setActiveDoc('tech4')}
          className={`text-xs font-bold px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
            activeDoc === 'tech4' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          TECH-4 Integration Clause
        </button>
      </div>

      {/* Content Area */}
      {activeDoc === 'pip' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-2xs space-y-6 font-sans text-slate-800 leading-relaxed max-w-4xl mx-auto">
          {/* Cover Header */}
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
            </div>
          </div>

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-1">
              1. Purpose & Contractual Objective
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              To establish clear, formal, and documented communication between the Consultant (UNZA Department of Computer Science), the Client (Ministry of Agriculture – MoA), and other institutional stakeholders (M&E, accounts, registry, project staff, IT, and external system custodians including PASTEL and the SAPP Contracts register).
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              The overarching objective is ensuring that the right people talk to the right people, decisions are recorded with contractual authority, problems are escalated within guaranteed SLA windows, and the 50-day project schedule is rigorously protected.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-1">
              2. Governance: Joint Coordination and Control Committee (JCCC)
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              The project is governed by a constituted Joint Coordination and Control Committee (JCCC) comprising designated leads from both the Ministry of Agriculture and the University of Zambia.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-xs">
              <strong className="text-slate-800">Permanent JCCC Mandate:</strong> Reviews weekly progress, evaluates proposed change requests, audits risk registers, and formally executes Acceptance Certificates for Deliverables D-1 through D-8.
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-1">
              3. 50-Day Work Breakdown Structure (WBS) & Deliverables Matrix
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th className="p-2.5">Code</th>
                    <th className="p-2.5">Deliverable Title</th>
                    <th className="p-2.5">Due Day</th>
                    <th className="p-2.5">Tranche</th>
                    <th className="p-2.5">Sign-Off Authority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="p-2.5 font-bold">D-1</td>
                    <td className="p-2.5">Inception Report & Implementation Plan</td>
                    <td className="p-2.5">Day 5</td>
                    <td className="p-2.5 font-bold text-emerald-700">15%</td>
                    <td className="p-2.5">MoA Project Coordinator</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">D-2</td>
                    <td className="p-2.5">Stakeholder Consultations & CCIP Sign-Off</td>
                    <td className="p-2.5">Day 10</td>
                    <td className="p-2.5 font-bold text-emerald-700">10%</td>
                    <td className="p-2.5">MoA Project Coordinator</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">D-3</td>
                    <td className="p-2.5">Software Requirements Specification (SRS)</td>
                    <td className="p-2.5">Day 18</td>
                    <td className="p-2.5 font-bold text-emerald-700">15%</td>
                    <td className="p-2.5">MoA IT Lead & M&E Officer</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">D-4</td>
                    <td className="p-2.5">System Design Document (SDD) & Prototypes</td>
                    <td className="p-2.5">Day 26</td>
                    <td className="p-2.5 font-bold text-emerald-700">15%</td>
                    <td className="p-2.5">MoA Technical Review Panel</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">D-5</td>
                    <td className="p-2.5">Fully Coded Web-Enabled MIS & PASTEL Engine</td>
                    <td className="p-2.5">Day 38</td>
                    <td className="p-2.5 font-bold text-emerald-700">20%</td>
                    <td className="p-2.5">MoA IT Lead & PASTEL Lead</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">D-6</td>
                    <td className="p-2.5">SIT & User Acceptance Testing (UAT) Report</td>
                    <td className="p-2.5">Day 44</td>
                    <td className="p-2.5 font-bold text-emerald-700">10%</td>
                    <td className="p-2.5">MoA UAT Sign-Off Committee</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">D-7</td>
                    <td className="p-2.5">User Manuals & Staff Training Delivery</td>
                    <td className="p-2.5">Day 48</td>
                    <td className="p-2.5 font-bold text-emerald-700">5%</td>
                    <td className="p-2.5">MoA HR & Training Reps</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">D-8</td>
                    <td className="p-2.5">Final Handover, Deployment & Warranty</td>
                    <td className="p-2.5">Day 50</td>
                    <td className="p-2.5 font-bold text-emerald-700">10%</td>
                    <td className="p-2.5">MoA Permanent Secretary</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-1">
              4. External Systems Data Integration Architecture
            </h2>
            <div className="space-y-2 text-xs sm:text-sm text-slate-700">
              <p>
                <strong>PASTEL Financial System:</strong> Connects via secure ODBC / JSON REST bridge to automatically import financial commitment lines, voucher clearances, and smallholder farmer grant disbursements. Eliminates duplicate data entry.
              </p>
              <p>
                <strong>SAPP Contracts Register:</strong> Two-way synchronisation pipeline tracks contract milestone deliverables, contractor performance, and agronomist inspection records.
              </p>
              <p>
                <strong>GIS Spatial Boundaries:</strong> GeoJSON/Shapefile layers for all 10 provinces, district blocks, and geocoded farmer camps for thematic visual reporting.
              </p>
            </div>
          </section>
        </div>
      )}

      {/* Content Area: Checklist */}
      {activeDoc === 'checklist' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-2xs space-y-4 max-w-3xl mx-auto">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-lg font-bold text-slate-900">16-Point Implementation & Audit Checklist</h3>
            <p className="text-xs text-slate-500 mt-1">
              Used during inception workshops and quarterly reviews to audit contractual compliance.
            </p>
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

      {/* Content Area: TECH-4 Integration */}
      {activeDoc === 'tech4' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-2xs space-y-4 max-w-3xl mx-auto">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-lg font-bold text-slate-900">Integration Clause for TECH-4</h3>
            <p className="text-xs text-slate-500 mt-1">
              Add this exact subsection under &ldquo;Project Management&rdquo; in TECH-4:
            </p>
          </div>

          <div className="bg-slate-50 border-l-4 border-emerald-700 p-5 rounded-r-lg text-xs sm:text-sm text-slate-800 space-y-3 italic leading-relaxed">
            <div className="font-bold not-italic text-slate-900 uppercase tracking-wider text-xs">
              Customer Communication and Interface Channels
            </div>
            <p>
              &ldquo;The consultant will establish a formal communication and interface plan. A Joint Coordination and Control Committee (JCCC) will be formed with representatives from MoA and the consultant. Named contact points will be appointed for contractual, technical, functional, testing, training, and support interfaces. Official channels will include email, Trello, shared drive, video conferencing, and formal letters. Communication frequency will include daily team reports, 3-day team leader updates, weekly client progress meetings, monthly JCCC meetings, and milestone phase-gate reviews. All decisions will be recorded in meeting minutes, decision logs, and action logs. An escalation path with response times will be agreed. Change requests will follow a formal Change Control Procedure. The full plan will be documented in the Inception Report and approved by MoA.&rdquo;
            </p>
          </div>

          <div className="text-xs text-slate-500 pt-2">
            Reference: Approved at Inception Review &bull; Ministry of Agriculture &bull; E-SAPP Contract Review
          </div>
        </div>
      )}
    </div>
  );
};
