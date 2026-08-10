import React from 'react';
import { QrCode, Scan, Users, MessageSquare, Settings, Sparkles, UserCheck } from 'lucide-react';
import { hapticFeedback } from '../utils/haptics';

export default function Navigation({ activeTab, setActiveTab, profile, connectionsCount, onOpenScanner }) {
  const handleTabChange = (tabId) => {
    hapticFeedback.light();
    setActiveTab(tabId);
  };

  const unreadTotal = 1; // Unread badge for client demo

  return (
    <>
      {/* Top Glass Navigation Bar */}
      <header className="sticky top-0 z-30 w-full glass-panel border-b border-white/10 px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => handleTabChange('card')}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-pink-500 p-0.5 shadow-lg shadow-cyan-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <QrCode className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm tracking-wider text-white">CRUISE<span className="text-cyan-400">CONNECTION</span></span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">V1 MVP</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Instant Contact Bridge</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenScanner}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/25 active:scale-95 transition-transform"
            >
              <Scan className="w-3.5 h-3.5" />
              <span>Scan QR</span>
            </button>
          </div>
        </div>
      </header>

      {/* Bottom Sticky Mobile Navigation Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 glass-panel border-t border-white/10 px-4 py-2">
        <div className="max-w-md mx-auto flex items-center justify-around">
          {/* Card / My QR */}
          <button
            onClick={() => handleTabChange('card')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              activeTab === 'card' ? 'text-cyan-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <QrCode className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">My Card</span>
          </button>

          {/* Connections */}
          <button
            onClick={() => handleTabChange('connections')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all relative ${
              activeTab === 'connections' ? 'text-cyan-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="relative">
              <Users className="w-5 h-5" />
              {connectionsCount > 0 && (
                <span className="absolute -top-1 -right-2 text-[9px] font-bold px-1 rounded-full bg-cyan-500 text-slate-950">
                  {connectionsCount}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight">Contacts</span>
          </button>

          {/* Center Scan Hero Action Button */}
          <button
            onClick={onOpenScanner}
            className="flex flex-col items-center -mt-6 group"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 via-pink-500 to-violet-500 p-0.5 shadow-xl shadow-cyan-500/30 group-active:scale-95 transition-transform animate-pulse">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                <Scan className="w-7 h-7 text-cyan-300" />
              </div>
            </div>
            <span className="text-[10px] font-bold text-cyan-300 mt-1">SCAN</span>
          </button>

          {/* Chat Messages */}
          <button
            onClick={() => handleTabChange('chat')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all relative ${
              activeTab === 'chat' ? 'text-cyan-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="relative">
              <MessageSquare className="w-5 h-5" />
              {unreadTotal > 0 && (
                <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-pink-500 animate-ping" />
              )}
            </div>
            <span className="text-[10px] tracking-tight">Chat</span>
          </button>

          {/* Settings */}
          <button
            onClick={() => handleTabChange('settings')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              activeTab === 'settings' ? 'text-cyan-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Settings</span>
          </button>
        </div>
      </nav>
    </>
  );
}
