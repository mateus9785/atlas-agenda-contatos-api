const pass = process.env.SMPT_PASSWORD;
const user = process.env.SMPT_USER;

module.exports = {
    name: 'www.evacommerce.com.br',
    host: 'mail.evacommerce.com.br',
    port: 465,
    secure: true,
    auth: {
        user,
        pass,
    },
}