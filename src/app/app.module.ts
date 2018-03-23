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
import { PeerComponent } from './peer/peer.component';
import {PeerService} from "./peer/peer.service";
import { AddressesComponent } from './addresses/addresses.component';
import {AddressesService} from "./addresses/addresses.service";
import { BlocksComponent } from './blocks/blocks.component';
import {BlooksService} from "./blocks/blooks.service";

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
    DataListModule
  ],
  providers: [
    PeerService,
    MessageService,
    AddressesService,
    SettingsService,
    HttpService,
    UserService,
    BlooksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
