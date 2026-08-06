import React, { useState, useRef } from 'react';
import { Building2, Users, Briefcase, MapPin, GraduationCap, ShieldAlert, ShieldCheck } from 'lucide-react';
import { getFieldTeamInfo } from '../data';

interface FieldTeamTooltipProps {
  key?: string;
  partnerName: string;
  children: React.ReactNode;
  className?: string;
}

export default function FieldTeamTooltip({ partnerName, children, className = '' }: FieldTeamTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number; position: 'above' | 'below' }>({ top: 0, left: 0, position: 'above' });
  const triggerRef = useRef<HTMLDivElement>(null);
  const fieldTeam = getFieldTeamInfo(partnerName);

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const popoverHeight = 240; // estimated height
      const popoverWidth = 320;
      
      let top = rect.top - popoverHeight - 8;
      let position: 'above' | 'below' = 'above';

      // If not enough space above, position below
      if (rect.top < popoverHeight + 20) {
        top = rect.bottom + 8;
        position = 'below';
      }

      // Center horizontally relative to trigger, but keep within viewport bounds
      let left = rect.left + rect.width / 2 - popoverWidth / 2;
      if (left < 12) left = 12;
      if (left + popoverWidth > window.innerWidth - 12) {
        left = window.innerWidth - popoverWidth - 12;
      }

      setCoords({ top, left, position });
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-block ${className}`}
    >
      {children}

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: `${coords.top}px`,
            left: `${coords.left}px`,
            zIndex: 9999,
          }}
          className="w-[320px] bg-[#18191b] border border-[#3c4043] rounded-2xl p-4 shadow-2xl shadow-black/80 text-left pointer-events-none animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#2d2f31]">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#8ab4f8]/10 text-[#8ab4f8]">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-white leading-none">{partnerName}</h4>
                <p className="text-[10px] text-zinc-400 font-semibold mt-0.5">US Partner Field Team</p>
              </div>
            </div>

            {fieldTeam?.hasFieldTeam ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-950/70 text-[#81c995] border border-emerald-800/40">
                <ShieldCheck className="w-3 h-3" />
                Active FT
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                <ShieldAlert className="w-3 h-3 text-amber-400" />
                No FT
              </span>
            )}
          </div>

          {/* Details Body */}
          {fieldTeam ? (
            fieldTeam.hasFieldTeam ? (
              <div className="space-y-2.5 text-xs">
                {/* 3PL Agency & Field Team Size */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#202124] p-2 rounded-xl border border-zinc-800">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-0.5">
                      <Building2 className="w-3 h-3 text-[#8ab4f8]" />
                      <span>3PL Agency</span>
                    </div>
                    <p className="font-bold text-zinc-200 truncate">{fieldTeam.agency}</p>
                  </div>

                  <div className="bg-[#202124] p-2 rounded-xl border border-zinc-800">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-0.5">
                      <Users className="w-3 h-3 text-[#fdd663]" />
                      <span>FT Size</span>
                    </div>
                    <p className="font-bold text-zinc-200 truncate">{fieldTeam.size} Reps</p>
                  </div>
                </div>

                {/* Labor Type */}
                <div className="bg-[#202124] p-2 rounded-xl border border-zinc-800">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-0.5">
                    <Briefcase className="w-3 h-3 text-[#f28b82]" />
                    <span>Labor Type</span>
                  </div>
                  <p className="font-semibold text-zinc-300 leading-snug">{fieldTeam.laborType}</p>
                </div>

                {/* Retailer Reach & Door Coverage */}
                <div className="bg-[#202124] p-2 rounded-xl border border-zinc-800">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-0.5">
                    <MapPin className="w-3 h-3 text-[#81c995]" />
                    <span>Retailer Reach & Doors</span>
                  </div>
                  <p className="font-semibold text-zinc-300 leading-snug">{fieldTeam.doorCoverage}</p>
                </div>

                {/* LMS for RSAs */}
                <div className="bg-[#202124] p-2 rounded-xl border border-zinc-800">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-0.5">
                    <GraduationCap className="w-3 h-3 text-[#c58af9]" />
                    <span>LMS (for RSAs)</span>
                  </div>
                  <p className="font-semibold text-zinc-300 truncate">{fieldTeam.lms}</p>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-[#202124] rounded-xl border border-zinc-800 text-center">
                <p className="text-xs font-bold text-zinc-300">No Dedicated Field Team (No FT)</p>
                <p className="text-[11px] text-zinc-400 mt-1">This partner does not currently operate an active 3PL field team in retail stores.</p>
              </div>
            )
          ) : (
            <div className="p-3 bg-[#202124] rounded-xl border border-zinc-800 text-center">
              <p className="text-xs font-semibold text-zinc-400">Field Team data not explicitly defined for this partner channel.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
