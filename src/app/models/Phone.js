module.exports = (sequelize, DataTypes) => {
  const Phone = sequelize.define('Phone', {
    idPhone: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  });

  Phone.associate = models => {
    Phone.belongsTo(models.Contact, {
      foreignKey: 'idContact',
      allowNull: false,
    });
  };

  return Phone;
};
