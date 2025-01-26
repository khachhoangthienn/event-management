import React, { useState } from "react";
import { FiHome, FiBook, FiBriefcase, FiUser } from "react-icons/fi";
import { Line, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const AttendeeHome = () => {
    const [activeMenu, setActiveMenu] = useState("skillTest");

    const mockUser = {
        name: "John Doe",
        photo: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
        role: "Student"
    };

    const performanceData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Your Score",
                data: [65, 75, 70, 80, 85, 90],
                borderColor: "#4F46E5",
                tension: 0.4
            },
            {
                label: "Average Score",
                data: [60, 65, 70, 75, 75, 80],
                borderColor: "#9333EA",
                tension: 0.4
            }
        ]
    };

    const subjectData = {
        labels: ["Math", "Physics", "Chemistry", "Biology", "English"],
        datasets: [
            {
                label: "Subject Performance",
                data: [85, 75, 90, 70, 95],
                backgroundColor: ["#4F46E5", "#9333EA", "#EC4899", "#F59E0B", "#10B981"]
            }
        ]
    };

    return (
        <div className="flex flex-row container justify-center mx-auto py-10 gap-4 rounded-2xl px-6 md:px-20 lg:px-32 relative">
            {/* Left Sidebar */}
            <div className="w-1/4 lg:w-64 bg-gray-50 rounded-lg shadow-md">
                <div className="p-4 space-y-2 w-full">
                    <button
                        onClick={() => setActiveMenu("dashboard")}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeMenu === "dashboard" ? "bg-indigo-50 text-cyan-900" : "hover:bg-gray-50"}`}
                    >
                        <FiHome className="text-xl" />
                        <span>Dashboard</span>
                    </button>
                    <button
                        onClick={() => setActiveMenu("skillTest")}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeMenu === "skillTest" ? "bg-indigo-50  text-cyan-900" : "hover:bg-gray-50"}`}
                    >
                        <FiBook className="text-xl" />
                        <span>Skill Test</span>
                    </button>
                    <button
                        onClick={() => setActiveMenu("internship")}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeMenu === "internship" ? "bg-indigo-50  text-cyan-900" : "hover:bg-gray-50"}`}
                    >
                        <FiBriefcase className="text-xl" />
                        <span>Internship</span>
                    </button>
                </div>
            </div>
            {/* main section */}
            <div class="flex flex-1 flex-col w-3/4 bg-white">
                {/* Middle Section */}
                <div className="flex flex-col">
                    <div className="bg-white rounded-xl border-2 shadow-md p-6 w-full">
                        <h2 className="text-2xl font-bold mb-6">Performance Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-indigo-50 p-4 rounded-lg">
                                <p className="text-indigo-600 font-medium">Overall Score</p>
                                <p className="text-3xl font-bold">85%</p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg">
                                <p className="text-purple-600 font-medium">Tests Completed</p>
                                <p className="text-3xl font-bold">12</p>
                            </div>
                            <div className="bg-pink-50 p-4 rounded-lg">
                                <p className="text-pink-600 font-medium">Average Time</p>
                                <p className="text-3xl font-bold">45m</p>
                            </div>
                        </div>
                        <div className="h-[300px]">
                            <Line data={performanceData} options={{ maintainAspectRatio: false }} />
                        </div>
                    </div>
                </div>
                {/* Right Section */}
                <div className="w-full lg:w-96 p-6">
                    <div className="bg-white rounded-xl shadow-md p-6 border-2">
                        <h2 className="text-2xl font-bold mb-6">Subject Analysis</h2>
                        <div className="h-[300px] mb-6">
                            <Bar data={subjectData} options={{ maintainAspectRatio: false }} />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Question Analysis</h3>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span>Correct Answers</span>
                                <span className="font-medium text-green-600">75%</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span>Incorrect Answers</span>
                                <span className="font-medium text-red-600">25%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
};

export default AttendeeHome;