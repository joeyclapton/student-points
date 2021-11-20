import Usuario, { IAtributosUsuario, IAtributosUsuarioCriacao } from "../models/Usuario";

import * as yup from 'yup'
import { RequestHandler } from "express";
import { CreateRequestHandler, DeleteRequestHandler, GetAllRequestHandler, GetRequestHandler, UpddateRequestHandler } from "../types/RequestHandlers";

interface ILoginUsuario {
  usuario: string,
  senha: string
}

type SigninReponse = string | {
  autenticado: boolean,
  razao?: "Senha incorreta!"
}

class UsuarioController {
  public signin: RequestHandler<never, SigninReponse, ILoginUsuario> = async (req, res) => {
    const { usuario, senha } = req.body;

    Usuario.findOne({
      attributes: ['id', 'senha'],
      where: {
        usuario: usuario
      }
    })
      .then(usuario => {
        if (!usuario) {
          return res.status(404).send("Usuario nao encontrado.");
        }

        if (senha != usuario.get().senha) {
          return res.status(401).send({
            autenticado: false,
            razao: "Senha incorreta!"
          });
        }

        res.status(200).send({ autenticado: true });
      })
      .catch(err => {
        res.status(500).send("Erro -> " + err);
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
        .max(64, "'senha' deve ter no máximo 64 caracteres!")
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

    const { usuario, senha } = request.body;

    const user = Usuario.build({
      usuario,
      senha: senha
    });

    user
      .save()
      .then(() => {
        return response.status(201).json({
          criado: true,
          id: user.id
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
    const usuario = await Usuario.findOne({
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

    await Usuario.destroy({
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
  public update: UpddateRequestHandler<IAtributosUsuario> = async (request, response) => {

    const scheme = yup.object().shape({
      senha: yup
        .string()
        .required("'senha' obrigatória!")
        .min(8, "'senha' deve ter no mínimo 8 caracteres!")
        .max(64, "'senha' deve ter no máximo 64 caracteres!")
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

    const { senha } = request.body;

    const usuario = await Usuario.findOne({
      where: {
        id: request.params.id
      }
    });
    if (!usuario) {
      response.status(404).json({
        atualizado: false,
        nome: "Usuario não encontrado",
        erros: "O id que foi solicitado alteração não existe no banco de dados"
      });
    } else {
      usuario.update({
        senha: senha,
      });
      response.status(200).json({
        atualizado: true,
        id: usuario.id
      });
    }
  }

  // URI de exemplo: http://localhost:3000/api/usuario/1
  public get: GetRequestHandler<IAtributosUsuario> = async (request, response) => {

    const usuario = await Usuario.findOne({
      where: {
        id: request.params.id
      },
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
  public getAll: GetAllRequestHandler<IAtributosUsuario> = async (request, response) => {

    Usuario.findAndCountAll({
      paranoid: false
    })
      .then(usuarios => {
        Usuario.findAll({
          paranoid: false
        })
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

export default UsuarioController;
