import { PrismaClient, Tier } from "@prisma/client";
import type { Prisma } from "@prisma/client";
import { projects } from "../src/data/projects.seed";

const db = new PrismaClient();

async function main() {
  console.log(`Seeding ${projects.length} projects...`);

  for (const p of projects) {
    const data = {
      name: p.name,
      token: p.token,
      category: p.category,
      tier: p.tier as Tier,
      chain: p.chain,
      hardwareCostUsd: p.hardwareCostUsd,
      yieldLowUsd: p.yieldLowUsd,
      yieldHighUsd: p.yieldHighUsd,
      breakEvenMonths: p.breakEvenMonths,
      frictionLevel: p.frictionLevel,
      verified: p.verified,
      builderScore: p.builderScore,
      change30d: p.change30d,
      powerWatts: p.powerWatts,
      affiliateCode: p.affiliateCode,
      affiliateDiscount: p.affiliateDiscount,
      conflictDisclosure: p.conflictDisclosure,
      blurb: p.blurb,
      regionDensity:
        p.regionDensity as unknown as Prisma.InputJsonValue,
    };

    await db.project.upsert({
      where: { slug: p.slug },
      update: data,
      create: { slug: p.slug, ...data },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
