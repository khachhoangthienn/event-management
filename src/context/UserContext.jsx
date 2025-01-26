import { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [info, setInfo] = useState(null);
    const value = {
        info,
        setInfo
    }

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider