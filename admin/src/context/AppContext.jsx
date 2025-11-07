// Utility context for shared app-level functions and constants
import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currency = '$';
    const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Format slot date as "DD Mon YYYY"
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('-');
        return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
    };

    // Calculate age from DOB
    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        return today.getFullYear() - birthDate.getFullYear();
    };

    const value = { calculateAge, slotDateFormat, currency };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
