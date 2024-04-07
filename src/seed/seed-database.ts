import prisma from "../lib/prisma";
import { initialData } from "./seed";

async function main() {
  await prisma.invoiceProduct.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();

  // create Users
  await prisma.user.createMany({
    data: initialData.users,
  });

  await prisma.product.createMany({
    data: initialData.products,
  });

  console.log("Seed successfully executed!");
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
