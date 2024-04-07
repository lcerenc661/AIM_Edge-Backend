import { Invoice as prismaInvoice } from "@prisma/client";
import { prisma } from "../../data/mysql_";
import {
  CreateInvoiceData,
  Invoice,
  User,
} from "../../interfaces/invoice.interface";
import { CustomError } from "../../domain";

export class InvoiceService {
  constructor() {}

  //Private Methods
  private getSubTotal(invoiceComplete: Invoice): number {
    const total = invoiceComplete.invoiceProduct.reduce(
      (accumulator, item) => accumulator + item.product.value * item.quantity,
      0
    );
    return total;
  }

  private getClientSeniority(user: User) {
    const { createdAt } = user;
    const actualDate = new Date();
    const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;

    let timeDifference =
      (actualDate.getTime() - createdAt.getTime()) / millisecondsInYear;
    return timeDifference.toFixed(0);
  }

  private getDiscount(total: number, clientSeniority: number) {
    if (clientSeniority > 2) {
      if (total <= 200) {
        return 1;
      } else if (total > 200 && total <= 1000) {
        return 1 - 0.1;
      } else if (total > 2000) {
        return 1 - 0.45;
      } else {
        return 1 - 0.3;
      }
    } else {
      return 1;
    }
  }

  private getSummaryData(invoice: Invoice) {
    return {
      InvoiceNumber: invoice.id,
      Client: invoice.user.email,
      Date: invoice.createdAt.toLocaleDateString(),
      Products: invoice.invoiceProduct.map((product) => {
        return {
          productID: product.product.id,
          quantity: product.quantity,
          productName: product.product.name,
        };
      }),
      Image: invoice.invoiceImage ?? "noImage",
    };
  }

  //Public Methods

  public async getInvoiceList() {
    let invoices;
    try {
      invoices = await prisma.invoice.findMany({
        include: {
          invoiceProduct: {
            include: {
              product: true,
            },
          },
          user: true,
        },
      });
    } catch (error) {
      throw CustomError.internalServer(
        "Something went wrong, please try again"
      );
    }

    const newInvoices = invoices!.map((invoice) => {
      const subTotal = this.getSubTotal(invoice as any);
      const clientSeniority = +this.getClientSeniority(invoice.user);
      const discount = this.getDiscount(subTotal, clientSeniority);
      const discountInfo = +(
        (1 - this.getDiscount(subTotal, clientSeniority)) *
        100
      ).toFixed(0);
      const total = (subTotal * discount).toFixed(2);
      const summary = this.getSummaryData(invoice as any);

      return { ...summary, subTotal, clientSeniority, discountInfo, total };
    });

    return { newInvoices };
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
