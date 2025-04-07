import React, { useContext, useEffect, useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiCalendar, FiUsers, FiPackage, FiTag, FiBell } from 'react-icons/fi';
import { TbCalendarCancel } from "react-icons/tb";
import { toast } from 'react-toastify';
import CreateEventForm from './EditEventModal';
import UpdateEventForm from './UpdateEventModal';
import { axiosInstance, axiosPublic } from '@/axiosConfig';
import confirmToast from './ui/confirmToast';
import { UserContext } from '@/context/UserContext';
import { TbCalendarEvent } from "react-icons/tb";


const EventManagement = () => {
    const [myEvents, setMyEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('all');
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 4;
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = myEvents.slice(indexOfFirstEvent, indexOfLastEvent);
    const { info } = useContext(UserContext);


    const getMyEvents = async () => {
        try {
            const response = await axiosInstance.get(`/events/context-user-events?typeFilter=${activeTab}`);
            if (response.status === 200) {
                const events = Array.isArray(response.data.result) ? response.data.result : [response.data.result];
                setMyEvents(events);

                setTimeout(() => {
                    if (selectedEvent) {
                        const foundEvent = events.find(event => event.eventId === selectedEvent.eventId);
                        setSelectedEvent(foundEvent || null);
                    }
                }, 0);
            }
        } catch (error) {
            if (error.response) {
                const { code, message } = error.response.data;
                toast.error(message);
                console.log("this is error code: " + code);
            } else {
                console.error("Error:", error.message);
                toast.error("Lấy sự kiện thất bại");
            }
        }
    };

    const deleteEvent = async (eventId) => {
        try {
            const response = await axiosPublic.delete(`/events/${eventId}`);
            if (response.status === 200) {
                toast.success("Event has been deleted!");
                getMyEvents();
            }
        } catch (error) {
            if (error.response) {
                const { code, message } = error.response.data;
                toast.error(message);
                console.log("this is error code: " + code);
            } else {
                console.error("Error:", error.message);
                toast.error("Lấy sự kiện thất bại");
            }
        }
    };

    const cancelEvent = async (eventId) => {
        try {
            const response = await axiosPublic.put(`/events/${eventId}/set-status?status=CANCELLED`);
            if (response.status === 200) {
                toast.success("Cancel event successfully!");
                getMyEvents();
            }
        } catch (error) {
            if (error.response) {
                const { code, message } = error.response.data;
                toast.error(message);
                console.log("this is error code: " + code);
            } else {
                console.error("Error:", error.message);
                toast.error("Has an error!");
            }
        }
    };

    useEffect(() => {
        getMyEvents();
    }, [activeTab]);


    const tabs = [
        { id: 'all', label: 'All Events' },
        { id: 'PENDING', label: 'Pending' },
        { id: 'APPROVED', label: 'Approved' },
        { id: 'REJECTED', label: 'Rejected' },
        { id: 'CANCELLED', label: 'Cancel' },
        { id: 'FINISHED', label: 'Finished' }
    ];

    if (!myEvents) return (<div></div>);

    return (
        <div className="flex-1 max-w-6xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-cyan-900">Event Management</h1>
                <button
                    onClick={() => {
                        if (info && info.role == 'ORGANIZER' && info.firstName == null) {
                            toast.warning("Please update your profile to add new events!", { autoClose: 1700 });
                            return
                        }
                        setIsCreateModalOpen(true)
                    }}
                    className="flex items-center gap-2 bg-cyan-900 text-white px-4 py-2 rounded-lg hover:bg-cyan-800"
                >
                    <FiPlus /> Create Event
                </button>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-cyan-50 p-1 rounded-xl">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => {
                            setCurrentPage(1);
                            setActiveTab(tab.id)
                        }}
                        className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-colors ${activeTab === tab.id
                            ? 'bg-white text-cyan-900 shadow-sm'
                            : 'text-cyan-600 hover:text-cyan-900'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Events List */}
            <div className="space-y-4 min-h-[80vh]">
                {currentEvents.length == 0 && <div className="text-center py-12">
                    <TbCalendarEvent className="text-5xl text-cyan-900 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-cyan-900 mb-2">No events here yet</h3>
                    <p className="text-gray-600">Stay tuned! More events may be added soon.</p>

                </div>
                }
                {currentEvents.map((event) => (
                    <div
                        key={event.eventId}
                        className="bg-white rounded-xl shadow-md border border-cyan-100 p-4 flex items-center gap-4"
                    >
                        {/* Hình ảnh sự kiện (hình vuông) */}
                        <img
                            src={event.photoEvents[0]?.photoEventId || "/default-event.jpg"}
                            alt={event.eventName}
                            className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                        />

                        {/* Nội dung sự kiện */}
                        <div className="flex-1 space-y-2">
                            {/* Tên sự kiện + Trạng thái */}
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold text-cyan-900">{event.eventName}</h3>
                                <span
                                    className={`px-3 py-1 text-sm font-medium rounded-full ${event.eventStatus === "APPROVED"
                                        ? "bg-green-100 text-green-700"
                                        : event.eventStatus === "PENDING"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {event.eventStatus}
                                </span>
                            </div>

                            {/* Ngày bắt đầu & kết thúc */}
                            <div className="flex items-center gap-4 text-gray-600">
                                <span className="flex items-center gap-1">
                                    <FiCalendar className="text-cyan-900" />
                                    {new Date(event.startTime).toLocaleDateString()} - {new Date(event.endTime).toLocaleDateString()}
                                </span>
                            </div>

                            {/* Thông tin thêm */}
                            <div className="flex items-center gap-4 text-gray-600">
                                <span className="flex items-center gap-1">
                                    <FiUsers className="text-cyan-900" />
                                    {event.speakers.length} Speakers
                                </span>
                                <span className="flex items-center gap-1">
                                    <FiPackage className="text-cyan-900" />
                                    {event.packagePrices.length} Packages
                                </span>
                                <span className="flex items-center gap-1">
                                    <FiTag className="text-cyan-900" />
                                    {event.types.map((type) => type.typeName).join(", ")}
                                </span>
                            </div>
                        </div>

                        {/* Nút thao tác */}
                        <div className="flex flex-col items-center gap-2">
                            {event.eventStatus !== "APPROVED" &&
                                <button className="p-2 text-cyan-900 hover:bg-cyan-50 rounded-lg" onClick={() => {
                                    if (event.eventStatus == "APPROVED" || event.eventStatus == "FINISHED") {
                                        toast.error("Cannot update this event");
                                        return;
                                    }
                                    setSelectedEvent(event);
                                    setUpdateModalOpen(true);
                                }}>
                                    <FiEdit2 />
                                </button>}

                            {/* check if approved? */}
                            {event.eventStatus == "APPROVED" ?
                                (<button className="p-2 text-red-500 hover:bg-red-50 rounded-lg" onClick={() => {
                                    // if (event.eventStatus == "APPROVED" || event.eventStatus == "FINISHED") {
                                    //     toast.error("Cannot delete this event");
                                    //     return;
                                    // }
                                    confirmToast("Are you sure you want to cancel this event?", () => {
                                        cancelEvent(event.eventId);
                                    });
                                }}>
                                    <TbCalendarCancel />
                                </button>)
                                : (<button className="p-2 text-red-500 hover:bg-red-50 rounded-lg" onClick={() => {
                                    // if (event.eventStatus == "FINISHED") {
                                    //     toast.error("Cannot delete this event");
                                    //     return;
                                    // }

                                    confirmToast("Are you sure you want to delete this event?", () => {
                                        deleteEvent(event.eventId);
                                    });
                                }}>
                                    <FiTrash2 />
                                </button>)
                            }
                        </div>
                    </div>
                ))}

            </div>
            {currentEvents.length > 0 && <div className="flex justify-center mt-4 space-x-2">
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
                    disabled={indexOfLastEvent >= myEvents.length}
                >
                    Next
                </button>
            </div>
            }

            {isCreateModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <CreateEventForm
                            onClose={() => setIsCreateModalOpen(false)}
                            refreshEvent={getMyEvents}
                        />
                    </div>
                </div>
            )}
            {isUpdateModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <UpdateEventForm
                            onClose={() => setUpdateModalOpen(false)}
                            refreshEvent={getMyEvents}
                            currentEvent={selectedEvent}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventManagement;