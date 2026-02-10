'use client';

import { Block } from '@/lib/blockchain';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface BlockCardProps {
  block: Block;
  isValid: boolean;
  onEdit?: (newData: string) => void;
}

export function BlockCard({ block, isValid, onEdit }: BlockCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(block.data);

  const handleSave = () => {
    onEdit?.(editData);
    setIsEditing(false);
  };

  return (
    <Card
      className={`p-6 border-2 transition-all backdrop-blur-sm ${
        isValid 
          ? 'border-blue-500/50 bg-slate-800/30 hover:bg-slate-800/50' 
          : 'border-red-500/50 bg-red-950/20 hover:bg-red-950/30'
      }`}
    >
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-slate-500 font-mono uppercase tracking-widest mb-1">Block</p>
            <h3 className="text-2xl font-bold text-white font-mono">
              #{block.index}
            </h3>
          </div>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm ${
            isValid 
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            {isValid ? '✓ Valid' : '✗ Invalid'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-xs text-slate-500 font-mono uppercase tracking-widest mb-2">Timestamp</p>
            <p className="text-slate-200 font-mono text-sm">
              {new Date(block.timestamp).toLocaleTimeString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 font-mono uppercase tracking-widest mb-2">Nonce</p>
            <p className="text-blue-400 font-mono text-sm font-semibold">{block.nonce}</p>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-4">
          <p className="text-xs text-slate-500 font-mono uppercase tracking-widest mb-2">Data</p>
          {isEditing ? (
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                value={editData}
                onChange={(e) => setEditData(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg font-mono text-sm text-slate-200 focus:outline-none focus:border-blue-400"
              />
              <Button size="sm" onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-slate-950 font-semibold">
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-700/50 bg-transparent"
                onClick={() => {
                  setEditData(block.data);
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div className="flex justify-between items-center gap-4">
              <p className="text-slate-300 font-mono text-sm break-all">{block.data}</p>
              <Button
                size="sm"
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-700/50 flex-shrink-0 bg-transparent"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-700 pt-4">
          <div>
            <p className="text-xs text-slate-500 font-mono uppercase tracking-widest mb-2">Previous Hash</p>
            <p className="text-slate-400 font-mono text-xs break-all">
              {block.previousHash.substring(0, 16)}
              {block.previousHash.length > 16 ? '...' : ''}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500 font-mono uppercase tracking-widest mb-2">Hash</p>
            <p className={`${isValid ? 'text-blue-400' : 'text-red-400'} font-mono text-xs break-all font-semibold`}>
              {block.hash.substring(0, 16)}...
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
