import React from 'react';
import { Order } from '@/types/order';
import { OrderCard } from './OrderCard';
import { Package } from 'lucide-react';

interface OrdersGridProps {
  orders: Order[];
  onViewOrderDetails: (order: Order) => void;
  emptyMessage?: string;
}

export const OrdersGrid: React.FC<OrdersGridProps> = ({
  orders,
  onViewOrderDetails,
  emptyMessage = 'No orders found'
}) => {
  if (!orders.length) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Package size={32} className="text-gray-400" />
        </div>
        <p className="text-gray-500 text-lg">{emptyMessage}</p>
        <p className="text-gray-400 text-sm">
          Orders will appear here when created
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {orders.map(order => (
        <OrderCard
          key={order._id}
          order={order}
          onViewDetails={onViewOrderDetails}
        />
      ))}
    </div>
  );
};
