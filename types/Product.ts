import { StaticImageData } from "next/image";

export interface Product {
  _id: string;
  title: string;
  description: string;
  pricePerKg: number;
  totalWeight: number;
  images: (string | StaticImageData)[]; // <-- allow both
  category: string;
  slug: string;
}
