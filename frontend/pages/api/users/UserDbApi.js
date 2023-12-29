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
            console.error("Response Status: ", err.response.status);
            console.error("Response Headers: ", err.response.headers);
            console.error("Response Data: ", err.response.data);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        };
    };

    /** Login to Nightcapp */
    static async loginUser(data) {
        let response = await this.request(`/auth/login`, data, "post");
        console.log("response.token in UserDbApi:", response.token);
        return response.token;
    };

    /** Register for Nightcapp */
    static async registerUser(data) {
        let response = await this.request(`/auth/register`, data, "post");
        return response.token;
    };
};

export default UserDbApi;