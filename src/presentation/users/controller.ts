import { Request, Response } from "express";

import { CustomError } from "../../domain";
import { UserService } from "../services/user.service";

export class UserController {
  constructor(public readonly userService: UserService) {}

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
    this.userService
      .getUserList()
      .then(({ usersArray }) => res.json({ usersArray }))
      .catch((error) => this.handleError(error, res));
  };
}
