module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Address', {
      idAddress: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      street: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      neighborhood: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      province: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      complement: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      cep: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      number: {
        type: Sequelize.STRING(10),
        allowNull: false,
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
    return queryInterface.dropTable('Address');
  },
};
