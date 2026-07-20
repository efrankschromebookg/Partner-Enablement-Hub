import React, { useState } from 'react';
import { X, Plus, Trash2, Mail, ExternalLink, Calendar, Briefcase, GraduationCap, Check, HelpCircle, Pencil } from 'lucide-react';
import { Partner, POC, PartnerProject, RPM } from '../types';

interface PartnerDetailModalProps {
  partner: Partner;
  rpms: RPM[];
  onClose: () => void;
  onUpdatePartner: (updatedPartner: Partner) => void;
}

export default function PartnerDetailModal({ partner, rpms, onClose, onUpdatePartner }: PartnerDetailModalProps) {
  // Local state for adding POC
  const [newPocName, setNewPocName] = useState('');
  const [newPocEmail, setNewPocEmail] = useState('');
  const [newPocRole, setNewPocRole] = useState('Training POC');
  
  // Local state for adding project
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjStatus, setNewProjStatus] = useState<'In Progress' | 'Completed' | 'Stalled' | 'Planning'>('In Progress');
  const [newProjUrl, setNewProjUrl] = useState('');

  // Local state for adding training engagement log
  const [newEngagementText, setNewEngagementText] = useState('');

  // Local state for editing POC
  const [editingPocIndex, setEditingPocIndex] = useState<number | null>(null);
  const [editPocName, setEditPocName] = useState('');
  const [editPocEmail, setEditPocEmail] = useState('');
  const [editPocRole, setEditPocRole] = useState('Training POC');

  // Local state for editing project
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editProjTitle, setEditProjTitle] = useState('');
  const [editProjDesc, setEditProjDesc] = useState('');
  const [editProjStatus, setEditProjStatus] = useState<'In Progress' | 'Completed' | 'Stalled' | 'Planning'>('In Progress');
  const [editProjUrl, setEditProjUrl] = useState('');

  const currentRpm = rpms.find(r => r.id === partner.rpmId);

  // Quick field updates
  const handleActivityChange = (val: 'High' | 'Medium' | 'Low' | 'Planned') => {
    onUpdatePartner({
      ...partner,
      activityLevel: val
    });
  };

  const handleSectorChange = (val: 'OEM' | 'SoC' | 'Retailer' | 'Disti' | 'Carrier' | 'Other') => {
    onUpdatePartner({
      ...partner,
      sector: val
    });
  };

  const handleRpmChange = (rpmId: string) => {
    onUpdatePartner({
      ...partner,
      rpmId
    });
  };

  // Add Point of Contact (POC)
  const handleAddPoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPocName || !newPocEmail) return;

    const newPocs: POC[] = [
      ...partner.pocs,
      { name: newPocName, email: newPocEmail, role: newPocRole }
    ];

    onUpdatePartner({
      ...partner,
      pocs: newPocs,
      rawPocText: '' // clear raw text override once we have real POCs
    });

    setNewPocName('');
    setNewPocEmail('');
    setNewPocRole('Training POC');
  };

  // Start Edit POC
  const handleStartEditPoc = (idx: number, poc: POC) => {
    setEditingPocIndex(idx);
    setEditPocName(poc.name);
    setEditPocEmail(poc.email);
    setEditPocRole(poc.role || 'Training POC');
  };

  // Save POC
  const handleSavePoc = (idxToSave: number) => {
    if (!editPocName.trim() || !editPocEmail.trim()) return;
    const updatedPocs = partner.pocs.map((poc, idx) => {
      if (idx === idxToSave) {
        return { name: editPocName.trim(), email: editPocEmail.trim(), role: editPocRole.trim() };
      }
      return poc;
    });
    onUpdatePartner({
      ...partner,
      pocs: updatedPocs
    });
    setEditingPocIndex(null);
  };

  // Delete POC
  const handleDeletePoc = (emailToDelete: string) => {
    onUpdatePartner({
      ...partner,
      pocs: partner.pocs.filter(poc => poc.email !== emailToDelete)
    });
  };

  // Add Project
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjTitle.trim()) return;

    const newProject: PartnerProject = {
      id: `proj-${Date.now()}`,
      title: newProjTitle.trim(),
      description: newProjDesc.trim(),
      status: newProjStatus,
      url: newProjUrl.trim() || undefined,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    onUpdatePartner({
      ...partner,
      projects: [...partner.projects, newProject]
    });

    setNewProjTitle('');
    setNewProjDesc('');
    setNewProjStatus('In Progress');
    setNewProjUrl('');
  };

  // Start Edit Project
  const handleStartEditProject = (proj: PartnerProject) => {
    setEditingProjectId(proj.id);
    setEditProjTitle(proj.title);
    setEditProjDesc(proj.description || '');
    setEditProjStatus(proj.status);
    setEditProjUrl(proj.url || '');
  };

  // Save Project
  const handleSaveProject = (projId: string) => {
    if (!editProjTitle.trim()) return;
    const updatedProjects = partner.projects.map(proj => {
      if (proj.id === projId) {
        return {
          ...proj,
          title: editProjTitle.trim(),
          description: editProjDesc.trim(),
          status: editProjStatus,
          url: editProjUrl.trim() || undefined,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return proj;
    });
    onUpdatePartner({
      ...partner,
      projects: updatedProjects
    });
    setEditingProjectId(null);
  };

  // Update Project Status
  const handleUpdateProjectStatus = (projId: string, status: 'In Progress' | 'Completed' | 'Stalled' | 'Planning') => {
    const updatedProjects = partner.projects.map(proj => {
      if (proj.id === projId) {
        return {
          ...proj,
          status,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return proj;
    });

    onUpdatePartner({
      ...partner,
      projects: updatedProjects
    });
  };

  // Delete Project
  const handleDeleteProject = (projId: string) => {
    onUpdatePartner({
      ...partner,
      projects: partner.projects.filter(p => p.id !== projId)
    });
  };

  // Add Training Log Entry
  const handleAddEngagement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEngagementText.trim()) return;

    onUpdatePartner({
      ...partner,
      trainingEngagements: [...partner.trainingEngagements, newEngagementText.trim()]
    });

    setNewEngagementText('');
  };

  // Remove Training Log Entry
  const handleDeleteEngagement = (indexToDelete: number) => {
    onUpdatePartner({
      ...partner,
      trainingEngagements: partner.trainingEngagements.filter((_, idx) => idx !== indexToDelete)
    });
  };

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
            className="p-1.5 px-3.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-full transition-colors flex items-center gap-1.5 font-bold text-xs"
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
              
              {/* Sector selector */}
              <div className="mt-4">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9aa0a6] font-mono mb-1.5">Sector Class</label>
                <select
                  value={partner.sector || 'OEM'}
                  onChange={(e) => handleSectorChange(e.target.value as any)}
                  className="w-full text-xs bg-[#202124] text-[#e3e3e3] border border-[#3c4043] rounded-xl p-2.5 focus:border-[#8ab4f8] focus:outline-none font-semibold transition-colors"
                >
                  <option value="OEM">OEM Hardware</option>
                  <option value="SoC">SoC Chipset</option>
                  <option value="Retailer">Retailer Account</option>
                  <option value="Disti">Distributor</option>
                  <option value="Carrier">Telecom Carrier</option>
                  <option value="Other">Other Category</option>
                </select>
              </div>
            </div>

            {/* Ownership Detail section */}
            <div className="md:col-span-1 border-r border-[#2d2f31] pr-4">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9aa0a6] font-mono mb-1.5">RPM Partner Owner</label>
              <select
                value={partner.rpmId}
                onChange={(e) => handleRpmChange(e.target.value)}
                className="w-full text-sm bg-[#202124] text-white border border-[#3c4043] rounded-xl p-2.5 focus:border-[#8ab4f8] focus:outline-none font-bold transition-colors"
              >
                {rpms.map(r => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>

              {currentRpm && (
                <div className="mt-3.5 flex items-center gap-2">
                  <span className="text-xs text-[#9aa0a6]">Contact:</span>
                  <a href={`mailto:${currentRpm.email}`} className="text-xs font-semibold text-[#8ab4f8] hover:underline flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{currentRpm.email}</span>
                  </a>
                </div>
              )}
            </div>

            {/* Activity parameters updater */}
            <div className="md:col-span-1 col-span-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9aa0a6] font-mono mb-1.5">Engagement Activity Level</label>
              <div className="grid grid-cols-2 gap-2">
                {(['High', 'Medium', 'Low', 'Planned'] as const).map(lev => (
                  <button
                    key={lev}
                    onClick={() => handleActivityChange(lev)}
                    className={`text-[11px] font-bold px-2 py-2 rounded-xl border text-center transition-all ${
                      partner.activityLevel === lev
                        ? 'bg-zinc-800 text-[#8ab4f8] border-[#8ab4f8]/40 shadow-md'
                        : 'bg-[#202124] text-zinc-400 border-[#3c4043] hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    {lev}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-zinc-500 mt-3 font-mono">Updates automatically tracking active sync meetings.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Column 1: Point of Contacts Management */}
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
                      <React.Fragment key={idx}>
                        {editingPocIndex === idx ? (
                          <div className="space-y-3 p-3.5 rounded-xl border border-[#8ab4f8]/30 bg-[#202124]">
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={editPocName}
                                onChange={(e) => setEditPocName(e.target.value)}
                                className="text-xs bg-zinc-900 border border-[#3c4043] rounded-lg p-2 text-white font-semibold focus:outline-none focus:border-[#8ab4f8]"
                                placeholder="Name"
                              />
                              <input
                                type="email"
                                value={editPocEmail}
                                onChange={(e) => setEditPocEmail(e.target.value)}
                                className="text-xs bg-zinc-900 border border-[#3c4043] rounded-lg p-2 text-white font-semibold focus:outline-none focus:border-[#8ab4f8]"
                                placeholder="Email"
                              />
                            </div>
                            <input
                              type="text"
                              value={editPocRole}
                              onChange={(e) => setEditPocRole(e.target.value)}
                              className="w-full text-xs bg-zinc-900 border border-[#3c4043] rounded-lg p-2 text-white font-semibold focus:outline-none focus:border-[#8ab4f8]"
                              placeholder="Role Description"
                            />
                            <div className="flex justify-end gap-2 pt-1.5 border-t border-zinc-800">
                              <button
                                type="button"
                                onClick={() => setEditingPocIndex(null)}
                                className="text-[10px] uppercase font-bold text-zinc-400 hover:text-white px-3 py-1 bg-zinc-800 rounded-md"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={() => handleSavePoc(idx)}
                                className="text-[10px] uppercase font-bold text-[#131314] bg-[#8ab4f8] hover:bg-[#a8c7fa] px-3 py-1 rounded-md transition-colors"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-700/40 bg-[#202124] hover:bg-[#282a2d] transition-colors">
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

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleStartEditPoc(idx, poc)}
                                className="p-1.5 text-zinc-400 hover:text-[#8ab4f8] rounded-full hover:bg-zinc-800 transition-colors"
                                title="Edit Point of Contact"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeletePoc(poc.email)}
                                className="p-1.5 text-zinc-500 hover:text-[#f28b82] rounded-full hover:bg-red-950/20 transition-colors"
                                title="Remove Point of Contact"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 border border-dashed border-zinc-700 bg-[#202124]/40 text-zinc-400 text-xs italic text-center rounded-xl">
                    <p className="font-bold text-zinc-300 mb-0.5">No structured POC data defined yet.</p>
                    <p className="text-zinc-500 font-medium">
                      {partner.rawPocText || "Use the registrar form below to add partner's Point of Contact."}
                    </p>
                  </div>
                )}

                {/* Add POC Form */}
                <form onSubmit={handleAddPoc} className="border-t border-[#2d2f31] pt-4 mt-2 space-y-3">
                  <p className="text-[10px] font-bold text-[#9aa0a6] uppercase tracking-wider font-mono">Register New Contact</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input
                        placeholder="POC Name"
                        value={newPocName}
                        onChange={(e) => setNewPocName(e.target.value)}
                        className="w-full text-xs bg-[#202124] text-white border border-[#3c4043] rounded-xl p-2.5 focus:border-[#8ab4f8] focus:outline-none font-semibold"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="POC Email"
                        value={newPocEmail}
                        onChange={(e) => setNewPocEmail(e.target.value)}
                        className="w-full text-xs bg-[#202124] text-white border border-[#3c4043] rounded-xl p-2.5 focus:border-[#8ab4f8] focus:outline-none font-semibold"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <input
                      placeholder="Role (e.g. Lead Chromebook Trainer)"
                      value={newPocRole}
                      onChange={(e) => setNewPocRole(e.target.value)}
                      className="flex-1 text-xs bg-[#202124] text-white border border-[#3c4043] rounded-xl p-2.5 focus:border-[#8ab4f8] focus:outline-none font-semibold"
                    />
                    <button
                      type="submit"
                      className="bg-[#8ab4f8] hover:bg-[#a8c7fa] text-[#131314] font-bold text-xs px-4 rounded-xl transition-colors flex items-center gap-1.5 shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </form>
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
                        <div key={idx} className="flex items-start justify-between p-3 rounded-xl border border-zinc-700/40 bg-[#202124] hover:bg-[#282a2d] transition-colors gap-2">
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
                          <button
                            onClick={() => handleDeleteEngagement(idx)}
                            className="p-1 text-[#f28b82] hover:bg-red-950/20 rounded-full transition-colors shrink-0"
                            title="Delete effort log"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-4 border border-dashed border-zinc-700 bg-[#202124]/40 text-zinc-500 text-xs italic text-center rounded-xl">
                    No active training sessions logged. Use the form below to register interactive webinars, shared materials, or strategy synced.
                  </div>
                )}

                {/* Quick Add Training Log Form */}
                <form onSubmit={handleAddEngagement} className="border-t border-[#2d2f31] pt-4 mt-2">
                  <p className="text-[10px] font-bold text-[#9aa0a6] uppercase tracking-wider font-mono mb-2">Record Training Sync</p>
                  <div className="flex gap-2">
                    <input
                      placeholder="e.g. Q2 Intel Premium Core Processor webinar delivered to 15 reps"
                      value={newEngagementText}
                      onChange={(e) => setNewEngagementText(e.target.value)}
                      className="flex-1 text-xs bg-[#202124] text-white border border-[#3c4043] rounded-xl p-2.5 focus:border-[#8ab4f8] focus:outline-none font-semibold"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-[#81c995] hover:bg-[#a2e0b5] text-[#131314] font-bold text-xs px-4 rounded-xl transition-all flex items-center gap-1.5 shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Log Item</span>
                    </button>
                  </div>
                </form>
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
                      <div key={proj.id} className="p-4 rounded-2xl border border-zinc-700/60 bg-[#202124] hover:bg-[#282a2d] transition-colors relative space-y-3">
                        {editingProjectId === proj.id ? (
                          <div className="space-y-3">
                            <div className="space-y-2">
                              <label className="block text-[9px] font-bold uppercase tracking-wider text-zinc-500">Project Title</label>
                              <input
                                type="text"
                                value={editProjTitle}
                                onChange={(e) => setEditProjTitle(e.target.value)}
                                className="w-full text-xs bg-zinc-900 border border-[#3c4043] rounded-lg p-2.5 text-white font-bold focus:outline-none focus:border-[#8ab4f8]"
                                placeholder="Project Title"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="block text-[9px] font-bold uppercase tracking-wider text-zinc-500">Objective / Next Steps</label>
                              <textarea
                                value={editProjDesc}
                                onChange={(e) => setEditProjDesc(e.target.value)}
                                className="w-full text-xs bg-zinc-900 border border-[#3c4043] rounded-lg p-2.5 text-zinc-350 font-semibold focus:outline-none focus:border-[#8ab4f8]"
                                placeholder="Details of the initiative..."
                                rows={2}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="block text-[9px] font-bold uppercase tracking-wider text-zinc-500">Project Link / URL (Optional)</label>
                              <input
                                type="text"
                                value={editProjUrl}
                                onChange={(e) => setEditProjUrl(e.target.value)}
                                className="w-full text-xs bg-zinc-900 border border-[#3c4043] rounded-lg p-2.5 text-white font-semibold focus:outline-none focus:border-[#8ab4f8]"
                                placeholder="e.g. https://docs.google.com/..."
                              />
                            </div>
                            <div className="flex items-center justify-between border-t border-zinc-750 pt-2.5">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Status:</span>
                                <select
                                  value={editProjStatus}
                                  onChange={(e) => setEditProjStatus(e.target.value as any)}
                                  className={`text-xs font-bold px-2 py-1 rounded-lg border ${getStatusClass(editProjStatus)} cursor-pointer bg-zinc-900 focus:outline-none focus:border-[#8ab4f8]`}
                                >
                                  <option value="In Progress">In Progress</option>
                                  <option value="Completed">Completed</option>
                                  <option value="Stalled">Stalled</option>
                                  <option value="Planning">Planning</option>
                                </select>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => setEditingProjectId(null)}
                                  className="text-[10px] uppercase font-bold text-zinc-400 hover:text-white px-3 py-1.5 bg-zinc-850 rounded-md"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleSaveProject(proj.id)}
                                  className="text-[10px] uppercase font-bold text-[#131314] bg-[#8ab4f8] hover:bg-[#a8c7fa] px-3.5 py-1.5 rounded-md transition-colors"
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-start justify-between gap-4">
                              <div className="space-y-1">
                                <p className="text-sm font-bold text-white leading-tight">{proj.title}</p>
                                {proj.description && (
                                  <p className="text-xs text-[#9aa0a6] leading-relaxed font-semibold">{proj.description}</p>
                                )}
                                
                                {proj.url ? (
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
                                ) : (
                                  <div className="mt-2.5">
                                    <button
                                      onClick={() => handleStartEditProject(proj)}
                                      className="inline-flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 hover:text-white bg-[#202124] border border-[#3c4043] hover:border-zinc-500 px-2.5 py-1 rounded-md transition-all cursor-pointer"
                                    >
                                      <Plus className="w-3 h-3 text-[#8ab4f8]" />
                                      <span>Insert Project Link</span>
                                    </button>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-1.5 shrink-0">
                                <button
                                  onClick={() => handleStartEditProject(proj)}
                                  className="p-1 px-1.5 text-zinc-400 hover:text-[#8ab4f8] rounded-full hover:bg-zinc-800 transition-colors"
                                  title="Edit project details"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProject(proj.id)}
                                  className="p-1 px-1.5 text-zinc-500 hover:text-[#f28b82] rounded-full hover:bg-red-950/20 transition-colors shrink-0"
                                  title="Delete project"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* Project Controls */}
                            <div className="flex items-center justify-between border-t border-zinc-700/50 pt-2.5 mt-1">
                              <span className="text-[10px] font-bold text-zinc-500 block flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>Updated: {proj.lastUpdated || 'N/A'}</span>
                              </span>

                              <div className="flex items-center gap-2">
                                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Status:</span>
                                <select
                                  value={proj.status}
                                  onChange={(e) => handleUpdateProjectStatus(proj.id, e.target.value as any)}
                                  className={`text-xs font-bold px-2 py-1 rounded-lg border ${getStatusClass(proj.status)} cursor-pointer bg-[#202124] focus:outline-none`}
                                >
                                  <option value="In Progress">In Progress</option>
                                  <option value="Completed">Completed</option>
                                  <option value="Stalled">Stalled</option>
                                  <option value="Planning">Planning</option>
                                </select>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 border border-dashed border-zinc-700 bg-[#202124]/40 text-zinc-400 text-xs italic text-center rounded-2xl mt-4">
                    No partner projects tracked currently. Establish key product meeting minutes, outline presentations, or assortment trackers using the tool below.
                  </div>
                )}
              </div>

              {/* Add Project Form */}
              <form onSubmit={handleAddProject} className="border-t border-[#2d2f31] pt-5 mt-6 space-y-3">
                <p className="text-[10px] font-bold text-[#9aa0a6] uppercase tracking-wider font-mono">Establish New Project Tracking</p>
                
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <input
                      placeholder="Project Title (e.g. Chromebook Sync MINUTES)"
                      value={newProjTitle}
                      onChange={(e) => setNewProjTitle(e.target.value)}
                      className="w-full text-xs bg-[#202124] text-white border border-[#3c4043] rounded-xl p-2.5 focus:border-[#8ab4f8] focus:outline-none font-semibold"
                      required
                    />
                  </div>
                  <div>
                    <select
                      value={newProjStatus}
                      onChange={(e) => setNewProjStatus(e.target.value as any)}
                      className="w-full text-xs bg-[#202124] text-white border border-[#3c4043] rounded-xl p-2.5 focus:border-[#8ab4f8] focus:outline-none font-bold"
                    >
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Stalled">Stalled</option>
                      <option value="Planning">Planning</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-2">
                  <input
                    placeholder="Brief objective details or next steps..."
                    value={newProjDesc}
                    onChange={(e) => setNewProjDesc(e.target.value)}
                    className="flex-1 text-xs bg-[#202124] text-white border border-[#3c4043] rounded-xl p-2.5 focus:border-[#8ab4f8] focus:outline-none font-semibold"
                  />
                  <input
                    placeholder="Resource URL / Drive Link (Optional)"
                    value={newProjUrl}
                    onChange={(e) => setNewProjUrl(e.target.value)}
                    className="md:w-1/3 text-xs bg-[#202124] text-white border border-[#3c4043] rounded-xl p-2.5 focus:border-[#8ab4f8] focus:outline-none font-semibold"
                  />
                  <button
                    type="submit"
                    className="bg-[#81c995] hover:bg-[#a2e0b5] text-[#131314] font-bold text-xs px-4.5 rounded-xl transition-colors flex items-center gap-1.5 shrink-0 justify-center h-[38px] md:h-auto"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Launch</span>
                  </button>
                </div>
              </form>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
