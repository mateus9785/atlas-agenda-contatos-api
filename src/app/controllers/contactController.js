const Joi = require('@hapi/joi');

const contactBusiness = require('../business/contactBusiness');

const { controller } = require("../../helper/methodStructure")

const contactController = {
  async findAll(req, res) {
    const schema = Joi.object().keys({});

    await controller(req, res, schema, contactBusiness.findAll)
  },
  async findAllPaginate(req, res) {
    const schema = Joi.object().keys({
      limit: Joi.number().integer().min(1).max(100),
      offset: Joi.number().integer().min(0),
      search: Joi.string().allow(""),
    });

    await controller(req, res, schema, contactBusiness.findAllPaginate)
  },
  async findOne(req, res) {
    const schema = Joi.object().keys({
      idContact: Joi.number().integer().required(),
    });

    await controller(req, res, schema, contactBusiness.findOne)
  },
  async post(req, res) {

    const schema = Joi.object().keys({
      name: Joi.string().required(),
      addresses: Joi.array().items(
        Joi.object({
          street: Joi.string().required(),
          number: Joi.string().required(),
          neighborhood: Joi.string().required(),
          city: Joi.string().required(),
          province: Joi.string().required(),
          cep: Joi.string().allow(""),
          complement: Joi.string().allow(""),
        })
      ),
      phones: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
        })
      ).required(),
      groups: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
        })
      ),
    });

    await controller(req, res, schema, contactBusiness.post)
  },
  async put(req, res) {
    const schema = Joi.object().keys({
      idContact: Joi.number().integer(),
      name: Joi.string(),
      addresses: Joi.array().items(
        Joi.object({
          street: Joi.string().required(),
          number: Joi.string().required(),
          neighborhood: Joi.string().required(),
          city: Joi.string().required(),
          province: Joi.string().required(),
          cep: Joi.string().allow(""),
          complement: Joi.string().allow(""),
        })
      ),
      phones: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
        })
      ).required(),
      groups: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
        })
      ),
    });

    await controller(req, res, schema, contactBusiness.put)
  },
  async delete(req, res) {
    const schema = Joi.object().keys({
      idContact: Joi.number().integer(),
    });

    await controller(req, res, schema, contactBusiness.delete)
  },
};

module.exports = contactController;
