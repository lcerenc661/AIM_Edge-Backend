import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { CreateInvoiceData } from "../../interfaces/invoice.interface";
import { InvoiceService } from "../services/invoices.service";

export class InvoiceController {
  constructor(public readonly invoiceService: InvoiceService) {}

  public getInvoices = async (req: Request, res: Response) => {
    this.invoiceService
      .getInvoiceList()
      .then(({ newInvoices }) => res.json(newInvoices));

  };

  public createInvoice = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }
    const { clientId, invoiceImage, invoiceProducts }: CreateInvoiceData =
      req.body;

    this.invoiceService
      .createInvoice({ clientId, invoiceImage, invoiceProducts })
      .then((newInvoice) => res.json(newInvoice));
  };
}
