"use client";
import React, { useState } from "react";
import { Order } from "@/types/order";
import { OrdersTable } from "@/components/myOrders/OrdersTable";
import { OrderDetailsModal } from "@/components/myOrders/OrderDetailsModal";
import useClient from "@/hooks/useClient";
import { AlertCircle } from "lucide-react";

interface ApiResponse {
  success: boolean;
  orders: Order[];
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalOrders: number;
  };
}

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const {
    data: responseData,
    isLoading,
    isError,
  } = useClient({
    queryKey: ["my-orders"],
    url: "/order/my-orders",
    isPrivate: true,
  });

  const orders = (responseData as ApiResponse)?.orders || [];

  const handleViewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedOrder(null);
  };

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-red-500 gap-2">
        <AlertCircle size={48} />
        <p className="text-lg font-medium">Failed to load orders</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Orders Management
          </h1>
          <p className="text-gray-600">
            Track and manage all orders with complete details
          </p>
          {!isLoading && (
            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-secondaryColor rounded-full"></div>
                <span>
                  Completed:{" "}
                  {orders.filter((o) => o.orderStatus === "Completed").length}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>
                  Processing:{" "}
                  {orders.filter((o) => o.orderStatus === "Processing").length}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Total Orders: {orders.length}</span>
              </div>
            </div>
          )}
        </div>

        {/* Orders Table */}
        <OrdersTable
          orders={orders}
          onViewOrderDetails={handleViewOrderDetails}
          isLoading={isLoading}
        />

        {/* Order Details Modal */}
        <OrderDetailsModal
          order={selectedOrder}
          isOpen={isDetailsModalOpen}
          onClose={closeDetailsModal}
        />
      </div>
    </div>
  );
}
