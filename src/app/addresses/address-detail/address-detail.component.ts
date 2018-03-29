import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Address} from "../address";
import {AddressesService} from "../addresses.service";
import {Transaction} from "../../blocks/transaction";

@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.css']
})
export class AddressDetailComponent implements OnInit {
  @Input()
  address: Address;
  transactions: Transaction[];
  addr: string;

  constructor(
    private route: ActivatedRoute,
    private addressService: AddressesService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getAddress();
  }

  async getAddress() {
    const address = this.route.snapshot.paramMap.get('address');
    this.addr = address;
    this.addressService.getBalance(address)
      .subscribe(address => this.address = address);
    this.getTransactions();
  }

  async getTransactions() {
    console.log('TRANS' + this.addr);
    this.addressService.getTransactions(this.addr, 100)
      .subscribe(transaction => this.transactions = transaction);
  }

  goBack(): void {
    this.location.back();
  }
}
