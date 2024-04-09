export interface InvoiceProduct__ {
  product: string;
  quantity: number;
}

export interface CreateInvoiceData {
  clientId: string;
  invoiceImage: string;
  invoiceProducts: InvoiceProduct__[];
  discount: number;
  clientSeniority: number;
  totalSales: number;
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
  productId: string;
  quantity: number;
  invoiceId: number;
  product: Product;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  value: number;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  password: string;
  role: "admin" | "client";
  createdAt: Date;
  totalSales: number;
}

export interface Register {
  name: string;
  contactPoint?: string;
  phone: string;
  email: string;
  password: string;
  password2: string;
}

export interface Login {
  email: string;
  password: string;
}

