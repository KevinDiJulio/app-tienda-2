import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <span className={styles.marca}>Tienda</span>
      <nav className={styles.nav}>
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
