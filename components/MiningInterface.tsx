'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface MiningInterfaceProps {
  difficulty: number;
  onMine: (data: string) => Promise<void>;
  isMining: boolean;
  miningTime: number | null;
}

export function MiningInterface({ onMine, isMining, miningTime, difficulty }: MiningInterfaceProps) {
  const [blockData, setBlockData] = useState('');

  const handleMine = async () => {
    if (blockData.trim()) {
      await onMine(blockData.trim());
      setBlockData('');
    }
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
      <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-400" />
        Mine New Block
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-mono text-slate-400 font-semibold mb-3 uppercase tracking-widest">
            Block Data
          </label>
          <input
            type="text"
            value={blockData}
            onChange={(e) => setBlockData(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isMining && handleMine()}
            placeholder="e.g., Alice pays Bob 10 BTC"
            disabled={isMining}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl font-mono text-sm text-slate-200 placeholder-slate-500 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <Button
            onClick={handleMine}
            disabled={isMining || !blockData.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-slate-950 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors w-full sm:w-auto"
          >
            {isMining && <Loader2 className="w-4 h-4 animate-spin" />}
            {isMining ? 'Mining...' : 'Mine Block'}
          </Button>

          <div className="text-sm text-slate-400">
            <p>Difficulty: <span className="font-bold text-blue-400">{difficulty}</span></p>
            {miningTime && (
              <p className="text-blue-400 font-semibold mt-1">
                ✓ Mined in {miningTime}ms
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
