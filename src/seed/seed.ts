import bcryptjs from "bcryptjs";

interface SeedProduct {
  name: string;
  description?: string;
  value: number;
}

interface SeedUser {
  email: string;
  password: string;
  role: "admin" | "client";
}

interface SeedData {
  products: SeedProduct[];
  users: SeedUser[];
}

export const initialData: SeedData = {
  products: [
    {
      name: "PC Gamer",
      description: "This is a PC gamer",
      value: 500,
    },
    {
      name: "Guitar",
      description: "This is a PC gamer",
      value: 800,
    },
    {
      name: "Bass",
      description: "This is a PC gamer",
      value: 1000,
    },
  ],
  users: [
    {
      email: "jose@google.com",
      password: bcryptjs.hashSync("123456", 10),
      role: "client",
    },
    {
      email: "admin@google.com",
      password: bcryptjs.hashSync("123456", 10),
      role: "admin",
    },
    {
      email: "juan@google.com",
      password: bcryptjs.hashSync("123456", 10),
      role: "client",
    },
  ],
};
