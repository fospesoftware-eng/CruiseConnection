import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Edit3, Download, Share2, Copy, Sparkles, MapPin, Phone, Mail, Instagram, Linkedin, ExternalLink, ShieldCheck, Lock, Unlock, Check } from 'lucide-react';
import { downloadVCard } from '../utils/vcard';
import { hapticFeedback } from '../utils/haptics';
import { sounds } from '../utils/sound';

export default function ProfileCard({ profile, onEditProfile, onShowToast, privacyMode = 'private', onTogglePrivacyMode }) {
  const [viewMode, setViewMode] = useState('card'); // 'card' | 'qr'

  const isPrivate = privacyMode === 'private';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profile.qrCodeVal);
    hapticFeedback.light();
    sounds.playPop();
    onShowToast('Profile QR link copied to clipboard!', 'success');
  };

  const handleDownloadMyVCard = () => {
    if (isPrivate) {
      onShowToast('vCard disabled in Private Mode. Switch to Full Share mode to enable.', 'error');
      return;
    }
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
          title: `Connect with ${profile.name} on CruiseConnector`,
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
                ? 'bg-gradient-to-r from-slate-100 to-slate-300 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Digital Card
          </button>
          <button
            onClick={() => setViewMode('qr')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              viewMode === 'qr'
                ? 'bg-gradient-to-r from-slate-100 to-slate-300 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Full QR View
          </button>
        </div>
      </div>

      {viewMode === 'card' ? (
        /* Full Card View with Running Gradient Border & Soft Minimalist Aesthetics */
        <div className="luxury-border-wrapper shadow-2xl">
          <div className="glass-card rounded-3xl p-6 relative overflow-hidden transition-all duration-500">
            {/* Soft Breathing Ambient Backlight */}
            <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-sky-500/10 blur-3xl pointer-events-none animate-luxury-breathe" />
            <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-amber-500/10 blur-3xl pointer-events-none animate-luxury-breathe" />

          {/* Minimalist Soft Wave Horizon Vector Accent */}
          <div className="absolute top-0 left-0 right-0 h-20 pointer-events-none overflow-hidden opacity-20">
            <svg className="w-full h-full text-sky-200 animate-luxury-wave-1" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,0 C150,50 350,-20 500,20 C650,60 900,10 1200,30 L1200,0 L0,0 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <svg className="w-full h-full text-slate-400 animate-luxury-wave-2 -mt-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,20 C200,40 400,-10 600,25 C800,60 1000,5 1200,20 L1200,0 L0,0 Z" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
          </div>

          {/* Top Status & Edit Bar */}
          <div className="flex items-center justify-between relative z-10 mb-6">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-200 text-[10px] font-bold tracking-widest uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>{profile.badge || 'VERIFIED VIP'}</span>
            </div>

            <button
              onClick={onEditProfile}
              className="p-2 rounded-full glass-pill hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              title="Edit Profile"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Main Profile Info */}
          <div className="flex flex-col items-center text-center relative z-10 space-y-3">
            {/* Avatar with Soft Pearl Ring & Golden Verification Tick */}
            <div className="relative group cursor-pointer" onClick={onEditProfile}>
              <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-slate-200 via-sky-400/40 to-amber-300/40 shadow-2xl">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover rounded-full bg-slate-900"
                />
              </div>
              <div className="absolute bottom-0.5 right-0.5 w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 flex items-center justify-center text-slate-950 border-2 border-slate-950 shadow-md" title="Verified Member">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">{profile.name}</h2>
              <p className="text-xs font-medium text-slate-300 mt-0.5">{profile.title} {profile.company ? `• ${profile.company}` : ''}</p>
            </div>

            {/* Location Badge */}
            {profile.locationTag && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-medium">
                <MapPin className="w-3 h-3 text-amber-400" />
                <span>{profile.locationTag}</span>
              </div>
            )}

            {/* Bio */}
            <p className="text-xs text-slate-300 max-w-xs leading-relaxed italic bg-white/[0.03] p-3 rounded-2xl border border-white/5">
              "{profile.bio}"
            </p>

            {/* QR Code Container */}
            <div className="my-3 p-4 rounded-2xl bg-white p-3 shadow-2xl relative group cursor-pointer border border-white/20" onClick={() => setViewMode('qr')}>
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
              <div className="absolute inset-0 bg-slate-950/70 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-slate-200 text-xs font-medium gap-1">
                <Sparkles className="w-4 h-4 text-amber-400" /> Tap to Enlarge
              </div>
            </div>

            <p className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
              {isPrivate ? (
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20 font-medium text-[10px]">
                  <Lock className="w-3 h-3 text-sky-400" /> Private Mode: Shares Profile & Chat Only
                </span>
              ) : (
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium text-[10px]">
                  <Unlock className="w-3 h-3 text-amber-400" /> Full Share Mode: Phone, Email & Social Shared
                </span>
              )}
            </p>

            {/* Social & Contact Badges */}
            {!isPrivate ? (
              <div className="flex flex-wrap justify-center gap-2 pt-1">
                {profile.instagram && (
                  <a
                    href={`https://instagram.com/${profile.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-medium transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5 text-pink-400" />
                    <span>@{profile.instagram.replace('@', '')}</span>
                  </a>
                )}
                {profile.linkedin && (
                  <a
                    href={`https://linkedin.com/in/${profile.linkedin}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-medium transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {profile.phone && (
                  <a
                    href={`tel:${profile.phone}`}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-medium transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{profile.phone}</span>
                  </a>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-white/5 text-slate-400 text-[11px] font-normal">
                <Lock className="w-3 h-3 text-slate-500" />
                <span>Phone & social handles shielded</span>
              </div>
            )}

            {/* Tags */}
            {profile.tags && profile.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                {profile.tags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.03] text-slate-400 border border-white/5">
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
              className="flex flex-col items-center justify-center p-2.5 rounded-xl glass-pill hover:bg-white/10 text-slate-300 hover:text-white transition-all active:scale-95"
            >
              <Download className="w-4 h-4 text-slate-300 mb-1" />
              <span className="text-[10px] font-medium">vCard</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="flex flex-col items-center justify-center p-2.5 rounded-xl glass-pill hover:bg-white/10 text-slate-300 hover:text-white transition-all active:scale-95"
            >
              <Copy className="w-4 h-4 text-slate-300 mb-1" />
              <span className="text-[10px] font-medium">Copy Link</span>
            </button>
            <button
              onClick={handleShare}
              className="flex flex-col items-center justify-center p-2.5 rounded-xl glass-pill hover:bg-white/10 text-slate-300 hover:text-white transition-all active:scale-95"
            >
              <Share2 className="w-4 h-4 text-slate-300 mb-1" />
              <span className="text-[10px] font-medium">Share</span>
            </button>
          </div>

          {/* Ultra-Minimalist Soft Footer Privacy Switcher */}
          <div className="mt-4 pt-3 border-t border-white/5 relative z-10 flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${isPrivate ? 'bg-sky-400' : 'bg-amber-400'}`} />
              <div className="text-left">
                <p className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                  {isPrivate ? <Lock className="w-3 h-3 text-sky-400" /> : <Unlock className="w-3 h-3 text-amber-400" />}
                  <span>{isPrivate ? 'Private Mode' : 'Full Share Mode'}</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                hapticFeedback.medium();
                sounds.playPop();
                onTogglePrivacyMode(isPrivate ? 'full' : 'private');
              }}
              className="px-3 py-1 rounded-full text-[10px] font-semibold transition-all border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white active:scale-95"
            >
              {isPrivate ? 'Enable Full' : 'Make Private'}
            </button>
          </div>
        </div>
      </div>
      ) : (
        /* Enlarged Standalone QR Mode for high brightness scanning */
        <div className="glass-card rounded-3xl p-8 text-center flex flex-col items-center space-y-6 border border-white/10">
          <div>
            <h3 className="text-xl font-extrabold text-white">Full Screen QR</h3>
            <p className="text-xs text-slate-400 mt-1">Show this screen to anyone scanning your card</p>
          </div>

          <div className="p-6 bg-white rounded-3xl shadow-2xl">
            <QRCodeSVG
              value={profile.qrCodeVal}
              size={240}
              level="H"
              includeMargin={true}
            />
          </div>

          <div className="text-center">
            <p className="text-sm font-bold text-white">{profile.name}</p>
            <p className="text-xs text-slate-400">{profile.title}</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-200 border border-white/10"
            >
              <Copy className="w-4 h-4 text-slate-300" />
              <span>Copy URL</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-950 text-xs font-bold shadow-md hover:bg-white"
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
