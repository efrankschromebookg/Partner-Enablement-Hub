import React, { useState } from 'react';
import { BookOpen, ExternalLink, Plus, Trash2, Calendar, Tag, ShieldAlert, Clock } from 'lucide-react';
import { TrainingResource } from '../types';

interface EnablementHubProps {
  resources: TrainingResource[];
  onAddResource: (resource: TrainingResource) => void;
  onDeleteResource: (id: string) => void;
}

export default function EnablementHub({ resources, onAddResource, onDeleteResource }: EnablementHubProps) {
  // Filters
  const [audienceFilter, setAudienceFilter] = useState<'All' | 'External' | 'Internal'>('All');
  
  // New Resource Form state
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState<'Site Link' | 'Deck' | 'Webinar' | 'Library' | 'Other'>('Deck');
  const [lastUpdated, setLastUpdated] = useState('');
  const [status, setStatus] = useState<'FINAL' | 'WIP' | 'Draft' | 'Updated'>('WIP');
  const [audience, setAudience] = useState<'External Shared' | 'Internal Only'>('External Shared');
  const [description, setDescription] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredResources = resources.filter(res => {
    if (audienceFilter === 'External') return res.audience === 'External Shared';
    if (audienceFilter === 'Internal') return res.audience === 'Internal Only';
    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newRes: TrainingResource = {
      id: `res-${Date.now()}`,
      name: name.trim(),
      url: url.trim() || 'https://drive.google.com/drive/',
      type,
      lastUpdated: lastUpdated.trim() || 'Today',
      status,
      audience,
      description: description.trim()
    };

    onAddResource(newRes);
    
    // reset form
    setName('');
    setUrl('');
    setType('Deck');
    setLastUpdated('');
    setStatus('WIP');
    setAudience('External Shared');
    setDescription('');
    setShowAddForm(false);
  };

  const getStatusBadge = (stat: string) => {
    switch (stat) {
      case 'FINAL': return 'bg-green-950/40 text-[#81c995] border-green-900/30';
      case 'WIP': return 'bg-yellow-950/30 text-[#fdd663] border-yellow-900/30';
      case 'Updated': return 'bg-blue-950/40 text-[#8ab4f8] border-blue-900/30';
      default: return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    }
  };

  return (
    <div className="bg-[#1e1f20] border border-[#3c4043] rounded-2xl shadow-lg p-6 space-y-6">
      
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2d2f31] pb-5">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#81c995] shrink-0" />
            <span>Partner-Agnostic Enablement Vault</span>
          </h2>
          <p className="text-xs text-[#9aa0a6] mt-1">
            General training materials, strategy decks, and webinar guides distributed to channels.
          </p>
        </div>

        {/* Filters and Add button */}
        <div className="flex items-center gap-2.5 self-start">
          <div className="inline-flex bg-[#202124] p-0.5 rounded-full border border-zinc-700/60">
            {(['All', 'External', 'Internal'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setAudienceFilter(tab)}
                className={`text-xs font-semibold px-3 py-1 rounded-full transition-all ${
                  audienceFilter === tab 
                    ? 'bg-zinc-800 text-[#8ab4f8] shadow-sm' 
                    : 'text-zinc-500 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="text-xs font-semibold px-4.5 py-1.5 rounded-full border border-[#3c4043] bg-[#202124] hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5 text-[#81c995]" />
            <span>{showAddForm ? 'Close' : 'Add Deck'}</span>
          </button>
        </div>
      </div>

      {/* Quick Add Resource Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="p-5 bg-[#202124] rounded-2xl border border-[#3c4043] space-y-4 animate-fade-in text-white">
          <p className="text-xs font-bold text-zinc-300 uppercase tracking-widest font-mono">Catalog Enablement Material</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <input
                placeholder="Asset Document Name (e.g. OEM Launch Deck v3)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs bg-[#131314] text-white border border-[#3c4043] rounded-xl p-3 focus:outline-none focus:border-[#8ab4f8] font-semibold"
                required
              />
            </div>
            <div>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full text-xs bg-[#131314] text-[#e3e3e3] border border-[#3c4043] rounded-xl p-3 focus:outline-none focus:border-[#8ab4f8] font-bold h-[42px]"
              >
                <option value="Deck">Slide Deck</option>
                <option value="Site Link">Site Link / Portal</option>
                <option value="Webinar">Webinar Archive</option>
                <option value="Library">Trix Library</option>
                <option value="Other">Standard Guide</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="md:col-span-2">
              <input
                placeholder="Google Drive, Slides, or Site URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full text-xs bg-[#131314] text-white border border-[#3c4043] rounded-xl p-3 focus:outline-none focus:border-[#8ab4f8] font-semibold"
              />
            </div>
            <div>
              <input
                placeholder="Updated Flag (e.g. May 15th)"
                value={lastUpdated}
                onChange={(e) => setLastUpdated(e.target.value)}
                className="w-full text-xs bg-[#131314] text-white border border-[#3c4043] rounded-xl p-3 focus:outline-none focus:border-[#8ab4f8] font-semibold"
              />
            </div>
            <div>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full text-xs bg-[#131314] text-[#e3e3e3] border border-[#3c4043] rounded-xl p-3 focus:outline-none focus:border-[#8ab4f8] font-bold h-[42px]"
              >
                <option value="WIP">WIP - In Drafting</option>
                <option value="FINAL">FINAL - Approved</option>
                <option value="Updated">Updated recently</option>
                <option value="Draft">Draft Outline</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-1">
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value as any)}
                className="w-full text-xs bg-[#131314] text-[#e3e3e3] border border-[#3c4043] rounded-xl p-3 focus:outline-none focus:border-[#8ab4f8] font-bold h-[42px]"
              >
                <option value="External Shared">External Shared (EXT)</option>
                <option value="Internal Only">Internal Only (RPM View)</option>
              </select>
            </div>
            <div className="md:col-span-2 flex gap-2">
              <input
                placeholder="Brief description of when/how to share this enablement tool..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="flex-1 text-xs bg-[#131314] text-white border border-[#3c4043] rounded-xl p-3 focus:outline-none focus:border-[#8ab4f8] font-semibold"
              />
              <button
                type="submit"
                className="bg-[#81c995] hover:bg-[#a2e0b5] text-[#131314] font-bold text-xs px-5 rounded-full transition-colors"
              >
                Register Asset
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Grid listing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="border border-[#3c4043] rounded-2xl p-4.5 hover:border-[#81c995] hover:shadow-lg hover:shadow-[rgba(129,201,149,0.02)] transition-all bg-[#222325]/40 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`text-[9px] font-mono tracking-wider px-2 py-0.5 rounded font-bold border uppercase ${getStatusBadge(res.status)}`}>
                  {res.status}
                </span>

                <span className={`text-[9px] font-bold px-2 py-0.5 border rounded-full ${
                  res.audience === 'External Shared' ? 'bg-blue-950/40 text-[#8ab4f8] border-blue-900/30' : 'bg-red-950/40 text-[#f28b82] border-red-900/30'
                }`}>
                  {res.audience === 'External Shared' ? 'Partner Shared' : 'Internal View'}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white leading-tight">
                {res.name}
              </h4>

              {res.description && (
                <p className="text-xs text-[#9aa0a6] line-clamp-2 mt-2 leading-relaxed">
                  {res.description}
                </p>
              )}
            </div>

            <div className="border-t border-[#2d2f31] pt-3 mt-4 flex items-center justify-between text-xs text-zinc-500">
              <span className="text-[10px] font-mono font-bold flex items-center gap-1 text-zinc-400">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                <span>Updated: {res.lastUpdated}</span>
              </span>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onDeleteResource(res.id)}
                  className="p-1.5 hover:bg-red-950/30 text-zinc-500 hover:text-[#f28b82] rounded-full transition-colors"
                  title="Remove catalog listing"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                
                <a
                  href={res.url}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="font-bold text-[#81c995] hover:text-[#a2e0b5] hover:underline inline-flex items-center gap-0.5 pl-1 transition-colors"
                >
                  <span>Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
