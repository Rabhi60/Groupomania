'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Users', 'email', {
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
    return Promise.all([queryInterface.changeColumn('Users', 'email')]);
  },
};
