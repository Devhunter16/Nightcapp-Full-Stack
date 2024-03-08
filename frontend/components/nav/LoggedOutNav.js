import styles from "./NavBar.module.css";

import Link from "next/link";
import { useRouter } from "next/router";

function LoggedOutNav(props) {
    // Only using useRouter to make so that if the user is on the home screen "Home"
    // in the Navbar is highlighted, and the same happens on the "About us" page
    const router = useRouter();

    return (
        <div className={styles.nav}>
            <ul className={styles.navList}>
                <li className={styles.logo}>
                    <Link href="/">Nightcapp</Link>
                </li>
            </ul>
            <div className={styles.searchForm}>
                {props.renderSearchForm()}
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
    );
};

export default LoggedOutNav;