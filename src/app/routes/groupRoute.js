const routes = require('express').Router();

const groupController = require('../controllers/groupController');

const auth = require('../middlewares/auth');
const controller = require("../middlewares/controller");

routes.get('/group', auth, controller(groupController.findAll));
routes.get('/group/paginate', auth, controller(groupController.findAllPaginate));
routes.post('/group', auth, controller(groupController.post));
routes.put('/group/:idGroup', auth, controller(groupController.put));
routes.delete('/group/:idGroup', auth, controller(groupController.delete));

module.exports = routes;