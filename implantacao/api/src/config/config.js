require('dotenv').config();
console.log(process.env.DB_USER, process.env.DB_PASS, process.env.DB_DATABASE, process.env.DB_HOST)
module.exports = {
  local: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: 3306,
    dialect: process.env.DB_DIALECT,
    logging: true
  },
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: 3306,
    dialect: process.env.DB_DIALECT,
    logging: true
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: 3306,
    dialect: process.env.DB_DIALECT,
    logging: true
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: 3306,
    dialect: process.env.DB_DIALECT
  }
};
// Migration
// Criar migration: npx sequelize-cli model:generate --name aluno --attributes nome:string

// Seeds
// Criar seed: npx sequelize-cli seed:generate --name demo-aluno
