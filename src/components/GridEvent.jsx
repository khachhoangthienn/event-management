import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdOutlineShareLocation } from "react-icons/md";
import { MdEventNote } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { datimeToEnUS } from '@/utils'

const GridEvent = ({ title, events, categories, number, slice, col = "auto" }) => {
    const navigate = useNavigate()
    const [categorySelected, setCategorySelected] = useState("");
    const [showEvents, setShowEvents] = useState([])
    const [showCategories, setShowCategories] = useState([])
    const [indexPage, setindexPage] = useState(0)
    useEffect(() => {
        if (categories) {
            setShowCategories(categories)
        } else {
            setShowCategories([])
        }
        if (events) {
            setShowEvents(events)
        }
    }, [events])

    useEffect(() => {
        if (categorySelected) {
            setShowEvents(events.filter(event => event.types[0].typeId === categorySelected))
        } else {
            setShowEvents(events)
        }
        setindexPage(0)
    }, [events, categorySelected])

    if (!showEvents) return <div>Loading...</div>
    return (
        <div className='flex flex-col container items-center gap-4 justify-start mx-auto py-10 px-6 md:px-20 lg:px-32'>
            <h1 className='text-5xl font-bold text-cyan-900' id='nav-event'>{title}</h1>
            <div className='flex flex-row gap-4 items-start w-full text-lg mt-2 py-1'>
                {categories && categories.map((category, index) => (
                    <p key={index} onClick={() => { categorySelected === category.typeId ? setCategorySelected("") : setCategorySelected(category.typeId) }}
                        className={`cursor-pointer px-4 py-2 rounded-md transition-all duration-300 ${categorySelected === category.typeId ? "border-2 border-cyan-900 text-cyan-900" : "hover:text-gray-400 border-2 border-white"}`}>
                        {category.typeName}
                    </p>
                ))}
            </div>
            <div className={`w-full grid grid-cols-3 gap-10 pt-5 gap-y-6 px-3 sm:px-0 text-gray-800 min-h-[50vh]`}>
                {showEvents.slice(indexPage * number, indexPage * number + number).map((item, index) => (
                    <div onClick={() => navigate(`/events/${item.eventId}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 relative group' key={index}>
                        <img className='bg-blue-50 w-full h-60' src={item.photoEvents[0].photoEventId} alt="" />
                        <div className={`absolute bg-cyan-950 text-white font-semibold ${item.availableTickets !== 0 ? "group-hover:bg-white group-hover:text-cyan-900" : "bg-red-800 text-white"}  w-60 h-12 top-44 transition-all duration-300 flex items-center justify-center text-lg gap-2`}>
                            <CiBoxList />
                            <p>{item.availableTickets}/{item.totalTickets} seats</p>
                        </div>
                        <div className='p-4'>
                            {/* calender and location */}
                            <div className='flex justify-between py-1 text-sm '>
                                <div className='flex gap-2 items-center'>
                                    <MdEventNote className='text-cyan-900' />
                                    <p>{datimeToEnUS(item.startTime)}</p>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <MdOutlineShareLocation className='text-cyan-900' />
                                    <p>{item.eventLocation}</p>
                                </div>
                            </div>
                            <p className='text-sm'>Category: {item.types[0].typeName}</p>
                            <p className='text-cyan-900 text-2xl font-medium pt-2'>{item.eventName}</p>
                        </div>
                    </div>
                ))}
            </div>
            {slice == 'slice' && <div className='flex justify-center items-center gap-4' id='nav-event'>
                <a onClick={() => { setindexPage(prev => prev == 0 ? prev : prev - 1) }} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:bg-cyan-900 hover:text-white'>Previous</a>
                {indexPage > 0 && <p className='text-cyan-700 text-sm mt-10'>{indexPage}</p>}
                <p className=' text-center text-cyan-700 text-2xl mt-10 border-2 min-w-10 border-gray-500 rounded-md p-1'>{indexPage + 1}</p>
                {indexPage * number + number < showEvents.length && <p className='text-cyan-700 text-sm mt-10'>{indexPage + 2}</p>}
                <a onClick={() => { setindexPage(prev => prev * number + number > showEvents.length ? prev : prev + 1) }} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10  hover:bg-cyan-900 hover:text-white'>Next</a>
            </div>}

            {slice == 'seemore' && <div className='flex w-full items-start justify-end'>
                <a className='bg-blue-100 text-gray-600 px-12 py-3 rounded-full pt-4 hover:bg-cyan-900 hover:text-white duration-300 cursor-pointer flex'>See more
                </a>
            </div>}

        </div>
    )
}

export default GridEvent