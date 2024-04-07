import { Router } from "express";
import { InvoiceController } from "./controller";
import { createInvoiceValidator } from "../../domain/validators/invoices/validators";

export class InvoiceRoutes {
  static get routes(): Router {
    const router = Router();

    const todoController = new InvoiceController();

    router.get("/", todoController.getInvoices);
    router.post("/", createInvoiceValidator, todoController.createInvoice);

    return router;
  }
}
