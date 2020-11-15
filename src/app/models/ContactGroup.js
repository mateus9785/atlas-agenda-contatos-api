module.exports = (sequelize, DataTypes) => {
  const ContactGroup = sequelize.define('ContactGroup', {
    idContactGroup: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  });

  ContactGroup.associate = models => {
    ContactGroup.belongsTo(models.Group, {
      foreignKey: 'idGroup',
      allowNull: false,
    });
    ContactGroup.belongsTo(models.Contact, {
      foreignKey: 'idContact',
      allowNull: false,
    });
    ContactGroup.belongsTo(models.User, {
      foreignKey: 'idUser',
      allowNull: false,
    });
  };

  return ContactGroup;
};
