import React, { useState, useContext } from "react";
import { FiHeart, FiCalendar, FiMapPin, FiFilter, FiTrash2, FiShare2, FiUser } from "react-icons/fi";
import { AppContext } from "@/context/AppContext";

const FavoriteEvents = () => {
    const { events, categories } = useContext(AppContext);
    const [sortBy, setSortBy] = useState("date");
    const [filterType, setFilterType] = useState("all");

    const favoriteEvents = events.slice(0, 3);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white p-6">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-cyan-900">Favorite Events</h1>
                        <p className="text-gray-600 mt-2">Manage your saved events and quickly access them</p>
                    </div>
                    <div className="flex gap-4">
                        {/* Category Filter */}
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="px-4 py-2 rounded-lg border border-cyan-100 text-cyan-900 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-900"
                        >
                            <option value="all">All Categories</option>
                            {categories && categories.map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>

                        {/* Sort Dropdown */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 rounded-lg border border-cyan-100 text-cyan-900 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-900"
                        >
                            <option value="date">Sort by Date</option>
                            <option value="name">Sort by Name</option>
                            <option value="seats">Sort by Available Seats</option>
                        </select>
                    </div>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteEvents.map((event) => (
                        <div key={event.id} className="bg-white rounded-2xl shadow-md overflow-hidden border border-cyan-100 group">
                            {/* Event Image */}
                            <div className="relative">
                                <img
                                    src={event.image}
                                    alt={event.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button className="p-2 bg-white rounded-full text-red-500 shadow-lg hover:bg-red-50 transition-colors">
                                        <FiTrash2 className="text-lg" />
                                    </button>
                                </div>
                                <div className="absolute bottom-4 left-4 bg-cyan-900 text-white px-3 py-1 rounded-full text-sm">
                                    {event.category}
                                </div>
                            </div>

                            {/* Event Details */}
                            <div className="p-6">
                                <div className="mb-4">
                                    <h3 className="text-xl font-semibold text-cyan-900 mb-2 min-h-24">{event.name}</h3>
                                    <div className="flex items-center text-gray-600">
                                        <FiUser className="mr-2" />
                                        <span>By {event.organizerBy}</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center text-gray-600">
                                        <FiCalendar className="mr-2" />
                                        <span>{formatDate(event.calender)}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <FiMapPin className="mr-2" />
                                        <span>{event.location}</span>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-between">
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                        {event.availables} seats available
                                    </span>
                                    <button className="px-4 py-2 bg-cyan-900 text-white rounded-lg hover:bg-cyan-800 transition-colors">
                                        Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {favoriteEvents.length === 0 && (
                    <div className="text-center py-12">
                        <FiHeart className="text-5xl text-cyan-900 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-cyan-900 mb-2">No Favorite Events Yet</h3>
                        <p className="text-gray-600">Start exploring events and save your favorites!</p>
                        <button className="mt-6 px-6 py-3 bg-cyan-900 text-white rounded-lg hover:bg-cyan-800 transition-colors">
                            Explore Events
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoriteEvents;