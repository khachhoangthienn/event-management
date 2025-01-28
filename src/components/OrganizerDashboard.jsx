import React, { useContext } from "react";
import { FiCalendar, FiUsers, FiDollarSign, FiTrendingUp, FiClock, FiSettings } from "react-icons/fi";
import { UserContext } from "@/context/UserContext";
import { AppContext } from "@/context/AppContext";

const OrganizerDashboard = () => {
    const { events, categories } = useContext(AppContext);
    const { info } = useContext(UserContext);

    const stats = [
        { label: "Total Events", value: "15", icon: FiCalendar },
        { label: "Total Attendees", value: "342", icon: FiUsers },
        { label: "Revenue", value: "$5.2K", icon: FiDollarSign },
        { label: "Event Growth", value: "+12%", icon: FiTrendingUp }
    ];

    return (
        <div className="flex-1 max-w-5xl space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-cyan-900 to-cyan-800 rounded-3xl overflow-hidden">
                <div className="relative p-8 md:p-12">
                    <div className="absolute inset-0 bg-pattern opacity-10"></div>
                    <div className="relative z-10 max-w-2xl">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Welcome, {info.firstName} {info.lastName}
                        </h1>
                        <p className="text-purple-100 text-lg mb-6">
                            Manage your events and track your performance all in one place.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="bg-white text-cyan-900 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors shadow-lg">
                                Create New Event
                            </button>
                            <button className="bg-cyan-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-cyan-600 transition-colors shadow-lg">
                                View Analytics
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-md border border-purple-100">
                        <div className="flex items-center justify-between mb-2">
                            <stat.icon className="text-2xl text-cyan-900" />
                            <span className="text-3xl font-bold text-cyan-900">{stat.value}</span>
                        </div>
                        <p className="text-gray-600">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Active Events */}
            <div className="bg-white rounded-2xl shadow-md border border-purple-100 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-cyan-900">Active Events</h2>
                    <button className="text-cyan-900 hover:text-cyan-700 font-medium">
                        View All Events
                    </button>
                </div>
                <div className="space-y-4">
                    {[1, 2, 3].map((_, index) => (
                        <div key={index} className="flex items-center p-4 bg-purple-50 rounded-xl">
                            <div className="flex-shrink-0 w-16 h-16 bg-cyan-900 rounded-lg flex items-center justify-center text-white">
                                <FiCalendar className="text-2xl" />
                            </div>
                            <div className="ml-4 flex-grow">
                                <h3 className="font-semibold text-cyan-900">Event Title {index + 1}</h3>
                                <div className="flex items-center text-gray-600 space-x-4">
                                    <span>Date • Time</span>
                                    <span>{50 + index} Attendees</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <button className="text-cyan-900 hover:text-cyan-700 p-2">
                                    <FiSettings className="text-xl" />
                                </button>
                                <button className="bg-cyan-900 text-white px-4 py-2 rounded-lg hover:bg-cyan-800">
                                    Manage
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-md border border-purple-100 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-cyan-900">Recent Activity</h2>
                    <FiClock className="text-cyan-900 text-2xl" />
                </div>
                <div className="space-y-4">
                    {[1, 2, 3].map((_, index) => (
                        <div key={index} className="flex items-center border-b border-purple-100 last:border-0 pb-4 last:pb-0">
                            <div className="w-2 h-2 bg-cyan-900 rounded-full"></div>
                            <p className="ml-4 text-gray-600">New registration for Event {index + 1}</p>
                            <span className="ml-auto text-sm text-gray-500">2h ago</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrganizerDashboard;