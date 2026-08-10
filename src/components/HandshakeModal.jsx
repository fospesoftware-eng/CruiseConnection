import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, UserCheck, ShieldCheck, Sparkles, MapPin, Check, Heart, MessageSquare } from 'lucide-react';

export default function HandshakeModal({ isOpen, onClose, scannedUser, onConfirmConnect }) {
  if (!isOpen || !scannedUser) return null;

  const [shareOption, setShareOption] = useState('all'); // 'all' | 'work' | 'social'

  const handleConnect = () => {
    // Fire festive celebratory confetti burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    onConfirmConnect(scannedUser, shareOption);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md bg-slate-900 rounded-t-3xl sm:rounded-3xl border border-cyan-500/40 shadow-2xl overflow-hidden animate-slideUp">
        {/* Top Header */}
        <div className="p-4 px-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-slate-950 to-cyan-950/40">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-sm">New Connection Found!</h3>
              <p className="text-[10px] text-cyan-400 font-semibold">Instant Handshake Request</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Card Summary */}
        <div className="p-6 space-y-5">
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
            <img
              src={scannedUser.avatar}
              alt={scannedUser.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400 shadow-md shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-white text-base truncate">{scannedUser.name}</h4>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">SCANNED</span>
              </div>
              <p className="text-xs text-cyan-400 font-medium truncate">{scannedUser.title} • {scannedUser.company}</p>

              {scannedUser.locationTag && (
                <div className="flex items-center gap-1 text-[11px] text-slate-300 mt-1">
                  <MapPin className="w-3 h-3 text-pink-400 shrink-0" />
                  <span className="truncate">{scannedUser.locationTag}</span>
                </div>
              )}
            </div>
          </div>

          {/* Bio Preview */}
          <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-950 p-3 rounded-xl border border-white/5">
            "{scannedUser.bio}"
          </p>

          {/* Sharing Privacy Level Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
              <span>Choose What Details To Share Back</span>
              <span className="text-[10px] text-cyan-400 font-normal">Privacy Control</span>
            </label>

            <div className="space-y-2">
              <label
                onClick={() => setShareOption('all')}
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  shareOption === 'all'
                    ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-md'
                    : 'bg-slate-950/60 border-white/10 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <div>
                    <p className="text-xs font-bold">Share Full Contact Info (Recommended)</p>
                    <p className="text-[10px] text-slate-400">Phone, Email, Instagram, LinkedIn & Bio</p>
                  </div>
                </div>
                {shareOption === 'all' && <Check className="w-4 h-4 text-cyan-400" />}
              </label>

              <label
                onClick={() => setShareOption('work')}
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  shareOption === 'work'
                    ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-md'
                    : 'bg-slate-950/60 border-white/10 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <UserCheck className="w-4 h-4 text-blue-400" />
                  <div>
                    <p className="text-xs font-bold">Work Contacts Only</p>
                    <p className="text-[10px] text-slate-400">Email, LinkedIn & Title only</p>
                  </div>
                </div>
                {shareOption === 'work' && <Check className="w-4 h-4 text-cyan-400" />}
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-1/3 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
            >
              Decline
            </button>
            <button
              onClick={handleConnect}
              className="w-2/3 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-pink-500 to-violet-500 text-white font-extrabold text-xs shadow-xl shadow-cyan-500/30 flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4" /> Exchange Info & Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
