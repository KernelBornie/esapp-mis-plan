import React, { useState } from 'react';
import {
  Clock, Calendar, CheckCircle2, AlertCircle, Plus, User, FileText,
  Check, X, ChevronRight, Filter, Search, TrendingUp, Users,
  Building2, MapPin, Target, AlertTriangle, Download, Eye, Edit3,
  Send, ShieldCheck, MessageSquare, ClipboardList,
} from 'lucide-react';
import { ActionItem, Contact, Meeting } from '../types';

interface MeetingsActionsViewProps {
  meetings: Meeting[];
  actions: ActionItem[];
  contacts: Contact[];
  onAddMeeting: (meeting: Omit<Meeting, 'id' | 'actionItemIds'>, actionDescriptions: string[]) => void;
  onUpdateActionStatus: (actionId: number, newStatus: ActionItem['status']) => void;
  onAddAction: (action: Omit<ActionItem, 'id' | 'createdAt'>) => void;
}

export const MeetingsActionsView: React.FC<MeetingsActionsViewProps> = ({
  meetings,
  actions,
  contacts,
  onAddMeeting,
  onUpdateActionStatus,
  onAddAction,
}) => {
  const [activeView, setActiveView] = useState<'meetings' | 'actions' | 'analytics'>('meetings');
  const [selectedMeetingId, setSelectedMeetingId] = useState<number>(meetings[0]?.id || 1);
  const [actionFilter, setActionFilter] = useState<'All' | 'Open' | 'InProgress' | 'Completed' | 'Overdue'>('All');
  const [priorityFilter, setPriorityFilter] = useState<'All' | 'Critical' | 'High' | 'Medium' | 'Low'>('All');
  const [ownerFilter, setOwnerFilter] = useState<number | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewMeetingModalOpen, setIsNewMeetingModalOpen] = useState(false);
  const [isNewActionModalOpen, setIsNewActionModalOpen] = useState(false);

  // New Meeting form state
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newVenue, setNewVenue] = useState('Mulungushi House / Teams Hybrid');
  const [newChairId, setNewChairId] = useState<number>(contacts[0]?.id || 1);
  const [newAttendees, setNewAttendees] = useState('');
  const [newAgenda, setNewAgenda] = useState('');
  const [newMinutes, setNewMinutes] = useState('');
  const [newActionsList, setNewActionsList] = useState('');

  // New Action form state
  const [actionDesc, setActionDesc] = useState('');
  const [actionOwnerId, setActionOwnerId] = useState<number>(contacts[0]?.id || 1);
  const [actionDueDate, setActionDueDate] = useState('');
  const [actionPriority, setActionPriority] = useState<ActionItem['priority']>('High');
  const [actionContext, setActionContext] = useState('');

  const selectedMeeting = meetings.find((m) => m.id === selectedMeetingId) || meetings[0];

  // ---- Computed metrics ----
  const totalMeetings = meetings.length;
  const minutesOnTime = meetings.filter((m) => m.approvedAt).length;
  const totalActions = actions.length;
  const openActions = actions.filter((a) => a.status === 'Open').length;
  const inProgressActions = actions.filter((a) => a.status === 'InProgress').length;
  const completedActions = actions.filter((a) => a.status === 'Completed').length;
  const overdueActions = actions.filter(
    (a) => a.status !== 'Completed' && new Date(a.dueDate) < new Date('2026-09-26')
  ).length;
  const criticalActions = actions.filter((a) => a.priority === 'Critical' && a.status !== 'Completed').length;

  const completionRate = totalActions ? Math.round((completedActions / totalActions) * 100) : 0;

  // ---- Filtered actions ----
  const filteredActions = actions.filter((a) => {
    if (actionFilter !== 'All' && a.status !== actionFilter) return false;
    if (priorityFilter !== 'All' && a.priority !== priorityFilter) return false;
    if (ownerFilter !== 'All' && a.ownerContactId !== ownerFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        a.description.toLowerCase().includes(q) ||
        a.ownerName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // ---- Handlers ----
  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newMinutes) return;

    const chairContact = contacts.find((c) => c.id === newChairId);
    const actionsArr = newActionsList
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    onAddMeeting(
      {
        commType: 'WeeklyProgress',
        title: newTitle,
        meetingDate: newDate || '2026-09-26 10:00',
        venue: newVenue,
        chairContactId: newChairId,
        chairName: chairContact ? `${chairContact.fullName} (${chairContact.organisation})` : 'Meeting Chair',
        attendees: newAttendees.split(',').map((s) => s.trim()).filter(Boolean),
        agenda: newAgenda,
        minutesText: newMinutes,
        approvedBy: chairContact?.fullName,
        approvedAt: '2026-09-26 14:00',
      },
      actionsArr
    );

    setIsNewMeetingModalOpen(false);
    setNewTitle('');
    setNewAgenda('');
    setNewMinutes('');
    setNewActionsList('');
  };

  const handleCreateAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actionDesc || !actionDueDate) return;

    const owner = contacts.find((c) => c.id === actionOwnerId);

    onAddAction({
      description: actionDesc + (actionContext ? ` [Context: ${actionContext}]` : ''),
      ownerContactId: actionOwnerId,
      ownerName: owner ? owner.fullName : 'Unassigned',
      dueDate: actionDueDate,
      priority: actionPriority,
      status: 'Open',
    });

    setIsNewActionModalOpen(false);
    setActionDesc('');
    setActionDueDate('');
    setActionContext('');
  };

  const statusBadge = (status: ActionItem['status']) => {
    const map: Record<string, string> = {
      Open: 'bg-amber-100 text-amber-800 border-amber-200',
      InProgress: 'bg-blue-100 text-blue-800 border-blue-200',
      Completed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      Overdue: 'bg-red-100 text-red-800 border-red-200',
      Cancelled: 'bg-slate-100 text-slate-600 border-slate-200',
    };
    return map[status] || map.Open;
  };

  const priorityBadge = (priority: ActionItem['priority']) => {
    const map: Record<string, string> = {
      Critical: 'bg-red-100 text-red-800 border-red-200',
      High: 'bg-orange-100 text-orange-800 border-orange-200',
      Medium: 'bg-blue-100 text-blue-800 border-blue-200',
      Low: 'bg-slate-100 text-slate-600 border-slate-200',
    };
    return map[priority] || map.Medium;
  };

  return (
    <div className="space-y-6">
      {/* ============ TOP HEADER ============ */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
              <Clock className="w-4 h-4" /> Meetings & Action Item Accountability
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              Minutes Repository & Action Log Tracking
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Enforces the contract review requirement: All formal meetings must issue signed minutes
              within 24 hours. Action items are assigned named owners and tracked until sign-off.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsNewActionModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-2 rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-700" /> New Action Item
            </button>
            <button
              onClick={() => setIsNewMeetingModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" /> Record Meeting Minutes
            </button>
          </div>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mt-5">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
            <div className="text-[10px] uppercase tracking-wider text-slate-500">Total Meetings</div>
            <div className="text-xl font-bold text-slate-900 mt-0.5">{totalMeetings}</div>
            <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
              {minutesOnTime}/{totalMeetings} minutes issued
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
            <div className="text-[10px] uppercase tracking-wider text-slate-500">Total Actions</div>
            <div className="text-xl font-bold text-slate-900 mt-0.5">{totalActions}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">{completionRate}% complete</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="text-[10px] uppercase tracking-wider text-blue-700">In Progress</div>
            <div className="text-xl font-bold text-blue-900 mt-0.5">{inProgressActions}</div>
            <div className="text-[10px] text-blue-700 mt-0.5">Active work</div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="text-[10px] uppercase tracking-wider text-amber-700">Open</div>
            <div className="text-xl font-bold text-amber-900 mt-0.5">{openActions}</div>
            <div className="text-[10px] text-amber-700 mt-0.5">Not yet started</div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
            <div className="text-[10px] uppercase tracking-wider text-emerald-700">Completed</div>
            <div className="text-xl font-bold text-emerald-900 mt-0.5">{completedActions}</div>
            <div className="text-[10px] text-emerald-700 mt-0.5">Signed off</div>
          </div>
          <div className={`rounded-lg p-3 border ${overdueActions > 0 ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200'}`}>
            <div className={`text-[10px] uppercase tracking-wider ${overdueActions > 0 ? 'text-red-700' : 'text-slate-500'}`}>
              Overdue
            </div>
            <div className={`text-xl font-bold mt-0.5 ${overdueActions > 0 ? 'text-red-900' : 'text-slate-900'}`}>
              {overdueActions}
            </div>
            <div className={`text-[10px] mt-0.5 ${overdueActions > 0 ? 'text-red-700' : 'text-slate-500'}`}>
              {criticalActions} critical
            </div>
          </div>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
          <button
            onClick={() => setActiveView('meetings')}
            className={`text-xs font-bold px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
              activeView === 'meetings' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Meetings & Minutes
          </button>
          <button
            onClick={() => setActiveView('actions')}
            className={`text-xs font-bold px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
              activeView === 'actions' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Action Register ({actions.length})
          </button>
          <button
            onClick={() => setActiveView('analytics')}
            className={`text-xs font-bold px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
              activeView === 'analytics' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Analytics
          </button>
        </div>
      </div>

      {/* ============ MEETINGS VIEW ============ */}
      {activeView === 'meetings' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Meeting list */}
          <div className="lg:col-span-4 space-y-3">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center justify-between">
                <span>Formal Meetings ({meetings.length})</span>
                <span className="text-[11px] text-emerald-700 font-semibold">100% On Time</span>
              </h3>

              <div className="space-y-2">
                {meetings.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMeetingId(m.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer ${
                      selectedMeeting?.id === m.id
                        ? 'border-emerald-600 bg-emerald-50/50 shadow-2xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-slate-500 mb-1">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        m.commType === 'JCCC' ? 'bg-emerald-100 text-emerald-800'
                        : m.commType === 'WeeklyProgress' ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                      }`}>
                        {m.commType}
                      </span>
                      <span className="font-mono text-[11px]">{m.meetingDate.split(' ')[0]}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm leading-snug">{m.title}</h4>
                    <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                      <span>Chair: {m.chairName}</span>
                      <span className="text-emerald-700 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Approved
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Meeting detail */}
          <div className="lg:col-span-8 space-y-4">
            {selectedMeeting && (
              <>
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {selectedMeeting.commType} Minutes
                    </span>
                    <span className="text-xs font-mono text-slate-500">ID: MTG-{selectedMeeting.id.toString().padStart(3, '0')}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">{selectedMeeting.title}</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 text-xs">
                    <div className="flex items-start gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 mt-0.5" />
                      <div>
                        <div className="text-slate-500 font-medium">Date & Time</div>
                        <div className="text-slate-800 font-semibold">{selectedMeeting.meetingDate}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5" />
                      <div>
                        <div className="text-slate-500 font-medium">Venue</div>
                        <div className="text-slate-800 font-semibold">{selectedMeeting.venue}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400 mt-0.5" />
                      <div>
                        <div className="text-slate-500 font-medium">Chair</div>
                        <div className="text-slate-800 font-semibold">{selectedMeeting.chairName}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Attendees ({selectedMeeting.attendees.length})
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedMeeting.attendees.map((att, i) => (
                      <span key={i} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] border border-slate-200">
                        {att}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                    <ClipboardList className="w-3.5 h-3.5" /> Agenda
                  </h4>
                  <pre className="whitespace-pre-wrap font-sans bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs text-slate-700 leading-relaxed">
                    {selectedMeeting.agenda}
                  </pre>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5" /> Key Deliberations & Decisions
                  </h4>
                  <p className="bg-emerald-50/40 p-3 rounded-lg border border-emerald-100 text-xs text-slate-700 leading-relaxed">
                    {selectedMeeting.minutesText}
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    Minutes Approved By: <strong className="text-slate-800">{selectedMeeting.approvedBy}</strong>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">{selectedMeeting.approvedAt}</div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ============ ACTIONS VIEW ============ */}
      {activeView === 'actions' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Project Action Register</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {filteredActions.length} of {actions.length} actions shown
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search actions..."
                  className="bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs w-48 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value as any)}
                className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white"
              >
                <option value="All">All Statuses</option>
                <option value="Open">Open</option>
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value as any)}
                className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white"
              >
                <option value="All">All Priorities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <select
                value={ownerFilter}
                onChange={(e) => setOwnerFilter(e.target.value === 'All' ? 'All' : Number(e.target.value))}
                className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white"
              >
                <option value="All">All Owners</option>
                {contacts.map((c) => (
                  <option key={c.id} value={c.id}>{c.fullName}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-slate-100">
            {filteredActions.length === 0 ? (
              <div className="text-center py-10 text-slate-500 text-sm">
                No actions match the current filters.
              </div>
            ) : (
              filteredActions.map((action) => {
                const isOverdue =
                  new Date(action.dueDate) < new Date('2026-09-26') && action.status !== 'Completed';

                return (
                  <div
                    key={action.id}
                    className={`p-4 rounded-xl border transition-all ${
                      action.status === 'Completed'
                        ? 'bg-slate-50/70 border-slate-200 opacity-80'
                        : isOverdue
                        ? 'bg-red-50/50 border-red-200'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    } space-y-3`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border ${priorityBadge(action.priority)}`}>
                            {action.priority}
                          </span>
                          <span className="text-[11px] font-mono text-slate-500">
                            ACT-{String(action.id).padStart(3, '0')}
                          </span>
                          {isOverdue && (
                            <span className="text-[10px] font-bold text-red-700 bg-red-100 border border-red-200 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                              <AlertCircle className="w-3 h-3" /> Overdue
                            </span>
                          )}
                        </div>

                        <p className={`text-sm font-semibold leading-snug ${action.status === 'Completed' ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                          {action.description}
                        </p>
                      </div>

                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0 border ${statusBadge(action.status)}`}>
                        {action.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 font-medium text-slate-700">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          {action.ownerName}
                        </span>
                        <span>
                          Due: <strong className={isOverdue ? 'text-red-700' : 'text-slate-800'}>{action.dueDate}</strong>
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {action.status !== 'Completed' && (
                          <button
                            onClick={() => onUpdateActionStatus(action.id, 'Completed')}
                            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[11px] px-2.5 py-1 rounded flex items-center gap-1 cursor-pointer"
                          >
                            <Check className="w-3 h-3" /> Mark Done
                          </button>
                        )}
                        {action.status === 'Open' && (
                          <button
                            onClick={() => onUpdateActionStatus(action.id, 'InProgress')}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] px-2.5 py-1 rounded cursor-pointer"
                          >
                            Start
                          </button>
                        )}
                        {action.status === 'Completed' && (
                          <button
                            onClick={() => onUpdateActionStatus(action.id, 'Open')}
                            className="text-slate-400 hover:text-slate-600 text-[11px] underline cursor-pointer"
                          >
                            Reopen
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ============ ANALYTICS VIEW ============ */}
      {activeView === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-700" /> Meeting Cadence & Compliance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {[
                { label: 'Total Meetings Held', value: totalMeetings },
                { label: 'Minutes Approved', value: minutesOnTime },
                { label: 'On-Time Rate', value: '100%' },
                { label: 'Avg Actions per Meeting', value: totalMeetings ? Math.round(totalActions / totalMeetings) : 0 },
              ].map((stat) => (
                <div key={stat.label} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500">{stat.label}</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-700" /> Action Status Distribution
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Completed', count: completedActions, color: 'bg-emerald-600' },
                { label: 'In Progress', count: inProgressActions, color: 'bg-blue-600' },
                { label: 'Open', count: openActions, color: 'bg-amber-500' },
                { label: 'Overdue', count: overdueActions, color: 'bg-red-600' },
              ].map((item) => {
                const pct = totalActions ? Math.round((item.count / totalActions) * 100) : 0;
                return (
                  <div key={item.label}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-700">{item.label}</span>
                      <span className="text-slate-500">{item.count} ({pct}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-700" /> Owner Workload
            </h3>
            <div className="space-y-2">
              {contacts
                .map((c) => ({
                  name: c.fullName,
                  total: actions.filter((a) => a.ownerContactId === c.id).length,
                  open: actions.filter((a) => a.ownerContactId === c.id && a.status !== 'Completed').length,
                }))
                .filter((x) => x.total > 0)
                .sort((a, b) => b.total - a.total)
                .map((row) => (
                  <div key={row.name} className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-100 text-xs">
                    <span className="font-medium text-slate-700">{row.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500">{row.total} total</span>
                      <span className={`font-bold ${row.open > 0 ? 'text-amber-700' : 'text-emerald-700'}`}>
                        {row.open} open
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* ============ NEW MEETING MODAL ============ */}
      {isNewMeetingModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsNewMeetingModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900">Record Formal Meeting Minutes</h3>
            <p className="text-xs text-slate-500 mt-1">
              Template follows Section 3.4 of the E-SAPP Customer Communication Framework. Must be
              committed within 24 hours.
            </p>

            <form onSubmit={handleCreateMeeting} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Meeting Title</label>
                <input
                  type="text" required
                  placeholder="e.g. Weekly Client Progress Meeting #4"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Date & Time</label>
                  <input
                    type="text" placeholder="2026-09-26 10:00"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Meeting Chair</label>
                  <select
                    value={newChairId}
                    onChange={(e) => setNewChairId(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                  >
                    {contacts.map((c) => (
                      <option key={c.id} value={c.id}>{c.fullName} ({c.organisation})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Venue / Virtual Channel</label>
                <input
                  type="text" value={newVenue}
                  onChange={(e) => setNewVenue(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Attendees (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="Eng. John Banda, Chimwemwe Sinyinza, Ruth Kamwendo..."
                  value={newAttendees}
                  onChange={(e) => setNewAttendees(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Agenda Items</label>
                <textarea
                  rows={3} placeholder="1. Review of milestone D-4..."
                  value={newAgenda}
                  onChange={(e) => setNewAgenda(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Discussions & Decisions Recorded</label>
                <textarea
                  rows={3} required
                  placeholder="Summarize key discussions, consensus, and formal decisions..."
                  value={newMinutes}
                  onChange={(e) => setNewMinutes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Action Items Generated (One per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="Verify staging server credentials&#10;Send updated test data batch"
                  value={newActionsList}
                  onChange={(e) => setNewActionsList(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  Each line becomes an action item in the register with 7-day default due date.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewMeetingModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold cursor-pointer"
                >
                  Commit Official Minutes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============ NEW ACTION MODAL ============ */}
      {isNewActionModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsNewActionModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900">Add Project Action Item</h3>
            <p className="text-xs text-slate-500 mt-1">
              Creates an auditable deliverable action with named owner and due date.
            </p>

            <form onSubmit={handleCreateAction} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Action Description</label>
                <textarea
                  rows={3} required
                  placeholder="Specific task to be completed..."
                  value={actionDesc}
                  onChange={(e) => setActionDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Context / Reference (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. D-4 phase gate, WP 3.2"
                  value={actionContext}
                  onChange={(e) => setActionContext(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Responsible Owner</label>
                <select
                  value={actionOwnerId}
                  onChange={(e) => setActionOwnerId(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                >
                  {contacts.map((c) => (
                    <option key={c.id} value={c.id}>{c.fullName} — {c.roleTitle}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Due Date</label>
                  <input
                    type="date" required
                    value={actionDueDate}
                    onChange={(e) => setActionDueDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Priority</label>
                  <select
                    value={actionPriority}
                    onChange={(e) => setActionPriority(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                  >
                    <option value="Critical">Critical (Blocker)</option>
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewActionModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold cursor-pointer"
                >
                  Create Action
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};