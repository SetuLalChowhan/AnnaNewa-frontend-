// data/dummyProducts.ts
import { Product } from "@/types/Product";
import P1 from "@/assets/images/p1.jpg"; // Korola
import P2 from "@/assets/images/p2.jpg"; // Banana
import P3 from "@/assets/images/p3.jpg"; // Rice
import P4 from "@/assets/images/p4.jpg"; // Potato
import P6 from "@/assets/images/p6.jpg"; // Potato
import P7 from "@/assets/images/p7.jpg"; // Potato
import P8 from "@/assets/images/p8.jpg"; // Potato
import P9 from "@/assets/images/p9.jpg"; // Potato
import { HowItWorksStep } from "@/types/HowItWorksStep";
import { Benefit } from "@/types/Benefit";
import { Article } from "@/types/Article";
import A1 from "@/assets/images/a1.png";
import A2 from "@/assets/images/a2.jpg";
import A3 from "@/assets/images/a3.png";
import A4 from "@/assets/images/a4.jpg";
import { Testimonial } from "@/types/Testimonial";
import { FaSeedling, FaHandshake, FaTruck } from "react-icons/fa";
import { FaMoneyBillWave, FaShoppingCart } from "react-icons/fa";
import { ProductDetails } from "@/types/ProductDetails";
export const dummyProducts: Product[] = [
  {
    _id: "1",
    title: "Fresh Korola",
    description:
      "Fresh and healthy Korola directly from our farm. Fresh and healthy Korola directly from our farm.",
    pricePerKg: 100,
    totalWeight: 25,
    images: [P1],
    category: "Vegetables",
    slug: "fresh-korola",
  },
  {
    _id: "2",
    title: "Fresh Banana",
    description:
      "Sweet and ripe bananas perfect for daily consumption.Fresh and healthy Korola directly from our farm.",
    pricePerKg: 60,
    totalWeight: 40,
    images: [P2],
    category: "Fruits",
    slug: "fresh-banana",
  },
  {
    _id: "3",
    title: "Organic Rice",
    description:
      "High-quality organic rice from our farm.Fresh and healthy Korola directly from our farm.",
    pricePerKg: 80,
    totalWeight: 100,
    images: [P3],
    category: "Grains",
    slug: "organic-rice",
  },
  {
    _id: "4",
    title: "Organic Potato",
    description:
      "Fresh organic potatoes from our farm, healthy and tasty.Fresh and healthy Korola directly from our farm.",
    pricePerKg: 200,
    totalWeight: 50,
    images: [P4],
    category: "Vegetables",
    slug: "organic-potato",
  },
];

export const HOW_IT_WORKS: HowItWorksStep[] = [
  {
    id: 1,
    icon: FaSeedling,
    title: "Farmers List Produce",
    description:
      "Post what you're harvesting. Set a bid end date and let buyers compete fairly.",
  },
  {
    id: 2,
    icon: FaHandshake,
    title: "We Connect You Directly",
    description:
      "Our platform is the meeting point. No agents, no hidden costs.",
  },
  {
    id: 3,
    icon: FaTruck,
    title: "Bid & We Deliver",
    description:
      "Buyers place bids. Once accepted, we handle the delivery right to the buyer's door. Cash on Delivery.",
  },
];

export const BENEFITS: Benefit[] = [
  {
    id: 1,
    icon: FaMoneyBillWave,
    title: "Better Income for Farmers",
    description: "Sell directly and earn what your hard work truly deserves.",
  },
  {
    id: 2,
    icon: FaShoppingCart,
    title: "Fair Prices for Customers",
    description:
      "Buy fresh, high-quality produce without inflated retail markups.",
  },
  {
    id: 3,
    icon: FaTruck,
    title: "Hassle-Free Delivery",
    description:
      "Sit back and relax. We manage the logistics from farm to your home.",
  },
];

