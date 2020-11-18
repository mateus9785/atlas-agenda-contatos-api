const { User } = require('../models');
const result = require("../../helper/result");
const tokenContaAzul = require("../externalService/contaAzul/tokenContaAzul");

const authContaAzulBusiness = {
  async authorize({ code, state }) {

    const data = await tokenContaAzul.createToken(code);

    const { access_token, refresh_token, expires_in } = data;
    const now = new Date();

    await User.update(
      {
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresIn: addSecondsInDate(now, expires_in),
      },
      { where: { state } }
    )

    return result(null, "Aplicativo autorizado pela Conta Azul", 200);
  },
};

function addSecondsInDate(date, seconds){
  const totalSeconds = date.setSeconds(date.getSeconds() + seconds)
  return new Date(totalSeconds);
}

module.exports = authContaAzulBusiness;