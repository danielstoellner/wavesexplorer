import { Component, OnInit } from '@angular/core';
import { PeerModel} from './peer';
import {WavesApiService} from '../common/waves-api.service';

@Component({
  selector: 'app-peer',
  templateUrl: './peer.component.html',
  styleUrls: ['./peer.component.css']
})
export class PeerComponent implements OnInit {
  peersModel: PeerModel[];
  stacked: boolean;

  constructor(
    private wavesApiService: WavesApiService
  ) { }

  ngOnInit() {
    this.getPeers();
  }

  getPeers(): void {
    this.wavesApiService.getPeers()
      .subscribe(peers => this.peersModel = peers);
  }

  toggle() {
    this.stacked = !this.stacked;
  }
}
