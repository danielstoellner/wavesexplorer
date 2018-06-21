import {Component, OnInit} from '@angular/core';
import * as XLSX from 'xlsx';
import {BackendApiService} from '../common/backend-api.service';
import {User} from '../users/user';
import {Group} from '../groups/group';
import {Location} from '@angular/common';

@Component({
  selector: 'app-userimport',
  templateUrl: './userimport.component.html',
  styleUrls: ['./userimport.component.css']
})
export class UserimportComponent implements OnInit {
  data: any;
  availablegroups: Group[];
  availableusers: User[] = [];
  cols: any[];
  users: User[];
  selectedUser: User;
  messages: string[] = [];

  constructor(
    private backendApiService: BackendApiService,
    private location: Location,
  ) {
    this.selectedUser = new User();
    this.cols = [
      {field: 'username', header: 'Username'},
      {field: 'givenname', header: 'Firstname'},
      {field: 'surename', header: 'Lastname'},
      {field: 'address', header: 'Address'},
      {field: 'group', header: 'Group'}
    ];
  }

  ngOnInit() {
    this.getGroups();
    this.getUsers();
  }

  getGroups(): void {
    this.backendApiService.getGroups()
      .subscribe(groups => this.availablegroups = groups);
  }

  async getUsers() {
    const result: User[] = await this.backendApiService.getUsers().toPromise();
    this.availableusers = result;
  }

  goBack(): void {
    this.location.back();
  }

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /**
       * Daten aus dem Excel sheet auslesen und speichern
       * Es wird für jede Zeile im Excel ein neuer User angelegt
       */
      this.data = XLSX.utils.sheet_to_json(ws, {header: 1});

      this.users = [];
      for (var i = 1; i < this.data.length; i++) {
        var newuser: User = new User();
        newuser.username = this.data[i][0];
        newuser.givenname = this.data[i][1];
        newuser.surename = this.data[i][2];
        newuser.address = this.data[i][3];
        newuser.squads = [];
          var group: Group = new Group();
          group.name = this.data[i][4];
          newuser.squads.push(group);
        this.users.push(newuser);
      }
    };
    reader.readAsBinaryString(target.files[0]);
  }

  addNewUser(): void {
    var counter = 0;
    var groupname: string;
    this.users.forEach(user => {
      var exists: boolean = false;
      this.availablegroups.forEach(group => {
      if (user.squads[0].name === group.name) {
          user.squads[0] = group;
          exists = true;
        }
        groupname = user.squads[0].name;
      })

      if (exists || groupname === undefined) {
        //group exist
        this.backendApiService.addUser(user).toPromise();
      } else {
        // group does not exist
        this.messages[counter] = "Group does not exist! User: " + user.surename + " | Group: " + groupname;
        counter = counter + 1;
        this.backendApiService.addUser(user).toPromise();
      }
    })
    this.messages[counter] = "DATA IMPORTED";
  }
}
