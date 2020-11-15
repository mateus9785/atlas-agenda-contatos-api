const routes = require('express').Router();

routes.get('/ping', (req, res) => res.send('pong no agendamento'));

module.exports = routes;