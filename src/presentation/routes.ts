import { Router } from "express";
import { InvoiceRoutes } from "./invoices/routes";
import { AuthRoutes } from "./auth/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/invoices", InvoiceRoutes.routes);
    router.use("/api/auth", AuthRoutes.routes)

    return router;
  }
}
