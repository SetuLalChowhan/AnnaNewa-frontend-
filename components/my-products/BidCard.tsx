import React from 'react';
import { User, MapPin } from 'lucide-react';
import { Bid, Product } from "@/types/myProducts"
import { StatusBadge } from './StatusBadge'; 

interface BidCardProps {
  bid: Bid;
  product: Product;
  onViewAddress: (bid: Bid) => void;
  onAcceptBid: (productId: string, bidId: string) => void;
}

export const BidCard: React.FC<BidCardProps> = ({ 
  bid, 
  product, 
  onViewAddress, 
  onAcceptBid 
}) => {
  const getPaymentIcon = (method: string) => {
    const icons = {
      'Cash on Delivery': '💰',
      'Bank Transfer': '🏦',
      'UPI': '📱',
      'Card': '💳',
    };
    return icons[method as keyof typeof icons] || '💳';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-200">
      {/* Bid Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User size={18} className="text-white" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{bid.user.name}</p>
            <p className="text-xs text-gray-500 truncate max-w-[120px]">{bid.user.email}</p>
          </div>
        </div>
        <StatusBadge status={bid.status} />
      </div>

      {/* Bid Details */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Bid Amount:</span>
          <span className="font-bold text-green-600">₹{bid.bidAmount}/kg</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Payment:</span>
          <div className="flex items-center space-x-1">
            <span>{getPaymentIcon(bid.paymentMethod)}</span>
            <span className="text-sm font-medium">{bid.paymentMethod}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Date:</span>
          <span className="text-sm text-gray-600">{new Date(bid.bidAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={() => onViewAddress(bid)}
          className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200 transition-colors"
        >
          <MapPin size={14} />
          <span>Address</span>
        </button>
        {bid.status !== 'accepted' && (
          <button
            onClick={() => onAcceptBid(product._id, bid._id)}
            className="flex-1 px-3 py-2 text-sm text-white bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors"
          >
            Accept
          </button>
        )}
      </div>
    </div>
  );
};