import jwt from "jsonwebtoken";
import { envs } from "./envs";

const JWT_SEED = envs.JWT_SEED;

export const jwtAdapter = {
  generateToken: async (payload: any, duration: string = "2h") => {
    return new Promise((resolve: any) => {
      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null);

        return resolve(token);
      });
    });
  },

  validateToken: <T>(token: string): Promise<T | null> => {
    return new Promise((resolve: any) => {
      jwt.verify(token, JWT_SEED, (err, decoded) => {
        if (err) {
          return resolve(null);
        }
        resolve(decoded as T);
      });
    });
  },
};
