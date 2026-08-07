import React, { useState } from 'react';
import { 
  Sparkles, 
  Users, 
  Building2, 
  Filter, 
  Search, 
  X,
  Maximize2
} from 'lucide-react';

export type TeamCategory = 'chromebook-field' | 'partner-field' | 'partner-head-office' | 'retailer' | 'milestone';

export interface CalendarEvent {
  id: string;
  month: 'September' | 'October';
  day: number;
  endDay?: number; // for multi-day events
  title: string;
  category: TeamCategory;
  isMilestone?: boolean;
  isRainbowLaunch?: boolean;
  description: string;
  location?: string;
  audience?: string;
  link?: string;
}

const EVENTS: CalendarEvent[] = [
  // --- SEPTEMBER EVENTS ---
  {
    id: 'sept-15-press',
    month: 'September',
    day: 15,
    title: 'US Press Event',
    category: 'milestone',
    isMilestone: true,
    description: 'Official US Press reveal event for Googlebook ecosystem & hardware announcements.',
    location: 'New York / Hybrid Stream',
    audience: 'US Media, Retail Executives & Partner Leadership'
  },
  {
    id: 'sept-15-qualcomm',
    month: 'September',
    day: 15,
    endDay: 16,
    title: 'Qualcomm Cascade Event',
    category: 'partner-field',
    description: 'Qualcomm multi-day cascade alignment training for field team reps.',
    location: 'Virtual Workshop',
    audience: 'Qualcomm 3PL Field Sales Representatives (BDS)'
  },
  {
    id: 'sept-16-hp',
    month: 'September',
    day: 16,
    title: 'HP Pulse: Intro (1)',
    category: 'partner-field',
    description: 'HP Pulse introductory enablement session for field sales specialists.',
    location: 'Live Virtual Session',
    audience: 'HP Field Team (2020 Companies)'
  },
  {
    id: 'sept-21-embargo',
    month: 'September',
    day: 21,
    title: 'Embargo Lifts',
    category: 'milestone',
    isMilestone: true,
    description: 'Official media & retail embargo lifted globally for Googlebook messaging.',
    audience: 'All Partners & Retail Channel Networks'
  },
  {
    id: 'sept-21-bby-cert',
    month: 'September',
    day: 21,
    title: 'BBY Cert Begins',
    category: 'retailer',
    description: 'Best Buy retail sales associate certification training window opens.',
    location: 'Best Buy Learning Portal',
    audience: 'Best Buy Retail Sales Associates (RSAs)'
  },
  {
    id: 'sept-23-hp-demos',
    month: 'September',
    day: 23,
    title: 'HP Pulse: Demos (2)',
    category: 'partner-field',
    description: 'HP Pulse hands-on hardware demo walkthroughs and product pitch calibration.',
    location: 'Interactive Webinar',
    audience: 'HP Field Team & Retail Leads'
  },
  {
    id: 'sept-24-dell',
    month: 'September',
    day: 24,
    title: 'Dell Webinar',
    category: 'partner-field',
    description: 'Dell field team enablement webinar covering competitive messaging & portfolio highlights.',
    location: 'Dell Live Stream Portal',
    audience: 'Dell 2020 Companies Field Team (110 reps)'
  },
  {
    id: 'sept-28-kits',
    month: 'September',
    day: 28,
    title: 'Deploy Launch Kits',
    category: 'partner-field',
    description: 'Physical & digital retail launch kit deployment to partner field team leaders.',
    location: 'Nationwide Distribution',
    audience: 'Field Reps & In-Store Merchandisers'
  },

  // --- OCTOBER EVENTS ---
  {
    id: 'oct-05-launch',
    month: 'October',
    day: 5,
    title: 'GB Launch',
    category: 'milestone',
    isMilestone: true,
    isRainbowLaunch: true,
    description: 'Official Googlebook Launch Day! On-shelf availability and campaign activation across all US channels.',
    location: 'Global / Nationwide Retail Doors',
    audience: 'Consumers, RSAs, and Retail Partners'
  },
  {
    id: 'oct-07-bby-hlm',
    month: 'October',
    day: 7,
    title: 'BBY HLM Event',
    category: 'retailer',
    description: 'Best Buy Holiday Leadership Meeting key execution alignment.',
    location: 'Minneapolis, MN / Hybrid',
    audience: 'Best Buy Leadership & Regional Managers'
  },
  {
    id: 'oct-13-dell-ntm',
    month: 'October',
    day: 13,
    endDay: 15,
    title: 'Dell NTM Event',
    category: 'partner-field',
    description: 'Dell National Team Meeting focused on Q4 retail execution & product demonstration excellence.',
    location: 'Dell HQ / Hybrid',
    audience: 'Dell US Sales Leadership & Field Teams'
  },
  {
    id: 'oct-28-intel-hq',
    month: 'October',
    day: 28,
    title: 'Intel HQ Training',
    category: 'partner-head-office',
    description: 'Intel Head Office executive briefing and engineering alignment session.',
    location: 'Intel HQ, Santa Clara, CA',
    audience: 'Intel Corporate Brand & Retail Marketing Teams'
  },
  {
    id: 'oct-31-bby-cert-end',
    month: 'October',
    day: 31,
    title: 'BBY Cert Ends',
    category: 'retailer',
    description: 'Best Buy Retail Associate Certification deadline for launch readiness.',
    location: 'Best Buy Learning Portal',
    audience: 'Best Buy RSAs'
  }
];

