import { Router } from "express";
import { InvoiceController } from "./controller";
import {
  createInvoiceValidator,
  getInvoiceValidator,
} from "../../domain/validators/invoices/validators";
import { InvoiceService } from "../services/invoices.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class InvoiceRoutes {
  static get routes(): Router {
    const router = Router();
    const invoiceService = new InvoiceService();

    const todoController = new InvoiceController(invoiceService);

    router.get(
      "/",
      AuthMiddleware.validateJWT,
      getInvoiceValidator,
      todoController.getInvoices
    );
    router.post(
      "/",
      AuthMiddleware.validateJWT,
      createInvoiceValidator,
      todoController.createInvoice
    );

    return router;
  }
}
