'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { Blockchain } from '@/lib/blockchain';
import { BlockCard } from '@/components/BlockCard';
import { ValidationIndicator } from '@/components/ValidationIndicator';
import { MiningInterface } from '@/components/MiningInterface';
import { DifficultySelector } from '@/components/DifficultySelector';
import { TransactionLedger } from '@/components/TransactionLedger';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [blockchain, setBlockchain] = useState<Blockchain | null>(null);
  const [isMining, setIsMining] = useState(false);
  const [miningTime, setMiningTime] = useState<number | null>(null);
  const [autoMiningCount, setAutoMiningCount] = useState(0);

  // Initialize blockchain on mount (client-side only)
  useEffect(() => {
    const bc = new Blockchain();
    setBlockchain(bc);
  }, []);

  // Compute validation memoized to avoid infinite updates
  const isChainValid = useMemo(() => {
    return blockchain ? blockchain.isChainValid() : true;
  }, [blockchain]);

  const handleMine = useCallback(
    async (data: string) => {
      if (!blockchain) return;

      setIsMining(true);
      setMiningTime(null);

      // Simulate async mining with setTimeout to allow UI updates
      setTimeout(() => {
        const newBlockchain = new Blockchain();
        newBlockchain.chain = [...blockchain.chain];
        newBlockchain.difficulty = blockchain.difficulty;

        const { miningTime: time } = newBlockchain.addBlock(data);
        setMiningTime(time);
        setBlockchain(newBlockchain);
        setIsMining(false);
      }, 0);
    },
    [blockchain]
  );

  const handleAutoMine = useCallback(async () => {
    if (!blockchain || isMining) return;

    const count = autoMiningCount || 5;
    let currentBC = blockchain;

    for (let i = 0; i < count; i++) {
      setIsMining(true);
      await new Promise((resolve) => {
        setTimeout(() => {
          const newBlockchain = new Blockchain();
          newBlockchain.chain = [...currentBC.chain];
          newBlockchain.difficulty = currentBC.difficulty;
          newBlockchain.addBlock(`Auto Block ${i + 1}`);
          currentBC = newBlockchain;
          setBlockchain(newBlockchain);
          resolve(null);
        }, 0);
      });
    }
    setIsMining(false);
  }, [blockchain, isMining, autoMiningCount]);

  const handleDifficultyChange = useCallback((difficulty: number) => {
    if (!blockchain) return;
    const newBlockchain = new Blockchain();
    newBlockchain.chain = [...blockchain.chain];
    newBlockchain.difficulty = difficulty;
    setBlockchain(newBlockchain);
    setMiningTime(null);
  }, [blockchain]);

  const handleEditBlock = useCallback(
    (blockIndex: number, newData: string) => {
      if (!blockchain) return;
      const newBlockchain = new Blockchain();
      newBlockchain.chain = [...blockchain.chain];
      newBlockchain.difficulty = blockchain.difficulty;
      newBlockchain.editBlockData(blockIndex, newData);
      setBlockchain(newBlockchain);
    },
    [blockchain]
  );

  const handleResetBlockchain = useCallback(() => {
    const bc = new Blockchain();
    setBlockchain(bc);
    setMiningTime(null);
    setAutoMiningCount(0);
  }, []);

  if (!blockchain) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-slate-400 text-lg">Initializing blockchain...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-blue-400 text-sm font-mono font-semibold">BLOCKCHAIN NETWORK</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">
            Blockchain Visualizer
          </h1>
          <p className="text-slate-400 text-lg">
            Explore mining, hashing, and validation in real-time
          </p>
        </div>

        {/* Validation Indicator */}
        <div className="mb-12">
          <ValidationIndicator isValid={isChainValid} />
        </div>

        {/* Top Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2">
            <MiningInterface
              difficulty={blockchain.difficulty}
              onMine={handleMine}
              isMining={isMining}
              miningTime={miningTime}
            />
          </div>
          
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-sm font-mono text-blue-400 font-semibold mb-4 uppercase tracking-wide">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={autoMiningCount || 5}
                  onChange={(e) => setAutoMiningCount(parseInt(e.target.value) || 5)}
                  disabled={isMining}
                  className="w-16 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 text-sm font-mono disabled:opacity-50 focus:outline-none focus:border-blue-400"
                />
                <Button
                  onClick={handleAutoMine}
                  disabled={isMining}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-slate-950 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Auto Mine
                </Button>
              </div>
              <Button
                onClick={handleResetBlockchain}
                disabled={isMining}
                variant="outline"
                className="w-full border-slate-600 text-slate-300 hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent"
              >
                Reset Chain
              </Button>
            </div>
          </div>
        </div>

        {/* Difficulty Selector */}
        <div className="mb-12">
          <DifficultySelector
            difficulty={blockchain.difficulty}
            onDifficultyChange={handleDifficultyChange}
            disabled={isMining}
          />
        </div>

        {/* Transaction Ledger */}
        <div className="mb-12">
          <TransactionLedger blocks={blockchain.chain} />
        </div>

        {/* Blockchain Display */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              Chain Status: <span className="text-blue-400">{blockchain.chain.length} blocks</span>
            </h2>
          </div>

          <div className="space-y-3">
            {blockchain.chain.map((block, index) => {
              const isBlockValid =
                index === 0 ||
                (blockchain.chain[index - 1].hash === block.previousHash &&
                  block.hash === block.calculateHash());

              return (
                <div key={index}>
                  <BlockCard
                    block={block}
                    isValid={isBlockValid}
                    onEdit={(newData) => handleEditBlock(index, newData)}
                  />
                  {index < blockchain.chain.length - 1 && (
                    <div className="flex justify-center py-1">
                      <div className="text-blue-400/40 text-xl">↓</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-8 text-center backdrop-blur-sm">
          <p className="text-slate-400 text-sm leading-relaxed">
            <span className="text-blue-400 font-semibold">Try editing</span> a block{`'`}s data to see the chain become invalid,
            or <span className="text-blue-400 font-semibold">increase difficulty</span> to observe longer mining times. 
            Blockchain security through transparency.
          </p>
        </div>
      </div>
    </main>
  );
}
