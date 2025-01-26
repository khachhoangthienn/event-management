import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import {
    FaLinkedin, FaTwitter, FaGithub, FaGlobe,
    FaEnvelope, FaBirthdayCake, FaHome, FaTransgender,
    FaLock, FaEdit, FaSave, FaTimes
} from "react-icons/fa";
import MessagePopup from "./MessagePopup";
import axiosInstance from "@/axiosConfig";

const UserProfile = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [editedInfo, setEditedInfo] = useState(null);
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: ''
    });
    const { info, setInfo } = useContext(UserContext);
    const [showPopup, setShowPopup] = useState(false);


    useEffect(() => {
        if (!info) return;
        setEditedInfo({ ...info });
        setIsLoading(false);
    }, [info]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const updateUserInfo = async () => {
        try {
            const response = await axiosInstance.put("/users/me", {
                ...editedInfo,
            });
            if (response.status === 200) {
                const result = await response.data.result;
                localStorage.setItem("userInfo", JSON.stringify(result));
                setInfo(result);
                setShowPopup(true);
            }
        } catch (error) {
            if (error.response) {
                const { code, message } = error.response.data;
            } else {
                console.error("Error:", error.message);
                alert("Login failed: " + error.message);
            }
        }
    };

    const saveChanges = () => {
        if (editedInfo.firstName === ''
            || editedInfo.lastName === ''
            || editedInfo.bio === '' ||
            editedInfo.email === '' || editedInfo.birth === ''
            || editedInfo.address === '' || editedInfo.gender === '') {
            return;
        }
        updateUserInfo();
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setIsEditMode(false);

    };

    const cancelEdit = () => {
        setEditedInfo({ ...info });
        setIsEditMode(false);
    };

    const handlePasswordChange = () => {
        // TODO: Implement actual password change logic
        console.log('Changing password', passwordData);
        setIsPasswordModalOpen(false);
        setPasswordData({ oldPassword: '', newPassword: '' });
    };

    if (isLoading || !editedInfo) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 flex items-center justify-center">
                <div className="animate-pulse text-center">
                    <div className="h-52 w-52 mx-auto rounded-full bg-gray-300 mb-6 shadow-lg"></div>
                    <div className="h-10 w-72 mx-auto bg-gray-300 rounded mb-4"></div>
                    <div className="h-6 w-56 mx-auto bg-gray-300 rounded"></div>
                </div>
            </div>
        );
    }

    console.log(editedInfo);
    return (

        <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 py-12 flex flex-col items-center">
            {showPopup && <MessagePopup message="Update information successfully!" onClose={handleClosePopup} />}
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-cyan-900 to-cyan-400 text-white p-8 text-center relative">
                        <div className="absolute top-4 right-4 flex space-x-2">
                            {isEditMode ? (
                                <>
                                    <button
                                        onClick={cancelEdit}
                                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                    >
                                        <FaTimes />
                                    </button>
                                    <button
                                        onClick={saveChanges}
                                        className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
                                    >
                                        <FaSave />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setIsEditMode(true)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
                                    >
                                        <FaEdit className="mr-2" /> Edit Profile
                                    </button>
                                    <button
                                        onClick={() => setIsPasswordModalOpen(true)}
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center"
                                    >
                                        <FaLock className="mr-2" /> Change Password
                                    </button>
                                </>
                            )}
                        </div>

                        <div className="text-center">
                            <img
                                src={info.avatarUrl || "https://images.unsplash.com/photo-1633332755192-727a05c4013d"}
                                alt="Profile"
                                className="w-52 h-52 rounded-full mx-auto object-cover border-4 border-white shadow-lg mb-4"
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d";
                                }}
                            />
                            {isEditMode ? (
                                <div className="flex flex-row justify-center items-center gap-4">
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={editedInfo.firstName}
                                        onChange={handleInputChange}
                                        className="text-4xl font-bold text-center bg-transparent border-b-2 border-white text-white mb-2 w-1/4"
                                    />
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={editedInfo.lastName}
                                        onChange={handleInputChange}
                                        className="text-4xl font-bold text-center bg-transparent border-b-2 border-white text-white mb-2 w-1/4"
                                    />

                                </div>
                            ) : (
                                <>
                                    <h1 className="text-4xl font-bold">{info.firstName} {info.lastName}</h1>
                                </>
                            )}
                            <h2 className="text-xl opacity-80 mt-2">{info.role}</h2>

                        </div>
                    </div>

                    {/* Rest of the profile content */}
                    <div className="md:flex">
                        {/* Social Links Section */}
                        <div className="md:w-1/3 bg-cyan-50 p-6 flex flex-col items-center">
                            <div className="flex space-x-6 mb-6">
                                {[
                                    { Icon: FaLinkedin, color: "text-blue-600" },
                                    { Icon: FaTwitter, color: "text-blue-400" },
                                    { Icon: FaGithub, color: "text-gray-900" },
                                    { Icon: FaGlobe, color: "text-green-600" }
                                ].map(({ Icon, color }, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        className={`${color} hover:scale-110 transition-transform`}
                                    >
                                        <Icon size={28} />
                                    </a>
                                ))}
                            </div>

                            {/* Bio Section */}
                            <div className="text-center">
                                <h3 className="text-2xl font-semibold text-cyan-800 mb-4">About Me</h3>
                                {isEditMode ? (
                                    <textarea
                                        name="bio"
                                        value={editedInfo.bio}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg text-gray-600 italic"
                                        rows="4"
                                    />
                                ) : (
                                    <p className="text-gray-600 italic">{info.bio}</p>
                                )}
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="md:w-2/3 p-8">
                            <h3 className="text-3xl font-bold text-cyan-800 mb-6 border-b-2 border-cyan-500 pb-2">Personal Information</h3>

                            <div className="grid gap-6">
                                {[
                                    {
                                        name: 'email',
                                        Icon: FaEnvelope,
                                        title: "Email",
                                    },
                                    {
                                        name: 'birth',
                                        Icon: FaBirthdayCake,
                                        title: "Date of Birth",
                                    },
                                    {
                                        name: 'address',
                                        Icon: FaHome,
                                        title: "Address",
                                    },
                                    {
                                        name: 'gender',
                                        Icon: FaTransgender,
                                        title: "Gender",
                                    }
                                ].map(({ name, Icon, title }, index) => (
                                    <div
                                        key={index}
                                        className="bg-white border border-cyan-100 rounded-lg p-4 hover:shadow-md transition-shadow flex items-center"
                                    >
                                        <div className="mr-4 text-cyan-600">
                                            <Icon size={24} />
                                        </div>
                                        <div className="flex-grow">
                                            <h4 className="text-lg font-semibold text-cyan-800">{title}</h4>
                                            {isEditMode ? (
                                                name === 'gender' ? (
                                                    <select
                                                        name={name}
                                                        value={editedInfo[name] === true ? 'true' : 'false'}
                                                        onChange={(e) =>
                                                            handleInputChange({
                                                                target: {
                                                                    name: e.target.name,
                                                                    value: e.target.value === 'true',
                                                                },
                                                            })
                                                        }
                                                        className="w-full border-b-2 border-cyan-500 focus:outline-none"
                                                    >
                                                        <option value="true">Men</option>
                                                        <option value="false">Women</option>
                                                    </select>
                                                ) : (
                                                    <input
                                                        type="text"
                                                        name={name}
                                                        value={editedInfo[name]}
                                                        onChange={handleInputChange}
                                                        className="w-full border-b-2 border-cyan-500 focus:outline-none"
                                                    />
                                                )
                                            ) : (
                                                <p className="text-gray-600">
                                                    {name === 'gender'
                                                        ? info.gender === true
                                                            ? "Men"
                                                            : "Women"
                                                        : info[name]}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Password Change Modal */}
            {isPasswordModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-xl shadow-2xl w-96">
                        <h2 className="text-2xl font-bold mb-6 text-cyan-800">Change Password</h2>
                        <div className="space-y-4">
                            <div className="flex items-center border rounded-lg">
                                <div className="p-2 bg-gray-100 rounded-l-lg">
                                    <FaLock className="text-gray-500" />
                                </div>
                                <input
                                    type="password"
                                    placeholder="Old Password"
                                    value={passwordData.oldPassword}
                                    onChange={(e) => setPasswordData(prev => ({
                                        ...prev,
                                        oldPassword: e.target.value
                                    }))}
                                    className="w-full p-2 rounded-r-lg"
                                />
                            </div>
                            <div className="flex items-center border rounded-lg">
                                <div className="p-2 bg-gray-100 rounded-l-lg">
                                    <FaLock className="text-gray-500" />
                                </div>
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData(prev => ({
                                        ...prev,
                                        newPassword: e.target.value
                                    }))}
                                    className="w-full p-2 rounded-r-lg"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => setIsPasswordModalOpen(false)}
                                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handlePasswordChange}
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Change Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;