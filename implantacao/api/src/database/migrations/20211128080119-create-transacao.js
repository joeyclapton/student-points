'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transacao', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      aluno_id: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Aluno',
          key : 'id'
        }
      },
      valor: {
        type: Sequelize.DOUBLE(),
        allowNull: false
      },
      tipo: {
        type: Sequelize.ENUM('PA', 'AV'),
        allowNull: false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('transacao');
  }
};
