import React, { useState } from 'react'
import { TiLightbulb } from "react-icons/ti";
import { RiCalendarEventLine } from "react-icons/ri";
import { IoMdPersonAdd } from "react-icons/io";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const HomeLogin = () => {

    return (
        <div className='min-h-screen bg-cover bg-center flex items-center w-full overflow-hidden'
            style={{ backgroundImage: 'url(/peakpx.jpg)' }} id='Header'>
            <div className='container text-center mx-auto py-4 px-6 md:px-20 lg:px-32 text-white'>
                <h2 className='text-5xl sm:text-4xl md:text-7xl inline-block max-w-3xl font-semibold pt-20'>Explore events that match your passion</h2>
                <div className='space-x-6 mt-16 text-2xl flex justify-center'>
                    <div className='flex flex-row items-center bg-white px-7 py-2 rounded-full hover:scale-110 transition-all  duration-300'>
                        <Link to={`/events`} className='px-8 py-3 rounded text-gray-900 '>Start find your event</Link>
                        <FaRegArrowAltCircleRight className='text-gray-900' />
                    </div>
                </div>
                <div className='space-x-6 mt-16 text-lg'>
                    <div className='flex flex-wrap justify-center gap-10'>
                        <div className='flex flex-col border-2 rounded-lg border-white items-center gap-4 px-16 py-8'>
                            <TiLightbulb className='size-28 px-4' />
                            <h2 className='text-6xl font-bold'>100 +</h2>
                            <p className='text-2xl'>Best Speaker</p>
                        </div>
                        <div className='flex flex-col border-2 rounded-lg border-white items-center gap-4 px-16 py-8'>
                            <RiCalendarEventLine className='size-28 px-4' />
                            <h2 className='text-6xl font-bold'>200 +</h2>
                            <p className='text-2xl'>Ideal Event</p>
                        </div>
                        <div className='flex flex-col border-2 rounded-lg border-white items-center gap-4 px-16 py-8'>
                            <IoMdPersonAdd className='size-28  px-4' />
                            <h2 className='text-6xl font-bold'>400 +</h2>
                            <p className='text-2xl'>Participants</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeLogin