import { bcryptAdapter, jwtAdapter } from "../../config";
import { prisma } from "../../data/mysql_";
import { CustomError } from "../../domain";
import { Login, Register } from "../../interfaces/invoice.interface";
import { verify } from "crypto";

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
          name: registerData.name,
          contactPoint: registerData.contactPoint,
          phone: registerData.phone,
          email: registerData.email,
          password: bcryptAdapter.hash(registerData.password),
        },
      });
    } catch (error) {
      throw CustomError.internalServer("Bad request");
    }
    const { password, ...restUser } = newUser;
    const token = await jwtAdapter.generateToken({ id: newUser.id });
    console.log(token);
    if (!token) {
      throw CustomError.internalServer("Error creating JWT");
    }

    const refreshToken = await jwtAdapter.generateRefreshToken({
      id: newUser.id,
    });
    if (!refreshToken) {
      throw CustomError.internalServer("Error creating refresh token");
    }

    return { user: { ...restUser }, token: token, refreshToken: refreshToken };
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

    const token = await jwtAdapter.generateToken({ id: user.id });
    if (!token) {
      throw CustomError.internalServer("Error creating JWT");
    }

    const refreshToken = await jwtAdapter.generateRefreshToken({ id: user.id });
    if (!refreshToken) {
      throw CustomError.internalServer("Error creating refresh token");
    }

    return {
      user: { ...restUser },
      token: token,
      refreshToken: refreshToken,
    };
  }

  public async refreshJWT(refreshToken: string) {
    try {
      const decodedToken = await jwtAdapter.validateRefreshToken<{ id: string }>(
        refreshToken
      );

      if (!decodedToken) {
        throw CustomError.unauthorized("Invalid refresh token");
      }
      const user = await prisma.user.findUnique({
        where: { id: decodedToken.id },
      });

      if (!user) {
        throw CustomError.unauthorized("User not found");
      }

      const accessToken = await jwtAdapter.generateToken({ id: user.id });
      if (!accessToken) {
        throw CustomError.internalServer("Error creating new access token");
      }

      return {
        token: accessToken,
        user: {
          id: user.id,
          email: user.email /* Add other user details here */,
        },
      };
    } catch (error) {
      // Handle any errors
      throw CustomError.internalServer("Error creating JWT");
    }
  }
}
