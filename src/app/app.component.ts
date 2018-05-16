import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {BlockHeight } from './blocks/block';
import {WavesApiService} from './common/waves-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private height: number;
  title = 'Waves Explorer';
  items: MenuItem[];
  logo: string;

  constructor(private wavesApiService: WavesApiService) {
    this.logo = '/assets/images/waves_logo.svg';
  }
  async getHeight() {
    const result: BlockHeight = await this.wavesApiService.getHeight();
    this.height = result.height;
  }

  ngOnInit() {
    this.getHeight();
    this.items = [{
       label: 'Home', icon: 'fa-home', routerLink: ['/dashboard']},
      {label: 'Blocks', icon: 'fa-download', routerLink: ['/blocks']},
      {label: 'Peer', icon: 'fa-adjust', routerLink: ['/peer']},
      {label: 'Wallet', icon: 'fa-address-book', url: 'https://beta.wavesplatform.com/'},
      {label: 'Node', icon: 'fa-server', routerLink: ['/addresses']},
      {
        label: 'Settings', icon: 'fa-gears',
        items: [
          {label: 'User', routerLink: ['/users']},
          {label: 'User Import', routerLink: ['/userimport']},
          {label: 'Group', routerLink: ['/groups']
        }]
      }
    ];
  }
}
