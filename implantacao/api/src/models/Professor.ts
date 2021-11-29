import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import Usuario from "./Usuario";

export interface IAtributosProfessor {
  id: number,
  usuario_id: number,
  nome: string,
  departamento: string,
  cpf: string,
  saldo: number
}
export interface IAtributosProfessorCriacao extends Optional<IAtributosProfessor, 'id'> { }

class Professor extends Model<IAtributosProfessor, IAtributosProfessorCriacao> implements IAtributosProfessor {

  id!: number;
  usuario_id!: number;
  nome!: string;
  departamento!: string;
  cpf!: string;
  saldo!: number;

  static initialize(sequelize: Sequelize) {
    Professor.init({
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
      departamento: {
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
        hooks: {
          afterDestroy: async (professor, options) => {
            await Usuario.destroy({
              where: {
                id: professor.get().usuario_id,
              }
            }).catch(function (error) {
              console.log(error)
            });
          },
        },
        tableName: "professor",
        timestamps: false,
        paranoid: false,
        createdAt: false,
        updatedAt: false,
        sequelize,
      })
  }
}

export default Professor;
