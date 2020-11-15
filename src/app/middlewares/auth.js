const jwt = require('jsonwebtoken');

const secret = process.env.AUTH_SECRET;

module.exports = (req, res, next) => {
  const { authorization, isAdmin } = req.headers;

  if (!authorization) return res.status(401).send('O token não foi enviado');

  const parts = authorization.split(' ');

  if (!parts.length === 2) return res.status(401).send('Token inválido');

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send('Token mal-formado');

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(401).send('Token inválido');

    const { idUser } = decoded;

    req.authenticatedUser = { idUser };
    return next();
  });
};
