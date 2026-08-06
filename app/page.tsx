import styles from "./page.module.css";
import TarjetaProducto from "./components/TarjetaProducto";
import { prisma } from "../lib/prisma";

export default async function Home() {
  const productos = await prisma.producto.findMany();

  return (
    <main className={styles.main}>
      <div className={styles.grilla}>
        {productos.map((producto) => (
          <TarjetaProducto key={producto.id} producto={producto} />
        ))}
      </div>
    </main>
  );
}
