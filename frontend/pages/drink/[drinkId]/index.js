import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

import { matchIngredientsWithMeasurements } from "../../api/searchCocktail";
import Layout from "../../../components/layout/Layout";
import RecipeDetails from "../../../components/recipeDetails/RecipeDetails";

export default function DrinkPage() {
    const [parsedCocktail, setParsedCocktail] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const {
        query: { drink }
    } = router;

    useEffect(() => {
        const fetchData = async () => {
            if (drink) {
                const parsedCocktail = JSON.parse(drink);
                const name = parsedCocktail.strDrink;
                const image = parsedCocktail.strDrinkThumb;
                const instructions = parsedCocktail.strInstructions;
                const ingredientsList = matchIngredientsWithMeasurements(parsedCocktail);

                // Simulate image loading to ensure all data is available
                const imagePromise = new Promise(resolve => {
                    const img = new Image();
                    img.onload = () => resolve(img);
                    img.src = image;
                });

                await Promise.all([imagePromise]);

                setParsedCocktail({ name, image, instructions, ingredientsList });
                setLoading(false);
            }
        };

        fetchData();
    }, [drink]);

    return (
        <Layout>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <RecipeDetails
                    name={parsedCocktail.name}
                    image={parsedCocktail.image}
                    instructions={parsedCocktail.instructions}
                    ingredientsList={parsedCocktail.ingredientsList}
                />
            )}
        </Layout>
    );
};