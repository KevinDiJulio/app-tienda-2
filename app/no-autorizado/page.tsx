import { SignOutButton } from "@clerk/nextjs";

export default function NoAutorizadoPage() {
  return (
    <main style={{ padding: "60px 40px", textAlign: "center" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "12px" }}>
        Acceso restringido
      </h1>
      <p style={{ color: "#6b7280", marginBottom: "24px" }}>
        Tu cuenta no tiene permisos para acceder a esta aplicación.
      </p>
      <SignOutButton>
        <button style={{ padding: "8px 20px", background: "#111", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          Cerrar sesión
        </button>
      </SignOutButton>
    </main>
  );
}
