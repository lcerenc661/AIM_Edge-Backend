import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import dotenv from 'dotenv';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();

interface UploadParams {
  Bucket: string;
  Key: string;
  Body: Buffer;
}

interface GetParams {
  Bucket: string;
  Key: string;
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

export const getObject = (getParams: GetParams) => {
  const command = new GetObjectCommand(getParams);
  const url = getSignedUrl(s3Client, command, { expiresIn: 3600*12 });
  return url;
};
