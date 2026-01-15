import { StaticImageData } from "next/image";
import { Product } from "./Product";

interface Address {
  street?: string;
  address?: string;
  city: string;
  state: string;
  zipCode?: string;
  country?: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: "buyer" | "seller";
  address: Address;
}

interface Bid {
  user: User;
  bidAmount: number;
  createdAt?: string;
  deliveryAddress?: Address;
  status?: "pending" | "accepted" | "rejected";
  paymentMethod?: string;
  _id: string;
  bidAt?: string;
}

interface ImageDetails {
  public_id: string;
  url: string;
  _id?: string;
}

export interface ProductDetails {
  _id: string;
  title: string;
  description: string;
  pricePerKg: number;
  totalWeight: number;
  images: ImageDetails[];
  user: User;
  userRole: "buyer" | "seller";
  postType: "buy" | "sell";
  status: "active" | "sold" | "expired" | "purchased";
  category: {
    _id: string;
    name: string;
  };
  expiryDate?: string;
  companyRevenue: number;
  bids: Bid[];
  createdAt: string;
  updatedAt: string;
  slug: string;
  location?: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  soldAt?: string;
  bidWinner?: {
    user: string;
    bidAmount: number;
    acceptedAt: string;
  } | null;
  relatedProduct?: Product[];
  topBids?: Bid[];
}
