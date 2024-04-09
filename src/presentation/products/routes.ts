import { Router } from "express";
import { ProductController } from "./controller";
import { ProductService } from "../services/products.service";

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();

    // const authService = new AuthService();
    const productService = new ProductService();
    const productController = new ProductController(productService);

    router.get("/", productController.getProducts);

    return router;
  }
}
