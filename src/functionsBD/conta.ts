import { RespostaFunctions } from './../model';
import { ContaModel } from "../model";
import { knex } from '../conexaoBanco';

export class Conta{
    public static cadastrarConta(conta:ContaModel):Promise<RespostaFunctions>{
        return new Promise((resolve,reject)=>{
            knex('contas').insert(conta).then((conta)=>{
                resolve({
                    sucesso:true,
                    mensagem:conta
                })
            }).catch((erro)=>{
                reject({
                    sucesso:false,
                    mensagem:erro
                })
            })
        })
    }

    public static getContas(id_usuario?:string | undefined):Promise<RespostaFunctions>{
        return new Promise((resolve,reject)=>{
            let sql = knex('contas').select('*');
            if(id_usuario) sql.where('id_usuario',id_usuario);

            sql.then((contas)=>{
                resolve({
                    sucesso:true,
                    mensagem:contas
                })
            }).catch((erro)=>{
                reject({
                    sucesso:false,
                    mensagem:erro
                })
            })
        })
    }
}