import { prisma } from "../../lib/prisma";
import FormularioProducto from "./FormularioProducto";
import FilaProducto from "./FilaProducto";

export default async function AdminPage() {
  const productos = await prisma.producto.findMany();

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Administración de productos</h1>

      <section className="mb-10">
        <h2 className="text-base font-semibold mb-4 text-gray-500">Agregar producto</h2>
        <FormularioProducto />
      </section>

      <section className="mb-10">
        <h2 className="text-base font-semibold mb-4 text-gray-500">Productos ({productos.length})</h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {["Emoji", "Nombre", "Descripción", "Precio", "Stock", "Acciones"].map((col) => (
                <th key={col} className="text-left px-3.5 py-2.5 border-b border-gray-200 font-semibold text-gray-700 bg-gray-50">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <FilaProducto key={producto.id} producto={producto} />
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
