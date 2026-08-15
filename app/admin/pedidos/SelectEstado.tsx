"use client";

import { useTransition } from "react";
import { actualizarEstado } from "./actions";
import styles from "./page.module.css";

const ESTADOS = ["pendiente", "confirmado", "enviado", "cancelado"];

export default function SelectEstado({ id, estado }: { id: number; estado: string }) {
  const [pending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const nuevoEstado = e.target.value;
    startTransition(() => actualizarEstado(id, nuevoEstado));
  }

  return (
    <select
      defaultValue={estado}
      onChange={handleChange}
      disabled={pending}
      className={styles.selectEstado}
    >
      {ESTADOS.map((e) => (
        <option key={e} value={e}>{e}</option>
      ))}
    </select>
  );
}
