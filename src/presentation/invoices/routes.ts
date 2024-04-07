import { Router } from "express";
import { InvoiceController } from "./controller";
import { createInvoiceValidator } from "../../domain/validators/invoices/validators";
import { InvoiceService } from "../services/invoices.service";

export class InvoiceRoutes {
  static get routes(): Router {
    const router = Router();
    const invoiceService = new InvoiceService();

    const todoController = new InvoiceController(invoiceService);

    router.get("/", todoController.getInvoices);
    router.post("/", createInvoiceValidator, todoController.createInvoice);

    return router;
  }
}
