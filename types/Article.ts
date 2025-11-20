import { StaticImageData } from "next/image";

export interface Article {
  id: number;
  title: string;
  bannerImage?: string | StaticImageData;
  description: string;
  images: (string | StaticImageData)[];   // multiple images
  byAdmin: string;
  createdAt: string;
}