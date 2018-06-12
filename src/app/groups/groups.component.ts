import { Component, OnInit } from '@angular/core';
import {Message} from 'primeng/api';
import {User} from '../users/user';
import {Group} from './group';
import {WavesApiService} from '../common/waves-api.service';
import {BackendApiService} from '../common/backend-api.service';

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
  display: boolean = false;

  constructor(
    private backendApiService: BackendApiService
  ) { }

  ngOnInit() {

    this.getGroups();
    //this.refresh();
  }

  refresh() {
    this.loading = true;
    setTimeout(() => {
      this.backendApiService.getGroups().subscribe(groups => this.groups = groups);
      this.loading = false;
    }, 1000);
  }

  getGroups(): void {
    this.backendApiService.getGroups()
      .subscribe(groups => this.groups = groups);
  }

  add(name: string, currency): void {
    name = name.trim();
    currency = currency.trim();

    if (!name) { return; }
    this.backendApiService.addGroup({name, currency} as Group)
      .subscribe(group => {
        this.groups.push(group);
      });
    this.display = false;
    this.refresh();
  }

  toggle() {
    this.stacked = !this.stacked;
  }

  selectGroup(group: Group) {
    this.msgs = [];
    this.msgs.push({severity:'info', summary:'Group Select', detail:'Vin: '});
  }

  showDialog() {
    this.display = true;
  }
}
