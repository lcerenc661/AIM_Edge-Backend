import { Request, Response } from "express";
import { prisma } from "../../data/mysql_";
import { InvoiceRoutes } from "./routes";
import { Invoice } from "@prisma/client";
import { validationResult } from "express-validator";

interface InvoiceProduct {
  product: number;
  quantity: number;
}

interface createData {
  clientId: number;
  invoiceImage: string;
  invoiceProducts: InvoiceProduct[];
}

export class InvoiceController {
  constructor() {}

  public getInvoices = async (req: Request, res: Response) => {
    const invoices = await prisma.invoice.findMany();
    return res.json(invoices);
  };

  public createInvoice = async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors })
    }
    const { clientId, invoiceImage, invoiceProducts }: createData = req.body;

    let newInvoice: Invoice

    try {
      newInvoice = await prisma.invoice.create({
        data: { clientId, invoiceImage },
      });
      
    } catch (error) {
       return res.status(400).json({message: "Bad client ID"})
    }

    const newInvoiceProducts = await Promise.all(
      invoiceProducts.map(async (products) => {
        return await prisma.invoiceProduct.create({
          data: {
            productId: products.product,
            quantity: products.quantity,
            invoiceId: newInvoice.id,
          },
        });
      })
    );

    res.json(newInvoice);
  };
}
