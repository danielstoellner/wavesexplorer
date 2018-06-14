import {Component, Input, OnInit} from '@angular/core';
import {SettingsService} from "../../common/settings.service";
import {Location} from "@angular/common";
import {User} from "../../users/user";
import {ActivatedRoute} from "@angular/router";
import {BackendApiService} from "../../common/backend-api.service";
import {Address} from "../../addresses/address";
import {Group} from "../group";
import {WavesApiService} from "../../common/waves-api.service";
import {Asset} from "../../asset/asset";

@Component({
  selector: 'app-group-statistic',
  templateUrl: './group-statistic.component.html',
  styleUrls: ['./group-statistic.component.css']
})
export class GroupStatisticComponent implements OnInit {
  @Input()
  groups: Group[] = [];
  assets: Asset[] = [];
  assetDesc: Asset[] = [];
  selectedGroup: Group;
  selectedAsset: Asset;
  group: Group;
  users: User[] = [];
  data: any;
  data2: any;
  loading: boolean;
  transactionTypes: any;
  assetsId: string[];

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
    this.getUsers().then(() => this.getAddresses()).then(() => this.getTransactions().then(() => this.loadCharts()).then(() => this.loadAssets()).then(() => this.loadChart2()));
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

  async getTransactions(){
    for(let user of this.users){
      var result = await this.wavesApiService.getTransactions(user.address,10000).toPromise();
      user.transactions = result;
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

  /**
   * load Asset map
   * @returns {Promise<void>}
   */
  async loadAssets(){
    this.assets = [];
    console.log("loadAssets");
    for (let user of this.users) {
      if (user.assetsTransfered.size > 0) {
        var assetEntry: string = user.assetsTransfered.entries().next().value[0].toString();
        var result: Asset = await this.wavesApiService.getAssetById(assetEntry).toPromise();

        // if not in map insert
        if(this.assets.includes(result)){
          console.log("bereits vorhanden");
        } else {
          this.assets.push(result);
        }
      }
    }
    this.loadAssetDesc();
    if(this.assetDesc.length >= 0) {
      this.selectedAsset = this.assetDesc[0];
    }
  }

  loadAssetDesc() {
    console.log("loadAssetDesc");
    this.assetDesc = [];

    this.assets.forEach(asset => {
      this.assetDesc.push(asset);
    });
  }

  /**
   * load pie chart
   */
  loadChart(): void {
    var use: string[] = [];
    var dataBalance: number[] = [];
    var dataBackgroundColor: string[] = [];

    if (this.users == null) {
      console.log("no users");
    } else {
      this.users.forEach(user => {
        var color: number = user.id%6;
        use.push(user.givenname.toString());
        dataBalance.push(user.addressDetails.available.valueOf() / this.settingsService.currencyMuliplicator);
        dataBackgroundColor.push(this.settingsService.colorMap.get(color));
      })

      this.data = {
        labels: use,
        datasets: [
          {
            data: dataBalance,
            backgroundColor: dataBackgroundColor,
            hoverBackgroundColor: dataBackgroundColor,
          }]
      };
    }
  }

  /**
   * load transaction chart
   */
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
      entry.assetsTransfered = new Map<string, number>();
      entry.assetsReceived = new Map<string, number>();

      var count:number = 0;
      var calc: number = 0;
      entry.transactions.forEach(tr =>
      {
        // check all last 100 transaction
        for(count; count < 100; count ++){
          // if user has transactions
          if (tr[count] != null){
            tempData.data[tr[count].type-1] = tempData.data[tr[count].type-1] + 1;
            // if transaction has different assets
            if (tr[count].assetId != null && tr[count].recipient == entry.address){
              console.log("Resived from: " + tr[count].assetId, tr[count].amount);
              // is asset is assigned at user update value
              if(entry.assetsReceived.has(tr[count].assetId)){
                console.log("calc plus because exists" + entry.assetsReceived.get(tr[count].assetId) +"+" + tr[count].amount);
                calc = 0;
                calc = entry.assetsReceived.get(tr[count].assetId) + tr[count].amount;
                entry.assetsReceived.set(tr[count].assetId, calc);
                console.log("after cals " + entry.assetsReceived.get(tr[count].assetId));
              } else {
                entry.assetsReceived.set(tr[count].assetId, tr[count].amount);
              }

            }
            if (tr[count].assetId != null && tr[count].sender == entry.address){
              console.log("Transfer from "+  tr[count].assetId, tr[count].amount);
              // is asset is assigned at user update value
              if(entry.assetsTransfered.has(tr[count].assetId)){
                console.log("calc plus because exists" + entry.assetsTransfered.get(tr[count].assetId) +"+" + tr[count].amount);
                calc = 0;
                calc = entry.assetsTransfered.get(tr[count].assetId) + tr[count].amount;
                entry.assetsTransfered.set(tr[count].assetId, calc);
                console.log("after cals " + entry.assetsTransfered.get(tr[count].assetId));
              } else {
                entry.assetsTransfered.set(tr[count].assetId, tr[count].amount);
              }
            }

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

  /**
   * load pie chart
   */
  loadChart2(): void {
    var use: string[] = [];
    var dataBalance: number[] = [];
    var dataBackgroundColor: string[] = [];

    if (this.users == null) {
      console.log("no users");
    } else {
      this.users.forEach(user => {
        var color: number = user.id%6;
        use.push(user.givenname.toString());
        var transfered: number = 0;
        if(user.assetsTransfered.get(this.selectedAsset.assetId)){
          transfered = user.assetsTransfered.get(this.selectedAsset.assetId);
        }
        dataBalance.push((user.assetsReceived.get(this.selectedAsset.assetId)-transfered) / this.settingsService.currencyMuliplicator);
        dataBackgroundColor.push(this.settingsService.colorMap.get(color));
      })

      this.data2 = {
        labels: use,
        datasets: [
          {
            data: dataBalance,
            backgroundColor: dataBackgroundColor,
            hoverBackgroundColor: dataBackgroundColor,
          }]
      };
    }
  }
}
