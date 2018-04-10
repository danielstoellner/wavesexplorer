import { Injectable } from '@angular/core';

export interface ISettings {
  serverPath: string;
}

@Injectable()
export class SettingsService implements ISettings {
  public serverPath = 'https://nodes.wavesplatform.com/';
  public wavesBackendAPI = 'http://wavebackend.suroot.com:8080/';
}
