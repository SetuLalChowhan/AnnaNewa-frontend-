export interface Location {
  address?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface ProductImage {
  public_id: string;
  url: string;
  _id: string;
}

export interface Product {
  _id: string;
  title: string;
  images: ProductImage[];
  category: {
    _id: string;
    name: string;
  };
  slug: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  product: Product;
  postType: "sell" | "buy";
  seller: User;
  buyer: User;
  quantity: number;
  pricePerKg: number;
  totalPrice: number;
  companyRevenue: number;
  sellerEarning: number;
  buyerPayment: number;
  commissionRate: number;
  paymentMethod: string;
  paymentStatus: "Pending" | "Paid" | "Failed" | "Refunded";
  deliveryStatus:
    | "Pending"
    | "Confirmed"
    | "Shipped"
    | "Out for Delivery"
    | "Delivered"
    | "Cancelled";
  orderStatus: "Processing" | "Completed" | "Cancelled" | "Refunded";
  sellerLocation: Location;
  buyerLocation: Location;
  deliveryAddress: Location;
  notes?: string;
  expectedDelivery: string;
  createdAt: string;
  updatedAt: string;
  shippingProvider?: string;
  trackingNumber?: string;
  deliveredAt?: string;
  __v?: number;
}
