import { Request, Response } from "express";
import { prisma } from "../../data/mysql_";
import { InvoiceRoutes } from "./routes";
import { Invoice } from "@prisma/client";

interface InvoiceProduct {
  product: string;
  quantity: number;
}

interface createData {
  clientId: string;
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
    const { clientId, invoiceImage, invoiceProducts }: createData = req.body;

    const newInvoice: Invoice = await prisma.invoice.create({
      data: { clientId, invoiceImage },
    });
    

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
