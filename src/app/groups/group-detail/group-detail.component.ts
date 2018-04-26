import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Group} from "../group";
import {User} from "../../users/user";
import {Address} from "../../addresses/address";
import {WavesApiService} from "../../common/waves-api.service";
import {BackendApiService} from "../../common/backend-api.service";

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
  @Input()
  group: Group;
  users: User[];
  addresses: Address[] = [];
  data: any;
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private wavesApiService: WavesApiService,
    private backendApiService: BackendApiService,
    private location: Location,
  ) {
    this.data = {
      labels: ['A','B','C','D','E'],
      datasets: [
        {
          data: [300, 50, 100, 100, 100],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#76ebb2",
            "#eb56e6",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#76ebb2",
            "#eb56e6",
            "#FFCE56"
          ]
        }]
    };
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.loading = true;
    setTimeout(() => {
      this.getGroup();
      this.getUsers();
      this.loading = false;
    }, 1000);
  }

  async getGroup() {
    const id = + this.route.snapshot.paramMap.get('id');
    const result: Group = await this.backendApiService.getGroupPromise(id);
    this.group = result;
  }

  async getUsers() {
    const result: User[] = await this.backendApiService.getUsersPromise();
    this.users = result;
    this.getAddresses();
    this.loadChart();
  }

  async getAddresses(){
    var i : number;
    for(let user of this.users){
      const result: Address = await this.wavesApiService.getBalancePromise(user.address);
      //
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
    setTimeout(() => {
      var i: number;
      let list: Array<string>
      if (this.users == null) {
        console.log("no users");
      } else {
        var use: [string];
        for (i = 0; i < this.users.length; i++) {
          if (this.users[i].squads != null && this.users[i].squads.length >= 1) {
            if (this.users[i].squads[0].id == this.group.id) {
              this.data.labels.push(this.users[i].givenname.toString());
              //use.push(this.users[i].givenname.toString());
              //this.data.labels[i] = this.users[i].givenname.toString();
              //this.data.labels.data[i] = this
              //this.data.dataset.data[i] = this.addresses[i].available.valueOf()+10;
              //this.data.dataset.data(this.addresses[i].available.valueOf()+10);
              //this.data.labels.fill(this.users[i].givenname.toString());

              //this.data.datasets.data.push(1,2,3,4);

                //this.addresses[i].available.valueOf()+20);
              //this.data.datasets.data.push(this.addresses[i].available.valueOf()+10);
              console.log(this.users[i].givenname.toString() + " " +(this.addresses[i].available.valueOf()));
            }
          }
        }
        //this.data.labels = use;
      }
    }, 1000);
  }
}
