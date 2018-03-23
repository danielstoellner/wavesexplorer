import { Component, OnInit } from '@angular/core';
import {Peer, PeerModel } from "./peer";
import {PeerService} from "./peer.service";

@Component({
  selector: 'app-peer',
  templateUrl: './peer.component.html',
  styleUrls: ['./peer.component.css']
})
export class PeerComponent implements OnInit {
  //peers: Peer[];

  constructor(
    private peerService: PeerService
  ) { }

  ngOnInit() {
    this.getPeers();
  }

  async getPeers() {
    const result: PeerModel = await this.peerService.getPeers();

    result.peers.forEach(p => {
      console.log('adress: ' + p.address + ' lastSeen: ' + p.lastSeen);
    });
    console.log(result);
  }

}
