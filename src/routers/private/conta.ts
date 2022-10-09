import { HTTP_ERRORS } from './../../model';
import  createError from 'http-errors';
import { Conta } from './../../functionsBD/conta';
import { Application, NextFunction, Request, Response } from "express";

export = (app: Application) => {
  app.post("/private/conta", (req: Request, res: Response, next: NextFunction) => {
    let conta = req.body;
    
    Conta.cadastrarConta(conta).then((conta)=>{
        res.json({ message: "conta cadastrada com sucesso",conta:conta });
    }).catch((erro)=>{
        next(createError(HTTP_ERRORS.ERRO_BANCO,erro));
    })
  });

  app.get('/private/conta',(req: Request, res: Response, next: NextFunction)=>{
    let id_usuario = <string>req.query.id_usuario;

    Conta.getContas(id_usuario).then((contas)=>{
      res.json({ message: "contas recuperadas com sucesso",contas : contas });
    }).catch((erro)=>{
      next(createError(HTTP_ERRORS.ERRO_BANCO,erro))
    })
  })

  app.put('/private/conta',(req: Request, res: Response, next: NextFunction)=>{
    let conta = req.body;

    Conta.editarConta(conta).then(()=>{
      res.json({ message: "contas editada com sucesso"});
    }).catch((erro)=>{
      next(createError(HTTP_ERRORS.ERRO_BANCO,erro))
    })
  })

  app.delete('/private/conta',(req: Request, res: Response, next: NextFunction)=>{
    let id_conta = <string>req.query.id_conta;

    Conta.excluirConta(Number(id_conta)).then(()=>{
      res.json({ message: "conta excluida com sucesso"});
    }).catch((erro)=>{
      next(createError(HTTP_ERRORS.ERRO_BANCO,erro))
    })
  })
};
