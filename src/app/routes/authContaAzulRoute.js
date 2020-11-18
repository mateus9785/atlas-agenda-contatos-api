const routes = require('express').Router();

const authContaAzulController = require('../controllers/authContaAzulController');

const controller = require('../middlewares/controller');

routes.get('/conta-azul/authorize', controller(authContaAzulController.authorize));

module.exports = routes;