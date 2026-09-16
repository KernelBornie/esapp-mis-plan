import React, { useState } from 'react';
import {
  FileText,
  Download,
  Search,
  MessageSquare,
  AlertCircle,
  Calendar,
  Building2,
  CheckCircle2,
  ExternalLink,
  X,
  ShieldCheck,
  TrendingUp,
  Clock,
  Send,
} from 'lucide-react';

// ============================================================
// TYPES
// ============================================================
export interface ConsultationDocument {
  id: string;
  title: string;
  type: 'Notice' | 'RIA' | 'Draft' | 'Annex';
  uploadedAt: string;
  sizeLabel: string;
  filename: string; // e.g., 'scci-seed-certification-2026-notice.pdf'
  mimeType: string; // e.g., 'application/pdf'
}

export interface ConsultationComment {
  id: number;
  submitter: string;
  organisation: string;
  text: string;
  submittedAt: string;
}

export interface Consultation {
  id: string;
  code: string;
  status: 'Ongoing' | 'Due Soon' | 'Trending' | 'Closed';
  agency: string;
  title: string;
  summary: string;
  riaFocus: string;
  sector: string;
  commentCount: number;
  windowStart: string;
  windowEnd: string;
  daysRemaining: number;
  documents: ConsultationDocument[];
  comments: ConsultationComment[];
}

interface PublicConsultationViewProps {
  consultations?: any;
  onAddComment?: (consultationId: any, comment: any) => void;
}

