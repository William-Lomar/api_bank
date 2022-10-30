import { ErrosBDModel } from "../model";


export function tratarErro(erro:any){
    if(erro.code){
        switch (Number(erro.code)) {
            case ErrosBDModel.UNIQUE_VIOLATION:
                return 'Violação de chave única!'
                break;
        
            default:
                break;
        }
    }else{
        return erro;
    }
}