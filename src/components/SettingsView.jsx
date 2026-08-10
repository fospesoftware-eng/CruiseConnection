import React from 'react';
import { Settings, RefreshCw, Download, Shield, Sparkles, Smartphone, Moon, Database, CheckCircle2 } from 'lucide-react';
import { hapticFeedback } from '../utils/haptics';
import { sounds } from '../utils/sound';

export default function SettingsView({ profile, connectionsCount, onResetDemo, onShowToast }) {
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

  return (
    <div className="w-full max-w-md mx-auto space-y-4 pb-24 pt-2">
      {/* Header */}
      <div>
        <h2 className="text-xl font-extrabold text-white tracking-tight">App Settings & Controls</h2>
        <p className="text-xs text-slate-400">Configure PWA options and client preview state</p>
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
          <Sparkles className="w-4 h-4 text-cyan-400" /> Client Preview Options
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

      {/* System info */}
      <div className="text-center pt-4 space-y-1">
        <p className="text-[11px] font-bold text-slate-400">CRUISE CONNECTION • MVP Version 1.0.0</p>
        <p className="text-[10px] text-slate-500 font-medium">Built with Next/Vite + Tailwind + Supabase Realtime Hooks</p>
      </div>
    </div>
  );
}
