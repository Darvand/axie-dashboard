export interface Signature {
  signature: string;
  amount: number;
  timestamp: number;
}

export interface BlockchainRelated {
  signature: Signature;
  balance: number;
  checkpoint: number;
  block_number: number;
}

export interface Item {
  id: number;
  name: string;
  description: string;
  image_url: string;
  updated_at: number;
  created_at: number;
}

export interface AxieSLPResponse {
  success: boolean;
  client_id: string;
  item_id: number;
  total: number;
  blockchain_related: BlockchainRelated;
  claimable_total: number;
  last_claimed_item_at: number;
  item: Item;
  update_time: number;
}
