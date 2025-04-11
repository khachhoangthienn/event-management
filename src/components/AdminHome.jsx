import React, { useEffect, useState } from "react";
import { FiHome } from "react-icons/fi";
import AdminEventApproval from "./EventApproval";
import { CiAlignLeft } from "react-icons/ci";
import AdminDashboard from "./AdminDashboard";
import AdminUserManagement from "./UserManagement";
import { LuUserCog } from "react-icons/lu";
import { MdOutlineEventAvailable } from "react-icons/md";




const AdminHome = () => {
    const [activeMenu, setActiveMenu] = useState("dashboard");

    useEffect(() => {
        scroll(0, 0)
    }, [activeMenu])

    return (
        <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
            <div className="flex flex-row justify-center mx-auto py-6 gap-6 px-4 md:px-8 lg:px-12">
                {/* Left Sidebar */}
                <div className="hidden xl:block w-64 bg-white rounded-2xl shadow-lg border border-cyan-100 relative">
                    <div className="p-6 space-y-3 sticky top-4">
                        <h3 className="text-lg font-semibold text-cyan-900 mb-4">Navigation</h3>
                        {[
                            { id: "dashboard", icon: FiHome, label: "Dashboard" },
                            { id: "events", icon: MdOutlineEventAvailable, label: "Events Approval" },
                            { id: "users", icon: LuUserCog, label: "Users Management" },
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
                    {activeMenu === "dashboard" && <AdminDashboard setActiveMenu={setActiveMenu} />}
                    {activeMenu === "events" && <AdminEventApproval />}
                    {activeMenu === "users" && <AdminUserManagement />}
                </div>
            </div>
        </div>
    );
};

export default AdminHome;