import React, { useState } from 'react';
import { BookOpen, ExternalLink, Calendar } from 'lucide-react';
import { TrainingResource } from '../types';

interface EnablementHubProps {
  resources: TrainingResource[];
}

export default function EnablementHub({ resources }: EnablementHubProps) {
  // Filters
  const [audienceFilter, setAudienceFilter] = useState<'All' | 'External' | 'Internal'>('All');

  const filteredResources = resources.filter(res => {
    if (audienceFilter === 'External') return res.audience === 'External Shared';
    if (audienceFilter === 'Internal') return res.audience === 'Internal Only';
    return true;
  });

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

        {/* Audience Filters */}
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
        </div>
      </div>

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

            <div className="border-t border-[#2d2f31] pt-3 mt-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span className="text-[10px] font-mono font-bold flex items-center gap-1 text-zinc-400">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Updated: {res.lastUpdated}</span>
                </span>

                {(!res.links || res.links.length === 0) && (
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="font-bold text-[#81c995] hover:text-[#a2e0b5] hover:underline inline-flex items-center gap-1 pl-1 transition-colors text-xs"
                  >
                    <span>Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {res.links && res.links.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {res.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      referrerPolicy="no-referrer"
                      className="text-xs font-semibold text-[#81c995] hover:text-[#a2e0b5] bg-[#81c995]/10 hover:bg-[#81c995]/20 border border-[#81c995]/30 px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5 transition-all shadow-sm group"
                    >
                      <span className="truncate max-w-[200px]">{link.title}</span>
                      <ExternalLink className="w-3 h-3 text-[#81c995] group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
