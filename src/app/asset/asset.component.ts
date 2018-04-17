import { Component, OnInit } from '@angular/core';
import {Asset} from "./asset";
import {AssetService} from "./asset.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {
  asset: Asset;
  stacked: boolean;

  constructor(
    private route: ActivatedRoute,
    private assetService: AssetService,
    private location: Location,
) { }

  ngOnInit() {
    this.getAssetId();
  }

  getAssetId() {
    const assetId = this.route.snapshot.paramMap.get('assetId');
    this.assetService.getAssetById(assetId)
      .subscribe(asset => this.asset = asset);
  }

  toggle() {
    this.stacked = !this.stacked;
  }

  goBack(): void {
    this.location.back();
  }
}
