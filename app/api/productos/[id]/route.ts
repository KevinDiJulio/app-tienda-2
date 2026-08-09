import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { verificarApiKey, noAutorizado } from "../../../../lib/auth-api";

type Params = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, { params }: Params) {
  if (!verificarApiKey(req)) {
    return noAutorizado();
  }

  const { id } = await params;
  const producto = await prisma.producto.findUnique({ where: { id: Number(id) } });

  if (!producto) {
    return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
  }

  return NextResponse.json(producto);
}

export async function PUT(req: NextRequest, { params }: Params) {
  if (!verificarApiKey(req)) {
    return noAutorizado();
  }

  const { id } = await params;
  const body = await req.json();
  const producto = await prisma.producto.update({ where: { id: Number(id) }, data: body });
  return NextResponse.json(producto);
}

export async function PATCH(req: NextRequest, { params }: Params) {
  if (!verificarApiKey(req)) {
    return noAutorizado();
  }

  const { id } = await params;
  const body = await req.json();
  const producto = await prisma.producto.update({ where: { id: Number(id) }, data: body });
  return NextResponse.json(producto);
}

export async function DELETE(req: NextRequest, { params }: Params) {
  if (!verificarApiKey(req)) {
    return noAutorizado();
  }

  const { id } = await params;
  await prisma.producto.delete({ where: { id: Number(id) } });
  return new NextResponse(null, { status: 204 });
}
