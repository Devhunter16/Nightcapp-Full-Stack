import styles from "../../../styles/Favorites.module.css";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "../../../components/layout/Layout";
import FavoritesList from "../../../components/favoritesList/FavoritesList";

export default function Favorites() {
    const [parsedFavorites, setParsedFavorites] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const router = useRouter();


    const {
        query: { favorites }
    } = router;

    // Set the parsedCocktail state when the component mounts
    useEffect(() => {
        try {
            if (favorites) {
                handleSetParsedFavorites();
            };
        } catch (error) {
            console.error("Error parsing favorites data", error);
            // FIXME Handle the error, e.g., redirect to an error page or display an error message
        };
    }, [favorites]);

    const handleSetParsedFavorites = async () => {
        const parsedDrinks = JSON.parse(favorites);
        await setParsedFavorites(parsedDrinks);
        // This strange looking if statement below is the only way of making sure 
        // the h1 does not flash on screen before showing the favorites list, if
        // the favorites list length is equal to 2 it essentially means the user
        // has not added any favorites yet
        if (favorites.length === 2) {
            setShowMessage(true);
        };
        // ELSE some error message
    };

    const handleShowFavoriteRecipe = (favorite) => {
        // Pushing variables through to page and setting the route
        router.push({
            pathname: `/drink/${favorite.idDrink}`,
            query: {
                drink: JSON.stringify(favorite)
            }
        });
    };

    return (
        <Layout>
            {favorites && <FavoritesList
                favorites={parsedFavorites}
                handleShowFavorites={handleShowFavoriteRecipe}
            />}
            {showMessage && <h1 className={styles.noFavoritesMessage}>
                Try searching a cocktail to add it as a favorite!
            </h1>}
        </Layout>
    );
};