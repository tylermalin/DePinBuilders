import { notFound } from "next/navigation";

// Podcast episodes are not published yet. The /podcasts index is a coming-soon
// page, so no episode detail routes are generated and any direct hit 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return [];
}

export default function PodcastEpisodePage() {
  notFound();
}
