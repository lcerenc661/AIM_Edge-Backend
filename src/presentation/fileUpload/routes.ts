import { Router } from "express";
import { UploadController } from "./controller";
import { FileUploadService } from '../services/upload.service';


export class UploadRoutes {
  static get routes(): Router {
    const router = Router();

    const fileUploadService =  new FileUploadService()
    const uploadController = new UploadController(fileUploadService);

    router.post("/:id", uploadController.uploadFile);

    return router;
  }
}
