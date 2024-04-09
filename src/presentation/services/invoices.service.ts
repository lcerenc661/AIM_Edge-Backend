import { Invoice as prismaInvoice } from "@prisma/client";
import { prisma } from "../../data/mysql_";
import {
  CreateInvoiceData,
  Invoice,
  User,
} from "../../interfaces/invoice.interface";
import { CustomError } from "../../domain";

interface PaginationOptions {
  page?: number;
  take?: number;
}

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

  private async getTotalSales(clientId: string) {
    const client = await prisma.user.findUnique({
      where: { id: clientId },
      include: {
        invoice: {
          include: {
            invoiceProduct: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    if (!client) {
      throw CustomError.badRequest("User not found to get total sales");
    }

    let totalSum = 0;

    for (const invoice of client!.invoice) {
      const discount = invoice.discount;
      for (const invoiceProduct of invoice.invoiceProduct) {
        if (discount === 0) {
          totalSum += invoiceProduct.product.value * invoiceProduct.quantity;
        } else {
          totalSum +=
            (invoiceProduct.product.value *
              invoiceProduct.quantity *
              (100 - discount)) /
            100;
        }
      }
    }

    return totalSum;
  }

  private validateDiscount(clientSeniority: number, totalSales: number) {
    if (totalSales >= 200) {
      if (totalSales >= 2000) {
        return 45;
      }
      if (clientSeniority > 2) {
        return 30;
      }
      if (totalSales <= 1000) {
        return 10;
      }
    }
    return 0;
  }

  private getSummaryData(invoice: Invoice) {
    return {
      invoiceNumber: invoice.id,
      client: invoice.user.email,
      date: invoice.createdAt.toLocaleDateString(),
      products: invoice.invoiceProduct.map((product) => {
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

  public async getInvoiceList({ page = 1, take = 10 }: PaginationOptions) {
    let invoices;
    let totalCount: number;
    let totalPages: number;
    try {
      invoices = await prisma.invoice.findMany({
        take: take,
        skip: (page - 1) * take,
        include: {
          invoiceProduct: {
            include: {
              product: true,
            },
          },
          user: true,
        },
      });

      totalCount = await prisma.invoice.count({});
      totalPages = Math.ceil(totalCount / +take);
    } catch (error) {
      throw CustomError.internalServer(
        "Something went wrong, please try again"
      );
    }

    const invoicesArray = invoices!.map((invoice) => {
      const subTotal = this.getSubTotal(invoice as any);
      const discount = invoice.discount;
      const total = (subTotal * discount).toFixed(2);
      const summary = this.getSummaryData(invoice as any);

      return { ...summary, subTotal, discount, total };
    });

    const paginationInfo = {
      currentPage: page,
      limit: take,
      totalPages: totalPages,
    };

    return { invoicesArray, paginationInfo };
  }

  public async createInvoice(createInvoiceData: CreateInvoiceData) {
    const {
      clientId,
      invoiceImage,
      invoiceProducts,
      discount,
      clientSeniority,
      totalSales: totalPreviousSales,
    }: CreateInvoiceData = createInvoiceData;
    let newInvoice: prismaInvoice;

    try {
      newInvoice = await prisma.invoice.create({
        data: { clientId, invoiceImage, discount: +discount },
      });
    } catch (error) {
      throw CustomError.badRequest("Invalid client ID");
    }

    if (invoiceProducts.length === 0) {
      throw CustomError.badRequest("Invoice need to have at least one product");
    }

    const isInDiscountRange =
      discount <= this.validateDiscount(clientSeniority, totalPreviousSales);
    if (!isInDiscountRange) {
      throw CustomError.badRequest("Discount not valid to client");
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
    const totalSales = await this.getTotalSales(clientId);
    await prisma.user.update({
      where: { id: clientId },
      data: { totalSales: totalSales },
    });

    return newInvoice;
  }
}
