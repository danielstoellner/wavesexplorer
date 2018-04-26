import { Component, OnInit } from '@angular/core';
import {BlocksService} from "../blocks/blocks.service";
import {Block, BlockHeight } from "../blocks/block";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private height: number;
  blocks: Block[];
  stacked: boolean;

  constructor(
    private blockService: BlocksService
  ) { }

  ngOnInit() {
    this.getHeight();
  }

  async getHeight() {
    const result: BlockHeight = await this.blockService.getHeight();
    this.height = result.height;
    //this.getHeighestBlock();
    this.getBlockFromTo();
  }

  async getBlockFromTo() {
    const result: Block[] = await this.blockService.getBlockFromTo(this.height - 4, this.height);
    this.blocks = result;
  }

  /*
    toggle() {
      this.stacked = !this.stacked;
    }

    async getHeighestBlock() {
      const result: Block = await this.blockService.getLatestBlock(this.height);
    }


  */
}
