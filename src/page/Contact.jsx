import Header from '@/components/Header'
import React from 'react'
import { SlLocationPin } from "react-icons/sl";
import { MdOutlineLocalPhone } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";




const Contact = () => {
    return (
        <>div
            <Header type='Contact' />
            <div className='flex flex-col container items-center gap-10 justify-center mx-auto text-cyan-900 py-14 px-6 md:px-20 lg:px-32 relative'>
                <h1 className='text-5xl font-bold my-4 border-b-2 py-1'>CONTACT NOW</h1>

                <div className='w-full flex gap-7'>
                    {/* left side */}
                    <div className='w-1/2 flex flex-col gap-5'>

                        <div className='border px-4 py-8 flex gap-5 items-start rounded-lg hover:bg-gray-50 hover:scale-105 duration-300'>
                            {/* icons */}
                            <SlLocationPin size={70} />
                            {/* content */}
                            <div className='flex flex-col gap-2'>
                                <p className='text-4xl font-semibold'>Location</p>
                                <p className='text-xl'>Can Tho University, 3/2, Xuan Khanh, Ninh Kieu, Can Tho</p>
                            </div>
                        </div>
                        <div className='border px-4 py-8  flex gap-5 items-start rounded-lg hover:bg-gray-50 hover:scale-105 duration-300'>
                            {/* icons */}
                            <MdOutlineLocalPhone size={70} />
                            {/* content */}
                            <div className='flex flex-col gap-2'>
                                <p className='text-4xl font-semibold'>Phone</p>
                                <p className='text-xl'>+037 656 5611</p>
                            </div>
                        </div>
                        <div className='border px-4 py-8 flex gap-5 items-start rounded-lg hover:bg-gray-50 hover:scale-105 duration-300'>
                            {/* icons */}
                            <IoMailOutline size={70} />
                            {/* content */}
                            <div className='flex flex-col gap-2'>
                                <p className='text-4xl font-semibold'>Email</p>
                                <p className='text-xl'>dazerevent@support.ctu.edu.vn</p>
                            </div>
                        </div>

                    </div>
                    {/* right side */}
                    <div className='flex gap-4 flex-col w-1/2 justify-between'>
                        <div className='text-4xl font-semibold '>Visit Us</div>
                        <iframe
                            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.841454377128!2d105.76804037586368!3d10.029938972517146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2sCan%20Tho%20University!5e0!3m2!1sen!2s!4v1735800706725!5m2!1sen!2s'
                            width="100%"
                            height="100%"
                            allowFullScreen=""
                            loading="lazy"
                            className='p-1 border-2'
                        ></iframe>
                    </div>
                </div>
                <p className='text-2xl w-full'>Reach out to us – we're here to help you make every event unforgettable!</p>
            </div>
        </>
    )
}

export default Contact