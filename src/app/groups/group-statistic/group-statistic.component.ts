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
  data: any;
  dataTransactions: any;
  loading: boolean;
  stat2: any;
  transactionTypes: any;

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
      this.getGroups().then(() => this.refresh());
      this.loading = false;
    }, 1000);
  }

  refresh() {
    this.users = [];
    this.getUsers().then(() => this.getAddresses()).then(() => this.getTransactions().then(() => this.loadCharts()));
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
    for(let user of this.users){
      var result: Address = await this.wavesApiService.getBalancePromise(user.address);
      user.addressDetails = result;
    }
  }

  async getTransactions(){{
    for(let user of this.users){
      var result = await this.wavesApiService.getTransactions(user.address,10000).toPromise();
      user.transactions = result;
    }
    this.getNames();
    this.getBalances();
  }}

  getNames(): string[]{
    console.log("getNames");
    var names: string[] = [];
    for(let user of this.users){
      names.push(user.givenname);
    }
    return names;
  }

  getBalances(): number[]{
    console.log("getBalance");
    var balances: number[] = [];
    for(let user of this.users){
      balances.push(user.addressDetails.available);
    }
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

  loadCharts():void{
    console.log("loadCharts");
    this.loadChart();
    this.loadChartTransactions();
  }

  loadChart(): void {
    var use: string[] =[];
    var dataBalance: number[] = [];

    setTimeout(() => {
      if (this.users == null) {
        console.log("no users");
      } else {
        this.users.forEach(user => {
          use.push(user.givenname.toString());
          dataBalance.push(user.addressDetails.available.valueOf() / this.settingsService.currencyMuliplicator);
          //console.log(user.givenname.toString() + ' ' + (user.addressDetails.available.valueOf() / this.settingsService.currencyMuliplicator));
        })

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

  loadChartTransactions(): void {
    var use: string[] =[];
    var users: any = [];

    this.settingsService.transferTypes.forEach((string) => use.push(string.toString()));

    this.users.forEach(entry => {
      var tempData: any = {
        label: 'eins',
        backgroundColor: 'rgba(179,181,198,0.2)',
        borderColor: 'rgba(179,181,198,1)',
        pointBackgroundColor: 'rgba(179,181,198,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(179,181,198,1)',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      };
      tempData.label= entry.givenname;
      var color: number = entry.id%6;

      var count:number = 0;
      entry.transactions.forEach(tr =>
        {
            for(count; count < 100; count ++){
              if (tr[count] != null){
                tempData.data[tr[count].type-1] = tempData.data[tr[count].type-1] + 1;
              } else {
                break;
              }
            }
        })

      tempData.backgroundColor = this.settingsService.colorMap.get(color);
      tempData.pointBackgroundColor = this.settingsService.colorMap.get(color);
      tempData.borderColor = this.settingsService.colorMap.get(color);
      tempData.pointBorderColor = this.settingsService.colorMap.get(color);
      tempData.pointHoverBackgroundColor = this.settingsService.colorMap.get(color);
      tempData.pointHoverBorderColor = this.settingsService.colorMap.get(color);
      users.push(tempData);
    });

    this.transactionTypes = {
      labels: use,
      datasets: users
    };
  }
}
