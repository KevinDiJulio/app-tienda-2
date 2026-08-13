import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";
import { config } from "dotenv";

config({ path: ".env.local" });

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const productos = [
  { nombre: "Remera básica", descripcion: "100% algodón, corte recto, varios colores", precio: 4500, emoji: "👕", stock: 20 },
  { nombre: "Jeans slim fit", descripcion: "Denim elastizado, corte moderno", precio: 12900, emoji: "👖", stock: 15 },
  { nombre: "Buzo con capucha", descripcion: "Frisa interior, bolsillo canguro", precio: 9800, emoji: "🧥", stock: 10 },
  { nombre: "Zapatillas urbanas", descripcion: "Suela de goma, capellada de cuero sintético", precio: 22500, emoji: "👟", stock: 8 },
  { nombre: "Campera de abrigo", descripcion: "Relleno sintético, resistente al viento", precio: 31000, emoji: "🧤", stock: 5 },
  { nombre: "Vestido floral", descripcion: "Tela liviana, ideal para primavera", precio: 8700, emoji: "👗", stock: 12 },
  { nombre: "Gorra snapback", descripcion: "Ajuste trasero, bordado frontal", precio: 3200, emoji: "🧢", stock: 25 },
  { nombre: "Medias deportivas", descripcion: "Pack x3, algodón con lycra", precio: 1800, emoji: "🧦", stock: 40 },
];

async function main() {
  console.log("Eliminando datos existentes...");
  await prisma.producto.deleteMany();

  console.log("Insertando productos...");
  for (const p of productos) {
    await prisma.producto.create({ data: p });
  }

  console.log(`✓ ${productos.length} productos insertados`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
