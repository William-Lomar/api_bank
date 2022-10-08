import { Application, NextFunction, Request, Response } from "express";

export = (app: Application) => {
  app.post("/transaction", (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "Logo terá sua transação" });
  });
};
