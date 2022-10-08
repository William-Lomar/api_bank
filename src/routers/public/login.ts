import { Application, NextFunction, Request, Response } from "express";

export = (app: Application) => {
  app.get("/login", (req: Request, res: Response, next: NextFunction) => {


    



    res.json({ message: "Logo terá sua chave" });
  });
};
