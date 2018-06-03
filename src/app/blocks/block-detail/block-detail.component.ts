import {Component, Input, OnInit, Pipe, PipeTransform} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';
import {Block} from "../block";
import {Transaction} from "../transaction";
import {WavesApiService} from "../../common/waves-api.service";

@Component({
  selector: 'app-block-detail',
  templateUrl: './block-detail.component.html',
  styleUrls: ['./block-detail.component.css']
})
export class BlockDetailComponent implements OnInit {
  @Input()
  block: Block;
  height: number;
  transactions: Transaction[];
  transactions1: Transaction[];
  loading: boolean;
  priceListMap : Map<number, string> = new Map<number, string>();

  constructor(
    private route: ActivatedRoute,
    private wavesApiService: WavesApiService,
    private location: Location
  ) {
    this.priceListMap.set(1,  "Genesis transaction");
    this.priceListMap.set(2,  "Payment transaction");
    this.priceListMap.set(3,  "Issue transaction");
    this.priceListMap.set(4,  "Transfer transaction");
    this.priceListMap.set(5,  "Reissue transaction");
    this.priceListMap.set(6, "Burn transaction");
    this.priceListMap.set(7, "Exchange transaction");
    this.priceListMap.set(8,  "Lease transaction");
    this.priceListMap.set(9,  "Lease cancel transaction");
    this.priceListMap.set(10, "Create alias transaction");
    this.priceListMap.set(11, "Make asset name unique transaction");
  }

  ngOnInit(): void {
    this.getBlock();
    console.log(this.block);

  }

   async getBlock() {
     this.loading = true;
     const height = + this.route.snapshot.paramMap.get('height');
     this.height = height;
     setTimeout(() => {
       this.wavesApiService.getBlockAt(height)
         .subscribe(block => this.block = block);
       this.loading = false;
     }, 1000);
  }

  next(): void {
    this.height += 1;
    this.wavesApiService.getBlockAt(this.height)
      .subscribe(block => this.block = block);
  }

  prev(): void {
    this.height --;
    this.wavesApiService.getBlockAt(this.height)
      .subscribe(block => this.block = block);
  }

  goBack(): void {
    this.location.back();
  }

  getTransactions(){
    for(let transaction in this.block.transactions){
      console.log(transaction)
    }
  }

  getKeys(map){
    return Array.from(map);
  }

  calculateGroupTotal(brand: number) {
    let total = 0;

    if(this.transactions) {
      for(let transaction of this.transactions1) {
        if(transaction.type === brand) {
          total += transaction.amount;
        }
      }
    }

    return total;
  }

}

@Pipe({name: 'groupBy'})
export class GroupByPipe implements PipeTransform {
  transform(value: Array<any>, field: string): Array<any> {
    const groupedObj = value.reduce((prev, cur)=> {
      if(!prev[cur[field]]) {
        prev[cur[field]] = [cur];
      } else {
        prev[cur[field]].push(cur);
      }
      return prev;
    }, {});
    return Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
  }
}

