import { logger } from "./logger";
import { WebSocket } from "ws";

export let clients:Map<string | string[],WebSocket> = new Map();

export function createWebSocket(server:any) {
  const wss = new WebSocket.Server({
    server,
  });

  wss.on("connection", (ws, req) => {
    if(req.url){
      let id = new URL('ws://localhost:3000'+req.url).searchParams.get('id');
      if(id) clients.set(id,ws)

      logger.info(`Novo usuario conectado com id: ${id}`)
    }
  });

  wss.on('listening',()=>{
    logger.info(`Websocket rodando na porta ${process.env.PORT}`);
  })
}
