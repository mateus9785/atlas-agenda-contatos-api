const { User, Contact, Phone } = require('../models');

const result = require('../../helper/result');
const { transactionSequelize } = require('../../helper/methodStructure');
const { objectOnlyAllowedFields } = require('../../helper/objectFunction');
const sendEmailExpireToken = require('../../helper/sendEmailExpireToken');

const apiUrl = process.env.API_URL;

const userBusiness = {
  async post({ name, email, cellphone, password }) {
    const readOnlyCommitted = true;
    const subject = "Verificação de Cadastro"
    const text = "Acesse o link a seguir para ativar sua conta "
    const urlBase = `${apiUrl}/checkAccount`

    const userSameEmail = await User.findOne({ where: { email } })
    if (userSameEmail)
      return result(null, 'Esse email já está cadastrado, verifique', 400);

    return transactionSequelize(readOnlyCommitted, async (transaction) => {

      const user = await User.create({ email, password }, { transaction });
      const contact = await Contact.create({ 
        name, idUser: user.idUser, isUserContact: true 
      }, { transaction });
      await Phone.create({ name: cellphone, idContact: contact.idContact }, { transaction });
      user.idContact = contact.idContact;
      await user.save({ transaction });

      await sendEmailExpireToken(email, subject, text, urlBase);

      const data = objectOnlyAllowedFields(user, ["idUser", "email"]);

      return result(data, 'Usuário cadastrado com sucesso', 200);
    });
  },
};

module.exports = userBusiness;
