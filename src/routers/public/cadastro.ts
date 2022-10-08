import { HTTP_ERRORS } from './../../model';
import  createError  from 'http-errors';
import { Usuario } from './../../functionsBD/usuario';
import { Application, NextFunction, Request, Response } from "express";

export = (app: Application) => {
  app.post("/cadastrarUsuario", (req: Request, res: Response, next: NextFunction) => {
    let usuario = req.body;
    
    Usuario.cadastraUsuario(usuario).then((result)=>{
      res.json({ message: "Usuario cadastrado com sucesso" });
    }).catch((erro)=>{
      console.log(erro);
      next(createError(HTTP_ERRORS.ERRO_BANCO,erro))
    })
  });
};
