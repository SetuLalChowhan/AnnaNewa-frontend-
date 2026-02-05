"use client";
import React, { useState } from "react";
import { Bid, Product } from "@/types/myProducts";
import { ProductsTable } from "@/components/my-products/ProductsTable";
import { BidsModal } from "@/components/my-products/BidsModal";
import { DeliveryAddressModal } from "@/components/my-products/DeliveryAddressModal";
import useClient from "@/hooks/useClient";
import { AlertCircle } from "lucide-react";

interface ApiResponse {
  success: boolean;
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalProducts: number;
  };
}

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBid, setSelectedBid] = useState<Bid | null>(null);
  const [isBidsModalOpen, setIsBidsModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const {
    data: responseData,
    isLoading,
    isError,
  } = useClient({
    queryKey: ["my-products"],
    url: "/product/my-products",
    isPrivate: true,
  });

  const products = (responseData as ApiResponse)?.products || [];

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
    // API integration for accepting bid would go here
    alert(`Bid ${bidId} accepted for product ${productId}!`);
  };

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-red-500 gap-2">
        <AlertCircle size={48} />
        <p className="text-lg font-medium">Failed to load products</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Products</h1>
          <p className="text-gray-600">
            Manage products and review bids from buyers
          </p>
        </div>

        <ProductsTable
          products={products}
          onViewBids={openBidsModal}
          isLoading={isLoading}
        />
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
