import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { CreateInvoiceData } from "../../interfaces/invoice.interface";
import { InvoiceService } from "../services/invoices.service";
import { CustomError } from "../../domain";

export class InvoiceController {
  constructor(public readonly invoiceService: InvoiceService) {}

   // Private

  private handleError = (error: unknown, res: Response)=>{
    if (error instanceof CustomError){
      return res.status(error.statusCode).json({error: error.message})
    }

    console.log(`${error}`)
    return res.status(500).json({ error: 'Internal server Error'})
  }

  // Public

  public getInvoices = async (req: Request, res: Response) => {
    this.invoiceService
      .getInvoiceList()
      .then(({ newInvoices }) => res.json(newInvoices))
      .catch((error) => this.handleError(error, res));

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
      .then((newInvoice) => res.json(newInvoice))
      .catch((error) => this.handleError(error, res));
  };
}
