export interface Location {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Bid {
  deliveryAddress: Location;
  user: User;
  bidAmount: number;
  bidAt: string;
  status: string;
  paymentMethod: string;
  _id: string;
}

export interface BidWinner {
  user: string;
  bidAmount: number;
  acceptedAt: string;
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  pricePerKg: number;
  totalWeight: number;
  category: string;
  status: string;
  user: string;
  userRole: string;
  postType: string;
  location: Location;
  expiryDate: string;
  companyRevenue: number;
  bids: Bid[];
  bidWinner?: BidWinner;
  createdAt: string;
  updatedAt: string;
  slug: string;
  images?: string[];
  __v?: number;
}