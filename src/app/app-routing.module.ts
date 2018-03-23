import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UsersComponent } from './users/users.component';
import {PeerComponent} from "./peer/peer.component";
import {AddressesComponent} from "./addresses/addresses.component";
import {BlocksComponent} from "./blocks/blocks.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'peer', component: PeerComponent },
  { path: 'blocks', component: BlocksComponent },
  { path: 'addresses', component: AddressesComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/detail/:id', component: UserDetailComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

