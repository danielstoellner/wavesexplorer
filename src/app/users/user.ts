import {Group} from '../groups/group';
import {Transaction} from "../transaction/transaction";
import {Address} from "../addresses/address";

export class User {
  id: number;
  givenname: string;
  surename: string;
  username: string;
  address: string;
  addressDetails: Address;
  squads: Group[];
  transactions: Transaction[];
  assetsTransfered: Map<string, number> = new Map<string, number>();
  assetsReceived: Map<string, number> = new Map<string, number>();

}
