import { getSitemapGroupByKey, renderSitemapXml } from "@/lib/sitemaps";

export async function GET() {
  const group = getSitemapGroupByKey("core");
  const xml = renderSitemapXml(group?.entries ?? []);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
