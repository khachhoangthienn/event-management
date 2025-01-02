import LoginForm from '@/components/LoginForm'
import React from 'react'

const Login = () => {
    return (
        <div className='min-h-screen bg-cover bg-center flex items-center justify-center w-full overflow-hidden' style={{ backgroundImage: 'url(/peakpx.jpg)' }}>
            <LoginForm />
        </div >
    )
}

export default Login