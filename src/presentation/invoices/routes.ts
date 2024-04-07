import { Router } from 'express';
import { InvoiceController } from './controller';


export class InvoiceRoutes {


  static get routes(): Router {

    const router = Router();

    const todoController = new InvoiceController();

    router.get('/', todoController.getInvoices );
    router.post('/', todoController.createInvoice );
    


    return router;
  }


}