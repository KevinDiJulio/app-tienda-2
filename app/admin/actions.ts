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
    },
  });
  revalidatePath("/admin");
}

export async function borrarProducto(id: number) {
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
    },
  });
  revalidatePath("/admin");
  revalidatePath("/");
}
