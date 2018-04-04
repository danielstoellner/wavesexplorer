import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Waves Explorer';
  items: MenuItem[];
  logo: string;

  constructor() {
    this.logo = '/assets/images/waves_logo.svg';
  }

  ngOnInit() {
    this.items = [{
      label: 'Home', icon: 'fa-home',
    },
      {label: 'blocks', icon: 'fa-download', routerLink: ['/blocks']},
      {label: 'peer', icon: 'fa-adjust', routerLink: ['/peer']},
      {label: 'nodes', icon: 'fa-server', routerLink: ['/nodes']},
      {label: 'wallet', icon: 'fa-address-book', url: 'https://beta.wavesplatform.com/'},
      {
        label: 'Management', icon: 'fa-server',
        items: [
          {label: 'address', routerLink: ['/addresses']}
        ]
      },
      {
        label: 'Settings', icon: 'fa-gears',
        items: [
          {label: 'User', routerLink: ['/users']},
          {label: 'Group', routerLink: ['/groups']
        }]
      }
    ];
  }
}
