import React from 'react';
import { X, Mail, ExternalLink, Calendar, Briefcase, GraduationCap, Check, Building2, Users, MapPin, ShieldCheck } from 'lucide-react';
import { Partner, RPM } from '../types';
import { getFieldTeamInfo } from '../data';

interface PartnerDetailModalProps {
  partner: Partner;
  rpms: RPM[];
  onClose: () => void;
  onUpdatePartner?: (updatedPartner: Partner) => void;
}

export default function PartnerDetailModal({ partner, rpms, onClose }: PartnerDetailModalProps) {
  const currentRpm = rpms.find(r => r.id === partner.rpmId);

  // Quick helper for color coding project state
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-950/40 text-[#81c995] border-[#81c995]/30';
      case 'In Progress': return 'bg-blue-950/40 text-[#8ab4f8] border-[#8ab4f8]/30';
      case 'Stalled': return 'bg-red-950/40 text-[#f28b82] border-[#f28b82]/30';
      case 'Planning': return 'bg-yellow-950/30 text-[#fdd663] border-[#fdd663]/30';
      default: return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  const getActivityBadgeTheme = (level: string) => {
    switch (level) {
      case 'High': return 'bg-red-950/50 text-[#f28b82] border-red-900/30';
      case 'Medium': return 'bg-yellow-950/30 text-[#fdd663] border-yellow-900/30';
      case 'Low': return 'bg-blue-950/40 text-[#8ab4f8] border-blue-900/30';
      default: return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    }
  };

  const fieldTeam = getFieldTeamInfo(partner.name);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in overflow-y-auto">
      <div 
        id="partner-detail-container"
        className="bg-[#131314] text-[#e3e3e3] rounded-3xl border border-[#3c4043] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-[#2d2f31] bg-[#1e1f20] px-6 py-5 flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Google Brand Color Dots */}
            <div className="flex gap-1 mr-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]"></span>
            </div>
            <span className="text-xs font-mono font-bold tracking-wider uppercase px-3 py-0.5 rounded-full bg-red-950/50 text-[#f28b82] border border-red-900/30">
              {partner.tier} Channel
            </span>
            <span className="text-xs font-mono font-bold tracking-wide bg-blue-950/50 text-[#8ab4f8] px-3 py-0.5 border border-blue-900/30 rounded-full">
              {partner.sector || 'Unassigned Sector'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 px-3.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-full transition-colors flex items-center gap-1.5 font-bold text-xs cursor-pointer"
          >
            <X className="w-4 h-4 text-[#f28b82]" />
            <span>Close Workspace</span>
          </button>
        </div>

        {/* Scrollable Container with Two-Column Grid */}
        <div className="overflow-y-auto p-6 md:p-8 flex-1 space-y-8">
          
          {/* Top Panel - Partner Title & Basic Ownership Metadata Details */}
          <div className="bg-[#1e1f20] p-6 rounded-2xl border border-[#3c4043] grid grid-cols-1 md:grid-cols-3 gap-6 relative overflow-hidden">
            {/* Elegant side rainbow glow */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#4285F4] via-[#EA4335] to-[#34A853]"></div>

            <div className="md:col-span-1 border-r border-[#2d2f31] pr-4 pl-1.5">
              <h2 className="text-xl md:text-2xl font-extrabold text-white leading-tight">{partner.name}</h2>
              <p className="text-[10px] text-[#8ab4f8] font-bold font-mono uppercase tracking-wider mt-1.5">Profile Workspace</p>
              
              {/* Sector badge */}
              <div className="mt-4">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#9aa0a6] font-mono mb-1">Sector Class</span>
                <span className="inline-block text-xs font-extrabold text-white bg-[#202124] border border-[#3c4043] px-3 py-1.5 rounded-xl">
                  {partner.sector || 'OEM Hardware'}
                </span>
              </div>
            </div>

            {/* Ownership Detail section */}
            <div className="md:col-span-1 border-r border-[#2d2f31] pr-4">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-[#9aa0a6] font-mono mb-1">RPM Partner Owner</span>
              <p className="text-sm font-extrabold text-white mt-1">{currentRpm?.name || 'Unassigned'}</p>

              {currentRpm && (
                <div className="mt-2.5 flex items-center gap-2">
                  <span className="text-xs text-[#9aa0a6]">Contact:</span>
                  <a href={`mailto:${currentRpm.email}`} className="text-xs font-semibold text-[#8ab4f8] hover:underline flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{currentRpm.email}</span>
                  </a>
                </div>
              )}
            </div>

            {/* Activity parameters display */}
            <div className="md:col-span-1 col-span-1">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-[#9aa0a6] font-mono mb-1.5">Engagement Activity Level</span>
              <span className={`text-xs font-extrabold px-3 py-1.5 rounded-xl border inline-block ${getActivityBadgeTheme(partner.activityLevel)}`}>
                {partner.activityLevel} Activity
              </span>
              <p className="text-[10px] text-zinc-500 mt-2.5 font-mono">Status tracked relative to active Q3 sync meetings.</p>
            </div>
          </div>

          {/* US Field Team Coverage Section */}
          <div className="bg-[#1e1f20] border border-[#3c4043] rounded-2xl p-5 space-y-4 shadow-lg">
            <div className="flex items-center justify-between pb-2 border-b border-[#2d2f31]">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#8ab4f8]" />
                <h3 className="text-sm font-bold text-white">US Field Team &amp; Agency Roster</h3>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                fieldTeam.hasFieldTeam 
                  ? 'bg-blue-950/40 text-[#8ab4f8] border-blue-900/30' 
                  : 'bg-zinc-800 text-zinc-400 border-zinc-700'
              }`}>
                {fieldTeam.hasFieldTeam ? 'Active Field Team' : 'No Field Team'}
              </span>
            </div>

            {fieldTeam.hasFieldTeam ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-[#202124] p-3.5 rounded-xl border border-[#3c4043]/60 space-y-1">
                  <div className="flex items-center gap-1.5 text-zinc-400 font-bold uppercase text-[9.5px] tracking-wider font-mono">
                    <Users className="w-3.5 h-3.5 text-[#81c995]" />
                    <span>3PL Agency &amp; Team Size</span>
                  </div>
                  <p className="font-bold text-white text-sm">{fieldTeam.agency}</p>
                  <p className="text-[#8ab4f8] font-semibold text-[11px]">{fieldTeam.size} Field Reps</p>
                </div>

                <div className="bg-[#202124] p-3.5 rounded-xl border border-[#3c4043]/60 space-y-1">
                  <div className="flex items-center gap-1.5 text-zinc-400 font-bold uppercase text-[9.5px] tracking-wider font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#fdd663]" />
                    <span>Labor Type &amp; Model</span>
                  </div>
                  <p className="font-bold text-white text-sm">{fieldTeam.laborType}</p>
                  <p className="text-zinc-400 font-semibold text-[11px]">Direct Retail Execution</p>
                </div>

                <div className="bg-[#202124] p-3.5 rounded-xl border border-[#3c4043]/60 space-y-1">
                  <div className="flex items-center gap-1.5 text-zinc-400 font-bold uppercase text-[9.5px] tracking-wider font-mono">
                    <MapPin className="w-3.5 h-3.5 text-[#f28b82]" />
                    <span>Doors &amp; LMS Portal</span>
                  </div>
                  <p className="font-bold text-white text-sm">{fieldTeam.doorCoverage}</p>
                  <p className="text-zinc-400 font-medium text-[11px]">LMS: {fieldTeam.lms || 'Internal Portal'}</p>
                </div>
              </div>
            ) : (
              <div className="p-3.5 bg-[#202124] rounded-xl border border-[#3c4043]/60 text-center text-xs">
                <p className="font-bold text-zinc-300">No Dedicated Field Team Operating</p>
                <p className="text-zinc-500 mt-0.5">This channel does not currently maintain a 3PL field team in retail store doors.</p>
              </div>
            )}
          </div>

          {/* Two-Column Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Column 1: Points of Contact & Engagement Logs */}
            <div className="space-y-6">
              <div className="bg-[#1e1f20] border border-[#3c4043] rounded-2xl p-5 space-y-4 shadow-lg">
                <div className="flex items-center justify-between pb-1">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <X className="w-4 h-4 text-[#8ab4f8] rotate-45" /> 
                    <span>Primary Points of Contact</span>
                  </h3>
                  <span className="text-xs bg-zinc-850 text-zinc-300 font-mono font-bold px-2.5 py-0.5 rounded-full border border-zinc-700/50">
                    {partner.pocs.length} Registered
                  </span>
                </div>

                {/* POC detail list */}
                {partner.pocs.length > 0 ? (
                  <div className="space-y-3 pb-1">
                    {partner.pocs.map((poc, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-zinc-700/40 bg-[#202124]">
                        <div>
                          <p className="text-sm font-bold text-white">{poc.name}</p>
                          <div className="flex flex-wrap items-center gap-x-2 text-xs text-zinc-400 mt-1">
                            <a href={`mailto:${poc.email}`} className="text-[#8ab4f8] hover:underline flex items-center gap-1 font-semibold">
                              <Mail className="w-3 h-3" />
                              <span>{poc.email}</span>
                            </a>
                            {poc.role && (
                              <span className="text-zinc-400 font-bold text-[9px] uppercase bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700/40">
                                {poc.role}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 border border-dashed border-zinc-700 bg-[#202124]/40 text-zinc-400 text-xs italic text-center rounded-xl">
                    <p className="font-bold text-zinc-300 mb-0.5">No structured POC data defined currently.</p>
                    <p className="text-zinc-500 font-medium">
                      {partner.rawPocText || "No POC contacts registered."}
                    </p>
                  </div>
                )}
              </div>

              {/* Training Engagements Log Entries */}
              <div className="bg-[#1e1f20] border border-[#3c4043] rounded-2xl p-5 space-y-4 shadow-lg">
                <div className="flex items-center justify-between pb-1">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-[#81c995]" />
                    <span>Training Efforts &amp; Engagement Logs</span>
                  </h3>
                  <span className="text-xs bg-red-950/40 text-[#f28b82] border border-red-900/30 font-mono font-bold px-2.5 py-0.5 rounded-full">
                    {partner.trainingEngagements.length} Touchpoints
                  </span>
                </div>

                {partner.trainingEngagements.length > 0 ? (
                  <div className="space-y-2.5 pb-1">
                    {partner.trainingEngagements.map((eng, idx) => {
                      const { cleanText, url } = (() => {
                        const urlRegex = /(https?:\/\/[^\s]+)/g;
                        const match = eng.match(urlRegex);
                        if (match) {
                          const url = match[0];
                          const cleanText = eng.replace(url, '').replace(/\s*-\s*$/, '').trim();
                          return { cleanText, url };
                        }
                        return { cleanText: eng, url: null };
                      })();

                      return (
                        <div key={idx} className="flex items-start justify-between p-3 rounded-xl border border-zinc-700/40 bg-[#202124] gap-2">
                          <div className="flex items-start gap-2 flex-1 min-w-0">
                            <Check className="w-4 h-4 text-[#81c995] shrink-0 mt-0.5" />
                            <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                              <p className="text-xs text-zinc-300 font-semibold leading-relaxed break-words">{cleanText}</p>
                              {url && (
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  referrerPolicy="no-referrer"
                                  className="inline-flex items-center text-[#81c995] hover:text-[#a2e0b5] transition-colors p-0.5"
                                  title="View doc"
                                >
                                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-4 border border-dashed border-zinc-700 bg-[#202124]/40 text-zinc-500 text-xs italic text-center rounded-xl">
                    No active training touchpoints logged.
                  </div>
                )}
              </div>
            </div>

            {/* Column 2: Projects Sub-Tracker */}
            <div className="bg-[#1e1f20] border border-[#3c4043] rounded-2xl p-5 space-y-4 shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 pb-1">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#81c995]" />
                    <span>Active Enablement Projects</span>
                  </h3>
                  <span className="text-xs bg-[#2d2e30]/80 text-[#81c995] border border-green-900/40 font-mono font-bold px-2.5 py-0.5 rounded-full">
                    {partner.projects.length} Registered
                  </span>
                </div>

                {partner.projects.length > 0 ? (
                  <div className="space-y-4 pb-1">
                    {partner.projects.map((proj) => (
                      <div key={proj.id} className="p-4 rounded-2xl border border-zinc-700/60 bg-[#202124] space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <p className="text-sm font-bold text-white leading-tight">{proj.title}</p>
                            {proj.description && (
                              <p className="text-xs text-[#9aa0a6] leading-relaxed font-semibold">{proj.description}</p>
                            )}
                            
                            {proj.url && (
                              <div className="mt-2.5">
                                <a
                                  href={proj.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  referrerPolicy="no-referrer"
                                  className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#81c995] bg-[#81c995]/10 border border-[#81c995]/20 px-2.5 py-1 rounded-md hover:bg-[#81c995]/20 hover:text-white transition-all cursor-pointer"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  <span>Project Resource Link</span>
                                </a>
                              </div>
                            )}
                          </div>
                          
                          <span className={`text-[10px] font-bold px-2 py-1 rounded-lg border uppercase ${getStatusClass(proj.status)} shrink-0`}>
                            {proj.status}
                          </span>
                        </div>

                        {/* Project Controls */}
                        <div className="flex items-center justify-between border-t border-zinc-700/50 pt-2.5 mt-1">
                          <span className="text-[10px] font-bold text-zinc-500 block flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Updated: {proj.lastUpdated || 'N/A'}</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 border border-dashed border-zinc-700 bg-[#202124]/40 text-zinc-400 text-xs italic text-center rounded-2xl mt-4">
                    No active partner projects tracked currently.
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
