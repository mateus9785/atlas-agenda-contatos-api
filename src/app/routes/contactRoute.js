const routes = require('express').Router();
const multer = require('multer');
const configPathMulter = require("./../../config/multer");
const multerConfig = configPathMulter("/contact");
const contactController = require('../controllers/contactController');

const auth = require('../middlewares/auth');
const controller = require("../middlewares/controller");

routes.get('/contact', auth, controller(contactController.findAll));
routes.get('/contact/paginate', auth, controller(contactController.findAllPaginate));
routes.get('/contact/:idContact', auth, controller(contactController.findOne));
routes.post('/contact', auth,  multer(multerConfig).single("file"), controller(contactController.post));
routes.put('/contact/:idContact', auth,  multer(multerConfig).single("file"), controller(contactController.put));
routes.delete('/contact/:idContact', auth, controller(contactController.delete));

module.exports = routes;