import { knex } from "knex";
import { RespostaFunctions, UsuarioModel } from "../model";

export class Usuario{   
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