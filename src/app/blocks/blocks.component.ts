import { Component, OnInit } from '@angular/core';
import {Block, BlockHeight } from "./block";
import {WavesApiService} from "../common/waves-api.service";

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
    private wavesApiService: WavesApiService
  ) { }

  toggle() {
    this.stacked = !this.stacked;
  }

  ngOnInit() {
    this.getHeight();
  }

  async getHeight() {
    const result: BlockHeight = await this.wavesApiService.getHeight();
    this.height = result.height;
    //console.log(result.height);
    this.getHeighestBlock();
    this.getBlockFromTo();
  }

  async getHeighestBlock() {
    const result: Block = await this.wavesApiService.getLatestBlock(this.height);
  }

  async getBlockFromTo() {
    const result: Block[] = await this.wavesApiService.getBlockFromTo(this.height - 50, this.height);
    this.blocks = result;
  }


}
