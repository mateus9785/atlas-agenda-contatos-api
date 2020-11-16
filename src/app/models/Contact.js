module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    idContact: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isUserContact: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  Contact.associate = models => {
    Contact.belongsTo(models.User, {
      foreignKey: 'idUser',
      allowNull: false,
    });
    Contact.hasMany(models.Phone, {
      foreignKey: 'idContact',
      allowNull: false,
    });
    Contact.hasMany(models.Address, {
      foreignKey: 'idContact',
      allowNull: false,
    });
    Contact.hasMany(models.ContactGroup, {
      foreignKey: 'idContact',
      allowNull: false,
    });
  };

  return Contact;
};
