import axios from "axios";

import matchIngredientsWithMeasurements from "../../../utils/utils";

// Eventually make this pull a variable from your .env
const BACKEND_API_URL = "http://localhost:3002";

class UserDbApi {

    // Token for interactions with the User Database
    static token;

    // Generic method for making backend api requests
    static async request(endpoint, method = "get", data = {},) {
        console.debug("User API Call: ", endpoint, method, data);
        const url = `${BACKEND_API_URL}${endpoint}`;
        const headers = {};
        const params = method === "get" ? data : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            //let message = err.response.data.error.message;
            let message = err.response;
            throw Array.isArray(message) ? message : [message];
        };
    };

    /** Login to Nightcapp */
    static async loginUser(data) {
        const response = await this.request(`/auth/login`, "post", data,);
        return response;
    };

    /** Register for Nightcapp */
    static async registerUser(data) {
        const response = await this.request(`/auth/register`, "post", data);
        return response.token;
    };

    /** Add cocktail to user's favorites */
    static async addFavorite(data) {
        const response = await this.request(`/auth/addFavorite`, "post", data);
        return response;
    };

    /** Remove cocktail from user's favorites */
    static async deleteFavorite(userId, cocktail) {
        const response = await this.request(`/auth/deleteFavorite?userId=${userId}&cocktailName=${cocktail.strDrink}`, "delete");
        return response;
    };

    /** Gets all of a user's favorites */
    static async getFavorites(userId) {
        const response = await this.request(`/auth/getFavorites?userId=${userId}`);
        const cocktailNames = response.favorites;
        const favorites = [];

        for (let cocktail of cocktailNames) {
            const cocktailDetails = await axios({
                method: "get",
                url: `${BACKEND_API_URL}/cocktaildb/search_by_name?name=${cocktail.cocktail_name}`,
            });
            cocktail = cocktailDetails.data.drinks[0];
            const ingredientsList = matchIngredientsWithMeasurements(cocktailDetails.data.drinks[0]);
            favorites.push({
                ...cocktail,
                ingredientsList
            });
        };

        return favorites;
    };
};

export default UserDbApi;