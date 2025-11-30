import React from 'react';

interface StatusBadgeProps {
  status: string;
  type: 'order' | 'delivery' | 'payment';
  className?: string;
}

export const OrderStatusBadge: React.FC<StatusBadgeProps> = ({ status, type, className = '' }) => {
  const getStatusConfig = (status: string, type: string) => {
    const baseConfig = {
      order: {
        Processing: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
        Completed: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
        Cancelled: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
        Refunded: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
      },
      delivery: {
        Pending: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' },
        Confirmed: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
        Shipped: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200' },
        'Out for Delivery': { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-200' },
        Delivered: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
        Cancelled: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
      },
      payment: {
        Pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
        Paid: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
        Failed: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
        Refunded: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
      }
    };

    const config = baseConfig[type as keyof typeof baseConfig];
    return config[status as keyof typeof config] || { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' };
  };

  const { bg, text, border } = getStatusConfig(status, type);

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${bg} ${text} ${border} ${className}`}>
      {status}
    </span>
  );
};