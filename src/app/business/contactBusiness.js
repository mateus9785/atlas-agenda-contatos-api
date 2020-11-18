const { Contact, Address, Phone, ContactGroup, Group, Sequelize } = require('../models');

const result = require('../../helper/result');
const { updateFieldsChanges } = require("../../helper/objectFunction");
const { transactionSequelize } = require('../../helper/methodStructure');
const { verifyNullEmptyUndefined } = require("../../helper/validation");
const { objectOnlyAllowedFields } = require('../../helper/objectFunction');
const { resizeImageInPath } = require('../../helper/createFilePath');
const sizeImage = { width: 842, quality: 70 };

const readOnlyCommitted = true;
const { Op } = Sequelize;

const contactBusiness = {
  async findAll({ authenticatedUser }) {
    const { idUser } = authenticatedUser;

    const contacts = await Contact.findAll({
      where: { idUser },
      attributes: ["name"],
      order: [
        ["name", "ASC"]
      ]
    });

    return result(contacts, null, 200);
  },
  async findAllPaginate({ limit, offset, search, idGroup, authenticatedUser }) {
    const { idUser } = authenticatedUser;
    limit = parseInt(limit, {}) || 10;
    offset = parseInt(offset, {}) || 0;

    const where = { idUser }
    if (!verifyNullEmptyUndefined(search))
      where.name = { [Op.regexp]: `.*${search}.*` }

    if (idGroup) {
      const contactsGroup = await ContactGroup.findAll({
        where: { idGroup },
        attributes: ["idGroup", "idContact"]
      });
      const idContacts = contactsGroup.map(contactGroup => contactGroup.idContact);
      if (idContacts.length)
        where.idContact = { [Op.in]: idContacts }
      else  
        return result([], null, 200, { limit, offset, total: 0 });
    }

    const contacts = await Contact.findAndCountAll({
      attributes: ["idContact", "name", "idUser", "isUserContact", "urlContactImage", "nameFile"],
      where,
      limit,
      offset: offset * limit,
      distinct: true,
      order: [
        ["name", "ASC"]
      ]
    });

    const pagination = {
      limit: limit,
      offset: offset,
      total: contacts.count
    }

    return result(contacts.rows, null, 200, pagination);
  },
  async findOne({ idContact, authenticatedUser }) {
    const { idUser } = authenticatedUser;
    const contact = await Contact.findOne({
      where: { idContact, idUser },
      attributes: ["idContact", "name", "idUser", "isUserContact", "urlContactImage", "nameFile"],
      include: [
        {
          model: Address,
          required: false,
          attributes: ["idAddress", "street", "number", "neighborhood", "city",
            "province", "cep", "complement", "idContact"],
        },
        {
          model: Phone,
          required: true,
          attributes: ["idPhone", "name", "idContact"],
        },
        {
          model: ContactGroup,
          required: false,
          attributes: ["idContactGroup", "idGroup", "idContact"],
          include: {
            model: Group,
            required: true,
            attributes: ["idGroup", "name", "idUser"],
          },
        },
      ],
    });

    if (!contact)
      return result(null, 'Contato não encontrado', 404);

    return result(contact, null, 200);
  },
  async post({ name, addresses, phones, groups, nameFile, path, authenticatedUser }) {
    const { idUser } = authenticatedUser;
    const groupsInDatabase = await Group.findAll({
      where: {
        [Op.or]: [
          { idUser },
          { idUser: { [Op.eq]: null } },
        ]
      },
    });

    return transactionSequelize(readOnlyCommitted, async (transaction) => {

      if(nameFile && path)
        await resizeImageInPath(path, sizeImage.width, sizeImage.width);

      const contact = await Contact.create({ name, idUser, nameFile }, { transaction });
      await createContactRelatedEntities(idUser, contact, phones, addresses, groups, groupsInDatabase, transaction);

      const data = objectOnlyAllowedFields(contact, ["idContact", "name", "idUser", "isUserContact"]);

      return result(data, 'Contato cadastrado com sucesso', 200);
    });
  },
  async put({ idContact, name, addresses, phones, groups, nameFile, path, authenticatedUser }) {
    const { idUser } = authenticatedUser;
    var contact = await Contact.findOne({ where: { idContact, idUser } });
    const groupsInDatabase = await Group.findAll({
      where: {
        [Op.or]: [
          { idUser },
          { idUser: { [Op.eq]: null } },
        ]
      },
    });

    if (!contact)
      return result(null, 'Contato não encontrado', 404);

    contact = updateFieldsChanges(contact, { name, nameFile });

    return transactionSequelize(readOnlyCommitted, async (transaction) => {

      if(nameFile && path)
        await resizeImageInPath(path, sizeImage.width, sizeImage.width);
      
      await contact.save({ transaction });
      await deleteContactRelatedEntities(idContact, transaction);
      await createContactRelatedEntities(idUser, contact, phones, addresses, groups, groupsInDatabase, transaction);

      const data = objectOnlyAllowedFields(contact, ["idContact", "name", "idUser", "isUserContact"]);

      return result(data, 'Contato alterado com sucesso', 201);
    });
  },
  async delete({ idContact, authenticatedUser }) {
    const { idUser } = authenticatedUser;
    const contact = await Contact.findOne({ where: { idContact, idUser } });

    if (!contact)
      return result(null, 'Contato não encontrado', 404);

    return transactionSequelize(readOnlyCommitted, async (transaction) => {

      await deleteContactRelatedEntities(idContact, transaction)
      await contact.destroy({ transaction });

      return result(null, 'Contato deletado com sucesso', 200);
    });
  },
};

async function createContactRelatedEntities(idUser, contact, phones, addresses, groups,
  groupsInDatabase, transaction) {
  for (let i = 0; i < phones.length; i++) {
    const phone = phones[i];
    phone.idContact = contact.idContact;
    await Phone.create(phone, { transaction });
  }

  for (let i = 0; i < addresses.length; i++) {
    const address = addresses[i];
    address.idContact = contact.idContact;
    await Address.create(address, { transaction });
  }

  for (let index = 0; index < groups.length; index++) {
    const group = groups[index];
    var idGroup;
    const groupChosen = groupsInDatabase.find(x => x.name == group.name);
    if (!groupChosen) {
      const newGroup = await Group.create({ name: group.name, idUser }, { transaction });
      idGroup = newGroup.idGroup;
    } else {
      idGroup = groupChosen.idGroup;
    }

    await ContactGroup.create({ idUser, idGroup, idContact: contact.idContact }, { transaction });
  }
}

async function deleteContactRelatedEntities(idContact, transaction) {
  await Phone.destroy({ where: { idContact }, transaction });
  await Address.destroy({ where: { idContact }, transaction });
  await ContactGroup.destroy({ where: { idContact }, transaction });
}

module.exports = contactBusiness;
