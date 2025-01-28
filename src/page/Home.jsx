import React, { useContext, useState } from 'react'
import HomeLogin from '@/components/HomeLogin';
import { UserContext } from '@/context/UserContext';
import Header from '@/components/Header';
import HeaderUser from '@/components/headerUser';
import AttendeeHome from '@/components/attendeeHome';
import OrganizerHome from '@/components/organizerHome';

const Home = () => {
    const { info } = useContext(UserContext);

    if (!info) return (<HomeLogin />)
    if (info.role == "ATTENDEE") return (
        <div>
            <HeaderUser type={`Welcome to DazerEvent`} />
            <AttendeeHome />
        </div>
    )
    if (info.role == "ORGANIZER") return (
        <div>
            <HeaderUser type={`Welcome to DazerEvent`} />
            <OrganizerHome />
        </div>
    )
}

export default Home