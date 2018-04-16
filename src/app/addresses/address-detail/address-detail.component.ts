import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
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
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private addressService: AddressesService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.reload();
  }

  reload(){
    this.loading = true;
    setTimeout(() => {
      this.getAddress();
      this.getTransactions();
      this.loading = false;
    }, 1000);
  }

  getAddress() {
    const address = this.route.snapshot.paramMap.get('address');
    this.addr = address;
    this.addressService.getBalance(address)
      .subscribe(address => this.address = address);
  }

  getTransactions() {
    this.addressService.getTransactions(this.addr, 100)
      .subscribe(transaction => this.transactions = transaction);
  }

  goBack(): void {
    this.location.back();
  }

  goTo(address: string): void {
    this.reload();
  }
}
