import React, { useContext, useState } from 'react'
import HomeLogin from '@/components/HomeLogin';
import { UserContext } from '@/context/UserContext';
import Header from '@/components/Header';
import HeaderUser from '@/components/headerUser';
import AttendeeHome from '@/components/attendeeHome';
import OrganizerHome from '@/components/organizerHome';
import AdminHome from '@/components/adminHome';

const Home = () => {
    const { info } = useContext(UserContext);

    if (!info) return (<HomeLogin />)

    if (info.role == "ATTENDEE") return (
        <div>
            <HeaderUser type={`Attendee – Join exciting events!`} />
            <AttendeeHome />
        </div>
    )
    if (info.role == "ORGANIZER") return (
        <div>
            <HeaderUser type={`Organizer – Manage your events!`} />
            <OrganizerHome />
        </div>
    )
    if (info.role == "ADMIN") return (
        <div>
            <HeaderUser type={`Admin – Manage the platform!`} />
            <AdminHome />
        </div>
    )
}

export default Home