
import dotenv from 'dotenv';
import { Sequelize } from "sequelize";
import Aluno from '../models/Aluno';
import Parceiro from '../models/Parceiro';
import Usuario from "../models/Usuario";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE?? "",
  process.env.DB_USER?? "",
  process.env.DB_PASS?? "",
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false
  }
);

export default {
  async connect() {
    try {
      await sequelize.authenticate();
      Usuario.initialize(sequelize);
      Aluno.initialize(sequelize);
      Parceiro.initialize(sequelize);

      Aluno.belongsTo(Usuario, {foreignKey: "usuario_id", as: "usuario"});

      if (process.env.NODE_ENV === "dev") {
        console.log(
          `Conexão com '${process.env.DB_HOST}/${process.env.DB_DATABASE}' estabelecida`
        );
      }
    } catch (error) {
      console.log( error);
    }
  },

  async close() {
    await sequelize.close();
  }
};
