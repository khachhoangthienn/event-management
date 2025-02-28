import GridEvent from '@/components/GridEvent'
import Header from '@/components/Header'
import { EventContext } from '@/context/EventContext'
import React, { useContext } from 'react'

const Event = () => {
    const { popularEvents, types } = useContext(EventContext)
    return (
        <div>
            <Header type={'Events'} />
            <GridEvent title="BEST EVENT FOR YOU" events={popularEvents} categories={null} number={6} />
            <GridEvent title="TOP EVENT" events={popularEvents} categories={null} number={6} />
            <GridEvent title="POPULAR EVENT" events={popularEvents} categories={types} number={9} slice="slice" />
        </div>
    )
}

export default Event