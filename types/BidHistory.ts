interface Image {
  public_id: string;
  url: string;
  _id: string;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: Address;
}

interface Product {
  _id: string;
  title: string;
  slug: string;
  images: Image[];
  pricePerKg: number;
  totalWeight: number;
  status: 'active' | 'inactive' | 'sold' | 'purchased';
  user: User;
}

interface DeliveryAddress {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface Bid {
  _id: string;
  deliveryAddress: DeliveryAddress;
  user: User;
  bidAmount: number;
  bidAt: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  paymentMethod: string;
}

interface BidWinner {
  user?: User;
  bidAmount?: number;
  acceptedAt?: string;
  _id?: string;
  [key: string]: any;
}

export interface BiddingHistoryItem {
  product: Product;
  myBid: Bid;

  isWinner?: boolean;
  bidWinner: BidWinner;
  totalBidsOnProduct: number;
}