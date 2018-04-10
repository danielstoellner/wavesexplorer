export interface Peer {
    address: string;
    lastSeen: number;
}

export interface PeerModel {
  peers: Peer[];
}



