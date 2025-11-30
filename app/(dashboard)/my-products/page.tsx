"use client";
import React, { useState } from "react";
import { Bid, Product } from "@/types/myProducts";
import { ProductsTable } from "@/components/my-products/ProductsTable";
import { BidsModal } from "@/components/my-products/BidsModal";
import { DeliveryAddressModal } from "@/components/my-products/DeliveryAddressModal";

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBid, setSelectedBid] = useState<Bid | null>(null);
  const [isBidsModalOpen, setIsBidsModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const openBidsModal = (product: Product) => {
    setSelectedProduct(product);
    setIsBidsModalOpen(true);
  };

  const closeBidsModal = () => {
    setIsBidsModalOpen(false);
    setSelectedProduct(null);
  };

  const openAddressModal = (bid: Bid) => {
    setSelectedBid(bid);
    setIsAddressModalOpen(true);
  };

  const closeAddressModal = () => {
    setIsAddressModalOpen(false);
    setSelectedBid(null);
  };

  const handleAcceptBid = (productId: string, bidId: string) => {
    alert(`Bid ${bidId} accepted for product ${productId}!`);
  };

  const DummyProducts: Product[] = [
    {
      location: {
        address: "Farm Road 123",
        city: "Pune",
        state: "Maharashtra",
        zipCode: "411001",
      },
      _id: "691d9b0deb96892e6022aaf1",
      title: "Fresh Bananas",
      description: "Fresh organic bananas from our farm",
      pricePerKg: 50,
      totalWeight: 50,
      images: [
        "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1543218024-57d7017d7c7c?w=400&h=300&fit=crop",
      ],
      user: "69033ff00bee9542a9b14cce",
      userRole: "seller",
      postType: "sell",
      status: "active",
      category: "fruits",
      expiryDate: "2025-12-31T00:00:00.000Z",
      companyRevenue: 0,
      bids: [],
      createdAt: "2025-11-19T10:25:17.280Z",
      updatedAt: "2025-11-19T10:25:17.280Z",
      slug: "banana-ctnbw",
    },
    {
      location: {
        address: "Farm Road 123",
        city: "Pune",
        state: "Maharashtra",
        zipCode: "411001",
      },
      bidWinner: {
        user: "6904932a77aba4f1527e4ab4",
        bidAmount: 260,
        acceptedAt: "2025-11-01T05:00:05.291Z",
      },
      _id: "690592964fb52136ae1508bf",
      title: "Organic Mangoes",
      description: "Fresh organic mangoes from our farm",
      pricePerKg: 200,
      totalWeight: 50,
      images: [
        "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1560880558-8a6c0b4c8b8c?w=400&h=300&fit=crop",
      ],
      user: "69033ff00bee9542a9b14cce",
      userRole: "seller",
      postType: "sell",
      status: "sold",
      category: "fruits",
      expiryDate: "2024-12-31T00:00:00.000Z",
      companyRevenue: 260,
      bids: [
        {
          deliveryAddress: {
            address: "123 Green Valley Farms, Near Highway, Kharadi",
            city: "Pune",
            state: "Maharashtra",
            zipCode: "411001",
            country: "India",
          },
          user: {
            _id: "6904932a77aba4f1527e4ab4",
            name: "John Farmer",
            email: "tesof25496@haotuwu.com",
          },
          bidAmount: 260,
          bidAt: "2025-11-01T04:56:50.217Z",
          status: "accepted",
          paymentMethod: "Cash on Delivery",
          _id: "690593124fb52136ae1508d8",
        },
        {
          deliveryAddress: {
            address: "456 Tech Park, Hinjewadi Phase 3",
            city: "Pune",
            state: "Maharashtra",
            zipCode: "411057",
            country: "India",
          },
          user: {
            _id: "6904932a77aba4f1527e4ab5",
            name: "Sarah Smith",
            email: "sarah@example.com",
          },
          bidAmount: 250,
          bidAt: "2025-11-01T04:55:50.217Z",
          status: "rejected",
          paymentMethod: "UPI",
          _id: "690593124fb52136ae1508d9",
        },
      ],
      createdAt: "2025-11-01T04:54:46.478Z",
      updatedAt: "2025-11-01T05:00:05.292Z",
      slug: "organic-mango-kho8w",
    },
    {
      location: {
        address: "Farm Road 123",
        city: "Pune",
        state: "Maharashtra",
        zipCode: "411001",
      },
      _id: "6905928b4fb52136ae1508bb",
      title: "Organic Potatoes",
      description: "Fresh organic potatoes from our farm",
      pricePerKg: 200,
      totalWeight: 50,
      images: [
        "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop",
      ],
      user: "69033ff00bee9542a9b14cce",
      userRole: "seller",
      postType: "sell",
      status: "active",
      category: "vegetables",
      expiryDate: "2024-12-31T00:00:00.000Z",
      companyRevenue: 0,
      bids: [
        {
          deliveryAddress: {
            address: "456 Agricultural Lane, Wakad",
            city: "Pune",
            state: "Maharashtra",
            zipCode: "411002",
            country: "India",
          },
          user: {
            _id: "6904932a77aba4f1527e4ab5",
            name: "Sarah Smith",
            email: "sarah@example.com",
          },
          bidAmount: 210,
          bidAt: "2025-11-15T10:30:00.000Z",
          status: "pending",
          paymentMethod: "Bank Transfer",
          _id: "690593124fb52136ae1508d9",
        },
        {
          deliveryAddress: {
            address: "789 Harvest Street, Baner",
            city: "Pune",
            state: "Maharashtra",
            zipCode: "411003",
            country: "India",
          },
          user: {
            _id: "6904932a77aba4f1527e4ab6",
            name: "Mike Johnson",
            email: "mike@example.com",
          },
          bidAmount: 225,
          bidAt: "2025-11-16T14:20:00.000Z",
          status: "pending",
          paymentMethod: "UPI",
          _id: "690593124fb52136ae1508da",
        },
        {
          deliveryAddress: {
            address: "321 Orchard Road, Aundh",
            city: "Pune",
            state: "Maharashtra",
            zipCode: "411007",
            country: "India",
          },
          user: {
            _id: "6904932a77aba4f1527e4ab7",
            name: "Priya Sharma",
            email: "priya@example.com",
          },
          bidAmount: 240,
          bidAt: "2025-11-17T09:15:00.000Z",
          status: "pending",
          paymentMethod: "Card",
          _id: "690593124fb52136ae1508db",
        },
      ],
      createdAt: "2025-11-01T04:54:35.613Z",
      updatedAt: "2025-11-01T04:54:35.613Z",
      slug: "organic-potato-mlyt6",
    },
  ];

  return (
    <div className="min-h-screen ">
      <div className=" ">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Products & Bids Management
          </h1>
          <p className="text-gray-600">
            Manage products and review bids from buyers
          </p>
        </div>

        <ProductsTable products={DummyProducts} onViewBids={openBidsModal} />
      </div>

      <BidsModal
        product={selectedProduct}
        isOpen={isBidsModalOpen}
        onClose={closeBidsModal}
        onViewAddress={openAddressModal}
        onAcceptBid={handleAcceptBid}
      />

      <DeliveryAddressModal
        bid={selectedBid}
        isOpen={isAddressModalOpen}
        onClose={closeAddressModal}
      />
    </div>
  );
}
