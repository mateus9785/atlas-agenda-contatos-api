module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User', {
      idUser: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      emailChecked: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      stage: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      accessToken: {
        type: Sequelize.STRING,
        allowNull: true,
      },      
      refreshToken: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      expiresIn: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('User');
  },
};
