import React, { useState } from 'react';
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  User, 
  FileText, 
  Check, 
  X, 
  ChevronRight,
  Filter
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
  const [selectedMeetingId, setSelectedMeetingId] = useState<number>(meetings[0]?.id || 1);
  const [actionFilter, setActionFilter] = useState<'All' | 'Open' | 'InProgress' | 'Completed' | 'Overdue'>('All');
  const [isNewMeetingModalOpen, setIsNewMeetingModalOpen] = useState<boolean>(false);
  const [isNewActionModalOpen, setIsNewActionModalOpen] = useState<boolean>(false);

  // New Meeting form states
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newVenue, setNewVenue] = useState('Mulungushi House / Teams Hybrid');
  const [newChairId, setNewChairId] = useState<number>(contacts[0]?.id || 1);
  const [newAttendees, setNewAttendees] = useState('');
  const [newAgenda, setNewAgenda] = useState('');
  const [newMinutes, setNewMinutes] = useState('');
  const [newActionsList, setNewActionsList] = useState('');

  // New Action form states
  const [actionDesc, setActionDesc] = useState('');
  const [actionOwnerId, setActionOwnerId] = useState<number>(contacts[0]?.id || 1);
  const [actionDueDate, setActionDueDate] = useState('');
  const [actionPriority, setActionPriority] = useState<ActionItem['priority']>('High');

  const selectedMeeting = meetings.find(m => m.id === selectedMeetingId) || meetings[0];

  const filteredActions = actions.filter(a => {
    if (actionFilter === 'All') return true;
    if (actionFilter === 'Overdue') {
      const isPast = new Date(a.dueDate) < new Date('2026-09-26');
      return isPast && a.status !== 'Completed';
    }
    return a.status === actionFilter;
  });

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newMinutes) return;

    const chairContact = contacts.find(c => c.id === newChairId);
    const actionsArr = newActionsList
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    onAddMeeting({
      commType: 'WeeklyProgress',
      title: newTitle,
      meetingDate: newDate || '2026-09-26 10:00',
      venue: newVenue,
      chairContactId: newChairId,
      chairName: chairContact ? `${chairContact.fullName} (${chairContact.organisation})` : 'Meeting Chair',
      attendees: newAttendees.split(',').map(s => s.trim()).filter(Boolean),
      agenda: newAgenda,
      minutesText: newMinutes,
      approvedBy: chairContact?.fullName,
      approvedAt: '2026-09-26 14:00',
    }, actionsArr);

    setIsNewMeetingModalOpen(false);
    setNewTitle('');
    setNewAgenda('');
    setNewMinutes('');
    setNewActionsList('');
  };

  const handleCreateAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actionDesc || !actionDueDate) return;

    const owner = contacts.find(c => c.id === actionOwnerId);

    onAddAction({
      description: actionDesc,
      ownerContactId: actionOwnerId,
      ownerName: owner ? owner.fullName : 'Unassigned',
      dueDate: actionDueDate,
      priority: actionPriority,
      status: 'Open',
    });

    setIsNewActionModalOpen(false);
    setActionDesc('');
    setActionDueDate('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
            <Clock className="w-4 h-4" /> Meetings & Action Item Accountability
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Minutes Repository & Action Log Tracking
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Enforces the contract review requirement: All formal meetings must issue signed minutes within 24 hours. Action items are assigned named owners and tracked until sign-off.
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

      {/* Two Column Layout: Meetings on Left, Actions on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Meeting Minutes Browser (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
              <span>Formal Meetings ({meetings.length})</span>
              <span className="text-[11px] text-emerald-700 font-semibold">100% Minutes Issued &lt; 24h</span>
            </h3>

            <div className="space-y-2">
              {meetings.map((m) => (
                <div
                  key={m.id}
                  onClick={() => setSelectedMeetingId(m.id)}
                  className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                    selectedMeeting?.id === m.id
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-2xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="font-semibold text-emerald-800">{m.commType}</span>
                    <span className="font-mono text-[11px]">{m.meetingDate}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 mt-1 text-sm leading-snug">
                    {m.title}
                  </h4>
                  <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                    <span>Chair: {m.chairName}</span>
                    <span className="text-emerald-700 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Approved
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Meeting Details View */}
          {selectedMeeting && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4 text-xs">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {selectedMeeting.commType} Minutes
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1.5">
                  {selectedMeeting.title}
                </h3>
                <div className="text-slate-500 mt-1 space-y-0.5">
                  <div><strong>Date & Venue:</strong> {selectedMeeting.meetingDate} &bull; {selectedMeeting.venue}</div>
                  <div><strong>Chair:</strong> {selectedMeeting.chairName}</div>
                </div>
              </div>

              <div>
                <strong className="text-slate-800 uppercase tracking-wider text-[11px] block mb-1">
                  Attendees
                </strong>
                <div className="flex flex-wrap gap-1.5">
                  {selectedMeeting.attendees.map((att, i) => (
                    <span key={i} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                      {att}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <strong className="text-slate-800 uppercase tracking-wider text-[11px] block mb-1">
                  Agenda Items
                </strong>
                <pre className="whitespace-pre-wrap font-sans bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-slate-700 leading-relaxed">
                  {selectedMeeting.agenda}
                </pre>
              </div>

              <div>
                <strong className="text-slate-800 uppercase tracking-wider text-[11px] block mb-1">
                  Key Deliberations & Decisions
                </strong>
                <p className="bg-emerald-50/40 p-3 rounded-lg border border-emerald-100 text-slate-700 leading-relaxed">
                  {selectedMeeting.minutesText}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Minutes Approved By: <strong className="text-slate-800">{selectedMeeting.approvedBy}</strong></span>
                <span>{selectedMeeting.approvedAt}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Action Log Tracker (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Project Action Items Register</h3>
                <p className="text-xs text-slate-500 mt-0.5">Assigned responsibilities resulting from meetings and technical interface reviews.</p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
                {(['All', 'Open', 'InProgress', 'Completed', 'Overdue'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActionFilter(tab)}
                    className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                      actionFilter === tab
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Cards List */}
            <div className="space-y-3">
              {filteredActions.map((action) => {
                const isOverdue = new Date(action.dueDate) < new Date('2026-09-26') && action.status !== 'Completed';

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
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                            action.priority === 'Critical'
                              ? 'bg-red-100 text-red-800'
                              : action.priority === 'High'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {action.priority}
                          </span>
                          <span className="text-[11px] font-mono text-slate-500">ACT-{String(action.id).padStart(3, '0')}</span>
                          {isOverdue && (
                            <span className="text-[10px] font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                              <AlertCircle className="w-3 h-3" /> Overdue
                            </span>
                          )}
                        </div>

                        <p className={`text-xs font-semibold ${action.status === 'Completed' ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                          {action.description}
                        </p>
                      </div>

                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0 ${
                        action.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : action.status === 'InProgress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {action.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 font-medium text-slate-700">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          {action.ownerName}
                        </span>
                        <span>Due: <strong className={isOverdue ? 'text-red-700' : 'text-slate-800'}>{action.dueDate}</strong></span>
                      </div>

                      {/* State update controls */}
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
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Record Meeting Minutes */}
      {isNewMeetingModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsNewMeetingModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900">Record Formal Meeting Minutes</h3>
            <p className="text-xs text-slate-500 mt-1">
              Template follows Section 3.4 of the E-SAPP Customer Communication Framework. Must be committed within 24 hours.
            </p>

            <form onSubmit={handleCreateMeeting} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Meeting Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Weekly Client Progress Meeting #4"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Date & Time</label>
                  <input
                    type="text"
                    placeholder="2026-09-26 10:00"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Meeting Chair</label>
                  <select
                    value={newChairId}
                    onChange={(e) => setNewChairId(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                  >
                    {contacts.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.fullName} ({c.organisation})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Venue / Virtual Channel</label>
                <input
                  type="text"
                  value={newVenue}
                  onChange={(e) => setNewVenue(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Attendees (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="Eng. John Banda, Chimwemwe Sinyinza, Ruth Kamwendo, Bwalya Mumba..."
                  value={newAttendees}
                  onChange={(e) => setNewAttendees(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Agenda Items</label>
                <textarea
                  rows={2}
                  placeholder="1. Review of milestone D-4..."
                  value={newAgenda}
                  onChange={(e) => setNewAgenda(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Discussions & Decisions Recorded</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Summarize key discussions, consensus, and formal decisions..."
                  value={newMinutes}
                  onChange={(e) => setNewMinutes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Action Items Generated (One per line)</label>
                <textarea
                  rows={2}
                  placeholder="Verify staging server credentials&#10;Send updated test data batch"
                  value={newActionsList}
                  onChange={(e) => setNewActionsList(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
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

      {/* Modal: New Action Item */}
      {isNewActionModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
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
                  rows={3}
                  required
                  placeholder="Specific task to be completed..."
                  value={actionDesc}
                  onChange={(e) => setActionDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Responsible Owner</label>
                <select
                  value={actionOwnerId}
                  onChange={(e) => setActionOwnerId(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                >
                  {contacts.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.fullName} — {c.roleTitle} ({c.organisation})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Due Date</label>
                  <input
                    type="date"
                    required
                    value={actionDueDate}
                    onChange={(e) => setActionDueDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Priority Level</label>
                  <select
                    value={actionPriority}
                    onChange={(e) => setActionPriority(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
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
