import Professor, { IAtributosProfessor } from "../models/Professor";

import * as yup from 'yup'
import { CreateRequestHandler, DeleteRequestHandler, EnviarMPARequestHandler, GetAllRequestHandler, GetRequestHandler, UpddateRequestHandler } from "../types/RequestHandlers";
import Usuario from "../models/Usuario";
import Aluno from "../models/Aluno";
import AppError from "../errors/AppError";
import Transacao from "../models/Transacao";
import TransacaoP from "../models/TransacaoP";

class ProfessorController {


  public iniciarSemestre: GetAllRequestHandler<IAtributosProfessor> = async (request, response) => {
    await Professor.findAndCountAll({
      paranoid: false,
      include: [
        {
          model: Usuario, as: "usuario"
        }
      ],
    })
      .then(async (professores) => {
        professores.rows.forEach(async (professor) => {
          professor.update({saldo: professor.get().saldo+1000});
        });
        return response.status(200).json({
          dados: professores.rows,
          quantidade: professores.rows.length,
          total: professores.count
        });
      })
      .catch(function (error) {
        return response.status(500).json({
          titulo: "Erro interno do servidor!",
          error
        });
      });


  }


  public enivarMoedas: EnviarMPARequestHandler = async (request, response) => {
    const scheme = yup.object().shape({
      professor_id: yup
        .number()
        .required("'professor_id' obrigatório!"),
      mensagem: yup
        .string()
        .required("'mensagem' obrigatória!")
        .min(2, "'mensagem' deve ter no mínimo 2 caracteres!")
        .max(120, "'mensagem' deve ter no máximo 120 caracteres!"),
      valor: yup
        .number()
        .required("'valor' obrigatório!"),
    });

    // Validando com o esquema criado:
    try {
      await scheme.validate(request.body, { abortEarly: false }); // AbortEarly para fazer todas as validações
    } catch (erro: any) {
      return response.status(422).json({
        enviada: false,
        nome: erro.name, // => 'ValidationError'
        erros: erro.errors
      });
    }

    const { professor_id, mensagem, valor } = request.body;

    const aluno = await Aluno.findOne({
      where: {
        id: Number(request.params.id)
      },
      include: [
        {
          model: Usuario, as: "usuario"
        }
      ],
      paranoid: false
    });
    if (!aluno) {
      throw new AppError("Aluno não encontrado!");
    }

    const professor = await Professor.findOne({
      where: {
        id: professor_id
      },
      include: [
        {
          model: Usuario, as: "usuario"
        }
      ],
      paranoid: false
    });
    if (!professor) {
      throw new AppError("Professor não encontrado!");
    }
    if (professor.get().saldo < valor)
      throw new AppError("Saldo insuficiente!");

    const transacao = Transacao.build({
      aluno_id: Number(request.params.id),
      tipo: "PA",
      valor
    });

    await transacao
      .save()
      .then(async (transacao_criada) => {
        const transacaoP = TransacaoP.build({
          transacao_id: transacao_criada.id,
          professor_id,
          mensagem
        });
        await transacaoP
          .save()
          .then(async (transacaoP_criada) => {
            await professor.update({
              saldo: professor.get().saldo - valor
            })
            await aluno.update({
              saldo: aluno.get().saldo + valor
            })
            return response.status(201).json({
              enviada: true,
              id: transacaoP_criada.id,
            });
          })
          .catch((erro) => {
            console.log(erro)
            throw new AppError("TransacaoP não criada!" + erro);
          });
      })
      .catch((erro) => {
        console.log(erro)
        throw new AppError("Transacao não criada!" + erro);
      });
  }

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
      departamento: yup
        .string()
        .required("'departamento' obrigatória!")
        .min(2, "'departamento' deve ter no mínimo 2 caracteres!")
        .max(120, "'departamento' deve ter no máximo 120 caracteres!"),
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

    const { nome, departamento, cpf } = request.body;
    const { usuario, senha } = request.body;

    const user = Usuario.build({
      usuario,
      senha,
      tipo: "P"
    });

    await user
      .save()
      .catch((erro) => {
        return response.status(500).json({
          criado: false,
          erros: erro.message
        });
      });

    const professor = Professor.build({
      usuario_id: user.id,
      nome,
      departamento,
      cpf,
      saldo: 0
    });

    await professor
      .save()
      .then(() => {
        return response.status(201).json({
          criado: true,
          id: professor.id
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
    const professor = await Professor.findOne({
      where: {
        id: request.params.id
      }
    });
    if (!professor) {
      return response.status(404).json({
        deletado: false,
        errors: "ID de usuário não encontrado!"
      });
    }

    await Professor.destroy({
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
      departamento: yup
        .string()
        .min(2, "'departamento' deve ter no mínimo 2 caracteres!")
        .max(120, "'departamento' deve ter no máximo 120 caracteres!"),
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

    const { nome, departamento, cpf, saldo } = request.body;
    const { senha } = request.body;

    const professor = await Professor.findOne({
      where: {
        id: request.params.id
      },
    });
    if (!professor) {
      return response.status(404).json({
        atualizado: false,
        nome: "Professor não encontrado",
        erros: "O id que foi solicitado alteração não existe no banco de dados"
      });
    } else {
      await professor.update({
        nome, departamento, cpf, saldo
      });
      const usuario = await Usuario.findOne({
        where: {
          id: professor.get().usuario_id
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
        id: professor.id
      });
    }
  }

  public get: GetRequestHandler<IAtributosProfessor> = async (request, response) => {

    const professor = await Professor.findOne({
      where: {
        id: request.params.id
      },
      include: [
        {
          model: Usuario, as: "usuario"
        },
        {
          model: TransacaoP, as: "transacoesp",
          include: [
            {
              model: Transacao, as: "transacao"
            }
          ]
        }
      ],
      paranoid: false
    });
    if (!professor) {
      return response.status(404).json(professor);
    } else {
      return response.status(200).json(professor);
    }
  }

  public getAll: GetAllRequestHandler<IAtributosProfessor> = async (request, response) => {

    await Professor.findAndCountAll({
      paranoid: false,
      include: [
        {
          model: Usuario, as: "usuario"
        }
      ],
    })
      .then(professors => {
        return response.status(200).json({
          dados: professors.rows,
          quantidade: professors.rows.length,
          total: professors.count
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

export default ProfessorController;
