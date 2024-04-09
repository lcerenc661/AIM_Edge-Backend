import { body, query } from "express-validator";

export const createInvoiceValidator = [
  body("clientId", "clientId property is required and cannot be empty")
    .exists()
    .notEmpty()
    .isString(),
  body("invoiceImage", "InvoiceImage property cannot be empty")
    .optional()
    .notEmpty(),
  body("invoiceProducts", "Invoice Product is required and cannot be empty")
    .notEmpty()
    .isArray(),
  body("discount", "Discount is required, cannot be empty, and must be numeric")
    .exists()
    .notEmpty()
    .isInt(),
  body(
    "clientSeniority",
    "clientSeniority is required, cannot be empty, and must be numeric"
  )
    .exists()
    .notEmpty()
    .isNumeric(),
  body(
    "totalSales",
    "TotalSales is required, cannot be empty, and must be numeric"
  )
    .exists()
    .notEmpty()
    .isNumeric(),
  body("invoiceProducts.*.product", "Product must be a string").isInt(),
  body("invoiceProducts.*.quantity", "Quantity must be a number").isNumeric(),
];

export const getInvoiceValidator = [
  query("page", "Page must be a number").optional().isNumeric(),
  query("limit", "Limit must be a number").optional().isNumeric(),
];
