export class Transaction {
  type: number;
  id: number;
  sender: string;
  senderPublicKey: string;
  fee: number;
  timestamp: Date;
  signature: string;
  recipient: string;
  assetId: string;
  amount: number;
  feeAsset: string;
  attachment: string;
  status: string;
  height: number;
  lease: Transaction[];
}

export class Lease {
  type: number;
  id: string;
  sender: string;
  senderPublicKey: string;
  fee: number;
  timestamp: Date;
  signature: string;
  amount: number;
  recipient: string;
}

/* different transaction types
 1:  Genesis transaction
 2:  Payment transaction
 3:  Issue transaction
 4:  Transfer transaction
 5:  Reissue transaction
 6:  Burn transaction
 7:  Exchange transaction
 8:  Lease transaction
 9:  Lease cancel transaction
 10: Create alias transaction
 11: Make asset name unique transaction
 */

