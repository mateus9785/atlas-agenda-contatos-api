module.exports = {
  up: async queryInterface => {
    return queryInterface.bulkInsert(
      'Group',
      [
        {
          name: 'Favoritos',
        },
        {
          name: 'Colegas de trabalho',
        },
        {
          name: 'Família',
        },
        {
          name: 'Amigos',
        },
        {
          name: 'Contatos de Emergência',
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Group', null, {});
  },
};
