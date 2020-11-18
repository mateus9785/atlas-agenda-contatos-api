const axios = require("axios");
const { generateHeaderBasic } = require("../../../helper/generateHeader");

const redirect_uri = process.env.redirect_uri

const tokenContaAzul = {
    async createToken(code) {
        const headers = { 'Authorization': generateHeaderBasic(), }

        const baseUrl = "https://api.contaazul.com/oauth2/token";

        const { data } = await axios.post(baseUrl, {
            redirect_uri,
            code,
            grant_type: "authorization_code",
        }, { headers });

        return data;
    },
    async refreshToken(refresh_token) {
        const headers = { 'Authorization': generateHeaderBasic(), }

        const baseUrl = "https://api.contaazul.com/oauth2/token";

        const { data } = await axios.post(baseUrl, {
            refresh_token,
            grant_type: "refresh_token",
        }, { headers });

        return data;
    },
}

module.exports = tokenContaAzul;