// ============================================================
// SEED DATA
// ============================================================
const INITIAL_CONSULTATIONS: Consultation[] = [
  {
    id: 'c1',
    code: 'CONS-2026-003',
    status: 'Ongoing',
    agency: 'Seed Control and Certification Institute (SCCI)',
    title: 'NATIONAL SEED AND PLANT VARIETIES CERTIFICATION REGULATIONS 2026',
    summary:
      'Comprehensive public consultation on upgraded seed testing standards, digital QR-code phytosanitary certification, and cross-border seed harmonization under SCCI oversight.',
    riaFocus:
      'Quantifies economic gains from digital QR verification in suppressing counterfeit seed distribution by 85%, accelerating field inspection sign-offs through E-SAPP MIS mobile apps.',
    sector: 'Agriculture',
    commentCount: 2,
    windowStart: '2026-09-01',
    windowEnd: '2026-09-30',
    daysRemaining: 14,
    documents: [
      {
        id: 'doc1',
        title: 'Official Consultation Call: Modernized Seed Certification 2026',
        type: 'Notice',
        uploadedAt: '2026-09-01',
        sizeLabel: '980 KB',
        filename: 'CONS-2026-003_Notice_Seed-Certification-2026.pdf',
        mimeType: 'application/pdf',
      },
      {
        id: 'doc2',
        title: 'RIA Study: Economic Impact of Digital Phytosanitary Certification',
        type: 'RIA',
        uploadedAt: '2026-09-02',
        sizeLabel: '4.1 MB',
        filename: 'CONS-2026-003_RIA_Digital-Phytosanitary-Certification.pdf',
        mimeType: 'application/pdf',
      },
      {
        id: 'doc3',
        title: 'Draft Statutory Instrument on Seed Testing Laboratories & Accredited Inspectors',
        type: 'Draft',
        uploadedAt: '2026-09-01',
        sizeLabel: '1.9 MB',
        filename: 'CONS-2026-003_Draft-SI-Seed-Testing-Labs.pdf',
        mimeType: 'application/pdf',
      },
    ],
    comments: [
      {
        id: 1,
        submitter: 'Mwamba Chileshe',
        organisation: 'Zambia National Farmers Union',
        text: 'The digital QR-code certification will significantly reduce counterfeit seed losses for our members. We recommend extending the pilot phase to all 10 provinces simultaneously.',
        submittedAt: '2026-09-05 10:24',
      },
      {
        id: 2,
        submitter: 'Dr. Grace Mwansa',
        organisation: 'University of Zambia — School of Agricultural Sciences',
        text: 'The RIA properly quantifies the economic upside but underweights the training cost for smallholder farmers who must use the new QR verification mobile app.',
        submittedAt: '2026-09-08 14:11',
      },
    ],
  },
  {
    id: 'c2',
    code: 'CONS-2026-002',
    status: 'Due Soon',
    agency: 'Ministry of Fisheries and Livestock',
    title: 'PROPOSED ANIMAL FEED QUALITY CONTROL REGULATIONS 2026',
    summary:
      'Public consultation on new quality standards for commercial animal feed production, labeling requirements, and enforcement mechanisms.',
    riaFocus: 'RIA evaluates cost impact on feed manufacturers and expected livestock productivity gains.',
    sector: 'Agriculture',
    commentCount: 3,
    windowStart: '2026-08-15',
    windowEnd: '2026-09-18',
    daysRemaining: 2,
    documents: [
      {
        id: 'doc4',
        title: 'Official Consultation Notice — Animal Feed Quality Control',
        type: 'Notice',
        uploadedAt: '2026-08-15',
        sizeLabel: '720 KB',
        filename: 'CONS-2026-002_Notice_Animal-Feed-Quality.pdf',
        mimeType: 'application/pdf',
      },
    ],
    comments: [],
  },
  {
    id: 'c3',
    code: 'CONS-2026-001',
    status: 'Closed',
    agency: 'Zambia Environmental Management Agency',
    title: 'PROPOSED ENVIRONMENTAL MANAGEMENT GENERAL REGULATIONS',
    summary:
      'Public consultation on proposed Environmental Management General Regulations covering agricultural runoff, effluent discharge, and environmental impact assessment thresholds.',
    riaFocus: 'RIA concluded. Final Regulations gazetted on 2026-04-15.',
    sector: 'Agriculture',
    commentCount: 7,
    windowStart: '2026-03-07',
    windowEnd: '2026-03-31',
    daysRemaining: 0,
    documents: [],
    comments: [],
  },
  {
    id: 'c4',
    code: 'CONS-2025-014',
    status: 'Closed',
    agency: 'Ministry of Agriculture',
    title: 'REGULATORY IMPACT ASSESSMENT ON TOBACCO REGULATIONS FOR THE TOBACCO ACT NO.10 OF 2022',
    summary:
      'Consultation on proposed tobacco regulations under the Tobacco Act No. 10 of 2022.',
    riaFocus: 'RIA concluded. Regulations adopted 2025-11-20.',
    sector: 'Agriculture, Forestry and Fishing',
    commentCount: 5,
    windowStart: '2023-01-25',
    windowEnd: '2023-02-28',
    daysRemaining: 0,
    documents: [],
    comments: [],
  },
  {
    id: 'c5',
    code: 'CONS-2025-011',
    status: 'Closed',
    agency: 'Zambia Compulsory Standards Agency',
    title: 'PROPOSED REVISION OF STATUTORY FEES FOR RADIATION SOURCES IN ZAMBIA',
    summary:
      'Consultation on revised statutory fees for radiation source registration and inspection.',
    riaFocus: 'RIA concluded.',
    sector: 'Mining and Quarrying',
    commentCount: 2,
    windowStart: '2024-06-10',
    windowEnd: '2024-06-30',
    daysRemaining: 0,
    documents: [],
    comments: [],
  },
];

