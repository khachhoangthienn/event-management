import { createContext } from "react";
import { events, categories, galleries } from "@/assets/assets";

export const AppContext = createContext();
const AppContextProvider = (props) => {
    const value = {
        events,
        categories,
        galleries
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider