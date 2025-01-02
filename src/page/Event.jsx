import Header from '@/components/Header'
import PopularEvent from '@/components/PopularEvent'
import React from 'react'

const Event = () => {
    return (
        <div>
            <Header type={'Events'} />
            <PopularEvent />
        </div>
    )
}

export default Event