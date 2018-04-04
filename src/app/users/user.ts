import {Group} from "../groups/group";

export class User {
  id: number;
  givenname: string;
  surename: string;
  username: string;
  address: string;
  squads: Group[];
}
