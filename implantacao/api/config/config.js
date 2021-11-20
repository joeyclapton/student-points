require('dotenv').config({ path: '../.env' });
console.log(process.env.DB_USER, process.env.DB_PASS, process.env.DB_DATABASE, process.env.DB_HOST)
module.exports = {
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
// Dentro da pasta /api:
// Criar migration: npx sequelize-cli model:generate --name Parceiro --attributes nome:string
// Rodar migrations: npx sequelize-cli db:migrate --config "config/config.js" --env "development"
