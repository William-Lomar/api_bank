import express, { json, Response, NextFunction, Request } from "express";
import createError from "http-errors";
import helmet from "helmet";
import cors from "cors";
import { HTTP_ERRORS } from "./model";
const consign = require("consign");
require('dotenv').config();

const AUTHORIZATION = process.env.AUTHORIZATION;

const app = express();

app.use(helmet());
app.use(cors());
app.use(json());

app.use("/private/*", (req: Request, res: Response, next: NextFunction) => {
  let authorization = req.header("authorization");
  if (authorization == AUTHORIZATION) {
    next();
  } else {
    next(
      createError(
        HTTP_ERRORS.ACESSO_NAO_AUTORIZADO,
        "login incorreto ao acessar rota privada"
      )
    );
  }
});

consign({ cwd: "src" }).include("routers").into(app);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  // Seta o HTTP Status Code
  res.status(error.status);
  // Envia a resposta
  res.json({ message: error.message });
});

const server = app.listen(Number(process.env.PORT),()=>{
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
})

process.on('SIGTERM', signal => {
  console.log(`Process ${process.pid} received a SIGTERM signal`)
  server.close(()=>{
    process.exit(1)
  });
})

process.on('SIGINT', signal => {
  console.log(`Process ${process.pid} has been interrupted`)
  server.close(()=>{
    process.exit(1)
  });
})

process.on('uncaughtException', err => {
  console.log(`Uncaught Exception: ${err.message}`)
  server.close(()=>{
    process.exit(1)
  });
  
})

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled rejection at ', promise, `reason: ${reason}`)
  server.close(()=>{
    process.exit(1)
  });
})
