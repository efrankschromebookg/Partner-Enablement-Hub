import React from 'react';
import { Users, Briefcase, GraduationCap, TrendingUp } from 'lucide-react';
import { Partner, RPM } from '../types';

interface HeaderProps {
  partners: Partner[];
  rpms: RPM[];
  onAddPartner: () => void;
}

export default function Header({ partners, rpms, onAddPartner }: HeaderProps) {
  const totalPartners = partners.length;
  const priorityPartnersCount = partners.filter(p => p.tier === 'Priority').length;
  const longtailPartnersCount = partners.filter(p => p.tier === 'Longtail').length;
  
  // Total active projects across all partners
  const totalProjects = partners.reduce((sum, p) => sum + p.projects.filter(proj => proj.status !== 'Completed').length, 0);
  
  // Partners with High Activity
  const highActivityCount = partners.filter(p => p.activityLevel === 'High').length;
  
  // Partner training coverage (partners with at least 1 training engagement)
  const trainedPartnersCount = partners.filter(p => p.trainingEngagements.length > 0).length;
  const trainingCoveragePct = totalPartners > 0 ? Math.round((trainedPartnersCount / totalPartners) * 100) : 0;

  return (
    <div className="w-full">
      {/* Top Brand Navigation Bar */}
      <div className="bg-[#131314] px-6 py-3 border-b border-[#2d2f31] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Authentic Google Wordmark Branding */}
          <div className="flex items-center">
            <span className="text-xl font-extrabold tracking-tight select-none">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span>
            </span>
            <span className="text-[11px] font-bold text-zinc-400 tracking-wider uppercase bg-zinc-800/45 border border-zinc-700/60 px-2 py-0.5 rounded ml-2.5">
              Chromebook Partner Portfolio
            </span>
          </div>
        </div>

        {/* Personalized Session Indicator matching marketing page utility look */}
        <div className="flex items-center gap-3.5">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">RPM Active Operator</span>
            <span className="text-xs text-zinc-300 font-bold">efranks@cb-retail.com</span>
          </div>
          <div className="flex items-center gap-2 bg-[#1e1f20] border border-[#2d2f31] px-3 py-1.5 rounded-full shadow-inner">
            <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse"></span>
            <span className="text-[10px] font-bold text-[#81c995] uppercase tracking-wider">Authorized</span>
          </div>
        </div>
      </div>

      {/* Prominent, Full-Width Iconic Google Rainbow الشريط/Ribbon */}
      <div className="h-[5px] w-full bg-google-rainbow relative z-20"></div>

      <header className="bg-[#1e1f20] border-b border-[#2d2f31] sticky top-0 z-10 px-6 pt-7 pb-8 relative overflow-hidden">
        {/* Soft, professional high-end Google chroma background ambient glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-radial from-[rgba(66,133,244,0.05)] to-transparent pointer-events-none rounded-full blur-3xl"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-[rgba(52,168,83,0.03)] to-transparent pointer-events-none rounded-full blur-3xl col-span-2"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                {/* Authentic Four-Color Indicator Dots */}
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#4285F4]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#EA4335]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#FBBC05]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#34A853]"></span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#9aa0a6] pl-1">
                  Partner Relations &amp; Enablement
                </p>
              </div>
              
              <h1 className="text-2xl md:text-3.5xl font-display font-black tracking-tight text-white">
                RPM &amp; Partner One-Stop
              </h1>

              <p className="text-xs md:text-sm text-[#9aa0a6] hover:text-zinc-300 transition-colors mt-2 leading-relaxed max-w-3xl">
                Centralized Google partner manager for tracking Point of Contacts, webinars, and Chromebook enablement logs in real-time.
              </p>
            </div>
            
            <div className="flex items-center gap-3 shrink-0">
              <button
                id="add-partner-btn"
                onClick={onAddPartner}
                className="inline-flex items-center justify-center gap-2 bg-[#8ab4f8] hover:bg-[#a8c7fa] text-[#131314] font-black text-xs md:text-sm px-6 py-3.5 rounded-full transition-all shadow-md shadow-[rgba(138,180,248,0.2)] hover:scale-[1.015] active:scale-95 cursor-pointer"
              >
                <Users className="w-4 h-4 shrink-0" />
                <span>Register New Corporate Account</span>
              </button>
            </div>
          </div>

          {/* KPI Grid - Beautifully mapped in Chromebook Rainbow Cycle Order */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            
            {/* Card 1: Total Partners - Blue (#4285F4) */}
            <div className="bg-[#202124] p-4.5 rounded-2xl border border-[#3c4043] hover:border-[#4285F4]/60 transition-all duration-300 flex items-start gap-3.5 relative overflow-hidden group hover:translate-y-[-2px] shadow-md">
              <div className="absolute top-0 bottom-0 left-0 w-[4.5px] bg-[#4285F4]"></div>
              <div className="p-2.5 rounded-xl bg-[#4285F4]/10 text-[#4285F4] border border-[#4285F4]/20 group-hover:bg-[#4285F4]/15 transition-colors">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#9aa0a6] block uppercase tracking-wider">Total Partners</span>
                <div className="flex flex-col gap-1.5 mt-1">
                  <span className="text-lg md:text-xl font-black text-white">{totalPartners}</span>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[9px] text-[#8ab4f8] font-semibold bg-[#1a4480]/20 border border-[#8ab4f8]/30 px-1.5 py-0.5 rounded">
                      {priorityPartnersCount} Priority
                    </span>
                    <span className="text-[9px] text-zinc-400 font-semibold bg-[#131314] border border-zinc-700/50 px-1.5 py-0.5 rounded">
                      {longtailPartnersCount} Long-tail
                    </span>
                  </div>
                </div>
              </div>
            </div>
   
            {/* Card 2: Active Projects - Red (#EA4335) */}
            <div className="bg-[#202124] p-4.5 rounded-2xl border border-[#3c4043] hover:border-[#EA4335]/60 transition-all duration-300 flex items-start gap-3.5 relative overflow-hidden group hover:translate-y-[-2px] shadow-md">
              <div className="absolute top-0 bottom-0 left-0 w-[4.5px] bg-[#EA4335]"></div>
              <div className="p-2.5 rounded-xl bg-[#EA4335]/10 text-[#f28b82] border border-[#EA4335]/20 group-hover:bg-[#EA4335]/15 transition-colors">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#9aa0a6] block uppercase tracking-wider">Active Projects</span>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-lg md:text-xl font-black text-white">{totalProjects}</span>
                  <span className="text-[9px] text-[#f28b82] font-black tracking-wide uppercase bg-red-950/40 px-2 py-0.5 rounded border border-red-900/30">Live Sync</span>
                </div>
              </div>
            </div>

            {/* Card 3: High Engagement - Yellow (#FBBC05) */}
            <div className="bg-[#202124] p-4.5 rounded-2xl border border-[#3c4043] hover:border-[#FBBC05]/60 transition-all duration-300 flex items-start gap-3.5 relative overflow-hidden group hover:translate-y-[-2px] shadow-md">
              <div className="absolute top-0 bottom-0 left-0 w-[4.5px] bg-[#FBBC05]"></div>
              <div className="p-2.5 rounded-xl bg-[#FBBC05]/10 text-[#fdd663] border border-[#FBBC05]/20 group-hover:bg-[#FBBC05]/15 transition-colors">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#9aa0a6] block uppercase tracking-wider">High Activity</span>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-lg md:text-xl font-black text-white">{highActivityCount}</span>
                  <span className="text-[10px] text-zinc-400 font-bold bg-[#131314] border border-zinc-700/50 px-1.5 py-0.5 rounded">Accounts</span>
                </div>
              </div>
            </div>

            {/* Card 4: Touchpoint coverage - Green (#34A853) */}
            <div className="bg-[#202124] p-4.5 rounded-2xl border border-[#3c4043] hover:border-[#34A853]/60 transition-all duration-300 flex items-start gap-3.5 relative overflow-hidden group hover:translate-y-[-2px] shadow-md">
              <div className="absolute top-0 bottom-0 left-0 w-[4.5px] bg-[#34A853]"></div>
              <div className="p-2.5 rounded-xl bg-[#34A853]/10 text-[#81c995] border border-[#34A853]/20 group-hover:bg-[#34A853]/15 transition-colors">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#9aa0a6] block uppercase tracking-wider">Training Sync</span>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-lg md:text-xl font-black text-white">{trainingCoveragePct}%</span>
                  <span className="text-[10px] text-zinc-400 font-bold">({trainedPartnersCount}/{totalPartners})</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>
    </div>
  );
}
