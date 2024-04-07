import { body } from "express-validator";

export const createInvoiceValidator = [
  body("clientId", "clientId property is required and cannot be empty")
    .exists()
    .notEmpty(),
  body("invoiceImage", "InvoiceImage property cannot be empty")
    .optional()
    .notEmpty(),
  body("invoiceProducts", "Invoice Product is required and cannot be empty")
    .notEmpty()
    .isArray(),
  body("invoiceProducts.*.product", "Product must be a string").isString(),
  body("invoiceProducts.*.quantity", "Quantity must be a number").isNumeric(),
];

