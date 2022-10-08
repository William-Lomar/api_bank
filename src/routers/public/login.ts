import { HTTP_ERRORS } from './../../model';
import  createError  from 'http-errors';
import { Usuario } from './../../functionsBD/usuario';
import { Application, NextFunction, Request, Response } from "express";
require('dotenv').config();

export = (app: Application) => {
  app.get("/login", (req: Request, res: Response, next: NextFunction) => {
    let login = <string>req.query.login;
    let senha = <string>req.query.senha;
   
    Usuario.login(login,senha).then((resp)=>{ 
      let usuario = resp.mensagem;

      res.json({ message: "usuario logado",'authorization': process.env.AUTHORIZATION,usuario:usuario});
    }).catch((erro)=>{
      next(createError(HTTP_ERRORS.ERRO_BANCO,erro));
    })
  });
};
