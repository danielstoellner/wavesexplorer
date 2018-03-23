import { Injectable } from '@angular/core';

export interface ISettings {
  serverPath: string;
}

@Injectable()
export class SettingsService implements ISettings {
  public serverPath = 'http://se.suroot.com:6869/';
}
