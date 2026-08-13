"use client";

import { useState } from "react";
import { borrarProducto, editarProducto } from "./actions";
import { Producto } from "../types";

type Props = { producto: Producto };

const inputClass = "px-2.5 py-1.5 border border-gray-300 rounded text-sm w-28";
const btnBase = "px-3 py-1 rounded text-xs font-semibold cursor-pointer";

export default function FilaProducto({ producto }: Props) {
  const [editando, setEditando] = useState(false);

  async function handleEditar(formData: FormData) {
    await editarProducto(producto.id, formData);
    setEditando(false);
  }

  if (editando) {
    return (
      <tr>
        <td colSpan={6} className="px-3.5 py-2 border-b border-gray-200">
          <form action={handleEditar} className="flex gap-2 flex-wrap items-center">
            <input name="emoji" defaultValue={producto.emoji} className={inputClass} />
            <input name="nombre" defaultValue={producto.nombre} className={inputClass} />
            <input name="descripcion" defaultValue={producto.descripcion} className={inputClass} />
            <input name="precio" type="number" defaultValue={producto.precio} className={inputClass} />
            <input name="stock" type="number" defaultValue={producto.stock} className={inputClass} />
            <button type="submit" className={`${btnBase} bg-blue-600 text-white hover:bg-blue-700`}>Guardar</button>
            <button type="button" onClick={() => setEditando(false)} className={`${btnBase} bg-gray-100 text-gray-700`}>Cancelar</button>
          </form>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td className="px-3.5 py-2.5 border-b border-gray-200">{producto.emoji}</td>
      <td className="px-3.5 py-2.5 border-b border-gray-200">{producto.nombre}</td>
      <td className="px-3.5 py-2.5 border-b border-gray-200">{producto.descripcion}</td>
      <td className="px-3.5 py-2.5 border-b border-gray-200">${producto.precio.toLocaleString("es-AR")}</td>
      <td className="px-3.5 py-2.5 border-b border-gray-200">{producto.stock}</td>
      <td className="px-3.5 py-2.5 border-b border-gray-200">
        <div className="flex gap-2">
          <button onClick={() => setEditando(true)} className={`${btnBase} bg-gray-100 text-gray-700 hover:bg-gray-200`}>Editar</button>
          <button onClick={() => borrarProducto(producto.id)} className={`${btnBase} bg-red-50 text-red-600 hover:bg-red-100`}>Borrar</button>
        </div>
      </td>
    </tr>
  );
}
