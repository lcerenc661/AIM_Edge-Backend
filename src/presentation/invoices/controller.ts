import { Request, Response } from "express";
import { prisma } from "../../data/mysql";


export class InvoiceController {

  constructor(){}

  public getInvoices = async (req: Request, res: Response) => {
    const invoicies = await prisma.invoice.findMany()
    return res.json( )
  };

  public createInvoice = (req: Request, res: Response) => {
    return res.json({ hello: "world" });
  };
}
