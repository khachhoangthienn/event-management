import axiosInstance from '@/axiosConfig'
import GridEvent from '@/components/GridEvent'
import Header from '@/components/Header'
import { EventContext } from '@/context/EventContext'
import { UserContext } from '@/context/UserContext'
import React, { useContext, useEffect, useState } from 'react'

const Event = () => {
    const { popularEvents, topEvents, recommendEvent, types, fetchRecommendEvents } = useContext(EventContext)

    useEffect(() => {
        fetchRecommendEvents()
    }, [])

    return (
        <div>
            <Header type={'Events'} />
            {recommendEvent.length !== 0 && <GridEvent title="BEST EVENT FOR YOU" events={recommendEvent} categories={null} number={6} />}
            <GridEvent title="TOP EVENT" events={topEvents} categories={null} number={6} />
            <GridEvent title="POPULAR EVENT" events={popularEvents} categories={types} number={9} slice="slice" />
        </div>
    )
}

export default Event