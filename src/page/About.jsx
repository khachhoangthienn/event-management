import { assets } from '@/assets/assets'
import Header from '@/components/Header'
import React from 'react'
import { TbWaveSawTool } from "react-icons/tb";
import { BiSlideshow } from "react-icons/bi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { SiStreamrunners } from "react-icons/si";
import { TiLightbulb } from "react-icons/ti";
import { RiCalendarEventLine } from "react-icons/ri";
import { IoMdPersonAdd } from "react-icons/io";





const About = () => {
    return (
        <div>
            <Header type="About Us" />
            <div className='flex flex-col container items-center gap-28 justify-center mx-auto py-20 px-6 md:px-20 lg:px-32 relative'>
                {/* component 1 */}
                <div className='text-justify flex gap-10 text-cyan-900'>
                    {/* Div 1 infor */}
                    <div className='w-full md:w-3/4 flex flex-col gap-5'>
                        <div className='flex items-end gap-4 pb-3 border-b w-fit'>
                            <p className='text-3xl font-medium'>About</p>
                            <img src={assets.BlackLogo} alt="" className='w-40' />
                        </div>
                        {/* content1 */}
                        <div className='flex flex-col md:flex-row gap-5 py-2'>
                            {/* content */}
                            <div className=' md:w-3/4 flex flex-col gap-4'>
                                <p className='text-4xl font-semibold'>Empowering Event Organizers</p>
                                <p>At Dazer, we believe every event has the potential to inspire, connect, and transform communities. Our platform provides organizers with the tools they need to create, manage, and promote events effortlessly, turning their visions into reality. Whether it’s a local gathering or a global conference, we’re here to make it happen.</p>
                            </div>
                            {/* image */}
                            <div className='w-full md:w-1/4'>
                                <img src="https://www.meydanfz.ae/wp-content/uploads/2021/10/Events.png" className='object-cover rounded-2xl' alt="" />
                            </div>
                        </div>
                        {/* content2 */}
                        <div className='flex flex-col md:flex-row gap-5 py-2'>
                            {/* content */}
                            <div className='md:w-3/4 flex flex-col gap-4'>
                                <p className='text-4xl font-semibold'>Seamless Experiences for Attendees
                                </p>
                                <p>Dazer is your gateway to unforgettable experiences. Discover a wide range of events tailored to your interests, purchase tickets securely, and stay informed with real-time updates. Join us in celebrating creativity and connection at every event you attend!</p>                            </div>
                            {/* image */}
                            <div className='md:w-1/4'>
                                <img src="https://www.eventbrite.com/blog/wp-content/uploads/2022/08/image3-min-1.png" className='object-cover rounded-2xl' alt="" />
                            </div>
                        </div>
                    </div>
                    {/* Div video */}
                    <div className='hidden md:block md:w-1/4'>
                        <img src="https://business.getonbloc.com/wp-content/uploads/2022/10/the-event-sector-what-you-need-to-understand-about-the-events-industry.png" className='rounded-tl-[100px] h-full object-cover' alt="" />
                    </div>
                </div>


                {/* component 2 */}
                <div className='text-justify flex flex-col md:flex-row text-cyan-900 w-full gap-10'>
                    <div class="grid grid-cols-2 grid-rows-2 gap-4 md:w-1/2 md:h-1/2 text-center text-xl font-medium">
                        <div class=" border border-gray-200 rounded-lg flex-col flex justify-center items-center p-5 gap-4 bg-gray-50 hover:bg-gray-200 hover:scale-105 duration-300">
                            <TbWaveSawTool size={50} />
                            <p>Comprehensive Tools for Organizers</p>
                        </div>
                        <div class=" border border-gray-200 rounded-lg flex-col flex justify-center items-center p-5 gap-4  bg-gray-50 hover:bg-gray-200 hover:scale-105 duration-300">
                            <BiSlideshow size={50} />
                            <p>Enhanced Visibility for Your Events</p>
                        </div>
                        <div class=" border border-gray-200 rounded-lg flex-col flex justify-center items-center p-5 gap-4 bg-gray-50 hover:bg-gray-200 hover:scale-105 duration-300">
                            <RiSecurePaymentLine size={50} />
                            <p>Secure and Seamless Ticketing System</p>
                        </div>
                        <div class=" border border-gray-200 rounded-lg flex-col flex justify-center items-center p-5 gap-4 bg-gray-50 hover:bg-gray-200 hover:scale-105 duration-300">
                            <SiStreamrunners size={50} />
                            <p>User-friendly and intuitive interface
                            </p>
                        </div>

                    </div>

                    {/* Content */}
                    <div className='flex flex-col md:w-1/2 items-start justify-center gap-5 pb-3'>
                        <p className='text-3xl font-medium  border-b'>Why choose us?</p>
                        <p className='text-4xl text-start font-semibold'>Streamline Your Event Management with Us</p>
                        <p>Our platform offers a comprehensive suite of tools for organizers, enhancing the visibility of your events and ensuring a secure, seamless ticketing system. With a user-friendly and intuitive interface, you can effortlessly create, manage, and promote your events, providing attendees with a streamlined experience from start to finish.</p>
                    </div>
                </div>


                {/* component 3 */}
                <div className='w-full flex flex-col md:flex-row justify-center gap-20 text-white'>
                    <div className='flex flex-col border-2 rounded-3xl border-white items-center bg-gradient-to-r from-cyan-950 to-cyan-600 gap-4 px-20 py-8'>
                        <TiLightbulb className='size-28 px-4' />
                        <h2 className='text-6xl font-bold'>100 +</h2>
                        <p className='text-2xl'>Best Speaker</p>
                    </div>
                    <div className='flex flex-col border-2 rounded-3xl border-white items-center bg-gradient-to-r from-cyan-950 to-cyan-600 gap-4 px-20 py-8'>
                        <RiCalendarEventLine className='size-28 px-4' />
                        <h2 className='text-6xl font-bold'>200 +</h2>
                        <p className='text-2xl'>Ideal Event</p>
                    </div>
                    <div className='flex flex-col border-2 rounded-3xl border-white items-center bg-gradient-to-r from-cyan-950 to-cyan-600 gap-4 px-20 py-8'>
                        <IoMdPersonAdd className='size-28  px-4' />
                        <h2 className='text-6xl font-bold'>400 +</h2>
                        <p className='text-2xl'>Participants</p>
                    </div>
                </div>

                {/* component 4 */}
                <div className='w-full border-2 rounded-3xl relative text-cyan-900 text-pretty p-10'>
                    <div className='bg-white absolute top-[-35px] left-20 flex items-end gap-3 px-2'>
                        <img src={assets.BlackLogo} alt="" className='w-24 pb-2' />
                        <p className='text-4xl font-semibold'>Story</p>
                    </div>
                    <p className='text-lg text-justify'>Dazer was born from a simple idea: to connect passionate organizers with curious attendees in a seamless, innovative way. Whether you’re an artist hosting your first exhibition or a music lover searching for your next unforgettable concert, Dazer provides the platform to bring your vision to life. Organizers can easily create and promote events, while attendees discover experiences tailored to their interests—all with the simplicity and reliability that Dazer is proud to offer. Together, we’re not just organizing events; we’re building a community where stories are shared, and memories are made.</p>
                </div>
            </div>

        </div>
    )
}

export default About