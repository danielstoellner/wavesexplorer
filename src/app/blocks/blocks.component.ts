import { Component, OnInit } from '@angular/core';
import {BlocksService} from "./blocks.service";
import {Block, BlockHeight } from "./block";

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.css']
})
export class BlocksComponent implements OnInit {
  private height: number;
  blocks: Block[];
  stacked: boolean;

  constructor(
    private blockService: BlocksService
  ) { }

  toggle() {
    this.stacked = !this.stacked;
  }

  ngOnInit() {
    this.getHeight();
  }

  async getHeight() {
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
    const result: Block[] = await this.blockService.getBlockFromTo(this.height - 50, this.height);
    this.blocks = result;
    /*this.blocks.forEach(p =>{
      console.log(p.generator);
    });*/
    //console.log(result);
  }


}
