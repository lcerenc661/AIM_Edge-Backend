import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { FileUploadService } from "../services/upload.service";
import { UploadedFile } from "express-fileupload";

export class UploadController {
  constructor(public readonly fileUploadService: FileUploadService) {}

  // Private

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server Error" });
  };

  // Public

  public uploadFile = (req: Request, res: Response) => {
    const { id } = req.params;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "No files were selected" });
    }
    const file = req.files.file as UploadedFile;
    this.fileUploadService
      .uploadFile({ file, newFileName: `invoice#${id}` })
      .then((uploaded) => res.json(uploaded))
      .catch((error) => this.handleError(error, res));
  };
}
