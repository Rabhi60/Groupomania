'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Messages', 'attachment', {
          allowNull: false,
          type: Sequelize.STRING,
          validate: {
            isUrl: true
          }
      }),
    ]);
  },
  

  down: (queryInterface) => {
    return Promise.all([queryInterface.changeColumn('Messages', 'attachment')]);
  },
};

