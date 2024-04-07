import { Invoice as prismaInvoice }  from "@prisma/client";
import { prisma } from "../../data/mysql_";
import {
  CreateInvoiceData,
  Invoice,
} from "../../interfaces/invoice.interface";
import { CustomError } from "../../domain";

export class InvoiceService {
  constructor() {}

  public getTotal(invoiceComplete: Invoice): number {
    const total = invoiceComplete.invoiceProduct.reduce(
      (accumulator, item) => accumulator + item.product.value * item.quantity,
      0
    );
    return total;
  }

  public async getInvoiceList() {
    const invoices = await prisma.invoice.findMany({
      include: {
        invoiceProduct: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    });

    const newInvoices = invoices.map((invoice)=>{
      const total = this.getTotal(invoice as any)
      return { ...invoice, total}
    })

    return{ newInvoices}
  }

  public async createInvoice(createInvoiceData: CreateInvoiceData) {
    const { clientId, invoiceImage, invoiceProducts }: CreateInvoiceData =
      createInvoiceData;
    let newInvoice: prismaInvoice;

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
