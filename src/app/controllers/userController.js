const Joi = require('@hapi/joi');

const userBusiness = require('../business/userBusiness');

const { controller } = require("../../helper/methodStructure")

const userController = {
  async post(req, res) {

    const schema = Joi.object().keys({
      name: Joi.string().max(100).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'br'] },
      }).max(100).required(),
      cellphone: Joi.string().max(20).required(),
      password: Joi.string().max(24).required(),
    });

    await controller(req, res, schema, userBusiness.post)
  },
};

module.exports = userController;
