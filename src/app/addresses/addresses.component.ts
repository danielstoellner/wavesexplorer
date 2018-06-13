import { Component, OnInit } from '@angular/core';
import {Address} from './address';
import {WavesApiService} from '../common/waves-api.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {
  addresses: Address[];

  constructor(
    private wavesApiService: WavesApiService
  ) { }

  ngOnInit() {
    this.getAddresses();
  }

  /**
   * Liefert die Addresse zurück
   */
  getAddresses(): void {
    this.wavesApiService.getAddresses()
      .subscribe(address => this.addresses = address);
  }
}
