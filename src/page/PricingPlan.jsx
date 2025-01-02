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





const PricingPlan = () => {
    const [Flipped, setFlipped] = useState(0);
    const [numTicket, setNumTicket] = useState(1)
    const location = useLocation()
    const { eventInfo } = location.state || {}

    useEffect(() => {
        setNumTicket(1)
    }, [Flipped])


    const plusTicket = () => {
        if (numTicket === 10) return;
        setNumTicket(prev => prev + 1)
    }


    const minuteTicket = () => {
        if (numTicket === 1) return;
        setNumTicket(prev => prev - 1)
    }

    if (!eventInfo) return <SkeletonCard />

    return (
        <div>
            <Header type='Pricing Plan' />
            <div className='flex flex-col gap-2 justify-center items-center py-5'>
                <div className='text-center gap-4 md:gap-2 flex flex-col md:flex-row items-center w-full text-4xl font-semibold text-cyan-900 border-cyan-700 justify-center'>
                    <div className='flex flex-row gap-3 border-b-2 py-5'>
                        <FaTicketAlt />
                        <p className='text-left '>Ticket Plan: {eventInfo.name}</p>
                    </div>
                </div>
                <div className='flex flex-row gap-10 justify-center'>

                    <div className='border rounded-lg border-x-gray-300 bg-slate-50 relative h-fit my-10 min-w-96'>
                        <div className='flex text-orange-600 absolute right-2 top-1 gap-2'>
                            <FaStar size={25} />
                        </div>
                        <div className='absolute gap-4 border border-blue-800 hover:text-cyan-900 hover:bg-white bg-blue-800 duration-300  rounded-tr-2xl rounded-br-2xl w-fit h-14 left-0 top-8 flex justify-center items-center text-white font-semibold text-xl px-4'>
                            <RiVipCrownLine />
                            <p>Basic Packages</p>
                        </div>
                        {/* content */}
                        <div className='w-full flex-col flex gap-5 pt-28 text-left justify-start px-5 min-h-80 text-xl text-cyan-900 pb-10 md:pb-5'>

                            <div className='flex items-center gap-2 text-cyan-900'>
                                <p><span className='text-5xl text-red-700 font-semibold'>20$</span> /One Person</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <AiFillCaretRight />
                                <p>Regular Seating</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <AiFillCaretRight />
                                <p>Comfortable Sleeping</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <AiFillCaretRight />
                                <p>Afternoon Snacks</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <AiFillCaretRight />
                                <p>Afternoon Entrance</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <AiFillCaretRight />
                                <p>Idea shareing</p>
                            </div>

                            <ReactCardFlip isFlipped={Flipped === 1} flipDirection="vertical">
                                <div onClick={() => setFlipped(1)} className='gap-4 border-2 border-blue-950 bg-blue-950 rounded-tr-2xl hover:scale-110 cursor-pointer transition-all duration-300 rounded-2xl px-4 min-w-fit py-4 mb-2 flex justify-center items-center text-white font-semibold text-2xl'>
                                    <AiFillCaretRight />
                                    <p>Buy Ticket</p>
                                </div>
                                <div className='relative bg-white border-red-700 border-2 rounded-tr-2xl rounded-2xl min-w-fit mb-2 flex justify-center items-center text-white font-semibold text-2xl'>
                                    <div className='flex justify-center px-2 rounded-tr-lg rounded-br-lg py-4 w-1/2 cursor-pointer text-black'>
                                        <div onClick={plusTicket} className='w-1/3 border-r-2 flex justify-center hover:text-red-700 select-none'>+</div>
                                        <div className='w-1/3 flex justify-center select-none'>{numTicket}</div>
                                        <div onClick={minuteTicket} className='w-1/3 border-l-2 flex justify-center hover:text-red-700 select-none'>-</div>
                                    </div>

                                    <div className='flex justify-center px-2 border-l-2 border-red-700 bg-red-700 rounded-tr-xl rounded-br-xl py-4 w-1/2 cursor-pointer hover:text-red-700 hover:bg-white duration-300'>Buy ticket</div>
                                </div>
                            </ReactCardFlip>

                        </div>
                    </div>
                    <div className='border rounded-lg border-x-gray-300 bg-slate-50 relative h-fit my-10 min-w-96'>
                        <div className='flex text-orange-600 absolute right-2 top-1 gap-2'>
                            <FaStar size={25} />
                            <FaStar size={25} />
                        </div>
                        <div className='absolute gap-4 border border-blue-800 hover:text-cyan-900 hover:bg-white bg-blue-800 duration-300  rounded-tr-2xl rounded-br-2xl  h-14 left-0 top-8 flex justify-center items-center text-white font-semibold text-xl px-4 w-fit'>
                            <RiVipCrownLine />
                            <p>Standard Packages</p>
                        </div>
                        <div className='w-full flex-col flex gap-5 pt-28 text-left justify-start px-5 min-h-80 text-xl text-cyan-900 pb-10 md:pb-5'>

                            <div className='flex items-center gap-2 text-cyan-900'>
                                <p><span className='text-5xl  text-red-700 font-semibold'>20$</span> /One Person</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <AiFillCaretRight />
                                <p>Regular Seating</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <AiFillCaretRight />
                                <p>Comfortable Sleeping</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <AiFillCaretRight />
                                <p>Afternoon Snacks</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <AiFillCaretRight />
                                <p>Afternoon Entrance</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <AiFillCaretRight />
                                <p>Idea shareing</p>
                            </div>

                            <ReactCardFlip isFlipped={Flipped === 2} flipDirection="vertical">
                                <div onClick={() => setFlipped(2)} className='gap-4 border-2 border-blue-950 bg-blue-950 rounded-tr-2xl hover:scale-110 cursor-pointer transition-all duration-300 rounded-2xl px-4 min-w-fit py-4 mb-2 flex justify-center items-center text-white font-semibold text-2xl'>
                                    <AiFillCaretRight />
                                    <p>Buy Ticket</p>
                                </div>
                                <div className='relative bg-white border-red-700 border-2 rounded-tr-2xl rounded-2xl min-w-fit mb-2 flex justify-center items-center text-white font-semibold text-2xl'>
                                    <div className='flex justify-center px-2 rounded-tr-lg rounded-br-lg py-4 w-1/2 cursor-pointer text-black'>
                                        <div onClick={plusTicket} className='w-1/3 border-r-2 flex justify-center hover:text-red-700 select-none'>+</div>
                                        <div className='w-1/3 flex justify-center select-none'>{numTicket}</div>
                                        <div onClick={minuteTicket} className='w-1/3 border-l-2 flex justify-center hover:text-red-700 select-none'>-</div>
                                    </div>

                                    <div className='flex justify-center px-2 border-l-2 border-red-700 bg-red-700 rounded-tr-xl rounded-br-xl py-4 w-1/2 cursor-pointer hover:text-red-700 hover:bg-white duration-300'>Buy ticket</div>
                                </div>
                            </ReactCardFlip>
                        </div>
                    </div>
                    <div className='border rounded-lg border-x-gray-300 bg-slate-50 relative h-fit my-10 min-w-96'>
                        <div className='flex text-orange-600 absolute right-2 top-1 gap-2'>
                            <FaStar size={25} />
                            <FaStar size={25} />
                            <FaStar size={25} />
                        </div>
                        <div className='absolute gap-4 border border-blue-800 hover:text-cyan-900 hover:bg-white bg-blue-800 duration-300  rounded-tr-2xl rounded-br-2xl h-14 left-0 top-8 flex justify-center items-center text-white font-semibold text-xl px-4 w-fit'>
                            <RiVipCrownLine />
                            <p>Premium Packages</p>
                        </div>
                        <div className='w-full flex-col flex gap-5 pt-28 text-left justify-start px-5 min-h-80 text-xl text-cyan-900 pb-10 md:pb-5'>

                            <div className='flex items-center gap-2 text-cyan-900'>
                                <p><span className='text-5xl text-red-700 font-semibold'>20$</span> /One Person</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <AiFillCaretRight />
                                <p>Regular Seating</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <AiFillCaretRight />
                                <p>Comfortable Sleeping</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <AiFillCaretRight />
                                <p>Afternoon Snacks</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <AiFillCaretRight />
                                <p>Afternoon Entrance</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <AiFillCaretRight />
                                <p>Idea shareing</p>
                            </div>

                            <ReactCardFlip isFlipped={Flipped === 3} flipDirection="vertical">
                                <div onClick={() => setFlipped(3)} className='gap-4 border-2 border-blue-950 bg-blue-950 rounded-tr-2xl hover:scale-110 cursor-pointer transition-all duration-300 rounded-2xl px-4 min-w-fit py-4 mb-2 flex justify-center items-center text-white font-semibold text-2xl'>
                                    <AiFillCaretRight />
                                    <p>Buy Ticket</p>
                                </div>
                                <div className='relative bg-white border-red-700 border-2 rounded-tr-2xl rounded-2xl min-w-fit mb-2 flex justify-center items-center text-white font-semibold text-2xl'>
                                    <div className='flex justify-center px-2 rounded-tr-lg rounded-br-lg py-4 w-1/2 cursor-pointer text-black'>
                                        <div onClick={plusTicket} className='w-1/3 border-r-2 flex justify-center hover:text-red-700 select-none'>+</div>
                                        <div className='w-1/3 flex justify-center select-none'>{numTicket}</div>
                                        <div onClick={minuteTicket} className='w-1/3 border-l-2 flex justify-center hover:text-red-700 select-none'>-</div>
                                    </div>
                                    <div className='flex justify-center px-2 border-l-2 border-red-700 bg-red-700 rounded-tr-xl rounded-br-xl py-4 w-1/2 cursor-pointer hover:text-red-700 hover:bg-white duration-300'>Buy ticket</div>
                                </div>
                            </ReactCardFlip>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default PricingPlan