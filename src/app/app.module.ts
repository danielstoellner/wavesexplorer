import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { HttpService } from './common/http.service';
import { SettingsService } from './common/settings.service';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserService } from './users/user.service';
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
import {PeerService} from "./peer/peer.service";
import { AddressesComponent } from './addresses/addresses.component';
import {AddressesService} from "./addresses/addresses.service";
import { BlocksComponent } from './blocks/blocks.component';
import {BlocksService} from "./blocks/blocks.service";
import {UtilsModule} from "./utils/utils.module";
import { BlockDetailComponent } from './blocks/block-detail/block-detail.component';
import {TreeTableModule} from 'primeng/treetable';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import { TransactionDetailComponent } from './blocks/transaction-detail/transaction-detail.component';
import { AddressDetailComponent } from './addresses/address-detail/address-detail.component';

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
  ],
  providers: [
    PeerService,
    MessageService,
    AddressesService,
    SettingsService,
    HttpService,
    UserService,
    BlocksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
