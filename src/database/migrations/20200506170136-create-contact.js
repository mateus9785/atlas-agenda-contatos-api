module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Contact', {
      idContact: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      isUserContact: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      nameFile: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      idUser: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'idUser',
        },
        onDelete: 'RESTRICT',
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
    return queryInterface.dropTable('Contact');
  },
};
