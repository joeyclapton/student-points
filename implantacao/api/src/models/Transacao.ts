import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import Aluno from "./Aluno";

export interface IAtributosTransacao {
  id: number,
  aluno_id: number,
  valor: number,
  tipo: 'PA' | 'AV', /* PA == Profesor para Aluno ; AV == Aluno para Vantagem */
}
export interface IAtributosTransacaoCriacao extends Optional<IAtributosTransacao, 'id'> { }

class Transacao extends Model<IAtributosTransacao, IAtributosTransacaoCriacao> implements IAtributosTransacao {

  id!: number;
  aluno_id!: number;
  valor!: number;
  tipo!: 'PA' | 'AV';

  static initialize(sequelize: Sequelize) {
    Transacao.init({
      id: {
        type: DataTypes.INTEGER().UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      aluno_id: {
        type: DataTypes.INTEGER().UNSIGNED,
        references: {
          model: Aluno,
          key: "id"
        }
      },
      valor: {
        type: DataTypes.DOUBLE().UNSIGNED,
        allowNull: false
      },
      tipo: {
        type: DataTypes.ENUM("PA", "AV"),
        allowNull: false
      }
    },
      {
        tableName: "transacao",
        timestamps: false,
        paranoid: false,
        createdAt: false,
        updatedAt: false,
        sequelize,
      })
  }
}

export default Transacao;
