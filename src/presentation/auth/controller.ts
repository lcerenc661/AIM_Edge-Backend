import { Request, Response } from "express";
import { prisma } from "../../data/mysql";


export class AuthController {

  constructor(){}

  public login = (req: Request, res: Response) => {
    return res.json({ hello: "world" });
  };

  public register = async (req: Request, res: Response) => {
    const newUser =await prisma.user.create({
      data: {email: 'example@gmail.com', password: '123456', role: "admin"}
    })
    res.json(newUser)
  };


}
