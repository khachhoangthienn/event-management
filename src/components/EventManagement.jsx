import React, { useContext, useEffect, useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiCalendar, FiUsers, FiPackage, FiImage, FiCheck, FiTag } from 'react-icons/fi';
import { AppContext } from '@/context/AppContext';
import { toast } from 'react-toastify';
import CreateEventForm from './EditEventModal';
import UpdateEventForm from './UpdateEventModal';
import { axiosInstance } from '@/axiosConfig';

const EventManagement = () => {
    const { categories } = useContext(AppContext);
    const [myEvents, setMyEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const getMyEvents = async () => {
        try {
            const response = await axiosInstance.get(`/events/context-user-events`);
            if (response.status === 200) {

                if (Array.isArray(response.data.result)) {
                    setMyEvents(response.data.result);
                } else {
                    setMyEvents([response.data.result]);
                }
                if (selectedEvent !== null) {
                    console.log("oke!");
                    setSelectedEvent(myEvents.find(event => event.eventId === selectedEvent.eventId));
                }
            }
        } catch (error) {
            if (error.response) {
                const { code, message } = error.response.data;
                toast.error(message);
                console.log("this is error code: " + code);
            } else {
                toast.error("Lấy sự kiện thất bại");
            }
        }
    };

    useEffect(() => {
        getMyEvents();
    }, []);


    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('all');
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);


    const tabs = [
        { id: 'all', label: 'All Events' },
        { id: 'upcoming', label: 'Upcoming' },
        { id: 'ongoing', label: 'Ongoing' },
        { id: 'completed', label: 'Completed' }
    ];

    if (!myEvents) return (<div></div>);

    return (
        <div className="flex-1 max-w-6xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-cyan-900">Event Management</h1>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
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
                        onClick={() => setActiveTab(tab.id)}
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
            <div className="space-y-4">
                {myEvents.map((event) => (
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
                                    className={`px-3 py-1 text-sm font-medium rounded-full ${event.eventStatus === "Active"
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
                                    {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
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
                            <button className="p-2 text-cyan-900 hover:bg-cyan-50 rounded-lg" onClick={() => {
                                setSelectedEvent(event);
                                setUpdateModalOpen(true);
                            }}>
                                <FiEdit2 />
                            </button>
                            <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                                <FiTrash2 />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

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