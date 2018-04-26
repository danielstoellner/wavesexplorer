import { Component, OnInit } from '@angular/core';
import {Block, BlockHeight } from "../blocks/block";
import {WavesApiService} from "../common/waves-api.service";

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
    private wavesApiService: WavesApiService
  ) { }

  ngOnInit() {
    this.getHeight();
  }

  async getHeight() {
    const result: BlockHeight = await this.wavesApiService.getHeight();
    this.height = result.height;
    //this.getHeighestBlock();
    this.getBlockFromTo();
  }

  async getBlockFromTo() {
    const result: Block[] = await this.wavesApiService.getBlockFromTo(this.height - 4, this.height);
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
