import jwt from "jsonwebtoken";
import { envs } from "./envs";

const JWT_SEED = envs.JWT_SEED;
const JWT_SEED_REFRESH = envs.JWT_SEED_REFRESH;

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

  validateRefreshToken: <T>(token: string): Promise<T | null> => {
    return new Promise((resolve: any) => {
      jwt.verify(token, JWT_SEED_REFRESH, (err, decoded) => {
        if (err) {
          return resolve(null);
        }
        resolve(decoded as T);
      });
    });
  },

  generateRefreshToken: async (payload: any, duration: string = "7d") => {
    return new Promise((resolve: any) => {
      jwt.sign(
        payload,
        JWT_SEED_REFRESH,
        { expiresIn: duration },
        (err, token) => {
          if (err) return resolve(null);
          return resolve(token);
        }
      );
    });
  },
};
