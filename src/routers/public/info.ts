import { Application, NextFunction, Request, Response } from "express";

export = (app: Application) => {
  app.get("/info", (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "API em operação" });
  });
};
