import React, { useContext, useEffect, useState } from "react";
import { FiCalendar, FiUsers, FiDollarSign, FiTrendingUp, FiBarChart2, FiActivity } from "react-icons/fi";
import { UserContext } from "@/context/UserContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { MdWaterfallChart } from "react-icons/md";


import { FaChartLine } from "react-icons/fa6";

import axiosInstance from "@/axiosConfig";
import { MdStackedLineChart } from "react-icons/md";

const OrganizerDashboard = ({ setActiveMenu }) => {
    const { info } = useContext(UserContext);
    const [monthlyData, setMonthlyData] = useState(null)
    const [revenueData, setRevenueData] = useState(null)
    const [stats, setStats] = useState(null)
    const [growthRateData, setGrowthRateData] = useState(null)

    const stats_icons = [
        FiCalendar,
        FiUsers,
        FiDollarSign,
        FiTrendingUp
    ];


    const fetchStatsData = async () => {
        try {
            const response = await axiosInstance.get(`/stats/organizer/mine`);
            if (response.status === 200) {
                const { monthlyData, revenueData, stats } = response.data.result
                setMonthlyData(monthlyData)
                setRevenueData(revenueData)
                setStats(stats)

                const calculatedGrowthRate = revenueData.map((item, index, array) => {
                    if (index === 0) return { name: item.name, growthRate: 0 };

                    const prevRevenue = array[index - 1]?.revenue ?? 0;
                    const growthRate = prevRevenue !== 0
                        ? ((item.revenue - prevRevenue) / prevRevenue) * 100
                        : 0;
                    return {
                        name: item.name,
                        growthRate: parseFloat(growthRate.toFixed(2))
                    };
                });
                setGrowthRateData(calculatedGrowthRate);


            }
        } catch (error) {
            console.log("this is error code: " + (error.response?.data?.code || "Unknown"));
            if (error.response) {
                const { code } = error.response.data;
                if (code === 404) {
                    console.error("No data found.");
                } else if (code === 401) {
                    console.error("Unauthorized request.");
                }
            } else {
                console.error("Error:", error.message);
            }
        }
    };

    useEffect(() => {
        fetchStatsData()
    }, [])

    if (!monthlyData || !revenueData || !stats || !growthRateData) return

    const formattedRevenueData = revenueData.map(item => ({
        ...item,
        revenue: item.revenue / 1000,
    }));

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
                            <button onClick={() => {
                                setActiveMenu("eventManagement");
                                scroll(0, 0)
                            }}
                                className="bg-white text-cyan-900 px-6 py-3 rounded-xl font-semibold hover:bg-cyan-50 transition-colors shadow-lg">
                                Create New Event
                            </button>
                            <button
                                onClick={() => document.getElementById("statistic")?.scrollIntoView({ behavior: "smooth" })}
                                className="bg-cyan-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-cyan-600 transition-colors shadow-lg"
                            >
                                View Analytics
                            </button>

                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div id="statistic" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-md border border-cyan-100">
                        <div className="flex items-center justify-between mb-2">
                            {React.createElement(stats_icons[index], { className: "text-2xl text-cyan-900" })}
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
                <div className="bg-white p-4 rounded-2xl shadow-md border border-cyan-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-cyan-900">Revenue Trend</h2>
                        <FiActivity className="text-cyan-900 text-xl" />
                    </div>
                    <div className="h-64"> {/* Tăng chiều cao */}
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={formattedRevenueData}>
                                <XAxis dataKey="name" tickMargin={10} angle={-45} textAnchor="end" fontSize={12} />
                                <YAxis tickFormatter={(value) => `${value}K`} tickMargin={10} allowDecimals={false} fontSize={12} />
                                <Tooltip formatter={(value) => `${value}K VND`} />
                                <Line type="monotone" dataKey="revenue" stroke="#164e63" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Grow chart */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-cyan-100">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-cyan-900">Growth Rate</h2>
                    <MdWaterfallChart className="text-cyan-900 text-xl" />
                </div>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={growthRateData}>
                            <XAxis
                                dataKey="name"
                            />
                            <YAxis domain={['auto', 'auto']} tickFormatter={(tick) => `${tick}%`} />
                            <Tooltip formatter={(value) => `${value}%`} labelFormatter={(label) => new Date(label).toLocaleDateString("en-GB")} />
                            <Line type="linear" dataKey="growthRate" stroke="black" strokeWidth={2} dot={{ r: 5 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
};

export default OrganizerDashboard;