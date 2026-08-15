import { createClerkClient } from "@clerk/nextjs/server";
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

  const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

  const userIds = [...new Set(pedidos.map((p) => p.userId))];
  const usuarios = await Promise.all(userIds.map((id) => clerkClient.users.getUser(id)));
  const usuarioMap = new Map(usuarios.map((u) => [u.id, u]));

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
              <th>Nombre</th>
              <th>Apellido</th>
              <th>ID usuario</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Estado</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => {
              const producto = productoMap.get(pedido.productoId);
              const usuario = usuarioMap.get(pedido.userId);
              return (
                <tr key={pedido.id}>
                  <td>{pedido.id}</td>
                  <td>{usuario?.firstName ?? "—"}</td>
                  <td>{usuario?.lastName ?? "—"}</td>
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
