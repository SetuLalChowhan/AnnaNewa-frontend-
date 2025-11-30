import React from 'react';
import { X, Package } from 'lucide-react';
import { Order } from '@/types/order';
import { OrderStatusBadge } from './OrderStatusBadge';

interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

  const getPostTypeLabel = (postType: string) => (postType === 'sell' ? 'Sale Order' : 'Purchase Order');

  return (
    <div className="fixed inset-0 z-50  flex items-center text-gray-900! justify-center p-4 bg-black/40 backdrop-blur">

      <div className="bg-white/90 border border-gray-200 rounded-2xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-linear-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow">
              <Package size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
                {order.product.title}
              </h2>
              <p className="text-xs text-gray-400">
                {getPostTypeLabel(order.postType)} • #{order.orderNumber}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-500"
          >
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* LEFT */}
            <div className="space-y-5">

              {/* STATUS */}
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Status Overview</h3>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-[11px] text-gray-400 mb-1">Order</p>
                    <OrderStatusBadge status={order.orderStatus} type="order" />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 mb-1">Delivery</p>
                    <OrderStatusBadge status={order.deliveryStatus} type="delivery" />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 mb-1">Payment</p>
                    <OrderStatusBadge status={order.paymentStatus} type="payment" />
                  </div>
                </div>
              </div>

              {/* PRODUCT */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 text-gray-900!">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Product</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Category</span>
                    <span className="font-normal capitalize">{order.product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Quantity</span>
                    <span className="font-normal">{order.quantity} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Price / kg</span>
                    <span className="font-normal">₹ {order.pricePerKg}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type</span>
                    <span className={`font-normald ${order.postType === 'sell' ? 'text-green-600' : 'text-blue-600'}`}>
                      {getPostTypeLabel(order.postType)}
                    </span>
                  </div>
                </div>
              </div>

              {/* TIMELINE */}
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Timeline</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Created</span>
                    <span className="text-gray-700">{formatDate(order.createdAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Expected</span>
                    <span className="text-gray-700">{formatDate(order.expectedDelivery)}</span>
                  </div>
                  {order.deliveredAt && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Delivered</span>
                      <span className="text-gray-700">{formatDate(order.deliveredAt)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-5">

              {/* FINANCIAL */}
              <div className="bg-white/80 border border-gray-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Financial</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total</span>
                    <span className="font-bold text-green-600">₹ {order.totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Platform ({order.commissionRate * 100}%)</span>
                    <span className="font-medium text-blue-600">₹ {order.companyRevenue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Seller Earn</span>
                    <span className="font-medium text-green-600">₹ {order.sellerEarning}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Payment</span>
                    <span className="font-medium">{order.paymentMethod}</span>
                  </div>
                </div>
              </div>

              {/* USERS */}
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">People</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-gray-800">Seller</p>
                    <p className="text-gray-900!">{order.seller.name}</p>
                    <p className="text-gray-900!">{order.seller.email}</p>
                    <p className="text-gray-900!">{order.seller.phone}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Buyer</p>
                    <p className="text-gray-900!">{order.buyer.name}</p>
                    <p className="text-gray-900!">{order.buyer.email}</p>
                    <p className="text-gray-900!">{order.buyer.phone}</p>
                  </div>
                </div>
              </div>

              {/* DELIVERY */}
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Delivery</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700">{order.deliveryAddress.address}</p>
                  <p className="text-gray-900!">
                    {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.zipCode}
                  </p>

                  {order.trackingNumber && (
                    <div className="pt-2 text-sm">
                      <p className="font-medium text-gray-700">Tracking ID</p>
                      <p className="text-gray-900!">{order.trackingNumber}</p>
                      <p className="text-gray-900!">{order.shippingProvider}</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-gray-100 p-5 bg-white/80">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-lg font-medium bg-primaryColor text-white transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
