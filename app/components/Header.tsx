import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.marca}>Tienda</Link>
      <nav className={styles.nav}>
        <Link href="/admin" className={styles.linkAdmin}>Administración</Link>
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className={styles.botonLogin}>Iniciar sesión</button>
          </SignInButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </nav>
    </header>
  );
}
