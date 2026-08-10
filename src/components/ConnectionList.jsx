import React, { useState } from 'react';
import { Search, Download, MessageSquare, MapPin, Instagram, Linkedin, Phone, Mail, Sparkles, UserCheck, Shield } from 'lucide-react';
import { downloadVCard } from '../utils/vcard';
import { hapticFeedback } from '../utils/haptics';
import { sounds } from '../utils/sound';

export default function ConnectionList({ connections, onOpenChat, onShowToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Designers', 'Tech', 'VIP', 'Deck Lounge'];

  const filteredConnections = connections.filter(conn => {
    const matchesSearch = conn.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          conn.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (conn.company && conn.company.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeFilter === 'All') return matchesSearch;
    if (activeFilter === 'Designers') return matchesSearch && (conn.title.toLowerCase().includes('design') || conn.tags.includes('Product Designer'));
    if (activeFilter === 'Tech') return matchesSearch && (conn.title.toLowerCase().includes('ai') || conn.tags.includes('Tech Founder'));
    if (activeFilter === 'VIP') return matchesSearch && (conn.locationTag.includes('VIP') || conn.tags.includes('VIP Deck'));
    if (activeFilter === 'Deck Lounge') return matchesSearch && conn.locationTag.toLowerCase().includes('deck');

    return matchesSearch;
  });

  const handleDownload = (user) => {
    downloadVCard(user);
    hapticFeedback.medium();
    sounds.playPop();
    onShowToast(`vCard for ${user.name} downloaded!`, 'success');
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4 pb-24 pt-2">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">My Connections</h2>
          <p className="text-xs text-slate-400">Scan or exchange info to build your bridge</p>
        </div>
        <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold flex items-center gap-1">
          <UserCheck className="w-3.5 h-3.5" />
          <span>{connections.length} Contacts</span>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search contacts by name, title, company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-white/10 rounded-2xl text-xs text-white placeholder-slate-500 focus:border-cyan-400 outline-none glass-panel shadow-inner"
        />
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveFilter(cat);
              hapticFeedback.light();
            }}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === cat
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                : 'bg-white/5 hover:bg-white/10 text-slate-400 border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Connections List */}
      <div className="space-y-3">
        {filteredConnections.length > 0 ? (
          filteredConnections.map((conn) => (
            <div
              key={conn.id}
              className="glass-card rounded-2xl p-4 border border-white/10 hover:border-cyan-500/40 transition-all space-y-3 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={conn.avatar}
                      alt={conn.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white/10 shadow-md group-hover:border-cyan-400 transition-colors"
                    />
                    {conn.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-pink-500 border-2 border-slate-950 flex items-center justify-center text-[8px] font-extrabold text-white">
                        {conn.unreadCount}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">{conn.name}</h3>
                    <p className="text-xs text-cyan-400 font-medium">{conn.title} {conn.company ? `• ${conn.company}` : ''}</p>
                    
                    {conn.locationTag && (
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                        <MapPin className="w-3 h-3 text-pink-400 shrink-0" />
                        <span>{conn.locationTag}</span>
                      </div>
                    )}
                  </div>
                </div>

                <span className="text-[10px] text-slate-500 font-medium">{conn.metDate || 'Connected'}</span>
              </div>

              {/* Bio Preview */}
              {conn.bio && (
                <p className="text-[11px] text-slate-300 line-clamp-2 italic bg-slate-950/60 p-2 rounded-xl border border-white/5">
                  "{conn.bio}"
                </p>
              )}

              {/* Action Toolbar */}
              <div className="flex items-center justify-between pt-1 border-t border-white/5">
                <div className="flex items-center gap-2">
                  {conn.instagram && (
                    <a
                      href={`https://instagram.com/${conn.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 transition-colors"
                      title="Instagram"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {conn.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${conn.linkedin}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownload(conn)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-white/10 transition-all active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400" />
                    <span>vCard</span>
                  </button>

                  <button
                    onClick={() => {
                      hapticFeedback.light();
                      onOpenChat(conn);
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-pink-500 text-xs font-bold text-white shadow-md shadow-cyan-500/20 transition-all active:scale-95"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="glass-card rounded-2xl p-8 text-center space-y-3">
            <Search className="w-8 h-8 text-slate-500 mx-auto" />
            <p className="text-sm font-semibold text-slate-300">No connections found</p>
            <p className="text-xs text-slate-500">Try adjusting your search terms or scan new QR cards.</p>
          </div>
        )}
      </div>
    </div>
  );
}
