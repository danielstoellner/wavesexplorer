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
      {label: 'Blocks', icon: 'fa-server', routerLink: ['/blocks']},
      {label: 'Peers', icon: 'fa-tasks', routerLink: ['/peer']},
      {label: 'Users', icon: 'fa-user', routerLink: ['/users']},
      {label: 'User Import', icon: 'fa-file-excel-o', routerLink: ['/userimport']},
      {label: 'Groups', icon: 'fa-group', routerLink: ['/groups']},
      {label: 'Statistics', icon: 'fa-pie-chart', routerLink: ['/groups']},
      {label: 'Wallet', icon: 'fa-credit-card', url: 'https://beta.wavesplatform.com/'},
      {label: 'Node', icon: 'fa-database', routerLink: ['/addresses']}
    ];
  }
}
