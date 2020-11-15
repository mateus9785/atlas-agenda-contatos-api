module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    idGroup: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  });

  Group.associate = models => {
    Group.belongsTo(models.User, {
      foreignKey: 'idUser',
      allowNull: false,
    });
    Group.hasMany(models.ContactGroup, {
      foreignKey: 'idGroup',
      allowNull: false,
    });
  };

  return Group;
};
