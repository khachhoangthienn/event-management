import React, { useContext, useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiCalendar, FiUsers, FiPackage, FiImage, FiCheck } from 'react-icons/fi';
import { AppContext } from '@/context/AppContext';
import { toast } from 'react-toastify';
import CreateEventForm from './EditEventModal';

const EventManagement = () => {
    const { categories } = useContext(AppContext);
    // const [selectedEvent, setSelectedEvent] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [createdEvent, setCreatedEvent] = useState({
        eventName: '',
        eventDescription: '',
        eventType: '',
        eventLocation: '',
        eventDate: '',
    });


    // const handleEditClick = (event) => {
    //     setSelectedEvent(event);
    //     setIsEditModalOpen(true);
    // };

    const [events, setEvents] = useState([
        {
            eventId: "1",
            eventName: "Tech Conference 2025",
            eventType: "CONFERENCE",
            eventDate: "2025-06-15T09:00:00",
            eventStatus: "UPCOMING",
            totalTickets: 1000,
            availableTickets: 800,
        },
        {
            eventId: "2",
            eventName: "Tech Conference 2025",
            eventType: "CONFERENCE",
            eventDate: "2025-06-15T09:00:00",
            eventStatus: "UPCOMING",
            totalTickets: 1000,
            availableTickets: 800,
        }
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!createdEvent.eventName || !createdEvent.eventType || !createdEvent.eventDate || !createdEvent.eventLocation) {
            toast.warning('Please fill all required fields');
            return;
        }
        console.log(createdEvent); // Hoặc xử lý submit theo cách bạn muốn
    };

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('all');

    const tabs = [
        { id: 'all', label: 'All Events' },
        { id: 'upcoming', label: 'Upcoming' },
        { id: 'ongoing', label: 'Ongoing' },
        { id: 'completed', label: 'Completed' }
    ];

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
                {events.map(event => (
                    <div key={event.eventId} className="bg-white rounded-xl shadow-md border border-cyan-100">
                        <div className="p-6">
                            <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                    <h3 className="text-xl font-semibold text-cyan-900">{event.eventName}</h3>
                                    <div className="flex items-center gap-4 text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <FiCalendar className="text-cyan-900" />
                                            {new Date(event.eventDate).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <FiUsers className="text-cyan-900" />
                                            {event.availableTickets}/{event.totalTickets} tickets
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-2 text-cyan-900 hover:bg-cyan-50 rounded-lg" onClick={() => handleEditClick(event)}>
                                        <FiEdit2 />
                                    </button>
                                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="border-t border-cyan-100 px-6 py-4">
                            <div className="flex gap-4">
                                <button className="flex items-center gap-2 text-cyan-900 hover:text-cyan-700">
                                    <FiPackage /> Manage Packages
                                </button>
                                <button className="flex items-center gap-2 text-cyan-900 hover:text-cyan-700">
                                    <FiUsers /> Manage Speakers
                                </button>
                                <button className="flex items-center gap-2 text-cyan-900 hover:text-cyan-700">
                                    <FiImage /> Manage Photos
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {isCreateModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <CreateEventForm
                            // isOpen={isCreateModalOpen}
                            onClose={() => setIsCreateModalOpen(false)}
                        // onSubmit={handleCreateEvent}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventManagement;