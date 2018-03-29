import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BlocksService} from "../blocks.service";
import { Location } from '@angular/common';
import {Block} from "../block";

@Component({
  selector: 'app-block-detail',
  templateUrl: './block-detail.component.html',
  styleUrls: ['./block-detail.component.css']
})
export class BlockDetailComponent implements OnInit {
  @Input()
  block: Block;
  height: number;

  constructor(
    private route: ActivatedRoute,
    private blockService: BlocksService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getBlock();
  }

   async getBlock() {
    const height = + this.route.snapshot.paramMap.get('height');
    this.height = height;
    this.blockService.getBlockAt(height)
      .subscribe(block => this.block = block);
  }

  next(): void {
    this.height += 1;
    this.blockService.getBlockAt(this.height)
      .subscribe(block => this.block = block);
  }

  prev(): void {
    this.height --;
    this.blockService.getBlockAt(this.height)
      .subscribe(block => this.block = block);
  }

  goBack(): void {
    this.location.back();
  }



}
