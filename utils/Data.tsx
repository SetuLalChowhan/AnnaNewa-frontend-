// data/dummyProducts.ts
import { Product } from "@/types/Product"; 
import P1 from "@/assets/images/p1.jpg"; // Korola
import P2 from "@/assets/images/p2.jpg"; // Banana
import P3 from "@/assets/images/p3.jpg"; // Rice
import P4 from "@/assets/images/p4.jpg"; // Potato

export const dummyProducts: Product[] = [
  {
    _id: "1",
    title: "Fresh Korola",
    description: "Fresh and healthy Korola directly from our farm.",
    pricePerKg: 100,
    totalWeight: 25,
    images: [P1],
    category: "Vegetables",
    slug: "fresh-korola",
  },
  {
    _id: "2",
    title: "Fresh Banana",
    description: "Sweet and ripe bananas perfect for daily consumption.",
    pricePerKg: 60,
    totalWeight: 40,
    images: [P2],
    category: "Fruits",
    slug: "fresh-banana",
  },
  {
    _id: "3",
    title: "Organic Rice",
    description: "High-quality organic rice from our farm.",
    pricePerKg: 80,
    totalWeight: 100,
    images: [P3],
    category: "Grains",
    slug: "organic-rice",
  },
  {
    _id: "4",
    title: "Organic Potato",
    description: "Fresh organic potatoes from our farm, healthy and tasty.",
    pricePerKg: 200,
    totalWeight: 50,
    images: [P4],
    category: "Vegetables",
    slug: "organic-potato",
  },
];
