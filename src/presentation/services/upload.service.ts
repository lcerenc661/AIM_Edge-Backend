import { UploadedFile } from "express-fileupload";
import { putObject, s3Client } from "../../config";
import { CustomError } from "../../domain";

export class FileUploadService {
  constructor() {}


  public async uploadFile(
    file: UploadedFile,
    validExtensions: string[] = ["png", "jpg", "jpeg", "gif"]
  ) {
    const extension = file.mimetype.split('/').at(1) ?? ""
    if (!validExtensions.includes(extension)){
      throw CustomError.badRequest("Invalid file format")
    }
    
  const fileName = file.name;
  
  const bucketParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME || "",
    Key: fileName,
    Body: file.data,
  };
  try {
    const data = await s3Client.send(putObject(bucketParams));
    console.log(data)
    return data
  } catch (err) {
    console.log("Error", err);
  }
  }
}
