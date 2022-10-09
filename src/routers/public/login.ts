import { HTTP_ERRORS } from './../../model';
import  createError  from 'http-errors';
import { Usuario } from './../../functionsBD/usuario';
import { Application, NextFunction, Request, Response } from "express";
require('dotenv').config();

export = (app: Application) => {
  app.get("/login", (req: Request, res: Response, next: NextFunction) => {
    let cpf = <string>req.query.cpf;
    let senha = <string>req.query.senha;
   
    Usuario.login(cpf,senha).then((usuario)=>{ 
      res.json({ message: "usuario logado",'authorization': process.env.AUTHORIZATION,usuario:usuario});
    }).catch((erro)=>{
      next(createError(HTTP_ERRORS.ERRO_BANCO,erro));
    })
  });
};
