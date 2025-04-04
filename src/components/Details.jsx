import { SkeletonCard } from '@/components/SkeletonCard';
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
import axiosInstance, { axiosPublic } from '@/axiosConfig';
import { datimeToEnUS } from '@/utils';
import { UserContext } from '@/context/UserContext';
import { toast } from 'react-toastify';
import moment from 'moment';

const Details = () => {
    const { eventId } = useParams();
    const { info } = useContext(UserContext);
    const navigate = useNavigate()
    // Information of event
    const [eventInfo, setEventInfo] = useState(null)
    // Comment
    const [comments, setComments] = useState([])
    // Set input of comment by onChange
    const [inputComment, setInputComment] = useState("")
    const [rating, setRating] = useState(0)
    const [avgRating, setAvgRating] = useState(0)
    const [countRating, setCountRating] = useState(0)
    // favourite
    const [isFavourite, setIsFavourite] = useState(null)
    const [isComment, setIsComment] = useState(null)
    const [isJoined, setIsJoined] = useState(null)
    const [isLoading, setIsloading] = useState(false)

    const fetchIsJoined = async () => {
        console.log("calling")
        if (!info) return;
        try {
            const response = await axiosInstance.get(`/events/${eventId}/is-joined`);
            if (response.status === 200) {
                console.log("result", response.data.result)
                setIsJoined(response.data.result);
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
    }

    const fetchIsComment = async (eventId) => {
        if (!info) return;
        try {
            const response = await axiosInstance.get(`/reviews/${eventId}/reviewed`);
            if (response.status === 200) {
                console.log("result", response.data.result)
                setIsComment(response.data.result);
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
    }

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
            setIsloading(true)
            const response = await axiosPublic.get(`/events/${eventId}`);
            if (response.status === 200) {
                setEventInfo(response.data.result);
                fetchFavourite(response.data.result.eventId);
                fetchIsComment(response.data.result.eventId);
                fetchIsJoined(response.data.result.eventId);
                fetchComments();
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
        } finally {
            setIsloading(false)
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

    const fetchComments = async () => {
        try {
            const response = await axiosInstance.get(`/reviews/${eventId}`);
            if (response.status === 200) {
                const newComments = response.data.result;
                setComments(response.data.result);
                setCountRating(response.data.result.length)
                const averageRating =
                    newComments.length > 0
                        ? newComments.reduce((sum, review) => sum + review.rating, 0) / newComments.length
                        : 0;
                console.log(averageRating)
                setAvgRating(parseFloat(averageRating.toFixed(2)));
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
        scroll(0, 0)
        fetchDetailsEvent(eventId);
    }, [])

    const pushComment = async () => {
        if (!info) return;
        if (!inputComment) {
            toast.error("Please input your comment.");
            return;
        }
        try {
            const response = await axiosInstance.post(`/reviews/${eventId}`, { comment: inputComment, rating: rating });
            if (response.status === 200) {
                toast.success("Comment successfully.");
                fetchComments();
                setRating(0);
                setInputComment("");
                setIsComment(true)
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
        if (info) {
            fetchDetailsEvent(eventId);
        }
    }, [info]);

    console.log("info", info)
    console.log("eventInfo", eventInfo)
    console.log("isJoined", isJoined)
    console.log("isFavourite", isFavourite)
    console.log("isComment", isComment)


    // if (!eventInfo || isJoined == null || isFavourite == null || isComment == null) return <SkeletonCard />
    if (isLoading || !eventInfo) return <SkeletonCard />

    console.log("joined", isJoined)
    console.log("Comment?", isComment)
    if (info) console.log("user id", info.userId)
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
                            <ReactStars count={5} size={26} value={avgRating} edit={false} />
                            <p>{countRating} Ratings</p>
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
                            <p>{countRating} Ratings</p>
                            <ReactStars count={5} size={26} value={avgRating} edit={false} />
                        </div>

                        {eventInfo.eventStatus === 'FINISHED' ?
                            (<div className='flex flex-col py-20 text-justify gap-5'>
                                {/* Comment bar */}

                                {info && info.role == "ATTENDEE" && isComment === false && isJoined &&
                                    <div className='flex gap-4 py-5 border-b'>
                                        <img src={info.avatarUrl} alt="" className='size-12 aspect-square object-cover rounded-full' />
                                        <div className='w-full'>
                                            <div className='flex gap-2 items-center'>
                                                <p className='font-semibold text-lg'>{info.firstName} {info.lastName}</p>
                                                <ReactStars count={5} size={26} value={rating} onChange={setRating} />
                                            </div>
                                            <div className='flex gap-3 rounded-3xl bg-gray-200 p-2 w-full items-center'>
                                                <input placeholder='Input your comment here'
                                                    value={inputComment}
                                                    onChange={(e) => setInputComment(e.target.value)}
                                                    className='flex flex-1 rounded-full bg-none justify-center min-h-10 l px-4'></input>
                                                <IoMdSend
                                                    onClick={() => pushComment()}
                                                    className='size-7 mr-2 cursor-pointer' />
                                            </div>
                                        </div>
                                    </div>}


                                {/* Comment */}
                                {comments.length > 0 && comments.map((comment, index) => (
                                    <div key={index} className='flex gap-4'>
                                        {/* Ảnh đại diện */}
                                        <img
                                            src={comment.user.avatarUrl}
                                            alt="Noname"
                                            className='size-12 aspect-square object-cover rounded-full'
                                        />

                                        {/* Nội dung bình luận */}
                                        <div className='flex flex-col justify-center'>
                                            <div className="flex items-center gap-2">
                                                <p className='font-semibold text-lg'>{comment.user.firstName} {comment.user.lastName}</p>
                                                <span className="text-sm text-gray-500">
                                                    {moment(comment.createdAt).fromNow()}
                                                </span>
                                            </div>

                                            {/* Đánh giá sao */}
                                            <ReactStars
                                                count={5}
                                                size={26}
                                                value={comment.rating}
                                                edit={false}
                                                className='my-[-5px]'
                                            />

                                            {/* Nội dung bình luận */}
                                            <p className='font-light'>{comment.comment}</p>
                                        </div>
                                    </div>
                                ))}

                                {comments.length == 0 &&
                                    <div className="flex flex-col pt-10 text-justify items-center gap-5 text-black p-10 rounded-lg shadow-lg">
                                        <h2 className="text-3xl font-bold mb-4">Currently, there are no reviews</h2>
                                        <p className="text-lg">Feel free to leave your feedback!</p>
                                    </div>}

                                {/* 
                            <div className='flex justify-center'>
                                <a className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:bg-cyan-900 hover:text-white duration-300 cursor-pointer'>See more</a>
                            </div> */}

                            </div>) :
                            (<div className="flex flex-col pt-24 text-justify items-center gap-5 text-black p-10 rounded-lg shadow-lg">
                                <h2 className="text-3xl font-bold mb-4">The event is still going!</h2>
                                <p className="text-lg">Join us and enjoy the events!</p>
                            </div>
                            )}
                    </div>

                </div> {/* end of left side */}
                {/* ---------------------------------> Right Side*/}
                <div className='flex flex-1 flex-col md:w-4/6'>
                    {/* -----------------> first component */}

                    <div className='border rounded-lg border-gray-200 shadow-2xl relative h-fit'>
                        {info && info.role == "ATTENDEE" ? (
                            isFavourite ? (
                                <div
                                    onClick={() => handleFavourite()}
                                    className='absolute gap-4 bg-gray-400 rounded-tr-2xl hover:scale-x-105 cursor-pointer transition-all duration-300 origin-left rounded-br-2xl w-1/2 h-14 left-0 top-8 flex justify-center items-center text-white font-semibold text-xl'
                                >
                                    <MdOutlineRemoveCircle />
                                    <p>Unfavourite</p>
                                </div>
                            ) : (
                                <div
                                    onClick={() => handleFavourite()}
                                    className='absolute gap-4 bg-pink-400 border rounded-tr-2xl hover:scale-x-105 cursor-pointer transition-all duration-300 origin-left rounded-br-2xl w-1/2 h-14 left-0 top-8 flex justify-center items-center text-gray-100 font-semibold text-xl'
                                >
                                    <FaHeart />
                                    <p>Favourite</p>
                                </div>
                            )
                        ) : (
                            <div className='absolute gap-4 bg-gray-500 border rounded-tr-2xl rounded-br-2xl w-1/2 h-14 left-0 top-8 flex justify-center items-center text-gray-100 font-semibold text-xl'>
                                <p>The information</p>
                            </div>
                        )}

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
                                    {eventInfo.eventStatus === 'FINISHED' ? (<p className='text-2xl text-red-600'>This event has ended</p>) : (<p className='text-2xl'>available now!</p>)}

                                </div>
                                {/* {eventInfo.endTime < new Date() ? ( */}
                                {eventInfo.eventStatus === 'FINISHED' ? (<div
                                    className='gap-4 bg-black rounded-tr-2xl rounded-2xl px-4 min-w-fit py-5 mb-7 flex justify-center items-center text-white font-semibold text-3xl'>
                                    <LuTicketCheck />
                                    <p>Event ended!</p>
                                </div>) : (<div onClick={() => {
                                    if (info && info.role == "ATTENDEE" && info.firstName === null) {
                                        toast.warning("Please update your personal information to continue purchasing tickets!", { autoClose: 1700 });
                                    }
                                    else if (info && info.role == "ATTENDEE") {
                                        navigate(`pricing-plan`, { state: { eventInfo } })
                                    }
                                    else {
                                        toast.warning("Please log in with an attendee account to buy tickets!", { autoClose: 1700 });
                                    }
                                }} className='gap-4 bg-red-700 rounded-tr-2xl hover:scale-110 cursor-pointer transition-all duration-300 rounded-2xl px-4 min-w-fit py-5 mb-7 flex justify-center items-center text-white font-semibold text-3xl'>
                                    <LuTicketCheck />
                                    <p>Buy ticket now!</p>
                                </div>)}

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