import axiosInstance from '@/axiosConfig';
import { UserContext } from '@/context/UserContext';
import React, { useState, useEffect, useContext } from 'react';
import { FiCalendar, FiCreditCard, FiDollarSign, FiEye, FiMapPin, FiPackage, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const InvoiceList = () => {
    const { info } = useContext(UserContext);
    const [allInvoices, setAllInvoices] = useState([]);
    const [filterPaymentMethod, setFilterPaymentMethod] = useState('all');
    const [sortBy, setSortBy] = useState('date');
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const navigate = useNavigate();

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const invoices = allInvoices.slice(indexOfFirst, indexOfLast);

    useEffect(() => {
        const getMyInvoices = async () => {
            if (!info) return;
            try {
                const response = await axiosInstance.get(`/invoices/mine`);
                if (response.status === 200) {
                    setAllInvoices(response.data.result)
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

        getMyInvoices();
    }, [info]);

    // Format date to readable format
    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    // Get unique payment methods for filter
    const paymentMethods = [...new Set(invoices.map(invoice => invoice.paymentMethod))];

    // Filter and sort invoices
    const filteredInvoices = invoices
        .filter(invoice => filterPaymentMethod === 'all' || invoice.paymentMethod === filterPaymentMethod)
        .sort((a, b) => {
            switch (sortBy) {
                case 'date':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'amount':
                    return b.amount - a.amount;
                case 'event':
                    return a.eventName.localeCompare(b.eventName);
                default:
                    return 0;
            }
        });

    // Handle invoice selection
    const handleViewDetail = (invoice) => {
        setSelectedInvoice(invoice);
    };

    // Close detail modal
    const closeDetail = () => {
        setSelectedInvoice(null);
    };
    // if (invoices.length === 0) return
    return (
        <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white p-6">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-cyan-900">My Invoices</h1>
                        <p className="text-gray-600 mt-2">View and manage your purchase history</p>
                    </div>
                    <div className="flex gap-4">
                        {/* Payment Method Filter */}
                        <select
                            value={filterPaymentMethod}
                            onChange={(e) => setFilterPaymentMethod(e.target.value)}
                            className="px-4 py-2 rounded-lg border border-cyan-100 text-cyan-900 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-900"
                        >
                            <option value="all">All Payment Methods</option>
                            {paymentMethods.map((method) => (
                                <option key={method} value={method}>{method}</option>
                            ))}
                        </select>

                        {/* Sort Dropdown */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 rounded-lg border border-cyan-100 text-cyan-900 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-900"
                        >
                            <option value="date">Sort by Date</option>
                            <option value="amount">Sort by Amount</option>
                            <option value="event">Sort by Event Name</option>
                        </select>
                    </div>
                </div>
                {/* Invoices List */}
                {filteredInvoices.length != 0 && (<div div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 min-h-[90vh]">
                    {filteredInvoices.map((invoice) => (
                        <div key={invoice.invoiceId} className="bg-white rounded-2xl shadow-md overflow-hidden border border-cyan-100 group w-full h-fit mx-auto">
                            {/* Invoice Header */}
                            <div className="bg-cyan-800 text-white p-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-semibold">Invoice #{invoice.paymentId}</h3>
                                        <p className="text-cyan-100 mt-1">{formatDate(invoice.createdAt)}</p>
                                    </div>
                                    <div className="bg-cyan-700 px-4 py-2 rounded-full text-white">
                                        {formatCurrency(invoice.amount)}
                                    </div>
                                </div>
                            </div>

                            {/* Invoice Details */}
                            <div className="p-6">
                                <div className="mb-6">
                                    <h3 className="text-2xl font-semibold text-cyan-900 mb-2">{invoice.eventName}</h3>
                                    <div className="flex items-center text-gray-600">
                                        <FiPackage className="mr-2 text-cyan-700" />
                                        <span>{invoice.packageName} (x{invoice.quantity})</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center text-gray-600">
                                        <FiCalendar className="mr-2 text-cyan-700" />
                                        <span>{formatDate(invoice.startTime)}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <FiMapPin className="mr-2 text-cyan-700" />
                                        <span>{invoice.eventLocation}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <FiCreditCard className="mr-2 text-cyan-700" />
                                        <span>{invoice.paymentMethod} {invoice.cardType ? `(${invoice.cardType})` : ''}</span>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-between">
                                    <span className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-base">
                                        {invoice.paymentMethod}
                                    </span>
                                    <button
                                        onClick={() => handleViewDetail(invoice)}
                                        className="px-5 py-3 bg-cyan-900 text-white rounded-lg hover:bg-cyan-800 transition-colors flex items-center"
                                    >
                                        <FiEye className="mr-2" />
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>)}



                {/* Empty State */}
                {filteredInvoices.length === 0 && (
                    <div className="text-center py-12">
                        <FiDollarSign className="text-5xl text-cyan-900 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-cyan-900 mb-2">No Invoices Found</h3>
                        <p className="text-gray-600">You haven't made any purchases yet or no invoices match your filters.</p>
                        <button
                            onClick={() => navigate("/events")}
                            className="mt-6 px-6 py-3 bg-cyan-900 text-white rounded-lg hover:bg-cyan-800 transition-colors"
                        >
                            Explore Events
                        </button>
                    </div>
                )}

                {filteredInvoices.length > 0 && (
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
                            disabled={indexOfLast >= allInvoices.length}
                        >
                            Next
                        </button>
                    </div>
                )}


            </div>

            {/* Invoice Detail Modal */}
            {
                selectedInvoice && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-lg max-w-3xl w-full max-h-90vh overflow-y-auto">
                            {/* Modal Header */}
                            <div className="bg-cyan-900 text-white p-6 rounded-t-2xl flex justify-between items-center">
                                <h2 className="text-2xl font-bold">Invoice Detail</h2>
                                <button
                                    onClick={closeDetail}
                                    className="text-white hover:text-cyan-200 transition-colors"
                                >
                                    <FiX className="text-2xl" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6">
                                {/* Event Information */}
                                <div className="mb-8">
                                    <h3 className="text-xl font-semibold text-cyan-900 mb-4 pb-2 border-b border-cyan-100">Event Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <div className="flex items-start">
                                                <span className="text-gray-500 w-32">Event Name:</span>
                                                <span className="text-cyan-900 font-medium">{selectedInvoice.eventName}</span>
                                            </div>
                                            <div className="flex items-start">
                                                <span className="text-gray-500 w-32">Location:</span>
                                                <span className="text-cyan-900">{selectedInvoice.eventLocation}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-start">
                                                <span className="text-gray-500 w-32">Start Time:</span>
                                                <span className="text-cyan-900">{formatDate(selectedInvoice.startTime)}</span>
                                            </div>
                                            <div className="flex items-start">
                                                <span className="text-gray-500 w-32">End Time:</span>
                                                <span className="text-cyan-900">{formatDate(selectedInvoice.endTime)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Information */}
                                <div className="mb-8">
                                    <h3 className="text-xl font-semibold text-cyan-900 mb-4 pb-2 border-b border-cyan-100">Payment Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <div className="flex items-start">
                                                <span className="text-gray-500 w-32">Payment ID:</span>
                                                <span className="text-cyan-900 font-mono">{selectedInvoice.paymentId}</span>
                                            </div>
                                            <div className="flex items-start">
                                                <span className="text-gray-500 w-32">Date:</span>
                                                <span className="text-cyan-900">{formatDate(selectedInvoice.createdAt)}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-start">
                                                <span className="text-gray-500 w-32">Method:</span>
                                                <span className="text-cyan-900">{selectedInvoice.paymentMethod}</span>
                                            </div>
                                            {selectedInvoice.bankCode && (
                                                <div className="flex items-start">
                                                    <span className="text-gray-500 w-32">Bank:</span>
                                                    <span className="text-cyan-900">{selectedInvoice.bankCode}</span>
                                                </div>
                                            )}
                                            {selectedInvoice.cardType && (
                                                <div className="flex items-start">
                                                    <span className="text-gray-500 w-32">Card Type:</span>
                                                    <span className="text-cyan-900">{selectedInvoice.cardType}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Ticket Information */}
                                <div className="mb-8">
                                    <h3 className="text-xl font-semibold text-cyan-900 mb-4 pb-2 border-b border-cyan-100">Ticket Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <div className="flex items-start">
                                                <span className="text-gray-500 w-32">Package:</span>
                                                <span className="text-cyan-900">{selectedInvoice.packageName}</span>
                                            </div>
                                            <div className="flex items-start">
                                                <span className="text-gray-500 w-32">Unit Price:</span>
                                                <span className="text-cyan-900">{formatCurrency(selectedInvoice.packagePrice)}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-start">
                                                <span className="text-gray-500 w-32">Quantity:</span>
                                                <span className="text-cyan-900">{selectedInvoice.quantity}</span>
                                            </div>
                                            <div className="flex items-start">
                                                <span className="text-gray-500 w-32">Total Amount:</span>
                                                <span className="text-cyan-900 font-semibold">{formatCurrency(selectedInvoice.amount)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Purchaser Information */}
                                <div>
                                    <h3 className="text-xl font-semibold text-cyan-900 mb-4 pb-2 border-b border-cyan-100">Purchaser Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <div className="flex items-start">
                                                <span className="text-gray-500 w-32">Name:</span>
                                                <span className="text-cyan-900">{selectedInvoice.firstName} {selectedInvoice.lastName}</span>
                                            </div>
                                            <div className="flex items-start">
                                                <span className="text-gray-500 w-32">Email:</span>
                                                <span className="text-cyan-900">{selectedInvoice.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default InvoiceList;