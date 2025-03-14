import React, { useContext, useEffect, useState } from "react";
import { FiHeart, FiCreditCard, FiBell, FiCalendar, FiClock } from "react-icons/fi";
import { UserContext } from "@/context/UserContext";
import axiosInstance from "@/axiosConfig";
import { datimeToEnUS } from '@/utils';
import { MdEventNote } from "react-icons/md";
import { MdOutlineShareLocation } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { FiInbox } from "react-icons/fi";

import moment from "moment";
import { NotificationContext } from "@/context/NotificationContext";



const AttendeeDashboard = ({ setActiveMenu }) => {
    const { info } = useContext(UserContext);
    const [stats, setStats] = useState(null)
    const [upcomingEvents, setUpcomingEvents] = useState([])
    const navigate = useNavigate()
    const { newestNotifications } = useContext(NotificationContext)


    const stats_icons = [
        FiCalendar,
        FiHeart,
        FiCreditCard,
        FiBell
    ];

    const fetchStatsData = async () => {
        try {
            const response = await axiosInstance.get(`/stats/attendee/mine`);
            if (response.status === 200) {
                const stats = response.data.result; // Đây là object

                // Chuyển stats thành array
                const formattedStats = [
                    { label: "Events Attended", value: stats.totalEventsBought },
                    { label: "Tickets Bought", value: stats.totalTicketsBought },
                    { label: "Favorite Events", value: stats.numberOfFavourites },
                    { label: "Total Spent", value: (stats.totalSpend / 1000).toLocaleString() + "K VND" },
                ];


                setStats(formattedStats); // Gán mảng vào state
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

    const fetchUpcomingEvent = async () => {
        try {
            const response = await axiosInstance.get(`/events/my-upcoming-events`);
            if (response.status === 200) {
                console.log(response.data.result)
                setUpcomingEvents(response.data.result);
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
    }


    useEffect(() => {
        fetchStatsData()
        fetchUpcomingEvent()
        // fetchnewestNotifications()
    }, [info])

    if (!stats) return

    return (
        <div className="flex-1 max-w-5xl space-y-6">                    {/* Welcome Section */}
            <div className="bg-gradient-to-r from-cyan-900 to-cyan-800 rounded-3xl overflow-hidden">
                <div className="relative p-8 md:p-12">
                    <div className="absolute inset-0 bg-pattern opacity-10"></div>
                    <div className="relative z-10 max-w-2xl">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Welcome back, {info.firstName ? (info.firstName + " " + info.lastName) : ("New User")}!
                        </h1>
                        <p className="text-cyan-100 text-lg mb-6">
                            Stay updated with your upcoming events and latest notifications.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => document.getElementById("calender")?.scrollIntoView({ behavior: "smooth" })}
                                className="bg-white text-cyan-900 px-6 py-3 rounded-xl font-semibold hover:bg-cyan-50 transition-colors shadow-lg">
                                View Calendar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div
                id="calender"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className={`bg-white p-6 rounded-2xl shadow-md border border-cyan-100 ${index == 3 && "col-span-2"}`}>
                        <div className="flex items-center justify-between mb-2">
                            {React.createElement(stats_icons[index], { className: "text-2xl text-cyan-900" })}
                            <span className="text-3xl font-bold text-cyan-900">{stat.value}</span>
                        </div>
                        <p className="text-gray-600">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Upcoming Events Timeline */}
            <div
                className="bg-white rounded-2xl shadow-md border border-cyan-100 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-cyan-900">Your Next Events</h2>
                    <FiClock className="text-cyan-900 text-2xl" />
                </div>
                <div className="space-y-4">
                    {upcomingEvents.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-6 text-gray-600">
                            <FiCalendar className="text-5xl text-cyan-900 mb-2" />
                            <p className="font-semibold text-xl">No upcoming events </p>
                            <p className="text-lg text-gray-500 mt-1">
                                Stay tuned! New events will be added soon.
                            </p>
                        </div>
                    )}
                    {upcomingEvents.map((event, index) => (
                        <div key={index} className="flex items-center p-4 bg-cyan-50 rounded-xl">
                            <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                                <img
                                    src={event.photoEvents[0].photoEventId || "/default-event.jpg"}
                                    alt="Event"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="ml-4">
                                <h3 className="font-semibold text-cyan-900">{event.eventName}</h3>
                                <span className="text-gray-600 flex items-center gap-2">
                                    <MdEventNote /> {datimeToEnUS(event.startTime)} - {datimeToEnUS(event.endTime)}
                                </span>
                                <span className="text-gray-600 flex items-center gap-2">
                                    <MdOutlineShareLocation /> {event.eventLocation}</span>
                            </div>
                            <button
                                onClick={() => navigate(`/events/${event.eventId}`)}
                                className="ml-auto text-cyan-900 hover:text-cyan-700">
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Newest notifications */}
            <div className="bg-white rounded-2xl shadow-md border border-cyan-100 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-cyan-900">Newest notifications</h2>
                    <button
                        onClick={() => {
                            setActiveMenu("notifications");
                            scroll(0, 0)
                        }}
                        className="text-cyan-900 hover:text-cyan-700 font-medium">
                        View All
                    </button>
                </div>
                <div className="space-y-4">
                    {newestNotifications.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-6 text-gray-600">
                            <FiInbox className="text-5xl text-cyan-900 mb-2" />
                            <p className="font-semibold text-xl">You're all caught up!</p>
                            <p className="text-lg text-gray-500 mt-1">
                                No new notifications. Keep up the great work!
                            </p>
                        </div>
                    )}

                    {newestNotifications.map((notification, index) => (
                        <div key={notification.notificationId} className="min-h-16 flex items-center border-b border-cyan-100 last:border-0 pb-4 last:pb-0">
                            {/* Icon trạng thái */}
                            <div className="w-6 h-6 flex items-center justify-between gap-5">
                                {notification.read ? (
                                    <FiCheckCircle className="text-cyan-600 text-lg" />
                                ) : (
                                    <MdRadioButtonUnchecked className="text-red-500 text-lg" />
                                )}
                            </div>

                            {/* Nội dung thông báo */}
                            <p className="mx-4 text-gray-700">
                                <span className="font-semibold">{notification.title}:</span> {notification.message}
                            </p>

                            {/* Thời gian thông báo */}
                            <span className="ml-auto text-sm text-gray-500 min-w-16">
                                {moment(notification.createdAt).fromNow()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AttendeeDashboard