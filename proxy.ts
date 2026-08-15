import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isApiRoute = createRouteMatcher(["/api/(.*)"]);
const isPublicRoute = createRouteMatcher(["/no-autorizado"]);

export default clerkMiddleware(async (auth, req) => {
  if (isApiRoute(req)) return;
  if (isPublicRoute(req)) return;

  const { userId, sessionClaims } = await auth();

  if (!userId) {
    return (await auth()).redirectToSignIn();
  }

  const isAdmin = (sessionClaims?.metadata as { role?: string })?.role === "admin";
  if (!isAdmin) {
    return NextResponse.redirect(new URL("/no-autorizado", req.url));
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
