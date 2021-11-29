'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('usuario', [{
      usuario: "laerte",
      senha: "minhaSuperSenha",
      tipo: "P",
    }], {});
    await queryInterface.bulkInsert('professor', [{
      usuario_id: 2,
      nome: "Laerte",
      departamento: "Software",
      cpf: "222.222.222-22",
      saldo: 500,
    }], {});

    await queryInterface.bulkInsert('usuario', [{
      usuario: "soraia",
      senha: "minhaSuperSenha",
      tipo: "P",
    }], {});
    await queryInterface.bulkInsert('professor', [{
      usuario_id: 3,
      nome: "Soraia",
      departamento: "Software",
      cpf: "223.222.222-22",
      saldo: 1000,
    }], {});

    await queryInterface.bulkInsert('usuario', [{
      usuario: "baroni",
      senha: "minhaSuperSenha",
      tipo: "P",
    }], {});
    await queryInterface.bulkInsert('professor', [{
      usuario_id: 4,
      nome: "Baroni",
      departamento: "Software",
      cpf: "224.222.222-22",
      saldo: 100,
    }], {});

    await queryInterface.bulkInsert('usuario', [{
      usuario: "simone",
      senha: "minhaSuperSenha",
      tipo: "P",
    }], {});
    return await queryInterface.bulkInsert('professor', [{
      usuario_id: 5,
      nome: "Simone",
      departamento: "Software",
      cpf: "225.222.222-22",
      saldo: 200,
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('professor', null, {});
  }
};
