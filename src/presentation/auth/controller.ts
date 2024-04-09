import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { AuthService } from "../services/auth.service";
import { CustomError } from "../../domain";
import { verify } from "crypto";
import { json } from "stream/consumers";

export class AuthController {
  constructor(public readonly authService: AuthService) {}

  //Private

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server Error" });
  };

  //Public

  public login = (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }

    const { email, password } = req.body;

    this.authService
      .loginUser({ email, password })
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  };

  public register = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }

    const { email, password, password2, name, phone, contactPoint } = req.body;
    this.authService
      .registerUser({
        email,
        password,
        password2,
        name,
        phone,
        contactPoint,
      })
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  };

  public refreshToken = async (req: Request, res: Response) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }

    // const { refreshToken }= req.headers
    const  refreshToken = req.headers?.refreshtoken
    if (!refreshToken) {
      return res.status(400).json({ error: "Unauthorized" });;
    }

    this.authService
      .refreshJWT(refreshToken as string)
      .then(({ token, user }) => res.json({ token, user }))
      .catch((error) => this.handleError(error, res));
  };
}
