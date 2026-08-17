import { createClerkClient } from "@clerk/nextjs/server";
import { prisma } from "../../../lib/prisma";
import SelectEstado from "./SelectEstado";
import styles from "./page.module.css";

export default async function AdminPedidosPage() {
  const pedidos = await prisma.pedido.findMany({
    include: { producto: true },
    orderBy: { creadoEn: "desc" },
  });

  const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
  const userIds = [...new Set(pedidos.map((p) => p.userId))];
  const usuarios = await Promise.all(userIds.map((id) => clerkClient.users.getUser(id)));
  const usuarioMap = new Map(usuarios.map((u) => [u.id, u]));

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
              const usuario = usuarioMap.get(pedido.userId);
              return (
                <tr key={pedido.id}>
                  <td>{pedido.id}</td>
                  <td>{usuario?.firstName ?? "—"}</td>
                  <td>{usuario?.lastName ?? "—"}</td>
                  <td className={styles.userId}>{pedido.userId}</td>
                  <td>{pedido.producto.emoji} {pedido.producto.nombre}</td>
                  <td>{pedido.cantidad}</td>
                  <td>
                    <SelectEstado id={pedido.id} estado={pedido.estado} />
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
