'use client';

import { Button } from '@/components/ui/button';

interface DifficultySelectorProps {
  difficulty: number;
  onDifficultyChange: (difficulty: number) => void;
  disabled?: boolean;
}

export function DifficultySelector({ difficulty, onDifficultyChange, disabled }: DifficultySelectorProps) {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
      <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-400" />
        Mining Difficulty
      </h2>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((level) => (
            <Button
              key={level}
              onClick={() => onDifficultyChange(level)}
              disabled={disabled}
              className={`flex-1 py-3 text-base font-semibold transition-all rounded-xl ${
                difficulty === level
                  ? 'bg-blue-500 hover:bg-blue-600 text-slate-950'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {level}
            </Button>
          ))}
        </div>

        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
          <p className="text-sm text-slate-300">
            <span className="font-semibold text-blue-400">Current: {difficulty}</span>
            <br />
            <span className="text-slate-400 text-xs mt-2 inline-block">
              Requires hash starting with: <code className="font-mono text-blue-300">{Array(difficulty).fill('0').join('')}</code>
            </span>
          </p>
        </div>

        <div className="text-xs text-slate-400 space-y-2 font-mono">
          <p><span className="text-blue-400">→</span> Level 1: Very fast (~1-5ms)</p>
          <p><span className="text-blue-400">→</span> Level 2: Fast (~5-20ms)</p>
          <p><span className="text-blue-400">→</span> Level 3: Moderate (~50-200ms)</p>
          <p><span className="text-blue-400">→</span> Level 4: Slow (~500ms-2s)</p>
        </div>
      </div>
    </div>
  );
}
