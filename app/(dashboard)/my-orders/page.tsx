"use client";
import React, { useState } from 'react';
import { Order } from '@/types/order'; 
import { OrdersGrid } from '@/components/myOrders/OrdersGrid'; 
import { OrderDetailsModal } from '@/components/myOrders/OrderDetailsModal'; 

// Mock data based on your API response
const mockOrders: Order[] = [
  {
    sellerLocation: {
      city: "Dhaka",
      state: "Dhaka Division",
      zipCode: "1200",
      country: "Bangladesh"
    },
    buyerLocation: {
      city: "Dhaka",
      state: "Dhaka",
      zipCode: "1212",
      country: "Bangladesh"
    },
    deliveryAddress: {
      address: "123 Farm Road",
      city: "Dhaka",
      state: "Dhaka Division",
      zipCode: "1200",
      country: "Bangladesh"
    },
    _id: "690598e82da479ef039f9a70",
    orderNumber: "ORD-20251101-0002",
    product: {
      _id: "690592d64fb52136ae1508c8",
      title: "Organic Tomato",
      images: [],
      category: "vegetables",
      slug: "organic-tomato-9j3t1"
    },
    postType: "buy",
    seller: {
      _id: "69033ff00bee9542a9b14cce",
      name: "Setulal Chowhan",
      email: "rekerad624@haotuwu.com",
      phone: "01703235224"
    },
    buyer: {
      _id: "6904932a77aba4f1527e4ab4",
      name: "John Farmer",
      email: "tesof25496@haotuwu.com",
      phone: "1234567890"
    },
    quantity: 50,
    pricePerKg: 48,
    totalPrice: 2400,
    companyRevenue: 48,
    sellerEarning: 2352,
    buyerPayment: 2400,
    commissionRate: 0.02,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Paid",
    deliveryStatus: "Delivered",
    orderStatus: "Completed",
    notes: "Order completed successfully",
    expectedDelivery: "2025-11-08T05:21:44.223Z",
    createdAt: "2025-11-01T05:21:44.225Z",
    updatedAt: "2025-11-01T05:23:59.757Z",
    shippingProvider: "DTDC",
    trackingNumber: "TRK123456789",
    deliveredAt: "2025-11-01T05:23:59.756Z"
  },
  {
    sellerLocation: {
      city: "Dhaka",
      state: "Dhaka",
      zipCode: "1212",
      country: "Bangladesh"
    },
    buyerLocation: {
      city: "Dhaka",
      state: "Dhaka Division",
      zipCode: "1200",
      country: "Bangladesh"
    },
    deliveryAddress: {
      address: "123 Green Valley Farms, Near Highway",
      city: "Pune",
      state: "Maharashtra",
      zipCode: "411001",
      country: "India"
    },
    _id: "690593d54fb52136ae150907",
    orderNumber: "ORD-20251101-0001",
    product: {
      _id: "690592964fb52136ae1508bf",
      title: "Organic Mango",
      images: [],
      category: "vegetables",
      slug: "organic-mango-kho8w"
    },
    postType: "sell",
    seller: {
      _id: "69033ff00bee9542a9b14cce",
      name: "Setulal Chowhan",
      email: "rekerad624@haotuwu.com",
      phone: "01703235224"
    },
    buyer: {
      _id: "6904932a77aba4f1527e4ab4",
      name: "John Farmer",
      email: "tesof25496@haotuwu.com",
      phone: "1234567890"
    },
    quantity: 50,
    pricePerKg: 260,
    totalPrice: 13000,
    companyRevenue: 260,
    sellerEarning: 12740,
    buyerPayment: 13000,
    commissionRate: 0.02,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Paid",
    deliveryStatus: "Delivered",
    orderStatus: "Completed",
    notes: "Order completed successfully",
    expectedDelivery: "2025-11-08T05:00:05.465Z",
    createdAt: "2025-11-01T05:00:05.467Z",
    updatedAt: "2025-11-01T05:07:27.963Z",
    shippingProvider: "DTDC",
    trackingNumber: "TRK123456789",
    deliveredAt: "2025-11-01T05:07:27.963Z"
  }
];

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleViewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="min-h-screen ">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Orders Management</h1>
          <p className="text-gray-600">Track and manage all orders with complete details</p>
          <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-primaryColor rounded-full"></div>
              <span>Completed: {mockOrders.filter(o => o.orderStatus === 'Completed').length}</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Processing: {mockOrders.filter(o => o.orderStatus === 'Processing').length}</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Total Orders: {mockOrders.length}</span>
            </div>
          </div>
        </div>

        {/* Orders Grid */}
        <OrdersGrid
          orders={mockOrders}
          onViewOrderDetails={handleViewOrderDetails}
          emptyMessage="No orders available"
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