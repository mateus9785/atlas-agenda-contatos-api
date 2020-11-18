const contaAzulBusinness = require("../business/contaAzulBusiness");
const { controller } = require("../../helper/methodStructure")
const Joi = require('@hapi/joi');

const contaAzulController = {
  async authorize(req, res) {
    const schema = Joi.object({
      code: Joi.string().allow(""),
      state: Joi.string().allow(""),
    });

    await controller(req, res, schema, contaAzulBusinness.authorize);
  },
};

module.exports = contaAzulController;
