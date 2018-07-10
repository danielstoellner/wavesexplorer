import {Transaction} from './transaction';

export class DataBlock {
  id: number;
  timestamp: string;
  type: number;
  // blocksize: number;
  // transactionCount: number;
  transactions: Transaction[];
  // blockHeight: number;
}
