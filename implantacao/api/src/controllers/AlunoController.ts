import Aluno, { IAtributosAluno } from "../models/Aluno";

import * as yup from 'yup'
import { CreateRequestHandler, DeleteRequestHandler, GetAllRequestHandler, GetRequestHandler, UpddateRequestHandler } from "../types/RequestHandlers";
import Usuario from "../models/Usuario";
import Transacao from "../models/Transacao";
import TransacaoP from "../models/TransacaoP";

class AlunoController {

  public create: CreateRequestHandler = async (request, response) => {
    const scheme = yup.object().shape({
      usuario: yup
        .string()
        .required("'usuario' obrigatório!").max(100, "'usuario' deve ter no máximo 100 caracteres!"),
      senha: yup
        .string()
        .required("'senha' obrigatória!")
        .min(8, "'senha' deve ter no mínimo 8 caracteres!")
        .max(64, "'senha' deve ter no máximo 64 caracteres!"),
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

    const { nome, email, rg, endereco, cpf } = request.body;
    const { usuario, senha } = request.body;

    const user = Usuario.build({
      usuario,
      senha,
      tipo: "A"
    });

    await user
      .save()
      .catch((erro) => {
        return response.status(500).json({
          criado: false,
          erros: erro.message
        });
      });

    const aluno = Aluno.build({
      usuario_id: user.id,
      nome,
      email,
      rg,
      endereco,
      cpf,
      saldo: 0
    });

    await aluno
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
      },
      individualHooks: true
    })
      .then(dado => {
        return response.status(204).json({
          deletado: true,
          dado
        });
      })
      .catch(function (error) {
        return response.status(500).json({
          deletado: false,
          errors: error
        });
      });
  }

  public update: UpddateRequestHandler = async (request, response) => {

    const scheme = yup.object().shape({
      senha: yup
        .string()
        .min(8, "'senha' deve ter no mínimo 8 caracteres!")
        .max(64, "'senha' deve ter no máximo 64 caracteres!"),
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
    const { senha } = request.body;

    const aluno = await Aluno.findOne({
      where: {
        id: request.params.id
      }
    });
    if (!aluno) {
      return response.status(404).json({
        atualizado: false,
        nome: "Aluno não encontrado",
        erros: "O id que foi solicitado alteração não existe no banco de dados"
      });
    } else {
      await aluno.update({
        nome, email, rg, endereco, cpf, saldo
      });
      const usuario = await Usuario.findOne({
        where: {
          id: aluno.get().usuario_id
        }
      });
      if (!usuario) {
        return response.status(404).json({
          atualizado: false,
          nome: "Usuario não encontrado",
          erros: "O id que foi solicitado alteração não existe no banco de dados"
        });
      } else {
        await usuario.update({
          senha: senha,
        });
      }
      return response.status(200).json({
        atualizado: true,
        id: aluno.id
      });
    }
  }

  public get: GetRequestHandler<IAtributosAluno> = async (request, response) => {

    const aluno = await Aluno.findOne({
      where: {
        id: request.params.id
      },
      include: [
        {
          model: Usuario, as: "usuario"
        },
        {
          model: Transacao, as: "transacoes",
          include: [
            {
              model: TransacaoP, as: "transacaop",
            }
          ]
        }
      ],
      paranoid: false
    });
    if (!aluno) {
      return response.status(404).json(aluno);
    } else {
      return response.status(200).json(aluno);
    }
  }

  public getAll: GetAllRequestHandler<IAtributosAluno> = async (request, response) => {

    await Aluno.findAndCountAll({
      paranoid: false,
      include: [
        {
          model: Usuario, as: "usuario"
        }
      ],
    })
      .then(alunos => {
        return response.status(200).json({
          dados: alunos.rows,
          quantidade: alunos.rows.length,
          total: alunos.count
        });
      })
      .catch(function (error) {
        return response.status(500).json({
          titulo: "Erro interno do servidor!",
          error
        });
      });
  }
}

export default AlunoController;
