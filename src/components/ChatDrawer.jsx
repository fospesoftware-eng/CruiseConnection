import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles, Phone, Video, MapPin, CheckCheck, Smile } from 'lucide-react';
import { hapticFeedback } from '../utils/haptics';

export default function ChatDrawer({ isOpen, onClose, activeUser, currentUserId, onSendMessage }) {
  if (!isOpen || !activeUser) return null;

  const [inputMsg, setInputMsg] = useState('');
  const messagesEndRef = useRef(null);

  const messages = activeUser.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    onSendMessage(activeUser.id, inputMsg.trim());
    setInputMsg('');
  };

  const handleIcebreakerClick = (text) => {
    onSendMessage(activeUser.id, text);
    hapticFeedback.light();
  };

  const icebreakers = [
    "Great meeting you on the deck! 🥂",
    "Let's grab a drink at the lounge later!",
    "Loved your work! Drop your portfolio link.",
    "Let me know when you're free for a chat."
  ];

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
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
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

        {/* Preset Quick Icebreakers */}
        <div className="px-3 py-2 bg-slate-950 border-t border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-pink-400 shrink-0 ml-1" />
          {icebreakers.map((text, idx) => (
            <button
              key={idx}
              onClick={() => handleIcebreakerClick(text)}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-[10px] font-medium text-slate-300 whitespace-nowrap border border-white/5 active:scale-95 transition-all"
            >
              {text}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-white/10 flex items-center gap-2 shrink-0">
          <input
            type="text"
            placeholder={`Message ${activeUser.name.split(' ')[0]}...`}
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
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
