import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Edit3, Download, Share2, Copy, Sparkles, MapPin, Phone, Mail, Instagram, Linkedin, ExternalLink, ShieldCheck } from 'lucide-react';
import { downloadVCard } from '../utils/vcard';
import { hapticFeedback } from '../utils/haptics';
import { sounds } from '../utils/sound';

export default function ProfileCard({ profile, onEditProfile, onShowToast }) {
  const [viewMode, setViewMode] = useState('card'); // 'card' | 'qr'

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profile.qrCodeVal);
    hapticFeedback.light();
    sounds.playPop();
    onShowToast('Profile QR link copied to clipboard!', 'success');
  };

  const handleDownloadMyVCard = () => {
    downloadVCard(profile);
    hapticFeedback.medium();
    sounds.playPop();
    onShowToast('Your vCard downloaded!', 'success');
  };

  const handleShare = async () => {
    hapticFeedback.light();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Connect with ${profile.name} on Scan Me`,
          text: profile.bio,
          url: profile.qrCodeVal,
        });
      } catch (err) {}
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4 pb-24 pt-2">
      {/* View Switcher Pill */}
      <div className="flex justify-center">
        <div className="p-1 rounded-full glass-panel border border-white/10 flex items-center gap-1 shadow-lg">
          <button
            onClick={() => setViewMode('card')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              viewMode === 'card'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Digital Card
          </button>
          <button
            onClick={() => setViewMode('qr')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              viewMode === 'qr'
                ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Full QR View
          </button>
        </div>
      </div>

      {viewMode === 'card' ? (
        /* Full Card View */
        <div className="glass-card rounded-3xl p-6 relative overflow-hidden border border-white/15 shadow-2xl transition-all duration-300">
          {/* Ambient Glow Orbs */}
          <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" />

          {/* Top Status & Edit Bar */}
          <div className="flex items-center justify-between relative z-10 mb-6">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-bold tracking-wider uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{profile.badge || 'VERIFIED VIP'}</span>
            </div>
            <button
              onClick={onEditProfile}
              className="p-2 rounded-full glass-pill hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              title="Edit Profile"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>

          {/* Main Profile Info */}
          <div className="flex flex-col items-center text-center relative z-10 space-y-3">
            {/* Avatar with Glow Ring */}
            <div className="relative group cursor-pointer" onClick={onEditProfile}>
              <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-pink-500 to-violet-500 shadow-xl shadow-cyan-500/20 animate-pulse-glow">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover rounded-full bg-slate-900"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-cyan-500 p-1 flex items-center justify-center text-slate-950 font-bold border-2 border-slate-950">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">{profile.name}</h2>
              <p className="text-xs font-semibold text-cyan-400 mt-0.5">{profile.title} {profile.company ? `• ${profile.company}` : ''}</p>
            </div>

            {/* Location Badge */}
            {profile.locationTag && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-white/10 text-slate-300 text-xs font-medium">
                <MapPin className="w-3.5 h-3.5 text-pink-400" />
                <span>{profile.locationTag}</span>
              </div>
            )}

            {/* Bio */}
            <p className="text-xs text-slate-300 max-w-xs leading-relaxed italic bg-white/5 p-3 rounded-2xl border border-white/5">
              "{profile.bio}"
            </p>

            {/* QR Code Container */}
            <div className="my-3 p-4 rounded-2xl bg-white p-3 shadow-2xl relative group cursor-pointer" onClick={() => setViewMode('qr')}>
              <QRCodeSVG
                value={profile.qrCodeVal}
                size={160}
                level="H"
                includeMargin={false}
                imageSettings={{
                  src: "/favicon.svg",
                  x: undefined,
                  y: undefined,
                  height: 32,
                  width: 32,
                  excavate: true,
                }}
              />
              <div className="absolute inset-0 bg-slate-950/70 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-cyan-300 text-xs font-bold gap-1">
                <Sparkles className="w-4 h-4" /> Tap to Enlarge
              </div>
            </div>

            <p className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
              <span>Scan to instantly save contact details</span>
            </p>

            {/* Social & Contact Badges */}
            <div className="flex flex-wrap justify-center gap-2 pt-1">
              {profile.instagram && (
                <a
                  href={`https://instagram.com/${profile.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 border border-pink-500/30 text-xs font-medium transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@{profile.instagram.replace('@', '')}</span>
                </a>
              )}
              {profile.linkedin && (
                <a
                  href={`https://linkedin.com/in/${profile.linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-medium transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              )}
              {profile.phone && (
                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{profile.phone}</span>
                </a>
              )}
            </div>

            {/* Tags */}
            {profile.tags && profile.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                {profile.tags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/5">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Quick Action Grid */}
          <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-white/10 relative z-10">
            <button
              onClick={handleDownloadMyVCard}
              className="flex flex-col items-center justify-center p-2.5 rounded-xl glass-pill hover:bg-white/10 text-slate-200 transition-all active:scale-95"
            >
              <Download className="w-4 h-4 text-cyan-400 mb-1" />
              <span className="text-[10px] font-semibold">vCard</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="flex flex-col items-center justify-center p-2.5 rounded-xl glass-pill hover:bg-white/10 text-slate-200 transition-all active:scale-95"
            >
              <Copy className="w-4 h-4 text-pink-400 mb-1" />
              <span className="text-[10px] font-semibold">Copy Link</span>
            </button>
            <button
              onClick={handleShare}
              className="flex flex-col items-center justify-center p-2.5 rounded-xl glass-pill hover:bg-white/10 text-slate-200 transition-all active:scale-95"
            >
              <Share2 className="w-4 h-4 text-violet-400 mb-1" />
              <span className="text-[10px] font-semibold">Share</span>
            </button>
          </div>
        </div>
      ) : (
        /* Enlarged Standalone QR Mode for high brightness scanning */
        <div className="glass-card rounded-3xl p-8 text-center flex flex-col items-center space-y-6 border border-cyan-500/30">
          <div>
            <h3 className="text-xl font-bold text-white">Full Screen QR</h3>
            <p className="text-xs text-slate-400 mt-1">Show this screen to anyone scanning your card</p>
          </div>

          <div className="p-6 bg-white rounded-3xl shadow-2xl glow-cyan animate-pulse-glow">
            <QRCodeSVG
              value={profile.qrCodeVal}
              size={240}
              level="H"
              includeMargin={true}
            />
          </div>

          <div className="text-center">
            <p className="text-sm font-bold text-cyan-400">{profile.name}</p>
            <p className="text-xs text-slate-400">{profile.title}</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-white/10"
            >
              <Copy className="w-4 h-4 text-cyan-400" />
              <span>Copy URL</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 text-xs font-semibold text-white"
            >
              <Share2 className="w-4 h-4" />
              <span>Share QR</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
