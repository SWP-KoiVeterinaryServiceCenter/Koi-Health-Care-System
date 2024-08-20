import axios from "axios";

const url = "https://capstonebackendwebapi-dvdbgtc4def9h3c2.japanwest-01.azurewebsites.net/";

const api = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const accessToken = JSON.parse(localStorage.getItem("accessToken"));
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
