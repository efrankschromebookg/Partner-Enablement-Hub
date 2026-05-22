import React from 'react';
import { User, Briefcase, GraduationCap, Copy, Check, Mail, ExternalLink } from 'lucide-react';
import { Partner, RPM } from '../types';

interface PartnerCardProps {
  key?: string;
  partner: Partner;
  rpm: RPM | undefined;
  onSelect: (partner: Partner) => void;
}

export default function PartnerCard({ partner, rpm, onSelect }: PartnerCardProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopyEmail = (e: React.MouseEvent, email: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getRpmAvatarColor = (color: string | undefined) => {
    switch (color) {
      case 'indigo': return 'bg-blue-950/60 text-[#8ab4f8] border-blue-800/40';
      case 'emerald': return 'bg-green-950/60 text-[#81c995] border-green-800/40';
      case 'amber': return 'bg-yellow-950/40 text-[#fdd663] border-yellow-800/40';
      case 'rose': return 'bg-red-950/60 text-[#f28b82] border-red-800/40';
      default: return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  const getActivityBadgeTheme = (level: string) => {
    switch (level) {
      case 'High': return 'bg-red-950/50 text-[#f28b82] border-[#f28b82]/30';
      case 'Medium': return 'bg-yellow-950/30 text-[#fdd663] border-[#fdd663]/30';
      case 'Low': return 'bg-zinc-800/60 text-zinc-400 border-zinc-700/60';
      default: return 'bg-blue-950/50 text-[#8ab4f8] border-[#8ab4f8]/30';
    }
  };

  const activeProjectsCount = partner.projects.filter(p => p.status !== 'Completed').length;
  const completedProjectsCount = partner.projects.filter(p => p.status === 'Completed').length;

  return (
    <div
      id={`partner-card-${partner.id}`}
      onClick={() => onSelect(partner)}
      className="group bg-[#1e1f20] rounded-2xl border border-[#3c4043] p-5 hover:border-[#8ab4f8] hover:shadow-xl hover:shadow-[rgba(138,180,248,0.06)] transition-all duration-300 cursor-pointer flex flex-col justify-between h-full relative overflow-hidden"
    >
      {/* Interactive Google Rainbow Laser Ribbon (Revealed on Hover) */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-google-rainbow opacity-30 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div>
        {/* Tier & Sector Badge Header */}
        <div className="flex items-center justify-between mb-4">
          <span className={`text-[10px] tracking-wider font-bold uppercase px-2.5 py-0.5 rounded-full border ${
            partner.tier === 'Priority' ? 'bg-red-950/50 text-[#f28b82] border-red-800/40' : 'bg-zinc-800/60 text-zinc-400 border-zinc-700/40'
          }`}>
            {partner.tier} Channel
          </span>
          
          <div className="flex items-center gap-1.5">
            {partner.sector && (
              <span className="text-[10px] font-semibold text-zinc-300 bg-[#2d2e30] border border-[#3c4043] px-2 py-0.5 rounded">
                {partner.sector}
              </span>
            )}
            <span className={`text-[10px] font-semibold px-2 py-0.5 border rounded ${getActivityBadgeTheme(partner.activityLevel)}`}>
              {partner.activityLevel} Activity
            </span>
          </div>
        </div>

        {/* Partner Name & RPM assignment */}
        <div className="mb-4">
          <h3 className="text-base md:text-lg font-bold text-white group-hover:text-[#8ab4f8] transition-colors leading-tight">
            {partner.name}
          </h3>
          
          {rpm && (
            <div className="inline-flex items-center gap-1.5 mt-2 text-xs text-[#9aa0a6] bg-[#2d2e30]/60 py-1 pl-1 pr-2.5 rounded-full border border-zinc-700/50">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-extrabold border ${getRpmAvatarColor(rpm.avatarColor)}`}>
                {rpm.name.split(' ').map(n => n[0]).join('')}
              </span>
              <span className="font-semibold text-zinc-300">RPM Owner: {rpm.name}</span>
            </div>
          )}
        </div>

        {/* POC Summary */}
        <div className="border-t border-b border-[#2d2f31] py-3.5 my-4 space-y-2.5">
          <p className="text-[10px] font-bold text-[#9aa0a6] uppercase tracking-wider">
            Points of Contact
          </p>
          
          {partner.pocs.length > 0 ? (
            <div className="space-y-2">
              {partner.pocs.slice(0, 2).map((poc, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2 text-xs bg-[#202124] p-2 rounded-xl border border-zinc-700/40">
                  <div className="truncate max-w-[155px]">
                    <span className="font-bold text-[#e3e3e3] block truncate">{poc.name}</span>
                    {poc.role && <span className="text-[10px] text-[#9aa0a6] block truncate">{poc.role}</span>}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <button
                      title={`Copy ${poc.email}`}
                      onClick={(e) => handleCopyEmail(e, poc.email)}
                      className="p-1 hover:bg-[#2d2e30] text-zinc-500 hover:text-white rounded-lg transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-[#81c995]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <a
                      href={`mailto:${poc.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="p-1 hover:bg-[#2d2e30] text-zinc-500 hover:text-white rounded-lg transition-colors"
                      title={`Email ${poc.name}`}
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
              {partner.pocs.length > 2 && (
                <p className="text-[11px] text-zinc-500 italic text-center font-medium">
                  + {partner.pocs.length - 2} more Point of Contacts
                </p>
              )}
            </div>
          ) : (
            <p className="text-xs font-medium text-zinc-400 italic bg-[#202124] p-2 rounded-xl border border-zinc-800">
              {partner.rawPocText || 'No point of contacts registered'}
            </p>
          )}
        </div>
      </div>

      {/* Metrics Row footer */}
      <div className="flex items-center justify-between text-xs text-[#9aa0a6] mt-1 pt-1">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1" title={`${activeProjectsCount} active projects`}>
            <Briefcase className="w-4 h-4 text-zinc-500" />
            <span className="font-semibold text-zinc-200">{activeProjectsCount}</span>
            {completedProjectsCount > 0 && (
              <span className="text-[9px] text-[#81c995]">({completedProjectsCount} ✓)</span>
            )}
          </div>

          <div className="flex items-center gap-1" title={`${partner.trainingEngagements.length} training engagements`}>
            <GraduationCap className="w-4 h-4 text-zinc-500" />
            <span className="font-semibold text-zinc-200">{partner.trainingEngagements.length}</span>
          </div>
        </div>

        <span className="text-[11px] font-bold text-[#8ab4f8] inline-flex items-center gap-0.5 group-hover:translate-x-1 transition-all">
          Manage &rarr;
        </span>
      </div>
    </div>
  );
}
