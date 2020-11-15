const axios = require("axios")

function createAxiosInstance(token, url, userAgent=""){
    const api = axios.create({
        baseURL: url,
        proxy: false,
        port: 443,
    })
    api.interceptors.request.use(function(config){
        config.headers.authentication = `bearer ${token}`;
        config.headers.contentType = "application/json";
        config.headers.UserAgent = userAgent;
        return config;
    })

    return api;
}

module.exports = createAxiosInstance;