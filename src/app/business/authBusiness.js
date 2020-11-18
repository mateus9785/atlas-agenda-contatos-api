const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { decodeToken } = require('../../helper/securityTokens');
const sendEmailExpireToken = require('../../helper/sendEmailExpireToken');
const { User, Contact } = require('../models');
const result = require("../../helper/result");

const secret = process.env.AUTH_SECRET
const apiUrl = process.env.API_URL;
const baseUrl = process.env.BASE_URL;
const client_id = process.env.CLIENT_ID;
const redirect_uri = process.env.REDIRECT_URI;

const authBusiness = {
  async authenticate({ email, password }) {

    const user = await User.findOne({ where: { email } });

    if (!user)
      return result(null, 'Usuário não encontrado', 404);

    if (!(await bcrypt.compare(password, user.password)))
      return result(null, 'Senha inválida', 400);

    if (!user.emailChecked)
      return result({ emailChecked: false }, 'Não foi feita verificação por email dessa usuário, verifique!', 404);

    const contact = await Contact.findOne({ idUser: user.idUser, isUserContact: true });

    const token = jwt.sign({ idUser: user.idUser, name: contact.name }, secret, { expiresIn: 86400 });

    const data = {
      token,
      name: contact.name,
      idUser: user.idUser,
      state: user.state,
      client_id,
      redirect_uri,
      contaAzulAuthenticated: user.accessToken ? true : false,
    };

    return result(data, null, 200);
  },
  async request({ email }) {
    const subject = "Alteração de senha"
    const text = "Para alterar a sua senha entre no link a seguir e escolha sua nova senha. "

    const user = await User.findOne({ where: { email } });

    if (!user)
      return result(null, 'Usuário não encontrado', 404);

    const urlBase = `${baseUrl}/reset-password`

    await sendEmailExpireToken(email, subject, text, urlBase);

    return result(null, "email enviado", 200);
  },
  async reset({ token, password }) {

    const { email, error } = decodeToken(token);

    if (error)
      return result(null, 'Token inválido', 400);

    const user = await User.findOne({ where: { email } });

    if (!user)
      return result(null, 'Usuário não encontrado', 404);

    user.password = password;
    await user.save();

    return result(null, "Senha alterada com sucesso", 200);
  },
  async change({ oldPassword, newPassword, authenticatedUser }) {

    const { idUser } = authenticatedUser;

    const user = await User.findOne({ where: { idUser } });

    if (!(await bcrypt.compare(oldPassword, user.password)))
      return result(null, "Senha inválida", 400);

    user.password = newPassword;
    await user.save();

    return result(null, "Senha alterada com sucesso", 200);
  },
  async checkAccount({ token }) {

    const { email, error, emailChecked } = decodeToken(token);

    if (error)
      return result({ emailChecked }, 'Token inválido', 400);

    const user = await User.findOne({ where: { email } });

    if (!user)
      return result(null, 'Usuário não encontrado', 404);

    user.emailChecked = true;
    await user.save();

    return result(null, "Conta do usuário verificada com sucesso", 200);
  },
  async sendEmailChecked({ email }) {
    const subject = "Verificação de Cadastro"
    const text = "Acesse o link a seguir para ativar sua conta "
    const urlBase = `${apiUrl}/checkAccount`

    const user = await User.findOne({ where: { email } });
    if (!user)
      return result(null, 'Usuário não encontrado', 404);

    if (user.emailChecked)
      return result(null, 'Usuário já fez verificação por email!', 404);

    await sendEmailExpireToken(email, subject, text, urlBase);

    return result(null, 'Email de verificação foi enviado', 200);
  },
};

module.exports = authBusiness;