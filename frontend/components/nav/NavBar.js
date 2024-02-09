import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

import LoggedInNav from "./LoggedInNav";
import LoggedOutNav from "./LoggedOutNav";
import SearchForm from "../searchForm/SearchForm";
import UserContext from "../auth/CurrentUserContext";
import UserDbApi from "../../pages/api/users/UserDbApi";
import { useModal } from "../modal/ModalContext"

function Navigation() {
    const { token, currentUser, logout } = useContext(UserContext);
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


    const handleGetFavorites = async () => {
        try {
            const favorites = await UserDbApi.getFavorites(currentUser);
            // Pushing variables through to page and setting the route
            router.push({
                pathname: `/favorites/${currentUser}`,
                query: {
                    favorites: JSON.stringify(favorites),
                },
            });
        } catch (error) {
            console.error("Error getting favorites:", error);
        };
    };

    // Conditionally render the SearchForm only on specific pages
    const renderSearchForm = () => {
        const pagesWithSearchForm = [
            "/drink/[drinkId]",
            "/drinks/[searchTerm]",
            "/favorites/[userId]"
        ];
        return pagesWithSearchForm.includes(router.pathname) ? <SearchForm /> : null;
    };

    // Handle logout action
    const handleLogout = () => {
        logout();
        router.push("/");
        setUserStatus("loggedOut");
        setIsLoggedIn(false);
    };

    return (
        <>
            {
                isLoggedIn ? (
                    <LoggedInNav
                        handleGetFavorites={handleGetFavorites}
                        userId={currentUser}
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