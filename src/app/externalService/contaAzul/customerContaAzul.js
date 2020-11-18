const createAxiosInstance = require("../../../config/axios");

const customerContaAzul = {
    async findAll(accessToken, page, size) {
        const httpClient = createAxiosInstance(accessToken, `https://api.contaazul.com/v1`)

        const params = { page, size }

        const response = await httpClient.get(`/customers`, { params });

        return response.data;
    },
}

module.exports = customerContaAzul;