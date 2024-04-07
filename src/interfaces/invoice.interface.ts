export interface InvoiceProduct {
  product: number;
  quantity: number;
}

export interface CreateInvoiceData {
  clientId: number;
  invoiceImage: string;
  invoiceProducts: InvoiceProduct[];
}

export interface InvoiceComplete {
  id: number;
  clientId: number;
  createdAt: Date;
  invoiceImage: string;
  invoiceProduct: InvoiceProduct[];
  user: User;
}

export interface InvoiceProductComplete {
  id: number;
  productId: number;
  quantity: number;
  invoiceId: number;
  product: Product;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  value: number;
  createdAt: Date;
}

export interface User {
  id: number;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
}
