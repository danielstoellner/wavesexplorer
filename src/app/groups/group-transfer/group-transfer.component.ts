import {Component, Input, OnInit, Pipe, PipeTransform} from '@angular/core';
import {Block} from "../../blocks/block";
import {SettingsService} from "../../common/settings.service";
import {ActivatedRoute} from "@angular/router";
import {Transaction} from "../../blocks/transaction";
import {WavesApiService} from "../../common/waves-api.service";
import {Location} from "@angular/common";
import {Address} from "../../addresses/address";
import {Group} from "../group";
import {BackendApiService} from "../../common/backend-api.service";
import {User} from "../../users/user";

@Component({
  selector: 'app-group-transfer',
  templateUrl: './group-transfer.component.html',
  styleUrls: ['./group-transfer.component.css']
})
export class GroupTransferComponent implements OnInit {
  @Input()
  groups: Group[] = [];
  selectedGroup: Group;
  users: User[] = [];
  usersDesc: User[] = [];
  selectedUser: User;
  address: Address;
  transactions: Transaction[];
  loading: boolean;
  usersMap: Map<string, string> = new Map<string, string>();

  constructor(
    private route: ActivatedRoute,
    private wavesApiService: WavesApiService,
    private backendApiService: BackendApiService,
    private location: Location,
    private settings: SettingsService,
  ) { }

  ngOnInit() {
    this.getUsersMap();
    this.getGroups().then(() => this.refresh());
  }

  refresh(){
    this.users = [];
    this.getUsers().then(() => this.getAddress()).then(() => this.getTransactions());
  }

  getNameFromUser(userId: string): string{
    return this.usersMap.get(userId);
  }

  async getUsersMap() {
    console.log(">> getUsersMap");
    const result: User[] = await this.backendApiService.getUsersPromise();

    result.forEach(user => {
      this.usersMap.set(user.address, user.surename + " " + user.givenname);
    });
  }

  refreshUser(){
    this.getTransactions();
    this.getAddress();
  }

  /**
   * get groups from api
   * push found item to array
   * @returns {Promise<void>}
   */
  async getGroups() {
    const result: Group[] = await this.backendApiService.getGroups().toPromise();
    this.groups = result;
    if(this.groups.length >= 0) {
      this.selectedGroup = this.groups[0];
    }
  }

  /**
   * get Users from Group by id
   * push found item to array
   * @returns {Promise<void>}
   */
  async getUsers() {
    const result: User[] = await this.backendApiService.getUsersPromise();

    result.forEach(user => {
      if (user.squads.length > 0){
        user.squads.forEach(group => {
          if(group.id === this.selectedGroup.id){
            this.users.push(user);
          }
        });
      }
    });
    this.loadUsersDesc();
    if(this.users.length>= 0) {
      this.selectedUser = this.users[0];
    }
  }

  loadUsersDesc() {
    console.log("loadUserDesc");
    this.usersDesc = [];

    this.users.forEach(user => {
      this.usersDesc.push(user);
    });
  }

  /**
   * Liefert die Adresse zurück
   */
  getAddress() {
    this.wavesApiService.getBalance(this.selectedUser.address)
      .subscribe(address => this.address = address);
  }

  /**
   * Liefert Transaktionen zu einer bestimmten Adresse zurück
   */
  getTransactions() {
    this.wavesApiService.getTransactions(this.selectedUser.address, 100)
      .subscribe(transaction => this.transactions = transaction);
  }

  getSettings(): SettingsService {
    return this.settings;
  }

  goBack(): void {
    this.location.back();
  }

  /**
   * Zu einer anderen Adresse gehen
   * @param {string} address
   */
  goTo(address: string): void {
    this.refresh();
  }

}
