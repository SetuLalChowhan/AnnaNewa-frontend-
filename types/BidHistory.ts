export interface BiddingHistoryItem {
  _id: string;
  name: string;
  image: string;
  basePrice: number;
  myBidPrice: number;
  status: string;
  isWinner: boolean;
}

export interface BidHistoryResponse {
  success: boolean;
  biddingHistory: BiddingHistoryItem[];
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalItems: number;
  };
}
