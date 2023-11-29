import styles from "./HomePageIntro.module.css";

import SearchForm from "../searchForm/SearchForm";

function HomepageIntro() {
    return (
        <div id={styles.container}>
            <h1 id={styles.h1}>Nightcapp</h1>
            <p id={styles.p}>
                <span id={styles.welcome}>Welcome in.</span>
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