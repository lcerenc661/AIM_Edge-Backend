import { Request, Response } from "express";

export class AuthController {

  constructor(){}

  public login = (req: Request, res: Response) => {
    return res.json({ hello: "world" });
  };
}
