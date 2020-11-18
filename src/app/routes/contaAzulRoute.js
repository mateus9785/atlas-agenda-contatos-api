const routes = require('express').Router();

const contaAzulController = require('../controllers/contaAzulController');

const controller = require('../middlewares/controller');

routes.get('/conta-azul/authorize', controller(contaAzulController.authorize));

module.exports = routes;