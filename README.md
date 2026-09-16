# E-SAPP Web-Enabled MIS — Project Implementation & Communication Plan

**Contract Reference:** MoA-UNZA-E-SAPP-2026
**Client:** Ministry of Agriculture (MoA), Republic of Zambia
**Consultant:** UNZA Department of Computer Science
**Duration:** 50 Working Days + 6-Month Post-Deployment Support

---

## Project Overview

Formal, auditable operational framework implementing the 50-day contractual timeline for the Enhanced Smallholder Agribusiness Promotion Programme (E-SAPP) Management Information System (MIS). This application provides end-to-end governance, deliverable tracking, milestone certification, and multi-stakeholder communication for the MoA & UNZA contract.

## Team — UNZA Group 6

| Name | Student ID | Role |
|---|---|---|
| Mr. Martin Phiri | — | Course Lecturer (Academic Supervisor) |
| Chimwemwe Sinyinza | 2022067576 | Project Lead / Team Leader (GL) |
| Bwalya Mumba | 2021412423 | Lead System Analyst & Architect |
| Ruth Kamwendo | 2022019814 | Consultant Project Manager / JCCC Secretariat |
| Namakau Himululi | 2021410587 | Deputy PM / Communication Liaison |
| Chikondi Banda | 2021381072 | Business Analyst / Requirements Engineer |
| Idah Mumbi | 2022009983 | QA & Test Lead / Training Lead |
| Chali Gerald Chibwana | 2017011498 | Integration Developer / Database Administrator |
| Bornface Kangombe | 2022064526 | GIS Specialist / UI-UX Lead |

## Technology Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **Animation:** Motion

## Dashboard Modules

1. PIP Overview & Schedule — 50-day burn-down chart
2. Work Breakdown Structure (WBS) — 4 phases, 12 work packages
3. Deliverables D1–D8 — gate management with acceptance certificates
4. Payment Milestones — ZMW 500,000 tranche register
5. External Interfaces — PASTEL / SAPP / GIS integration monitoring
6. Public Consultation — Notice-and-Comment portal
7. Communication Matrix — contact registry + escalation engine
8. Meetings & Actions — minutes repository and action log
9. Decisions & Escalation — CCB register with 4-level hierarchy
10. KPIs & Health — TECH-4 compliance scorecard
11. Formal PIP Document — 18-section contract documentation

## Running Locally

**Prerequisites:** Node.js 20 or higher

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev
```

Open http://localhost:3000/ in your browser.

## Production Build

```bash
npm run build
```

The output is generated in the `dist/` directory, ready for static hosting.

## Deployment

This application is deployed as a static site on Render at:
**https://esapp-mis-plan.onrender.com**

## Contract Governance

- **JCCC Secretariat:** jccc.esapp@moa.gov.zm
- **Golden Rule:** Any verbal decision must be confirmed by email or meeting minutes within 24 hours.
- **Escalation:** 4-level hierarchy (24h / 48h / 72h / 120h).

## License

Educational coursework — University of Zambia, Department of Computer Science (2026).
