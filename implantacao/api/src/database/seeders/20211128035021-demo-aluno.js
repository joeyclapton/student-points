'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('usuario', [{
      usuario: "lucas",
      senha: "minhaSuperSenha",
      tipo: "A",
    }], {});
    return await queryInterface.bulkInsert('aluno', [{
      usuario_id: 1,
      nome: "Lucas",
      email: "lucas@lucas.com",
      rg: "MG-000.000",
      endereco: "BH, MG",
      cpf: "111.111.111-11",
      saldo: 100,
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('aluno', null, {});
  }
};
