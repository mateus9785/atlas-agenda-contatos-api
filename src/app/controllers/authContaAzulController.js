const authContaAzulBusiness = require("../business/authContaAzulBusiness");
const Joi = require('@hapi/joi');

const baseUrl = process.env.BASE_URL;

const authContaAzulController = {
  async authorize(req, res) {
    const schema = Joi.object({
      code: Joi.string().allow(""),
      state: Joi.string().allow(""),
    });

    const { error } = await schema.validate(req.query);
    if (error)
      return res.status(400).send({ message: "Erro de validação, verifique!", error: error.details })

    await authContaAzulBusiness.authorize({ ...req.query });

    return res.redirect(baseUrl);
  },
};

module.exports = authContaAzulController;
