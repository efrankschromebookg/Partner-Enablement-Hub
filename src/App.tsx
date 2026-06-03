import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Briefcase, 
  GraduationCap, 
  Search, 
  Filter, 
  Plus, 
  Check, 
  X, 
  BookOpen, 
  Grid, 
  TableProperties, 
  TrendingUp, 
  Mail, 
  ExternalLink, 
  FileSpreadsheet, 
  RefreshCw,
  Clock,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

import { Partner, RPM, TrainingResource, PartnerProject } from './types';
import { INITIAL_RPMS, INITIAL_PARTNERS, INITIAL_RESOURCES } from './data';
import Header from './components/Header.tsx';
import PartnerCard from './components/PartnerCard.tsx';
import PartnerDetailModal from './components/PartnerDetailModal.tsx';
import AddPartnerModal from './components/AddPartnerModal.tsx';
import EnablementHub from './components/EnablementHub.tsx';

export default function App() {
  // --- Master State Loads ---
  const [partners, setPartners] = useState<Partner[]>(() => {
    const saved = localStorage.getItem('rpm_partners');
    if (saved) {
      const parsed: Partner[] = JSON.parse(saved);
      const partnersToMove = ['samsung', 'mediatek', 'amd', 'qualcomm'];
      let migrationNeeded = false;
      const migrated = parsed.map(p => {
        if (partnersToMove.includes(p.id.toLowerCase()) && p.tier !== 'Longtail') {
          migrationNeeded = true;
          return { ...p, tier: 'Longtail' as const };
        }
        if (p.id.toLowerCase() === 'walmart' && p.tier !== 'Priority') {
          migrationNeeded = true;
          return { ...p, tier: 'Priority' as const };
        }
        return p;
      });
      if (migrationNeeded) {
        localStorage.setItem('rpm_partners', JSON.stringify(migrated));
        return migrated;
      }
      return parsed;
    }
    return INITIAL_PARTNERS;
  });

  const [rpms, setRpms] = useState<RPM[]>(() => {
    const saved = localStorage.getItem('rpm_rpms');
    if (saved) {
      const parsed: RPM[] = JSON.parse(saved);
      const partnersToMove = ['Samsung', 'MediaTek', 'AMD', 'Qualcomm'];
      let migrationNeeded = false;
      const migrated = parsed.map(r => {
        let finalEmail = r.email;
        let changedEmail = false;
        if (r.email && r.email.endsWith('@cb-retail.com')) {
          finalEmail = r.email.replace('@cb-retail.com', '@google.com');
          changedEmail = true;
          migrationNeeded = true;
        }
        const intersection = r.priorityPartners.filter(p => partnersToMove.includes(p));
        let updatedPriority = [...r.priorityPartners];
        let updatedLongtail = [...r.longtailPartners];
        
        if (intersection.length > 0) {
          migrationNeeded = true;
          updatedPriority = updatedPriority.filter(p => !partnersToMove.includes(p));
          const addedLongtail = intersection.filter(p => !updatedLongtail.includes(p));
          updatedLongtail = [...updatedLongtail, ...addedLongtail];
        }

        if (r.id === 'ren-laurenceau') {
          if (!updatedPriority.includes('Walmart') || updatedLongtail.includes('Walmart')) {
            migrationNeeded = true;
            updatedPriority = [...updatedPriority.filter(p => p !== 'Walmart'), 'Walmart'];
            updatedLongtail = updatedLongtail.filter(p => p !== 'Walmart');
          }
        }

        if (intersection.length > 0 || changedEmail || r.id === 'ren-laurenceau') {
          return {
            ...r,
            email: finalEmail,
            priorityPartners: updatedPriority,
            longtailPartners: updatedLongtail
          };
        }
        return r;
      });
      if (migrationNeeded) {
        localStorage.setItem('rpm_rpms', JSON.stringify(migrated));
        return migrated;
      }
      return parsed;
    }
    return INITIAL_RPMS;
  });

  const [resources, setResources] = useState<TrainingResource[]>(() => {
    const saved = localStorage.getItem('rpm_resources');
    return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
  });

  // --- UI Layout / Navigation State ---
  const [activeTab, setActiveTab] = useState<'directory' | 'alignment' | 'enablement'>('directory');
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [showAddPartner, setShowAddPartner] = useState(false);

  // --- Filtering State ---
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRpm, setFilterRpm] = useState<string>('all');
  const [filterTier, setFilterTier] = useState<string>('all');
  const [filterActivity, setFilterActivity] = useState<string>('all');
  const [filterSector, setFilterSector] = useState<string>('all');

  // --- Save Persistence effects ---
  useEffect(() => {
    localStorage.setItem('rpm_partners', JSON.stringify(partners));
  }, [partners]);

  useEffect(() => {
    localStorage.setItem('rpm_rpms', JSON.stringify(rpms));
  }, [rpms]);

  useEffect(() => {
    localStorage.setItem('rpm_resources', JSON.stringify(resources));
  }, [resources]);

  // --- State Reset Utility ---
  const handleResetToSeedData = () => {
    if (window.confirm('Are you sure you want to restore the platform to the baseline 2026 spreadsheet data? This overrides any custom modifications.')) {
      setPartners(INITIAL_PARTNERS);
      setRpms(INITIAL_RPMS);
      setResources(INITIAL_RESOURCES);
      localStorage.clear();
      alert('Baseline loaded successfully!');
    }
  };

  // --- Partner Mutation actions ---
  const handleAddPartner = (newPartner: Partner) => {
    setPartners(prev => [newPartner, ...prev]);
    // update RPM prioritizers just in case
    const updatedRpms = rpms.map(r => {
      if (r.id === newPartner.rpmId) {
        return {
          ...r,
          priorityPartners: newPartner.tier === 'Priority' 
            ? [...r.priorityPartners, newPartner.name]
            : r.priorityPartners,
          longtailPartners: newPartner.tier === 'Longtail'
            ? [...r.longtailPartners, newPartner.name]
            : r.longtailPartners
        };
      }
      return r;
    });
    setRpms(updatedRpms);
  };

  const handleUpdatePartner = (updatedPartner: Partner) => {
    setPartners(prev => prev.map(p => p.id === updatedPartner.id ? updatedPartner : p));
    
    // Also update active selection so modal renders with refreshed state
    if (selectedPartner && selectedPartner.id === updatedPartner.id) {
      setSelectedPartner(updatedPartner);
    }
  };

  const handleAddResource = (newRes: TrainingResource) => {
    setResources(prev => [newRes, ...prev]);
  };

  const handleDeleteResource = (id: string) => {
    setResources(prev => prev.filter(r => r.id !== id));
  };

  // --- Search & Filtering Calculation Logic ---
  const filteredPartners = partners.filter(p => {
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
  });

  const handleClearFilters = () => {
    setSearchQuery('');
    setFilterRpm('all');
    setFilterTier('all');
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
        onAddPartner={() => setShowAddPartner(true)} 
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
          </div>

          {/* Reset button to baseline with elegant dark theme styles */}
          <button
            onClick={handleResetToSeedData}
            className="inline-flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 hover:text-white bg-[#202124] hover:bg-zinc-800 px-4 py-2.5 rounded-full border border-[#3c4043] transition-all"
            title="Reset to 2026 spreadsheet snapshot baseline"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#FBBC05]" />
            <span>Reset Baseline Snapshot</span>
          </button>
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
                    Complete live roster detailing priority partner assignments, key alignment initiatives, and Regional Partner Manager (RPM) ownership.
                  </p>
                </div>
                
                <div className="text-xs font-bold px-3 py-1.5 bg-zinc-800 text-zinc-300 border border-zinc-700/60 rounded-full">
                  Updated: <span className="font-extrabold text-[#81c995] uppercase tracking-wide">Q2 2026 Active Sync</span>
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
                                referrerPolicy="no-referrer"
                                className="inline-flex items-center gap-1.5 text-xs text-zinc-300 font-bold bg-[#202124] border border-zinc-700/80 hover:border-zinc-500 hover:text-white px-3.5 py-1.5 rounded-full transition-all"
                              >
                                <span className="w-1.5 h-1.5 bg-[#fdd663] rounded-full"></span>
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
                                  const pendingProjects = p.projects.filter(proj => proj.status !== 'Completed');
                                  return (
                                    <div 
                                      key={p.id}
                                      onClick={() => setSelectedPartner(p)}
                                      className="group border border-[#3c4043]/80 rounded-2xl p-4 bg-[#202124] hover:border-[#8ab4f8] transition-all cursor-pointer shadow-sm shadow-[rgba(0,0,0,0.1)]"
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
                                      {pendingProjects.length > 0 && (
                                        <div className="mt-3 pt-3 border-t border-[#2e3033]">
                                          <span className="text-[9px] tracking-normal uppercase font-bold text-[#81c995] block mb-1.5">
                                            Live Alignments ({pendingProjects.length})
                                          </span>
                                          <ul className="space-y-1">
                                            {pendingProjects.map(proj => (
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
                                    <span
                                      key={p.id}
                                      onClick={() => setSelectedPartner(p)}
                                      className="text-xs bg-zinc-800/80 hover:bg-zinc-850 text-zinc-300 font-bold px-3 py-1.5 rounded-full border border-zinc-700/80 hover:border-[#8ab4f8] transition-colors cursor-pointer"
                                    >
                                      {p.name}
                                    </span>
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
              onAddResource={handleAddResource}
              onDeleteResource={handleDeleteResource}
            />
          )}

        </div>
      </main>

      {/* --- Detail Overlay Slide-Over Modal --- */}
      {selectedPartner && (
        <PartnerDetailModal
          partner={selectedPartner}
          rpms={rpms}
          onClose={() => setSelectedPartner(null)}
          onUpdatePartner={handleUpdatePartner}
        />
      )}

      {/* --- Add New Partner form Overlay --- */}
      {showAddPartner && (
        <AddPartnerModal
          rpms={rpms}
          onClose={() => setShowAddPartner(false)}
          onAddPartner={handleAddPartner}
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
