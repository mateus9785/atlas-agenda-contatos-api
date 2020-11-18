const { User } = require('./../app/models');
const { refreshToken } = require('./../app/externalService/contaAzul/tokenContaAzul');

async function refreshTokenContaAzul(idUser) {
    const now = new Date();
    const user = await User.findOne({ where: { idUser } });
    if (now > new Date(user.expiresIn)) {
        const data = await refreshToken(user.accessToken);
        const { access_token, refresh_token, expires_in } = data;

        user.accessToken = access_token;
        user.refreshToken = refresh_token;
        user.expiresIn = addSecondsInDate(now, expires_in);
        await user.save();
    }
}

function addSecondsInDate(date, seconds) {
    const totalSeconds = date.setSeconds(date.getSeconds() + seconds)
    return new Date(totalSeconds);
}

module.exports = refreshTokenContaAzul;