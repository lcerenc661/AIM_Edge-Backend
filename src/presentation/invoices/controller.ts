import { Request, Response } from "express";

export class InvoiceController {

  constructor(){}

  public getInvoices = (req: Request, res: Response) => {
    return res.json({ hello: "world" });
  };
}
