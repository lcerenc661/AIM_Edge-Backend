import bcryptjs from "bcryptjs";

interface SeedProduct {
  id: string;
  name: string;
  value: number;
}

interface SeedUser {
  name: string;
  contactPoint: string;
  phone: string;
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
      id: "234",
      name: "iPhone 5S",
      value: 400,
    },
    {
      id: "344",
      name: "iPhone 6",
      value: 450,
    },
    {
      id: "68",
      name: "iPhone 6+",
      value: 250,
    },
    {
      id: "64",
      name: "iPhone 7",
      value: 150,
    },
    {
      id: "45",
      name: "iPhone 7 Plus",
      value: 350,
    },
    {
      id: "567",
      name: "iPhone XR",
      value: 400,
    },
    {
      id: "231",
      name: "iPhone X+",
      value: 300,
    },
    {
      id: "345",
      name: "iPhone 11",
      value: 550,
    },
    {
      id: "768",
      name: "iPhone SE",
      value: 200,
    },
    {
      id: "789",
      name: "iPhone 12",
      value: 250,
    },
    {
      id: "876",
      name: "iPhone 13",
      value: 550,
    },
    {
      id: "98786",
      name: "iPhone 13 mini",
      value: 600,
    },
    {
      id: "67",
      name: "AirPods 2 Gen",
      value: 400,
    },
    {
      id: "123",
      name: "Apple Watch 7",
      value: 450,
    },
    {
      id: "76687",
      name: "iPad Pro",
      value: 250,
    },
    {
      id: "56767",
      name: "Air Tag",
      value: 200,
    },
    {
      id: "6786",
      name: "Air Pods Max",
      value: 550,
    },
    {
      id: "5675",
      name: "AirPods Pro",
      value: 400,
    },
    {
      id: "56567",
      name: "AirPods 3 Gen",
      value: 450,
    },
    {
      id: "94949",
      name: "iPad Air",
      value: 150,
    },
    {
      id: "94842",
      name: "iPad Mini",
      value: 200,
    },
  ],
  users: [
    {
      name: "Admin",
      contactPoint: "Admin",
      phone: "756454249",
      email: "admin@google.com",
      password: bcryptjs.hashSync("123456", 10),
      role: "admin",
    },
    {
      name: "Lifelinea LLC",
      contactPoint: "Ari Barkan",
      phone: "758305749",
      email: "ari@lifelinea.com",
      password: bcryptjs.hashSync("Lifelinea75Ari", 10),
      role: "client",
    },
    {
      name: "Focus Forward LLC",
      contactPoint: "Dave Pataki",
      phone: "666769940",
      email: "dave@focusforwrad.com",
      password: bcryptjs.hashSync("Focus66Dave", 10),
      role: "client",
    },
    {
      name: "Flow INC",
      contactPoint: "Chadwick Smith",
      phone: "235035368",
      email: "chad@flow.com",
      password: bcryptjs.hashSync("Flow23Chad", 10),
      role: "client",
    },
    {
      name: "Marbi Inc",
      contactPoint: "Kurt Silvers",
      phone: "495338595",
      email: "kurt@marbi.com",
      password: bcryptjs.hashSync("Marbi49Kurt", 10),
      role: "client",
    },
    {
      name: "Ex-IT Technologies",
      contactPoint: "NA",
      phone: "3005849394",
      email: "info@exittech.com",
      password: bcryptjs.hashSync("Ex-IT30NA", 10),
      role: "client",
    },
    {
      name: "Agent Shield LLC",
      contactPoint: "Lu Doan",
      phone: "234567689",
      email: "lu@agentshield.com",
      password: bcryptjs.hashSync("Agent12Lu", 10),
      role: "client",
    },
    {
      name: "Evergreen Inc",
      contactPoint: "Tony Pizzi",
      phone: "12005053",
      email: "tony@evergreen.com",
      password: bcryptjs.hashSync("Evergreen23Tony", 10),
      role: "client",
    },
    {
      name: "FBL",
      contactPoint: "Erick Boughman",
      phone: "234234234",
      email: "erick@fbl.com",
      password: bcryptjs.hashSync("FBL23Erick", 10),
      role: "client",
    },
    {
      name: "Virtues Matters",
      contactPoint: "Dave Feldman",
      phone: "234234234",
      email: "dave@virtues.com",
      password: bcryptjs.hashSync("Virtues23Dave", 10),
      role: "client",
    },
  ],
};
