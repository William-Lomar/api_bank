import { Transacao } from './../../functionsBD/transacao';
import { Application, NextFunction, Request, Response } from "express";
import  createError from 'http-errors';
import { HTTP_ERRORS } from "../../model";

export = (app: Application) => {
  app.get("/private/transaction", (req: Request, res: Response, next: NextFunction) => {
    let id_conta = <string>req.query.id_conta;

    Transacao.getTransacao(id_conta).then((transacoes)=>{
      res.json({ transacoes: transacoes });
    }).catch((erro)=>{
      next(createError(HTTP_ERRORS.ERRO_BANCO,erro));
    })

  });

  app.post("/private/transaction", (req: Request, res: Response, next: NextFunction) => {
    let transacao = req.body;

    Transacao.realizarTransacao(transacao).then(()=>{
      res.json({ mensagem: 'Transação realizada com sucesso' });
    }).catch((erro)=>{
      next(createError(HTTP_ERRORS.ERRO_BANCO,erro));
    })

  });
};
