// types/Product.ts
export interface Product {
  _id: string;
  title: string;
  description: string;
  pricePerKg: number;
  totalWeight: number;
  images: string[];
  category: string;
  slug: string;
}
