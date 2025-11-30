"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

interface DashboardStats {
  totalProducts: number;
  completedOrders: number;
  totalBids: number;
  winningBids: number;
}

const demoStats: DashboardStats = {
  totalProducts: 24,
  completedOrders: 15,
  totalBids: 50,
  winningBids: 12,
};

const chartData = [
  { name: "Products", value: demoStats.totalProducts },
  { name: "Completed Orders", value: demoStats.completedOrders },
  { name: "Total Bids", value: demoStats.totalBids },
  { name: "Winning Bids", value: demoStats.winningBids },
];

const Dashboard: React.FC = () => {
  return (
    <div className=" min-h-screen text-black!">
      

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow-md rounded-lg p-5 flex flex-col items-center">
          <p className="text-gray-500">Total Products</p>
          <p className="text-2xl font-bold">{demoStats.totalProducts}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-5 flex flex-col items-center">
          <p className="text-gray-500">Completed Orders</p>
          <p className="text-2xl font-bold">{demoStats.completedOrders}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-5 flex flex-col items-center">
          <p className="text-gray-500">Total Bids</p>
          <p className="text-2xl font-bold">{demoStats.totalBids}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-5 flex flex-col items-center">
          <p className="text-gray-500">Winning Bids</p>
          <p className="text-2xl font-bold">{demoStats.winningBids}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Activity Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#16A34A" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
