import styles from "./TarjetaProducto.module.css";
import { Producto } from "../types";

type Props = {
  producto: Producto;
};

export default function TarjetaProducto({ producto }: Props) {
  return (
    <div className={styles.tarjeta}>
      <div className={styles.emoji}>{producto.emoji}</div>
      <h2>{producto.nombre}</h2>
      <p>{producto.descripcion}</p>
      <span>${producto.precio.toLocaleString("es-AR")}</span>
    </div>
  );
}
