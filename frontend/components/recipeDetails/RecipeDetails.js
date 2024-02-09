import styles from "./RecipeDetails.module.css";

import { useState, useEffect, useContext } from "react";

import UserContext from "../auth/CurrentUserContext";
import UserDbApi from "../../pages/api/users/UserDbApi";

function RecipeDetails(props) {
    const { token, currentUser } = useContext(UserContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Used props.name as a dependency because it changes every time the component
    // mounts and leaving a blank array in order to do the same was causing bugs
    useEffect(() => {
        handleCheckIfDrinkIsFavorite();
    }, [props.name, props.addFavorite]);

    const handleCheckIfDrinkIsFavorite = async () => {
        const favorites = await UserDbApi.getFavorites(currentUser);
        handleCheckIfUserIsLoggedIn();
        for (const favorite of favorites) {
            if (props.name === favorite.strDrink) {
                setIsFavorite(true);
                setIsLoading(false);
                return;
            } else {
                setIsFavorite(false);
                setIsLoading(false);
            };
        };
        return;
    };

    const handleCheckIfUserIsLoggedIn = () => {
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        };
    };

    return (
        <>
            {isLoading ? (
                <p>Loading...</p>) : (
                <div id={styles.body}>
                    <img className={styles.img} src={props.image} alt={`${props.name} drink`}></img>
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
                        {isLoggedIn && (
                            <>
                                {isFavorite ? (
                                    <button className={styles.btn} onClick={props.removeFavorite}>
                                        Remove from my favorites
                                    </button>
                                ) : (
                                    <button className={styles.btn} onClick={props.addFavorite}>
                                        Add to my favorites
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default RecipeDetails;