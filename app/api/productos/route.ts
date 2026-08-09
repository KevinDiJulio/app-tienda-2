import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { verificarApiKey, noAutorizado } from "../../../lib/auth-api";

export async function GET(req: NextRequest) {
  if (!verificarApiKey(req)) {
    return noAutorizado();
  }

  const productos = await prisma.producto.findMany();
  return NextResponse.json(productos);
}

export async function POST(req: NextRequest) {
  if (!verificarApiKey(req)) {
    return noAutorizado();
  }

  const body = await req.json();
  const producto = await prisma.producto.create({ data: body });
  return NextResponse.json(producto, { status: 201 });
}
