import { Invoice } from "@prisma/client";
import { prisma } from "../../data/mysql_";
import { CreateInvoiceData } from "../../interfaces/invoice.interface";
import { CustomError } from "../../domain";

export class InvoiceService {
  constructor() {}

  public getInvoiceList() {}

  public async createInvoice(createInvoiceData: CreateInvoiceData) {
    const { clientId, invoiceImage, invoiceProducts }: CreateInvoiceData =
      createInvoiceData;
    let newInvoice: Invoice;

    try {
      newInvoice = await prisma.invoice.create({
        data: { clientId, invoiceImage },
      });
    } catch (error) {
      throw CustomError.badRequest("Invalid client ID");
    }

    try {
      await Promise.all(
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
    } catch (error) {
      throw CustomError.badRequest("One of the products Id is not valid");
    }

    return newInvoice;
  }
}
