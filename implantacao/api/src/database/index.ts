import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import Aluno from "../models/Aluno";
import Parceiro from "../models/Parceiro";
import Professor from "../models/Professor";
import Transacao from "../models/Transacao";
import TransacaoP from "../models/TransacaoP";
import Usuario from "../models/Usuario";

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_DATABASE ?? "school",
    process.env.DB_USER ?? "admin",
    process.env.DB_PASS ?? "admin",
    {
        host: process.env.DB_HOST ?? "3306",
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
            Professor.initialize(sequelize);
            Parceiro.initialize(sequelize);
            Transacao.initialize(sequelize);
            TransacaoP.initialize(sequelize);

            Aluno.belongsTo(Usuario, {
                foreignKey: "usuario_id",
                as: "usuario"
            });
            Professor.belongsTo(Usuario, {
                foreignKey: "usuario_id",
                as: "usuario"
            });

            Transacao.hasOne(TransacaoP, {
                foreignKey: "id",
                as: "transacaop"
            });

            TransacaoP.belongsTo(Transacao, {
                foreignKey: "transacao_id",
                as: "transacao"
            });
            TransacaoP.belongsTo(Professor, {
                foreignKey: "professor_id",
                as: "professor"
            });

            Professor.hasMany(TransacaoP, {
                foreignKey: "professor_id",
                as: "transacoesp"
            });
            Aluno.hasMany(Transacao, {
                foreignKey: "aluno_id",
                as: "transacoes"
            });

            if (process.env.NODE_ENV === "dev") {
                console.log(
                    `Conexão com '${process.env.DB_HOST}/${process.env.DB_DATABASE}' estabelecida`
                );
            }
        } catch (error) {
            console.log(error);
        }
    },

    async close() {
        await sequelize.close();
    }
};
