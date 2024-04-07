export interface InvoiceProduct__ {
  product: number;
  quantity: number;
}

export interface CreateInvoiceData {
  clientId: number;
  invoiceImage: string;
  invoiceProducts: InvoiceProduct__[];
}

export interface Invoice {
  id: number;
  clientId: number;
  createdAt: Date;
  invoiceImage?: string;
  invoiceProduct: InvoiceProduct[];
  user: User;
}

export interface InvoiceProduct {
  id: number;
  productId: number;
  quantity: number;
  invoiceId: number;
  product: Product;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  value: number;
  createdAt: Date;
}

export interface User {
  id: number;
  email: string;
  password: string;
  role: "admin" | "client";
  createdAt: Date;
}

export interface Register {
  email: string;
  password: string;
  password2: string;
}

export interface Login {
  email: string;
  password: string;
}
