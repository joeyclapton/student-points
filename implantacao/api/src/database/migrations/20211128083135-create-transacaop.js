'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transacaop', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      transacao_id: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Transacao',
          key : 'id'
        }
      },
      professor_id: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Professor',
          key : 'id'
        }
      },
      mensagem: {
        type: Sequelize.STRING(120),
        allowNull: false
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('transacaop');
  }
};
