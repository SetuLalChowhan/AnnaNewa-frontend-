import React from "react";
import { Order } from "@/types/order";
import { Eye, ShoppingCart, Tag } from "lucide-react";
import { OrderStatusBadge } from "./OrderStatusBadge";

interface OrdersTableProps {
  orders: Order[];
  onViewOrderDetails: (order: Order) => void;
  isLoading?: boolean;
}

export const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  onViewOrderDetails,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-28"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-8 w-8 bg-gray-200 rounded-lg mx-auto"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      {order.product?.images?.[0]?.url ? (
                        <img
                          src={order.product.images[0].url}
                          alt={order.product.title}
                          className="w-8 h-8 rounded object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                          <ShoppingCart size={14} className="text-gray-400" />
                        </div>
                      )}
                      <span
                        className="font-medium truncate max-w-[150px]"
                        title={order.product.title}
                      >
                        {order.product.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.postType === "sell"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      <Tag size={12} className="mr-1" />
                      {order.postType === "sell" ? "Selling" : "Buying"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <OrderStatusBadge status={order.orderStatus} type="order" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ₹{order.totalPrice.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <button
                      onClick={() => onViewOrderDetails(order)}
                      className="text-primaryColor hover:text-blue-700 transition-colors p-2 hover:bg-blue-50 rounded-lg"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center justify-center">
                    <ShoppingCart size={40} className="text-gray-300 mb-3" />
                    <p className="text-lg font-medium text-gray-900">
                      No orders found
                    </p>
                    <p className="text-sm text-gray-500">
                      Your order history will appear here.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
