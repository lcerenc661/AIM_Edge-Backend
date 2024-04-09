import { PutObjectCommand, S3Client  } from "@aws-sdk/client-s3";


interface BucketParams{
  Bucket: string,
  Key: string,
  Body: Buffer,
}

const s3Config = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_ACCESS_SECRET,
  region: "us-east-1",
};

export const s3Client = new S3Client(s3Config);

export const putObject = (bucketParams:BucketParams) =>{
  return new PutObjectCommand(bucketParams)
} 