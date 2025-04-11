import axiosInstance from '@/axiosConfig'
import GridEvent from '@/components/GridEvent'
import Header from '@/components/Header'
import { EventContext } from '@/context/EventContext'
import { UserContext } from '@/context/UserContext'
import { Search } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'

const Event = () => {
    const { popularEvents, topEvents, recommendEvent, types, fetchRecommendEvents } = useContext(EventContext)

    useEffect(() => {
        fetchRecommendEvents()
    }, [])

    return (
        <div className='relative'>
            <Header type={'Events'} />
            {/* <div className="flex justify-center items-center w-full absolute top-80 z-10">
                <div className="w-full max-w-xl mx-auto relative group">
                    <input
                        type="text"
                        placeholder="Input your event to start finding"
                        className="w-full py-3 pl-5 pr-12 rounded-xl border border-white bg-white/10 
                       text-white text-lg placeholder-white
                       focus:outline-none focus:ring-4 focus:ring-cyan-700 
                       group-hover:scale-[1.02] focus:scale-[1.05]
                       hover:bg-white/20 focus:bg-white/30
                       transition-all duration-300 ease-in-out shadow-xl backdrop-blur-md"
                    />
                    <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-cyan-900 transition duration-200">
                        <Search size={24} />
                    </button>
                </div>
            </div> */}


            {recommendEvent.length !== 0 && <GridEvent title="BEST EVENT FOR YOU" events={recommendEvent} categories={null} number={6} />}
            <GridEvent title="TOP EVENT" events={topEvents} categories={null} number={6} />
            <GridEvent title="POPULAR EVENT" events={popularEvents} categories={types} number={9} slice="slice" />
        </div>
    )
}

export default Event