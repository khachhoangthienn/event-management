import React, { useContext, useEffect, useState } from "react";
import { FiHome, FiHeart, FiCreditCard, FiBell, FiCalendar, FiClock, FiTrendingUp } from "react-icons/fi";
import AttendeeDashboard from "./AttendeeDashboard";
import FavoriteEvents from "./FavoriteEvents";
import AdminEventApproval from "./EventApproval";

const AdminHome = () => {
    const [activeMenu, setActiveMenu] = useState("dashboard");

    return (
        <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
            <div className="flex flex-row justify-center mx-auto py-6 gap-6 px-4 md:px-8 lg:px-12">
                {/* Left Sidebar */}
                <div className="hidden md:block w-64 bg-white rounded-2xl shadow-lg border border-cyan-100">
                    <div className="p-6 space-y-3">
                        <h3 className="text-lg font-semibold text-cyan-900 mb-4">Navigation</h3>
                        {[
                            { id: "dashboard", icon: FiHome, label: "Dashboard" },
                            { id: "favorites", icon: FiHeart, label: "Favorite Events" },
                            { id: "tickets", icon: FiCreditCard, label: "My Tickets" },
                            { id: "notifications", icon: FiBell, label: "Notifications" },
                        ].map(({ id, icon: Icon, label }) => (
                            <button
                                key={id}
                                onClick={() => setActiveMenu(id)}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeMenu === id
                                    ? "bg-cyan-900 text-white shadow-md"
                                    : "hover:bg-cyan-50 text-gray-600 hover:text-cyan-900"
                                    }`}
                            >
                                <Icon className={`text-xl ${activeMenu === id ? "text-white" : "text-cyan-900"}`} />
                                <span className="font-medium">{label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 max-w-5xl space-y-6">
                    {activeMenu === "dashboard" && <AdminEventApproval />}
                    {/* {activeMenu === "favorites" && <FavoriteEvents />} */}
                </div>
            </div>
        </div>
    );
};

export default AdminHome;