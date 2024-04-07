import { Request, Response } from "express";
import { prisma } from "../../data/mysql_";
import { validationResult } from "express-validator";

export class AuthController {
  constructor() {}

  public login = (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }
    return res.json({ hello: "world" });
  };

  public register = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }
    const newUser = {message: "User validated"}
    res.json(newUser);
  };
}
