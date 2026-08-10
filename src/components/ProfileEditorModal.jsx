import React, { useState } from 'react';
import { X, Save, Camera, Sparkles, User, Briefcase, Phone, Mail, Instagram, Linkedin, MapPin, Tag } from 'lucide-react';

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400'
];

export default function ProfileEditorModal({ isOpen, onClose, profile, onSave }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({ ...profile });

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md bg-slate-900 rounded-3xl border border-white/15 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 px-6 border-b border-white/10 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white text-base">Edit My Profile Card</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* Avatar Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Profile Photo Avatar</label>
            <div className="flex items-center gap-3">
              <img
                src={formData.avatar}
                alt="Selected Avatar"
                className="w-14 h-14 rounded-full object-cover border-2 border-cyan-400 shadow-md"
              />
              <div className="flex items-center gap-2 overflow-x-auto py-1">
                {PRESET_AVATARS.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`Preset ${idx}`}
                    onClick={() => handleChange('avatar', url)}
                    className={`w-10 h-10 rounded-full object-cover cursor-pointer transition-transform hover:scale-110 border ${
                      formData.avatar === url ? 'border-2 border-cyan-400 scale-105' : 'border-white/20 opacity-70'
                    }`}
                  />
                ))}
              </div>
            </div>
            <input
              type="text"
              placeholder="Or paste custom image URL..."
              value={formData.avatar}
              onChange={(e) => handleChange('avatar', e.target.value)}
              className="w-full mt-2 px-3 py-2 text-xs bg-slate-950 border border-white/10 rounded-xl text-slate-200 focus:border-cyan-400 outline-none"
            />
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-cyan-400" /> Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-white/10 rounded-xl text-white focus:border-cyan-400 outline-none"
            />
          </div>

          {/* Title & Company Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-cyan-400" /> Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-white/10 rounded-xl text-white focus:border-cyan-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Company</label>
              <input
                type="text"
                value={formData.company || ''}
                onChange={(e) => handleChange('company', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-white/10 rounded-xl text-white focus:border-cyan-400 outline-none"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Bio / Headline</label>
            <textarea
              rows={2}
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-white/10 rounded-xl text-white focus:border-cyan-400 outline-none resize-none"
            />
          </div>

          {/* Location Tag */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-pink-400" /> Current Location Badge
            </label>
            <input
              type="text"
              placeholder="e.g. Deck 7 Lounge, Sunset Pool"
              value={formData.locationTag || ''}
              onChange={(e) => handleChange('locationTag', e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-white/10 rounded-xl text-white focus:border-cyan-400 outline-none"
            />
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400" /> Phone
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-white/10 rounded-xl text-white focus:border-cyan-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-cyan-400" /> Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-white/10 rounded-xl text-white focus:border-cyan-400 outline-none"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Instagram className="w-3.5 h-3.5 text-pink-400" /> Instagram Username
              </label>
              <input
                type="text"
                value={formData.instagram}
                onChange={(e) => handleChange('instagram', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-white/10 rounded-xl text-white focus:border-cyan-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Linkedin className="w-3.5 h-3.5 text-blue-400" /> LinkedIn Handle
              </label>
              <input
                type="text"
                value={formData.linkedin}
                onChange={(e) => handleChange('linkedin', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-white/10 rounded-xl text-white focus:border-cyan-400 outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-pink-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 hover:opacity-95"
            >
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
