import { auth } from "@clerk/nextjs/server";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import styles from "./Header.module.css";

export default async function Header() {
  const { sessionClaims } = await auth();
  const isAdmin = (sessionClaims?.metadata as { role?: string })?.role === "admin";

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.marca}>Tienda</Link>
      <nav className={styles.nav}>
        {isAdmin && (
          <Link href="/admin" className={styles.linkAdmin}>Administración</Link>
        )}
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
