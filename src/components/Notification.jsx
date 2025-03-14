import React, { useState, useEffect, useContext } from "react";
import {
    FiCreditCard,
    FiCheck,
    FiBell,
    FiAlertCircle,
    FiEye
} from "react-icons/fi";
import axiosInstance from "@/axiosConfig";
import { datimeToEnUS } from "@/utils";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/context/UserContext";
import confirmToast from "./ui/confirmToast";
import { toast } from "react-toastify";
import { FaRegCheckCircle } from "react-icons/fa";
import { NotificationContext } from "@/context/NotificationContext";


const Notifications = () => {
    const { info } = useContext(UserContext);
    const { notifications, fetchNotifications, setFilter, filter } = useContext(NotificationContext)
    // const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const sliceNotifications = notifications.slice(indexOfFirst, indexOfLast);

    const getNotificationIcon = (type) => {
        switch (type) {
            case "PAYMENT":
                return <FiCreditCard className="text-cyan-700" />;
            case "ERROR":
                return <FiAlertCircle className="text-cyan-700" />;
            default:
                return <FiBell className="text-cyan-700" />;
        }
    };

    const markAsRead = async (notificationId) => {
        try {
            const response = await axiosInstance.put(`/notifications/mark-as-read/${notificationId}`);
            if (response.status === 200) {
                fetchNotifications();
            }
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    };

    const markAllAsRead = async () => {
        try {
            const response = await axiosInstance.put(`/notifications/mark-all-as-read`);
            if (response.status === 200) {
                fetchNotifications();
                toast.success("Mark all notifications as read successfully!", {
                    autoClose: 1500,
                });

            }
        } catch (error) {
            console.error("Error marking all notifications as read:", error);
        }
    };

    useEffect(() => {
        fetchNotifications();
        setCurrentPage(1)
    }, [filter, info]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white p-6">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-cyan-900">Notifications</h1>
                        <p className="text-gray-600 mt-2">Stay updated with your recent activities</p>
                    </div>
                    <div className="flex gap-4">
                        {/* Filter Dropdown */}
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="px-4 py-2 rounded-lg border border-cyan-100 text-cyan-900 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-900"
                        >
                            <option value="all">All Notifications</option>
                            <option value="unread">Unread</option>
                            <option value="read">Read</option>
                        </select>

                        {/* Mark All as Read Button */}
                        <button
                            onClick={() => {
                                confirmToast("Are you sure you want to mark all notifications as read?", () => {
                                    markAllAsRead();
                                });
                            }}
                            className="px-4 py-2 rounded-lg border border-cyan-200 text-cyan-900 bg-white hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-900 flex items-center"
                        >
                            <FiCheck className="mr-2" />
                            Mark All as Read
                        </button>
                    </div>
                </div>

                {/* Notifications List */}
                <div className="space-y-4">
                    {notifications.length === 0 && (
                        <div className="text-center py-12">
                            <FiBell className="text-5xl text-cyan-900 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-cyan-900 mb-2">No Notifications</h3>
                            <p className="text-gray-600">You're all caught up! Check back later for updates.</p>
                            <button
                                onClick={() => navigate("/events")}
                                className="mt-6 px-6 py-3 bg-cyan-900 text-white rounded-lg hover:bg-cyan-800 transition-colors"
                            >
                                Explore Events
                            </button>
                        </div>
                    )}
                    {notifications.length !== 0 && <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-5 min-h-[75vh]">
                            {
                                sliceNotifications.map((notification) => (
                                    <div
                                        key={notification.notificationId}
                                        className={`
                                        grid grid-cols-12 items-center gap-4 p-5 rounded-lg text-xl hover:scale-105 transition-all duration-200 cursor-pointer
                                        ${!notification.read ? 'bg-white border border-cyan-800' : 'bg-gray-50 border border-cyan-100'}
                                    `}
                                    >
                                        {/* Icon */}
                                        <div className="col-span-1 flex justify-center text-2xl">
                                            {getNotificationIcon(notification.type)}
                                        </div>

                                        {/* Content */}
                                        <div className="col-span-7">
                                            <div className="flex gap-2 items-center">
                                                <h3 className="font-semibold text-cyan-900">{notification.title}</h3>
                                                {!notification.read && <FaRegCheckCircle className="text-base text-red-700" />}
                                            </div>
                                            <p className="text-gray-600 text-base">{notification.message}</p>
                                        </div>

                                        {/* Date */}
                                        <div className="col-span-2 text-sm text-gray-500">
                                            {datimeToEnUS(notification.createdAt)}
                                        </div>

                                        {/* Actions */}
                                        <div className="col-span-2 flex justify-end space-x-2">
                                            {!notification.read && (
                                                <button
                                                    onClick={() => markAsRead(notification.notificationId)}
                                                    className="text-cyan-700 hover:text-cyan-900 transition"
                                                    title="Mark as read"
                                                >
                                                    <FiCheck />
                                                </button>
                                            )}
                                            <button
                                                className="text-cyan-700 hover:text-cyan-900 transition"
                                                title="View Details"
                                                onClick={() => navigate(`/events/${notification.eventId}`)}
                                            >
                                                <FiEye />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="flex justify-center mt-4 space-x-2">
                            <button
                                className="px-4 py-2 bg-cyan-900 text-white rounded disabled:opacity-50"
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>

                            <span className="px-4 py-2">{currentPage}</span>

                            <button
                                className="px-4 py-2 bg-cyan-900 text-white rounded disabled:opacity-50"
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={indexOfLast >= notifications.length}
                            >
                                Next
                            </button>
                        </div>
                    </div>}

                </div>
            </div>
        </div>
    );
};

export default Notifications;