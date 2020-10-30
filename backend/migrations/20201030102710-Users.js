'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Users', 'avatar', {
          allowNull: false,
          type: Sequelize.STRING,
          validate: {
            isUrl: true
          }
      }),
    ]);
  },
  

  down: (queryInterface) => {
    return Promise.all([queryInterface.changeColumn('Users', 'avatar')]);
  },
};

