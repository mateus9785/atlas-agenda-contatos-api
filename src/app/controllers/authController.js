const authBusinness = require("./../business/authBusiness");
const { controller } = require("./../../helper/methodStructure")
const Joi = require('@hapi/joi');

const baseUrl = process.env.BASE_URL;

const authController = {
  async authenticate(req, res) {
    const schema = Joi.object({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'br'] },
      }).max(100).required(),
      password: Joi.string().max(24).required(),
    });

    await controller(req, res, schema, authBusinness.authenticate);
  },
  async request(req, res) {

    const schema = Joi.object({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'br'] },
      }).max(100).required(),
    });

    await controller(req, res, schema, authBusinness.request);
  },
  async reset(req, res) {
    const schema = Joi.object({
      password: Joi.string().max(24).required(),
      token: Joi.string().max(255).required(),
    });

    await controller(req, res, schema, authBusinness.reset);
  },
  async change(req, res) {

    const schema = Joi.object({
      oldPassword: Joi.string().max(24).required(),
      newPassword: Joi.string().max(24).required(),
    });

    await controller(req, res, schema, authBusinness.change);
  },
  async checkAccount(req, res) {

    const schema = Joi.object({
      token: Joi.string().max(255).required(),
    });

    const { error } = await schema.validate(req.params);
    if (error)
      return res.status(400).send({ message: "Erro de validação, verifique!", error: error.details })

    const result = await authBusinness.checkAccount(req.params);

    if (result.status == 200)
      return res.redirect(`${baseUrl}/confirmed-email`);
    else if (result.response.data && result.response.data.emailChecked == false)
      return res.redirect(`${baseUrl}/unconfirmed-email`);
    else
      return res.redirect(baseUrl);
  },
  async sendEmailChecked(req, res) {

    const schema = Joi.object().keys({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'br'] },
      }).max(100).required(),
    });

    await controller(req, res, schema, authBusinness.sendEmailChecked)
  },
};

module.exports = authController;
