import {Transaction} from "../transaction/transaction";

export class Address {
  address: string;
  regular: number;
  generating: number;
  available: number;
  effective: number;
  transactions: Transaction[];
}
