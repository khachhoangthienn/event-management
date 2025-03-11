import React, { useEffect, useState } from 'react';
import { FiUser, FiUsers, FiCalendar, FiMail, FiMapPin, FiSearch, FiFilter, FiEdit, FiTrash2, FiUserCheck, FiUserX } from 'react-icons/fi';
import { axiosPublic } from '@/axiosConfig';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from 'react-toastify';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminUserManagement = () => {
    const [userRole, setUserRole] = useState('ATTENDEE');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedUser, setEditedUser] = useState(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const usersPerPage = 5;
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;

    // Filter users by search term
    const filteredUsers = users.filter(user =>
        (user.firstName && user.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.lastName && user.lastName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );


    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const fetchUsers = async () => {
        try {
            const response = await axiosPublic.get(`/users/get-by-role?role=${userRole}`);
            if (response.status === 200) {
                setUsers(response.data.result);
            }
        } catch (error) {
            console.log("Error code: " + (error.response?.data?.code || "Unknown"));
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
        fetchUsers();
    }, [userRole]);

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    // const handleEditClick = (e, user) => {
    //     e.stopPropagation();
    //     setEditedUser({
    //         ...user
    //     });
    //     setIsEditModalOpen(true);
    // };

    // const handleDeleteClick = (e, user) => {
    //     e.stopPropagation();
    //     setUserToDelete(user);
    //     setIsConfirmModalOpen(true);
    // };

    const handleEditSave = async () => {
        try {
            const response = await axiosPublic.put(`/users/${editedUser.userId}`, editedUser);
            if (response.status === 200) {
                fetchUsers();
                setIsEditModalOpen(false);
                toast.success("User updated successfully");
            }
        } catch (error) {
            console.error("Error updating user:", error);
            toast.error("Failed to update user");
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await axiosPublic.delete(`/users/${userToDelete.userId}`);
            if (response.status === 200) {
                fetchUsers();
                setIsConfirmModalOpen(false);
                toast.success("User deleted successfully");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Failed to delete user");
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white p-6">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-cyan-900">User Management</h1>
                        <p className="text-gray-600 mt-2">Manage system users and roles</p>
                    </div>

                    {/* Role Filter */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setUserRole('ATTENDEE')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${userRole === 'ATTENDEE'
                                ? 'bg-cyan-900 text-white'
                                : 'bg-white border border-cyan-200 text-cyan-900 hover:bg-cyan-50'
                                }`}
                        >
                            <FiUsers className="inline-block mr-2" />
                            Attendees
                        </button>
                        <button
                            onClick={() => setUserRole('ORGANIZER')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${userRole === 'ORGANIZER'
                                ? 'bg-cyan-900 text-white'
                                : 'bg-white border border-cyan-200 text-cyan-900 hover:bg-cyan-50'
                                }`}
                        >
                            <FiUser className="inline-block mr-2" />
                            Organizers
                        </button>
                    </div>

                </div>

                {/* Search and Filter Section */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-cyan-100">
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search users by name or email..."
                            className="w-full pl-10 pr-4 py-2 border border-cyan-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-900"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Users List */}
                <div className="space-y-4 min-h-[70vh]">
                    {currentUsers.map((user) => (
                        <div
                            key={user.userId}
                            className="bg-white rounded-lg shadow-md border border-cyan-100 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => handleUserClick(user)}
                        >
                            <div className="flex flex-col md:flex-row items-center p-4">
                                {/* User Avatar */}
                                <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-full bg-cyan-100 overflow-hidden">
                                    <img
                                        src={user.avatarUrl || '/api/placeholder/200/200'}
                                        alt={`${user.firstName} ${user.lastName}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* User Details */}
                                <div className="flex-1 p-4 md:p-6">
                                    <div className="flex flex-col md:flex-row justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="px-3 py-1 bg-cyan-100 text-cyan-900 rounded-full text-sm">
                                                    {user.role.charAt(0) + user.role.slice(1).toLowerCase()}
                                                </span>
                                                {/* <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                                    {user.events?.length || 0} Events
                                                </span> */}
                                            </div>
                                            <h3 className="text-xl font-semibold text-cyan-900 mb-1">{user.firstName} {user.lastName}</h3>
                                            <div className="flex items-center text-gray-600 mb-1">
                                                <FiMail className="mr-2" />
                                                <span>{user.email}</span>
                                            </div>
                                        </div>
                                        {/* <div className="flex gap-2 mt-3 md:mt-0">
                                            <button
                                                onClick={(e) => handleEditClick(e, user)}
                                                className="p-2 bg-cyan-50 text-cyan-900 rounded-lg hover:bg-cyan-100"
                                            >
                                                <FiEdit />
                                            </button>
                                            <button
                                                onClick={(e) => handleDeleteClick(e, user)}
                                                className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div> */}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                                        <div className="flex items-center text-gray-600">
                                            <FiCalendar className="mr-2" />
                                            <span>Joined: {formatDate(user.createdAt)}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <FiCalendar className="mr-2" />
                                            <span>Birth: {formatDate(user.birth)}</span>
                                        </div>
                                        {user.address && (
                                            <div className="flex items-center text-gray-600">
                                                <FiMapPin className="mr-2" />
                                                <span className="truncate">{user.address}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Empty State */}
                    {filteredUsers.length === 0 && (
                        <div className="text-center py-12 bg-white rounded-lg border border-cyan-100 flex flex-col items-center">
                            <div className="text-5xl text-cyan-900 mx-auto mb-4">
                                {userRole === 'ATTENDEE' ? <FiUsers /> : <FiUser />}
                            </div>
                            <h3 className="text-xl font-semibold text-cyan-900 mb-2">No users found</h3>
                            <p className="text-gray-600">
                                {searchTerm
                                    ? `No matching ${userRole.toLowerCase()}s for "${searchTerm}"`
                                    : `There are no ${userRole.toLowerCase()}s in the system.`
                                }
                            </p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {filteredUsers.length > 0 && (
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
                            disabled={indexOfLastUser >= filteredUsers.length}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>

            {/* // User Details Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-lg bg-white">
                    {selectedUser && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-3xl font-bold text-cyan-900">
                                    User Profile
                                </DialogTitle>
                            </DialogHeader>

                            <div className="mt-4 space-y-6">
                                {/* User Profile Header */}
                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    <div className="w-32 h-32 rounded-full overflow-hidden bg-cyan-100">
                                        <img
                                            src={selectedUser.avatarUrl || '/api/placeholder/200/200'}
                                            alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="text-center md:text-left">
                                        <h2 className="text-2xl font-bold text-cyan-900">{selectedUser.firstName} {selectedUser.lastName}</h2>
                                        <div className="flex flex-col md:flex-row md:items-center gap-2 mt-2">
                                            <span className="px-3 py-1 bg-cyan-100 text-cyan-900 rounded-full text-sm inline-block">
                                                {selectedUser.role.charAt(0) + selectedUser.role.slice(1).toLowerCase()}
                                            </span>
                                            <span className="text-gray-600">{selectedUser.email}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* User Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-cyan-50 p-4 rounded-lg">
                                    <div>
                                        <h3 className="text-lg font-semibold text-cyan-900 mb-3">Personal Information</h3>
                                        <div className="space-y-2">
                                            <div>
                                                <span className="text-gray-600 font-medium">Gender:</span>
                                                <span className="ml-2">{selectedUser.gender ? 'Male' : 'Female'}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-600 font-medium">Birth:</span>
                                                <span className="ml-2">{formatDate(selectedUser.birth)}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-600 font-medium">Address:</span>
                                                <span className="ml-2">{selectedUser.address || 'Not provided'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-cyan-900 mb-3">Account Information</h3>
                                        <div className="space-y-2">
                                            <div>
                                                <span className="text-gray-600 font-medium">User ID:</span>
                                                <span className="ml-2">{selectedUser.userId}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-600 font-medium">Joined:</span>
                                                <span className="ml-2">{formatDate(selectedUser.createdAt)}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-600 font-medium">Last Updated:</span>
                                                <span className="ml-2">{formatDate(selectedUser.updatedAt)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bio Section */}
                                {selectedUser.bio && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-cyan-900 mb-2">Bio</h3>
                                        <p className="text-gray-700 bg-white p-4 rounded-lg border border-cyan-100">
                                            {selectedUser.bio}
                                        </p>
                                    </div>
                                )}

                                {/* Event Statistics */}
                                <div>
                                    <h3 className="text-lg font-semibold text-cyan-900 mb-3">Activity Summary</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* <div className="bg-white p-4 rounded-lg border border-cyan-100 text-center">
                                            <p className="text-3xl font-bold text-cyan-900">{selectedUser.events?.length || 0}</p>
                                            <p className="text-gray-600">
                                                {userRole === 'ORGANIZER' ? 'Events Created' : 'Events Attended'}
                                            </p>
                                        </div> */}
                                        {userRole === 'ATTENDEE' && (
                                            <>
                                                <div className="bg-white p-4 rounded-lg border border-cyan-100 text-center">
                                                    <p className="text-3xl font-bold text-cyan-900">5</p>
                                                    <p className="text-gray-600">Reviews Written</p>
                                                </div>
                                                <div className="bg-white p-4 rounded-lg border border-cyan-100 text-center">
                                                    <p className="text-3xl font-bold text-cyan-900">3</p>
                                                    <p className="text-gray-600">Upcoming Events</p>
                                                </div>
                                            </>
                                        )}
                                        {userRole === 'ORGANIZER' && (
                                            <>
                                                <div className="bg-white p-4 rounded-lg border border-cyan-100 text-center">
                                                    <p className="text-3xl font-bold text-cyan-900">85%</p>
                                                    <p className="text-gray-600">Approval Rate</p>
                                                </div>
                                                <div className="bg-white p-4 rounded-lg border border-cyan-100 text-center">
                                                    <p className="text-3xl font-bold text-cyan-900">4.8</p>
                                                    <p className="text-gray-600">Average Rating</p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            {/* Edit User Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="max-w-md p-6 rounded-lg shadow-lg bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-cyan-900">
                            Edit User
                        </DialogTitle>
                    </DialogHeader>

                    {editedUser && (
                        <div className="space-y-4 mt-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input
                                        type="text"
                                        value={editedUser.firstName}
                                        onChange={(e) => setEditedUser({ ...editedUser, firstName: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        value={editedUser.lastName}
                                        onChange={(e) => setEditedUser({ ...editedUser, lastName: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={editedUser.email}
                                    onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <input
                                    type="text"
                                    value={editedUser.address || ''}
                                    onChange={(e) => setEditedUser({ ...editedUser, address: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                <textarea
                                    value={editedUser.bio || ''}
                                    onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    rows={3}
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Birth Date</label>
                                    <input
                                        type="date"
                                        value={editedUser.birth || ''}
                                        onChange={(e) => setEditedUser({ ...editedUser, birth: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                    <select
                                        value={editedUser.gender ? 'true' : 'false'}
                                        onChange={(e) => setEditedUser({ ...editedUser, gender: e.target.value === 'true' })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="true">Male</option>
                                        <option value="false">Female</option>
                                    </select>
                                </div>
                            </div>

                            <DialogFooter className="flex justify-end gap-3 mt-6">
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleEditSave}
                                    className="px-4 py-2 bg-cyan-900 text-white rounded-lg hover:bg-cyan-800"
                                >
                                    Save Changes
                                </button>
                            </DialogFooter>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
                <DialogContent className="max-w-md p-6 rounded-lg shadow-lg bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-red-600">
                            Confirm Deletion
                        </DialogTitle>
                    </DialogHeader>

                    {userToDelete && (
                        <div className="mt-4">
                            <p className="text-gray-700">
                                Are you sure you want to delete the user <span className="font-semibold">{userToDelete.firstName} {userToDelete.lastName}</span>?
                            </p>
                            <p className="text-gray-700 mt-2">This action cannot be undone.</p>

                            <DialogFooter className="flex justify-end gap-3 mt-6">
                                <button
                                    onClick={() => setIsConfirmModalOpen(false)}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteConfirm}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                >
                                    Delete User
                                </button>
                            </DialogFooter>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

        </div>
    );
};

export default AdminUserManagement;