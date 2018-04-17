import { Component, OnInit } from '@angular/core';
import {Transaction} from "./transaction";
import {TransactionService} from "./transaction.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

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
    private transactionService: TransactionService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getTransaction();
  }

  getTransaction() {
    const transactionId = this.route.snapshot.paramMap.get('transactionId');
    this.transactionService.getTransaction(transactionId)
      .subscribe(transaction => this.transaction = transaction);
  }

  toggle() {
    this.stacked = !this.stacked;
  }

  goBack(): void {
    this.location.back();
  }
}
