import Header from '@/components/Header'
import React, { useContext, useEffect, useState } from 'react'
import { RiVipCrownLine } from "react-icons/ri";
import { FaStar } from "react-icons/fa6";
import { AiFillCaretRight } from "react-icons/ai";
import ReactCardFlip from 'react-card-flip';
import { use } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { SkeletonCard } from '@/components/SkeletonCard';
import { FaTicketAlt } from "react-icons/fa";
import axiosInstance, { axiosPublic } from '@/axiosConfig';
import { UserContext } from '@/context/UserContext';
import { toast } from 'react-toastify';


const PricingPlan = () => {
    const { eventId } = useParams();
    const [selectedPack, setSelectedPack] = useState(null);
    const { info } = useContext(UserContext)
    const [packInfo, setPackInfo] = useState(null)
    const [numTicket, setNumTicket] = useState(1)
    const [eventInfo, setEventInfo] = useState(null)
    const [paymentModal, setPaymentModal] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState('')

    useEffect(() => {
        const fetchEventInfo = async () => {
            try {
                const response = await axiosInstance.get(`/events/${eventId}`);
                if (response.status === 200) {
                    setEventInfo(response.data.result);
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
        fetchEventInfo()
    }, [])

    const paymentVNPayRequest = async () => {
        if (!info) {
            toast.error("Not found user!")
            return;
        }
        try {
            const response = await axiosInstance.get(`/payment/vn-pay?userId=${info.userId}&amount=${packInfo.packagePrice * numTicket}&bankCode=NCB&packageId=${selectedPack}&packageCount=${numTicket}`);
            if (response.status === 200) {
                console.log(response.data)
                // console.log("Payment URL: ", response.data.data.paymentUrl)
                window.location.href = response.data.data.paymentUrl
            }
        } catch (error) {
            console.log("this is error code: " + (error.response?.data?.code || "Unknown"));
            if (error.response) {
                const { code } = error.response.data;
                if (code === 404) {
                    console.error("Has an error! Please try again");
                } else if (code === 401) {
                    console.error("Unauthorized request.");
                }
            } else {
                console.error("Error:", error.message);
            }
        }
    };

    const paymentStripeRequest = async () => {
        if (!info) {
            toast.error("Session expire! Login again!")
            return;
        }
        try {
            const response = await axiosPublic.get(`/stripe/pay?userId=${info.userId}&packageId=${packInfo.packageId}&packageCount=${numTicket}`);
            if (response.status === 200) {
                console.log(response.data)
                // console.log("Payment URL: ", response.data.data.paymentUrl)
                window.location.href = response.data.data.paymentUrl
            }
        } catch (error) {
            console.log("this is error code: " + (error.response?.data?.code || "Unknown"));
            if (error.response) {
                const { code } = error.response.data;
                if (code === 404) {
                    console.error("Has an error! Please try again");
                } else if (code === 401) {
                    console.error("Unauthorized request.");
                }
            } else {
                console.error("Error:", error.message);
            }
        }
    };


    const handleFlip = (id) => {
        if (selectedPack === id) {
            setSelectedPack(null);
        } else {
            setNumTicket(1);
            setSelectedPack(id);
            setPackInfo(eventInfo.packagePrices.find(pack => pack.packageId === id));
        }
    };

    useEffect(() => {
        const hasReloaded = localStorage.getItem("hasReloaded");

        if (!hasReloaded) {
            localStorage.setItem("hasReloaded", "true");
            window.location.reload();
        } else {
            localStorage.removeItem("hasReloaded");
        }
    }, []);

    if (!eventInfo) return <SkeletonCard />

    return (
        <div>
            <Header type='Pricing Plan' />
            <div className='flex flex-col gap-2 justify-center items-center py-5'>
                <div className='text-center gap-4 md:gap-2 flex flex-col md:flex-row items-center w-full text-4xl font-semibold text-cyan-900 border-cyan-700 justify-center'>
                    <div className='flex flex-row gap-3 border-b-2 py-5'>
                        <FaTicketAlt />
                        <p className='text-left '>Ticket Plan: {eventInfo.eventName}</p>
                    </div>
                </div>
                <div className='flex flex-row gap-10 justify-center'>

                    {eventInfo.packagePrices.map((item, index) => (
                        <div key={item.packageId} className='border rounded-lg border-x-gray-300 bg-slate-50 relative min-h-[px] my-10 min-w-96 flex flex-col justify-between'>
                            <div className='flex text-orange-600 absolute right-2 top-1 gap-2'>
                                <FaStar size={25} />
                            </div>
                            <div className='absolute gap-4 border border-cyan-900 hover:text-cyan-900 hover:bg-white bg-cyan-900 duration-300  rounded-tr-2xl rounded-br-2xl w-fit h-14 left-0 top-8 flex justify-center items-center text-white font-semibold text-xl px-4'>
                                <RiVipCrownLine />
                                <p>{item.packageName}</p>
                            </div>
                            {/* content */}
                            <div className='w-full flex-col flex gap-5 pt-28 text-left justify-start px-5 text-xl text-cyan-900 pb-10 md:pb-5'>

                                <div className='flex items-center gap-2 text-cyan-900'>
                                    <p><span className='text-5xl text-red-700 font-semibold'>{item.packagePrice}$</span> /One Person</p>
                                </div>
                                {item.benefits.map((benefit, index) => (
                                    <div key={benefit.benefitId} className='flex gap-2 items-center'>
                                        <AiFillCaretRight />
                                        <p>{benefit.benefitDescription}</p>
                                    </div>
                                ))}
                            </div>
                            <div className='flex flex-col gap-3 mx-4 mb-3'>
                                <div className='flex items-center gap-2 pt-3'>
                                    <p className='text-lg font-semibold text-gray-600'>Tickets Remaining:</p>
                                    <span className={`px-3 py-1 rounded-full text-white font-bold ${item.availableTickets === 0 ? 'bg-red-600' : 'bg-green-600'}`}>
                                        {item.availableTickets}/{item.totalTickets}
                                    </span>
                                </div>

                                <ReactCardFlip
                                    key={item.packageId}
                                    isFlipped={selectedPack === item.packageId}
                                    flipDirection="vertical"
                                >
                                    {/* Mặt trước */}
                                    <div
                                        onClick={() => handleFlip(item.packageId)}
                                        className="gap-4 border-2 border-blue-950 bg-blue-950 rounded-tr-2xl hover:scale-110 cursor-pointer transition-all duration-300 rounded-2xl px-4 min-w-fit py-4 mb-2 flex justify-center items-center text-white font-semibold text-2xl"
                                    >
                                        <AiFillCaretRight />
                                        <p>Buy Ticket</p>
                                    </div>

                                    {/* Mặt sau */}
                                    <div className="relative bg-white border-red-700 border-2 rounded-tr-2xl rounded-2xl min-w-fit mb-2 flex justify-center items-center text-white font-semibold text-2xl">
                                        <div className="flex justify-center px-2 rounded-tr-lg rounded-br-lg py-4 w-1/2 cursor-pointer text-black">
                                            <div
                                                onClick={() => {
                                                    if (numTicket >= item.availableTickets) {
                                                        toast.error("Not enough tickets available")
                                                        return
                                                    }
                                                    setNumTicket(numTicket + 1)
                                                }}
                                                className="w-1/3 border-r-2 flex justify-center hover:text-red-700 select-none"
                                            >+</div>

                                            <div className="w-1/3 flex justify-center select-none">{numTicket}</div>

                                            <div
                                                onClick={() => setNumTicket(Math.max(numTicket - 1, 1))}
                                                className="w-1/3 border-l-2 flex justify-center hover:text-red-700 select-none"
                                            >-</div>
                                        </div>

                                        <div onClick={() => {
                                            if (numTicket > item.availableTickets) {
                                                toast.error("Not enough tickets available")
                                                return
                                            }
                                            setPaymentModal(true)
                                        }}
                                            className="flex justify-center px-2 border-l-2 border-red-700 bg-red-700 rounded-tr-xl rounded-br-xl py-4 w-1/2 cursor-pointer hover:text-red-700 hover:bg-white duration-300">
                                            Buy ticket
                                        </div>
                                    </div>
                                </ReactCardFlip>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

            {paymentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md transform transition-all duration-300 scale-100">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Choose a payment method</h2>
                            <button
                                onClick={() => setPaymentModal(false)}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div
                                onClick={() => setPaymentMethod('stripe')}
                                className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors group focus-within:ring-2 focus-within:ring-blue-500"
                            >
                                <input type="radio" name="payment" id="stripe" className="h-5 w-5 text-blue-600" />
                                <label htmlFor="stripe" className="ml-3 flex flex-1 items-center cursor-pointer">
                                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M13.5 3a1.5 1.5 0 0 1 1.5 1.5v1.5h5.25a.75.75 0 0 1 0 1.5H21v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-9h.75a.75.75 0 0 1 0-1.5H9V4.5A1.5 1.5 0 0 1 10.5 3h3zm-3 0a.75.75 0 0 0-.75.75V6h4.5V3.75a.75.75 0 0 0-.75-.75h-3z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Stripe</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Secure international payment</p>
                                    </div>
                                </label>
                            </div>

                            <div
                                onClick={() => setPaymentMethod("vnpay")}
                                className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-red-50 dark:hover:bg-gray-700 transition-colors group focus-within:ring-2 focus-within:ring-red-500"
                            >
                                <input type="radio" name="payment" id="vnpay" className="h-5 w-5 text-red-600" />
                                <label htmlFor="vnpay" className="ml-3 flex flex-1 items-center cursor-pointer">
                                    <div className="bg-red-500 text-white p-2 rounded-lg mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M2.273 5.625A4.483 4.483 0 0 0 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 0 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H15a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0A.75.75 0 0 0 9 9H5.25Z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-800 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">VNPay</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Domestic payment in Vietnam</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                if (paymentMethod == 'stripe') {
                                    paymentStripeRequest()
                                }
                                else if (paymentMethod == 'vnpay') {
                                    paymentVNPayRequest()
                                }
                                else {
                                    toast.warning("Please select a payment method to continue.");
                                }
                            }}
                            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Continue payment
                        </button>
                    </div>
                </div>
            )}


        </div>
    )
}

export default PricingPlan