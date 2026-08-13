import TarjetaProducto from "./components/TarjetaProducto";
import { prisma } from "../lib/prisma";

export default async function Home() {
  const productos = await prisma.producto.findMany();

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <div className="grid grid-cols-2 gap-6">
        {productos.map((producto) => (
          <TarjetaProducto key={producto.id} producto={producto} />
        ))}
      </div>
    </main>
  );
}
