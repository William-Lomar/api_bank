export enum HTTP_ERRORS {
  ERRO_BANCO = 402,
  ACESSO_NAO_AUTORIZADO = 401,
  ROTA_NAO_ENCONTRADA = 404,
  ERRO_INTERNO = 500, //Erro não mapeado
  ERRO_API_EXTERNA = 403, //Erro ao realizar uma solicitação externa
}

export enum TipoTransacao{
  DEPOSITO = 0,
  SAQUE = 1,
  TRANSFERENCIA = 2
}

export interface UsuarioModel{
  id_usuario?:number,
  login:string,
  senha:string,
  email:string,
}

export interface ContaModel{
  id_conta?:number,
  id_usuario:number,
  nome:string,
  saldo:number
}

export interface TransacaoModel{
  id_transacao?:number,
  id_conta:number,
  id_tipo:TipoTransacao,
  valor:number
}

export interface RespostaFunctions{
  sucesso:boolean,
  mensagem:any
}