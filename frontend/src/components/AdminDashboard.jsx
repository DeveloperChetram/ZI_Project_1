import React, { useState, useEffect } from "react";
import { FiMenu, FiUsers, FiUpload, FiBarChart2, FiSettings, FiLogOut, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getAdminStats, getAllUsers, deleteUserById } from "../api/api";

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState({ totalUsers: 0, totalUploads: 0 });
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await getAdminStats();
        setStats(statsRes.data);
        const usersRes = await getAllUsers();
        setUsers(usersRes.data);
      } catch (error) {
        console.error("Failed to fetch admin data", error);
        // If unauthorized, redirect to login
        if (error.response && error.response.status === 401) {
            navigate('/login');
        }
      }
    };
    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  
  const handleDeleteUser = async (userId) => {
      if (window.confirm("Are you sure you want to delete this user and all their data?")) {
          try {
              await deleteUserById(userId);
              setUsers(users.filter(user => user._id !== userId));
              // You might want to refresh stats as well
          } catch (error) {
              console.error("Failed to delete user", error);
          }
      }
  };

  const sidebarItems = [
    { label: "Dashboard", icon: <FiBarChart2 />, action: () => setActiveTab('dashboard') },
    { label: "Users", icon: <FiUsers />, action: () => setActiveTab('users') },
    { label: "Settings", icon: <FiSettings />, action: () => setActiveTab('settings') },
    { label: "Logout", icon: <FiLogOut />, action: handleLogout },
  ];

  const renderContent = () => {
      switch(activeTab) {
          case 'users':
              return (
                  <div>
                      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
                      <div className="bg-green-900 p-4 rounded shadow">
                          <ul className="space-y-2">
                              {users.map(user => (
                                  <li key={user._id} className="flex justify-between items-center p-2 bg-black rounded">
                                      <div>
                                          <p className="font-bold">{user.username} ({user.role})</p>
                                          <p className="text-sm text-gray-400">{user.email}</p>
                                      </div>
                                      <button onClick={() => handleDeleteUser(user._id)} className="text-red-500 hover:text-red-400">
                                          <FiTrash2 size={20} />
                                      </button>
                                  </li>
                              ))}
                          </ul>
                      </div>
                  </div>
              );
          case 'settings':
            return <div><h2 className="text-2xl font-semibold mb-4">Settings</h2><p>Settings page placeholder.</p></div>;
          case 'dashboard':
          default:
              return (
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Welcome, Admin!</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      <div className="bg-green-900 p-4 rounded shadow">Total Users: {stats.totalUsers}</div>
                      <div className="bg-green-900 p-4 rounded shadow">Reports Uploaded: {stats.totalUploads}</div>
                      <div className="bg-green-900 p-4 rounded shadow">Pending Approvals: 5</div>
                    </div>
                  </div>
              );
      }
  }

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
              onClick={item.action}
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
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;