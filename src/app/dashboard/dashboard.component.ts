import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() {
    //private blockService: BlocksService
  }

  ngOnInit() {
    //this.getHeight();
  }

  /*   async getHeight() {
      const result: BlockHeight = await this.blockService.getHeight();
      this.height = result.height;
      //console.log(result.height);
      this.getHeighestBlock();
      this.getBlockFromTo();
    }

    async getHeighestBlock() {
      const result: Block = await this.blockService.getLatestBlock(this.height);
      //console.log(result.blocksize);
    }
    async getBlockFromTo() {
      const result: Block[] = await this.blockService.getBlockFromTo(this.height - 5, this.height);
      this.blocks = result;
      /*this.blocks.forEach(p =>{
        console.log(p.generator);
      });*/
  //console.log(result);*/
  //}
}
