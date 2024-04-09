import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { CreateInvoiceData } from "../../interfaces/invoice.interface";
import { InvoiceService } from "../services/invoices.service";
import { CustomError } from "../../domain";

export class InvoiceController {
  constructor(public readonly invoiceService: InvoiceService) {}

  // Private

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server Error" });
  };

  // Public

  public getInvoices = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }

    let { page = 1, limit = 10 } = req.query;
    page = +page.toString();
    limit = +limit.toString();

    this.invoiceService
      .getInvoiceList({ page, take: limit })
      .then(({ invoicesArray, paginationInfo }) =>
        res.json({ invoicesArray, paginationInfo })
      )
      .catch((error) => this.handleError(error, res));
  };

  public createInvoice = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }

    const { user } = req.body;
    if (user.role !== "admin") {
      return res.status(401).json({ error: `User ${user.email} unauthorized` });
    }

    let {
      clientId,
      invoiceImage,
      invoiceProducts,
      discount,
      clientSeniority,
      totalSales,
    }: CreateInvoiceData = req.body;

    this.invoiceService
      .createInvoice({
        clientId,
        invoiceImage,
        invoiceProducts,
        discount,
        clientSeniority,
        totalSales,
      })
      .then((newInvoice) => res.json(newInvoice))
      .catch((error) => this.handleError(error, res));
  };
}
