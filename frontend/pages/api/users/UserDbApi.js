import axios from "axios";

// Eventually make this pull a variable from your .env
const BACKEND_API_URL = "http://localhost:3002";

class UserDbApi {

    // Token for interactions with the User Database
    static token;

    // Generic method for making backend api requests
    static async request(endpoint, data = {}, method = "get") {
        console.debug("User API Call: ", endpoint, data, method);
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
        const response = await this.request(`/auth/login`, data, "post");
        return response;
    };

    /** Register for Nightcapp */
    static async registerUser(data) {
        const response = await this.request(`/auth/register`, data, "post");
        return response.token;
    };

    /** Add cocktail to user's favorites */
    static async addFavorite(data) {
        const response = await this.request(`/auth/addFavorite`, data, "post");
        return response;
    };

    /** Gets all of a user's favorites */
    static async getFavorites(userId) {
        const response = await this.request(`/auth/getFavorites?userId=${userId}`);
        return response;
    };
};

export default UserDbApi;