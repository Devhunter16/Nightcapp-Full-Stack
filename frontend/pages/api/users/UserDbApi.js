import axios from "axios";

const BACKEND_API_URL = "http://localhost:3002";

class UserDbApi {

    // token for interactions with the User Database
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
            console.log(data);
            console.error("API Error: ", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        };
    };

    static async loginUser(data) {
        let response = await this.request(`/auth/login`, data, "post");
        return response.token;
    };

    /** Register for Nightcapp */
    static async registerUser(data) {
        let response = await this.request(`/auth/register`, data, "post");
        return response.token;
    };
};

export default UserDbApi;