export default function GooglebookTrainingExecution() {
  const [selectedCategory, setSelectedCategory] = useState<TeamCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selected Event or Day for Blown Up Modal
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [selectedDayInfo, setSelectedDayInfo] = useState<{ month: string; day: number; events: CalendarEvent[] } | null>(null);
  
  // Hover state for instant popover preview
  const [hoveredEvent, setHoveredEvent] = useState<CalendarEvent | null>(null);

  // Filter events
  const filteredEvents = EVENTS.filter(evt => {
    if (selectedCategory !== 'all' && evt.category !== selectedCategory) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = evt.title.toLowerCase().includes(q);
      const matchDesc = evt.description.toLowerCase().includes(q);
      const matchAud = (evt.audience || '').toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchAud) return false;
    }
    return true;
  });

  const getCategoryBadgeStyle = (cat: TeamCategory, isRainbow = false) => {
    if (isRainbow) {
      return 'bg-zinc-900 text-white border-2 border-purple-500 shadow-md shadow-purple-500/20';
    }
    switch (cat) {
      case 'chromebook-field':
        return 'bg-[#4285F4] text-white border border-[#4285F4] hover:bg-[#3b78e7]';
      case 'partner-field':
        return 'bg-[#EA4335] text-white border border-[#EA4335] hover:bg-[#d93025]';
      case 'partner-head-office':
        return 'bg-[#34A853] text-white border border-[#34A853] hover:bg-[#2d9247]';
      case 'retailer':
        return 'bg-[#FBBC05] text-[#202124] border border-[#FBBC05] hover:bg-[#f2b203]';
      case 'milestone':
        return 'bg-purple-900 text-purple-100 border border-purple-700 hover:bg-purple-800';
      default:
        return 'bg-zinc-800 text-zinc-300 border border-zinc-700';
    }
  };

  const renderMonthCalendar = (monthName: 'September' | 'October', subtitle: string) => {
    const isSept = monthName === 'September';
    // September 2026 starts on Tuesday (Sept 1) -> offset 2 (Sun, Mon)
    // October 2026 starts on Thursday (Oct 1) -> offset 4 (Sun, Mon, Tue, Wed)
    const startOffset = isSept ? 2 : 4;
    const totalDays = isSept ? 30 : 31;

    // Structure days into 7-day week rows
    interface WeekDay {
      dayNum: number | null;
      colIndex: number; // 0..6
    }

    const weeks: WeekDay[][] = [];
    let currentWeek: WeekDay[] = [];

    // Add start offset padding
    for (let i = 0; i < startOffset; i++) {
      currentWeek.push({ dayNum: null, colIndex: i });
    }

    for (let d = 1; d <= totalDays; d++) {
      const colIndex = currentWeek.length;
      currentWeek.push({ dayNum: d, colIndex });
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({ dayNum: null, colIndex: currentWeek.length });
      }
      weeks.push(currentWeek);
    }

    const monthEvents = filteredEvents.filter(e => e.month === monthName);

    return (
      <div className="bg-[#141517] border border-[#3c4043] rounded-2xl p-4 sm:p-5 shadow-2xl space-y-4">
        
        {/* Month Header */}
        <div className="border-b border-[#2d2f31] pb-3">
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-sans">
            {monthName}
          </h2>
          <p className="text-xs sm:text-sm font-bold text-[#e8eaed] mt-0.5 tracking-normal">
            {subtitle}
          </p>
        </div>

        {/* Days of Week Header Bar */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center font-extrabold">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div 
              key={day} 
              className="bg-[#4285F4] text-white py-1.5 rounded-lg text-[10px] sm:text-xs uppercase tracking-wider font-black shadow-sm"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Weeks Container */}
        <div className="space-y-2">
          {weeks.map((week, wIdx) => {
            // Find active valid days in this week
            const validDays = week.filter(w => w.dayNum !== null).map(w => w.dayNum as number);
            if (validDays.length === 0) return null;

            const minDayInWeek = Math.min(...validDays);
            const maxDayInWeek = Math.max(...validDays);

            // Filter events that overlap with this week
            const weekEvents = monthEvents.filter(evt => {
              const start = evt.day;
              const end = evt.endDay || evt.day;
              return start <= maxDayInWeek && end >= minDayInWeek;
            });

            // Calculate event rows slot placement for this week
            const sortedWeekEvents = [...weekEvents].sort((a, b) => {
              if (a.day !== b.day) return a.day - b.day;
              const durA = (a.endDay || a.day) - a.day;
              const durB = (b.endDay || b.day) - b.day;
              return durB - durA;
            });

            const eventRows: { evt: CalendarEvent; colStart: number; colEnd: number; rowIndex: number }[] = [];
            const occupiedSlots: boolean[][] = [];

            sortedWeekEvents.forEach(evt => {
              const evtStart = evt.day;
              const evtEnd = evt.endDay || evt.day;

              let colStart = 0;
              let colEnd = 6;

              if (evtStart >= minDayInWeek) {
                const match = week.find(w => w.dayNum === evtStart);
                if (match) colStart = match.colIndex;
              }

              if (evtEnd <= maxDayInWeek) {
                const match = week.find(w => w.dayNum === evtEnd);
                if (match) colEnd = match.colIndex;
              }

              let rowIndex = 0;
              while (true) {
                if (!occupiedSlots[rowIndex]) {
                  occupiedSlots[rowIndex] = [false, false, false, false, false, false, false];
                }
                let fits = true;
                for (let c = colStart; c <= colEnd; c++) {
                  if (occupiedSlots[rowIndex][c]) {
                    fits = false;
                    break;
                  }
                }
                if (fits) {
                  for (let c = colStart; c <= colEnd; c++) {
                    occupiedSlots[rowIndex][c] = true;
                  }
                  eventRows.push({ evt, colStart, colEnd, rowIndex });
                  break;
                }
                rowIndex++;
              }
            });

            const totalRows = Math.max(1, occupiedSlots.length);
            const totalGridRows = totalRows + 1; // Row 1 is for day numbers, Row 2+ for event bubbles

            return (
              <div key={`week-${wIdx}`} className="grid grid-cols-7 gap-1.5 sm:gap-2 bg-[#1a1b1d] border border-[#2d2f31] rounded-2xl p-2 sm:p-3 relative">
                
                {/* 7 Day Cell Backgrounds (Spanning all rows in this week) */}
                {week.map((wd, colIdx) => {
                  const dayNum = wd.dayNum;
                  if (dayNum === null) {
                    return (
                      <div 
                        key={`empty-${colIdx}`} 
                        style={{ gridColumn: colIdx + 1, gridRow: `1 / span ${totalGridRows}` }}
                        className="bg-[#141517]/30 border border-[#2d2f31]/20 rounded-xl opacity-20 select-none min-h-[90px]"
                      />
                    );
                  }

                  const dayEvts = monthEvents.filter(e => {
                    if (e.day === dayNum) return true;
                    if (e.endDay && dayNum >= e.day && dayNum <= e.endDay) return true;
                    return false;
                  });

                  const isGbLaunchDay = monthName === 'October' && dayNum === 5;

                  return (
                    <div
                      key={`day-${dayNum}`}
                      style={{ gridColumn: colIdx + 1, gridRow: `1 / span ${totalGridRows}` }}
                      onClick={() => {
                        if (dayEvts.length > 0) {
                          setSelectedDayInfo({ month: monthName, day: dayNum, events: dayEvts });
                        }
                      }}
                      className={`rounded-xl p-2 flex flex-col justify-between transition-all cursor-pointer min-h-[90px] sm:min-h-[105px] ${
                        isGbLaunchDay 
                          ? 'bg-[#262230] border-2 border-purple-500 shadow-xl' 
                          : dayEvts.length > 0 
                            ? 'bg-[#202124] border border-[#3c4043] hover:border-purple-400 hover:bg-[#282a2e]' 
                            : 'bg-[#18191c] border border-[#2d2f31]'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full relative z-0">
                        <span className={`text-xs font-black ${
                          isGbLaunchDay ? 'text-white scale-105' : dayEvts.length > 0 ? 'text-zinc-100' : 'text-zinc-500'
                        }`}>
                          {dayNum}
                        </span>

                        {isGbLaunchDay && (
                          <span className="flex items-center gap-0.5 text-[8px] font-black px-1.5 py-0.5 rounded-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05] text-white shadow-sm">
                            <Sparkles className="w-2 h-2" />
                            LAUNCH
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Event Bubbles Placed Directly INSIDE Daily Cells */}
                {eventRows.map(({ evt, colStart, colEnd, rowIndex }) => {
                  const badgeClass = getCategoryBadgeStyle(evt.category, evt.isRainbowLaunch);
                  const isMulti = (evt.endDay || evt.day) > evt.day;

                  return (
                    <div
                      key={`${evt.id}-w${wIdx}`}
                      style={{
                        gridColumn: `${colStart + 1} / ${colEnd + 2}`,
                        gridRow: `${rowIndex + 2}`
                      }}
                      onMouseEnter={() => setHoveredEvent(evt)}
                      onMouseLeave={() => setHoveredEvent(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEvent(evt);
                      }}
                      className={`z-10 my-0.5 self-center text-left text-[10px] sm:text-[11px] font-black py-1 px-2.5 rounded-full transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-between gap-1 cursor-pointer shadow-md mx-1 ${badgeClass}`}
                    >
                      <span className="truncate flex items-center gap-1.5 min-w-0">
                        {evt.isMilestone && <Sparkles className="w-3 h-3 text-yellow-300 shrink-0" />}
                        <span className="truncate leading-tight font-black">{evt.title}</span>
                      </span>
                      {isMulti && (
                        <span className="text-[8px] font-mono uppercase bg-black/40 text-white px-1.5 py-0.2 rounded-full shrink-0">
                          {(evt.endDay || evt.day) - evt.day + 1}d
                        </span>
                      )}
                    </div>
                  );
                })}

              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 w-full animate-fade-in relative">
      
      {/* Top Banner & Control Deck */}
      <div className="bg-[#1e1f20] border border-[#3c4043] rounded-3xl p-5 sm:p-6 shadow-xl space-y-5">
        
        {/* Title Block */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-purple-950/80 text-[#c58af9] border border-purple-800/60 shadow-lg shadow-purple-950/50">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
                    Googlebook Training Execution Roadmap
                  </h1>
                  <span className="hidden sm:inline-flex text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-purple-950/80 text-[#c58af9] border border-purple-800/50 uppercase tracking-widest">
                    Pre &amp; Post Launch
                  </span>
                </div>
                <p className="text-xs text-[#9aa0a6] mt-0.5 font-semibold">
                  Click or hover over any day or event pill to blow up and expand complete execution details.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Legend Bar (Interactive Filters matching Screenshot Legend) */}
        <div className="pt-3 border-t border-[#2d2f31] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#c58af9]" />
              <span>Legend / Filter:</span>
            </span>

            <button
              onClick={() => setSelectedCategory('all')}
              className={`text-xs font-bold px-3 py-1 rounded-full border transition-all ${
                selectedCategory === 'all'
                  ? 'bg-zinc-800 text-white border-zinc-500 shadow-sm'
                  : 'bg-[#202124] text-zinc-400 border-zinc-800 hover:text-white'
              }`}
            >
              All Categories
            </button>

            {/* Chromebook Field Team (Blue) */}
            <button
              onClick={() => setSelectedCategory('chromebook-field')}
              className={`text-xs font-bold px-3 py-1 rounded-full border transition-all flex items-center gap-1.5 ${
                selectedCategory === 'chromebook-field'
                  ? 'bg-[#4285F4] text-white border-[#4285F4] shadow-md'
                  : 'bg-[#202124] text-[#8ab4f8] border-zinc-800 hover:border-[#4285F4]'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4]"></span>
              <span>Chromebook Field Team</span>
            </button>

            {/* Partner Field Team (Red) */}
            <button
              onClick={() => setSelectedCategory('partner-field')}
              className={`text-xs font-bold px-3 py-1 rounded-full border transition-all flex items-center gap-1.5 ${
                selectedCategory === 'partner-field'
                  ? 'bg-[#EA4335] text-white border-[#EA4335] shadow-md'
                  : 'bg-[#202124] text-[#f28b82] border-zinc-800 hover:border-[#EA4335]'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335]"></span>
              <span>Partner Field Team</span>
            </button>

            {/* Partner Head Office (Green) */}
            <button
              onClick={() => setSelectedCategory('partner-head-office')}
              className={`text-xs font-bold px-3 py-1 rounded-full border transition-all flex items-center gap-1.5 ${
                selectedCategory === 'partner-head-office'
                  ? 'bg-[#34A853] text-white border-[#34A853] shadow-md'
                  : 'bg-[#202124] text-[#81c995] border-zinc-800 hover:border-[#34A853]'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]"></span>
              <span>Partner Head Office</span>
            </button>

            {/* Retailer (Yellow) */}
            <button
              onClick={() => setSelectedCategory('retailer')}
              className={`text-xs font-bold px-3 py-1 rounded-full border transition-all flex items-center gap-1.5 ${
                selectedCategory === 'retailer'
                  ? 'bg-[#FBBC05] text-[#202124] border-[#FBBC05] shadow-md'
                  : 'bg-[#202124] text-[#fdd663] border-zinc-800 hover:border-[#FBBC05]'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]"></span>
              <span>Retailer</span>
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search training event..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs bg-[#202124] text-white border border-[#3c4043] rounded-full pl-9 pr-3 py-1.5 focus:border-[#c58af9] focus:outline-none placeholder-zinc-500 font-medium transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Render Calendars */}
      <div className="space-y-6">
        {renderMonthCalendar('September', 'Pre-Launch Training Execution')}
        {renderMonthCalendar('October', 'Launch & Post-Launch Training Execution')}
      </div>

      {/* Floating Instant Hover Tooltip Preview */}
      {hoveredEvent && !selectedEvent && !selectedDayInfo && (
        <div className="fixed bottom-6 right-6 z-40 bg-[#1e1f20] border-2 border-[#c58af9] rounded-2xl p-4 shadow-2xl max-w-sm w-full animate-fade-in pointer-events-none">
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="w-4 h-4 text-[#c58af9]" />
            <span className="text-[10px] font-black uppercase tracking-wider text-[#c58af9]">
              Hover Preview • {hoveredEvent.month} {hoveredEvent.day}{hoveredEvent.endDay ? `-${hoveredEvent.endDay}` : ''}
            </span>
          </div>
          <h4 className="text-base font-black text-white">{hoveredEvent.title}</h4>
          <p className="text-xs text-zinc-200 mt-1 font-semibold line-clamp-2 leading-snug">
            {hoveredEvent.description}
          </p>
          {hoveredEvent.audience && (
            <div className="mt-2 text-[10px] font-bold text-purple-300">
              Audience: {hoveredEvent.audience}
            </div>
          )}
        </div>
      )}

      {/* SINGLE EVENT BLOWN-UP MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-[#1e1f20] border-2 border-purple-500/70 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6 relative">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-5 right-5 p-2.5 text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4">
              <div className={`p-4 rounded-2xl border shadow-lg ${getCategoryBadgeStyle(selectedEvent.category, selectedEvent.isRainbowLaunch)}`}>
                <Sparkles className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-purple-950 text-[#c58af9] border border-purple-800">
                    {selectedEvent.month} {selectedEvent.day}{selectedEvent.endDay ? ` - ${selectedEvent.endDay}` : ''}, 2026
                  </span>
                  <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700">
                    {selectedEvent.category.replace('-', ' ')}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">{selectedEvent.title}</h3>
              </div>
            </div>

            <div className="bg-[#25272a] p-5 sm:p-6 rounded-2xl border border-zinc-700 space-y-4">
              <div>
                <span className="text-xs font-black text-[#c58af9] uppercase tracking-wider block mb-1.5">
                  Full Training Overview &amp; Execution Details
                </span>
                <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
                  {selectedEvent.description}
                </p>
              </div>

              {selectedEvent.audience && (
                <div className="pt-3 border-t border-zinc-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm">
                  <span className="text-zinc-400 font-medium">Target Audience:</span>
                  <span className="font-extrabold text-purple-200">{selectedEvent.audience}</span>
                </div>
              )}

              {selectedEvent.location && (
                <div className="pt-2 border-t border-zinc-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm">
                  <span className="text-zinc-400 font-medium">Location / Channel:</span>
                  <span className="font-extrabold text-[#8ab4f8]">{selectedEvent.location}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-sm font-black px-6 py-3 rounded-full bg-[#c58af9] hover:bg-[#d7aefb] text-[#131314] transition-all shadow-lg"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DAY BLOWN-UP MODAL (WHEN CLICKING ANY CALENDAR DAY CELL) */}
      {selectedDayInfo && !selectedEvent && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-[#1e1f20] border-2 border-purple-500/70 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedDayInfo(null)}
              className="absolute top-5 right-5 p-2.5 text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-[#c58af9]" />
                <span className="text-xs font-black uppercase tracking-wider px-3 py-0.5 rounded-full bg-purple-950 text-[#c58af9] border border-purple-800">
                  Expanded Execution View
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
                {selectedDayInfo.month} {selectedDayInfo.day}, 2026
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-semibold mt-1">
                {selectedDayInfo.events.length} Training Event{selectedDayInfo.events.length > 1 ? 's' : ''} Scheduled
              </p>
            </div>

            <div className="space-y-4">
              {selectedDayInfo.events.map(evt => (
                <div 
                  key={evt.id} 
                  className="bg-[#25272a] p-5 rounded-2xl border border-zinc-700 space-y-3 shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className={`inline-block text-xs font-black px-3 py-1 rounded-full mb-2 ${getCategoryBadgeStyle(evt.category, evt.isRainbowLaunch)}`}>
                        {evt.category.replace('-', ' ').toUpperCase()}
                      </span>
                      <h4 className="text-xl font-black text-white">{evt.title}</h4>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base font-bold text-zinc-200 leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2 border-t border-zinc-700/80 font-bold">
                    {evt.audience && (
                      <div className="text-zinc-300">
                        <span className="text-zinc-500 font-medium">Audience: </span>
                        {evt.audience}
                      </div>
                    )}
                    {evt.location && (
                      <div className="text-[#8ab4f8]">
                        <span className="text-zinc-500 font-medium">Location: </span>
                        {evt.location}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                onClick={() => setSelectedDayInfo(null)}
                className="text-sm font-black px-6 py-3 rounded-full bg-[#c58af9] hover:bg-[#d7aefb] text-[#131314] transition-all shadow-lg"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
