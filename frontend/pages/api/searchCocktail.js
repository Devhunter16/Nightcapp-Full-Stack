import axios from "axios";

import matchIngredientsWithMeasurements from "../../utils/utils";

const BACKEND_API_URL = "/";

// Function that makes a get request to the backend API to search cocktails by name
export async function searchCocktailByName(searchTerm) {
    try {
        const response = await axios({
            method: "get",
            url: `${BACKEND_API_URL}/cocktaildb/search_by_name?name=${searchTerm}`,
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
            url: `${BACKEND_API_URL}/cocktaildb/search_by_ingredient?ingredient=${searchTerm}`,
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
                url: `${BACKEND_API_URL}/cocktaildb/search_by_name?name=${cocktail.strDrink}`,
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