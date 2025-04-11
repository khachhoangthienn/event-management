import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdOutlineShareLocation } from "react-icons/md";
import { MdEventNote } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { datimeToEnUS } from '@/utils'
import { EventContext } from '@/context/EventContext';
import ReactCardFlip from 'react-card-flip';
import { Search } from 'lucide-react';

const GridEvent = ({ title, events, categories, number, slice, col = "auto" }) => {
    const navigate = useNavigate()
    const [categorySelected, setCategorySelected] = useState("");
    const [showEvents, setShowEvents] = useState([])
    const [showCategories, setShowCategories] = useState([])
    const [indexPage, setindexPage] = useState(0)
    const { setFlipComing, isComing } = useContext(EventContext);

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
            <div className='flex flex-row w-full justify-between'>
                <div>{categories &&
                    <div className='flex flex-row gap-4 items-start'>{categories.map((category, index) => (
                        <div>
                            <p key={index} onClick={() => { categorySelected === category.typeId ? setCategorySelected("") : setCategorySelected(category.typeId) }}
                                className={`cursor-pointer px-4 py-2 rounded-md transition-all duration-300 ${categorySelected === category.typeId ? "border-2 border-cyan-900 text-cyan-900" : "hover:text-gray-400 border-2 border-white"}`}>
                                {category.typeName}
                            </p>
                        </div>

                    ))}</div>
                }</div>
                {categories &&
                    <div className='flex flex-row gap-2 justify-end'>
                        {/* <div className="flex justify-center items-center">
                            <div className="w-full max-w-xl mx-auto relative group">
                                <input
                                    type="text"
                                    placeholder="Input your event to start finding"
                                    className="w-full py-2 pl-5 pr-12 rounded-xl border-2 border-gray-600
                 text-gray-800 text-lg placeholder-gray-500
                 focus:outline-none focus:ring-4 focus:ring-cyan-600 
                 group-hover:scale-[1.02] focus:scale-[1.05]
                 hover:shadow-md focus:shadow-xl
                 transition-all duration-300 ease-in-out"
                                />
                                <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cyan-600 hover:text-cyan-900 transition duration-200">
                                    <Search size={24} />
                                </button>
                            </div>
                        </div> */}
                        <ReactCardFlip
                            isFlipped={isComing}
                            flipDirection="horizontal"
                        >
                            <div
                                onClick={setFlipComing}
                                className='cursor-pointer flex font-semibold text items-center justify-end px-4 py-2 rounded-md border-2 border-cyan-900 text-cyan-900 text-lg'>
                                Coming</div>
                            <div
                                onClick={setFlipComing}

                                className='cursor-pointer flex font-semibold text items-center justify-end px-4 py-2 rounded-md border-2 border-red-600 text-red-600 text-lg'>
                                Finished</div>
                        </ReactCardFlip>
                    </div>

                }
            </div>
            <div className={`w-full grid grid-cols-3 gap-10 pt-5 gap-y-6 px-3 sm:px-0 text-gray-800 min-h-[42vh]`}>
                {showEvents.slice(indexPage * number, indexPage * number + number).map((item, index) => (
                    <div onClick={() => navigate(`/events/${item.eventId}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 relative group' key={index}>
                        <img className='bg-blue-50 w-full h-60' src={item.photoEvents[0].photoEventId} alt="" />
                        {isComing == true && title === 'POPULAR EVENT' ? (<div className={`absolute font-semibold bg-red-800 text-white w-60 h-12 top-44 transition-all duration-300 flex items-center justify-center text-lg gap-2`}>
                            <CiBoxList />
                            <p>Event is over</p>
                        </div>) : (
                            <div className={`absolute bg-cyan-950 text-white font-semibold ${item.availableTickets !== 0 ? "group-hover:bg-white group-hover:text-cyan-900" : "bg-red-800 text-white"}  w-60 h-12 top-44 transition-all duration-300 flex items-center justify-center text-lg gap-2`}>
                                <CiBoxList />
                                <p>{item.availableTickets}/{item.totalTickets} seats</p>
                            </div>
                        )}
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
            {slice == 'slice' && showEvents.length >= number && <div className='flex justify-center items-center gap-4' id='nav-event'>
                <a onClick={() => { setindexPage(prev => prev == 0 ? prev : prev - 1) }} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:bg-cyan-900 hover:text-white'>Previous</a>
                {indexPage > 0 && <p className='text-cyan-700 text-sm mt-10'>{indexPage}</p>}
                <p className=' text-center text-cyan-700 text-2xl mt-10 border-2 min-w-10 border-gray-500 rounded-md p-1'>{indexPage + 1}</p>
                {indexPage * number + number < showEvents.length && <p className='text-cyan-700 text-sm mt-10'>{indexPage + 2}</p>}
                <a onClick={() => { setindexPage(prev => (prev + 1) * number >= showEvents.length ? prev : prev + 1); }} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10  hover:bg-cyan-900 hover:text-white'>Next</a>
            </div>}

            {slice == 'seemore' && <div className='flex w-full items-start justify-end'>
                <a className='bg-blue-100 text-gray-600 px-12 py-3 rounded-full pt-4 hover:bg-cyan-900 hover:text-white duration-300 cursor-pointer flex'>See more
                </a>
            </div>}
        </div>
    )
}

export default GridEvent