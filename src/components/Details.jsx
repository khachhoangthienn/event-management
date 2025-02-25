import { SkeletonCard } from '@/components/SkeletonCard';
import { AppContext } from '@/context/AppContext';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaHeart } from "react-icons/fa6";
import { BiChevronsRight } from "react-icons/bi";
import { MdOutlineRemoveCircle } from "react-icons/md";
import { LuTicketCheck } from "react-icons/lu";
import { MdOutlineShareLocation } from "react-icons/md";
import { MdEventNote } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { MdOutlineTypeSpecimen } from "react-icons/md";
import { FaRegImages } from "react-icons/fa";
import { GiPublicSpeaker } from "react-icons/gi";
import { IoMdSend } from "react-icons/io";

import ReactStars from "react-stars";
import { Button } from './ui/button';
import axiosInstance, { axiosPublic } from '@/axiosConfig';
import { datimeToEnUS } from '@/utils';
import { UserContext } from '@/context/UserContext';

const Details = () => {
    const { eventId } = useParams();
    const { info } = useContext(UserContext);
    const navigate = useNavigate()
    // Information of event
    const [eventInfo, setEventInfo] = useState(null)
    // Picture here 
    const [gallery, setGallery] = useState([])
    // Speaker in event
    const [speakers, setSpeaker] = useState([])
    // Comment
    const [comments, setComments] = useState([])
    // See more comment
    const [numComment, setNumComment] = useState(0)
    // Set input of comment by onChange
    const [inputComment, setInputComment] = useState("")
    // favourite
    const [isFavourite, setIsFavourite] = useState(false)

    const fetchFavourite = async (eventId) => {
        if (!info) return;
        try {
            const response = await axiosInstance.get(`/favourites/${eventId}`);
            if (response.status === 200) {
                setIsFavourite(response.data.result);
            }
        } catch (error) {
            console.log("this is error code: " + (error.response?.data?.code || "Unknown"));
            if (error.response) {
                const { code } = error.response.data;
                if (code === 404) {
                    console.error("No data found.");
                } else if (code === 401) {
                    console.error("Unauthorized request.");
                }
            } else {
                console.error("Error:", error.message);
            }
        }
    };

    const fetchDetailsEvent = async (eventId) => {
        try {
            const response = await axiosPublic.get(`/events/${eventId}`);
            if (response.status === 200) {
                setEventInfo(response.data.result);
                fetchFavourite(eventId);
            }
        } catch (error) {
            console.log("this is error code: " + (error.response?.data?.code || "Unknown"));
            if (error.response) {
                const { code } = error.response.data;
                if (code === 404) {
                    console.error("No data found.");
                } else if (code === 401) {
                    console.error("Unauthorized request.");
                }
            } else {
                console.error("Error:", error.message);
            }
        }
    };

    const handleFavourite = async () => {
        if (!info) return;
        try {
            const response = await axiosInstance.post(`/favourites/${eventId}`);
            if (response.status === 200) {
                setIsFavourite(!isFavourite)
            }
        } catch (error) {
            console.log("this is error code: " + (error.response?.data?.code || "Unknown"));
            if (error.response) {
                const { code } = error.response.data;
                if (code === 404) {
                    console.error("No data found.");
                } else if (code === 401) {
                    console.error("Unauthorized request.");
                }
            } else {
                console.error("Error:", error.message);
            }
        }
    };


    useEffect(() => {
        fetchDetailsEvent(eventId)
    }, [eventId]);

    if (!eventInfo || !gallery) return <SkeletonCard />

    return (
        <div className='flex flex-col container items-center gap-6 justify-center mx-auto py-10 px-6 md:px-20 lg:px-32 relative'>
            {/* ---------------> Tittle <-------------- */}
            <div className='text-center gap-4 md:gap-1 flex flex-col md:flex-row items-center w-full text-4xl font-semibold text-cyan-900 border-b border-cyan-700 pb-6 px-2'>
                <div className='flex flex-row'>
                    <BiChevronsRight />
                    <p className='text-left'>Topic: {eventInfo.eventName}</p>
                </div>
            </div>

            <div className='flex flex-col md:flex-row justify-between gap-4 flex-wrap w-full'>
                {/* ----------------->  Left Side */}
                <div className='w-full md:w-4/6 flex-row'>
                    {/* -----------> Main image */}
                    <img src={eventInfo.photoEvents[0].photoEventId} alt="" className='w-full rounded-3xl' />
                    {/* --------------> Over view infor */}
                    <div className='flex flex-col gap-4 py-4 md:py-1 items-center md:flex-row justify-between my-2 px-10 border-gray-200 text-cyan-900 border-t border-b'>
                        <div className='flex flex-row gap-2 items-center'>
                            <MdOutlineTypeSpecimen className='size-7' />
                            <div className='flex flex-col'>
                                <p className='font-semibold text-lg'>Event type</p>
                                <p>{eventInfo.types[0].typeName}</p>
                            </div>
                        </div>
                        <div className='flex flex-row gap-2 items-center'>
                            <GiPublicSpeaker className='size-7' />
                            <div className='flex flex-col'>
                                <p className='font-semibold text-lg'>Speaker</p>
                                <p>{eventInfo.speakers.length} Speaker</p>
                            </div>
                        </div>
                        <div className='flex flex-col items-center'>
                            <ReactStars count={5} size={26} value={4} edit={false} />
                            <p>500 Ratings</p>
                        </div>
                    </div>

                    {/* description */}
                    <div className='py-7 text-cyan-900 text-justify'>
                        <p>{eventInfo.eventDescription}</p>
                    </div>
                    {/* Gallery */}
                    <div className=' border-t relative min-h-32'>
                        <div className='absolute gap-4 border border-cyan-900 hover:text-cyan-900 hover:bg-white bg-cyan-900 duration-300 rounded-br-2xl w-1/2 h-14 left-0 top-0 flex justify-center items-center text-white font-semibold text-xl'>
                            <FaRegImages />
                            <p>Gallery</p>
                        </div>
                        <div className='py-20 grid grid-cols-2 md:grid-cols-3 gap-2'>
                            {eventInfo.photoEvents.map((photo, index) => (
                                <img key={photo.photoEventId} src={photo.photoEventId} className='w-full h-full object-cover rounded-md' />
                            ))
                            }
                        </div>
                    </div>
                    {/* Comment and Rating */}
                    <div className=' border-t relative min-h-32'>
                        <div className='absolute gap-4 border border-cyan-900 hover:text-cyan-900 hover:bg-white bg-cyan-900 duration-300 rounded-br-2xl w-1/3 h-14 left-0 top-0 flex justify-center items-center text-white font-semibold text-xl'>
                            <FaRegImages />
                            <p>Comment</p>
                        </div>
                        <div className='absolute flex-row gap-4 w-auto h-auto py-2 right-0 top-0 flex justify-center items-center text-cyan-900 text-sm'>
                            <p>500 Ratings</p>
                            <ReactStars count={5} size={26} value={4} edit={false} />
                        </div>

                        <div className='flex flex-col py-20 text-justify gap-5'>
                            {/* Comment bar */}
                            <div className='flex gap-4 py-5 border-b'>
                                <img src="https://t4.ftcdn.net/jpg/06/48/39/19/360_F_648391979_uMz6EwAlKNIJnK9r46UpTiM17nT8GuLl.jpg" alt="" className='size-12 aspect-square object-cover rounded-full' />
                                <div className='w-full'>
                                    <div className='flex gap-2 items-center'>
                                        <p className='font-semibold text-lg'>Matt Liu</p>
                                        <ReactStars count={5} size={26} />
                                    </div>
                                    <div className='flex gap-3 rounded-3xl bg-gray-200 p-2 w-full items-center'>
                                        <input className='flex flex-1 rounded-full bg-none justify-center min-h-10 l px-4'></input>
                                        <IoMdSend className='size-7 mr-2' />
                                    </div>
                                </div>
                            </div>

                            <div className='flex gap-4'>
                                <img src="https://t4.ftcdn.net/jpg/06/48/39/19/360_F_648391979_uMz6EwAlKNIJnK9r46UpTiM17nT8GuLl.jpg" alt="" className='size-12 aspect-square object-cover rounded-full' />
                                <div className='flex flex-col justify-center'>
                                    <p className='font-semibold text-lg'>Matt Liu</p>
                                    <ReactStars count={5} size={26} value={4} edit={false} className='my-[-5px]' />
                                    <p className='font-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo velit, reiciendis consequuntur nam aperiam assumenda commodi exercitationem similique, saepe, iste optio neque. Veniam, fuga! Eum voluptatibus quaerat nesciunt! Id, eaque! Repellat, ducimus. Minima quos tenetur laborum voluptas ipsam officia voluptate?</p>
                                </div>
                            </div>

                            <div className='flex gap-4'>
                                <img src="https://t4.ftcdn.net/jpg/06/48/39/19/360_F_648391979_uMz6EwAlKNIJnK9r46UpTiM17nT8GuLl.jpg" alt="" className='size-12 aspect-square object-cover rounded-full' />
                                <div className='flex flex-col justify-center'>
                                    <p className='font-semibold text-lg'>Matt Liu</p>
                                    <ReactStars count={5} size={26} value={4} edit={false} className='my-[-5px]' />
                                    <p className='font-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo velit, reiciendis consequuntur nam aperiam assumenda commodi exercitationem similique, saepe, iste optio neque. Veniam, fuga! Eum voluptatibus quaerat nesciunt! Id, eaque! Repellat, ducimus. Minima quos tenetur laborum voluptas ipsam officia voluptate?</p>
                                </div>
                            </div>

                            <div className='flex gap-4'>
                                <img src="https://t4.ftcdn.net/jpg/06/48/39/19/360_F_648391979_uMz6EwAlKNIJnK9r46UpTiM17nT8GuLl.jpg" alt="" className='size-12 aspect-square object-cover rounded-full' />
                                <div className='flex flex-col justify-center'>
                                    <p className='font-semibold text-lg'>Matt Liu</p>
                                    <ReactStars count={5} size={26} value={4} edit={false} className='my-[-5px]' />
                                    <p className='font-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo velit, reiciendis consequuntur nam aperiam assumenda commodi exercitationem similique, saepe, iste optio neque. Veniam, fuga! Eum voluptatibus quaerat nesciunt! Id, eaque! Repellat, ducimus. Minima quos tenetur laborum voluptas ipsam officia voluptate?</p>
                                </div>
                            </div>

                            <div className='flex justify-center'>
                                <a className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:bg-cyan-900 hover:text-white duration-300 cursor-pointer'>See more</a>
                            </div>
                        </div>
                    </div>

                </div> {/* end of left side */}
                {/* ---------------------------------> Right Side*/}
                <div className='flex flex-1 flex-col md:w-4/6'>
                    {/* -----------------> first component */}

                    <div className='border rounded-lg border-gray-200 shadow-2xl relative h-fit'>
                        {isFavourite ?
                            (<div onClick={() => handleFavourite()} className='absolute gap-4 bg-gray-400 rounded-tr-2xl hover:scale-x-105 cursor-pointer transition-all duration-300 origin-left rounded-br-2xl w-1/2 h-14 left-0 top-8 flex justify-center items-center text-white font-semibold text-xl'>
                                <MdOutlineRemoveCircle />
                                <p>Unfavourite</p>
                            </div>) :
                            (<div onClick={() => handleFavourite()} className='absolute gap-4 bg-pink-400 border rounded-tr-2xl hover:scale-x-105 cursor-pointer transition-all duration-300 origin-left rounded-br-2xl w-1/2 h-14 left-0 top-8 flex justify-center items-center text-gray-100 font-semibold text-xl'>
                                <FaHeart />
                                <p>Favourite</p>
                            </div>)}
                        <div className='w-full flex-row md:flex-col pt-28 text-left justify-start px-5 min-h-80 text-xl text-cyan-900 pb-10 md:pb-0'>
                            <div className='flex flex-col gap-5'>
                                {/* content here */}
                                <div className='flex gap-2 items-center'>
                                    <MdOutlineShareLocation />
                                    <p>Location: {eventInfo.eventLocation}</p>
                                </div>
                                <div className='flex gap-2 flex-col text-lg'>
                                    <div className='flex gap-2 items-center'>
                                        <MdEventNote className='text-green-700' />
                                        <p>Start at: {datimeToEnUS(eventInfo.startTime)}</p>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <MdEventNote className='text-red-700' />
                                        <p>End at:&nbsp;&nbsp; {datimeToEnUS(eventInfo.endTime)}</p>
                                    </div></div>


                                {/* orgnizer */}
                                <div className='flex gap-2 flex-col mx-5'>
                                    {/* tittle */}
                                    <div className='flex justify-center items-center w-full'>
                                        <p className='font-semibold border-gray-300 text-red-700 border-t border-b w-fit'>Organizer</p>
                                    </div>
                                    <div className='flex gap-4'>
                                        <img src={eventInfo.user.avatarUrl} alt="" className='w-1/4 rounded-full aspect-square object-cover' />
                                        <div className='flex flex-col justify-center'>
                                            <p className='font-semibold text-2xl'>{eventInfo.user.firstName} {eventInfo.user.lastName}</p>
                                            <p>Organizer</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col gap-2 px-4 items-center py-2 text-4xl font-semibold'>
                                    <div className='flex items-center gap-2'>
                                        <CiBoxList className='size-10 text-red-700 font-bold' />
                                        <p><span className='text-6xl text-red-700'>{eventInfo.availableTickets}</span>/{eventInfo.totalTickets} seats </p>
                                    </div>
                                    <p className='text-2xl'>available now!</p>
                                </div>

                                <div onClick={() => navigate(`pricing-plan`, { state: { eventInfo } })} className='gap-4 bg-red-700 rounded-tr-2xl hover:scale-110 cursor-pointer transition-all duration-300 rounded-2xl px-4 min-w-fit py-5 mb-7 flex justify-center items-center text-white font-semibold text-3xl'>
                                    <LuTicketCheck />
                                    <p>Buy ticket now!</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Component 2 => Speaker */}
                    <div className='border rounded-lg border-gray-200 bg-white relative h-fit my-10'>
                        <div className='absolute gap-4 border border-cyan-900 hover:text-cyan-900 hover:bg-white bg-cyan-900 duration-300  rounded-tr-2xl rounded-br-2xl w-1/2 h-14 left-0 top-8 flex justify-center items-center text-white font-semibold text-xl'>
                            <GiPublicSpeaker />
                            <p>Best Speaker</p>
                        </div>
                        <div className='w-full flex-col flex gap-6 pt-28 text-left justify-start px-5 min-h-80 text-xl text-cyan-900 pb-10 md:pb-6'>
                            {/* speaker 1 */}
                            {eventInfo.speakers.map((speaker, index) => (
                                <div className='flex gap-4 hover:-translate-x-4 hover:scale-105 hover:bg-gray-50 rounded-full bg-white duration-300'>
                                    <img src={speaker.speakerImageUrl} alt="" className='w-1/3 aspect-square object-cover rounded-full' />
                                    <div className='flex flex-col justify-center'>
                                        <p className='font-semibold text-2xl'>{speaker.speakerName}</p>
                                        <p>{speaker.speakerCareer}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                </div>
            </div>
        </div >
    )
}

export default Details