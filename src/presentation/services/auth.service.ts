import { bcryptAdapter } from "../../config";
import { prisma } from "../../data/mysql_";
import { CustomError } from "../../domain";
import { Login, Register } from "../../interfaces/invoice.interface";
import bcryptjs from "bcryptjs";

export class AuthService {
  constructor() {}

  // Private

  // Public

  public async registerUser(registerData: Register) {
    const existUser = await prisma.user.findFirst({
      where: { email: registerData.email },
    });
    if (existUser) {
      throw CustomError.badRequest("Email already registered");
    }
    let newUser;
    try {
      newUser = await prisma.user.create({
        data: {
          email: registerData.email,
          password: bcryptAdapter.hash(registerData.password),
        },
      });
    } catch (error) {
      throw CustomError.internalServer("Bad request");
    }
    const { password, ...restUser } = newUser;

    return { restUser, token: "token" };
  }

  public async loginUser(loginData: Login) {
    const user = await prisma.user.findFirst({
      where: { email: loginData.email },
    });
    if (!user) {
      throw CustomError.badRequest("Email not found");
    }

    const isMatch = bcryptAdapter.compare(loginData.password, user.password);
    if (!isMatch) {
      throw CustomError.badRequest("Wrong Password");
    }

    const { password, ...restUser } = user;

    return {
      user: { ...restUser },
      toke: "token",
    };
  }
}
