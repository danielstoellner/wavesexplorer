export interface Peer {
    address: string;
    declaredAddress: string;
    peerName: string;
    peerNonce: string;
}

export interface PeerModel {
  peers: Peer[];
}



