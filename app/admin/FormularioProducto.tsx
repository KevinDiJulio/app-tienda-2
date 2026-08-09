"use client";

import { useRef } from "react";
import { crearProducto } from "./actions";
import styles from "./FormularioProducto.module.css";

export default function FormularioProducto() {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    await crearProducto(formData);
    formRef.current?.reset();
  }

  return (
    <form ref={formRef} action={handleSubmit} className={styles.form}>
      <input name="emoji" placeholder="Emoji" required className={styles.input} />
      <input name="nombre" placeholder="Nombre" required className={styles.input} />
      <input name="descripcion" placeholder="Descripción" required className={styles.input} />
      <input name="precio" type="number" placeholder="Precio" required className={styles.input} />
      <input name="stock" type="number" placeholder="Stock" required className={styles.input} />
      <button type="submit" className={styles.boton}>Agregar</button>
    </form>
  );
}
