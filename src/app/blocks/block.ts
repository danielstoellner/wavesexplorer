
export class Block {
  version: number;
  timestamp: Date;
  reference: string;
  generator: string;
  signature: string;
  transactionCount: number;
  fee: number;
  blocksize: number;
  height: number;
}

export class BlocksModel {
  blocks: Block[];
}

export class BlockHeight {
  height: number;
}
