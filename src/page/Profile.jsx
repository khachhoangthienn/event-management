import Header from '@/components/Header'
import UserProfileForm from '@/components/UserProfileForm'
import React from 'react'

const Profile = () => {
    return (
        <div>
            <Header type='My profile' />
            <UserProfileForm />
        </div>
    )
}

export default Profile