import React, { useEffect, useState } from "react";
import {
    FiUsers,
    FiDollarSign,
    FiCalendar,
    FiStar,
    FiBarChart2,
    FiActivity,
    FiPieChart,
    FiTrendingUp
} from "react-icons/fi";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdEventNote, MdPayment, MdNotifications } from "react-icons/md";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';
import axiosInstance, { axiosPublic } from "@/axiosConfig";

const AdminDashboard = ({ setActiveMenu }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Overall system stats
    const [systemStats, setSystemStats] = useState(null);

    // Time-based data
    const [monthlyEventsData, setMonthlyEventsData] = useState(null);
    const [revenueData, setRevenueData] = useState(null);
    const [userRegistrationData, setUserRegistrationData] = useState(null);

    // Distribution data
    const [eventTypeDistribution, setEventTypeDistribution] = useState(null);
    const [paymentMethodDistribution, setPaymentMethodDistribution] = useState(null);
    const [topOrganizers, setTopOrganizers] = useState(null);
    const [topEvents, setTopEvents] = useState(null);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

    const stats_icons = [
        FiUsers,
        FiCalendar,
        FaRegMoneyBillAlt,
        FiStar,
        MdEventNote,
        MdPayment,
        MdNotifications
    ];

    const fetchAdminData = async () => {
        setLoading(true);
        try {
            const response = await axiosPublic.get('/stats/admin');
            if (response.status === 200) {
                const data = response.data.result;

                setSystemStats(data.systemStats);
                setMonthlyEventsData(data.monthlyEventsData);
                setRevenueData(data.revenueData);
                setUserRegistrationData(data.userRegistrationData);
                setEventTypeDistribution(data.eventTypeDistribution);
                setPaymentMethodDistribution(data.paymentMethodDistribution);
                setTopOrganizers(data.topOrganizers);
                setTopEvents(data.topEvents);

                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching admin dashboard data:", error);
            setError("Failed to load dashboard data. Please try again later.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdminData();
    }, []);

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-cyan-700">Loading dashboard data...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    // Format revenue data to display in K
    const formattedRevenueData = revenueData.map(item => ({
        ...item,
        revenue: item.revenue / 1000,
    }));

    return (
        <div className="flex-1 max-w-7xl space-y-6 p-6">
            {/* Welcome Section */}
            <div className="bg-cyan-900 rounded-3xl overflow-hidden">
                <div className="relative p-8 md:p-12">
                    <div className="absolute inset-0 bg-pattern opacity-10"></div>
                    <div className="relative z-10 max-w-3xl">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Admin Dashboard
                        </h1>
                        <p className="text-indigo-100 text-lg mb-6">
                            Monitor system performance, user activities, and revenue across the entire platform.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => document.getElementById("system-stats")?.scrollIntoView({ behavior: "smooth" })}
                                className="bg-white text-cyan-900 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-colors shadow-lg"
                            >
                                System Statistics
                            </button>
                            <button
                                onClick={() => setActiveMenu("userManagement")}
                                className="bg-cyan-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-600 transition-colors shadow-lg"
                            >
                                User Management
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* System Stats Grid */}
            <div id="system-stats" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {systemStats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-md border border-indigo-100">
                        <div className="flex items-center justify-between mb-2">
                            {React.createElement(stats_icons[index], { className: "text-2xl text-indigo-900" })}
                            <span className="text-3xl font-bold text-cyan-900">{stat.value}</span>
                        </div>
                        <p className="text-gray-600">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Charts Section - Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Monthly Events & User Activity Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-md border border-indigo-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-cyan-900">Monthly Activity</h2>
                        <FiBarChart2 className="text-cyan-900 text-xl" />
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyEventsData}>
                                <XAxis dataKey="name" />
                                <YAxis yAxisId="left" orientation="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip />
                                <Legend />
                                <Bar yAxisId="left" dataKey="events" name="Events" fill="#4f46e5" />
                                <Bar yAxisId="left" dataKey="attendees" name="Attendees" fill="#818cf8" />
                                <Bar yAxisId="right" dataKey="newUsers" name="New Users" fill="#c4b5fd" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Revenue Trend */}
                <div className="bg-white p-6 rounded-2xl shadow-md border border-indigo-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-cyan-900">Revenue Trend</h2>
                        <FiActivity className="text-cyan-900 text-xl" />
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={formattedRevenueData}>
                                <XAxis dataKey="name" />
                                <YAxis tickFormatter={(value) => `${value}K`} />
                                <Tooltip formatter={(value) => `${value}K VND`} />
                                <Legend />
                                <Line type="monotone" dataKey="revenue" name="Total Revenue" stroke="#4f46e5" strokeWidth={2} />
                                <Line type="monotone" dataKey="ticketRevenue" name="Ticket Revenue" stroke="#818cf8" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Charts Section - Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* User Registration Trend */}
                <div className="bg-white p-6 rounded-2xl shadow-md border border-cyan-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-cyan-900">User Registration</h2>
                        <FiTrendingUp className="text-cyan-900 text-xl" />
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={userRegistrationData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="organizers" name="Organizers" stroke="#4f46e5" strokeWidth={2} />
                                <Line type="monotone" dataKey="attendees" name="Attendees" stroke="#818cf8" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Event Type Distribution */}
                <div className="bg-white p-6 rounded-2xl shadow-md border border-indigo-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-cyan-900">Event Type Distribution</h2>
                        <FiPieChart className="text-indigo-900 text-xl" />
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={eventTypeDistribution}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                    {eventTypeDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value, name) => [`${value} events`, name]} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Charts Section - Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Payment Method Distribution */}
                <div className="bg-white p-6 rounded-2xl shadow-md border border-indigo-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-cyan-900">Payment Methods</h2>
                        <MdPayment className="text-indigo-900 text-xl" />
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={paymentMethodDistribution}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                    {paymentMethodDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value, name) => [`${value} transactions`, name]} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Organizers */}
                <div className="bg-white p-6 rounded-2xl shadow-md border border-indigo-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-cyan-900">Top Organizers</h2>
                        <FiUsers className="text-indigo-900 text-xl" />
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                layout="vertical"
                                data={topOrganizers}
                                margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                            >
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="events" name="Events Created" fill="#4f46e5" />
                                <Bar dataKey="revenue" name="Revenue (K)" fill="#818cf8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Top Events Section */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-indigo-100">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-cyan-900">Top Performing Events</h2>
                    <MdEventNote className="text-indigo-900 text-xl" />
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organizer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendees</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {topEvents.map((event, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.eventName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.organizer}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.attendees}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.revenue.toLocaleString()} VND</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <span className="mr-2">{event.rating.toFixed(1)}</span>
                                            <FiStar className={`${event.rating >= 4.5 ? 'text-yellow-400' : 'text-gray-400'}`} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;