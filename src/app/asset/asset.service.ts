import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SettingsService} from "../common/settings.service";
import {Asset} from "./asset";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

class Assets {
}

@Injectable()
export class AssetService {

  private assetUrl = 'assets/details/';
  private assetId = 'C7kLesHCnqhDSNNgTuCiiMGr3qaEX1oGAXiJ8gTqzyku';

  constructor(
    private http: HttpClient,
    private settingService: SettingsService
  ) { }

  /** GET asset from the server */
  getAsset () {
    return this.http.get<Asset>(this.settingService.serverPath + this.assetUrl + this.assetId)
      .map(response => response);
  }
}
