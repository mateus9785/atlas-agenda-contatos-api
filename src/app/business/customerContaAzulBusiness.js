const { User } = require('../models');
const customerContaAzul = require("./../externalService/contaAzul/customerContaAzul");
const refreshTokenContaAzul = require("./../../helper/refreshToken");

const result = require('../../helper/result');

const customerContaAzulBusiness = {
  async findAllPaginate({ limit, offset, authenticatedUser }) {
    const { idUser } = authenticatedUser;
    limit = parseInt(limit, {}) || 10;
    offset = parseInt(offset, {}) || 0;

    await refreshTokenContaAzul(idUser);

    const user = await User.findOne({ where: { idUser }});

    const customer = await customerContaAzul.findAll(user.accessToken, offset, limit);

    return result(customer, null, 200);
  },
};

module.exports = customerContaAzulBusiness;
