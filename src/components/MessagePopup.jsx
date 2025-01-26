import React, { useState, useEffect } from 'react';

const MessagePopup = ({ message, onClose }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [message, onClose]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full text-center">
                <p className="text-lg text-gray-800">{message}</p>
                <button
                    onClick={() => onClose()}
                    className="mt-4 bg-cyan-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export default MessagePopup;
