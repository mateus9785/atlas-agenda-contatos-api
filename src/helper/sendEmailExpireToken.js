const sendMail = require('./sendMail');
const { createToken } = require('./securityTokens');

async function sendEmailExpireToken(email, subject, text, urlBase) {
  const token = await createToken(email);

  const link = `${urlBase}/${token}`;

  await sendMail(email, subject, text, link);
}

module.exports = sendEmailExpireToken;
