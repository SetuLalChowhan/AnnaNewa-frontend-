"use client";

import React from "react";
import useClient from "@/hooks/useClient";
import Image from "next/image";
import {
  ShoppingBag,
  CreditCard,
  Gavel,
  Trophy,
  Package,
  Calendar,
  AlertCircle,
} from "lucide-react";

// Interfaces
interface ProductImage {
  public_id: string;
  url: string;
  _id: string;
}

interface Product {
  _id: string;
  title: string;
  images: ProductImage[];
}

interface UserInfo {
  _id: string;
  name: string;
  email: string;
}

interface Order {
  _id: string;
  orderNumber: string;
  product: Product;
  seller: UserInfo;
  buyer: UserInfo;
  quantity: number;
  totalPrice: number;
  paymentStatus: string;
  deliveryStatus: string;
  orderStatus: string;
  createdAt: string;
}

interface DashboardStats {
  role: string;
  totalBids: number;
  winningBids: number;
  totalProducts: number;
  completedOrders: number;
  totalSpent: number;
  recentOrders: Order[];
}

interface ApiResponse {
  success: boolean;
  stats: DashboardStats;
}

const Dashboard: React.FC = () => {
  const {
    data: responseData,
    isLoading,
    isError,
  } = useClient({
    queryKey: ["dashboard-stats"],
    url: "/dashboard/stats",
    isPrivate: true,
  });

  const stats = (responseData as ApiResponse)?.stats;

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-red-500 gap-2">
        <AlertCircle size={48} />
        <p className="text-lg font-medium">Failed to load dashboard data</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 min-h-screen text-black animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Welcome back! Here&apos;s your activity overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Spent"
          value={`$${stats?.totalSpent?.toLocaleString() ?? 0}`}
          icon={<CreditCard className="w-6 h-6 text-emerald-600" />}
          bg="bg-emerald-100"
        />
        <StatCard
          title="Completed Orders"
          value={stats?.completedOrders}
          icon={<ShoppingBag className="w-6 h-6 text-blue-600" />}
          bg="bg-blue-100"
        />
        <StatCard
          title="Total Bids"
          value={stats?.totalBids}
          icon={<Gavel className="w-6 h-6 text-violet-600" />}
          bg="bg-violet-100"
        />
        <StatCard
          title="Winning Bids"
          value={stats?.winningBids}
          icon={<Trophy className="w-6 h-6 text-amber-600" />}
          bg="bg-amber-100"
        />
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Package className="w-5 h-5 text-gray-500" />
            Recent Orders
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stats?.recentOrders?.length > 0 ? (
                stats.recentOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="bg-white hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {order.orderNumber}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 relative rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                          {order.product?.images?.[0]?.url ? (
                            <Image
                              src={order.product.images[0].url}
                              alt={order.product.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <Package size={16} />
                            </div>
                          )}
                        </div>
                        <span className="font-medium text-gray-700">
                          {order.product?.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      ${order.totalPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={order.orderStatus} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No recent orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Sub-components
const StatCard = ({
  title,
  value,
  icon,
  bg,
}: {
  title: string;
  value: string | number | undefined;
  icon: React.ReactNode;
  bg: string;
}) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900">{value ?? 0}</h3>
    </div>
    <div
      className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center`}
    >
      {icon}
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    Completed: "bg-green-100 text-green-700 border-green-200",
    Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Cancelled: "bg-red-100 text-red-700 border-red-200",
    Processing: "bg-blue-100 text-blue-700 border-blue-200",
  };

  const defaultStyle = "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status] || defaultStyle}`}
    >
      {status}
    </span>
  );
};

const DashboardSkeleton = () => {
  return (
    <div className="p-6 space-y-8 min-h-screen animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-3">
        <div className="h-8 bg-gray-200 rounded-lg w-48"></div>
        <div className="h-4 bg-gray-200 rounded-lg w-72"></div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-32 flex justify-between items-center"
          >
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
          </div>
        ))}
      </div>

      {/* Recent Orders Skeleton */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-96 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="h-6 bg-gray-200 rounded w-40"></div>
        </div>
        <div className="p-6 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-gray-50 rounded-xl w-full"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
