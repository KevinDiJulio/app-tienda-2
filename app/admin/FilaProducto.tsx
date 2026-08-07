"use client";

import { useState } from "react";
import { borrarProducto, editarProducto } from "./actions";
import { Producto } from "../types";
import styles from "./FilaProducto.module.css";

type Props = { producto: Producto };

export default function FilaProducto({ producto }: Props) {
  const [editando, setEditando] = useState(false);

  async function handleEditar(formData: FormData) {
    await editarProducto(producto.id, formData);
    setEditando(false);
  }

  if (editando) {
    return (
      <tr>
        <td colSpan={5}>
          <form action={handleEditar} className={styles.formEditar}>
            <input name="emoji" defaultValue={producto.emoji} className={styles.input} />
            <input name="nombre" defaultValue={producto.nombre} className={styles.input} />
            <input name="descripcion" defaultValue={producto.descripcion} className={styles.input} />
            <input name="precio" type="number" defaultValue={producto.precio} className={styles.input} />
            <button type="submit" className={styles.botonGuardar}>Guardar</button>
            <button type="button" onClick={() => setEditando(false)} className={styles.botonCancelar}>Cancelar</button>
          </form>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td>{producto.emoji}</td>
      <td>{producto.nombre}</td>
      <td>{producto.descripcion}</td>
      <td>${producto.precio.toLocaleString("es-AR")}</td>
      <td className={styles.acciones}>
        <button onClick={() => setEditando(true)} className={styles.botonEditar}>Editar</button>
        <button onClick={() => borrarProducto(producto.id)} className={styles.botonBorrar}>Borrar</button>
      </td>
    </tr>
  );
}
