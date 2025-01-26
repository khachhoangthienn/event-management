import Header from '@/components/Header'
import PopularEvent from '@/components/PopularEvent'
import RecommendEvent from '@/components/RecommendEvent'
import React from 'react'

const Event = () => {
    return (
        <div>
            <Header type={'Events'} />
            <RecommendEvent />
            <PopularEvent />
        </div>
    )
}

export default Event