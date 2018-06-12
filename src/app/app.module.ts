import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule} from '@angular/forms';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule} from '@angular/common/http';
import { HttpService } from './common/http.service';
import { SettingsService } from './common/settings.service';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UsersComponent } from './users/users.component';
import { InputTextModule } from 'primeng/inputtext';
import {AccordionModule, DataListModule} from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MegaMenuModule} from 'primeng/megamenu';
import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {DataViewModule} from 'primeng/dataview';
import {DataTableModule} from 'primeng/datatable';
import { PeerComponent } from './peer/peer.component';
import { AddressesComponent } from './addresses/addresses.component';
import { BlocksComponent } from './blocks/blocks.component';
import {UtilsModule} from './utils/utils.module';
import { BlockDetailComponent } from './blocks/block-detail/block-detail.component';
import {TreeTableModule} from 'primeng/treetable';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import { TransactionDetailComponent } from './blocks/transaction-detail/transaction-detail.component';
import { AddressDetailComponent } from './addresses/address-detail/address-detail.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupDetailComponent } from './groups/group-detail/group-detail.component';
import {GrowlModule} from 'primeng/growl';
import {PickListModule} from 'primeng/picklist';
import { SearchComponent } from './search/search.component';
import { SearchService } from './search/search.service';
import { AssetComponent } from './asset/asset.component';
import { TransactionComponent } from './transaction/transaction.component';
import {ChartModule} from 'primeng/chart';
import {WavesApiService} from './common/waves-api.service';
import {BackendApiService} from './common/backend-api.service';
import { UserimportComponent } from './userimport/userimport.component';
import { StatisticsComponent } from './statistics/statistics.component';
import {TabViewModule} from 'primeng/tabview';
import {DialogModule} from 'primeng/dialog';
import { GroupStatisticComponent } from './groups/group-statistic/group-statistic.component';
import {DropdownModule} from 'primeng/dropdown';

@NgModule({
  declarations: [
    AppComponent,
    PeerComponent,
    MessagesComponent,
    DashboardComponent,
    UserDetailComponent,
    UsersComponent,
    PeerComponent,
    AddressesComponent,
    BlocksComponent,
    BlockDetailComponent,
    TransactionDetailComponent,
    AddressDetailComponent,
    GroupsComponent,
    GroupDetailComponent,
    SearchComponent,
    AssetComponent,
    TransactionComponent,
    UserimportComponent,
    StatisticsComponent,
    GroupStatisticComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    InputTextModule,
    AccordionModule,
    PanelModule,
    ButtonModule,
    RadioButtonModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    DataViewModule,
    DataListModule,
    UtilsModule,
    DataTableModule,
    TreeTableModule,
    TableModule,
    CardModule,
    GrowlModule,
    PickListModule,
    ChartModule,
    TabViewModule,
    DialogModule,
    DropdownModule,
  ],
  providers: [
    MessageService,
    SettingsService,
    HttpService,
    SearchService,
    WavesApiService,
    BackendApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
