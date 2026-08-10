import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { X, Scan, Zap, Camera, Sparkles, AlertCircle } from 'lucide-react';
import { aiAssistant } from '../utils/aiAssistant';

export default function QrScannerModal({ isOpen, onClose, onScanSuccess }) {
  if (!isOpen) return null;

  const [hasCameraError, setHasCameraError] = useState(false);
  const scannerRef = useRef(null);

  useEffect(() => {
    let html5QrcodeScanner = null;

    // Small delay to ensure DOM element exists
    const timer = setTimeout(() => {
      try {
        html5QrcodeScanner = new Html5QrcodeScanner(
          "qr-reader-container",
          {
            fps: 10,
            qrbox: { width: 220, height: 220 },
            aspectRatio: 1.0,
            showTorchButtonIfSupported: true,
            rememberLastUsedCamera: true
          },
          /* verbose= */ false
        );

        html5QrcodeScanner.render(
          (decodedText) => {
            if (html5QrcodeScanner) {
              try {
                html5QrcodeScanner.clear();
              } catch (e) {}
            }
            onScanSuccess(decodedText);
            onClose();
          },
          (errorMessage) => {
            // Ignore scan attempt frame misses
          }
        );
      } catch (err) {
        console.warn("Camera scanner fallback mode enabled:", err);
        setHasCameraError(true);
      }
    }, 150);

    return () => {
      clearTimeout(timer);
      if (html5QrcodeScanner) {
        try {
          html5QrcodeScanner.clear();
        } catch (e) {}
      }
    };
  }, []);

  const handleSimulatedScan = (demoPayload) => {
    onScanSuccess(demoPayload || 'https://scanme.app/u/elena-rostova');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg animate-fadeIn">
      <div className="w-full max-w-md bg-slate-900 rounded-3xl border border-cyan-500/30 shadow-2xl overflow-hidden flex flex-col relative">
        {/* Top Header */}
        <div className="p-4 px-6 border-b border-white/10 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Scan className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-sm">Scan Contact QR Code</h3>
              <p className="text-[10px] text-slate-400">Point camera at another user's Scan Me card</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scanner Body Area */}
        <div className="p-6 flex flex-col items-center justify-center relative min-h-[300px] bg-slate-950">
          {/* Animated Laser Overlay */}
          <div className="relative w-64 h-64 border-2 border-cyan-400/50 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center bg-slate-900/60">
            {/* Corner Markers */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-cyan-400 rounded-tl-lg" />
            <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 border-cyan-400 rounded-tr-lg" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 border-cyan-400 rounded-bl-lg" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-cyan-400 rounded-br-lg" />

            {/* Scanning Laser Beam Line */}
            <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-lg shadow-cyan-400 animate-laser-sweep z-20" />

            {/* Html5 Scanner Mount Container */}
            <div id="qr-reader-container" className="w-full h-full text-slate-200" />
          </div>

          {/* Quick Demo Simulator CTA for Client Preview */}
          <div className="w-full mt-6 space-y-2">
            <div className="flex items-center gap-2 text-slate-400 text-xs justify-center mb-1">
              <Camera className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold text-[11px] uppercase tracking-wider">Vision & Quick Demo Scanner</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleSimulatedScan('https://scanme.app/u/elena-rostova')}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-xs font-semibold text-cyan-300 flex items-center justify-center gap-1.5 transition-all active:scale-95"
              >
                <Zap className="w-3.5 h-3.5 text-yellow-400" /> Scan Elena (QR)
              </button>
              <button
                onClick={async () => {
                  const ocrUser = await aiAssistant.parseCardImage(null);
                  onScanSuccess(ocrUser.qrCodeVal || 'https://scanme.app/u/victoria-sterling');
                  onClose();
                }}
                className="px-3 py-2 rounded-xl bg-cyan-950/80 hover:bg-cyan-900/80 border border-cyan-500/40 text-xs font-semibold text-pink-300 flex items-center justify-center gap-1.5 transition-all active:scale-95"
              >
                <Camera className="w-3.5 h-3.5 text-cyan-400" /> Card / Badge OCR
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="p-3 bg-slate-950 border-t border-white/5 text-center">
          <p className="text-[10px] text-slate-500">Supports standard QR codes & native mobile camera web APIs</p>
        </div>
      </div>
    </div>
  );
}
