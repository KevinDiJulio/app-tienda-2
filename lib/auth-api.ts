import { NextRequest, NextResponse } from "next/server";

export function verificarApiKey(req: NextRequest): boolean {
  return req.headers.get("x-api-key") === process.env.API_KEY;
}

export function noAutorizado() {
  return NextResponse.json({ error: "No autorizado" }, { status: 401 });
}
