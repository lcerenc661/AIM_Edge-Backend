import { Router } from "express";
import { AuthController } from "./controller";
import { userLoginValidator, userRegisterValidator } from "../../domain/validators/auth/validators";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const authController = new AuthController()

    router.post("/login", userLoginValidator, authController.login);
    router.post("/register", userRegisterValidator, authController.register);

    return router;
  }
}
