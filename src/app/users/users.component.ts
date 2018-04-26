import { Component, OnInit } from '@angular/core';
import {User} from './user';
import {Message } from "primeng/api";
import {BackendApiService} from "../common/backend-api.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  msgs: Message[] = [];
  stacked: boolean;
  loading: boolean;

  constructor(
    private backendApiService: BackendApiService
  ) { }

  ngOnInit() {

    //this.getUsers();
    this.refresh();

  }

  refresh() {
    this.loading = true;
    setTimeout(() => {
      this.backendApiService.getUsers().subscribe(user => this.users = user);
      this.loading = false;
    }, 1000);
  }

  getUsers(): void {
    this.backendApiService.getUsers()
      .subscribe(users => this.users = users);
  }

  add(username: string, givenname: string, surename: string, address: string): void {
    username = username.trim();
    givenname = givenname.trim();
    surename = surename.trim();
    address = address.trim();

    if (!username) { return; }
    this.backendApiService.addUser({username, givenname, surename, address} as User)
      .subscribe(user => {
        this.users.push(user);
      });
    this.refresh();
  }

  toggle() {
    this.stacked = !this.stacked;
  }

  selectUser(user: User) {
    this.msgs = [];
    this.msgs.push({severity:'info', summary:'User Select', detail:'Vin: '});
  }
}
