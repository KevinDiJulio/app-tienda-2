import { prisma } from "../../../lib/prisma";
import styles from "./page.module.css";

type Pedido = {
  id: number;
  userId: string;
  productoId: number;
  cantidad: number;
  estado: string;
  creadoEn: string;
};

async function getPedidos(): Promise<Pedido[]> {
  const res = await fetch(`${process.env.PEDIDOS_API_URL}/api/pedidos`, {
    headers: { "x-api-key": process.env.PEDIDOS_API_KEY! },
    cache: "no-store",
  });

  if (!res.ok) return [];
  return res.json();
}

export default async function AdminPedidosPage() {
  const [pedidos, productos] = await Promise.all([
    getPedidos(),
    prisma.producto.findMany({ select: { id: true, nombre: true, emoji: true } }),
  ]);

  const productoMap = new Map(productos.map((p) => [p.id, p]));

  return (
    <main className={styles.main}>
      <h1 className={styles.titulo}>Pedidos</h1>

      {pedidos.length === 0 ? (
        <p className={styles.vacio}>No hay pedidos aún.</p>
      ) : (
        <table className={styles.tabla}>
          <thead>
            <tr>
              <th>#</th>
              <th>Usuario</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Estado</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => {
              const producto = productoMap.get(pedido.productoId);
              return (
                <tr key={pedido.id}>
                  <td>{pedido.id}</td>
                  <td className={styles.userId}>{pedido.userId}</td>
                  <td>
                    {producto
                      ? `${producto.emoji} ${producto.nombre}`
                      : `Producto #${pedido.productoId}`}
                  </td>
                  <td>{pedido.cantidad}</td>
                  <td>
                    <span className={`${styles.estado} ${styles[pedido.estado]}`}>
                      {pedido.estado}
                    </span>
                  </td>
                  <td>{new Date(pedido.creadoEn).toLocaleDateString("es-AR")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </main>
  );
}
