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
      idGroup: Joi.number().integer().allow(""),
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

    var nameFile = "", path = "";
    if (req.file){
      nameFile = req.file.filename;
      path = req.file.path;
    }

    const { addresses, phones, groups } = req.body;

    req.body.addresses = addresses && addresses.length ? addresses.map(address => JSON.parse(address)) : [];
    req.body.phones = phones && phones.length ? phones.map(phone => JSON.parse(phone)) : [];
    req.body.groups = groups && groups.length ? groups.map(group => JSON.parse(group)): [];

    const schema = Joi.object().keys({
      name: Joi.string().required(),
      nameFile: Joi.string().allow(""),
      path: Joi.string().allow(""),
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

    await controller(req, res, schema, contactBusiness.post, { nameFile, path })
  },
  async put(req, res) {
    var nameFile = "", path = "";
    if (req.file){
      nameFile = req.file.filename;
      path = req.file.path;
    }

    const { addresses, phones, groups } = req.body;

    req.body.addresses = addresses.length ? addresses.map(address => JSON.parse(address)) : [];
    req.body.phones = phones.length ? phones.map(phone => JSON.parse(phone)) : [];
    req.body.groups = groups.length ? groups.map(group => JSON.parse(group)): [];

    const schema = Joi.object().keys({
      idContact: Joi.number().integer(),
      name: Joi.string(),
      nameFile: Joi.string().allow(""),
      path: Joi.string().allow(""),
      deletedImage: Joi.boolean().required(),
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

    await controller(req, res, schema, contactBusiness.put, { nameFile, path })
  },
  async delete(req, res) {
    const schema = Joi.object().keys({
      idContact: Joi.number().integer(),
    });

    await controller(req, res, schema, contactBusiness.delete)
  },
};

module.exports = contactController;
