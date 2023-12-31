import styles from "./HomePageIntro.module.css";

import { useContext } from "react";

import SearchForm from "../searchForm/SearchForm";
import CurrentUserContext from "../auth/CurrentUserContext";

function HomepageIntro() {
    const { token, currentUser } = useContext(CurrentUserContext);

    return (
        <div id={styles.container}>
            <h1 id={styles.h1}>Nightcapp</h1>
            <p id={styles.p}>
                <span id={styles.welcome}>Welcome {token ? currentUser : "in"}</span>
                <span>
                    Search for your favorite
                    cocktail or browse our collection.
                </span>
            </p>
            <SearchForm />
        </div>
    );
};

export default HomepageIntro;