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
    nameFile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    urlContactImage: {
      type: DataTypes.VIRTUAL,
      get: function () {
        return process.env.API_URL + '/image/contact/' + this.nameFile;
      }
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
      allowNull: true,
    });
    Contact.hasMany(models.ContactGroup, {
      foreignKey: 'idContact',
      allowNull: true,
    });
  };

  return Contact;
};
