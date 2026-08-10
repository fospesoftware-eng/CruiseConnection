import React, { useState } from 'react';
import { Settings, RefreshCw, Download, Shield, Smartphone, Moon, Database, CheckCircle2, ShieldCheck, Lock, Unlock, KeyRound, Baby } from 'lucide-react';
import { hapticFeedback } from '../utils/haptics';
import { sounds } from '../utils/sound';

export default function SettingsView({ profile, connectionsCount, isKidsMode, onToggleKidsMode, onResetDemo, onShowToast }) {
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');
  const [pinAction, setPinAction] = useState('enable'); // 'enable' | 'disable'

  const handleExportData = () => {
    hapticFeedback.medium();
    sounds.playPop();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `scanme_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    onShowToast('Profile JSON backup downloaded!', 'success');
  };

  const handleKidsModeClick = () => {
    hapticFeedback.medium();
    if (isKidsMode) {
      // Disabling requires entering current PIN
      setPinAction('disable');
      setPinInput('');
      setShowPinModal(true);
    } else {
      // Enabling sets new 4-digit PIN
      setPinAction('enable');
      setNewPinInput('1234');
      setShowPinModal(true);
    }
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinAction === 'enable') {
      if (!newPinInput || newPinInput.length < 4) {
        onShowToast('Please enter a 4-digit Parental PIN', 'error');
        return;
      }
      onToggleKidsMode(true, null, newPinInput);
      setShowPinModal(false);
    } else {
      const success = onToggleKidsMode(false, pinInput);
      if (success) {
        setShowPinModal(false);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4 pb-24 pt-2">
      {/* Header */}
      <div>
        <h2 className="text-xl font-extrabold text-white tracking-tight">App Settings & Controls</h2>
        <p className="text-xs text-slate-400">Configure safety, parental controls, and app state</p>
      </div>

      {/* Profile Overview Card */}
      <div className="glass-card rounded-2xl p-4 border border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400 shadow-md"
          />
          <div>
            <h3 className="font-bold text-white text-sm">{profile.name}</h3>
            <p className="text-xs text-cyan-400 font-medium">{profile.title}</p>
            <p className="text-[10px] text-slate-400">{profile.email}</p>
          </div>
        </div>
        <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
          PRO MVP
        </span>
      </div>

      {/* Kids Mode / Parental Controls Banner */}
      <div className={`glass-card rounded-2xl p-4 border transition-all ${
        isKidsMode ? 'border-amber-500/50 bg-amber-950/20' : 'border-white/10'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
              isKidsMode ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-400'
            }`}>
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-extrabold text-white">Kids Mode & Parental Control</h4>
                {isKidsMode && (
                  <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950">
                    ACTIVE
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-400">
                {isKidsMode ? 'Strict privacy & content safety enabled' : 'Protect young cruisers with PIN lock & strict privacy'}
              </p>
            </div>
          </div>

          <button
            onClick={handleKidsModeClick}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 ${
              isKidsMode
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                : 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10'
            }`}
          >
            {isKidsMode ? 'Disable' : 'Enable'}
          </button>
        </div>

        {isKidsMode && (
          <div className="mt-3 pt-3 border-t border-amber-500/20 text-[10px] text-amber-300/90 space-y-1">
            <p>✓ Phone numbers & social handles automatically hidden</p>
            <p>✓ Chat content safety filters active</p>
            <p>✓ PIN required to change parental settings</p>
          </div>
        )}
      </div>

      {/* App Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass-panel p-4 rounded-2xl border border-white/10 text-center">
          <Database className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
          <p className="text-lg font-extrabold text-white">{connectionsCount}</p>
          <p className="text-[10px] text-slate-400 font-semibold uppercase">Active Connections</p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/10 text-center">
          <Smartphone className="w-5 h-5 text-pink-400 mx-auto mb-1" />
          <p className="text-lg font-extrabold text-white">PWA Ready</p>
          <p className="text-[10px] text-slate-400 font-semibold uppercase">Mobile Installable</p>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="glass-card rounded-2xl p-4 border border-white/10 space-y-4">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-cyan-400" /> Data & Maintenance Options
        </h4>

        <div className="space-y-2">
          {/* Backup Data */}
          <button
            onClick={handleExportData}
            className="w-full p-3 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-white/10 flex items-center justify-between text-left transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Download className="w-4 h-4 text-cyan-400" />
              <div>
                <p className="text-xs font-bold text-slate-200">Export Backup Data (JSON)</p>
                <p className="text-[10px] text-slate-400">Download profile and connection records</p>
              </div>
            </div>
            <span className="text-xs text-slate-500 font-semibold">Download</span>
          </button>

          {/* Reset Demo State */}
          <button
            onClick={() => {
              hapticFeedback.medium();
              onResetDemo();
            }}
            className="w-full p-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 flex items-center justify-between text-left transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <RefreshCw className="w-4 h-4 text-rose-400" />
              <div>
                <p className="text-xs font-bold text-rose-300">Reset Demo State</p>
                <p className="text-[10px] text-slate-400">Restore factory sample contacts and messages</p>
              </div>
            </div>
            <span className="text-xs text-rose-400 font-semibold">Reset</span>
          </button>
        </div>
      </div>

      {/* Parental Control PIN Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-sm bg-slate-900 rounded-3xl border border-amber-500/40 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base">
                  {pinAction === 'enable' ? 'Set Parental Control PIN' : 'Enter Parental Control PIN'}
                </h3>
                <p className="text-xs text-slate-400">
                  {pinAction === 'enable' ? 'Create a 4-digit PIN to lock settings' : 'Enter PIN to disable Kids Mode'}
                </p>
              </div>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              {pinAction === 'enable' ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">New 4-Digit PIN</label>
                  <input
                    type="password"
                    maxLength={4}
                    required
                    value={newPinInput}
                    onChange={(e) => setNewPinInput(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-center text-lg tracking-widest text-white font-bold focus:border-amber-400 outline-none"
                    placeholder="1234"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Enter 4-Digit PIN</label>
                  <input
                    type="password"
                    maxLength={4}
                    required
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-center text-lg tracking-widest text-white font-bold focus:border-amber-400 outline-none"
                    placeholder="••••"
                  />
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPinModal(false)}
                  className="w-1/2 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl text-xs font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* System info */}
      <div className="text-center pt-4 space-y-1">
        <p className="text-[11px] font-bold text-slate-400">CRUISE CONNECTION • MVP Version 1.0.0</p>
        <p className="text-[10px] text-slate-500 font-medium">Built with Next/Vite + Tailwind + Supabase Realtime</p>
      </div>
    </div>
  );
}
