import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute } from "@angular/router";
import {Location} from "@angular/common";
import {Address} from "../address";
import {Transaction} from "../../blocks/transaction";
import {WavesApiService} from "../../common/waves-api.service";

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
    private wavesApiService: WavesApiService,
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
    this.wavesApiService.getBalance(address)
      .subscribe(address => this.address = address);
  }

  getTransactions() {
    this.wavesApiService.getTransactions(this.addr, 100)
      .subscribe(transaction => this.transactions = transaction);
  }

  goBack(): void {
    this.location.back();
  }

  goTo(address: string): void {
    this.reload();
  }
}
