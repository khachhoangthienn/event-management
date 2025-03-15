import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../axiosConfig";
import { UserContext } from "./UserContext";

export const NotificationContext = createContext();

const NotificationContextProvider = (props) => {
    const { info } = useContext(UserContext);
    const [notifications, setNotifications] = useState([]);
    const [filter, setFilter] = useState("all");
    const [unreadNotifications, setUnreadNotifications] = useState(0);
    const [newestNotifications, setNewestNotifications] = useState([])


    const fetchNotifications = async () => {
        if (!info) return;
        try {
            const response = await axiosInstance.get(`/notifications/mine?filter=${filter}`);
            if (response.status === 200) {
                setNotifications(response.data.result);
                setUnreadNotifications(response.data.result.filter(notification => !notification.read).length)
            }
        } catch (error) {
            console.error("Fetch notifications error:", error);
        }
    };

    const fetchUnread = async () => {
        if (!info) return;
        try {
            const response = await axiosInstance.get(`/notifications/mine?filter=all`);
            if (response.status === 200) {
                setUnreadNotifications(response.data.result.filter(notification => !notification.read).length)
            }
        } catch (error) {
            console.error("Fetch notifications error:", error);
        }
    };

    const fetchnewestNotifications = async () => {
        if (!info) return;
        try {
            const response = await axiosInstance.get(`/notifications/my-newest-notifications`);
            if (response.status === 200) {
                setNewestNotifications(response.data.result);
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

    useEffect(() => {
        fetchNotifications();
        fetchUnread();
        fetchnewestNotifications();
    }, [info, notifications, unreadNotifications]);

    const value = {
        fetchNotifications,
        setNotifications,
        notifications,
        filter,
        setFilter,
        unreadNotifications,
        fetchUnread,
        fetchnewestNotifications,
        newestNotifications
    }

    return (
        <NotificationContext.Provider value={value}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContextProvider