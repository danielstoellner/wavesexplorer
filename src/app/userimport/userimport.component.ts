import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import {BackendApiService} from '../common/backend-api.service';
import {User} from '../users/user';

@Component({
  selector: 'app-userimport',
  templateUrl: './userimport.component.html',
  styleUrls: ['./userimport.component.css']
})
export class UserimportComponent implements OnInit {
  data: any;

  constructor(private backendApiService: BackendApiService) {}

  ngOnInit() {
  }

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) { throw new Error('Cannot use multiple files'); }
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
      console.log(this.data);

      for (var i = 1; i < this.data.length; i++)
      {
        var newuser = new User();
        newuser.username = this.data[i][0];
        newuser.givenname = this.data[i][1];
        newuser.surename = this.data[i][2];
        newuser.address = this.data[i][3];

        this.backendApiService.addUser(newuser)
        .subscribe(user => {});
      }

    };
    reader.readAsBinaryString(target.files[0]);
  }


}
