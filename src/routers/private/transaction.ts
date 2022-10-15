import { TipoTransacao } from './../../model';
import { Transacao } from "./../../functionsBD/transacao";
import { Application, NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { HTTP_ERRORS } from "../../model";
import { body, validationResult } from "express-validator";

export = (app: Application) => {
  app.get(
    "/private/transaction",
    (req: Request, res: Response, next: NextFunction) => {
      let id_conta = <string>req.query.id_conta;

      Transacao.getTransacao(id_conta)
        .then((transacoes) => {
          res.json({ transacoes: transacoes });
        })
        .catch((erro) => {
          next(createError(HTTP_ERRORS.ERRO_BANCO, erro));
        });
    }
  );

  app.post(
    "/private/transaction",
    body("id_conta").isNumeric(),
    body("id_tipo").isIn([TipoTransacao.CRIAR_CONTA,TipoTransacao.DEPOSITO,TipoTransacao.SAQUE,TipoTransacao.TRANSFERENCIA_ENVIAR]),
    body("valor").isNumeric(),
    body("id_conta_destino_origem").isNumeric(),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        let transacao = req.body;

        Transacao.realizarTransacao(transacao)
          .then(() => {
            res.json({ mensagem: "Transação realizada com sucesso" });
          })
          .catch((erro) => {
            next(createError(HTTP_ERRORS.ERRO_BANCO, erro));
          });
      } else {
        next(createError(HTTP_ERRORS.SOLICITACAO,JSON.stringify(errors.array())));
      }
    }
  );
};
