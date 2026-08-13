import { Show, SignInButton, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-10 h-16 border-b border-gray-200 bg-white sticky top-0 z-10">
      <span className="text-xl font-bold tracking-tight text-gray-900">Tienda</span>
      <nav className="flex items-center">
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className="bg-gray-900 text-white px-5 py-2 text-sm font-medium rounded cursor-pointer hover:bg-gray-700 transition-colors">
              Iniciar sesión
            </button>
          </SignInButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </nav>
    </header>
  );
}
