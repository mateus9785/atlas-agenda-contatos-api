const crypto = require('crypto');

function createToken(){
    const token = crypto.randomBytes(20).toString('hex');

    const now = new Date();
    now.setHours(now.getHours() + 24);

    return {
        forgotToken: token,
        expiresToken: now
    };
}

module.exports = createToken;