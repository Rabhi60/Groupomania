'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Users', 'avatar', {
        allowNull: false,
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
      }),
    ]);
  },
  

  down: (queryInterface) => {
    return Promise.all([queryInterface.addColumn('Users', 'avatar')]);
  },
};

