const Joi = require('@hapi/joi');

const customerContaAzulBusiness = require('../business/customerContaAzulBusiness');

const { controller } = require("../../helper/methodStructure")

const customerContaAzulController = {
  async findAllPaginate(req, res) {
    const schema = Joi.object().keys({
      limit: Joi.number().integer().min(1).max(100),
      offset: Joi.number().integer().min(0),
    });

    await controller(req, res, schema, customerContaAzulBusiness.findAllPaginate)
  },
};

module.exports = customerContaAzulController;
