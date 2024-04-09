import { User } from "@prisma/client";
import { prisma } from "../../data/mysql_";

import { CustomError } from "../../domain";
import { InvoiceService } from "./invoices.service";

export class UserService {
  constructor() {}

  //Private Methods
  private getClientSeniority(user: User) {
    const { createdAt } = user;
    const actualDate = new Date();
    const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;

    let timeDifference =
      (actualDate.getTime() - createdAt.getTime()) / millisecondsInYear;
    return timeDifference.toFixed(0);
  }
  //Public Methods

  public async getUserList() {
    let users;
    try {
      users = await prisma.user.findMany({
        where: { role: "client" },
      });
    } catch (error) {
      throw CustomError.internalServer(
        "Something went wrong, please try again"
      );
    }

    const usersArray = users!.map((user) => {
      const clientSeniority = this.getClientSeniority(user);
      const { password, contactPoint, createdAt, phone, email, role, ...resUser } = user;
      return { ...resUser, clientSeniority };
    });

    return { usersArray };
  }
}
