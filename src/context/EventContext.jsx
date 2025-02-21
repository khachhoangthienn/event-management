import { createContext, useEffect, useState } from "react";
import { events, categories, galleries } from "@/assets/assets";
import axiosPublic from "@/axiosConfig";

export const EventContext = createContext();
const EventContextProvider = (props) => {
    const [types, setTypes] = useState([])
    const [events, setEvents] = useState([])
    const [popularEvents, setPopularEvents] = useState([])
    const [topEvents, setTopEvents] = useState([])
    const [recommendedEvents, setRecommendedEvents] = useState([])

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
            const response = await axiosPublic.get(`/events?status=APPROVED`);
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

    useEffect(() => {
        fetchPopularEvents();
        fetchTypes();
    }, []);

    const value = {
        events,
        categories,
        galleries,
        types,
        popularEvents,
    }

    return (
        <EventContext.Provider value={value}>
            {props.children}
        </EventContext.Provider>
    )
}

export default EventContextProvider