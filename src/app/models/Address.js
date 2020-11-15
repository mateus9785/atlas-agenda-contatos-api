module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    idAddress: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    neighborhood: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    province: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    complement: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    cep: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    number: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  });

  Address.associate = models => {
    Address.belongsTo(models.Contact, {
      foreignKey: 'idContact',
      allowNull: false,
    });
  };

  return Address;
};
