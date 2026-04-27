import { getSitemapIndexEntries, renderSitemapIndexXml } from "@/lib/sitemaps";

export async function GET() {
  const xml = renderSitemapIndexXml(getSitemapIndexEntries());

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
