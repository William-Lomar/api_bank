import { ContaModel } from "./../model";
import { knex } from "../conexaoBanco";
import { TipoTransacao, TransacaoModel } from "../model";
import moment from "moment";

export class Transacao {
  public static getTransacao(id_conta: string): Promise<TransacaoModel[]> {
    return new Promise((resolve, reject) => {
      knex("transacoes")
        .select("*")
        .where("id_conta", id_conta)
        .then((transacoes) => {
          resolve(transacoes);
        })
        .catch((erro) => {
          reject(erro);
        });
    });
  }

  public static realizarTransacao(transacao: TransacaoModel): Promise<boolean> {
    return new Promise((resolve, reject) => {
      transacao.data = moment().utc().toDate();

      switch (Number(transacao.id_tipo)) {
        case TipoTransacao.DEPOSITO:
          this.deposito(transacao)
            .then(() => {
              resolve(true);
            })
            .catch((erro) => {
              reject(erro);
            });

          break;

        case TipoTransacao.SAQUE:
          this.saque(transacao)
            .then(() => {
              resolve(true);
            })
            .catch((erro) => {
              reject(erro);
            });

          break;

        case TipoTransacao.TRANSFERENCIA_ENVIAR:
          this.transferencia(transacao)
            .then(() => {
              resolve(true);
            })
            .catch((erro) => {
              reject(erro);
            });

          break;

        default:
          reject("Tipo de transação não cadastrada");
          break;
      }
    });
  }

  private static deposito(transacao: TransacaoModel): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      let trx = await knex.transaction();

      trx("contas")
        .select("*")
        .where("id_conta", transacao.id_conta)
        .then((contas) => {
          let conta = contas[0];

          //ToDo: Verificar se é possivel realizar a transação de acordo com o valor do saldo
          transacao.saldo_inicial = conta.saldo;

          conta.saldo = Number(conta.saldo) + transacao.valor;

          transacao.saldo_final = conta.saldo;

          trx("contas")
            .update(conta)
            .where("id_conta", conta.id_conta)
            .then(() => {
              trx("transacoes")
                .insert(transacao)
                .then(() => {
                  trx.commit();
                  resolve(true);
                })
                .catch((erro) => {
                  trx.rollback();
                  reject(erro);
                });
            })
            .catch((erro) => {
              trx.rollback();
              reject(erro);
            });
        })
        .catch((erro) => {
          trx.rollback();
          reject(erro);
        });
    });
  }

  private static saque(transacao: TransacaoModel): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      let trx = await knex.transaction();

      trx("contas")
        .select("*")
        .where("id_conta", transacao.id_conta)
        .then((contas) => {
          let conta = contas[0];

          //ToDo: Verificar se é possivel realizar a transação de acordo com o valor do saldo
          transacao.saldo_inicial = conta.saldo;

          conta.saldo = Number(conta.saldo) - transacao.valor;

          transacao.saldo_final = conta.saldo;

          trx("contas")
            .update(conta)
            .where("id_conta", conta.id_conta)
            .then(() => {
              trx("transacoes")
                .insert(transacao)
                .then(() => {
                  trx.commit();
                  resolve(true);
                })
                .catch((erro) => {
                  trx.rollback();
                  reject(erro);
                });
            })
            .catch((erro) => {
              trx.rollback();
              reject(erro);
            });
        })
        .catch((erro) => {
          trx.rollback();
          reject(erro);
        });
    });
  }

  private static transferencia(transacao: TransacaoModel): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      let trx = await knex.transaction();
      let promises: Array<any> = [];

      trx("contas")
        .whereIn("id_conta", [transacao.id_conta, transacao.id_conta_destino])
        .then((contas) => {
          //Recupero os dados atuais da conta
          let contaOrigem: ContaModel = contas.find((conta) => {
            return transacao.id_conta == conta.id_conta;
          });

          let contaDestino: ContaModel = contas.find((conta) => {
            return transacao.id_conta_destino == conta.id_conta;
          });

          //Crio o registro historico de transação para cada conta
          let transacaoOrigem = {
            id_conta: contaOrigem.id_conta,
            id_tipo: TipoTransacao.TRANSFERENCIA_ENVIAR,
            valor: transacao.valor,
            id_conta_destino_origem: contaDestino.id_conta,
            saldo_inicial: Number(contaOrigem.saldo),
            saldo_final: Number(contaOrigem.saldo) - transacao.valor,
            data: moment().utc().toDate(),
          };

          let transacaoDestino = {
            id_conta: contaDestino.id_conta,
            id_tipo: TipoTransacao.TRANSFERENCIA_RECEBER,
            valor: transacao.valor,
            id_conta_destino_origem: contaOrigem.id_conta,
            saldo_inicial:Number(contaDestino.saldo),
            saldo_final: Number(contaDestino.saldo) + transacao.valor,
            data: moment().utc().toDate(),
          };

          //Atualizo o saldo das contas
          contaOrigem.saldo = Number(contaOrigem.saldo) - transacao.valor;
          contaDestino.saldo = Number(contaDestino.saldo) + transacao.valor;

          //Criar as funções de inserção e update e armazeno em um array de promises
          promises.push(
            trx("contas")
              .update(contaOrigem)
              .where("id_conta", contaOrigem.id_conta)
          );
          promises.push(
            trx("contas")
              .update(contaDestino)
              .where("id_conta", contaDestino.id_conta)
          );

          promises.push(trx("transacoes").insert(transacaoOrigem));

          promises.push(trx("transacoes").insert(transacaoDestino));

          Promise.all(promises)
            .then(() => {
              trx.commit();
              resolve(true);
            })
            .catch((erro) => {
              trx.rollback();
              reject(erro);
            });
        })
        .catch((erro) => {
          trx.rollback();
          reject(erro);
        });
    });
  }
}
