import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import Usuario from "./Usuario";

export interface IAtributosAluno {
  id: number,
  usuario_id: number,
  nome: string,
  email: string,
  rg: string,
  cpf: string,
  endereco: string,
  saldo: number
}
export interface IAtributosAlunoCriacao extends Optional<IAtributosAluno, 'id'> { }

class Aluno extends Model<IAtributosAluno, IAtributosAlunoCriacao> implements IAtributosAluno {

  id!: number;
  usuario_id!: number;
  nome!: string;
  email!: string;
  rg!: string;
  endereco!: string;
  cpf!: string;
  saldo!: number;

  static initialize(sequelize: Sequelize) {
    Aluno.init({
      id: {
        type: DataTypes.INTEGER().UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      usuario_id: {
        type: DataTypes.INTEGER().UNSIGNED,
        references: {
          model: Usuario,
          key: "id"
        }
      },
      nome: {
        type: DataTypes.STRING(120),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(120),
        allowNull: false
      },
      rg: {
        type: DataTypes.STRING(120),
        allowNull: false
      },
      endereco: {
        type: DataTypes.STRING(120),
        allowNull: false
      },
      cpf: {
        type: DataTypes.STRING(120),
        allowNull: false
      },
      saldo: {
        type: DataTypes.DOUBLE(),
        allowNull: false
      },
    },
      {
        tableName: "aluno",
        timestamps: false,
        paranoid: false,
        createdAt: false,
        updatedAt: false,
        sequelize,
      })
  }
}

export default Aluno;
