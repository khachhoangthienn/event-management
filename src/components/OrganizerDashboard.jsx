import React, { useContext } from "react";
import { FiCalendar, FiUsers, FiDollarSign, FiTrendingUp, FiClock, FiSettings, FiBarChart2, FiActivity } from "react-icons/fi";
import { UserContext } from "@/context/UserContext";
import { AppContext } from "@/context/AppContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const OrganizerDashboard = () => {
    const { events, categories } = useContext(AppContext);
    const { info } = useContext(UserContext);

    // Mock data for charts
    const monthlyData = [
        { name: 'Jan', events: 4, attendees: 120 },
        { name: 'Feb', events: 6, attendees: 180 },
        { name: 'Mar', events: 8, attendees: 250 },
        { name: 'Apr', events: 5, attendees: 160 },
        { name: 'May', events: 7, attendees: 220 },
    ];

    const revenueData = [
        { name: 'Jan', revenue: 2400 },
        { name: 'Feb', revenue: 3600 },
        { name: 'Mar', revenue: 4800 },
        { name: 'Apr', revenue: 3200 },
        { name: 'May', revenue: 4100 },
    ];

    const stats = [
        { label: "Total Events", value: "15", icon: FiCalendar },
        { label: "Total Attendees", value: "342", icon: FiUsers },
        { label: "Monthly Revenue", value: "$5.2K", icon: FiDollarSign },
        { label: "Growth Rate", value: "+12%", icon: FiTrendingUp }
    ];

    return (
        <div className="flex-1 max-w-6xl space-y-6 p-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-cyan-900 to-cyan-800 rounded-3xl overflow-hidden">
                <div className="relative p-8 md:p-12">
                    <div className="absolute inset-0 bg-pattern opacity-10"></div>
                    <div className="relative z-10 max-w-2xl">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Welcome, {info.firstName} {info.lastName}
                        </h1>
                        <p className="text-cyan-100 text-lg mb-6">
                            Manage your events and track your performance all in one place.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="bg-white text-cyan-900 px-6 py-3 rounded-xl font-semibold hover:bg-cyan-50 transition-colors shadow-lg">
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
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-md border border-cyan-100">
                        <div className="flex items-center justify-between mb-2">
                            <stat.icon className="text-2xl text-cyan-900" />
                            <span className="text-3xl font-bold text-cyan-900">{stat.value}</span>
                        </div>
                        <p className="text-gray-600">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Events & Attendees Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-md border border-cyan-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-cyan-900">Events & Attendees</h2>
                        <FiBarChart2 className="text-cyan-900 text-xl" />
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="events" fill="#164e63" />
                                <Bar dataKey="attendees" fill="#22d3ee" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Revenue Trend */}
                <div className="bg-white p-6 rounded-2xl shadow-md border border-cyan-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-cyan-900">Revenue Trend</h2>
                        <FiActivity className="text-cyan-900 text-xl" />
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={revenueData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="revenue" stroke="#164e63" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Active Events */}
            <div className="bg-white rounded-2xl shadow-md border border-cyan-100 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-cyan-900">Active Events</h2>
                    <button className="text-cyan-900 hover:text-cyan-700 font-medium">
                        View All Events
                    </button>
                </div>
                <div className="space-y-4">
                    {[1, 2, 3].map((_, index) => (
                        <div key={index} className="flex items-center p-4 bg-cyan-50 rounded-xl">
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

        </div>
    );
};

export default OrganizerDashboard;