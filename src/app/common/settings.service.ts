import { Injectable } from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {WavesApiService} from "./waves-api.service";

export interface ISettings {
  serverPath: string;
}

@Injectable()
export class SettingsService implements ISettings {
  public serverPath = 'http://140.78.42.70:6869/';
  public wavesBackendAPI = 'http://wavebackend.suroot.com:8080/';
  public currencyMuliplicator = 100000000;

  public transferTypes: Map<number, string> = new Map<number, string>(
    [[1, 'Genesis'],
            [2, 'Payment'],
            [3, 'Issue'],
            [4, 'Transfer'],
            [5, 'Reissue'],
            [6, 'Burn'],
            [7, 'Exchange'],
            [8, 'Lease'],
            [9, 'Lease cancel'],
            [10, 'Create alias'],
            [11, 'Make asset name unique']]);

  public colorMap: Map<number, string> = new Map<number,string>(
    [[1, '#FF6384'],
      [2,'#36A2EB'],
      [3,'#76ebb2'],
      [4,'#eb56e6'],
      [5,'#FFCE56'],
      [6,'#FF6384'],
      [7,'#36A2EB'],
      [8,'#76ebb2'],
      [9,'#eb56e6'],
      [10,'#FFCE56']]);
}
