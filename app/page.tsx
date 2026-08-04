import styles from "./page.module.css";
import TarjetaProducto from "./components/TarjetaProducto";
import { Producto } from "./types";

const productos: Producto[] = [
  { id: 1, nombre: "Remera", descripcion: "Remera de algodón 100%", precio: 5000, emoji: "👕" },
  { id: 2, nombre: "Pantalón", descripcion: "Jean de tiro alto", precio: 8500, emoji: "👖" },
  { id: 3, nombre: "Zapatillas", descripcion: "Zapatillas urbanas", precio: 15000, emoji: "👟" },
  { id: 4, nombre: "Campera", descripcion: "Campera impermeable", precio: 12000, emoji: "🧥" },
];

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Tienda</h1>
      <div className={styles.grilla}>
        {productos.map((producto) => (
          <TarjetaProducto key={producto.id} producto={producto} />
        ))}
      </div>
    </main>
  );
}
