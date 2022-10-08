import { HTTP_ERRORS } from './../../model';
import  createError from 'http-errors';
import { Conta } from './../../functionsBD/conta';
import { Application, NextFunction, Request, Response } from "express";

export = (app: Application) => {
  app.post("/cadastrarConta", (req: Request, res: Response, next: NextFunction) => {
    let conta = req.body;
    
    Conta.cadastrarConta(conta).then((conta)=>{
        res.json({ message: "conta cadastrada com sucesso",conta:conta });
    }).catch((erro)=>{
        next(createError(HTTP_ERRORS.ERRO_BANCO,erro));
    })
  });

  app.get('/getContas',(req: Request, res: Response, next: NextFunction)=>{
    let id_usuario = <string>req.query.id_usuario;

    Conta.getContas(id_usuario).then((resp)=>{
      res.json({ message: "contas recuperadas com sucesso",contas : resp.mensagem });
    }).catch((erro)=>{
      next(createError(HTTP_ERRORS.ERRO_BANCO,erro))
    })
  })
};
