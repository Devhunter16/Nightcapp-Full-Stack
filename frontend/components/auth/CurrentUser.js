import { useState, useEffect } from "react";

import CurrentUserContext from "./CurrentUserContext";
import useLocalStorage from "../../hooks/useLocalStorage";

export const TOKEN_STORAGE_ID = "nightcapp-token";

export default function CurrentUser({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

    useEffect(() => {
        const item = localStorage.getItem(TOKEN_STORAGE_ID);
        setToken(item);
    }, [setToken]);

    useEffect(() => {
        setCurrentUser({ name: "John Doe" });
    }, []);

    // Function to clear the token and log the user out
    const logout = () => {
        // Clear token from local storage
        localStorage.removeItem(TOKEN_STORAGE_ID);
        // Clear token state
        setToken(null);
        // Update currentUser state
        setCurrentUser(null);
    };

    const initialValue = {
        currentUser,
        setCurrentUser,
        token,
        setToken,
        logout
    };

    return (
        <CurrentUserContext.Provider value={initialValue}>
            {children}
        </CurrentUserContext.Provider>
    );
};