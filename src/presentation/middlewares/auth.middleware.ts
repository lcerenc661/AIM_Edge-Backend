import { NextFunction, Request, Response } from "express";
import { jwtAdapter } from "../../config";
import { prisma } from "../../data/mysql_";

export class AuthMiddleware {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header("Authorization");
    if (!authorization)
      return res
        .status(401)
        .json({ error: "Please provide Authorization Token" });

    if (!authorization.startsWith("Bearer "))
      return res.status(401).json({ error: "Invalid Bearer Token" });

    const token = authorization.split(" ").at(-1) || "";

    try {
      const payload = await jwtAdapter.validateToken<{ id: string }>(token);
      if (!payload) {
        return res.status(401).json({ error: "Invalid Token" });
      }

      const user = await prisma.user.findUnique({
        where: { id: payload.id },
      });
      if (!user) {
        return res.status(401).json({ error: "Invalid token, user not found" });
      }

      const { password, createdAt, ...restUser } = user;

      req.body.user = restUser;

      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server error" });
    }
  }
}
