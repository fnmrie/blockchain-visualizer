'use client';

import { CheckCircle2, AlertCircle } from 'lucide-react';

interface ValidationIndicatorProps {
  isValid: boolean;
}

export function ValidationIndicator({ isValid }: ValidationIndicatorProps) {
  return (
    <div className={`p-8 rounded-2xl backdrop-blur-sm flex items-center gap-4 border transition-all ${
      isValid 
        ? 'bg-blue-500/10 border-blue-500/50 hover:bg-blue-500/20' 
        : 'bg-red-500/10 border-red-500/50 hover:bg-red-500/20'
    }`}>
      {isValid ? (
        <>
          <CheckCircle2 className="w-12 h-12 text-blue-400 flex-shrink-0 animate-pulse" />
          <div>
            <h2 className="text-2xl font-bold text-blue-400 font-mono">Chain Valid</h2>
            <p className="text-blue-300/80 text-sm">All blocks are properly linked and immutable</p>
          </div>
        </>
      ) : (
        <>
          <AlertCircle className="w-12 h-12 text-red-400 flex-shrink-0 animate-pulse" />
          <div>
            <h2 className="text-2xl font-bold text-red-400 font-mono">Chain Invalid</h2>
            <p className="text-red-300/80 text-sm">Tampering detected: one or more blocks modified</p>
          </div>
        </>
      )}
    </div>
  );
}
