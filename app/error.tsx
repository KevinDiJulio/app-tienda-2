"use client";

import { useEffect } from "react";
import styles from "./error.module.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.container}>
      <p className={styles.code}>500</p>
      <h1 className={styles.title}>Algo salió mal</h1>
      <p className={styles.message}>
        Ocurrió un error inesperado. Podés intentar de nuevo o volver al panel.
      </p>
      <div className={styles.actions}>
        <button onClick={reset} className={styles.btnPrimary}>
          Intentar de nuevo
        </button>
        <a href="/admin" className={styles.btnSecondary}>
          Volver al panel
        </a>
      </div>
    </div>
  );
}