// ============================================================
// DOWNLOAD UTILITY — generates a real, valid, downloadable file
// ============================================================
export function buildDocumentContent(consultation: Consultation, doc: ConsultationDocument): string {
  const divider = '='.repeat(78);
  const subdivider = '-'.repeat(78);

  return `${divider}
REPUBLIC OF ZAMBIA
MINISTRY OF AGRICULTURE (MoA)
BUSINESS REGULATORY REVIEW AGENCY (BRRA)
NOTICE-AND-COMMENT PORTAL
${divider}

DOCUMENT TYPE:       ${doc.type}
DOCUMENT TITLE:      ${doc.title}
CONSULTATION CODE:   ${consultation.code}
SPONSORING AGENCY:   ${consultation.agency}
SECTOR:              ${consultation.sector}
DATE UPLOADED:       ${doc.uploadedAt}
STATUTORY WINDOW:    ${consultation.windowStart} to ${consultation.windowEnd}
STATUS:              ${consultation.status}

${divider}
1. CONSULTATION OVERVIEW
${divider}

${consultation.title}

${consultation.summary}

${subdivider}
2. REGULATORY IMPACT ASSESSMENT (RIA) FOCUS
${subdivider}

${consultation.riaFocus}

${subdivider}
3. DOCUMENT METADATA
${subdivider}

This document is part of the public consultation record for ${consultation.code}.
It has been uploaded in accordance with the Business Regulatory Act No. 3 of 2014,
which mandates a minimum 14-day public notice period prior to enactment of any
proposed statutory instrument.

Total documents in this consultation: ${consultation.documents.length}
Public representations received to date: ${consultation.commentCount}

${subdivider}
4. HOW TO SUBMIT A REPRESENTATION
${subdivider}

1. Visit the Notice-and-Comment Portal.
2. Open consultation ${consultation.code}.
3. Click "Submit Comment" and complete the representation form.
4. All submissions received within the statutory window will be reviewed by
   the sponsoring agency and considered in the final Regulatory Impact Assessment.

${subdivider}
5. STATUTORY ACKNOWLEDGMENT
${subdivider}

This document was generated from the E-SAPP Web-Enabled Management Information
System (MIS) Notice-and-Comment Portal, jointly implemented by:

  - Consultant: UNZA Department of Computer Science
  - Client:     Ministry of Agriculture (MoA)

Contract Reference: MoA-UNZA-E-SAPP-2026
JCCC Secretariat:   jccc.esapp@moa.gov.zm

${divider}
END OF DOCUMENT
Document Reference: ${doc.filename}
Generated: ${new Date().toISOString()}
${divider}
`;
}

