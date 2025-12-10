import { StaticImageData } from "next/image";
export interface ProductImage {
  public_id: string;
  url: string;
}
export interface Product {
  _id: string;
  title: string;
  description: string;
  pricePerKg: number;
  totalWeight: number;
  images: ProductImage []; // <-- allow both
  category: string;
  slug: string;
}
