import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../users/user.service";
import {Location} from "@angular/common";
import {Group} from "../group";
import {GroupsService} from "../group.service";
import {User} from "../../users/user";
import {BlockHeight} from "../../blocks/block";
import {AddressesService} from "../../addresses/addresses.service";
import {Address} from "../../addresses/address";
import {forEach} from "@angular/router/src/utils/collection";
import {of} from "rxjs/observable/of";

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
    private groupService: GroupsService,
    private userService: UserService,
    private addressService: AddressesService,
    private location: Location,
  ) {
    this.data = {
      labels: ['A','B','C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
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
    const result: Group = await this.groupService.getGroupPromise(id);
    this.group = result;
  }

  async getUsers() {
    const result: User[] = await this.userService.getUsersPromise();
    this.users = result;
    this.getAddresses();
    this.loadChart();
  }

  async getAddresses(){
    var i : number;
    for(let user of this.users){
      const result: Address = await this.addressService.getBalancePromise(user.address);
      this.addresses.push(result);
      i++;
      console.log(user.address);
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.groupService.updateGroup(this.group)
      .subscribe(() => this.goBack());
  }

  delete(): void {
    const result = this.groupService.deleteGroup(this.group).subscribe();
    this.goBack();
  }

  loadChart(): void {
    setTimeout(() => {
      var i: number;
      let list: Array<string>
      if (this.users == null) {
        console.log("no users");
      } else {
        for (i = 0; i < this.users.length; i++) {
          if (this.users[i].squads != null && this.users[i].squads.length >= 1) {
            if (this.users[i].squads[0].id == this.group.id) {
              this.data.labels.push(this.users[i].givenname.toString());
              //this.data.labels.fill(this.users[i].givenname.toString());

              //this.data.datasets.data.push(1,2,3,4);

                //this.addresses[i].available.valueOf()+20);
              //this.data.datasets.data.push(this.addresses[i].available.valueOf()+10);
              console.log(this.users[i].givenname.toString() + " " +(this.addresses[i].available.valueOf()));
            }
          }
        }
      }
    }, 2000);
  }
}
