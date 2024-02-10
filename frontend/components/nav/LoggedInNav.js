import styles from "./Navbar.module.css";

import Link from "next/link";
import { useRouter } from "next/router";

function LoggedInNav(props) {
    // Only using useRouter to make so that if the user is on the home screen "Home"
    // in the Navbar is highlighted, and the same happens on the "About us" page
    const router = useRouter();

    console.log(`/favorites/[${props.userId}]`);

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
                <li className={`${styles.navItem} ${router.pathname.startsWith("/favorites") ? styles.active : ""}`}>
                    <Link
                        href={`/favorites/[${props.userId}]`}
                        onClick={props.handleGetFavorites}
                    >
                        Favorites
                    </Link>
                </li>
                <li className={`${styles.navItem}`} onClick={props.logout}>
                    Logout
                </li>
            </ul>
        </div>
    );
};

export default LoggedInNav;