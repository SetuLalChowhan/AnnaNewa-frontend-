// data/dummyProducts.ts
import { Product } from "@/types/Product"; 
import P1 from "@/assets/images/p1.jpg"; // Korola
import P2 from "@/assets/images/p2.jpg"; // Banana
import P3 from "@/assets/images/p3.jpg"; // Rice
import P4 from "@/assets/images/p4.jpg"; // Potato
import { HowItWorksStep } from "@/types/HowItWorksStep";
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

export const HOW_IT_WORKS :HowItWorksStep[] = [
  {
    id: 1,
    icon: "📤",
    title: "Farmers List Produce",
    description:
      "Post what you're harvesting. Set a bid end date and let buyers compete fairly.",
  },
  {
    id: 2,
    icon: "🤝",
    title: "We Connect You Directly",
    description:
      "Our platform is the meeting point. No agents, no hidden costs.",
  },
  {
    id: 3,
    icon: "🚚",
    title: "Bid & We Deliver",
    description:
      "Buyers place bids. Once accepted, we handle the delivery right to the buyer's door. Cash on Delivery.",
  },
];
