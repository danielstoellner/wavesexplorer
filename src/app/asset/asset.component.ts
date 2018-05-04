import { Component, OnInit } from '@angular/core';
import {Asset} from "./asset";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {WavesApiService} from "../common/waves-api.service";

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
    private wavesApiService: WavesApiService,
    private location: Location,
) { }

  ngOnInit() {
    this.getAssetId();
  }

  getAssetId() {
    var assetId = this.route.snapshot.paramMap.get('assetId');
    this.wavesApiService.getAssetById(assetId)
      .subscribe(asset => this.asset = asset);
  }

  toggle() {
    this.stacked = !this.stacked;
  }

  goBack(): void {
    this.location.back();
  }
}
