export enum HTTP_ERRORS {
  ERRO_BANCO = 402,
  ACESSO_NAO_AUTORIZADO = 401,
  ROTA_NAO_ENCONTRADA = 404,
  SOLICITACAO = 550, // Erro na solicitação enviada pelo app
  ERRO_INTERNO = 500, //Erro não mapeado
  ERRO_API_EXTERNA = 403, //Erro ao realizar uma solicitação externa
}

export enum TipoTransacao{
  DEPOSITO = 1,
  SAQUE = 2,
  TRANSFERENCIA_ENVIAR = 3,
  CRIAR_CONTA = 4,
  TRANSFERENCIA_RECEBER = 5,
}

export interface UsuarioModel{
  id_usuario?:number,
  cpf:string,
  senha:string,
  email:string,
}

export interface ContaModel{
  id_conta?:number,
  id_usuario:number, 
  nome:string,
  saldo:number,
  document:string
}

export interface TransacaoModel{
  id_transacao?:number,
  id_conta:number,
  id_tipo:TipoTransacao,
  valor:number,
  id_conta_destino_origem:number, //Id da conta de destino se o tipo de transação for de envio ou id da conta de origem se a transação for de receber
  saldo_inicial:number,
  saldo_final:number,
  data:Date
}

export enum ErrosBDModel{
  UNIQUE_VIOLATION = 23505
}

