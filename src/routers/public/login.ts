import { HTTP_ERRORS } from './../../model';
import  createError  from 'http-errors';
import { Usuario } from './../../functionsBD/usuario';
import { Application, NextFunction, Request, Response } from "express";
import { query, validationResult } from 'express-validator';
require('dotenv').config();

export = (app: Application) => {
  app.get("/login",
    query('cpf').exists(),
    query('senha').exists()
    ,(req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        let cpf = <string>req.query.cpf;
        let senha = <string>req.query.senha;
       
        Usuario.login(cpf,senha).then((usuario)=>{ 
          res.json({ message: "usuario logado",'authorization': process.env.AUTHORIZATION,usuario:usuario});
        }).catch((erro)=>{
          next(createError(HTTP_ERRORS.ERRO_BANCO,erro));
        })
      } else {
        next(createError(HTTP_ERRORS.SOLICITACAO,JSON.stringify(errors.array())));
      }
  });
};
