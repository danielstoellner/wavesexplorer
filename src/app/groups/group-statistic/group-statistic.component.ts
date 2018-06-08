import {Component, Input, OnInit} from '@angular/core';
import {SettingsService} from "../../common/settings.service";
import {Location} from "@angular/common";
import {User} from "../../users/user";
import {ActivatedRoute} from "@angular/router";
import {BackendApiService} from "../../common/backend-api.service";
import {Address} from "../../addresses/address";
import {Group} from "../group";
import {WavesApiService} from "../../common/waves-api.service";

@Component({
  selector: 'app-group-statistic',
  templateUrl: './group-statistic.component.html',
  styleUrls: ['./group-statistic.component.css']
})
export class GroupStatisticComponent implements OnInit {
  @Input()
  groups: Group[] = [];
  selectedGroup: Group;
  group: Group;
  users: User[] = [];
  addresses: Address[] = [];
  data: any;
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private wavesApiService: WavesApiService,
    private backendApiService: BackendApiService,
    private location: Location,
    private settingsService: SettingsService,
  ) {
  }

  ngOnInit() {
    this.loading = true;
    setTimeout(() => {
      this.getGroups();
      this.refresh();
      this.loading = false;
    }, 1000);
  }

  refresh() {
    this.users = [];
    this.getUsers().then(() => this.getAddresses()).then(() => this.loadChart());
  }

  async getGroups() {
    const result: Group[] = await this.backendApiService.getGroups().toPromise();
    this.groups = result;
    if(this.groups.length>= 0) {
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
  }

  async getAddresses(){
    console.log('2 GET ADDRESSES');
    var i : number;
    for(let user of this.users){
      var result: Address = await this.wavesApiService.getBalancePromise(user.address);
      console.log(result);
      this.addresses.push(result);
      i++;
      console.log(user.address);
    }
    this.getNames();
    this.getBalances();
  }

  getNames(): string[]{
    console.log("getNames");
    var names: string[] = [];
    for(let user of this.users){
      names.push(user.givenname);
    }
    console.log(names);
    return names;
  }

  getBalances(): number[]{
    console.log("getBalance");
    var balances: number[] = [];
    for(let address of this.addresses){
      balances.push(address.available);
    }
    console.log(balances);
    return balances;
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.backendApiService.updateGroup(this.group)
      .subscribe(() => this.goBack());
  }

  delete(): void {
    const result = this.backendApiService.deleteGroup(this.group).subscribe();
    this.goBack();
  }

  loadChart(): void {
    var use: string[] =[];
    var dataBalance: number[] = [];
    setTimeout(() => {
      var i: number;
      let list: Array<string>
      if (this.users == null) {
        console.log("no users");
      } else {
        for (i = 0; i < this.users.length; i++) {
          use.push(this.users[i].givenname.toString());
          dataBalance.push(this.addresses[i].available.valueOf() / this.settingsService.currencyMuliplicator);
          console.log(this.users[i].givenname.toString() + ' ' + (this.addresses[i].available.valueOf() / this.settingsService.currencyMuliplicator));

        }
        this.data = {
          labels: use,
          datasets: [
            {
              data: dataBalance,
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#76ebb2',
                '#eb56e6',
                '#FFCE56',
                '#FF6384',
                '#36A2EB',
                '#76ebb2',
                '#eb56e6',
                '#FFCE56'
              ],
              hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#76ebb2',
                '#eb56e6',
                '#FFCE56',
                '#FF6384',
                '#36A2EB',
                '#76ebb2',
                '#eb56e6',
                '#FFCE56'
              ]
            }]
        };
      }
    }, 1000);
  }
}
