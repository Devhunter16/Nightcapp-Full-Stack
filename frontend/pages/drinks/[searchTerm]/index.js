import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

import Layout from "../../../components/layout/Layout";
import DrinksList from "../../../components/drinksList/DrinksList";

export default function DrinksPage() {
    const [parsedCocktails, setParsedCocktails] = useState([]);
    // Loading state so that RecipeDetails does not try to render before parsedCocktail
    // is initialized
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const {
        query: { drinks }
    } = router;

    // Set the parsedCocktail state when the component mounts
    useEffect(() => {
        if (drinks) {
            const parsedDrinks = JSON.parse(drinks);
            console.log(parsedDrinks[0]);
            setParsedCocktails(parsedDrinks);
            setLoading(false); // Set loading to false after parsedDrinks is initialized
        };
    }, [drinks]);

    const handleShowDrinkRecipe = (result) => {
        // Pushing variables through to page and setting the route
        router.push({
            pathname: `/drink/${result.idDrink}`,
            query: {
                drink: JSON.stringify(result)
            }
        })
    };

    return (
        <Layout>
            {loading ? (
                <p>Loading...</p> // Show a loading indicator while parsedCocktail is being initialized
            ) : (
                <DrinksList
                    results={parsedCocktails}
                    handleShowDrinkRecipe={handleShowDrinkRecipe}
                />
            )}
        </Layout>
    );
};