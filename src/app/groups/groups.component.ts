import { Component, OnInit } from '@angular/core';
import {Message} from "primeng/api";
import {User} from "../users/user";
import {Group} from "./group";
import {GroupsService} from "./group.service";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groups: Group[];
  msgs: Message[] = [];
  stacked: boolean;
  loading: boolean;

  constructor(
    private groupService: GroupsService
  ) { }

  ngOnInit() {

    this.getGroups();
    //this.refresh();

  }

  refresh() {
    this.loading = true;
    setTimeout(() => {
      this.groupService.getGroups().subscribe(groups => this.groups = groups);
      this.loading = false;
    }, 1000);
  }

  getGroups(): void {
    this.groupService.getGroups()
      .subscribe(groups => this.groups = groups);
  }

  add(name: string, currency): void {
    name = name.trim();
    currency = currency.trim();

    if (!name) { return; }
    this.groupService.addGroup({name, currency} as Group)
      .subscribe(group => {
        this.groups.push(group);
      });
    this.refresh();
  }

  toggle() {
    this.stacked = !this.stacked;
  }

  selectGroup(group: Group) {
    this.msgs = [];
    this.msgs.push({severity:'info', summary:'Group Select', detail:'Vin: '});
  }
}
