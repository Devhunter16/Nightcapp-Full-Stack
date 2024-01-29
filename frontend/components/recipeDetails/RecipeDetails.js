import styles from "./RecipeDetails.module.css";

import { useState, useEffect, useContext } from "react";

import UserContext from "../auth/CurrentUserContext";

function RecipeDetails(props) {
    const { token } = useContext(UserContext);

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

    return (
        <>
            <div id={styles.body}>
                <img className={styles.img} src={props.image}></img>
                <div id={styles.description}>
                    <h1 id={styles.drinkTitle}>{props.name}</h1>
                    <h3 id={styles.ingredientsTitle}>Ingredients</h3>
                    <ul>
                        <div>
                            {props.ingredientsList &&
                                props.ingredientsList.map((ingredient) => (
                                    <li id={styles.ingredient}>
                                        {ingredient.name} -{" "}
                                        <span id={styles.measurements}>
                                            {ingredient.measurement}
                                        </span>
                                    </li>
                                ))}
                        </div>
                    </ul>
                    <h3 id={styles.directionsTitle}>Directions</h3>
                    <p id={styles.drinkDescription}>{props.instructions}</p>
                    {isLoggedIn && <button id={styles.btn} onClick={props.addFavorite}>Add to my favorites</button>}
                </div>
            </div>
        </>
    );
};

export default RecipeDetails;