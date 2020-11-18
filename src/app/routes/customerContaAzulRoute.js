const routes = require('express').Router();

const customerContaAzulController = require('../controllers/customerContaAzulController');

const auth = require('../middlewares/auth');
const controller = require('../middlewares/controller');

routes.get('/conta-azul/customer/paginate', auth, controller(customerContaAzulController.findAllPaginate));

module.exports = routes;