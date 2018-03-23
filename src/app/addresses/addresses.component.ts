import { Component, OnInit } from '@angular/core';
import {AddressesService} from "./addresses.service";
import {Address} from "./address";

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {
  addresses: Address[];

  constructor(
    private addressesService: AddressesService
  ) { }

  ngOnInit() {
    this.getAddresses();
  }

  getAddresses(): void {
    this.addressesService.getAddresses()
      .subscribe(address => this.addresses = address);
  }
}
