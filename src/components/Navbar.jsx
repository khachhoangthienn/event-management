import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { IoMdArrowDropdown } from "react-icons/io";
import { UserContext } from '@/context/UserContext';
import { use } from 'react';


const Navbar = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const { info, setInfo } = useContext(UserContext);

    useEffect(() => {
        const savedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (savedUserInfo) {
            setInfo(savedUserInfo);
        }
    }, []);

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
                <div>
                    {
                        info ? (
                            <div className='flex items-center gap-2 cursor-pointer group relative'>
                                <img className='w-10 aspect-square object-cover rounded-full border-2 border-white' src={info.avatarUrl} alt="borderwhite" />
                                <IoMdArrowDropdown className='size-5 text-white' />
                                <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                                    <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                                        <p onClick={() => navigate(`profile`)} className='hover:text-black cursor-pointer'>My profile</p>
                                        <p onClick={() => navigate(`my-appointments`)} className='hover:text-black cursor-pointer'>My appointment</p>
                                        <p onClick={() => setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
                                    </div>
                                </div>
                            </div>
                        ) : (<NavLink to='/login' className='hidden md:block bg-white px-8 py-2 rounded-full'>Login</NavLink>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar