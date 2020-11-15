const Joi = require('@hapi/joi');

const groupBusiness = require('../business/groupBusiness');

const { controller } = require("../../helper/methodStructure")

const groupController = {
  async findAll(req, res) {
    const schema = Joi.object().keys({});

    await controller(req, res, schema, groupBusiness.findAll)
  },
  async findAllPaginate(req, res) {
    const schema = Joi.object().keys({
      limit: Joi.number().integer().min(1).max(100),
      offset: Joi.number().integer().min(0),
      search: Joi.string().allow(""),
    });

    await controller(req, res, schema, groupBusiness.findAllPaginate)
  },
  async post(req, res) {

    const schema = Joi.object().keys({
      name: Joi.string().required(),
    });

    await controller(req, res, schema, groupBusiness.post)
  },
  async put(req, res) {
    const schema = Joi.object().keys({
      idGroup: Joi.number().integer(),
      name: Joi.string(),
    });

    await controller(req, res, schema, groupBusiness.put)
  },
  async delete(req, res) {
    const schema = Joi.object().keys({
      idGroup: Joi.number().integer(),
    });

    await controller(req, res, schema, groupBusiness.delete)
  },
};

module.exports = groupController;
