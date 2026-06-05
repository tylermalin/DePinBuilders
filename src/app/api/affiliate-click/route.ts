import { NextRequest, NextResponse } from "next/server";

/**
 * Server-side affiliate click tracking.
 * Receives project slug via query param, logs to console (and DB in production).
 * Uses sendBeacon from the client, so this handles POST.
 */
export async function POST(req: NextRequest) {
  const project = req.nextUrl.searchParams.get("project");
  if (project) {
    // In production: write to a clicks table or analytics pipeline
    console.log(`[affiliate-click] project=${project} at=${new Date().toISOString()}`);
  }
  return new NextResponse(null, { status: 204 });
}

// Also handle GET for beacon fallback
export async function GET(req: NextRequest) {
  return POST(req);
}
