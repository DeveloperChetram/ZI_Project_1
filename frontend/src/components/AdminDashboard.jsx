import React, { useState } from "react";
import { FiMenu, FiUsers, FiUpload, FiBarChart2, FiSettings, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const sidebarItems = [
    { label: "Users", icon: <FiUsers />, path: "/admin/users" },
    { label: "Upload Excel", icon: <FiUpload />, path: "/admin/upload" },
    { label: "Reports", icon: <FiBarChart2 />, path: "/admin/reports" },
    { label: "Settings", icon: <FiSettings />, path: "/admin/settings" },
    { label: "Logout", icon: <FiLogOut />, action: handleLogout },
  ];

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <div className={`bg-green-800 p-4 ${isSidebarOpen ? "w-64" : "w-16"} duration-300`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-xl font-bold ${!isSidebarOpen && "hidden"}`}>Admin Panel</h1>
          <FiMenu className="cursor-pointer" onClick={() => setSidebarOpen(!isSidebarOpen)} />
        </div>
        <ul className="space-y-4">
          {sidebarItems.map((item, index) => (
            <li
              key={index}
              onClick={() => item.path ? navigate(item.path) : item.action?.()}
              className="flex items-center space-x-3 cursor-pointer hover:bg-green-700 p-2 rounded"
            >
              <span className="text-xl">{item.icon}</span>
              {isSidebarOpen && <span>{item.label}</span>}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Welcome, Admin!</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Placeholder Cards */}
          <div className="bg-green-900 p-4 rounded shadow">Total Users: 120</div>
          <div className="bg-green-900 p-4 rounded shadow">Reports Uploaded: 45</div>
          <div className="bg-green-900 p-4 rounded shadow">Pending Approvals: 5</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
