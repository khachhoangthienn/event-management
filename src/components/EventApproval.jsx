import React, { useEffect, useState } from 'react';
import { FiCalendar, FiMapPin, FiUser, FiCheck, FiX, FiClock, FiDollarSign, FiPackage, FiMic } from 'react-icons/fi';
import { axiosPublic } from '@/axiosConfig';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from 'react-toastify';

const AdminEventApproval = () => {
    const [filterStatus, setFilterStatus] = useState('pending');
    const [eventsSystem, setEventsSystem] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 3;
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = eventsSystem.slice(indexOfFirstEvent, indexOfLastEvent);

    const fetchEvents = async () => {
        try {
            const response = await axiosPublic.get(`/events?status=${filterStatus.toUpperCase()}`);
            if (response.status === 200) {
                setEventsSystem(response.data.result);
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
        fetchEvents();
    }, [filterStatus]);


    const handleStatusChange = async (eventId, newStatus) => {
        if (newStatus !== 'APPROVED' && newStatus !== 'REJECTED') {
            console.error("Invalid status.");
            return;
        }
        try {
            const response = await axiosPublic.put(`/events/${eventId}/set-status?status=${newStatus}`, {
                status: newStatus.toUpperCase()
            });
            if (response.status === 200) {
                fetchEvents();
                setIsModalOpen(false);
                toast.success(`Event status changed to ${newStatus.toLowerCase()}`);
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

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'approved':
                return 'bg-green-100 text-green-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white p-6">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-cyan-900">Event Approval</h1>
                        <p className="text-gray-600 mt-2">Review and manage event submissions</p>
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilterStatus('pending')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${filterStatus === 'pending'
                                ? 'bg-cyan-900 text-white'
                                : 'bg-white border border-cyan-200 text-cyan-900 hover:bg-cyan-50'
                                }`}
                        >
                            <FiClock className="inline-block mr-2" />
                            Pending
                        </button>
                        <button
                            onClick={() => setFilterStatus('approved')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${filterStatus === 'approved'
                                ? 'bg-cyan-900 text-white'
                                : 'bg-white border border-cyan-200 text-cyan-900 hover:bg-cyan-50'
                                }`}
                        >
                            <FiCheck className="inline-block mr-2" />
                            Approved
                        </button>
                        <button
                            onClick={() => setFilterStatus('rejected')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${filterStatus === 'rejected'
                                ? 'bg-cyan-900 text-white'
                                : 'bg-white border border-cyan-200 text-cyan-900 hover:bg-cyan-50'
                                }`}
                        >
                            <FiX className="inline-block mr-2" />
                            Rejected
                        </button>
                    </div>
                </div>

                {/* Events List */}
                <div className="space-y-4 min-h-[87vh]">
                    {currentEvents.map((event) => (
                        <div
                            key={event.eventId}
                            className="bg-white rounded-lg shadow-md border border-cyan-100 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => handleEventClick(event)}
                        >
                            <div className="flex flex-col md:flex-row items-center px-4">
                                {/* Event Image */}
                                <div className="w-72 h-52 flex items-center justify-center bg-gray-200 rounded-lg overflow-hidden">
                                    <img
                                        src={event.photoEvents[0]?.photoEventId || '/api/placeholder/800/400'}
                                        alt={event.eventName}
                                        className="w-full h-full object-cover object-center"
                                    />
                                </div>
                                {/* Event Details */}
                                <div className="flex-1 p-6">
                                    <div className="flex flex-col md:flex-row justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(event.eventStatus)}`}>
                                                    {event.eventStatus.charAt(0).toUpperCase() + event.eventStatus.slice(1).toLowerCase()}
                                                </span>
                                                <span className="px-3 py-1 bg-cyan-50 text-cyan-900 rounded-full text-sm">
                                                    {event.types[0]?.typeName}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-semibold text-cyan-900 mb-2">{event.eventName}</h3>
                                            <p className="text-gray-600 mb-4 line-clamp-2">{event.eventDescription}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center text-gray-600">
                                                <FiUser className="mr-2" />
                                                <span>By {event.user.firstName + " " + event.user.lastName}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <FiCalendar className="mr-2" />
                                                <span>{formatDate(event.startTime)}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <FiMapPin className="mr-2" />
                                                <span>{event.eventLocation}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Empty State */}
                    {eventsSystem.length === 0 && (
                        <div className="text-center py-12 bg-white rounded-lg border border-cyan-100">
                            <div className="text-5xl text-cyan-900 mx-auto mb-4">
                                {filterStatus === 'pending' && <FiClock />}
                                {filterStatus === 'approved' && <FiCheck />}
                                {filterStatus === 'rejected' && <FiX />}
                            </div>
                            <h3 className="text-xl font-semibold text-cyan-900 mb-2">No {filterStatus} events</h3>
                            <p className="text-gray-600">There are no events with {filterStatus} status.</p>
                        </div>
                    )}
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
                        disabled={indexOfLastEvent >= eventsSystem.length}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Event Details Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-lg bg-white">
                    {selectedEvent && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-4xl font-bold text-cyan-900">
                                    {selectedEvent.eventName}
                                </DialogTitle>
                            </DialogHeader>

                            <div className="mt-4 space-y-6">
                                {/* Image Gallery */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {selectedEvent.photoEvents.map((photo, index) => (
                                        <img
                                            key={index}
                                            src={photo.photoEventId}
                                            alt={`Event photo ${index + 1}`}
                                            className="w-full h-64 object-cover rounded-lg shadow-md"
                                            style={{ aspectRatio: '1 / 1' }} // Đảm bảo hình vuông
                                        />
                                    ))}
                                </div>

                                {/* Event Details */}
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-lg">{selectedEvent.eventDescription}</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-3">
                                            <div className="flex items-center text-gray-600 text-lg">
                                                <FiUser className="mr-2" />
                                                <span>Organizer: {selectedEvent.user.firstName} {selectedEvent.user.lastName}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600 text-lg">
                                                <FiCalendar className="mr-2" />
                                                <span>Start: {formatDate(selectedEvent.startTime)}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600 text-lg">
                                                <FiCalendar className="mr-2" />
                                                <span>End: {formatDate(selectedEvent.endTime)}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600 text-lg">
                                                <FiMapPin className="mr-2" />
                                                <span>{selectedEvent.eventLocation}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center text-gray-600 text-lg">
                                                <FiPackage className="mr-2" />
                                                <span>Total Tickets: {selectedEvent.totalTickets}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600 text-lg">
                                                <FiPackage className="mr-2" />
                                                <span>Available: {selectedEvent.availableTickets}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Speakers Section */}
                                    {selectedEvent.speakers.length > 0 && (
                                        <div className="mt-6">
                                            <h3 className="text-xl font-semibold text-cyan-900 mb-3">Speakers</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {selectedEvent.speakers.map((speaker) => (
                                                    <div key={speaker.speakerId} className="flex items-center space-x-3">
                                                        <img
                                                            src={speaker.speakerImageUrl}
                                                            alt={speaker.speakerName}
                                                            className="w-16 h-16 rounded-full object-cover"
                                                        />
                                                        <div>
                                                            <p className="font-medium text-cyan-900 text-lg">{speaker.speakerName}</p>
                                                            <p className="text-base text-gray-600">{speaker.speakerCareer}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Ticket Packages */}
                                    {selectedEvent.packagePrices.length > 0 && (
                                        <div className="mt-6">
                                            <h3 className="text-xl font-semibold text-cyan-900 mb-3">Ticket Packages</h3>
                                            <div className="space-y-4">
                                                {selectedEvent.packagePrices.map((package_) => (
                                                    <div key={package_.packageId} className="border border-cyan-100 rounded-lg p-4 shadow-sm">
                                                        <div className="flex justify-between items-center mb-2">
                                                            <h4 className="font-medium text-cyan-900 text-lg">{package_.packageName}</h4>
                                                            <span className="text-cyan-900 font-semibold text-lg">
                                                                ${package_.packagePrice.toFixed(2)}
                                                            </span>
                                                        </div>
                                                        <div className="space-y-1">
                                                            {package_.benefits.map((benefit) => (
                                                                <div key={benefit.benefitId} className="text-gray-600 text-sm">
                                                                    • {benefit.benefitDescription}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    {selectedEvent.eventStatus === 'PENDING' && (
                                        <div className="flex justify-end gap-3 mt-6">
                                            <button
                                                onClick={() => handleStatusChange(selectedEvent.eventId, 'REJECTED')}
                                                className="px-6 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                            >
                                                Reject
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange(selectedEvent.eventId, 'APPROVED')}
                                                className="px-6 py-2 bg-cyan-900 text-white rounded-lg hover:bg-cyan-800 transition-colors"
                                            >
                                                Approve
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminEventApproval;