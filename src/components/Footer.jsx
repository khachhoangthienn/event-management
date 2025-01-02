import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='bg-gradient-to-r from-cyan-950 to-cyan-600 py-1 px-4'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm'>

                {/*---> Left Section <---*/}
                <div>
                    <img className='mb-5 w-40' src={assets.WhiteLogo} alt="" />
                    <p className='w-full md:w-2/3 text-gray-100 leading-6'>Thank you for joining us and being a part of our events! Stay connected by following us on social media to receive the latest updates on upcoming events and exclusive offers. Don't miss the chance to be part of exciting and unique experiences.</p>
                </div>

                {/*---> Center Section <---*/}
                <div>
                    <p className='text-xl font-medium mb-5 text-gray-100'>COMPANY</p>
                    <ul className='flex flex-col gap-2 text-gray-100'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>

                {/*---> Right Section <---*/}
                <div>
                    <p className='text-xl font-medium mb-5  text-gray-100'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 text-gray-100'>
                        <li>+1-212-456-7890</li>
                        <li>dazerevent@gmail.co</li>
                    </ul>
                </div>
            </div>

            {/* --> Copyright Text <-- */}
            <div>
                <hr />
                <p className='py-5 text-sm text-center  text-gray-100'>Copyright 2024@Daniel - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer