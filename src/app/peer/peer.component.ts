import { Component, OnInit } from '@angular/core';
import {Peer, PeerModel} from "./peer";
import {PeerService} from "./peer.service";

@Component({
  selector: 'app-peer',
  templateUrl: './peer.component.html',
  styleUrls: ['./peer.component.css']
})
export class PeerComponent implements OnInit {
  peersModel: PeerModel[];
  stacked: boolean;

  constructor(
    private peerService: PeerService
  ) { }

  ngOnInit() {
    this.getPeers();
  }

  getPeers(): void {
    this.peerService.getPeers()
      .subscribe(peers => this.peersModel = peers);
  }

  toggle() {
    this.stacked = !this.stacked;
  }
}
