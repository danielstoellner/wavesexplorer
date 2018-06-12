import { Component, OnInit } from '@angular/core';
import {User} from './user';
import {Message } from 'primeng/api';
import {BackendApiService} from '../common/backend-api.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  selectedUser: User;
  msgs: Message[] = [];
  stacked: boolean;
  loading: boolean;
  display: boolean = false;
  displayDelete: boolean = false;

  constructor(
    private backendApiService: BackendApiService
  ) { }

  ngOnInit() {
    this.refresh();

  }

  /**
   * Aktualisieren
   */
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

  /**
   * Anlegen eines neuen Users
   * @param {string} username
   * @param {string} givenname
   * @param {string} surename
   * @param {string} address
   */
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
    this.display = false;
    this.refresh();
  }

  delete(id: number): void {
    const result = this.backendApiService.deleteUser(this.selectedUser).subscribe();
    this.displayDelete = false;
    this.refresh();
  }

  toggle() {
    this.stacked = !this.stacked;
  }

  showDialog() {
    this.display = true;
  }

  showDialogDelete(id: number) {
    this.getUser(id).then(() => console.log(this.selectedUser));
    this.displayDelete = true;
  }

  async getUser(id: number) {
    const result: User = await this.backendApiService.getUserPromise(id);
    this.selectedUser = result;
  }
}
