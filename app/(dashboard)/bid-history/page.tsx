import { BiddingHistoryItem } from "@/types/BidHistory";

const Page = () => {
  const bidHistory: BiddingHistoryItem[] = [
    {
      product: {
        _id: "692d2533dc825e98c43e04a4",
        title: "Fresh Korola",
        slug: "fresh-korola-igxwy",
        images: [
          {
            public_id: "annanewa/profiles/sy7ionaq7bdaevhbrzwp",
            url: "https://res.cloudinary.com/ddged1k3w/image/upload/v1764566335/annanewa/profiles/sy7ionaq7bdaevhbrzwp.jpg",
            _id: "692d2533dc825e98c43e04a5",
          },
        ],
        pricePerKg: 90,
        totalWeight: 120,
        status: "active",
        user: {
          address: {
            street: "123 Farm Road",
            city: "Dhaka",
            state: "Dhaka Division",
            zipCode: "1200",
            country: "Bangladesh",
          },
          _id: "6904932a77aba4f1527e4ab4",
          name: "John Farmer",
          email: "tesof25496@haotuwu.com",
          phone: "1234567890",
        },
      },
      myBid: {
        deliveryAddress: {
          address: "123 Farm Road",
          city: "Dhaka",
          state: "Dhaka Division",
          zipCode: "1200",
          country: "Bangladesh",
        },
        user: {
          _id: "69033ff00bee9542a9b14cce",
          name: "Setulal Chowhan",
          email: "rekerad624@haotuwu.com",
        },
        bidAmount: 48,
        bidAt: "2025-12-01T05:25:20.443Z",
        status: "pending",
        paymentMethod: "Cash on Delivery",
        _id: "692d26c03fee3e3280ceb06c",
      },
      bidWinner: {},
      totalBidsOnProduct: 1,
    },
    {
      product: {
        _id: "690592d64fb52136ae1508c8",
        title: "Organic Tomato",
        slug: "organic-tomato-9j3t1",
        images: [],
        pricePerKg: 50,
        totalWeight: 50,
        status: "purchased",
        user: {
          address: {
            street: "123 Farm Road",
            city: "Dhaka",
            state: "Dhaka Division",
            zipCode: "1200",
            country: "Bangladesh",
          },
          _id: "6904932a77aba4f1527e4ab4",
          name: "John Farmer",
          email: "tesof25496@haotuwu.com",
          phone: "1234567890",
        },
      },
      myBid: {
        deliveryAddress: {
          address: "123 Farm Road",
          city: "Dhaka",
          state: "Dhaka Division",
          zipCode: "1200",
          country: "Bangladesh",
        },
        user: {
          _id: "69033ff00bee9542a9b14cce",
          name: "Setulal Chowhan",
          email: "rekerad624@haotuwu.com",
        },
        bidAmount: 48,
        bidAt: "2025-11-01T04:58:30.353Z",
        status: "accepted",
        paymentMethod: "Cash on Delivery",
        _id: "690593764fb52136ae1508f3",
      },
      isWinner: true,
      bidWinner: {
        user: {
          _id: "69033ff00bee9542a9b14cce",
          name: "Setulal Chowhan",
          email: "rekerad624@haotuwu.com",
        },
        bidAmount: 48,
        acceptedAt: "2025-11-01T05:21:44.049Z",
      },
      totalBidsOnProduct: 1,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

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
            <p className="text-2xl font-bold text-gray-900">{bidHistory.length}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-500">Bids Won</p>
            <p className="text-2xl font-bold text-green-600">
              {bidHistory.filter((item) => item.isWinner).length}
            </p>
          </div>
          {/* <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {bidHistory.filter((item) => item.myBid.status === "pending").length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-500">Active</p>
            <p className="text-2xl font-bold text-blue-600">
              {bidHistory.filter((item) => item.product.status === "active").length}
            </p>
          </div> */}
        </div>

        {/* Minimal Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">
                    Product
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">
                    Listed Price
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">
                    My Bid
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">
                    Bid Date
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
                        {item.product.images?.[0]?.url ? (
                          <img
                            src={item.product.images[0].url}
                            alt={item.product.title}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400 text-xs">No image</span>
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">
                            {item.product.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.product.totalWeight} kg
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Listed Price */}
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-900">
                        ৳{item.product.pricePerKg}
                        <span className="text-gray-500 text-sm">/kg</span>
                      </div>
                    </td>

                    {/* My Bid */}
                    <td className="py-4 px-6">
                      <div className="font-semibold text-blue-600">
                        ৳{item.myBid.bidAmount}
                        <span className="text-gray-500 text-sm">/kg</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          item.myBid.status
                        )}`}
                      >
                        {item.myBid.status}
                      </span>
                    </td>

                    {/* Bid Date */}
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-900">
                        {formatDate(item.myBid.bidAt)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(item.myBid.bidAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>

                    {/* Result */}
                    <td className="py-4 px-6">
                      {item.isWinner ? (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="font-medium text-green-600">You Won</span>
                        </div>
                      ) : item.bidWinner?.user ? (
                        <div className="text-sm text-gray-900">
                          {item.bidWinner.user.name}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                          <span className="text-gray-600">Pending</span>
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
                  ৳{bidHistory.reduce((sum, item) => sum + item.myBid.bidAmount, 0)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Average Bid</p>
                <p className="text-2xl font-bold text-gray-900">
                  ৳{(
                    bidHistory.reduce((sum, item) => sum + item.myBid.bidAmount, 0) /
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