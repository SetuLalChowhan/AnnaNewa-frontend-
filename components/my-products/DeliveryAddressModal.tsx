import React from 'react';
import { X, MapPin } from 'lucide-react';
import { Bid, } from "@/types/myProducts"

interface DeliveryAddressModalProps {
  bid: Bid | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DeliveryAddressModal: React.FC<DeliveryAddressModalProps> = ({ 
  bid, 
  isOpen, 
  onClose 
}) => {
  if (!isOpen || !bid) return null;

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center p-4 z-60">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <MapPin size={20} className="text-primaryColor" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Delivery Address</h3>
              <p className="text-sm text-gray-500">{bid.user.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Address Details */}
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <MapPin size={18} className="text-gray-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Address</p>
                <p className="text-gray-600 mt-1">{bid.deliveryAddress.address}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-gray-900 text-sm">City</p>
                <p className="text-gray-600">{bid.deliveryAddress.city}</p>
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">State</p>
                <p className="text-gray-600">{bid.deliveryAddress.state}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-gray-900 text-sm">ZIP Code</p>
                <p className="text-gray-600">{bid.deliveryAddress.zipCode}</p>
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">Country</p>
                <p className="text-gray-600">{bid.deliveryAddress.country || 'India'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-gray-200 p-6">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 text-white bg-primaryColor rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};