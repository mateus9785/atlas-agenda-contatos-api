module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ContactGroup', {
      idContactGroup: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      idGroup: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Group',
          key: 'idGroup',
        },
        onDelete: 'RESTRICT',
      },
      idContact: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Contact',
          key: 'idContact',
        },
        onDelete: 'RESTRICT',
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
    return queryInterface.dropTable('ContactGroup');
  },
};