export const ARTICLES: Article[] = [
  {
    id: 1,
    title: "5 Tips for Organic Pest Control",
    description:
      "Learn natural and effective ways to protect crops without harmful chemicals. These organic pest control methods help maintain soil health and increase productivity.",
    images: [A1],
    byAdmin: "Admin",
    createdAt: "2025-02-10T10:15:00Z",
  },
  {
    id: 2,
    title: "The Benefits of Seasonal Eating",
    description:
      "Discover why eating seasonal produce improves health, supports farmers, and enhances sustainability in local communities.",
    images: [A2],
    byAdmin: "Admin",
    createdAt: "2025-02-05T08:30:00Z",
  },
  {
    id: 3,
    title: "Success Story: Farmer Raj's First Sale on annanewa",
    description:
      "Read how Farmer Raj successfully made his first sale on annanewa, earning more profit and reaching customers directly.",
    images: [A3],
    byAdmin: "Admin",
    createdAt: "2025-01-29T14:45:00Z",
  },
  {
    id: 4,
    title: "How to Start Your Own Backyard Vegetable Garden",
    description:
      "A complete beginner-friendly guide to starting a small vegetable garden at home with minimal tools and maximum results.",
    images: [A4],
    byAdmin: "Admin",
    createdAt: "2025-01-20T09:20:00Z",
  },
];

export const cardsData: Testimonial[] = [
  {
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    name: "Briar Martin",
    review:
      "Radiant made undercutting all of our competitors an absolute breeze.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    name: "Avery Johnson",
    review:
      "Radiant made undercutting all of our competitors an absolute breeze.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
    name: "Jordan Lee",
    review:
      "Radiant made undercutting all of our competitors an absolute breeze.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
    name: "Avery Johnson",
    review:
      "Radiant made undercutting all of our competitors an absolute breeze.",
  },
];

// dummy data
export const productDetails: ProductDetails = {
  _id: "690592d64fb52136ae1508c8",
  title: "Organic Tomatto",
  description: "Fresh organic tomatoes from our farm",
  pricePerKg: 50,
  totalWeight: 50,
  images: [P6,P7,P8,P9,P6,P7,P8,P9],
  user: {
    _id: "6904932a77aba4f1527e4ab4",
    name: "John Farmer",
    email: "tesof25496@haotuwu.com",
    phone: "1234567890",
    role: "buyer",
    address: {
      street: "123 Farm Road",
      city: "Dhaka",
      state: "Dhaka Division",
      zipCode: "1200",
      country: "Bangladesh",
    },
  },
  userRole: "buyer",
  postType: "buy",
  status: "purchased",
  category: "vegetables",
  expiryDate: "2025-12-31T00:00:00.000Z",
  companyRevenue: 48,
  bids: [
    {
      _id: "690593764fb52136ae1508f3",
      user: {
        _id: "69033ff00bee9542a9b14cce",
        name: "Setulal Chowhan",
        email: "rekerad624@haotuwu.com",
        role: "buyer",
        address: {
          street: "123 Farm Road",
          city: "Dhaka",
          state: "Dhaka Division",
          zipCode: "1200",
          country: "Bangladesh",
        },
      },
      amount: 48,
      bidAt: "2025-11-01T04:58:30.353Z",
      status: "accepted",
      paymentMethod: "Cash on Delivery",
      deliveryAddress: {
        street: "123 Farm Road",
        city: "Dhaka",
        state: "Dhaka Division",
        zipCode: "1200",
        country: "Bangladesh",
      },
    },
  ],
  createdAt: "2025-11-01T04:55:50.644Z",
  updatedAt: "2025-11-01T05:21:44.053Z",
  slug: "organic-tomatto-9j3t1",
  soldAt: "2025-11-01T05:21:44.050Z",
  bidWinner: null,
  // bidWinner: {
  //   user: "69033ff00bee9542a9b14cce",
  //   bidAmount: 48,
  //   acceptedAt: "2025-11-01T05:21:44.049Z",
  // },
};
