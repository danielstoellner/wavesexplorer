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
    this.items = [{
       label: 'Home', icon: 'fa-home', routerLink: ['/dashboard']},
      {label: 'Blocks', icon: 'fa-server', routerLink: ['/blocks']},
      {label: 'Peers', icon: 'fa-tasks', routerLink: ['/peer']},
      {label: 'Users & Groups', icon: 'fa-user-circle', routerLink: ['/users']},
      {label: 'Statistics', icon: 'fa-pie-chart', routerLink: ['/statistics']},
      {label: 'Wallet', icon: 'fa-credit-card', url: 'https://beta.wavesplatform.com/'},
      {label: 'Node', icon: 'fa-database', routerLink: ['/addresses']}
    ];
    this.getHeight();
  }
}
