import { NextResponse, type NextRequest } from "next/server";

export default async function proxy(req: NextRequest) {
  // Only activate Clerk middleware when keys are configured
  if (
    process.env.CLERK_SECRET_KEY &&
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  ) {
    const { clerkMiddleware, createRouteMatcher } = await import(
      "@clerk/nextjs/server"
    );
    const isProtected = createRouteMatcher(["/profile(.*)"]);
    const handler = clerkMiddleware(async (auth, request) => {
      if (isProtected(request)) {
        await auth.protect();
      }
    });
    return handler(req, {} as never);
  }

  // No Clerk: protect /profile with a redirect
  if (req.nextUrl.pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
