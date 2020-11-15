const { User } = require("../app/models")
const jwt = require('jsonwebtoken');

const secret = process.env.AUTH_SECRET;

const securityTokens = {
    async createToken(email) {
        let emailChecked = false;
        const user = await User.findOne({ where: { email } });
        if(user)
            emailChecked = user.emailChecked;

        const token = jwt.sign({ email }, secret, { expiresIn: "24h" });

        const initialToken = emailChecked ? 1 : 0;
        return `${initialToken}${token}`;
    },
    decodeToken(token) {
        var emailChecked = parseInt(token.substr(0, 1)) ? true : false;
        token = token.substr(1);
        return jwt.verify(token, secret, (err, decoded) => {
            if (err)
                return { email: null, error: true, emailChecked };

            return { email: decoded.email, error: false, emailChecked };
        });
    },
}

module.exports = securityTokens;