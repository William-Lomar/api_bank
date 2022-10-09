import { ContaModel } from "../model";
import { knex } from '../conexaoBanco';

export class Conta{
    public static cadastrarConta(conta:ContaModel):Promise<boolean>{
        return new Promise((resolve,reject)=>{
            knex('contas').insert(conta).then((conta)=>{
                resolve(true);
            }).catch((erro)=>{
                reject(erro)
            })
        })
    }

    public static getContas(id_usuario?:string | undefined):Promise<ContaModel[]>{
        return new Promise((resolve,reject)=>{
            let sql = knex('contas').select('*');
            if(id_usuario) sql.where('id_usuario',id_usuario);

            sql.then((contas)=>{
                resolve(contas);
            }).catch((erro)=>{
                reject(erro)
            })
        })
    }

    public static excluirConta(id_conta:number):Promise<boolean>{
        return new Promise((resolve,reject)=>{
            knex('contas').del().where('id_conta',id_conta).then(()=>{
                resolve(true);
            }).catch((erro)=>{
                reject(erro);
            })
        })
    }

    public static editarConta(conta:ContaModel):Promise<boolean>{
        return new Promise((resolve,reject)=>{
            knex('contas').update(conta).where('id_conta',conta.id_conta).then(()=>{
                resolve(true);
            }).catch((erro)=>{
                reject(erro)
            })
        })
    }
}