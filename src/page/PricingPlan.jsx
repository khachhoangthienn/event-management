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

    const paymentRequest = async () => {
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
                                                onClick={() => setNumTicket(Math.max(numTicket - 1, 0))}
                                                className="w-1/3 border-l-2 flex justify-center hover:text-red-700 select-none"
                                            >-</div>
                                        </div>

                                        <div onClick={() => {
                                            if (numTicket > item.availableTickets) {
                                                toast.error("Not enough tickets available")
                                                return
                                            }
                                            paymentRequest()
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

        </div>
    )
}

export default PricingPlan