import React from "react";
import {
  X,
  Package,
  Calendar,
  MapPin,
  Smartphone,
  Mail,
  User as UserIcon,
  CreditCard,
  Truck,
  AlertCircle,
  Download,
} from "lucide-react";
import { Order } from "@/types/order";
import { OrderStatusBadge } from "./OrderStatusBadge";
import Image from "next/image";

interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !order) return null;

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 border border-gray-200">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50/50">
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-3">
              Order Details
              <span className="px-3 py-1 bg-white border border-gray-200 rounded text-sm font-mono text-gray-600">
                #{order.orderNumber}
              </span>
            </h2>
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-2">
              <Calendar size={12} />
              Placed on {formatDate(order.createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              title="Download Invoice"
            >
              <Download size={20} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* BODY - FULL TABLE CONCEPT */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          <div className="border border-gray-200 rounded-lg overflow-hidden text-sm">
            {/* ROW 1: PARTICIPANTS & ORDER INFO */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x border-b border-gray-200 bg-gray-50/30">
              {/* SELLER */}
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-xs uppercase tracking-wider text-gray-500">
                  <UserIcon size={14} className="text-orange-500" /> Seller
                  Details
                </h3>
                <p className="font-medium text-gray-900 text-base mb-1">
                  {order.seller.name}
                </p>
                <div className="space-y-1 text-gray-600">
                  <p className="flex items-center gap-2">
                    <Mail size={12} /> {order.seller.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Smartphone size={12} /> {order.seller.phone}
                  </p>
                </div>
              </div>

              {/* BUYER */}
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-xs uppercase tracking-wider text-gray-500">
                  <UserIcon size={14} className="text-blue-500" /> Buyer Details
                </h3>
                <p className="font-medium text-gray-900 text-base mb-1">
                  {order.buyer.name}
                </p>
                <div className="space-y-1 text-gray-600">
                  <p className="flex items-center gap-2">
                    <Mail size={12} /> {order.buyer.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Smartphone size={12} /> {order.buyer.phone}
                  </p>
                </div>
              </div>

              {/* ORDER META */}
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                    Order Status
                  </h3>
                  <OrderStatusBadge status={order.orderStatus} type="order" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                      Payment
                    </h3>
                    <OrderStatusBadge
                      status={order.paymentStatus}
                      type="payment"
                    />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                      Delivery
                    </h3>
                    <OrderStatusBadge
                      status={order.deliveryStatus}
                      type="delivery"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ROW 2: PRODUCT TABLE HEADER */}
            <div className="bg-gray-100 border-b border-gray-200 px-6 py-3 grid grid-cols-12 gap-4 text-xs font-semibold uppercase tracking-wider text-gray-600">
              <div className="col-span-6">Product Item</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {/* ROW 3: PRODUCT ITEM */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 grid grid-cols-12 gap-4 items-center">
              <div className="col-span-6 flex items-center gap-4">
                <div className="w-12 h-12 relative rounded border border-gray-200 bg-gray-50 flex-shrink-0 overflow-hidden">
                  {order.product.images?.[0]?.url ? (
                    <Image
                      src={order.product.images[0].url}
                      alt={order.product.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Package size={20} />
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {order.product.title}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Category: {order.product.category?.name || "N/A"}
                  </p>
                </div>
              </div>
              <div className="col-span-2 text-right font-medium text-gray-600">
                ৳ {order.pricePerKg.toLocaleString()}
              </div>
              <div className="col-span-2 text-center text-gray-900">
                {order.quantity} kg
              </div>
              <div className="col-span-2 text-right font-bold text-gray-900">
                ৳ {order.totalPrice.toLocaleString()}
              </div>
            </div>

            {/* ROW 4: SHIPPING & TOTALS SPLIT */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
              {/* LEFT: SHIPPING INFO */}
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
                    <MapPin size={16} className="text-gray-400" /> Delivery To
                  </h3>
                  <div className="pl-6 text-gray-600 leading-relaxed border-l-2 border-gray-100">
                    <p>{order.deliveryAddress.address}</p>
                    <p>
                      {order.deliveryAddress.city},{" "}
                      {order.deliveryAddress.state}
                    </p>
                    <p>{order.deliveryAddress.zipCode}</p>
                  </div>
                </div>
                {order.trackingNumber && (
                  <div>
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
                      <Truck size={16} className="text-gray-400" /> Tracking
                      Information
                    </h3>
                    <div className="pl-6 space-y-2">
                      <div className="flex items-center justify-between bg-gray-50 p-3 rounded border border-gray-200">
                        <span className="text-gray-600">
                          {order.shippingProvider || "Standard"}
                        </span>
                        <span className="font-mono font-medium text-gray-900">
                          {order.trackingNumber}
                        </span>
                      </div>
                      {order.notes && (
                        <div className="flex gap-2 text-amber-700 bg-amber-50 p-2 rounded text-xs">
                          <AlertCircle
                            size={14}
                            className="mt-0.5 flex-shrink-0"
                          />
                          {order.notes}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT: FINANCIAL SUMMARY */}
              <div className="bg-gray-50/30">
                <div className="p-6 border-b border-gray-200 space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>
                      ৳ {(order.quantity * order.pricePerKg).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Platform Fee</span>
                    <span>৳ {order.companyRevenue.toLocaleString()}</span>
                  </div>
                </div>
                <div className="p-6 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900 text-lg">
                      Total Amount
                    </span>
                    <span className="font-bold text-primaryColor text-xl">
                      ৳ {order.totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-end mt-2">
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded border border-green-200">
                      Paid via {order.paymentMethod}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-gray-200 p-4 bg-white flex justify-end">
          <button
            onClick={onClose}
            className="px-8 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
