import React, { useContext, useState } from 'react'
import HomeLogin from '@/components/HomeLogin';
import { UserContext } from '@/context/UserContext';
import Header from '@/components/Header';

const Home = () => {
    const { info } = useContext(UserContext);

    if (!info) return (<HomeLogin />)
    if (info.role == "ATTENDEE") return (<Header type="HOME" />)
    if (info.role == "ORGANIZER") return (<Header type="ORGANIZER DASHBOARD" />)
}

export default Home