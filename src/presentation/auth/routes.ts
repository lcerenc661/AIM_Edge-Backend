import { Router } from "express";
import { AuthController } from "./controller";
import {
  refreshTokenValidator,
  userLoginValidator,
  userRegisterValidator,
} from "../../domain/validators/auth/validators";
import { AuthService } from "../services/auth.service";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const authService = new AuthService();
    const authController = new AuthController(authService);

    router.post("/login", userLoginValidator, authController.login);
    router.post("/register", userRegisterValidator, authController.register);

    router.post("/refresh", refreshTokenValidator, authController.refreshToken);

    return router;
  }
}
