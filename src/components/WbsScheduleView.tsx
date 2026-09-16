import React, { useState } from 'react';
import { 
  Layers, 
  Filter, 
  CheckCircle, 
  Clock, 
  Flame, 
  User, 
  Calendar, 
  ChevronRight,
  Search,
  Sparkles
} from 'lucide-react';
import { WBSPhase, WorkPackage } from '../types';

interface WbsScheduleViewProps {
  phases: WBSPhase[];
  currentDay: number;
}

export const WbsScheduleView: React.FC<WbsScheduleViewProps> = ({ phases, currentDay }) => {
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>('all');
  const [criticalPathOnly, setCriticalPathOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPhases = phases.map(phase => {
    const matchingPackages = phase.workPackages.filter(wp => {
      if (criticalPathOnly && !wp.isCriticalPath) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesTitle = wp.title.toLowerCase().includes(q);
        const matchesCode = wp.code.toLowerCase().includes(q);
        const matchesActivities = wp.activities.some(a => a.toLowerCase().includes(q));
        const matchesLead = wp.responsibleLead.toLowerCase().includes(q) || 
          wp.moaCounterpart.toLowerCase().includes(q) ||
          (Boolean(wp.supportingOwners) && wp.supportingOwners!.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCode && !matchesActivities && !matchesLead) return false;
      }
      return true;
    });
    return {
      ...phase,
      workPackages: matchingPackages
    };
  }).filter(phase => {
    if (selectedPhaseId === 'all') return phase.workPackages.length > 0;
    return phase.id === selectedPhaseId && phase.workPackages.length > 0;
  });

  const totalWPs = phases.reduce((acc, p) => acc + p.workPackages.length, 0);
  const completedWPs = phases.reduce(
    (acc, p) => acc + p.workPackages.filter(w => w.status === 'Completed').length, 
    0
  );

  return (
    <div className="space-y-6">
      {/* Header & Stats Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
              <Layers className="w-4 h-4" /> Work Breakdown Structure (WBS)
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              50-Day Work Package Hierarchy & Critical Path
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Decomposes the E-SAPP MIS contract into 4 distinct phases, 10 work packages, and concrete deliverable gates. Strictly protects the 50-day schedule through synchronized UNZA and MoA counterpart ownership.
            </p>
          </div>

          <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-6 shrink-0">
            <div>
              <div className="text-xs text-slate-500 font-medium">Work Packages</div>
              <div className="text-lg font-bold text-slate-900">{completedWPs} / {totalWPs} Done</div>
            </div>
            <div className="bg-amber-50 border border-amber-200 text-amber-800 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              Critical Path Active
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            <button
              onClick={() => setSelectedPhaseId('all')}
              className={`text-xs px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                selectedPhaseId === 'all'
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Phases (1-4)
            </button>
            {phases.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPhaseId(p.id)}
                className={`text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedPhaseId === p.id
                    ? 'bg-emerald-700 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {p.name.split(':')[0]} (Days {p.dayStart}-{p.dayEnd})
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Critical Path Checkbox */}
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={criticalPathOnly}
                onChange={(e) => setCriticalPathOnly(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
              />
              <span className="flex items-center gap-1 text-amber-800">
                <Flame className="w-3.5 h-3.5 text-amber-600" /> Critical Path Only
              </span>
            </label>

            {/* Search Input */}
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search WBS tasks..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 50-Day Gantt Timeline Header Scale */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs overflow-x-auto">
        <div className="min-w-[700px]">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
            <span>50-DAY TIMELINE GANTT ALIGNMENT</span>
            <span className="text-emerald-700">Marker: Current Day {currentDay}</span>
          </div>
          <div className="relative h-6 bg-slate-100 rounded-md flex items-center text-[10px] font-mono text-slate-500 px-2 select-none border border-slate-200">
            <span style={{ left: '0%' }} className="absolute">Day 1</span>
            <span style={{ left: '20%' }} className="absolute">Day 10 (D-2)</span>
            <span style={{ left: '36%' }} className="absolute">Day 18 (D-3)</span>
            <span style={{ left: '52%' }} className="absolute font-bold text-slate-900">Day 26 (D-4)</span>
            <span style={{ left: '76%' }} className="absolute">Day 38 (D-5)</span>
            <span style={{ left: '88%' }} className="absolute">Day 44 (D-6)</span>
            <span style={{ right: '1%' }} className="absolute font-bold text-purple-700">Day 50 (D-8)</span>

            {/* Current Day vertical pin */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10" 
              style={{ left: `${(currentDay / 50) * 100}%` }}
              title={`Current Day ${currentDay}`}
            />
          </div>
        </div>
      </div>

      {/* Render Phases & Work Packages */}
      <div className="space-y-6">
        {filteredPhases.map((phase) => (
          <div key={phase.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            {/* Phase Header */}
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Days {phase.dayStart} – {phase.dayEnd} ({phase.dayEnd - phase.dayStart + 1} Days)
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {phase.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{phase.description}</p>
              </div>

              <div className="text-xs font-semibold px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 shrink-0 self-start sm:self-center">
                {phase.workPackages.length} Work Package{phase.workPackages.length !== 1 ? 's' : ''}
              </div>
            </div>

            {/* Work Package Cards */}
            <div className="divide-y divide-slate-100 p-2 sm:p-4 space-y-4">
              {phase.workPackages.map((wp: WorkPackage) => {
                const duration = wp.dayEnd - wp.dayStart + 1;
                const leftPercent = ((wp.dayStart - 1) / 50) * 100;
                const widthPercent = (duration / 50) * 100;

                return (
                  <div key={wp.id} className="bg-white hover:bg-slate-50/60 p-4 rounded-lg border border-slate-100 transition-colors space-y-3">
                    {/* WP Title Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded border border-slate-200">
                          {wp.code}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">
                          {wp.title}
                        </h4>
                        {wp.deliverableCode && (
                          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                            Produces {wp.deliverableCode}
                          </span>
                        )}
                        {wp.isCriticalPath && (
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded flex items-center gap-1">
                            <Flame className="w-3 h-3 text-amber-600" /> Critical Path
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-slate-500 font-medium">
                          Days {wp.dayStart} – {wp.dayEnd} ({duration}d)
                        </span>
                        <span className={`px-2 py-0.5 rounded font-semibold text-[11px] ${
                          wp.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : wp.status === 'In Progress'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}>
                          {wp.status} ({wp.progress}%)
                        </span>
                      </div>
                    </div>

                    {/* Miniature Gantt bar for this WP */}
                    <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`absolute top-0 bottom-0 rounded-full ${
                          wp.status === 'Completed' 
                            ? 'bg-emerald-600' 
                            : wp.status === 'In Progress' 
                            ? 'bg-amber-500' 
                            : 'bg-slate-300'
                        }`}
                        style={{
                          left: `${leftPercent}%`,
                          width: `${Math.max(widthPercent, 2)}%`
                        }}
                      />
                    </div>

                    {/* Counterparts Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 pt-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-semibold text-slate-700">UNZA Lead:</span>
                        <strong className="text-slate-800">{wp.responsibleLead}</strong>
                        {wp.supportingOwners && (
                          <span className="text-[11px] text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">
                            Support: {wp.supportingOwners}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-700">MoA Counterpart:</span>
                        <span className="text-slate-800">{wp.moaCounterpart}</span>
                      </div>
                    </div>

                    {/* Activities List */}
                    <div className="bg-slate-50 p-3 rounded-lg text-xs space-y-1.5 border border-slate-100">
                      <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                        Key Work Package Activities:
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                        {wp.activities.map((act, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-slate-600">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span>{act}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
