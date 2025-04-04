import { createContext, useContext, useEffect, useState } from "react";
import { events, categories, galleries } from "@/assets/assets";
import axiosPublic, { axiosInstance } from "@/axiosConfig";
import { UserContext } from "./UserContext";

export const EventContext = createContext();

const EventContextProvider = (props) => {
    const [types, setTypes] = useState([])
    const [events, setEvents] = useState([])
    const [popularEvents, setPopularEvents] = useState([])
    const [topEvents, setTopEvents] = useState([])
    const { info } = useContext(UserContext)

    const [isComing, setIsComing] = useState(false)

    const setFlipComing = () => {
        setIsComing(!isComing);
    };

    const fetchTypes = async () => {
        try {
            const response = await axiosPublic.get("/types");
            if (response.status === 200) {
                setTypes(response.data.result);
            }
        } catch (error) {
            console.log("this is error code: " + (error.response?.data?.code || "Unknown"));
            if (error.response) {
                const { code } = error.response.data;
                // Xử lý lỗi dựa vào mã code
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

    const fetchPopularEvents = async () => {
        try {
            const response = await axiosPublic.get(`/events?status=${isComing ? "FINISHED" : "APPROVED"}`);
            if (response.status === 200) {
                setPopularEvents(response.data.result);
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

    const fetchTopEvents = async () => {
        try {
            const response = await axiosPublic.get(`/events/top-events-by-favourites`);
            if (response.status === 200) {
                setTopEvents(response.data.result);
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

    const [recommendEvent, setRecommendEvents] = useState([])

    const fetchRecommendEvents = async () => {
        if (!info) return
        try {
            const response = await axiosInstance.get(`/events/my-recommended-events`);
            if (response.status === 200) {
                setRecommendEvents(response.data.result);
                console.log(response.data.result)
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
        fetchPopularEvents();
        fetchTopEvents();
        fetchTypes();
    }, [isComing]);

    useEffect(() => {
        if (info) {
            fetchRecommendEvents();
        }
    }, [info]);

    const value = {
        events,
        categories,
        galleries,
        types,
        popularEvents,
        topEvents,
        recommendEvent,
        fetchRecommendEvents,
        setFlipComing,
        isComing
    }

    return (
        <EventContext.Provider value={value}>
            {props.children}
        </EventContext.Provider>
    )
}

export default EventContextProvider