"use client";

import { useRef } from "react";
import { crearProducto } from "./actions";

export default function FormularioProducto() {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    await crearProducto(formData);
    formRef.current?.reset();
  }

  const inputClass = "px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-600";

  return (
    <form ref={formRef} action={handleSubmit} className="flex gap-2.5 flex-wrap items-center">
      <input name="emoji" placeholder="Emoji" required className={inputClass} />
      <input name="nombre" placeholder="Nombre" required className={inputClass} />
      <input name="descripcion" placeholder="Descripción" required className={inputClass} />
      <input name="precio" type="number" placeholder="Precio" required className={inputClass} />
      <input name="stock" type="number" placeholder="Stock" required className={inputClass} />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold cursor-pointer hover:bg-blue-700">
        Agregar
      </button>
    </form>
  );
}
