'use client';

import { Block } from '@/lib/blockchain';

interface TransactionLedgerProps {
  blocks: Block[];
}

export function TransactionLedger({ blocks }: TransactionLedgerProps) {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
      <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-400" />
        Transaction Ledger
      </h2>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {blocks.length === 0 ? (
          <p className="text-slate-400 text-sm text-center py-8">No transactions yet</p>
        ) : (
          blocks.map((block, index) => (
            <div
              key={index}
              className="p-4 bg-slate-900/50 border border-slate-700 rounded-xl hover:bg-slate-900/70 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-xs text-slate-500 font-mono uppercase tracking-widest mb-1">
                    Block {index}
                  </p>
                  <p className="text-slate-200 font-mono text-sm">
                    {block.data}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 font-mono uppercase tracking-widest mb-1">
                    Timestamp
                  </p>
                  <p className="text-slate-400 font-mono text-xs">
                    {new Date(block.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
