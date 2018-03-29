export interface Peer {
    address: string;
    lastSeen: number;
}

export interface PeerModel {
  peers: Peer[];
}

export interface PeerArray{
  peers: {
    peers: Peer[];
  };
}


