import "dotenv/config";
import { get } from "env-var";

export const envs = {
  JWT_SEED: get("JWT_SEED").required().asString(),
  JWT_SEED_REFRESH: get("JWT_SEED_REFRESH").required().asString(),
  MYSQL_URL: get("PRODUCTION_MYSQL_URL").required().asString(),
  AWS_ACCESS_KEY:get("AWS_ACCESS_KEY").required().asString(),
  AWS_ACCESS_SECRET:get("AWS_ACCESS_SECRET").required().asString(),
  AWS_S3_BUCKET_NAME:get("AWS_S3_BUCKET_NAME").required().asString(),
};

