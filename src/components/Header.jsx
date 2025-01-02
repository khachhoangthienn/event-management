import React from 'react'
import { IoMdArrowDropright } from "react-icons/io";
import { Link } from 'react-router-dom';

const Header = ({ type }) => {
    return (
        <div className='h-[400px] bg-cover bg-center flex items-center w-full overflow-hidden'
            style={{ backgroundImage: 'url(/speaker.jpg)' }} id='Header'>
            <div className='flex flex-col container items-start gap-4 justify-start mx-auto py-10 px-6 md:px-20 lg:px-32 text-white mt-40'>
                <h1 className='text-5xl font-semibold'>{type}</h1>
                <div className='flex gap-4 text-2xl items-center w-full'>
                    <Link to={`/`} className='cursor-pointer hover:text-gray-400 hover:scale-125 transition-all  duration-300'>Home</Link>
                    <IoMdArrowDropright className='size-6 text-cyan-500' />
                    <p className='text-cyan-600'>{type}</p>
                </div>
            </div>
        </div>
    )
}

export default Header