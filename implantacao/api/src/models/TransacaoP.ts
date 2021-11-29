import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import Professor from "./Professor";

export interface IAtributosTransacao {
  id: number,
  transacao_id: number,
  professor_id: number,
  mensagem: string
}
export interface IAtributosTransacaoCriacao extends Optional<IAtributosTransacao, 'id'> { }

class Transacao extends Model<IAtributosTransacao, IAtributosTransacaoCriacao> implements IAtributosTransacao {

  id!: number;
  transacao_id!: number;
  professor_id!: number;
  mensagem!: string;

  static initialize(sequelize: Sequelize) {
    Transacao.init({
      id: {
        type: DataTypes.INTEGER().UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      transacao_id: {
        type: DataTypes.INTEGER().UNSIGNED,
        references: {
          model: Transacao,
          key: "id"
        }
      },
      professor_id: {
        type: DataTypes.INTEGER().UNSIGNED,
        references: {
          model: Professor,
          key: "id"
        }
      },
      mensagem: {
        type: DataTypes.STRING(120),
        allowNull: false
      },
    },
      {
        tableName: "transacaop",
        timestamps: false,
        paranoid: false,
        createdAt: false,
        updatedAt: false,
        sequelize,
      })
  }
}

export default Transacao;
