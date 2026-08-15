"use server";

import { revalidatePath } from "next/cache";

export async function actualizarEstado(id: number, estado: string) {
  const res = await fetch(`${process.env.PEDIDOS_API_URL}/api/pedidos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.PEDIDOS_API_KEY!,
    },
    body: JSON.stringify({ estado }),
  });

  if (!res.ok) throw new Error("Error al actualizar estado");
  revalidatePath("/admin/pedidos");
}
