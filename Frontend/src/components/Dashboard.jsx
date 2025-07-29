import React from "react";
import { FaUsers, FaStore, FaChartLine, FaUserShield } from "react-icons/fa";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Visitors",
      value: "12,345",
      icon: <FaUsers className="text-blue-500 text-3xl" />,
    },
    {
      title: "Active Stores",
      value: "89",
      icon: <FaStore className="text-green-500 text-3xl" />,
    },
    {
      title: "Live Footfall",
      value: "473",
      icon: <FaChartLine className="text-purple-500 text-3xl" />,
    },
    {
      title: "Admins & Managers",
      value: "16",
      icon: <FaUserShield className="text-red-500 text-3xl" />,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white border-l-4 border-[#981e32] shadow-md p-5 rounded-md flex items-center space-x-4"
          >
            <div>{stat.icon}</div>
            <div>
              <p className="text-gray-600">{stat.title}</p>
              <h3 className="text-xl font-bold text-gray-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Add charts, tables, or recent activity sections below as needed */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4 text-gray-700">
          Recent Walk-in Analytics
        </h3>
        <div className="bg-white p-4 shadow-md rounded-md">
          <p className="text-gray-500">Coming soon: integrate chart or logs here</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
