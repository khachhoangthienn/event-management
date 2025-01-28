import GridEvent from '@/components/GridEvent'
import Header from '@/components/Header'
import { AppContext } from '@/context/AppContext'
import React, { useContext } from 'react'

const Event = () => {
    const { events, categories } = useContext(AppContext)

    return (
        <div>
            <Header type={'Events'} />
            <GridEvent title="BEST EVENT FOR YOU" events={events} categories={null} number={6} />
            <GridEvent title="TOP EVENT" events={events} categories={null} number={6} />
            <GridEvent title="POPULAR EVENT" events={events} categories={categories} number={9} slice="slice" />
        </div>
    )
}

export default Event