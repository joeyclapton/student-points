import { Model, DataTypes, Sequelize, Optional } from "sequelize";

export interface IAtributosUsuario {
  id: number,
  usuario: string,
  senha: string,
  tipo: 'A' | 'P'
}
export interface IAtributosUsuarioCriacao extends Optional<IAtributosUsuario, 'id'> { }

class Usuario extends Model<IAtributosUsuario, IAtributosUsuarioCriacao> implements IAtributosUsuario {

  id!: number;
  usuario!: string;
  senha!: string;
  tipo!: 'A' | 'P';

  static initialize(sequelize: Sequelize) {
    Usuario.init({
      id: {
        type: DataTypes.INTEGER().UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      usuario: {
        type: DataTypes.STRING(120),
        allowNull: false
      },
      senha: {
        type: DataTypes.STRING(64),
        allowNull: false
      },
      tipo: {
        type: DataTypes.ENUM("A", "P"),
        allowNull: false
      }
    },
      {
        tableName: "usuario",
        timestamps: false,
        paranoid: false,
        createdAt: false,
        updatedAt: false,
        sequelize,
        defaultScope: {
          attributes: {
            exclude: ['senha'],
          }
        },
      })
  }
}

export default Usuario;
