import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
    FiPlus,
    FiTrash2,
    FiImage,
    FiArrowLeft,
    FiArrowRight,
    FiCheck,
    FiUpload
} from 'react-icons/fi';
import { toast } from "react-toastify";
const CreateEventForm = ({ onClose }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Basic Info
        eventName: '',
        eventDescription: '',
        eventType: '',
        eventLocation: '',
        eventDate: '',
        totalTickets: 0,

        // Arrays
        speakers: [],
        packagePrices: [],
        photoEvents: []
    });
    // Basic Info handlers
    const handleBasicInfoChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    // Speakers handlers
    const addSpeaker = () => {
        setFormData(prev => ({
            ...prev,
            speakers: [...prev.speakers, {
                speakerName: '',
                speakerCareer: '',
                speakerImageUrl: ''
            }]
        }));
    };
    const updateSpeaker = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            speakers: prev.speakers.map((speaker, i) =>
                i === index ? { ...speaker, [field]: value } : speaker
            )
        }));
    };
    const removeSpeaker = (index) => {
        setFormData(prev => ({
            ...prev,
            speakers: prev.speakers.filter((_, i) => i !== index)
        }));
    };
    // Package handlers
    const addPackage = () => {
        setFormData(prev => ({
            ...prev,
            packagePrices: [...prev.packagePrices, {
                packageName: '',
                packagePrice: 0,
                totalTickets: 0,
                benefits: []
            }]
        }));
    };
    const updatePackage = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            packagePrices: prev.packagePrices.map((pkg, i) =>
                i === index ? { ...pkg, [field]: value } : pkg
            )
        }));
    };
    const removePackage = (index) => {
        setFormData(prev => ({
            ...prev,
            packagePrices: prev.packagePrices.filter((_, i) => i !== index)
        }));
    };
    // Photo handlers
    const addPhoto = (url) => {
        setFormData(prev => ({
            ...prev,
            photoEvents: [...prev.photoEvents, url]
        }));
    };
    const removePhoto = (index) => {
        setFormData(prev => ({
            ...prev,
            photoEvents: prev.photoEvents.filter((_, i) => i !== index)
        }));
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        {/* Header Section */}
                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold text-cyan-900">Basic Information</h3>
                        </div>

                        {/* Form Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Event Name - Full Width */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-cyan-900 mb-2">
                                    Event Name
                                </label>
                                <input
                                    type="text"
                                    name="eventName"
                                    value={formData.eventName}
                                    onChange={handleBasicInfoChange}
                                    placeholder="Enter event name"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-900 focus:border-cyan-900"
                                />
                            </div>

                            {/* Event Type */}
                            <div>
                                <label className="block text-sm font-semibold text-cyan-900 mb-2">
                                    Event Type
                                </label>
                                <select
                                    name="eventType"
                                    value={formData.eventType}
                                    onChange={handleBasicInfoChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-900 focus:border-cyan-900"
                                >
                                    <option value="">Select Type</option>
                                    <option value="CONFERENCE">Conference</option>
                                    <option value="WORKSHOP">Workshop</option>
                                    <option value="SEMINAR">Seminar</option>
                                </select>
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-sm font-semibold text-cyan-900 mb-2">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    name="eventLocation"
                                    value={formData.eventLocation}
                                    onChange={handleBasicInfoChange}
                                    placeholder="Enter event location"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-900 focus:border-cyan-900"
                                />
                            </div>

                            {/* Description - Full Width */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-cyan-900 mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="eventDescription"
                                    value={formData.eventDescription}
                                    onChange={handleBasicInfoChange}
                                    rows={4}
                                    placeholder="Describe your event"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-900 focus:border-cyan-900"
                                />
                            </div>

                            {/* Date & Time Section */}
                            <div>
                                <label className="block text-sm font-semibold text-cyan-900 mb-2">
                                    Start Date & Time
                                </label>
                                <input
                                    type="datetime-local"
                                    name="startDate"
                                    value={formData.startDate || ""}
                                    onChange={handleBasicInfoChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-900 focus:border-cyan-900"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-cyan-900 mb-2">
                                    End Date & Time
                                </label>
                                <input
                                    type="datetime-local"
                                    name="endDate"
                                    value={formData.endDate || ""}
                                    onChange={handleBasicInfoChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-900 focus:border-cyan-900"
                                />
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6">
                        {/* Header */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-2xl font-semibold text-cyan-900">Speakers</h3>
                                </div>
                                <button
                                    onClick={addSpeaker}
                                    type="button"
                                    className="flex items-center gap-2 px-4 py-2 bg-cyan-900 text-white rounded-lg hover:bg-cyan-800 transition-colors duration-300"
                                >
                                    <FiPlus className="w-5 h-5" /> Add Speaker
                                </button>
                            </div>
                        </div>

                        {/* Speakers List */}
                        <div className="space-y-6">
                            {formData.speakers.map((speaker, index) => (
                                <Card key={index} className="border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-center mb-6">
                                            <h4 className="text-lg font-semibold text-cyan-900">Speaker {index + 1}</h4>
                                            <button
                                                onClick={() => removeSpeaker(index)}
                                                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors duration-300"
                                            >
                                                <FiTrash2 className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                                            {/* Image Upload - Now First Column */}
                                            <div className="relative">
                                                <label className="block text-sm font-medium text-cyan-900 mb-2">
                                                    Profile Picture
                                                </label>
                                                <div className="relative group">
                                                    <div className="w-3/4 aspect-square bg-gray-100 rounded-lg overflow-hidden">
                                                        {speaker.speakerImage ? (
                                                            <img
                                                                src={speaker.speakerImage}
                                                                alt={speaker.speakerName || `Speaker ${index + 1}`}
                                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-300">
                                                                <FiUpload className="w-8 h-8 text-gray-400" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            const file = e.target.files[0];
                                                            if (file) {
                                                                const reader = new FileReader();
                                                                reader.onloadend = () => {
                                                                    updateSpeaker(index, 'speakerImage', reader.result);
                                                                };
                                                                reader.readAsDataURL(file);
                                                            }
                                                        }}
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                    />
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    Max: 5MB (Square image)
                                                </p>
                                            </div>

                                            {/* Speaker Details - Now Second and Third Columns */}
                                            <div className="md:col-span-2 space-y-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-cyan-900 mb-2">
                                                        Full Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter speaker's name"
                                                        value={speaker.speakerName}
                                                        onChange={(e) => updateSpeaker(index, 'speakerName', e.target.value)}
                                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-900 focus:border-cyan-900 transition-colors duration-300"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-cyan-900 mb-2">
                                                        Career / Position
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter speaker's profession"
                                                        value={speaker.speakerCareer}
                                                        onChange={(e) => updateSpeaker(index, 'speakerCareer', e.target.value)}
                                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-900 focus:border-cyan-900 transition-colors duration-300"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            {/* Empty State */}
                            {formData.speakers.length === 0 && (
                                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg hover:border-cyan-900 transition-colors duration-300">
                                    <FiPlus className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-2 text-lg font-medium text-cyan-900">No speakers added</h3>
                                    <p className="mt-1 text-gray-500">Add speakers to your event</p>
                                    <button
                                        onClick={addSpeaker}
                                        className="mt-4 px-4 py-2 bg-cyan-900 text-white rounded-lg hover:bg-cyan-800 transition-colors duration-300"
                                    >
                                        Add Your First Speaker
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-6">
                        {/* Header */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-2xl font-semibold text-cyan-900">Packages</h3>
                                </div>
                                <button
                                    onClick={addPackage}
                                    type="button"
                                    className="flex items-center gap-2 px-4 py-2 bg-cyan-900 text-white rounded-lg hover:bg-cyan-800 transition-colors duration-300"
                                >
                                    <FiPlus className="w-5 h-5" /> Add Package
                                </button>
                            </div>
                        </div>

                        {/* Packages List */}
                        <div className="space-y-6">
                            {formData.packagePrices.map((pkg, index) => (
                                <Card key={index} className="border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-center mb-6">
                                            <h4 className="text-lg font-semibold text-cyan-900">Package {index + 1}</h4>
                                            <button
                                                onClick={() => removePackage(index)}
                                                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors duration-300"
                                            >
                                                <FiTrash2 className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-cyan-900 mb-2">Package Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter package name"
                                                    value={pkg.packageName}
                                                    onChange={(e) => updatePackage(index, 'packageName', e.target.value)}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-900 focus:border-cyan-900 transition-colors duration-300"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-cyan-900 mb-2">Price</label>
                                                <input
                                                    type="number"
                                                    placeholder="Enter price"
                                                    value={pkg.packagePrice}
                                                    onChange={(e) => updatePackage(index, 'packagePrice', e.target.value)}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-900 focus:border-cyan-900 transition-colors duration-300"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-cyan-900 mb-2">Total Tickets</label>
                                                <input
                                                    type="number"
                                                    placeholder="Enter total tickets"
                                                    value={pkg.totalTickets}
                                                    onChange={(e) => updatePackage(index, 'totalTickets', e.target.value)}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-900 focus:border-cyan-900 transition-colors duration-300"
                                                />
                                            </div>
                                        </div>

                                        {/* Benefits List */}
                                        <div className="mt-4">
                                            <h5 className="text-lg font-semibold text-cyan-900 mb-3">Benefits</h5>
                                            <div className="space-y-3">
                                                {pkg.benefits.map((benefit, benefitIndex) => (
                                                    <div key={benefitIndex} className="flex justify-between items-center p-2 bg-gray-100 rounded-lg shadow-sm">
                                                        <span className="text-gray-800">{benefit}</span>
                                                        <button
                                                            onClick={() => {
                                                                const updatedBenefits = pkg.benefits.filter((_, i) => i !== benefitIndex);
                                                                updatePackage(index, 'benefits', updatedBenefits);
                                                            }}
                                                            className="text-red-500 hover:text-red-700 transition-colors duration-300"
                                                            aria-label="Remove benefit"
                                                        >
                                                            <FiTrash2 />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex items-center mt-4">
                                                <input
                                                    type="text"
                                                    placeholder="Add benefit"
                                                    onChange={(e) => updatePackage(index, 'newBenefit', e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            if (pkg.newBenefit) {
                                                                updatePackage(index, 'benefits', [...pkg.benefits, pkg.newBenefit]);
                                                                updatePackage(index, 'newBenefit', ''); // Reset trường nhập liệu
                                                            } else {
                                                                toast.error("Type benefit first!");
                                                            }
                                                        }
                                                    }}
                                                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-900 focus:border-cyan-900 transition-colors duration-300"
                                                />
                                                <button
                                                    onClick={() => {
                                                        if (pkg.newBenefit) {
                                                            updatePackage(index, 'benefits', [...pkg.benefits, pkg.newBenefit]);
                                                            updatePackage(index, 'newBenefit', ''); // Reset trường nhập liệu
                                                        } else {
                                                            toast.error("Type benefit first!");
                                                        }
                                                    }}
                                                    type="button"
                                                    className="ml-3 px-4 py-2 bg-cyan-900 text-white rounded-lg hover:bg-cyan-800 transition-colors duration-300"
                                                >
                                                    Add Benefit
                                                </button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            {/* Empty State */}
                            {formData.packagePrices.length === 0 && (
                                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg hover:border-cyan-900 transition-colors duration-300">
                                    <FiPlus className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-2 text-lg font-medium text-cyan-900">No packages added</h3>
                                    <p className="mt-1 text-gray-500">Add packages to your event</p>
                                    <button
                                        onClick={addPackage}
                                        className="mt-4 px-4 py-2 bg-cyan-900 text-white rounded-lg hover:bg-cyan-800 transition-colors duration-300"
                                    >
                                        Add Your First Package
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold text-cyan-900 mb-4">Event Photos</h3>
                        <p className="text-gray-600">
                            Upload more photos to promote your event and capture unforgettable moments!
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {formData.photoEvents.map((photo, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={photo}
                                        alt={`Event photo ${index + 1}`}
                                        className="w-full h-48 object-cover rounded-lg shadow-lg transition-transform duration-300 transform group-hover:scale-105"
                                    />
                                    <button
                                        onClick={() => removePhoto(index)}
                                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
                                        aria-label="Remove photo"
                                    >
                                        <FiTrash2 />
                                    </button>
                                </div>
                            ))}
                            <div
                                onClick={() => document.getElementById('photo-upload').click()}
                                className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors duration-300"
                            >
                                <div className="text-center">
                                    <FiPlus className="mx-auto text-3xl text-gray-400" />
                                    <span className="text-sm text-gray-500">Add Photos</span>
                                </div>
                                <input
                                    id="photo-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    multiple
                                    onChange={(e) => {
                                        const files = Array.from(e.target.files);
                                        files.forEach(file => {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                addPhoto(reader.result);
                                            };
                                            reader.readAsDataURL(file);
                                        });
                                        e.target.value = ''; // Reset input field
                                    }}
                                />
                            </div>
                        </div>
                        {formData.photoEvents.length > 0 && (
                            <div className="mt-4 text-gray-600">
                                <span>{formData.photoEvents.length} photo(s) uploaded</span>
                            </div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onClose();
        // Handle form submission
        console.log(formData);
    };
    return (
        <div className="max-w-4xl mx-auto p-4 z-100">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className='text-3xl font-semibold justify-between flex mx-2'>
                    <p>Create Event Form</p>
                    <button className='text-4xl mr-3' onClick={close}>X</button>
                </div>
                {/* Progress indicator */}
                <div className="flex justify-between m-8">
                    {[1, 2, 3, 4].map((step) => (
                        <div
                            key={step}
                            className={`flex items-center ${step !== 4 ? 'flex-1' : ''}`}
                        >
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200'
                                    }`}
                            >
                                {step}
                            </div>
                            {step !== 4 && (
                                <div
                                    className={`flex-1 h-1 mx-2 ${step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                                        }`}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Step content */}
                <Card className="p-6">
                    <CardContent>
                        {renderStep()}
                    </CardContent>
                </Card>

                {/* Navigation buttons */}
                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={() => setCurrentStep(prev => prev - 1)}
                        className={`flex items-center gap-2 px-4 py-2 border rounded-lg ${currentStep === 1 ? 'invisible' : ''
                            }`}
                    >
                        <FiArrowLeft /> Previous
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            if (currentStep === 4) {
                                handleSubmit(new Event('submit'));
                            } else {
                                setCurrentStep(prev => prev + 1);
                            }
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        {currentStep === 4 ? (
                            <>
                                <FiCheck /> Submit
                            </>
                        ) : (
                            <>
                                Next <FiArrowRight />
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateEventForm;