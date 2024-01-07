import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

import UserContext from "../auth/CurrentUserContext";
import LoggedInNav from "./LoggedInNav";
import LoggedOutNav from "./LoggedOutNav";
import { useModal } from "../modal/ModalContext"

function Navigation() {
    const { token, logout } = useContext(UserContext);
    const { setUserStatus } = useModal();
    const router = useRouter();

    // State to manage the logged-in status
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check if token exists on mount and update isLoggedIn accordingly
    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        };
    }, [token]);

    // Conditionally render the SearchForm only on specific pages
    const renderSearchForm = () => {
        const pagesWithSearchForm = ["/drink/[drinkId]", "/drinks/[searchTerm]"];
        return pagesWithSearchForm.includes(router.pathname) ? <SearchForm /> : null;
    };

    // Handle logout action
    const handleLogout = () => {
        logout();
        console.log("Hello from handleLogout function!");
        setUserStatus("loggedOut");
        setIsLoggedIn(false);
    };

    return (
        <>
            {
                isLoggedIn ? (
                    <LoggedInNav
                        logout={handleLogout}
                        renderSearchForm={renderSearchForm}
                    />
                ) : (
                    <LoggedOutNav
                        renderSearchForm={renderSearchForm}
                    />
                )
            }
        </>
    );
};

export default Navigation;