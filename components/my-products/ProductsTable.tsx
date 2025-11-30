import React from 'react';
import { Eye } from 'lucide-react';
import { Bid, Product } from "@/types/myProducts"
import { ProductImage } from './ProductImage';
import { StatusBadge } from './StatusBadge';

interface ProductsTableProps {
  products: Product[];
  onViewBids: (product: Product) => void;
}

export const ProductsTable: React.FC<ProductsTableProps> = ({ products, onViewBids }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">Product</th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">Weight</th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-4 py-4 text-sm text-center font-semibold text-gray-700">Bids</th>
              {/* <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">Revenue</th> */}
              <th className="px-4 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {products.map((product) => (
              <TableRow 
                key={product._id} 
                product={product} 
                onViewBids={onViewBids} 
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TableRow: React.FC<{ product: Product; onViewBids: (product: Product) => void }> = ({ 
  product, 
  onViewBids 
}) => (
  <tr className="hover:bg-gray-50 transition-colors group">
    <ProductCell product={product} />
    <CategoryCell category={product.category} />
    <PriceCell price={product.pricePerKg} />
    <WeightCell weight={product.totalWeight} />
    <StatusCell status={product.status} />
    <BidsCell bidCount={product.bids.length} />
    {/* <RevenueCell revenue={product.companyRevenue} /> */}
    <ActionCell 
      hasBids={product.bids.length > 0} 
      onViewBids={() => onViewBids(product)} 
    />
  </tr>
);

const ProductCell: React.FC<{ product: Product }> = ({ product }) => (
  <td className="px-4 py-4">
    <div className="flex items-center space-x-3">
      <ProductImage images={product.images} title={product.title} />
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{product.title}</p>
        <p className="text-xs text-gray-500 truncate">{product.description}</p>
      </div>
    </div>
  </td>
);

const CategoryCell: React.FC<{ category: string }> = ({ category }) => (
  <td className="px-4 py-4">
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
      {category}
    </span>
  </td>
);

const PriceCell: React.FC<{ price: number }> = ({ price }) => (
  <td className="px-4 py-4">
    <div className="text-sm font-semibold text-gray-900">₹{price}</div>
    <div className="text-xs text-gray-500">per kg</div>
  </td>
);

const WeightCell: React.FC<{ weight: number }> = ({ weight }) => (
  <td className="px-4 py-4 text-sm text-gray-900">{weight} kg</td>
);

const StatusCell: React.FC<{ status: string }> = ({ status }) => (
  <td className="px-4 py-4">
    <StatusBadge status={status} />
  </td>
);

const BidsCell: React.FC<{ bidCount: number }> = ({ bidCount }) => (
  <td className="px-4 py-4">
    <div className="text-center">
      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
        bidCount > 0 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-500'
      }`}>
        {bidCount}
      </span>
    </div>
  </td>
);

// const RevenueCell: React.FC<{ revenue: number }> = ({ revenue }) => (
//   <td className="px-4 py-4">
//     <div className="text-sm font-semibold text-green-600">₹{revenue}</div>
//   </td>
// );

const ActionCell: React.FC<{ hasBids: boolean; onViewBids: () => void }> = ({ 
  hasBids, 
  onViewBids 
}) => (
  <td className="px-4 py-4 text-center">
    {hasBids ? (
      <button
        onClick={onViewBids}
        className="inline-flex items-center justify-center p-2 text-primaryColor hover:bg-blue-50 rounded-lg transition-all duration-200 transform hover:scale-105"
        title="View all bids"
      >
        <Eye size={18} />
        <span className="ml-1 text-sm font-medium">View Bids</span>
      </button>
    ) : (
      <span className="text-gray-400 text-sm">No bids</span>
    )}
  </td>
);