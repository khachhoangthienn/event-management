import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowDropright } from 'react-icons/io';

const Header = ({ type, backgroundImage = '/speaker.jpg' }) => {
    return (
        <div
            className='h-[400px] bg-cover bg-center flex items-center w-full overflow-hidden relative'
            style={{ backgroundImage: `url(${backgroundImage})` }}
            id='Header'
        >
            {/* Overlay to improve text readability */}
            <div className='absolute inset-0 bg-black opacity-50'></div>

            <div className='relative z-10 flex flex-col container items-start gap-4 justify-start mx-auto py-10 px-6 md:px-20 lg:px-32 text-white mt-40'>
                <h1 className='text-5xl font-semibold'>{type}</h1>
                <div className='flex gap-4 text-2xl items-center w-full'>
                    <Link
                        to={`/`}
                        className='cursor-pointer hover:text-gray-400 hover:scale-105 transition-all duration-300'
                    >
                        Home
                    </Link>
                    <IoMdArrowDropright className='size-6 text-cyan-500' />
                    <p className='text-cyan-600'>{type}</p>
                </div>
            </div>
        </div>
    )
}

export default Header;