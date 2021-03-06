const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    emailChecked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    accessToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },      
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    expiresIn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  User.beforeSave(async user => {
    if (user.password) {
      if (user._changed.password || user.isNewRecord) {
        const hash = await bcrypt.hash(user.password, 10);

        user.password = hash;
      }
    }
  });

  User.associate = models => {
    User.hasMany(models.Contact, {
      foreignKey: 'idUser',
      allowNull: false,
    });
  };

  return User;
};
