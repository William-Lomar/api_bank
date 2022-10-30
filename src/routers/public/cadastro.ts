import { body, validationResult } from "express-validator";
import { HTTP_ERRORS, UsuarioModel } from "./../../model";
import createError from "http-errors";
import { Usuario } from "./../../functionsBD/usuario";
import { Application, NextFunction, Request, Response } from "express";
import { validaCPF } from "../../utils/cpf";
import { tratarErro } from "../../utils/error";

export = (app: Application) => {
  app.post(
    "/cadastrarUsuario",
    body("cpf").isLength({ min: 14, max: 14 }), //Recebe no formato padrão 000.000.000-00
    body("senha").exists(),
    body("email").isEmail(),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        let usuario: UsuarioModel = req.body;
        usuario.cpf = validaCPF(usuario.cpf);

        if(usuario.cpf){
          Usuario.cadastraUsuario(usuario)
          .then(() => {
            res.json({ message: "Usuario cadastrado com sucesso" });
          })
          .catch((erro) => {
            next(createError(HTTP_ERRORS.ERRO_BANCO, tratarErro(erro)));
          });
        }else{
          next(
            createError(HTTP_ERRORS.SOLICITACAO, "CPF inválido")
          );
        }
      } else {
        next(
          createError(HTTP_ERRORS.SOLICITACAO, JSON.stringify(errors.array()))
        );
      }
    }
  );
};
