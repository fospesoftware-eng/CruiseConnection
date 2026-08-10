import React from 'react';
import { CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';

export default function Toast({ toast }) {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 animate-bounce transition-all duration-300">
      <div className={`px-4 py-2.5 rounded-full flex items-center gap-2.5 shadow-2xl glass-panel border ${
        isSuccess ? 'border-emerald-500/50 text-emerald-300 bg-emerald-950/80' : 
        isError ? 'border-rose-500/50 text-rose-300 bg-rose-950/80' : 
        'border-cyan-500/50 text-cyan-300 bg-slate-900/90'
      }`}>
        {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
        {isError && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
        {!isSuccess && !isError && <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />}
        <span className="text-xs font-semibold tracking-wide">{toast.message}</span>
      </div>
    </div>
  );
}
