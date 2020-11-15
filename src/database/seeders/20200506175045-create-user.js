const bcrypt = require('bcryptjs');

module.exports = {
  up: async queryInterface => {
    const hash = await bcrypt.hash('mudar123', 10);
    return queryInterface.bulkInsert(
      'User',
      [
        {
          name: "mateus oliveira de almeida",
          email: 'mateusoliveira9785@gmail.com',
          password: hash,
          emailChecked: true,
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('User', null, {});
  },
};
