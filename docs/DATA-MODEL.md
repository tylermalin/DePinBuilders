# Data Model

The source of truth for project data is `/data/projects.seed.ts`. Do not re-key it. Import it for the seed script and, until live data is wired, for static generation.

## Entities

- **Project.** The core entity. One row per DePIN network. Drives directory, project pages, map, calculator, comparisons.
- **Category, Chain, Tier.** Lookup dimensions. Can start as string enums on Project and graduate to tables when you add per-category editorial content.
- **Post.** Blog articles, typed (Review, Research, Guide, ProjectUpdate). Authorable in MDX or a CMS later.
- **Episode.** Podcast episodes.
- **Event.** Calendar events.
- **Course, Module, Lesson.** Academy content. Free or paid.
- **User.** From Clerk or Auth.js. Local profile row keyed by auth id.
- **Favorite.** User to Project.
- **Subscriber.** Newsletter email capture.
- **VerificationRequest.** Get Verified intake.
- **AdInquiry.** Advertise intake.
- **PriceSnapshot.** Periodic token price and node-count snapshots for live data (phase 8). Keeps project pages cacheable.

## Prisma schema (starting point)

```prisma
// prisma/schema.prisma
generator client { provider = "prisma-client-js" }
datasource db { provider = "postgresql"; url = env("DATABASE_URL") }

enum Tier { SET_AND_FORGET INFRASTRUCTURE FRICTIONLESS ENTERPRISE }
enum PostType { REVIEW RESEARCH GUIDE PROJECT_UPDATE }

model Project {
  id                 String   @id @default(cuid())
  slug               String   @unique
  name               String
  token              String?              // null when pre-token
  category           String
  tier               Tier
  chain              String
  hardwareCostUsd    Int                  // 0 means bring your own
  yieldLowUsd        Float                // 0 when pre-token
  yieldHighUsd       Float
  breakEvenMonths    Int?                 // null when not applicable
  frictionLevel      Int                  // 1..5
  verified           Boolean  @default(false)
  builderScore       Int                  // 0..100, editorial
  change30d          Float                // percent
  powerWatts         Int      @default(0)
  affiliateCode      String?
  affiliateDiscount  String?
  affiliateUrl       String?
  conflictDisclosure String?              // renders when present
  blurb              String
  regionDensity      Json                 // { NA, SA, EU, AF, APAC }
  favorites          Favorite[]
  snapshots          PriceSnapshot[]
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt
}

model PriceSnapshot {
  id         String   @id @default(cuid())
  project    Project  @relation(fields: [projectId], references: [id])
  projectId  String
  tokenUsd   Float?
  nodeCount  Int?
  source     String                       // e.g. "coingecko"
  takenAt    DateTime @default(now())
  @@index([projectId, takenAt])
}

model Post {
  id          String   @id @default(cuid())
  slug        String   @unique
  type        PostType
  title       String
  excerpt     String
  body        String                       // MDX or HTML
  projectSlug String?                      // links article to a project
  publishedAt DateTime
}

model Episode {
  id        String   @id @default(cuid())
  slug      String   @unique
  number    Int
  title     String
  summary   String
  audioUrl  String?
  publishedAt DateTime
}

model Event {
  id        String   @id @default(cuid())
  slug      String   @unique
  title     String
  description String
  location  String
  online    Boolean  @default(false)
  startsAt  DateTime
}

model Course {
  id      String  @id @default(cuid())
  slug    String  @unique
  title   String
  summary String
  priceUsd Int    @default(0)             // 0 means free
  modules Module[]
}
model Module {
  id       String @id @default(cuid())
  course   Course @relation(fields: [courseId], references: [id])
  courseId String
  title    String
  order    Int
  lessons  Lesson[]
}
model Lesson {
  id       String @id @default(cuid())
  module   Module @relation(fields: [moduleId], references: [id])
  moduleId String
  title    String
  order    Int
  durationSec Int @default(0)
  videoUrl String?
}

model User {
  id        String     @id            // auth provider id
  email     String     @unique
  favorites Favorite[]
  createdAt DateTime   @default(now())
}
model Favorite {
  user      User    @relation(fields: [userId], references: [id])
  userId    String
  project   Project @relation(fields: [projectId], references: [id])
  projectId String
  @@id([userId, projectId])
}

model Subscriber {
  id        String   @id @default(cuid())
  email     String   @unique
  createdAt DateTime @default(now())
}
model VerificationRequest {
  id        String   @id @default(cuid())
  project   String
  category  String
  website   String
  email     String
  status    String   @default("new")
  createdAt DateTime @default(now())
}
model AdInquiry {
  id        String   @id @default(cuid())
  company   String
  budget    String
  email     String
  createdAt DateTime @default(now())
}
```

## Seeding

```ts
// prisma/seed.ts (sketch)
import { PrismaClient } from "@prisma/client";
import { projects } from "../data/projects.seed";
const db = new PrismaClient();
async function main() {
  for (const p of projects) {
    await db.project.upsert({
      where: { slug: p.slug },
      update: p as any,
      create: p as any,
    });
  }
}
main().finally(() => db.$disconnect());
```

Map the seed `tier` strings to the `Tier` enum, and `regionDensity` is stored as JSON. Posts, episodes, events, and courses can be seeded from the prototype content or authored fresh.

## Live data plan (phase 8, not launch)

- A scheduled job (Vercel Cron) writes `PriceSnapshot` rows from CoinGecko for token prices and from each network's public stats or explorer for node counts.
- Project pages read the latest snapshot at build or ISR revalidate time, never on every request.
- Every displayed number carries a source label and a timestamp once live. Until then, label all figures as indicative.
- Do not block rendering on third-party APIs. If a fetch fails, fall back to the last snapshot or the seed value.

## Data integrity rules

- `builderScore` is editorial. Never derive it silently from price. If you compute a composite, document the formula on the methodology page.
- A project with `conflictDisclosure` set must always render that disclosure and must never be the default top sort. Apply a stable tiebreak that does not favor it.
- Yield fields are reported ranges. Treat 0/0 as pre-token and render "pre-token", not "$0.00".
