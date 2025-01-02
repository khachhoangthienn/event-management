import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [token, setToken] = useState(true);

    return (
        <div className='absolute top-0 left-0 w-full z-10 text-lg'>
            <div className='container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32 bg-transparent'>
                <img src={assets.WhiteLogo} alt="" width="115px" />
                <ul className='hidden md:flex gap-7 text-white'>
                    <NavLink to='/'>
                        <li className='py-1 cursor-pointer hover:text-gray-400'>Home</li>
                        <hr className='border-none outline-none h-0.5 bg-white w-3/5 m-auto hidden' />
                    </NavLink> <NavLink to='/events'>
                        <li className='py-1 cursor-pointer hover:text-gray-400'>Events</li>
                        <hr className='border-none outline-none h-0.5 bg-white w-3/5 m-auto hidden' />
                    </NavLink> <NavLink to='/about'>
                        <li className='py-1 cursor-pointer hover:text-gray-400'>About</li>
                        <hr className='border-none outline-none h-0.5 bg-white w-3/5 m-auto hidden' />
                    </NavLink> <NavLink to='/contact'>
                        <li className='py-1 cursor-pointer hover:text-gray-400'>Contact</li>
                        <hr className='border-none outline-none h-0.5 bg-white w-3/5 m-auto hidden' />
                    </NavLink>
                </ul>
                <NavLink to='/login' className='hidden md:block bg-white px-8 py-2 rounded-full'>Login</NavLink>
            </div>
        </div>
    )
}

export default Navbar