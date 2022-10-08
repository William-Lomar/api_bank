import { knex } from "../conexaoBanco";
import { RespostaFunctions, UsuarioModel } from "../model";

export class Usuario{   
    public static login(login:string,senha:string):Promise<RespostaFunctions>{
        return new Promise((resolve,reject)=>{
            knex('usuarios').select('*').where('login',login).andWhere('senha',senha).then((usuario)=>{
                if(usuario.length > 0){
                    resolve({
                        sucesso:true,
                        mensagem:usuario[0]
                    })
                }else{
                    reject({
                        sucesso:false,
                        mensagem:"Nenhum usuario encontrado"
                    })
                }
            }).catch((erro)=>{
                reject({
                    sucesso:false,
                    messagem:erro
                })
            })
        })
    }


    public static cadastraUsuario(usuario:UsuarioModel):Promise<RespostaFunctions>{
       return new Promise((resolve,reject)=>{
        knex('usuarios').insert(usuario).then((result)=>{
            resolve({
                sucesso:true,
                mensagem:result
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