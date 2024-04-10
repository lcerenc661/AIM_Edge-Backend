import { UploadedFile } from "express-fileupload";
import { putObject, s3Client } from "../../config";
import { CustomError } from "../../domain";

interface Props {
  file: UploadedFile;

  newFileName: string;
}

export class FileUploadService {
  constructor() {}

  public async uploadFile({ file, newFileName }: Props) {
    const validExtensions = ["png", "jpg", "jpeg", "gif"];
    const extension = file.mimetype.split("/").at(1) ?? "";
    if (!validExtensions.includes(extension)) {
      throw CustomError.badRequest("Invalid file format");
    }

    const fileName = newFileName;
    const bucketParams = {
      Bucket: process.env.S3_BUCKET_NAME || "",
      Key: fileName,
      Body: file.data,
    };

    try {
      // Upload the file and get the object URL
      const objectUrl = await this.uploadFileToS3(bucketParams, fileName);
      return objectUrl;
    } catch (err) {
      console.log("Error", err);
      throw CustomError.internalServer("Error uploading file");
    }
  }

  private async uploadFileToS3(
    bucketParams: any,
    fileName: string
  ): Promise<string> {
    try {
      // Upload the file to S3
      const response = await s3Client.send(putObject(bucketParams, fileName));
      // Construct the URL using the bucket name and file name
      const objectUrl = `https://${bucketParams.Bucket}.s3.amazonaws.com/${fileName}`;
      return objectUrl;
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      throw error;
    }
  }
}
