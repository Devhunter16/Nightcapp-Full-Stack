import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

import Layout from "../../../components/layout/Layout";
import DrinksList from "../../../components/drinksList/DrinksList";

export default function DrinksPage() {
    const [parsedCocktails, setParsedCocktails] = useState([]);
    const router = useRouter();

    const {
        query: { drinks }
    } = router;

    // Set the parsedCocktail state when the component mounts
    useEffect(() => {
        try {
            if (drinks) {
                const parsedDrinks = JSON.parse(drinks);
                setParsedCocktails(parsedDrinks);
            }
        } catch (error) {
            console.error("Error parsing drinks data", error);
            // FIXME Handle the error, e.g., redirect to an error page or display an error message
        }
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
            <DrinksList
                results={parsedCocktails}
                handleShowDrinkRecipe={handleShowDrinkRecipe}
            />
        </Layout>
    );
};