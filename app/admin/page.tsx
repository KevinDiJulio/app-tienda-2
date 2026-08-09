import { prisma } from "../../lib/prisma";
import FormularioProducto from "./FormularioProducto";
import FilaProducto from "./FilaProducto";
import styles from "./page.module.css";

export default async function AdminPage() {
  const productos = await prisma.producto.findMany();

  return (
    <main className={styles.main}>
      <h1 className={styles.titulo}>Administración de productos</h1>

      <section className={styles.seccion}>
        <h2 className={styles.subtitulo}>Agregar producto</h2>
        <FormularioProducto />
      </section>

      <section className={styles.seccion}>
        <h2 className={styles.subtitulo}>Productos ({productos.length})</h2>
        <table className={styles.tabla}>
          <thead>
            <tr>
              <th>Emoji</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
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
