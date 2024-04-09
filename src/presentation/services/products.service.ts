import { prisma } from "../../data/mysql_";

import { CustomError } from "../../domain";


export class ProductService {
  constructor() {}

  //Private Methods
 
  //Public Methods

  public async getProductList() {
    let products;
    try {
      products = await prisma.product.findMany();
    } catch (error) {
      throw CustomError.internalServer(
        "Something went wrong, please try again"
      );
    }

    const productsArray = products!.map((product) => {
      const { createdAt, ...restProduct } = product;
      return { ...restProduct };
    });

    return { productsArray };
  }
}