export function downloadDocument(consultation: Consultation, doc: ConsultationDocument): void {
  try {
    const content = buildDocumentContent(consultation, doc);
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = doc.filename.replace(/\.pdf$/, '.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Cleanup
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  } catch (err) {
    alert('Unable to download document. Please try again.');
    console.error('Download error:', err);
  }
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export const PublicConsultationView: React.FC<PublicConsultationViewProps> = () => {
  const [consultationsList, setConsultationsList] = useState<Consultation[]>(INITIAL_CONSULTATIONS);
  const [activeFilter, setActiveFilter] = useState<
    'All' | 'Ongoing' | 'Due Soon' | 'Trending' | 'Closed'
  >('All');
  const [selectedAgency, setSelectedAgency] = useState<string>('All');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [activeDetailTab, setActiveDetailTab] = useState<'overview' | 'ria' | 'docs' | 'comments' | 'submit'>(
    'overview'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentName, setCommentName] = useState('');
  const [commentOrg, setCommentOrg] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  const totalNotices = consultationsList.length;
  const activeWindows = consultationsList.filter(
    (c) => c.status === 'Ongoing' || c.status === 'Due Soon' || c.status === 'Trending'
  ).length;
  const closingSoon = consultationsList.filter((c) => c.status === 'Due Soon').length;
  const totalRepresentations = consultationsList.reduce((sum, c) => sum + c.commentCount, 0);

  // Derive unique agencies and sectors for filters
  const agencies = Array.from(new Set(consultationsList.map((c) => c.agency)));
  const sectors = Array.from(new Set(consultationsList.map((c) => c.sector)));

  const filtered = consultationsList
    .filter((c) => {
      if (activeFilter === 'All') return true;
      if (activeFilter === 'Ongoing') return c.status === 'Ongoing';
      if (activeFilter === 'Due Soon') return c.status === 'Due Soon';
      if (activeFilter === 'Trending') return c.status === 'Trending';
      if (activeFilter === 'Closed') return c.status === 'Closed';
      return true;
    })
    .filter((c) => {
      if (selectedAgency === 'All') return true;
      return c.agency === selectedAgency;
    })
    .filter((c) => {
      if (selectedSector === 'All') return true;
      return c.sector === selectedSector;
    })
    .filter((c) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.agency.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q)
      );
    });

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim() || !selectedConsultation) return;

    const newComment: ConsultationComment = {
      id: Date.now(),
      submitter: commentName.trim(),
      organisation: commentOrg.trim() || 'Citizen / Agribusiness Stakeholder',
      text: commentText.trim(),
      submittedAt: new Date().toISOString().substring(0, 16).replace('T', ' '),
    };

    setConsultationsList((prev) =>
      prev.map((item) => {
        if (item.id === selectedConsultation.id) {
          return {
            ...item,
            commentCount: item.commentCount + 1,
            comments: [newComment, ...item.comments],
          };
        }
        return item;
      })
    );

    setSelectedConsultation((prev) =>
      prev
        ? {
            ...prev,
            commentCount: prev.commentCount + 1,
            comments: [newComment, ...prev.comments],
          }
        : null
    );

    setCommentSubmitted(true);
    setTimeout(() => {
      setCommentSubmitted(false);
      setCommentText('');
      setCommentName('');
      setCommentOrg('');
      setActiveDetailTab('comments');
    }, 2500);
  };

  // ============================================================
  // DETAIL VIEW
  // ============================================================
  if (selectedConsultation) {
    const c = selectedConsultation;
    return (
      <div className="space-y-6">
        {/* Breadcrumb / Back */}
        <button
          onClick={() => {
            setSelectedConsultation(null);
            setActiveDetailTab('overview');
          }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 cursor-pointer"
        >
          &larr; Back to consultation list
        </button>

        {/* Header Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded">
              {c.code}
            </span>
            <span
              className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border ${
                c.status === 'Ongoing'
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                  : c.status === 'Due Soon'
                  ? 'bg-amber-100 text-amber-800 border-amber-200'
                  : c.status === 'Trending'
                  ? 'bg-red-100 text-red-800 border-red-200'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {c.status}
            </span>
            <span className="text-[11px] text-slate-500 font-medium">{c.agency}</span>
          </div>

          <h2 className="text-xl font-bold text-slate-900">{c.title}</h2>
          <p className="text-xs text-slate-500 mt-1.5">
            Sector: <strong className="text-slate-700">{c.sector}</strong> &bull; Comments:{' '}
            <strong className="text-slate-700">{c.commentCount}</strong>
          </p>

          {/* Tabs */}
          <div className="mt-5 border-b border-slate-200 flex gap-1 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview & Purpose' },
              { id: 'ria', label: 'Regulatory Impact Assessment (RIA)' },
              { id: 'docs', label: `Documents (${c.documents.length})` },
              { id: 'comments', label: `Public Comments (${c.comments.length})` },
              { id: 'submit', label: 'Submit Representation' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveDetailTab(t.id as any)}
                className={`whitespace-nowrap text-xs font-bold px-3.5 py-2.5 border-b-2 transition-colors cursor-pointer ${
                  activeDetailTab === t.id
                    ? 'border-emerald-700 text-emerald-800'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* ==================== OVERVIEW TAB ==================== */}
        {activeDetailTab === 'overview' && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Overview &amp; Purpose</h3>
            <p className="text-sm text-slate-700 leading-relaxed">{c.summary}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100">
              <div className="bg-slate-50 rounded-lg p-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Statutory Window
                </div>
                <div className="text-sm font-semibold text-slate-800 mt-1">
                  {c.windowStart} &rarr; {c.windowEnd}
                </div>
                {c.daysRemaining > 0 && (
                  <div className="text-xs text-emerald-700 font-medium mt-0.5">
                    {c.daysRemaining} days remaining to comment
                  </div>
                )}
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Sponsoring Agency
                </div>
                <div className="text-sm font-semibold text-slate-800 mt-1">{c.agency}</div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== RIA TAB ==================== */}
        {activeDetailTab === 'ria' && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Regulatory Impact Assessment (RIA)
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">{c.riaFocus}</p>
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-lg p-4 text-xs text-emerald-900">
              <strong>Statutory basis:</strong> This RIA has been prepared in accordance with the
              Business Regulatory Act No. 3 of 2014, which mandates that all proposed regulations
              undergo economic impact assessment and a minimum 14-day public comment period before
              enactment.
            </div>
          </div>
        )}

        {/* ==================== DOCUMENTS TAB ==================== */}
        {activeDetailTab === 'docs' && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Official statutory documents available for review
              </h3>
              <span className="text-xs font-semibold text-slate-500">
                {c.documents.length} Files
              </span>
            </div>

            {c.documents.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-sm">
                No statutory documents currently uploaded for this consultation.
              </div>
            ) : (
              <div className="space-y-3">
                {c.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="border border-slate-200 rounded-lg p-4 bg-slate-50/40 hover:bg-slate-50 transition-colors flex flex-wrap items-start justify-between gap-3"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-slate-900">{doc.title}</div>
                        <div className="flex flex-wrap items-center gap-3 mt-1 text-[11px] text-slate-500">
                          <span className="font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                            {doc.type}
                          </span>
                          <span>Uploaded: {doc.uploadedAt}</span>
                          <span>Size: {doc.sizeLabel}</span>
                          <span className="font-mono text-[10px] text-slate-400">{doc.filename}</span>
                        </div>
                      </div>
                    </div>

                    {/* ============ FIXED DOWNLOAD BUTTON ============ */}
                    <button
                      type="button"
                      onClick={() => downloadDocument(c, doc)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-lg cursor-pointer shadow-2xs transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-5 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-800">Note on statutory documents:</strong> These
              representations are generated from the E-SAPP MIS Notice-and-Comment Portal. In
              production, files stream directly from the MoA Government Document Repository
              (GDR). The download produces a text representation containing all metadata,
              consultation window, RIA focus, and submission instructions for archival or audit
              purposes.
            </div>
          </div>
        )}

        {/* ==================== COMMENTS TAB ==================== */}
        {activeDetailTab === 'comments' && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Public Comments ({c.comments.length})
            </h3>

            {c.comments.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-sm">
                <MessageSquare className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                No public comments submitted yet.
              </div>
            ) : (
              <div className="space-y-3">
                {c.comments.map((cm) => (
                  <div key={cm.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50/40">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div>
                        <div className="text-sm font-bold text-slate-900">{cm.submitter}</div>
                        <div className="text-[11px] text-slate-500">{cm.organisation}</div>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">{cm.submittedAt}</div>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">{cm.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==================== SUBMIT REPRESENTATION TAB ==================== */}
        {activeDetailTab === 'submit' && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Submit Formal Representation
            </h3>
            <p className="text-xs text-slate-500">
              Your representation will be recorded against consultation {c.code} and forwarded
              to {c.agency} for consideration.
            </p>

            {commentSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-emerald-900">Representation recorded.</div>
                  <div className="text-xs text-emerald-700 mt-0.5">
                    Reference number: REP-{c.code}-{Date.now().toString().slice(-6)}
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitComment} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Organisation / Affiliation
                    </label>
                    <input
                      type="text"
                      value={commentOrg}
                      onChange={(e) => setCommentOrg(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Your Representation *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Provide your detailed comments, objections, or recommendations on the proposed regulation..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg cursor-pointer shadow-2xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Submit Representation
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    );
  }

  // ============================================================
  // LIST VIEW
  // ============================================================
  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 text-white rounded-xl p-6 shadow-lg">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-200/80">
              Republic of Zambia &bull; Ministry of Agriculture (MoA) &bull; Business Regulatory Act No. 3 of 2014
            </div>
            <h1 className="text-2xl font-extrabold mt-2">Notice-and-Comment Portal</h1>
            <p className="text-sm text-emerald-100/90 mt-2 leading-relaxed">
              In alignment with the Business Regulatory Review Agency (BRRA) statutory standard,
              this portal empowers farmers, agribusinesses, researchers, and civil society to
              scrutinize proposed agricultural policies, regulations, and Regulatory Impact
              Assessments (RIA) prior to enactment.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span className="bg-amber-400/20 border border-amber-300/40 text-amber-100 text-[11px] font-bold px-2.5 py-1 rounded-full">
                Statutory Consultation Rule: Minimum 14-Day Notice
              </span>
              <span className="bg-white/10 border border-white/20 text-emerald-100 text-[11px] font-medium px-2.5 py-1 rounded-full">
                Cross-posted to MoA Official Facebook (97K Followers)
              </span>
            </div>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          {[
            { label: 'Total Notices', value: totalNotices },
            { label: 'Active Windows', value: activeWindows },
            { label: 'Closing Soon', value: closingSoon },
            { label: 'Representations', value: totalRepresentations },
          ].map((m) => (
            <div key={m.label} className="bg-white/10 backdrop-blur rounded-lg p-3 border border-white/15">
              <div className="text-[10px] uppercase tracking-wider text-emerald-200">{m.label}</div>
              <div className="text-xl font-bold text-white mt-0.5">{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by keyword, SI number, title..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-3 py-2 text-xs focus:bg-white focus:border-emerald-600 focus:outline-hidden"
          />
        </div>

        <select
          value={selectedAgency}
          onChange={(e) => setSelectedAgency(e.target.value)}
          className="text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-hidden"
        >
          <option value="All">All Sponsoring Agencies</option>
          {agencies.map((agency) => (
            <option key={agency} value={agency}>
              {agency}
            </option>
          ))}
        </select>

        <select
          value={selectedSector}
          onChange={(e) => setSelectedSector(e.target.value)}
          className="text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-hidden"
        >
          <option value="All">All Industries</option>
          {sectors.map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </select>

        <select
          value={activeFilter}
          onChange={(e) => setActiveFilter(e.target.value as any)}
          className="text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-hidden"
        >
          <option value="All">All Statuses</option>
          <option value="Ongoing">Ongoing (Open for comment)</option>
          <option value="Due Soon">Due Soon (&le; 3 Days)</option>
          <option value="Trending">Trending</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {/* Quick filter pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-500 mr-1">Quick Filter:</span>
        {(['All', 'Ongoing', 'Due Soon', 'Trending', 'Closed'] as const).map((f) => {
          const count =
            f === 'All'
              ? consultationsList.length
              : f === 'Ongoing'
              ? consultationsList.filter((c) => c.status === 'Ongoing').length
              : f === 'Due Soon'
              ? consultationsList.filter((c) => c.status === 'Due Soon').length
              : f === 'Trending'
              ? consultationsList.filter((c) => c.status === 'Trending').length
              : consultationsList.filter((c) => c.status === 'Closed').length;
          return (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
                activeFilter === f
                  ? 'bg-emerald-700 text-white border-emerald-700'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {f} ({count})
            </button>
          );
        })}
      </div>

      {/* Consultation list */}
      <div className="space-y-4">
        <div className="text-xs text-slate-500 font-medium">
          Showing {filtered.length} of {consultationsList.length} consultations
        </div>

        {filtered.map((c) => (
          <div
            key={c.id}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs hover:border-slate-300 transition-colors"
          >
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                {c.code}
              </span>
              <span
                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                  c.status === 'Ongoing'
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                    : c.status === 'Due Soon'
                    ? 'bg-amber-100 text-amber-800 border-amber-200'
                    : c.status === 'Trending'
                    ? 'bg-red-100 text-red-800 border-red-200'
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {c.status}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">{c.agency}</span>
            </div>

            <h3 className="text-base font-bold text-slate-900">{c.title}</h3>
            <div className="flex flex-wrap items-center gap-3 mt-1 text-[11px] text-slate-500">
              <span>{c.commentCount} Comments</span>
              <span>&bull;</span>
              <span>Sector: {c.sector}</span>
              {c.documents.length > 0 && (
                <>
                  <span>&bull;</span>
                  <span className="font-semibold text-emerald-700">
                    {c.documents.length} Downloadable {c.documents.length === 1 ? 'Document' : 'Documents'}
                  </span>
                </>
              )}
            </div>

            <p className="text-xs text-slate-600 mt-2 leading-relaxed">{c.summary}</p>

            {c.riaFocus && (
              <div className="mt-3 bg-slate-50 rounded-lg p-3 text-[11px] text-slate-600 border border-slate-100">
                <strong className="text-slate-700">Regulatory Impact Assessment (RIA) Focus:</strong>{' '}
                {c.riaFocus}
              </div>
            )}

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <div className="text-[11px] text-slate-500">
                <strong>Notice Window:</strong> {c.windowStart} to {c.windowEnd}
                {c.daysRemaining > 0 && (
                  <span className="text-emerald-700 font-semibold ml-2">
                    {c.daysRemaining} days remaining to comment
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {c.documents.length > 0 && (
                  <button
                    onClick={() => {
                      setSelectedConsultation(c);
                      setActiveDetailTab('docs');
                    }}
                    className="text-xs font-bold text-emerald-800 hover:text-emerald-900 bg-emerald-100/70 hover:bg-emerald-100 border border-emerald-300 px-3 py-1.5 rounded-lg cursor-pointer flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-700" />
                    Documents ({c.documents.length})
                  </button>
                )}
                <button
                  onClick={() => {
                    setSelectedConsultation(c);
                    setActiveDetailTab('overview');
                  }}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg cursor-pointer"
                >
                  View RIA &amp; Details
                </button>
                <button
                  onClick={() => {
                    setSelectedConsultation(c);
                    setActiveDetailTab('submit');
                  }}
                  className="text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 rounded-lg cursor-pointer"
                >
                  Submit Comment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
