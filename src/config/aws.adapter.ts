import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

interface UploadParams {
  Bucket: string;
  Key: string;
  Body: Buffer;
}

const s3Config = {
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.ACCESS_SECRET,
  },
};

export const s3Client = new S3Client(s3Config as any);

export const putObject = (uploadParams: UploadParams, fileName: string) => {
  const bucketParams = {
    ...uploadParams,
    Key: fileName,
  };
  
  return new PutObjectCommand(bucketParams);
};
