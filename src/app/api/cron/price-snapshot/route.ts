import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAllProjects } from "@/lib/data";

/**
 * Vercel Cron job: fetches token prices from CoinGecko and writes
 * PriceSnapshot rows. Scheduled via vercel.json crons config.
 *
 * Requires: CRON_SECRET (to authenticate the request) and COINGECKO_API_KEY.
 */
export async function GET(req: NextRequest) {
  // Authenticate cron request
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!prisma) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 },
    );
  }

  const projects = await getAllProjects();
  const tokensToFetch = projects
    .filter((p) => p.token)
    .map((p) => ({ slug: p.slug, token: p.token! }));

  // Build CoinGecko ID mapping (simplified; in production, maintain a mapping table)
  const cgIds: Record<string, string> = {
    GEOD: "geodnet",
    WXM: "weatherxm",
    ATH: "aethir",
    ANYONE: "anyone-protocol",
    HNT: "helium",
    RNDR: "render-token",
    IO: "io-net",
    FIL: "filecoin",
    NOS: "nosana",
    GRASS: "grass",
    MLMA: "malama-labs",
  };

  let written = 0;

  try {
    const apiKey = process.env.COINGECKO_API_KEY;
    const ids = tokensToFetch
      .map((t) => cgIds[t.token])
      .filter(Boolean)
      .join(",");

    if (ids && apiKey) {
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;
      const res = await fetch(url, {
        headers: { "x-cg-demo-api-key": apiKey },
        signal: AbortSignal.timeout(10000),
      });

      if (res.ok) {
        const data = (await res.json()) as Record<
          string,
          { usd?: number }
        >;

        for (const t of tokensToFetch) {
          const cgId = cgIds[t.token];
          if (!cgId || !data[cgId]?.usd) continue;

          const project = projects.find((p) => p.slug === t.slug);
          if (!project) continue;

          await prisma.priceSnapshot.create({
            data: {
              projectId: project.slug, // Will need actual DB id in production
              tokenUsd: data[cgId].usd,
              source: "coingecko",
            },
          });
          written++;
        }
      }
    }
  } catch (err) {
    console.error("[price-snapshot] Fetch error:", err);
  }

  return NextResponse.json({
    ok: true,
    snapshots: written,
    timestamp: new Date().toISOString(),
  });
}
