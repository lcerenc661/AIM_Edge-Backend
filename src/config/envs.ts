import "dotenv/config";
import { get } from "env-var";

export const envs = {
  JWT_SEED: get("JWT_SEED").required().asString(),
  MYSQL_URL: get("MYSQL_URL").required().asString(),
};

