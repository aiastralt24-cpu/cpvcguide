import { buildAbsoluteUrl } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": siteConfig.publisherType,
    "@id": buildAbsoluteUrl("/#publisher"),
    name: siteConfig.organizationName,
    url: buildAbsoluteUrl("/"),
    logo: {
      "@type": "ImageObject",
      url: buildAbsoluteUrl(siteConfig.publisherLogoPath),
    },
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": buildAbsoluteUrl("/#website"),
    url: buildAbsoluteUrl("/"),
    name: siteConfig.title,
    description: siteConfig.description,
    publisher: {
      "@id": buildAbsoluteUrl("/#publisher"),
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${buildAbsoluteUrl("/search")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
