import { StaticImageData } from "next/image";


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
  amount: number;
  createdAt?: string; // <-- optional now
  deliveryAddress?: Address;
  status?: "pending" | "accepted" | "rejected";
  paymentMethod?: string;
  _id: string;
  bidAt?: string;
}

export interface ProductDetails {
  _id: string;
  title: string;
  description: string;
  pricePerKg: number;
  totalWeight: number;
  images: (string | StaticImageData)[];
  user: User;
  userRole: "buyer" | "seller";
  postType: "buy" | "sell";
  status: "active" | "sold" | "expired" | "purchased";
  category: string;
  expiryDate?: string;
  companyRevenue: number;
  bids: Bid[];
  createdAt: string;
  updatedAt: string;
  slug: string;
  soldAt?: string;
  bidWinner?: {
    user: string;
    bidAmount: number;
    acceptedAt: string;
  } | null;
}