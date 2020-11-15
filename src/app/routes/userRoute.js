const routes = require('express').Router();

const userController = require('../controllers/userController');

const controller = require("../middlewares/controller");

routes.post('/user', controller(userController.post));

module.exports = routes;