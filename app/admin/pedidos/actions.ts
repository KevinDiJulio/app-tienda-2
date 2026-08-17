"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../../lib/prisma";

export async function actualizarEstado(id: number, estado: string) {
  await prisma.pedido.update({ where: { id }, data: { estado } });
  revalidatePath("/admin/pedidos");
}
