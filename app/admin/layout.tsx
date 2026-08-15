import Link from "next/link";
import styles from "./layout.module.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className={styles.subnav}>
        <Link href="/admin" className={styles.link}>Productos</Link>
        <Link href="/admin/pedidos" className={styles.link}>Pedidos</Link>
      </nav>
      {children}
    </>
  );
}
