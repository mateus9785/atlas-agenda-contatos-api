const { Group, ContactGroup, Sequelize } = require('../models');

const result = require('../../helper/result');
const { updateFieldsChanges } = require("../../helper/objectFunction");
const { verifyNullEmptyUndefined } = require("../../helper/validation");
const { objectOnlyAllowedFields } = require('../../helper/objectFunction');

const { Op } = Sequelize;

const groupBusiness = {
  async findAll({ authenticatedUser }) {
    const { idUser } = authenticatedUser;

    const groups = await Group.findAll({
      where: {
        [Op.or]: [
          { idUser },
          { idUser: { [Op.eq]: null } }
        ]
      },
      attributes: ["idGroup", "name"],
      order: [
        ["name", "ASC"]
      ]
    });

    return result(groups, null, 200);
  },
  async findAllPaginate({ limit, offset, search, authenticatedUser }) {
    const { idUser } = authenticatedUser;
    limit = parseInt(limit, {}) || 10;
    offset = parseInt(offset, {}) || 0;

    const where = {
      [Op.or]: [
        { idUser },
        { idUser: { [Op.eq]: null } }
      ]
    }
    
    if (!verifyNullEmptyUndefined(search))
      where.name = { [Op.regexp]: `.*${search}.*` }

    const groups = await Group.findAndCountAll({
      where,
      attributes: ["idGroup", "name", "idUser"],
      include: [
        {
          where: { idUser },
          model: ContactGroup,
          required: false,
          attributes: ["idContactGroup", "idGroup", "idUser"],
        }
      ],
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
      total: groups.count
    }

    return result(groups.rows, null, 200, pagination);
  },
  async post({ name, authenticatedUser }) {
    const { idUser } = authenticatedUser;

    const group = await Group.create({ name, idUser });

    const data = objectOnlyAllowedFields(group, ["idGroup", "name", "idUser"]);

    return result(data, 'Grupo cadastrado com sucesso', 200);
  },
  async put({ idGroup, name, authenticatedUser }) {
    const { idUser } = authenticatedUser;
    var group = await Group.findOne({ where: { idGroup, idUser } });

    if (!group)
      return result(null, 'Grupo não encontrado', 404);

    group = updateFieldsChanges(group, { name });

    await group.save();

    const data = objectOnlyAllowedFields(group, ["idGroup", "name", "idUser"]);

    return result(data, 'Grupo alterado com sucesso', 201);
  },
  async delete({ idGroup, authenticatedUser }) {
    const { idUser } = authenticatedUser;
    const group = await Group.findOne({ where: { idGroup, idUser } });

    if (!group)
      return result(null, 'Grupo não encontrado', 404);

    const contact = await ContactGroup.findOne({ where: { idGroup } });
    if (contact)
      return result(null, 'Esse grupo não pode ser apagado, há contatos dentro dele, verifique!', 404);

    await group.destroy();

    return result(null, 'Grupo deletado com sucesso', 200);
  },
};

module.exports = groupBusiness;
