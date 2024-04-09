import { Request, Response } from "express";

import { CustomError } from "../../domain";

export class UserController {
  constructor() // public readonly authService: AuthService
  {}

  //Private

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server Error" });
  };

  //Public

  public getUsers = (req: Request, res: Response) => {
    res.json({ user: "users" });
  };
}
