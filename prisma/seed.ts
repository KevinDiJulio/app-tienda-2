import { config } from "dotenv";
config({ path: ".env.local" });

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.producto.createMany({
    data: [
      { nombre: "Remera", descripcion: "Remera de algodón 100%", precio: 5000, emoji: "👕" },
      { nombre: "Pantalón", descripcion: "Jean de tiro alto", precio: 8500, emoji: "👖" },
      { nombre: "Zapatillas", descripcion: "Zapatillas urbanas", precio: 15000, emoji: "👟" },
      { nombre: "Campera", descripcion: "Campera impermeable", precio: 12000, emoji: "🧥" },
    ],
  });
  console.log("Productos cargados correctamente.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
