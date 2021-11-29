import Parceiro, { IAtributosParceiro } from "../models/Parceiro";

import * as yup from 'yup'
import { CreateRequestHandler, DeleteRequestHandler, GetAllRequestHandler, GetRequestHandler, UpddateRequestHandler } from "../types/RequestHandlers";

class ParceiroController {

  public create: CreateRequestHandler = async (request, response) => {
    const scheme = yup.object().shape({
      nome: yup
        .string()
        .required("'nome' obrigatória!")
        .min(2, "'nome' deve ter no mínimo 2 caracteres!")
        .max(120, "'nome' deve ter no máximo 120 caracteres!")
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

    const { nome } = request.body;

    const parceiro = Parceiro.build({
      nome
    });

    parceiro
      .save()
      .then(() => {
        return response.status(201).json({
          criado: true,
          id: parceiro.id
        });
      })
      .catch((erro) => {
        return response.status(500).json({
          criado: false,
          erros: erro.message
        });
      });
  }

  // URI de exemplo: http://localhost:3000/api/parceiro/1
  public delete: DeleteRequestHandler = async (request, response) => {
    const parceiro = await Parceiro.findOne({
      where: {
        id: request.params.id
      }
    });
    if (!parceiro) {
      return response.status(404).json({
        deletado: false,
        errors: "ID de usuário não encontrado!"
      });
    }

    await Parceiro.destroy({
      where: {
        id: request.params.id
      }
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

  // URI de exemplo: http://localhost:3000/api/parceiro/1
  public update: UpddateRequestHandler<IAtributosParceiro> = async (request, response) => {

    const scheme = yup.object().shape({
      nome: yup
        .string()
        .required("'nome' obrigatória!")
        .min(2, "'nome' deve ter no mínimo 2 caracteres!")
        .max(120, "'nome' deve ter no máximo 120 caracteres!")
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

    const { nome } = request.body;

    const parceiro = await Parceiro.findOne({
      where: {
        id: request.params.id
      }
    });
    if (!parceiro) {
      return response.status(404).json({
        atualizado: false,
        nome: "Parceiro não encontrado",
        erros: "O id que foi solicitado alteração não existe no banco de dados"
      });
    } else {
      parceiro.update({
        nome
      });
      return response.status(200).json({
        atualizado: true,
        id: parceiro.id
      });
    }
  }

  // URI de exemplo: http://localhost:3000/api/parceiro/1
  public get: GetRequestHandler<IAtributosParceiro> = async (request, response) => {

    const parceiro = await Parceiro.findOne({
      where: {
        id: request.params.id
      },
      paranoid: false
    });
    if (!parceiro) {
      return response.status(404).json(parceiro);
    } else {
      return response.status(200).json(parceiro);
    }
  }

  // URI de exemplo: http://localhost:3000/api/parceiro?pagina=1&limite=5&atributo=nome&ordem=DESC
  // todos as querys são opicionais
  public getAll: GetAllRequestHandler<IAtributosParceiro> = async (request, response) => {

    Parceiro.findAndCountAll({
      paranoid: false
    })
      .then(parceiros => {
        Parceiro.findAll({
          paranoid: false
        })
        return response.status(200).json({
          dados: parceiros.rows,
          quantidade: parceiros.rows.length,
          total: parceiros.count
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

export default ParceiroController;
