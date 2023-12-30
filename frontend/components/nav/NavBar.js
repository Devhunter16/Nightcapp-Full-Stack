import styles from "./Navbar.module.css";

import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/router";

import SearchForm from "../searchForm/SearchForm";
import UserContext from "../auth/CurrentUserContext";

// FIXME Why does the navbar not change no matter what I set display to?

function Navigation() {
    // Only using useRouter to make so that if the user is on the home screen "Home"
    // in the Navbar is highlighted, and the same happens on the "About us" page
    const router = useRouter();
    const { token, setToken } = useContext(UserContext);

    // Conditionally render the SearchForm only on specific pages
    const renderSearchForm = () => {
        // Add the pages where we want the SearchForm to appear in the Navbar
        const pagesWithSearchForm = ["/drink/[drinkId]", "/drinks/[searchTerm]"];
        if (pagesWithSearchForm.includes(router.pathname)) {
            return (
                <div className={styles.searchForm}>
                    <SearchForm />
                </div>
            );
        };
        // Render nothing if the page is not in the array
        return null;
    };

    // Sets token back to null which logs the user out
    const handleLogout = () => {
        setToken(null);
    };

    function loggedInNav() {
        return (
            <>
                <ul className={styles.navList}>
                    <li className={styles.logo}>
                        <Link href="/">Nightcapp</Link>
                    </li>
                </ul>
                <div className={styles.searchForm}>
                    {renderSearchForm()}
                </div>
                <ul className={styles.navList}>
                    <li className={`${styles.navItem} ${router.pathname === "/" ? styles.active : ""}`}>
                        <Link href="/">Home</Link>
                    </li>
                    <li className={`${styles.navItem} ${router.pathname === "/about" ? styles.active : ""}`}>
                        <Link href="/about">About Us</Link>
                    </li>
                    <li className={`${styles.navItem}`} onClick={handleLogout}>
                        <Link href="/">Logout</Link>
                    </li>
                </ul>
            </>
        );
    };

    function loggedOutNav() {
        return (
            <>
                <ul className={styles.navList}>
                    <li className={styles.logo}>
                        <Link href="/">Nightcapp</Link>
                    </li>
                </ul>
                <div className={styles.searchForm}>
                    {renderSearchForm()}
                </div>
                <ul className={styles.navList}>
                    <li className={`${styles.navItem} ${router.pathname === "/" ? styles.active : ""}`}>
                        <Link href="/">Home</Link>
                    </li>
                    <li className={`${styles.navItem} ${router.pathname === "/about" ? styles.active : ""}`}>
                        <Link href="/about">About Us</Link>
                    </li>
                    <li className={`${styles.navItem} ${router.pathname === "/login" ? styles.active : ""}`}>
                        <Link href="/login">Login</Link>
                    </li>
                    <li className={`${styles.navItem} ${router.pathname === "/register" ? styles.active : ""}`}>
                        <Link href="/register">Register</Link>
                    </li>
                </ul>
            </>
        );
    };

    return (
        <div className={styles.nav}>
            {token ? loggedInNav() : loggedOutNav()}
        </div>
    );
};

export default Navigation;