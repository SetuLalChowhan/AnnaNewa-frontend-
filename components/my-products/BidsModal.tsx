import React from 'react';
import { X, Eye } from 'lucide-react';
import { Bid, Product } from "@/types/myProducts"
import { ProductImage } from './ProductImage';
import { BidCard } from './BidCard';

interface BidsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onViewAddress: (bid: Bid) => void;
  onAcceptBid: (productId: string, bidId: string) => void;
}

export const BidsModal: React.FC<BidsModalProps> = ({ 
  product, 
  isOpen, 
  onClose, 
  onViewAddress, 
  onAcceptBid 
}) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="flex items-center space-x-4">
            <ProductImage 
              images={product.images} 
              title={product.title} 
              size="lg"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{product.title}</h2>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-sm text-gray-500">Category: {product.category}</span>
                <span className="text-sm text-gray-500">Base Price: ₹{product.pricePerKg}/kg</span>
                <span className="text-sm text-gray-500">Weight: {product.totalWeight}kg</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body - Bids Grid */}
        <div className="flex-1 overflow-auto p-6">
          {product.bids.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {product.bids.map((bid) => (
                <BidCard
                  key={bid._id}
                  bid={bid}
                  product={product}
                  onViewAddress={onViewAddress}
                  onAcceptBid={onAcceptBid}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">No bids available for this product</p>
              <p className="text-gray-400 text-sm mt-1">Bids will appear here when buyers place offers</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">
                Total Bids: <span className="font-semibold">{product.bids.length}</span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};