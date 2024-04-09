import { Request, Response } from "express";

import { CustomError } from "../../domain";
import { ProductService } from "../services/products.service";

export class ProductController {
  constructor(public readonly productService: ProductService) {}

  //Private

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server Error" });
  };

  //Public

  public getProducts = (req: Request, res: Response) => {
    this.productService
      .getProductList()
      .then(({ productsArray }) => res.json({ productsArray }))
      .catch((error) => this.handleError(error, res));
  };
}
