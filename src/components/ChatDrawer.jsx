import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles, Phone, Video, MapPin, CheckCheck, Smile, ShieldAlert, Wand2, Volume2, Mic } from 'lucide-react';
import { hapticFeedback } from '../utils/haptics';
import { aiAssistant } from '../utils/aiAssistant';

export default function ChatDrawer({ isOpen, onClose, activeUser, currentUserId, onSendMessage }) {
  if (!isOpen || !activeUser) return null;

  const [inputMsg, setInputMsg] = useState('');
  const [privacyWarning, setPrivacyWarning] = useState(null);
  const [aiSparks, setAiSparks] = useState([]);
  const [isLoadingSparks, setIsLoadingSparks] = useState(false);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const messagesEndRef = useRef(null);

  const messages = activeUser.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputMsg(val);
    
    // Privacy Shield Check
    const privacyCheck = aiAssistant.checkPrivacyRisk(val);
    if (privacyCheck.flagged) {
      setPrivacyWarning(privacyCheck.reason);
    } else {
      setPrivacyWarning(null);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    onSendMessage(activeUser.id, inputMsg.trim());
    setInputMsg('');
    setPrivacyWarning(null);
  };

  const handleIcebreakerClick = (text) => {
    onSendMessage(activeUser.id, text);
    hapticFeedback.light();
  };

  const handleTriggerAiSpark = async () => {
    hapticFeedback.medium();
    setIsLoadingSparks(true);
    const sparks = await aiAssistant.generateSparks(activeUser.locationTag, activeUser);
    setAiSparks(sparks);
    setIsLoadingSparks(false);
  };

  const handleVoiceNoteClick = async () => {
    hapticFeedback.medium();
    setIsRecordingVoice(true);
    const transcribedText = await aiAssistant.transcribeVoiceNote(null);
    setInputMsg(transcribedText);
    setIsRecordingVoice(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md bg-slate-900 rounded-t-3xl sm:rounded-3xl border border-cyan-500/30 shadow-2xl overflow-hidden h-[85vh] sm:h-[650px] flex flex-col">
        {/* Chat Drawer Header */}
        <div className="p-4 px-5 border-b border-white/10 flex items-center justify-between bg-slate-950/70 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={activeUser.avatar}
                alt={activeUser.name}
                className="w-10 h-10 rounded-full object-cover border border-cyan-400"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-slate-950" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">{activeUser.name}</h3>
              <p className="text-[10px] text-cyan-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>Active Connection • {activeUser.locationTag || 'Online'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTriggerAiSpark}
              className="p-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-colors flex items-center gap-1 text-[11px] font-bold"
              title="AI Memory Spark"
            >
              <Wand2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>AI Spark</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feature 3: AI Instant Connection Recap Banner */}
        <div className="px-4 py-2 bg-gradient-to-r from-slate-950 via-cyan-950/40 to-slate-950 border-b border-cyan-500/20 text-[11px] text-slate-300 flex items-center gap-2 shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="truncate">
            <span className="font-bold text-cyan-300">Recap:</span> {aiAssistant.generateRecap(activeUser.locationTag, activeUser.metDate)}
          </span>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/50">
          <div className="text-center my-2">
            <span className="text-[10px] px-3 py-1 rounded-full bg-white/5 text-slate-400 border border-white/5">
              Instant Contact Bridge Connected • End-to-End Encrypted
            </span>
          </div>

          {messages.map((msg) => {
            const isMe = msg.sender === currentUserId;
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-1 animate-fadeIn`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                    isMe
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-none shadow-md shadow-cyan-500/10'
                      : 'bg-slate-800 text-slate-100 rounded-bl-none border border-white/10'
                  }`}
                >
                  {msg.text}
                </div>
                <div className="flex items-center gap-1 text-[9px] text-slate-500 px-1">
                  <span>{msg.timestamp}</span>
                  {isMe && <CheckCheck className="w-3 h-3 text-cyan-400" />}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Feature 1: AI Memory Spark Chips */}
        {aiSparks.length > 0 && (
          <div className="px-3 py-2 bg-slate-950 border-t border-cyan-500/20 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            <Wand2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 ml-1 animate-spin" />
            {aiSparks.map((text, idx) => (
              <button
                key={idx}
                onClick={() => handleIcebreakerClick(text)}
                className="px-2.5 py-1 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-[10px] font-semibold text-cyan-300 whitespace-nowrap border border-cyan-500/30 active:scale-95 transition-all"
              >
                {text}
              </button>
            ))}
          </div>
        )}

        {/* Feature 4: Privacy Shield Alert Banner */}
        {privacyWarning && (
          <div className="px-3 py-1.5 bg-rose-950/90 border-t border-rose-500/40 text-rose-300 text-[10px] font-medium flex items-center gap-2 shrink-0 animate-fadeIn">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="flex-1">{privacyWarning}</span>
          </div>
        )}

        {/* Chat Input Bar with Feature 5: Audio Voice Note */}
        <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-white/10 flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleVoiceNoteClick}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              isRecordingVoice
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-cyan-300'
            }`}
            title="Audio-to-Text Voice Note"
          >
            <Mic className="w-4 h-4" />
          </button>

          <input
            type="text"
            placeholder={`Message ${activeUser.name.split(' ')[0]}...`}
            value={inputMsg}
            onChange={handleInputChange}
            className="flex-1 px-4 py-2.5 bg-slate-950 border border-white/10 rounded-2xl text-xs text-white placeholder-slate-500 focus:border-cyan-400 outline-none"
          />

          <button
            type="submit"
            disabled={!inputMsg.trim()}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
              inputMsg.trim()
                ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white shadow-lg shadow-cyan-500/20 active:scale-95'
                : 'bg-slate-800 text-slate-600'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
