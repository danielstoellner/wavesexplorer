import { Component, OnInit } from '@angular/core';
import {Transaction} from "./transaction";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {WavesApiService} from "../common/waves-api.service";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transaction: Transaction;
  stacked: boolean;

  constructor(
    private route: ActivatedRoute,
    private wavesApiService: WavesApiService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getTransaction();
  }

  getTransaction() {
    const transactionId = this.route.snapshot.paramMap.get('transactionId');
    this.wavesApiService.getTransaction(transactionId)
      .subscribe(transaction => this.transaction = transaction);
  }

  toggle() {
    this.stacked = !this.stacked;
  }

  goBack(): void {
    this.location.back();
  }
}
