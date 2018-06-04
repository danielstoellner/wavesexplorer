import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UsersComponent } from './users/users.component';
import {PeerComponent} from './peer/peer.component';
import {AddressesComponent} from './addresses/addresses.component';
import {BlocksComponent} from './blocks/blocks.component';
import {BlockDetailComponent} from './blocks/block-detail/block-detail.component';
import {AddressDetailComponent} from './addresses/address-detail/address-detail.component';
import {GroupDetailComponent} from './groups/group-detail/group-detail.component';
import {GroupsComponent} from './groups/groups.component';
import {SearchComponent} from './search/search.component';
import {AssetComponent} from './asset/asset.component';
import {TransactionComponent} from './transaction/transaction.component';
import {UserimportComponent} from './userimport/userimport.component';
import {StatisticsComponent} from './statistics/statistics.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'search', component: SearchComponent },
  { path: 'search/:searchTerm', component: SearchComponent },
  { path: 'peer', component: PeerComponent },
  { path: 'blocks', component: BlocksComponent },
  { path: 'detail/:height', component: BlockDetailComponent },
  { path: 'transaction/:transactionId', component: TransactionComponent },
  { path: 'addresses', component: AddressesComponent },
  { path: 'addresses/detail/:address', component: AddressDetailComponent },
  { path: 'asset/:assetId', component: AssetComponent },
  { path: 'users', component: UsersComponent },
  { path: 'userimport', component: UserimportComponent },
  { path: 'users/detail/:id', component: UserDetailComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'groups/detail/:id', component: GroupDetailComponent },
  { path: 'statistics', component: StatisticsComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

