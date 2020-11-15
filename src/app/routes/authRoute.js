const routes = require('express').Router();

const authController = require('../controllers/authController');
const configThrottle = require("./../../config/throttle")

const auth = require('../middlewares/auth');
const controller = require('../middlewares/controller');
var throttle = require("express-throttle");

routes.post('/authenticate', throttle(configThrottle), controller(authController.authenticate));
routes.post('/request-reset-password', throttle(configThrottle), controller(authController.request));
routes.post('/reset-password', throttle(configThrottle), controller(authController.reset));
routes.post('/change-password', auth, controller(authController.change));
routes.get('/checkAccount/:token', throttle(configThrottle), controller(authController.checkAccount));
routes.post('/sendEmailChecked', throttle(configThrottle), controller(authController.sendEmailChecked));

module.exports = routes;