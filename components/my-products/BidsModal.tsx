import React from "react";
import {
  X,
  Eye,
  FileText,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { Bid, Product } from "@/types/myProducts";
import { ProductImage } from "./ProductImage";
import { StatusBadge } from "./StatusBadge";

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
  onAcceptBid,
}) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="flex items-center space-x-4">
            <ProductImage
              images={product.images.map((i) => i.url)}
              title={product.title}
              size="lg"
            />
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                {product.title}
              </h2>
              <div className="flex items-center space-x-4 mt-1 flex-wrap">
                <span className="text-sm text-gray-500">
                  Category: {product.category.name}
                </span>
                <span className="text-sm text-gray-500">
                  Base Price: ₹{product.pricePerKg}/kg
                </span>
                <span className="text-sm text-gray-500">
                  Weight: {product.totalWeight}kg
                </span>
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

        {/* Modal Body - Bids Table */}
        <div className="flex-1 overflow-auto p-0">
          {product.bids.length > 0 ? (
            <div className="w-full">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4">Bidder</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Payment</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {product.bids.map((bid) => (
                    <tr
                      key={bid._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900">
                            {bid.user.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {bid.user.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-900">
                          ₹{bid.bidAmount}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} />
                          {new Date(bid.bidAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={bid.status} />
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {bid.paymentMethod}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center items-center gap-2">
                          <button
                            onClick={() => onViewAddress(bid)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Delivery Address"
                          >
                            <FileText size={18} />
                          </button>

                          {/* Example Action Buttons (only mostly visual here depending on status) */}
                          {bid.status === "pending" && (
                            <>
                              <button
                                onClick={() =>
                                  onAcceptBid(product._id, bid._id)
                                }
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Accept Bid"
                              >
                                <CheckCircle size={18} />
                              </button>
                              <button
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Reject Bid"
                              >
                                <XCircle size={18} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 flex flex-col items-center justify-center h-full">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Eye size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">
                No bids available for this product
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Bids will appear here when buyers place offers
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">
                Total Bids:{" "}
                <span className="font-semibold">{product.bids.length}</span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg font-medium transition-colors shadow-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
