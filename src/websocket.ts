import { logger } from "./logger";
import { WebSocket } from "ws";

export function createWebSocket(server:any) {
  const wss = new WebSocket.Server({
    server,
  });

  wss.on("connection", (ws, req) => {
    ws.on("message", (data) => {
      console.log(data.toString());
    });
  });

  logger.info(`Websocket rodando na porta ${process.env.PORT}`);
}
