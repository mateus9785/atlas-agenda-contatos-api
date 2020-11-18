const axios = require("axios")

function createAxiosInstance(token, url){
    const api = axios.create({
        baseURL: url,
        proxy: false,
        port: 443,
    })
    api.interceptors.request.use(function(config){
        config.headers.authentication = `Bearer ${token}`;
        config.headers.contentType = "application/json";
        return config;
    })

    return api;
}

module.exports = createAxiosInstance;