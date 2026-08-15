"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";

export async function crearProducto(formData: FormData) {
  await prisma.producto.create({
    data: {
      nombre: formData.get("nombre") as string,
      descripcion: formData.get("descripcion") as string,
      precio: parseFloat(formData.get("precio") as string),
      emoji: formData.get("emoji") as string,
      stock: parseInt(formData.get("stock") as string),
    },
  });
  revalidatePath("/admin");
}

export async function borrarProducto(id: number) {
  const pedidosRes = await fetch(
    `${process.env.PEDIDOS_API_URL}/api/pedidos`,
    { headers: { "x-api-key": process.env.PEDIDOS_API_KEY! } }
  );

  if (!pedidosRes.ok) {
    throw new Error("No se pudo verificar el estado de los pedidos. Intente nuevamente.");
  }

  const pedidos: { productoId: number; estado: string }[] = await pedidosRes.json();
  const activos = pedidos.filter((p) => p.productoId === id && p.estado !== "cancelado");

  if (activos.length > 0) {
    throw new Error(
      `No se puede borrar: hay ${activos.length} pedido${activos.length > 1 ? "s" : ""} activo${activos.length > 1 ? "s" : ""} para este producto.`
    );
  }

  await prisma.producto.delete({ where: { id } });
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function editarProducto(id: number, formData: FormData) {
  await prisma.producto.update({
    where: { id },
    data: {
      nombre: formData.get("nombre") as string,
      descripcion: formData.get("descripcion") as string,
      precio: parseFloat(formData.get("precio") as string),
      emoji: formData.get("emoji") as string,
      stock: parseInt(formData.get("stock") as string),
    },
  });
  revalidatePath("/admin");
  revalidatePath("/");
}
