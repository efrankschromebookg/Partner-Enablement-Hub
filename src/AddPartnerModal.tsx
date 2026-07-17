import React, { useState } from 'react';
import { X, Plus, AlertCircle, Check } from 'lucide-react';
import { Partner, RPM } from '../types';

interface AddPartnerModalProps {
  rpms: RPM[];
  onClose: () => void;
  onAddPartner: (newPartner: Partner) => void;
}

export default function AddPartnerModal({ rpms, onClose, onAddPartner }: AddPartnerModalProps) {
  const [name, setName] = useState('');
  const [rpmId, setRpmId] = useState(rpms[0]?.id || '');
  const [tier, setTier] = useState<'Priority' | 'Longtail'>('Priority');
  const [sector, setSector] = useState<'OEM' | 'SoC' | 'Retailer' | 'Disti' | 'Carrier' | 'Other'>('OEM');
  const [activityLevel, setActivityLevel] = useState<'High' | 'Medium' | 'Low' | 'Planned'>('Planning' as any);
  
  // Optional initial POC
  const [pocName, setPocName] = useState('');
  const [pocEmail, setPocEmail] = useState('');
  const [pocRole, setPocRole] = useState('Training POC');

  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Partner name is required');
      return;
    }

    const partnerId = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    const newPartner: Partner = {
      id: `${partnerId}-${Date.now().toString().slice(-4)}`,
      name: name.trim(),
      rpmId,
      tier,
      sector,
      activityLevel: activityLevel === ('Planning' as any) ? 'Planned' : activityLevel,
      pocs: pocName.trim() && pocEmail.trim() ? [
        { name: pocName.trim(), email: pocEmail.trim(), role: pocRole.trim() }
      ] : [],
      trainingEngagements: [],
      projects: []
    };

    onAddPartner(newPartner);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in overflow-y-auto">
      <div 
        className="bg-[#131314] text-[#e3e3e3] rounded-3xl border border-[#3c4043] shadow-2xl w-full max-w-lg overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-[#2d2f31] bg-[#1e1f20] px-6 py-5 flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2.5">
            {/* Google rainbow loader style dots */}
            <div className="flex gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]"></span>
            </div>
            <span>Register New Partner Profile</span>
          </h3>
          <button
            onClick={onClose}
            className="p-1 px-3.5 bg-[#2d2f31] hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-full transition-colors font-bold text-xs"
          >
            <X className="w-4 h-4 text-[#f28b82] inline mr-1" /> Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto max-h-[80vh]">
          {errorMsg && (
            <div className="bg-red-950/40 text-[#f28b82] text-xs p-3 rounded-xl flex items-center gap-2 border border-red-900/30">
              <AlertCircle className="w-4 h-4 text-[#f28b82] shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Partner Name Input */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9aa0a6] font-mono">Partner Corporate Name</label>
            <input
              type="text"
              placeholder="e.g. NVIDIA, Best Buy, AMD"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-xs bg-[#202124] text-white border border-[#3c4043] rounded-xl p-3 focus:border-[#8ab4f8] focus:outline-none font-semibold transition-colors placeholder-zinc-650"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Tier Selector */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9aa0a6] font-mono">Channel Tier</label>
              <div className="grid grid-cols-2 gap-2">
                {(['Priority', 'Longtail'] as const).map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTier(t)}
                    className={`text-xs font-bold py-2.5 rounded-xl border text-center transition-all ${
                      tier === t
                        ? t === 'Priority'
                          ? 'bg-red-950/50 text-[#f28b82] border-[#f28b82]/40 shadow-md'
                          : 'bg-blue-950/50 text-[#8ab4f8] border-[#8ab4f8]/40 shadow-md'
                        : 'bg-[#202124] text-zinc-400 border-[#3c4043] hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Sector Type */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9aa0a6] font-mono">Vendor Sector</label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value as any)}
                className="w-full text-xs bg-[#202124] text-[#e3e3e3] border border-[#3c4043] rounded-xl p-2.5 focus:border-[#8ab4f8] focus:outline-none font-semibold h-[38px]"
              >
                <option value="OEM">OEM Hardware</option>
                <option value="SoC">SoC Component / Chipset</option>
                <option value="Retailer">Retailer Account</option>
                <option value="Disti">Distributor</option>
                <option value="Carrier">Telecom Carrier</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* RPM Owner Select */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9aa0a6] font-mono">RPM Account Lead</label>
              <select
                value={rpmId}
                onChange={(e) => setRpmId(e.target.value)}
                className="w-full text-xs bg-[#202124] text-white border border-[#3c4043] rounded-xl p-2.5 focus:border-[#8ab4f8] focus:outline-none font-semibold h-[38px]"
              >
                {rpms.map(r => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>

            {/* Initial Activity Level */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9aa0a6] font-mono">Engagement Level</label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value as any)}
                className="w-full text-xs bg-[#202124] text-white border border-[#3c4043] rounded-xl p-2.5 focus:border-[#8ab4f8] focus:outline-none font-semibold h-[38px]"
              >
                <option value="Planned">Planned</option>
                <option value="Low">Low Engagement</option>
                <option value="Medium">Medium Engagement</option>
                <option value="High">High Engagement</option>
              </select>
            </div>
          </div>

          {/* Initial Optional POC Form block */}
          <div className="pt-4 space-y-3 bg-[#1e1f20] p-4.5 rounded-2xl border border-[#3c4043]/85 relative overflow-hidden">
            {/* Small subtle rainbow strip at the top of the POC box */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-google-rainbow"></div>

            <p className="text-[10px] font-bold text-[#fdd663] uppercase tracking-wide font-mono">Initial Point of Contact (Optional)</p>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider font-mono">Contact Name</span>
                <input
                  placeholder="e.g. John Doe"
                  value={pocName}
                  onChange={(e) => setPocName(e.target.value)}
                  className="w-full text-xs bg-[#131314] text-white border border-[#3c4043] rounded-xl p-2.5 focus:outline-none focus:border-[#8ab4f8] font-semibold"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider font-mono">Contact Email</span>
                <input
                  type="email"
                  placeholder="john.doe@company.com"
                  value={pocEmail}
                  onChange={(e) => setPocEmail(e.target.value)}
                  className="w-full text-xs bg-[#131314] text-white border border-[#3c4043] rounded-xl p-2.5 focus:outline-none focus:border-[#8ab4f8] font-semibold"
                />
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider font-mono">POC Role Descriptor</span>
              <input
                placeholder="e.g. Lead Chromebook Trainer"
                value={pocRole}
                onChange={(e) => setPocRole(e.target.value)}
                className="w-full text-xs bg-[#131314] text-white border border-[#3c4043] rounded-xl p-2.5 focus:outline-none focus:border-[#8ab4f8] font-semibold"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="border-t border-[#2d2f31] pt-5 flex justify-end gap-3 pb-1">
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-zinc-400 hover:text-white font-bold px-4 py-2 bg-transparent hover:bg-zinc-800 rounded-full transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#8ab4f8] hover:bg-[#a8c7fa] text-[#131314] font-bold text-xs px-5 py-2.5 rounded-full transition-all flex items-center gap-1.5 shadow-md shadow-[rgba(138,180,248,0.15)]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Register Account</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
