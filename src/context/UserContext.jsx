import { createContext, useState } from "react";
import { axiosInstance } from "../axiosConfig";

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [info, setInfo] = useState(null);

    const getUserInfo = async () => {
        try {
            console.log("get user info");
            const response = await axiosInstance.get("/users/me");
            if (response.status === 200) {
                const result = await response.data.result;
                setInfo(result);
                return result;
            }
        } catch (error) {
            if (error.response) {
                const { code, message } = error.response.data;
                console.log("Can not get user information");
            } else {
                console.log("Can not get user information");
            }
        }
    };

    const value = {
        info,
        setInfo,
        getUserInfo,
    }

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider