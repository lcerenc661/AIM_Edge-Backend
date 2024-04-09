import { Router } from "express";
import { UserController } from "./controller";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    // const authService = new AuthService();
    const userController = new UserController();

    router.get("/", userController.getUsers);

    return router;
  }
}
