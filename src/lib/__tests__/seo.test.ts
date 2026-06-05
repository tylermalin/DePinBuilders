import { describe, it, expect } from "vitest";
import { pageMeta } from "../seo";
import {
  organizationSchema,
  breadcrumbSchema,
  productSchema,
  faqSchema,
  itemListSchema,
  jsonLdScript,
} from "../schema";

describe("pageMeta", () => {
  it("produces title with brand suffix", () => {
    const meta = pageMeta({
      title: "GEODNET Miner Review",
      description: "Review of the GEODNET miner.",
      path: "/projects/geodnet",
    });
    expect(meta.title).toBe("GEODNET Miner Review | DePin.Builders");
  });

  it("sets canonical URL", () => {
    const meta = pageMeta({
      title: "Test",
      description: "Test",
      path: "/projects/test",
    });
    expect(meta.alternates?.canonical).toBe(
      "https://depin.builders/projects/test",
    );
  });

  it("sets twitter metadata", () => {
    const meta = pageMeta({
      title: "Test",
      description: "Test desc",
      path: "/",
    });
    const tw = meta.twitter as Record<string, unknown> | undefined;
    expect(tw?.card).toBe("summary_large_image");
    expect(tw?.site).toBe("@depinbuilders");
  });
});

describe("JSON-LD builders", () => {
  it("organizationSchema produces valid JSON", () => {
    const json = JSON.parse(organizationSchema());
    expect(json["@context"]).toBe("https://schema.org");
    expect(json["@type"]).toBe("Organization");
    expect(json.name).toBe("DePin.Builders");
  });

  it("breadcrumbSchema has correct positions", () => {
    const json = JSON.parse(
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        { name: "GEODNET", path: "/projects/geodnet" },
      ]),
    );
    expect(json["@type"]).toBe("BreadcrumbList");
    expect(json.itemListElement).toHaveLength(3);
    expect(json.itemListElement[0].position).toBe(1);
    expect(json.itemListElement[2].position).toBe(3);
  });

  it("productSchema includes AggregateRating with bestRating 100", () => {
    const json = JSON.parse(
      productSchema({
        name: "GEODNET",
        description: "RTK base station",
        slug: "geodnet",
        hardwareCostUsd: 695,
        builderScore: 91,
        category: "Positioning",
      }),
    );
    expect(json["@type"]).toBe("Product");
    expect(json.aggregateRating.bestRating).toBe(100);
    expect(json.aggregateRating.ratingValue).toBe(91);
    expect(json.offers.price).toBe(695);
  });

  it("productSchema omits offers for BYO hardware (cost 0)", () => {
    const json = JSON.parse(
      productSchema({
        name: "Render",
        description: "GPU rendering",
        slug: "render",
        hardwareCostUsd: 0,
        builderScore: 85,
        category: "Compute",
      }),
    );
    expect(json.offers).toBeUndefined();
  });

  it("faqSchema produces valid FAQ items", () => {
    const json = JSON.parse(
      faqSchema([
        { question: "What is DePIN?", answer: "Physical infra." },
      ]),
    );
    expect(json["@type"]).toBe("FAQPage");
    expect(json.mainEntity[0]["@type"]).toBe("Question");
  });

  it("itemListSchema produces ordered list", () => {
    const json = JSON.parse(
      itemListSchema("Top projects", [
        { name: "GEODNET", slug: "geodnet" },
        { name: "Helium", slug: "helium" },
      ]),
    );
    expect(json["@type"]).toBe("ItemList");
    expect(json.itemListElement).toHaveLength(2);
  });

  it("jsonLdScript adds @context", () => {
    const json = JSON.parse(jsonLdScript({ "@type": "Test" }));
    expect(json["@context"]).toBe("https://schema.org");
  });
});
