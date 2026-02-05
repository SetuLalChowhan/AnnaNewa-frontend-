"use client";
import { BidHistoryResponse, BiddingHistoryItem } from "@/types/BidHistory";
import useClient from "@/hooks/useClient";
import { AlertCircle, Package } from "lucide-react";

const Page = () => {
  const {
    data: responseData,
    isLoading,
    isError,
  } = useClient({
    queryKey: ["my-bids-history"],
    url: "/product/my-bids/history",
    isPrivate: true,
  });

  const bidHistory = (responseData as BidHistoryResponse)?.biddingHistory || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "purchased":
        return "bg-green-100 text-green-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryColor"></div>
        <p className="text-gray-500">Loading your bid history...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-red-500 gap-2">
        <AlertCircle size={48} />
        <p className="text-lg font-medium">Failed to load bid history</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            My Bidding History
          </h1>
          <p className="text-gray-600 mt-1">
            Track all your bids and their current status
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-500">Total Bids</p>
            <p className="text-2xl font-bold text-gray-900">
              {bidHistory.length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-500">Bids Won</p>
            <p className="text-2xl font-bold text-green-600">
              {bidHistory.filter((item) => item.isWinner).length}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">
                    Product
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">
                    Base Price
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">
                    My Bid
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">
                    Result
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {bidHistory.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    {/* Product */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <Package size={16} />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {item.name}
                          </p>
                          <span className="text-xs text-gray-500">
                            ID: {item._id.slice(-6)}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Base Price */}
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-900">
                        ৳{item.basePrice}
                      </div>
                    </td>

                    {/* My Bid */}
                    <td className="py-4 px-6">
                      <div className="font-semibold text-blue-600">
                        ৳{item.myBidPrice}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                          item.status,
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* Result */}
                    <td className="py-4 px-6">
                      {item.isWinner ? (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="font-medium text-green-600">
                            You Won
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                          <span className="text-gray-500">
                            {item.status === "purchased" ? "Lost" : "Pending"}
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {bidHistory.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-4xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                No bidding history yet
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Start bidding on products to see your history here.
              </p>
            </div>
          )}
        </div>

        {/* Summary */}
        {bidHistory.length > 0 && (
          <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-medium text-gray-900 mb-4">Bidding Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Bid Amount</p>
                <p className="text-2xl font-bold text-gray-900">
                  ৳{bidHistory.reduce((sum, item) => sum + item.myBidPrice, 0)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Average Bid</p>
                <p className="text-2xl font-bold text-gray-900">
                  ৳
                  {(
                    bidHistory.reduce((sum, item) => sum + item.myBidPrice, 0) /
                    bidHistory.length
                  ).toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Success Rate</p>
                <p className="text-2xl font-bold text-green-600">
                  {bidHistory.length > 0
                    ? (
                        (bidHistory.filter((item) => item.isWinner).length /
                          bidHistory.length) *
                        100
                      ).toFixed(1)
                    : 0}
                  %
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
