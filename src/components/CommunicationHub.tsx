import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Layers, 
  Plus, 
  Calendar, 
  AlertCircle, 
  FileText,
  FolderOpen,
  MessageSquare,
  Clock,
  X,
  GraduationCap,
  Database,
  Copy,
  Check,
  Award
} from 'lucide-react';
import { Contact, CommunicationMatrixItem, EscalationLevelRule, InterfaceType, OrganisationType } from '../types';
import { GROUP_MEMBERS, GROUP_MEETING_PROTOCOLS, SQL_TEAM_ASSIGNMENT_SEED, GOLDEN_RULE_TEXT } from '../data/groupTeamData';

interface CommunicationHubProps {
  contacts: Contact[];
  commMatrix: CommunicationMatrixItem[];
  escalationRules: EscalationLevelRule[];
  onAddContact: (contact: Omit<Contact, 'id'>) => void;
}

export const CommunicationHub: React.FC<CommunicationHubProps> = ({
  contacts,
  commMatrix,
  escalationRules,
  onAddContact,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'contacts' | 'team' | 'matrix' | 'channels' | 'escalation'>('contacts');
  const [searchContact, setSearchContact] = useState<string>('');
  const [selectedOrg, setSelectedOrg] = useState<string>('all');
  const [selectedInterface, setSelectedInterface] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [sqlCopied, setSqlCopied] = useState<boolean>(false);

  // Form state for new contact
  const [newFullName, setNewFullName] = useState('');
  const [newOrg, setNewOrg] = useState<OrganisationType>('MoA');
  const [newRoleTitle, setNewRoleTitle] = useState('');
  const [newInterfaceType, setNewInterfaceType] = useState<InterfaceType>('Functional');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newAuthority, setNewAuthority] = useState<'Operational' | 'Technical' | 'Approver' | 'Steering'>('Operational');
  const [newResp, setNewResp] = useState('');

  const filteredContacts = contacts.filter((c) => {
    if (selectedOrg !== 'all' && c.organisation !== selectedOrg) return false;
    if (selectedInterface !== 'all' && c.interfaceType !== selectedInterface) return false;
    if (searchContact.trim() !== '') {
      const q = searchContact.toLowerCase();
      const matchName = c.fullName.toLowerCase().includes(q);
      const matchRole = c.roleTitle.toLowerCase().includes(q);
      const matchEmail = c.email.toLowerCase().includes(q);
      const matchResp = c.responsibilities.toLowerCase().includes(q);
      if (!matchName && !matchRole && !matchEmail && !matchResp) return false;
    }
    return true;
  });

  const handleCreateContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newEmail) return;
    onAddContact({
      fullName: newFullName,
      organisation: newOrg,
      roleTitle: newRoleTitle,
      interfaceType: newInterfaceType,
      email: newEmail,
      phone: newPhone,
      authorityLevel: newAuthority,
      responsibilities: newResp,
      isActive: true,
    });
    setIsAddModalOpen(false);
    // Reset
    setNewFullName('');
    setNewRoleTitle('');
    setNewEmail('');
    setNewPhone('');
    setNewResp('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
              <Users className="w-4 h-4" /> Customer Communication & Interface Channels
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              Governance, Contact Matrix & Official Channel Directory
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Implements Step 1 through Step 6 of the contractual communication framework. Establishes named counterpart interfaces between UNZA, the Ministry of Agriculture, and external system custodians (PASTEL & SAPP register).
            </p>
          </div>

          {/* Sub Navigation Buttons */}
          <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-lg self-start md:self-center shrink-0">
            <button
              onClick={() => setActiveSubTab('contacts')}
              className={`text-xs font-bold px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeSubTab === 'contacts' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Contact Matrix ({contacts.length})
            </button>
            <button
              onClick={() => setActiveSubTab('team')}
              className={`text-xs font-bold px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeSubTab === 'team' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
              UNZA Team (3)
            </button>
            <button
              onClick={() => setActiveSubTab('matrix')}
              className={`text-xs font-bold px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeSubTab === 'matrix' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Communication Matrix
            </button>
            <button
              onClick={() => setActiveSubTab('channels')}
              className={`text-xs font-bold px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeSubTab === 'channels' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Official Channels &amp; Rules
            </button>
            <button
              onClick={() => setActiveSubTab('escalation')}
              className={`text-xs font-bold px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeSubTab === 'escalation' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Escalation Engine
            </button>
          </div>
        </div>
      </div>

      {/* Subtab 1: Contact Matrix */}
      {activeSubTab === 'contacts' && (
        <div className="space-y-4">
          {/* Golden Rule Callout Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 shadow-2xs">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-amber-900 uppercase tracking-wider">Contractual Golden Rule:</span>
              <p className="text-amber-800 mt-0.5 font-medium leading-relaxed">
                "{GOLDEN_RULE_TEXT}"
              </p>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search name, role, email..."
                  value={searchContact}
                  onChange={(e) => setSearchContact(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-emerald-600 focus:bg-white w-56"
                />
              </div>

              {/* Org filter */}
              <div className="flex items-center gap-1 text-xs">
                <span className="font-semibold text-slate-500">Org:</span>
                <select
                  value={selectedOrg}
                  onChange={(e) => setSelectedOrg(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-hidden focus:border-emerald-600"
                >
                  <option value="all">All Orgs</option>
                  <option value="MoA">Ministry of Agriculture (MoA)</option>
                  <option value="Consultant">UNZA Consultant</option>
                  <option value="External">External System Owners</option>
                </select>
              </div>

              {/* Interface Filter */}
              <div className="flex items-center gap-1 text-xs">
                <span className="font-semibold text-slate-500">Interface:</span>
                <select
                  value={selectedInterface}
                  onChange={(e) => setSelectedInterface(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-hidden focus:border-emerald-600"
                >
                  <option value="all">All Interfaces</option>
                  <option value="Contractual">Contractual</option>
                  <option value="Technical">Technical</option>
                  <option value="Functional">Functional</option>
                  <option value="DataIntegration">Data Integration</option>
                  <option value="Testing">Testing</option>
                  <option value="Training">Training</option>
                  <option value="Support">Support</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-lg transition-colors cursor-pointer shadow-2xs self-start md:self-auto"
            >
              <Plus className="w-3.5 h-3.5" /> Add Contact Point
            </button>
          </div>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredContacts.map((c) => (
              <div 
                key={c.id} 
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs hover:border-slate-300 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        c.organisation === 'MoA'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : c.organisation === 'Consultant'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        {c.organisation}
                      </span>
                      {c.studentId && (
                        <span className="text-[10px] font-mono font-bold bg-purple-100 text-purple-800 border border-purple-200 px-2 py-0.5 rounded-full">
                          ID: {c.studentId}
                        </span>
                      )}
                      {c.cluster && (
                        <span className="text-[10px] font-medium bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200">
                          {c.cluster}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mt-1.5">
                      {c.fullName}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">{c.roleTitle}</p>
                  </div>

                  <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded shrink-0">
                    {c.interfaceType}
                  </span>
                </div>

                {c.contractRoles && c.contractRoles.length > 0 && (
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 space-y-1">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                      Consolidated Contract Roles ({c.contractRoles.length}):
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {c.contractRoles.map((role, idx) => (
                        <span key={idx} className="text-[10px] font-medium bg-white text-slate-700 px-1.5 py-0.5 rounded border border-slate-200">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  {c.responsibilities}
                </p>

                <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <a href={`mailto:${c.email}`} className="hover:text-emerald-700 truncate font-mono text-[11px]">
                      {c.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>{c.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Authority: <strong>{c.authorityLevel}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab: UNZA Student Group Team Portfolio */}
      {activeSubTab === 'team' && (
        <div className="space-y-6">
          {/* Golden Rule Callout Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 shadow-2xs">
            <div className="flex items-start gap-3.5">
              <div className="p-2 bg-amber-100 rounded-lg text-amber-800 shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Contractual Golden Rule
                </div>
                <p className="text-xs text-amber-950 font-semibold mt-1 leading-relaxed">
                  "{GOLDEN_RULE_TEXT}"
                </p>
                <div className="text-[11px] text-amber-800 mt-1">
                  Enforced across all 3 group portfolios: Ruth Kamwendo (Governance &amp; Lead), Bwalya Mumba (Technical &amp; Architecture), and Bornface Kangombe (Data &amp; GIS).
                </div>
              </div>
            </div>
          </div>

          {/* Team Portfolio Summary Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {GROUP_MEMBERS.map((member) => (
              <div 
                key={member.studentId} 
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all"
              >
                <div className="space-y-3">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold bg-purple-100 text-purple-800 border border-purple-200 px-2 py-0.5 rounded-full">
                          ID: {member.studentId}
                        </span>
                        <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
                          {member.cluster}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mt-1.5">
                        {member.studentName}
                      </h3>
                      <p className="text-xs font-semibold text-emerald-700">{member.primaryPortfolio}</p>
                    </div>

                    <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded shrink-0">
                      {member.authority}
                    </span>
                  </div>

                  {/* Portfolio Financial & Milestone Weight */}
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase font-semibold">Deliverable Share</span>
                      <span className="text-sm font-bold text-slate-800">{member.portfolioPercentage}% of Contract</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase font-semibold">Value Certifiable</span>
                      <span className="text-sm font-bold text-emerald-700">ZMW {member.portfolioValueZMW.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Consolidated Contract Roles */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Contract Roles Consolidated ({member.contractRoles.length}):
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {member.contractRoles.map((r, i) => (
                        <span key={i} className="text-[11px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200 font-medium">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Replaces Original Staff */}
                  <div className="text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-600">Replaces Original Proposal Roles:</span>{' '}
                    <span>{member.replacesOriginals && member.replacesOriginals.length > 0 ? member.replacesOriginals.join(', ') : 'Direct Group 6 Appointment'}</span>
                  </div>

                  {/* Deliverables Owned vs Supported */}
                  <div className="space-y-1 text-xs">
                    <div className="flex items-start gap-1">
                      <span className="font-semibold text-slate-700 shrink-0">Owned Gates:</span>
                      <div className="flex flex-wrap gap-1">
                        {(member.ownedDeliverables || []).length > 0 ? (
                          member.ownedDeliverables.map((d, i) => (
                            <span key={i} className="font-bold text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                              {d}
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-400 italic text-[11px]">All-Phase Integration Support</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-start gap-1">
                      <span className="font-semibold text-slate-700 shrink-0">Supported:</span>
                      <span className="text-slate-600 text-[11px]">{(member.supportedDeliverables || []).join(', ') || 'General Project Support'}</span>
                    </div>
                  </div>

                  {/* Key Responsibilities */}
                  <div className="space-y-1 border-t border-slate-100 pt-2 text-xs">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Key Responsibilities:</span>
                    <ul className="space-y-1 text-[11px] text-slate-600">
                      {member.responsibilities.slice(0, 4).map((resp, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span><strong className="text-slate-700">{resp.area}:</strong> {resp.responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer: Contacts & Key Interface Counterpart */}
                <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <a href={`mailto:${member.email}`} className="text-emerald-700 font-mono text-[11px] hover:underline">
                      {member.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 pt-1">
                    <strong>MoA Counterpart:</strong> {member.keyInterfacePartners.moa}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Group Meeting Protocols Section */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-700" />
                  UNZA Group Meeting Protocols &amp; Cadence
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Internal and client-facing synchronizations maintaining the 50-day burn-down and 24-hour minute confirmation.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-y border-slate-200 text-slate-700 font-semibold">
                    <th className="py-2.5 px-3">Meeting Event</th>
                    <th className="py-2.5 px-3">Frequency &amp; Cadence</th>
                    <th className="py-2.5 px-3">Lead Responsible</th>
                    <th className="py-2.5 px-3">Contractual Output</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {GROUP_MEETING_PROTOCOLS.map((m, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3 font-bold text-slate-900">{m.event}</td>
                      <td className="py-2.5 px-3 text-slate-700">{m.frequency}</td>
                      <td className="py-2.5 px-3 font-medium text-emerald-800">{m.lead}</td>
                      <td className="py-2.5 px-3 text-slate-800 font-semibold">{m.output}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Database Schema & SQL Seed Section */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-700" />
                  SQL Database Seed: Team Role Assignments
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  PostgreSQL / MySQL table definition and seed records for team members, portfolios, and deliverable associations.
                </p>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(SQL_TEAM_ASSIGNMENT_SEED);
                  setSqlCopied(true);
                  setTimeout(() => setSqlCopied(false), 2000);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer shadow-2xs"
              >
                {sqlCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    Copy SQL Seed
                  </>
                )}
              </button>
            </div>

            <div className="relative">
              <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto max-h-72 leading-relaxed border border-slate-800">
                <code>{SQL_TEAM_ASSIGNMENT_SEED}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 2: Communication Matrix */}
      {activeSubTab === 'matrix' && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
          <div className="p-5 border-b border-slate-200 bg-slate-50/50">
            <h3 className="text-base font-bold text-slate-900">Communication Matrix (TECH-4 Expanded)</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Defines official event frequencies, participating roles, delivery channels, response SLAs, and required outputs.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold text-[11px]">
                  <th className="p-3.5">Event / Communication</th>
                  <th className="p-3.5">From &rarr; To</th>
                  <th className="p-3.5">Channel</th>
                  <th className="p-3.5">Frequency</th>
                  <th className="p-3.5">Response SLA</th>
                  <th className="p-3.5">Output Document</th>
                  <th className="p-3.5">TECH-4 Basis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {commMatrix.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70">
                    <td className="p-3.5 font-bold text-slate-900">
                      {item.eventName}
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-800">{item.fromRole}</div>
                      <div className="text-[11px] text-slate-500">&darr; {item.toRole}</div>
                    </td>
                    <td className="p-3.5 font-medium">{item.channel}</td>
                    <td className="p-3.5">
                      <span className="bg-slate-100 px-2 py-0.5 rounded font-semibold text-[11px] text-slate-800">
                        {item.frequency}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="text-emerald-700 font-bold">{item.responseHours} Hours</span>
                    </td>
                    <td className="p-3.5 font-medium text-slate-800">
                      {item.outputDocument}
                    </td>
                    <td className="p-3.5 text-[11px] text-slate-500 max-w-xs">
                      {item.tech4Reference}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Subtab 3: Official Channels & Rules */}
      {activeSubTab === 'channels' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Card: 7 Official Channels */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-700" /> Agreed Official Channels Only
              </h3>
              <p className="text-xs text-slate-500">
                Informal or unrecorded discussions are strictly prohibited from overriding contractual terms.
              </p>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                  <div className="font-bold text-slate-800 flex items-center justify-between">
                    <span>1. Official Project Email</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">Primary Formal</span>
                  </div>
                  <p className="text-slate-600">Used for formal letters, deliverable submissions, change requests, and approvals. Must copy MoA & UNZA Communication Coordinators.</p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                  <div className="font-bold text-slate-800 flex items-center justify-between">
                    <span>2. Shared Cloud Drive (10 Folder Architecture)</span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-semibold">Repository</span>
                  </div>
                  <p className="text-slate-600">01_Contracts, 02_Plans, 03_Requirements, 04_Design, 05_Development, 06_Testing, 07_Deployment, 08_Training, 09_Support, 10_Communication.</p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                  <div className="font-bold text-slate-800 flex items-center justify-between">
                    <span>3. Project Portal / Trello Task Board</span>
                    <span className="text-[10px] bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-semibold">Operational</span>
                  </div>
                  <p className="text-slate-600">Used for daily stand-up tasks, 3-day team leader horizon checks, and transparent sprint progress updates.</p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                  <div className="font-bold text-slate-800 flex items-center justify-between">
                    <span>4. Video Conferencing (Microsoft Teams)</span>
                    <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-semibold">Meetings</span>
                  </div>
                  <p className="text-slate-600">Weekly client check-ins, technical design walkthroughs, and defect reviews. Minutes mandatory within 24 hours.</p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                  <div className="font-bold text-slate-800 flex items-center justify-between">
                    <span>5. Phone / Instant Messaging</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-semibold">Urgent Only</span>
                  </div>
                  <p className="text-slate-600">Strictly for urgent operational alerts. Must be followed up with formal email or minutes within 24 hours.</p>
                </div>
              </div>
            </div>

            {/* Right Card: Documentation Rules & Response Commitments */}
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-700" /> Contract Response Time Commitments
                </h3>
                <div className="divide-y divide-slate-100 text-xs">
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="font-medium text-slate-700">Urgent operational blocker</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">4 Working Hours</span>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="font-medium text-slate-700">Technical query (Database/API)</span>
                    <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">1 Working Day (24h)</span>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="font-medium text-slate-700">Deliverable Approval Request</span>
                    <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">3 Working Days (72h)</span>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="font-medium text-slate-700">Change Request Impact Analysis</span>
                    <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">5 Working Days (120h)</span>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="font-medium text-slate-700">Formal Complaint / Escalation Acknowledgment</span>
                    <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">24 Hours</span>
                  </div>
                </div>
              </div>

              {/* Shared Folder Visual Directory */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-3">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FolderOpen className="w-4 h-4 text-emerald-700" /> Mandatory 10-Folder Repository Structure
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-700">
                  <div className="bg-slate-50 p-2 rounded border border-slate-100">01_Contracts</div>
                  <div className="bg-slate-50 p-2 rounded border border-slate-100">02_Plans_and_PIP</div>
                  <div className="bg-slate-50 p-2 rounded border border-slate-100">03_Requirements_SRS</div>
                  <div className="bg-slate-50 p-2 rounded border border-slate-100">04_Design_SDD</div>
                  <div className="bg-slate-50 p-2 rounded border border-slate-100">05_Development_Code</div>
                  <div className="bg-slate-50 p-2 rounded border border-slate-100">06_Testing_UAT</div>
                  <div className="bg-slate-50 p-2 rounded border border-slate-100">07_Deployment_GDC</div>
                  <div className="bg-slate-50 p-2 rounded border border-slate-100">08_Training_Manuals</div>
                  <div className="bg-slate-50 p-2 rounded border border-slate-100">09_Support_SLA</div>
                  <div className="bg-slate-50 p-2 rounded border border-slate-100">10_Communication_JCCC</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 4: Escalation Engine Rules */}
      {activeSubTab === 'escalation' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
            <h3 className="text-base font-bold text-slate-900">4-Level Escalation Hierarchy & Protocols</h3>
            <p className="text-xs text-slate-500 mt-1">
              Guarantees rapid issue resolution so technical or operational bottlenecks never jeopardize the 50-day project schedule.
            </p>

            <div className="mt-6 space-y-4">
              {escalationRules.map((rule) => (
                <div key={rule.level} className="border border-slate-200 rounded-xl p-5 bg-slate-50/50 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                        {rule.level}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">{rule.title}</h4>
                    </div>

                    <div className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full self-start sm:self-auto">
                      Response SLA: {rule.responseTime}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
                    <div>
                      <span className="font-semibold text-slate-700">Key Counterparts:</span>
                      <p className="text-slate-600 mt-0.5">{rule.counterparts}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700">Trigger Issue Types:</span>
                      <p className="text-slate-600 mt-0.5">{rule.issueTypes}</p>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-700 mt-2">
                    <span className="font-bold text-slate-800">Operational Protocol:</span> {rule.protocol}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Contact Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900">Appoint Named Contact Point</h3>
            <p className="text-xs text-slate-500 mt-1">
              Add a verified counterpart for the Contact Matrix and JCCC communication structure.
            </p>

            <form onSubmit={handleCreateContact} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name & Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Jane Mwila"
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Organisation</label>
                  <select
                    value={newOrg}
                    onChange={(e) => setNewOrg(e.target.value as OrganisationType)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                  >
                    <option value="MoA">Ministry of Agriculture (MoA)</option>
                    <option value="Consultant">Consultant (UNZA)</option>
                    <option value="External">External System Owner</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Interface Type</label>
                  <select
                    value={newInterfaceType}
                    onChange={(e) => setNewInterfaceType(e.target.value as InterfaceType)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                  >
                    <option value="Contractual">Contractual</option>
                    <option value="Technical">Technical</option>
                    <option value="Functional">Functional</option>
                    <option value="DataIntegration">Data Integration</option>
                    <option value="Testing">Testing</option>
                    <option value="Training">Training</option>
                    <option value="Support">Support</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Role Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Database Administrator"
                  value={newRoleTitle}
                  onChange={(e) => setNewRoleTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Official Email</label>
                  <input
                    type="email"
                    required
                    placeholder="name@moa.gov.zm"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+260 977 000000"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Authority Level</label>
                <select
                  value={newAuthority}
                  onChange={(e) => setNewAuthority(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                >
                  <option value="Operational">Operational (Daily tasks)</option>
                  <option value="Technical">Technical (Architecture & schemas)</option>
                  <option value="Approver">Approver (Deliverables sign-off)</option>
                  <option value="Steering">Steering (Executive oversight)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Key Responsibilities</label>
                <textarea
                  rows={2}
                  placeholder="Primary interfaces, approval scope, and coordination duty..."
                  value={newResp}
                  onChange={(e) => setNewResp(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold cursor-pointer"
                >
                  Save to Contact Matrix
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
