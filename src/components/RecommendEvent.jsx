import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { MdOutlineShareLocation } from "react-icons/md";
import { MdEventNote } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";

const RecommendEvent = () => {
    const navigate = useNavigate()
    const { events, categories } = useContext(AppContext)
    const [categorySelected, setCategorySelected] = useState("");
    const [showEvents, setShowEvents] = useState([])
    const [indexPage, setindexPage] = useState(0)

    useEffect(() => {
        if (categorySelected) {
            setShowEvents(events.filter(event => event.category === categorySelected))
        } else {
            setShowEvents(events)
        }
        setindexPage(0)
    }, [events, categorySelected])

    return (
        <div className='flex flex-col container items-center gap-4 justify-start mx-auto py-10 px-6 md:px-20 lg:px-32'>
            <h1 className='text-5xl font-bold text-cyan-900'>BEST EVENT FOR YOU</h1>
            <div className='flex flex-row gap-4 items-start w-full text-lg mt-2 py-1'>
                {categories.map((category, index) => (
                    <p key={index} onClick={() => { categorySelected === category ? setCategorySelected("") : setCategorySelected(category) }}
                        className={`cursor-pointer px-4 py-2 rounded-md transition-all duration-300 ${categorySelected === category ? "border-2 border-cyan-900 text-cyan-900" : "hover:text-gray-400 border-2 border-white"}`}> {category}  </p>))}
            </div>
            <div className='w-full grid grid-cols-auto gap-10 pt-5 gap-y-6 px-3 sm:px-0 text-gray-800'>
                {showEvents.slice(indexPage * 6, indexPage * 6 + 6).map((item, index) => (
                    <div onClick={() => navigate(`/events/${item.id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 relative group' key={index}>
                        <img className='bg-blue-50 w-full h-60' src={item.image} alt="" />
                        <div className={`absolute bg-cyan-950 text-white font-semibold ${item.availables !== item.seats ? "group-hover:bg-white group-hover:text-cyan-900" : "bg-red-800 text-white"}  w-60 h-12 top-44 transition-all duration-300 flex items-center justify-center text-lg gap-2`}>
                            <CiBoxList />
                            <p>{item.availables}/{item.seats} seats</p>
                        </div>
                        <div className='p-4'>
                            {/* calender and location */}
                            <div className='flex justify-between py-1 text-sm '>
                                <div className='flex gap-2 items-center'>
                                    <MdEventNote className='text-cyan-900' />
                                    <p>{item.calender}</p>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <MdOutlineShareLocation className='text-cyan-900' />
                                    <p>{item.location}</p>
                                </div>
                            </div>
                            <p className='text-sm'>Category: {item.category}</p>
                            <p className='text-gray-800 text-2xl font-medium'>{item.name}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-center items-center gap-4' id='nav-event'>
                <a onClick={() => { setindexPage(prev => prev == 0 ? prev : prev - 1) }} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:bg-cyan-900 hover:text-white'>Previous</a>
                {indexPage > 0 && <p className='text-cyan-700 text-sm mt-10'>{indexPage}</p>}
                <p className=' text-center text-cyan-700 text-2xl mt-10 border-2 min-w-10 border-gray-500 rounded-md p-1'>{indexPage + 1}</p>
                {indexPage * 6 + 6 < showEvents.length && <p className='text-cyan-700 text-sm mt-10'>{indexPage + 2}</p>}
                <a onClick={() => { setindexPage(prev => prev * 6 + 6 > showEvents.length ? prev : prev + 1) }} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10  hover:bg-cyan-900 hover:text-white'>Next</a>
            </div>
        </div>
    )
}

export default RecommendEvent