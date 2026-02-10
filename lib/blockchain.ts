import SHA256 from 'crypto-js/sha256';

export class Block {
  index: number;
  timestamp: number;
  data: string;
  previousHash: string;
  nonce: number;
  hash: string;

  constructor(index: number, timestamp: number, data: string, previousHash: string = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash(): string {
    return SHA256(
      this.index +
      this.previousHash +
      this.timestamp +
      this.data +
      this.nonce
    ).toString();
  }

  mineBlock(difficulty: number): number {
    const target = Array(difficulty + 1).join('0');
    const startTime = performance.now();
    
    while (this.hash.substring(0, difficulty) !== target) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    
    const miningTime = Math.round(performance.now() - startTime);
    console.log(`Block mined in ${miningTime}ms: ${this.hash}`);
    return miningTime;
  }
}

export class Blockchain {
  chain: Block[];
  difficulty: number;

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
  }

  createGenesisBlock(): Block {
    return new Block(0, Date.now(), 'Genesis Block', '0');
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data: string): { block: Block; miningTime: number } {
    const newBlock = new Block(
      this.chain.length,
      Date.now(),
      data,
      this.getLatestBlock().hash
    );
    
    const miningTime = newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
    return { block: newBlock, miningTime };
  }

  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      // Check if current block's hash is valid
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      // Check if blocks are properly linked
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }

  setDifficulty(difficulty: number): void {
    this.difficulty = Math.max(1, Math.min(4, difficulty));
  }

  editBlockData(blockIndex: number, newData: string): void {
    if (blockIndex < 0 || blockIndex >= this.chain.length) return;
    this.chain[blockIndex].data = newData;
  }
}
