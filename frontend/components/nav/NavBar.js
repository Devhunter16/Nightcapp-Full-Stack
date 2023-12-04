import styles from "./Navbar.module.css";

import { useRouter } from "next/router";

import Link from "next/link";

import SearchForm from "../searchForm/SearchForm";

function Navigation() {
    // Only using useRouter to make so that if the user is on the home screen "Home"
    // in the Navbar is highlighted, and the same happens on the "About us" page
    const router = useRouter();

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

    return (
        <>
            <div className={styles.nav}>
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
            </div>
        </>
    );
};

export default Navigation;