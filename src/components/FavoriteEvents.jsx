import React, { useState, useContext, useEffect } from "react";
import { FiHeart, FiCalendar, FiMapPin, FiTrash2, FiUser } from "react-icons/fi";
import axiosInstance from "@/axiosConfig";
import { datimeToEnUS } from "@/utils";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/context/UserContext";
import { EventContext } from "@/context/EventContext";

const FavoriteEvents = () => {
    const { info } = useContext(UserContext);
    const { types } = useContext(EventContext)
    const [sortBy, setSortBy] = useState("added");
    const [filterType, setFilterType] = useState("all");
    const [myFavoriteEvents, setMyFavoriteEvents] = useState([]);
    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const favoriteEvents = myFavoriteEvents.slice(indexOfFirst, indexOfLast);

    const fetchFavouriteEvents = async () => {
        if (!info) return;
        try {
            const response = await axiosInstance.get(`/favourites/my-favourites?typeId=${filterType}&sortValue=${sortBy}`);
            if (response.status === 200) {
                setMyFavoriteEvents(response.data.result);
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

    const handleFavourite = async (eventId) => {
        try {
            const response = await axiosInstance.post(`/favourites/${eventId}`);
            if (response.status === 200) {
                fetchFavouriteEvents()
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
        fetchFavouriteEvents();
    }, [filterType, sortBy]);

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
                            <option value={"all"}>All Categories</option>
                            {types && types.map((type) => (
                                <option key={type.typeId} value={type.typeId}>{type.typeName}</option>
                            ))}
                        </select>

                        {/* Sort Dropdown */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 rounded-lg border border-cyan-100 text-cyan-900 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-900"
                        >
                            <option value="added">Sort by Added Date</option>
                            <option value="date">Sort by Date</option>
                            <option value="name">Sort by Name</option>
                            <option value="seats">Sort by Available Seats</option>
                        </select>
                    </div>
                </div>

                {/* Events Grid */}
                <div className="flex flex-col md:flex-col flex-wrap gap-6 justify-between">
                    <div className="flex-col flex gap-5 min-h-[85vh]">
                        {favoriteEvents.map((favourite) => (
                            <div key={favourite.event.eventId} className="bg-white rounded-2xl shadow-md overflow-hidden border border-cyan-100 group w-full flex flex-row mx-auto">

                                {/* Event Image */}
                                <div className="relative w-1/4">
                                    <img
                                        src={favourite.event.photoEvents[0].photoEventId}
                                        alt={favourite.event.name}
                                        className="w-full aspect-square object-cover"
                                    />
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <button className="p-3 bg-white rounded-full text-red-500 shadow-lg hover:bg-red-50 transition-colors">
                                            <FiTrash2 className="text-base" onClick={() => handleFavourite(favourite.event.eventId)} />
                                        </button>
                                    </div>
                                    <div className="absolute bottom-4 left-4 bg-cyan-900 text-white px-4 py-2 rounded-full text-sm">
                                        {favourite.event.types[0].typeName}
                                    </div>
                                </div>

                                {/* Event Details */}
                                <div className="px-8 py-4 flex flex-col justify-between w-3/4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-cyan-900 mb-2">{favourite.event.eventName}</h3>
                                        <div className="flex items-center text-gray-600">
                                            <FiUser className="mr-2" />
                                            <span>By {favourite.event.user.firstName} {favourite.event.user.lastName}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center text-gray-600">
                                            <FiCalendar className="mr-2 text-green-700" />
                                            <span>Start: {datimeToEnUS(favourite.event.startTime)}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <FiCalendar className="mr-2" />
                                            <span>End: {datimeToEnUS(favourite.event.endTime)}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <FiMapPin className="mr-2" />
                                            <span>{favourite.event.eventLocation}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-base">
                                            {favourite.event.availableTickets} seats available
                                        </span>
                                        <button onClick={() => navigate(`/events/${favourite.event.eventId}`)}
                                            className="px-5 py-3 bg-cyan-900 text-white rounded-lg hover:bg-cyan-800 transition-colors">
                                            Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* pagination */}
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
                            disabled={indexOfLast >= myFavoriteEvents.length}
                        >
                            Next
                        </button>
                    </div>
                </div>



                {/* Empty State */}
                {favoriteEvents.length === 0 && (
                    <div className="text-center py-12">
                        <FiHeart className="text-5xl text-cyan-900 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-cyan-900 mb-2">No Favorite Events Yet</h3>
                        <p className="text-gray-600">Start exploring events and save your favorites!</p>
                        <button onClick={() => navigate("/events")}
                            className="mt-6 px-6 py-3 bg-cyan-900 text-white rounded-lg hover:bg-cyan-800 transition-colors">
                            Explore Events
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoriteEvents;