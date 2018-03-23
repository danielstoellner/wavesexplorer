import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {MenuModule} from 'primeng/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Waves Explorer';
  items: MenuItem[];

  ngOnInit() {
    this.items = [{
        label: 'Home', icon: 'fa-home',
      },
      {
        label: 'Management', icon: 'fa-server',
        items: [
          {label: 'dashboard', routerLink: ['/dashboard']},
          {label: 'blocks', routerLink: ['/blocks']},
          {label: 'peer', routerLink: ['/peer']},
          {label: 'address', routerLink: ['/addresses']}
          ]
      },
      {
        label: 'Settings', icon: 'fa-gears',
        items: [{
                label: 'User', routerLink: ['/users']
        }]
      }
    ];
  }
}
