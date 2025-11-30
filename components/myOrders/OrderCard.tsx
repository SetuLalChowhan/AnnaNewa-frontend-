import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Order } from '@/types/order';   // ✅ ONLY source of truth

interface OrderCardProps {
  order: Order;
  onViewDetails: (order: Order) => void;
}

const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800 ring-1 ring-yellow-200',
    confirmed: 'bg-blue-100 text-blue-800 ring-1 ring-blue-200',
    shipped: 'bg-indigo-100 text-indigo-800 ring-1 ring-indigo-200',
    delivered: 'bg-green-100 text-green-800 ring-1 ring-green-200',
    'in-transit': 'bg-indigo-100 text-indigo-800 ring-1 ring-indigo-200',
    completed: 'bg-green-100 text-green-800 ring-1 ring-green-200',
    failed: 'bg-red-100 text-red-700 ring-1 ring-red-200'
  };

  return statusColors[status] || 'bg-gray-100 text-gray-700 ring-1 ring-gray-200';
};

export const OrderCard: React.FC<OrderCardProps> = ({ order, onViewDetails }) => {
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

  return (
    <div className="bg-white/80 border text-black! border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-lg hover:-translate-y-0.5 transition">

      {/* HEADER */}
      <div className="flex justify-between mb-4 border-b pb-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            {order.product.title}
          </h3>
          <p className="text-xs text-gray-400">
            Order • {order.orderNumber}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-600">{formatDate(order.createdAt)}</p>
          <p className="text-xs text-gray-400">
            {order.postType === 'sell' ? 'Sale' : 'Purchase'}
          </p>
        </div>
      </div>

      {/* STATUS */}
      <div className="flex gap-2 mb-4">
        <span className={`flex-1 text-center text-[11px] font-semibold rounded-full py-1.5 ${getStatusColor(order.orderStatus)}`}>
          {order.orderStatus}
        </span>
        <span className={`flex-1 text-center text-[11px] font-semibold rounded-full py-1.5 ${getStatusColor(order.deliveryStatus)}`}>
          {order.deliveryStatus}
        </span>
        <span className={`flex-1 text-center text-[11px] font-semibold rounded-full py-1.5 ${getStatusColor(order.paymentStatus)}`}>
          {order.paymentStatus}
        </span>
      </div>

      {/* INFO */}
      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <p className="text-xs text-gray-400">Customer</p>
          <p className="font-medium">{order.buyer.name}</p>
        </div>

        <div>
          <p className="text-xs text-gray-400">Total</p>
          <p className="font-semibold">₹ {order.totalPrice.toLocaleString('en-IN')}</p>
        </div>

        <div>
          <p className="text-xs text-gray-400">Quantity</p>
          <p>{order.quantity} kg</p>
        </div>

        <div>
          <p className="text-xs text-gray-400">Location</p>
          <p>{order.deliveryAddress.city}</p>
        </div>
      </div>

      {/* FINANCE */}
      <div className="grid grid-cols-3 text-xs bg-gray-50 p-3 rounded mb-4">
        <div>
          <p className="text-gray-400">Platform</p>
          <p className="font-semibold text-gray-800">
            ₹ {order.companyRevenue.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-gray-400">Seller</p>
          <p className="font-semibold text-green-600">
            ₹ {order.sellerEarning.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-gray-400">Fee</p>
          <p className="font-semibold text-blue-600">
            {(order.commissionRate * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      {/* BUTTON */}
      <button
        onClick={() => onViewDetails(order)}
        className="w-full mt-2 bg-primaryColor text-white! py-2 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2"
      >
        View Details <ChevronRight size={16} />
      </button>

    </div>
  );
};
