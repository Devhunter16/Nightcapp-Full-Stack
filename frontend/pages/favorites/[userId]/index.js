import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "../../../components/layout/Layout";
import FavoritesList from "../../../components/favoritesList/FavoritesList";

export default function Favorites() {
    const [parsedFavorites, setParsedFavorites] = useState([]);
    const router = useRouter();


    const {
        query: { favorites }
    } = router;

    // Set the parsedCocktail state when the component mounts
    useEffect(() => {
        try {
            if (favorites) {
                const parsedDrinks = JSON.parse(favorites);
                setParsedFavorites(parsedDrinks);
            };
        } catch (error) {
            console.error("Error parsing favorites data", error);
            // FIXME Handle the error, e.g., redirect to an error page or display an error message
        };
    }, [favorites]);

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
            <FavoritesList
                favorites={parsedFavorites}
                handleShowFavorites={handleShowFavoriteRecipe}
            />
        </Layout>
    );
};