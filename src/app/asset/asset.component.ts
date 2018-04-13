import { Component, OnInit } from '@angular/core';
import {Asset} from "./asset";
import {AssetService} from "./asset.service";

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {
  asset: Asset;
  stacked: boolean;

  constructor(
    private assetService: AssetService
) { }

  ngOnInit() {
    this.getAsset();
  }

  getAsset(): void {
    this.assetService.getAsset()
      .subscribe(asset => this.asset = asset);
  }

  toggle() {
    this.stacked = !this.stacked;
  }
}
