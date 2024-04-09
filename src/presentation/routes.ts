import { Router } from "express";
import { InvoiceRoutes } from "./invoices/routes";
import { AuthRoutes } from "./auth/routes";
import { UploadRoutes } from "./fileUpload/routes";
import { ProductRoutes } from "./products/routes";
import { UserRoutes } from "./users/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/invoices", InvoiceRoutes.routes);
    router.use("/api/products", ProductRoutes.routes);
    router.use("/api/users", UserRoutes.routes);
    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/uploadFile", UploadRoutes.routes);

    return router;
  }
}
