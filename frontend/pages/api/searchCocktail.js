import axios from "axios";

const BACKEND_API_URL = "http://localhost:3002";

// Function that makes a get request to the backend API to search cocktails by name
export async function searchCocktailByName(searchTerm) {
    try {
        const response = await axios({
            method: "get",
            url: `${BACKEND_API_URL}/search?recipe=${searchTerm}`,
        });
        const {
            drinks
        } = response.data;
        const cocktails = [];
        for (const cocktail of drinks) {
            const ingredientsList = matchIngredientsWithMeasurements(cocktail);
            cocktails.push({
                ...cocktail,
                ingredientsList
            });
        };
        console.log(cocktails);
        return cocktails;
    } catch (error) {
        console.log("Error with GET request to backend API");
        console.error(error);
    };
};

// Function that makes a get request to the backend API to search cocktails by ingredient
export async function searchCocktailByIngredient(searchTerm) {
    try {
        const response = await axios({
            method: "get",
            url: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchTerm}`,
        });
        const {
            drinks
        } = response.data;
        const cocktails = [];
        for (let cocktail of drinks) {
            // Unfortunately because of the way the cocktail db is set up, we need to make
            // a seperate GET request for every drink in the response
            const cocktailDetails = await axios({
                method: "get",
                url: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail.strDrink}`,
            });
            cocktail = cocktailDetails.data.drinks[0];
            const ingredientsList = matchIngredientsWithMeasurements(cocktailDetails.data.drinks[0]);
            cocktails.push({
                ...cocktail,
                ingredientsList
            });
        };
        return cocktails;
    } catch (error) {
        console.error(error);
    };
};

export function matchIngredientsWithMeasurements(cocktailData) {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
        const ingredient = {};
        if (cocktailData[`strMeasure${i}`]) {
            ingredient.measurement = cocktailData[`strMeasure${i}`];
        }
        if (cocktailData[`strIngredient${i}`]) {
            ingredient.name = cocktailData[`strIngredient${i}`];
        }
        if (Object.keys(ingredient).length) {
            ingredients.push(ingredient);
        }
    };
    return ingredients;
};