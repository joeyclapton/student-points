'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('professor', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Usuario',
          key : 'id'
        }
      },
      nome: {
        type: Sequelize.STRING(120),
        allowNull: false
      },
      departamento: {
        type: Sequelize.STRING(120),
        allowNull: false
      },
      cpf: {
        type: Sequelize.STRING(120),
        allowNull: false
      },
      saldo: {
        type: Sequelize.DOUBLE(),
        allowNull: false
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('professor');
  }
};
