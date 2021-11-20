import Aluno, { IAtributosAluno } from "../models/Aluno";

import * as yup from 'yup'
import { CreateRequestHandler, DeleteRequestHandler, GetAllRequestHandler, GetRequestHandler, UpddateRequestHandler } from "../types/RequestHandlers";
import Usuario from "../models/Usuario";

class AlunoController {

  public create: CreateRequestHandler = async (request, response) => {
    const scheme = yup.object().shape({
      usuario_id: yup
        .number()
        .required("'usuario_id' obrigatória!")
        .required("'usuario_id' obrigatório!"),
      nome: yup
        .string()
        .required("'nome' obrigatória!")
        .min(2, "'nome' deve ter no mínimo 2 caracteres!")
        .max(120, "'nome' deve ter no máximo 120 caracteres!"),
      email: yup
        .string()
        .required("'email' obrigatória!")
        .min(2, "'email' deve ter no mínimo 2 caracteres!")
        .max(120, "'email' deve ter no máximo 120 caracteres!"),
      rg: yup
        .string()
        .required("'rg' obrigatória!")
        .min(2, "'rg' deve ter no mínimo 2 caracteres!")
        .max(120, "'rg' deve ter no máximo 120 caracteres!"),
      endereco: yup
        .string()
        .required("'endereco' obrigatória!")
        .min(2, "'endereco' deve ter no mínimo 2 caracteres!")
        .max(120, "'endereco' deve ter no máximo 120 caracteres!"),
      cpf: yup
        .string()
        .required("'cpf' obrigatória!")
        .min(2, "'cpf' deve ter no mínimo 2 caracteres!")
        .max(120, "'cpf' deve ter no máximo 120 caracteres!"),
    });

    // Validando com o esquema criado:
    try {
      await scheme.validate(request.body, { abortEarly: false }); // AbortEarly para fazer todas as validações
    } catch (erro: any) {
      return response.status(422).json({
        criado: false,
        nome: erro.name, // => 'ValidationError'
        erros: erro.errors
      });
    }

    const { usuario_id, nome, email, rg, endereco, cpf } = request.body;

    const aluno = Aluno.build({
      usuario_id, nome, email, rg, endereco, cpf, saldo: 0
    });

    aluno
      .save()
      .then(() => {
        return response.status(201).json({
          criado: true,
          id: aluno.id
        });
      })
      .catch((erro) => {
        return response.status(500).json({
          criado: false,
          erros: erro.message
        });
      });
  }

  // URI de exemplo: http://localhost:3000/api/usuario/1
  public delete: DeleteRequestHandler = async (request, response) => {
    const usuario = await Aluno.findOne({
      where: {
        id: request.params.id
      }
    });
    if (!usuario) {
      return response.status(404).json({
        deletado: false,
        errors: "ID de usuário não encontrado!"
      });
    }

    await Aluno.destroy({
      where: {
        id: request.params.id
      }
    })
      .then(dado => {
        response.status(204).json({
          deletado: true,
          dado
        });
      })
      .catch(function (error) {
        response.status(500).json({
          deletado: false,
          errors: error
        });
      });
  }

  // URI de exemplo: http://localhost:3000/api/usuario/1
  public update: UpddateRequestHandler<IAtributosAluno> = async (request, response) => {

    const scheme = yup.object().shape({
      nome: yup
        .string()
        .min(2, "'nome' deve ter no mínimo 2 caracteres!")
        .max(120, "'nome' deve ter no máximo 120 caracteres!"),
      email: yup
        .string()
        .min(2, "'email' deve ter no mínimo 2 caracteres!")
        .max(120, "'email' deve ter no máximo 120 caracteres!"),
      rg: yup
        .string()
        .min(2, "'rg' deve ter no mínimo 2 caracteres!")
        .max(120, "'rg' deve ter no máximo 120 caracteres!"),
      endereco: yup
        .string()
        .min(2, "'endereco' deve ter no mínimo 2 caracteres!")
        .max(120, "'endereco' deve ter no máximo 120 caracteres!"),
      cpf: yup
        .string()
        .min(2, "'cpf' deve ter no mínimo 2 caracteres!")
        .max(120, "'cpf' deve ter no máximo 120 caracteres!"),
      saldo: yup
        .number()
    });

    // Validando com o esquema criado:
    try {
      await scheme.validate(request.body, { abortEarly: false }); // AbortEarly para fazer todas as validações
    } catch (err: any) {
      return response.status(422).json({
        atualizado: false,
        nome: err.name, // => 'ValidationError'
        erros: err.errors
      });
    }

    const { nome, email, rg, endereco, cpf, saldo } = request.body;

    const usuario = await Aluno.findOne({
      where: {
        id: request.params.id
      }
    });
    if (!usuario) {
      response.status(404).json({
        atualizado: false,
        nome: "Aluno não encontrado",
        erros: "O id que foi solicitado alteração não existe no banco de dados"
      });
    } else {
      usuario.update({
        nome, email, rg, endereco, cpf, saldo
      });
      response.status(200).json({
        atualizado: true,
        id: usuario.id
      });
    }
  }

  // URI de exemplo: http://localhost:3000/api/usuario/1
  public get: GetRequestHandler<IAtributosAluno> = async (request, response) => {

    const usuario = await Aluno.findOne({
      where: {
        id: request.params.id
      },
      include: [
        {
          model: Usuario, as: "usuario"
        }
      ],
      paranoid: false
    });
    if (!usuario) {
      response.status(404).json(usuario);
    } else {
      response.status(200).json(usuario);
    }
  }

  // URI de exemplo: http://localhost:3000/api/usuario?pagina=1&limite=5&atributo=nome&ordem=DESC
  // todos as querys são opicionais
  public getAll: GetAllRequestHandler<IAtributosAluno> = async (request, response) => {

    Aluno.findAndCountAll({
      paranoid: false,
      include: [
        {
          model: Usuario, as: "usuario"
        }
      ],
    })
      .then(usuarios => {
        response.status(200).json({
          dados: usuarios.rows,
          quantidade: usuarios.rows.length,
          total: usuarios.count
        });
      })
      .catch(function (error) {
        response.status(500).json({
          titulo: "Erro interno do servidor!",
          error
        });
      });
  }
}

export default AlunoController;
