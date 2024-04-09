import { Router } from "express";
import { InvoiceRoutes } from "./invoices/routes";
import { AuthRoutes } from "./auth/routes";
import { UploadRoutes } from "./fileUpload/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/invoices", InvoiceRoutes.routes);
    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/uploadFile", UploadRoutes.routes);

    return router;
  }
}
