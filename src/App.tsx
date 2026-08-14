import React, { useState, useEffect } from 'react';
import { 
  Search, 
  BookOpen, 
  Grid, 
  TableProperties, 
  Mail, 
  ExternalLink, 
  FileSpreadsheet, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

import { Partner, RPM, TrainingResource } from './types';
import { INITIAL_RPMS, INITIAL_PARTNERS, INITIAL_RESOURCES } from './data';
import Header from './components/Header.tsx';
import PartnerCard from './components/PartnerCard.tsx';
import PartnerDetailModal from './components/PartnerDetailModal.tsx';
import FieldTeamTooltip from './components/FieldTeamTooltip.tsx';
import EnablementHub from './components/EnablementHub.tsx';
import GooglebookTrainingExecution from './components/GooglebookTrainingExecution.tsx';

export default function App() {
  // --- Master State Loads ---
  const [partners, setPartners] = useState<Partner[]>(() => {
    const saved = localStorage.getItem('rpm_partners_v19');
    return saved ? JSON.parse(saved) : INITIAL_PARTNERS;
  });

  const [rpms] = useState<RPM[]>(() => {
    const saved = localStorage.getItem('rpm_rpms_v19');
    return saved ? JSON.parse(saved) : INITIAL_RPMS;
  });

  const [resources] = useState<TrainingResource[]>(() => {
    const saved = localStorage.getItem('rpm_resources_v20');
    return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
  });

  // --- UI Layout / Navigation State ---
  const [activeTab, setActiveTab] = useState<'directory' | 'alignment' | 'enablement' | 'training-execution'>('directory');
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  // --- Filtering State ---
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRpm, setFilterRpm] = useState<string>('all');
  const [filterTier] = useState<string>('all');
  const [filterActivity, setFilterActivity] = useState<string>('all');
  const [filterSector, setFilterSector] = useState<string>('all');

  // --- Save Persistence effects ---
  useEffect(() => {
    localStorage.setItem('rpm_partners_v19', JSON.stringify(partners));
  }, [partners]);

  useEffect(() => {
    localStorage.setItem('rpm_rpms_v19', JSON.stringify(rpms));
  }, [rpms]);

  useEffect(() => {
    localStorage.setItem('rpm_resources_v20', JSON.stringify(resources));
  }, [resources]);

  // --- Search & Filtering Calculation Logic ---
  const activityOrder: Record<string, number> = {
    'High': 1,
    'Medium': 2,
    'Low': 3,
    'Planned': 4,
  };

  const filteredPartners = partners
    .filter(p => {
      // Search query matching (matches partner name, sector, POC names or emails, projects)
      const matchesSearch = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.sector && p.sector.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.pocs.some(poc => 
          poc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          poc.email.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        p.projects.some(proj => proj.title.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesRpm = filterRpm === 'all' || p.rpmId === filterRpm;
      // CRITICAL: Force Priority only for the home directory layout as requested
      const matchesTier = p.tier === 'Priority';
      const matchesActivity = filterActivity === 'all' || p.activityLevel === filterActivity;
      const matchesSector = filterSector === 'all' || p.sector === filterSector;

      return matchesSearch && matchesRpm && matchesTier && matchesActivity && matchesSector;
    })
    .sort((a, b) => {
      const orderA = activityOrder[a.activityLevel] ?? 99;
      const orderB = activityOrder[b.activityLevel] ?? 99;
      return orderA - orderB;
    });

  const handleClearFilters = () => {
    setSearchQuery('');
    setFilterRpm('all');
    setFilterActivity('all');
    setFilterSector('all');
  };

  // Find RPM associated with any ID
  const getRpmById = (id: string) => rpms.find(r => r.id === id);

  return (
    <div className="min-h-screen bg-[#131314] flex flex-col text-[#e3e3e3] font-sans antialiased selection:bg-zinc-800 selection:text-white">
      
      {/* Top Main Navigation / Header Component */}
      <Header 
        partners={partners} 
        rpms={rpms} 
      />

      {/* Primary Tab Switcher Row */}
      <div className="bg-[#1e1f20] border-b border-[#2d2f31] px-6 py-3.5 relative">
        {/* Dynamic laser ribbon for Google Brand Rainbow theme */}
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-google-rainbow opacity-65"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          
          {/* Main Visual Tabs */}
          <div className="flex gap-2 overflow-x-auto py-0.5">
            <button
              onClick={() => setActiveTab('directory')}
              className={`inline-flex items-center gap-2 text-xs md:text-sm font-bold px-4 py-2.5 rounded-full transition-all border ${
                activeTab === 'directory'
                  ? 'bg-zinc-850 text-white border-[#4285F4]/50 shadow-md shadow-[#4285F4]/5'
                  : 'bg-transparent text-[#9aa0a6] border-transparent hover:bg-zinc-800/40 hover:text-white'
              }`}
            >
              <Grid className="w-4 h-4 text-[#4285F4]" />
              <span>Partner Directory</span>
              {activeTab === 'directory' && <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]"></span>}
            </button>

            <button
              id="outlook-tab"
              onClick={() => setActiveTab('alignment')}
              className={`inline-flex items-center gap-2 text-xs md:text-sm font-bold px-4 py-2.5 rounded-full transition-all border ${
                activeTab === 'alignment'
                  ? 'bg-zinc-850 text-white border-[#EA4335]/50 shadow-md shadow-[#EA4335]/5'
                  : 'bg-transparent text-[#9aa0a6] border-transparent hover:bg-zinc-800/40 hover:text-white'
              }`}
            >
              <TableProperties className="w-4 h-4 text-[#EA4335]" />
              <span>Individual Account Outlook</span>
              {activeTab === 'alignment' && <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]"></span>}
            </button>

            <button
              onClick={() => setActiveTab('enablement')}
              className={`inline-flex items-center gap-2 text-xs md:text-sm font-bold px-4 py-2.5 rounded-full transition-all border ${
                activeTab === 'enablement'
                  ? 'bg-zinc-850 text-white border-[#34A853]/50 shadow-md shadow-[#34A853]/5'
                  : 'bg-transparent text-[#9aa0a6] border-transparent hover:bg-zinc-800/40 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#34A853]" />
              <span>Enablement Assets Hub</span>
              {activeTab === 'enablement' && <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]"></span>}
            </button>

            <button
              onClick={() => setActiveTab('training-execution')}
              className={`inline-flex items-center gap-2 text-xs md:text-sm font-bold px-4 py-2.5 rounded-full transition-all border ${
                activeTab === 'training-execution'
                  ? 'bg-zinc-850 text-white border-[#c58af9]/50 shadow-md shadow-[#c58af9]/5'
                  : 'bg-transparent text-[#9aa0a6] border-transparent hover:bg-zinc-800/40 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#c58af9]" />
              <span>Googlebook Training Execution</span>
              {activeTab === 'training-execution' && <span className="w-1.5 h-1.5 rounded-full bg-[#c58af9]"></span>}
            </button>
          </div>
        </div>
      </div>


      {/* Main Dynamic View Area */}
      <main className="flex-grow p-6">
        <div className="max-w-7xl mx-auto">
          
          {/* TAB 1: PARTNER DIRECTORY WORKSPACE */}
          {activeTab === 'directory' && (
            <div className="space-y-6 w-full animate-fade-in">
              {/* Sleek horizontal header & search bar strip */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#1e1f20] border border-[#3c4043] rounded-2xl p-5 shadow-lg">
                <div className="space-y-1">
                  <h4 className="text-xs md:text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8ab4f8]"></span>
                    <span>Priority Mapped Partners Workspace</span>
                  </h4>
                  <p className="text-[11px] text-zinc-400 font-semibold">
                    Showing {filteredPartners.length} of {partners.filter(p => p.tier === 'Priority').length} Priority Channel Accounts
                  </p>
                </div>
                
                {/* Horizontal Search & Reset Controls */}
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  <div className="relative w-full md:w-72">
                    <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search accounts, POC name, project title..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full text-xs bg-[#202124] text-white border border-[#3c4043] rounded-full pl-9 pr-3 py-2.5 focus:border-[#8ab4f8] focus:outline-none placeholder-zinc-500 font-medium transition-colors"
                    />
                  </div>
                  { (searchQuery || filterRpm !== 'all' || filterActivity !== 'all' || filterSector !== 'all') && (
                    <button 
                      onClick={handleClearFilters}
                      className="text-[10px] text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 px-4 py-2.5 rounded-full border border-[#3c4043] font-bold uppercase tracking-wider transition-all"
                    >
                      Reset Workspace
                    </button>
                  )}
                </div>
              </div>

              {/* Main Directory grid list */}
              <div className="space-y-4">
                {filteredPartners.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredPartners.map(p => {
                      const rpm = getRpmById(p.rpmId);
                      return (
                        <PartnerCard
                          key={p.id}
                          partner={p}
                          rpm={rpm}
                          onSelect={(pt) => setSelectedPartner(pt)}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-[#1e1f20] border border-[#3c4043] border-dashed rounded-2xl p-12 text-center text-zinc-400 space-y-4 max-w-xl mx-auto">
                    <div className="p-3.5 bg-[#202124] rounded-full inline-block text-[#8ab4f8]">
                      <Search className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-bold text-white">No active corporate matches found.</p>
                    <p className="text-xs text-[#9aa0a6]">Try loosening your search terms or resetting the workspace baseline setup.</p>
                    <button
                      onClick={handleClearFilters}
                      className="inline-flex justify-center bg-[#8ab4f8] hover:bg-[#a8c7fa] text-[#131314] font-bold text-xs px-4 py-2 rounded-full transition-all"
                    >
                      Clear Active Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: INDIVIDUAL ACCOUNT OUTLOOK SPREADSHEET TABLE */}
          {activeTab === 'alignment' && (
            <div className="bg-[#1e1f20] border border-[#3c4043] rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-[#2d2f31] bg-[#1e1f20] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-[#81c995]" />
                    <span>Individual Account Outlook</span>
                  </h2>
                  <p className="text-xs text-[#9aa0a6] mt-1">
                    Complete live roster detailing priority partner assignments, key alignment initiatives, and Regional Partner Manager (RPM) ownership. <span className="text-[#8ab4f8] font-semibold">Hover over any account to view US Field Team coverage.</span>
                  </p>
                </div>
                
                <div className="text-xs font-bold px-3 py-1.5 bg-zinc-800 text-zinc-300 border border-zinc-700/60 rounded-full">
                  Updated: <span className="font-extrabold text-[#81c995] uppercase tracking-wide">Q3 2026 Active Sync</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse table-auto">
                  <thead>
                    <tr className="bg-[#202124] text-[11px] font-bold uppercase tracking-wider text-[#9aa0a6] border-b border-[#2d2f31]">
                      <th className="py-4 px-6 border-r border-[#2d2f31] w-1/5">RPM Owner Lead</th>
                      <th className="py-4 px-6 border-r border-[#2d2f31] w-2/5">Priority Channel Engagements</th>
                      <th className="py-4 px-6 border-r border-[#2d2f31] w-2/5">Key Longtail Alignments</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2d2f31] text-sm">
                    {rpms.map((rpm) => {
                      // Grab live partner profiles matching priority names owned by this RPM
                      const rpmPriorityPartners = partners.filter(p => p.rpmId === rpm.id && p.tier === 'Priority');
                      const rpmLongtailNames = partners.filter(p => p.rpmId === rpm.id && p.tier === 'Longtail').map(p => p.name);

                      return (
                        <tr key={rpm.id} className="hover:bg-zinc-800/10 transition-colors align-top">
                          
                          {/* Col 1: RPM profile details */}
                          <td className="py-5 px-6 border-r border-[#2d2f31]">
                            <div className="space-y-1">
                              <p className="font-extrabold text-white text-base">{rpm.name}</p>
                              <a 
                                href={`mailto:${rpm.email}`} 
                                className="inline-flex items-center gap-1 text-xs font-medium text-[#8ab4f8] hover:underline"
                              >
                                <Mail className="w-3.5 h-3.5" />
                                <span>{rpm.email || 'rpms@cb-retail.com'}</span>
                              </a>
                            </div>

                            <div className="mt-4">
                              <a
                                href={rpm.driveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                referrerPolicy="no-referrer"
                                className="inline-flex items-center gap-1.5 text-xs text-zinc-300 font-bold bg-[#202124] border border-zinc-700/80 hover:border-zinc-500 hover:text-white px-3.5 py-1.5 rounded-full transition-all"
                              >
                                <span className="w-1.5 h-1.5 bg-[#81c995] rounded-full"></span>
                                <span>Drive Workspace</span>
                                <ExternalLink className="w-3 h-3 text-zinc-500" />
                              </a>
                            </div>
                          </td>

                          {/* Col 2: Priority accounts list with embedded live actions and projects */}
                          <td className="py-5 px-6 border-r border-[#2d2f31] space-y-4">
                            {rpmPriorityPartners.length > 0 ? (
                              <div className="space-y-3.5">
                                {rpmPriorityPartners.map(p => {
                                  const allProjects = p.projects;
                                  return (
                                    <FieldTeamTooltip key={p.id} partnerName={p.name} className="w-full">
                                      <div 
                                        onClick={() => setSelectedPartner(p)}
                                        className="group border border-[#3c4043]/80 rounded-2xl p-4 bg-[#202124] hover:border-[#8ab4f8] transition-all cursor-pointer shadow-sm shadow-[rgba(0,0,0,0.1)] w-full text-left"
                                      >
                                        <div className="flex items-center justify-between mb-2">
                                          <p className="font-extrabold text-white group-hover:text-[#8ab4f8] transition-colors flex items-center gap-1 text-sm">
                                            <span>{p.name}</span>
                                            <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:translate-x-0.5 transition-transform" />
                                          </p>
                                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${
                                            p.activityLevel === 'High' ? 'bg-red-950/50 text-[#f28b82] border-red-900/30' :
                                            p.activityLevel === 'Medium' ? 'bg-yellow-950/30 text-[#fdd663] border-yellow-900/30' :
                                            'bg-zinc-800 text-zinc-400 border-zinc-700'
                                          }`}>
                                            {p.activityLevel} Activity
                                          </span>
                                        </div>

                                        {/* Contacts brief list */}
                                        {p.pocs.length > 0 ? (
                                          <div className="text-zinc-400 text-xs leading-relaxed mt-1">
                                            <span className="font-bold text-zinc-500 uppercase text-[9px] tracking-wider block mb-0.5">Point of Contacts</span>
                                            <p className="truncate text-zinc-300 font-semibold">
                                              {p.pocs.map(poc => `${poc.name}`).join(', ')}
                                            </p>
                                          </div>
                                        ) : (
                                          <span className="text-xs text-zinc-500 italic block mt-1">
                                            POC: {p.rawPocText || 'No POC defined'}
                                          </span>
                                        )}

                                        {/* Projects embedded list */}
                                        {allProjects.length > 0 && (
                                          <div className="mt-3 pt-3 border-t border-[#2e3033]">
                                            <span className="text-[9px] tracking-normal uppercase font-bold text-[#81c995] block mb-1.5">
                                              Live Assignments &amp; Initiatives ({allProjects.length})
                                            </span>
                                            <ul className="space-y-1">
                                              {allProjects.map(proj => (
                                                <li key={proj.id} className="text-xs text-zinc-300 flex items-center gap-1.5 truncate font-semibold">
                                                  <span className={`w-1.5 h-1.5 rounded-full ${
                                                    proj.status === 'Completed' ? 'bg-[#81c995]' :
                                                    proj.status === 'Stalled' ? 'bg-[#f28b82]' :
                                                    proj.status === 'Planning' ? 'bg-[#fdd663]' :
                                                    'bg-[#8ab4f8]'
                                                  }`}></span>
                                                  <span className="truncate">{proj.title}</span>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        )}
                                      </div>
                                    </FieldTeamTooltip>
                                  );
                                })}
                              </div>
                            ) : (
                              <p className="text-xs text-zinc-500 italic font-semibold">No Priority partners defined currently.</p>
                            )}
                          </td>

                          {/* Col 3: Key longtail accounts roster */}
                          <td className="py-5 px-6">
                            {rpmLongtailNames.length > 0 ? (
                              <div className="flex flex-wrap gap-2 max-w-sm">
                                {partners
                                  .filter(p => p.rpmId === rpm.id && p.tier === 'Longtail')
                                  .map(p => (
                                    <FieldTeamTooltip key={p.id} partnerName={p.name}>
                                      <span
                                        onClick={() => setSelectedPartner(p)}
                                        className="inline-block text-xs bg-zinc-800/80 hover:bg-zinc-850 text-zinc-300 font-bold px-3 py-1.5 rounded-full border border-zinc-700/80 hover:border-[#8ab4f8] transition-colors cursor-pointer"
                                      >
                                        {p.name}
                                      </span>
                                    </FieldTeamTooltip>
                                  ))}
                              </div>
                            ) : (
                              <p className="text-xs text-zinc-500 italic font-semibold">No longtail accounts mapped.</p>
                            )}
                          </td>

                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ENABLEMENT ASSETS HUB */}
          {activeTab === 'enablement' && (
            <EnablementHub
              resources={resources}
            />
          )}

          {/* TAB 4: GOOGLEBOOK TRAINING EXECUTION */}
          {activeTab === 'training-execution' && (
            <GooglebookTrainingExecution />
          )}

        </div>
      </main>

      {/* --- Detail Overlay Slide-Over Modal --- */}
      {selectedPartner && (
        <PartnerDetailModal
          partner={selectedPartner}
          rpms={rpms}
          onClose={() => setSelectedPartner(null)}
        />
      )}

      {/* Corporate platform footer */}
      <footer className="bg-[#1e1f20] border-t border-[#2d2f31] text-center py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-medium">
          <p>© 2026 Retail & Channel Partnership Enablement Command. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-zinc-300 transition-colors">RPM &amp; Account Command Center</span>
            <span>•</span>
            <span className="hover:text-zinc-300 transition-colors">EF View Live</span>
          </div>
        </div>
      </footer>


    </div>
  );
}
