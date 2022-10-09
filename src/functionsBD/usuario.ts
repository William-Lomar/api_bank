import { knex } from "../conexaoBanco";
import {  UsuarioModel } from "../model";

export class Usuario{   
    public static login(cpf:string,senha:string):Promise<UsuarioModel>{
        return new Promise((resolve,reject)=>{
            knex('usuarios').select('*').where('cpf',cpf).andWhere('senha',senha).then((usuario)=>{
                if(usuario.length > 0){
                    resolve(usuario[0]);
                }else{
                    reject('Nenhum usuario encontrado')
                }
            }).catch((erro)=>{
                reject(erro)
            })
        })
    }


    public static cadastraUsuario(usuario:UsuarioModel):Promise<boolean>{
       return new Promise((resolve,reject)=>{
        knex('usuarios').insert(usuario).then(()=>{
            resolve(true)
        }).catch((erro)=>{
            reject(erro)
        })
       })
    }
}