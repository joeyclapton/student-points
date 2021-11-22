'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('aluno', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuario_id: {
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING(120),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(120),
        allowNull: false
      },
      rg: {
        type: Sequelize.STRING(120),
        allowNull: false
      },
      endereco: {
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
    await queryInterface.dropTable('aluno');
  }
};
