import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute } from "@angular/router";
import {Location} from "@angular/common";
import {Address} from "../address";
import {Transaction} from "../../blocks/transaction";
import {WavesApiService} from "../../common/waves-api.service";
import {SettingsService} from "../../common/settings.service";

@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.css']
})
export class AddressDetailComponent implements OnInit {
  @Input()
  address: Address;
  transactions: Transaction[];
  addr: string;
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private wavesApiService: WavesApiService,
    private location: Location,
    private settings: SettingsService,
  ) { }

  ngOnInit() {
    this.reload();
  }

  /**
   * Aktualisieren der Seite
   */
  reload(){
    this.loading = true;
    setTimeout(() => {
      this.getAddress();
      this.getTransactions();
      this.loading = false;
    }, 1000);
  }

  /**
   * Liefert die Adresse zurück
   */
  getAddress() {
    const address = this.route.snapshot.paramMap.get('address');
    this.addr = address;
    this.wavesApiService.getBalance(address)
      .subscribe(address => this.address = address);
  }

  /**
   * Liefert Transaktionen zu einer bestimmten Adresse zurück
   */
  getTransactions() {
    this.wavesApiService.getTransactions(this.addr, 100)
      .subscribe(transaction => this.transactions = transaction);
  }

  /**
   * "Zurück"-Button
   */
  goBack(): void {
    this.location.back();
  }

  /**
   * Zu einer anderen Adresse gehen
   * @param {string} address
   */
  goTo(address: string): void {
    this.reload();
  }


  getSettings(): SettingsService {
    return this.settings;
  }
}
